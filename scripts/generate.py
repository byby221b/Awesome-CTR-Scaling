#!/usr/bin/env python3
"""Build every catalog view from data/papers.json using Python's standard library."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import unicodedata
from collections import Counter
from datetime import date, datetime
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
NOTICE = "<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->\n\n"
ID_PATTERN = re.compile(r"\d{4}\.\d{4,5}")
SLUG_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
TABLE_HEADER = "| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |\n|:------|:------------|:------|:-----|:-----|:------|:-----------------|\n"


def json_text(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def digest(value):
    return hashlib.sha256(value).hexdigest()


def anchor(paper_id):
    return "paper-" + paper_id.replace(".", "-")


def legacy_anchor(title):
    return re.sub(r"[^\w\- ]", "", title.lower()).replace(" ", "-")


def category_path(category):
    folder = "topics" if category["collection"] == "core" else "related"
    return f"docs/{folder}/{category['id']}.md"


def safe_url(value):
    try:
        url = urlsplit(value)
        return url.scheme in ("https", "http") and bool(url.netloc) and not url.username and not re.search(r"[\s<>\"\\]", value)
    except (ValueError, TypeError):
        return False


def check_source_identity(value, pid, version, errors):
    """A safe URL alone does not establish that a cited arXiv record is this paper."""
    if not safe_url(value):
        return
    url = urlsplit(value)
    if url.hostname in ("arxiv.org", "www.arxiv.org", "export.arxiv.org"):
        match = re.fullmatch(r"/(?:abs|pdf|html)/(\d{4}\.\d{4,5})(v\d+)?(?:\.pdf)?/?", url.path)
        if not match or match[1] != pid:
            errors.append(f"{pid}: arXiv source identity mismatch")
        elif match[2] and version and match[2] != version:
            errors.append(f"{pid}: arXiv source version mismatch")


def utc_timestamp(value):
    """Canonical instants are UTC seconds, never inferred from a date-only field."""
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z", value):
        raise ValueError("expected UTC timestamp YYYY-MM-DDTHH:MM:SSZ")
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


CHANGE_KINDS = {"paper_revision", "venue_update", "metadata_enrichment"}
CHANGE_FIELDS = {"title", "collection", "category", "affiliation", "venue", "year", "tags", "links", "aliases", "doi", "original_abstract", "summaries", "source_dates"}


def validate_history(paper, errors):
    pid = paper.get("id", "")
    added = paper.get("added_at")
    provenance = paper.get("added_provenance")
    if "added_at" not in paper or "added_provenance" not in paper:
        errors.append(f"{pid}: added_at and added_provenance are required (null when unknown)")
    if added is not None:
        try:
            utc_timestamp(added)
        except ValueError:
            errors.append(f"{pid}: added_at requires a UTC timestamp")
        if not isinstance(provenance, dict) or provenance.get("kind") not in ("repository_history", "catalog_entry") or not safe_url(provenance.get("source_url")):
            errors.append(f"{pid}: known added_at requires verifiable added_provenance")
        elif provenance["kind"] == "repository_history" and (not re.fullmatch(r"[0-9a-f]{40}", str(provenance.get("commit_sha", ""))) or not provenance["source_url"].endswith("/commit/" + provenance["commit_sha"])):
            errors.append(f"{pid}: history provenance requires a matching commit URL and SHA")
    elif provenance is not None:
        errors.append(f"{pid}: unknown added_at must have null added_provenance")
    events = paper.get("change_history")
    if not isinstance(events, list):
        errors.append(f"{pid}: change_history must be a list")
        events = []
    seen = set()
    previous = ""
    for event in events:
        if not isinstance(event, dict):
            errors.append(f"{pid}: invalid change event")
            continue
        try:
            utc_timestamp(event.get("at"))
        except ValueError:
            errors.append(f"{pid}: change event requires a UTC timestamp")
        at = event.get("at") or ""
        if not isinstance(at, str):
            at = ""
        if at < previous or (isinstance(added, str) and at < added):
            errors.append(f"{pid}: change_history must be chronological and not predate addition")
        previous = at
        kind, fields = event.get("kind"), event.get("fields")
        if kind not in CHANGE_KINDS:
            errors.append(f"{pid}: unsupported change kind")
        if not isinstance(fields, list) or not fields or any(not isinstance(f, str) or f not in CHANGE_FIELDS for f in fields) or len(fields) != len(set(fields)):
            errors.append(f"{pid}: change event requires unique content fields")
        elif kind == "venue_update" and fields != ["venue"]:
            errors.append(f"{pid}: venue_update must describe venue only")
        elif kind == "paper_revision" and "source_dates" not in fields:
            errors.append(f"{pid}: paper_revision requires verified source_dates")
        if kind == "paper_revision":
            if not re.fullmatch(r"v[1-9]\d*", str(event.get("source_version", ""))):
                errors.append(f"{pid}: paper_revision requires its verified source_version")
            check_source_identity(event.get("source_url"), pid, event.get("source_version"), errors)
        if not safe_url(event.get("source_url")):
            errors.append(f"{pid}: change event requires a safe source_url")
        key = json_text(event)
        if key in seen:
            errors.append(f"{pid}: duplicate change event")
        seen.add(key)
    source = paper.get("source_dates")
    if source is not None:
        if not isinstance(source, dict):
            errors.append(f"{pid}: source_dates must be an object")
            return
        for field in ("published_at", "updated_at", "verified_at"):
            try:
                utc_timestamp(source.get(field))
            except ValueError:
                errors.append(f"{pid}: source_dates.{field} requires a UTC timestamp")
        if not safe_url(source.get("source_url")):
            errors.append(f"{pid}: source_dates requires a safe source_url")
        if not re.fullmatch(r"v[1-9]\d*", str(source.get("source_version", ""))):
            errors.append(f"{pid}: source_dates requires a source_version")
        check_source_identity(source.get("source_url"), pid, source.get("source_version"), errors)
        if source.get("source_version") and (paper.get("original_abstract") or {}).get("source_version") and source["source_version"] != paper["original_abstract"]["source_version"]:
            errors.append(f"{pid}: source_dates and original abstract version mismatch")
        if isinstance(source.get("published_at"), str) and isinstance(source.get("updated_at"), str) and source["published_at"] > source["updated_at"]:
            errors.append(f"{pid}: source publication must not follow source update")


def validate(data):
    """Reject ambiguous IDs, unsupported tags, malformed fields and unsafe links."""
    errors = []
    if data.get("schema_version") != 4:
        errors.append("schema_version must be 4")
    for key in ("meta", "categories", "papers", "companies", "tag_vocabulary"):
        if key not in data:
            errors.append(f"missing {key}")
    if errors:
        raise ValueError("\n".join(errors))
    meta = data["meta"]
    for key in ("title", "description", "updated", "source_commit", "scope"):
        if not isinstance(meta.get(key), str) or not meta[key].strip():
            errors.append(f"meta.{key} must be a nonempty string")
    try:
        date.fromisoformat(meta["updated"])
    except (ValueError, KeyError, TypeError):
        errors.append("meta.updated must be an ISO date")
    for key in ("repository_url", "site_url"):
        if not safe_url(meta.get(key)):
            errors.append(f"meta.{key} must be an absolute HTTP(S) URL")
    vocabulary = data["tag_vocabulary"]
    if not isinstance(vocabulary, list) or not all(isinstance(x, str) and x for x in vocabulary):
        errors.append("tag_vocabulary must be a list of nonempty strings")
    elif len(vocabulary) != len(set(vocabulary)):
        errors.append("duplicate tags in vocabulary")
    categories = {}
    for item in data["categories"]:
        cid = item.get("id", "")
        if not SLUG_PATTERN.fullmatch(cid) or cid in categories:
            errors.append(f"invalid or duplicate category {cid}")
        if item.get("collection") not in ("core", "related"):
            errors.append(f"invalid collection for {cid}")
        for field in ("title", "description"):
            if not isinstance(item.get(field), str) or not item[field]:
                errors.append(f"category {cid} missing {field}")
        categories[cid] = item
    ids, dois, titles = set(), set(), set()
    for paper in data["papers"]:
        pid = paper.get("id", "")
        if not isinstance(pid, str) or not ID_PATTERN.fullmatch(pid) or pid in ids:
            errors.append(f"invalid or duplicate arXiv id {pid}")
        ids.add(pid)
        validate_history(paper, errors)
        if "contribution" in paper:
            errors.append(f"{pid}: contribution was removed in schema v3; use source-grounded summaries")
        for field in ("title", "affiliation", "venue"):
            if not isinstance(paper.get(field), str):
                errors.append(f"{pid}: {field} must be a string")
            elif field == "title" and not paper[field].strip():
                errors.append(f"{pid}: {field} cannot be blank")
            elif "\n" in paper[field] or "\r" in paper[field]:
                errors.append(f"{pid}: {field} must be one line")
        title_key = "".join(c for c in unicodedata.normalize("NFKC", paper.get("title", "")).casefold() if c.isalnum())
        if title_key in titles:
            errors.append(f"{pid}: duplicate normalized title")
        titles.add(title_key)
        abstract = paper.get("original_abstract")
        if abstract is not None:
            if not isinstance(abstract, dict):
                errors.append(f"{pid}: original_abstract must be an object")
            else:
                status = abstract.get("status")
                text = abstract.get("text")
                if status not in ("verified", "unavailable", "pending"):
                    errors.append(f"{pid}: invalid abstract status")
                if not isinstance(text, str) or (status == "verified") != bool(text.strip()):
                    errors.append(f"{pid}: only a verified abstract may have nonempty text")
                if not isinstance(abstract.get("language"), str) or not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z0-9]+)*", abstract["language"]):
                    errors.append(f"{pid}: invalid abstract language")
                if not safe_url(abstract.get("source_url")):
                    errors.append(f"{pid}: abstract requires a safe source_url")
                check_source_identity(abstract.get("source_url"), pid, abstract.get("source_version"), errors)
                if abstract.get("source_version") is not None and not re.fullmatch(r"v[1-9]\d*", abstract["source_version"]):
                    errors.append(f"{pid}: invalid source_version")
                retrieved = abstract.get("retrieved_at")
                try:
                    if retrieved is not None:
                        stamp = datetime.fromisoformat(retrieved.replace("Z", "+00:00"))
                        if stamp.tzinfo is None:
                            raise ValueError("missing timezone")
                    elif status == "verified":
                        raise ValueError("missing retrieval timestamp")
                except (ValueError, TypeError, AttributeError):
                    errors.append(f"{pid}: verified abstract requires an ISO retrieval timestamp with timezone")
                for field in ("license", "reason", "source_title", "source_version"):
                    if abstract.get(field) is not None and not isinstance(abstract[field], str):
                        errors.append(f"{pid}: abstract {field} must be a string or null")
                if status != "verified" and not abstract.get("reason"):
                    errors.append(f"{pid}: missing abstract requires an explicit reason")
        summaries = paper.get("summaries", {})
        if not isinstance(summaries, dict) or any(lang not in ("en", "zh") for lang in summaries):
            errors.append(f"{pid}: summaries must be an object with en/zh keys")
        else:
            for lang, summary in summaries.items():
                if not isinstance(summary, dict):
                    errors.append(f"{pid}: summary {lang} must be an object")
                    continue
                if not isinstance(summary.get("text"), str) or not summary["text"].strip():
                    errors.append(f"{pid}: summary {lang} text cannot be blank")
                if summary.get("basis") != "original_abstract":
                    errors.append(f"{pid}: summary {lang} basis must be original_abstract")
                if summary.get("basis") == "original_abstract" and (not isinstance(abstract, dict) or abstract.get("status") != "verified"):
                    errors.append(f"{pid}: abstract-based summary {lang} requires a verified original abstract")
                if summary.get("method") not in ("ai_assisted", "editorial"):
                    errors.append(f"{pid}: summary {lang} has invalid method")
                try:
                    date.fromisoformat(summary.get("updated_at", ""))
                except (ValueError, TypeError):
                    errors.append(f"{pid}: summary {lang} needs an ISO update date")
                sources = summary.get("source_urls")
                if not isinstance(sources, list) or not sources or not all(safe_url(x) for x in sources):
                    errors.append(f"{pid}: summary {lang} needs safe source_urls")
                elif summary.get("basis") == "original_abstract":
                    for source in sources:
                        check_source_identity(source, pid, abstract.get("source_version") if isinstance(abstract, dict) else None, errors)
        category = categories.get(paper.get("category"))
        if category is None or category["collection"] != paper.get("collection"):
            errors.append(f"{pid}: category/collection mismatch")
        if type(paper.get("year")) is not int or not 1900 <= paper["year"] <= 2100:
            errors.append(f"{pid}: year must be an integer between 1900 and 2100")
        tags = paper.get("tags", [])
        if not isinstance(tags, list) or not all(isinstance(x, str) for x in tags):
            errors.append(f"{pid}: tags must be strings")
        elif len(tags) != len(set(tags)) or any(tag not in vocabulary for tag in tags):
            errors.append(f"{pid}: duplicate or unknown tag")
        if paper.get("collection") == "core" and not 1 <= len(tags) <= 4:
            errors.append(f"{pid}: core papers need 1–4 controlled tags")
        links = paper.get("links", [])
        if not isinstance(links, list) or not links:
            errors.append(f"{pid}: at least one link is required")
            links = []
        for link in links:
            if not isinstance(link.get("label"), str) or not link["label"] or not safe_url(link.get("url")):
                errors.append(f"{pid}: invalid link")
        if not any(link.get("url") == f"https://arxiv.org/abs/{pid}" for link in links):
            errors.append(f"{pid}: missing matching canonical arXiv link")
        aliases = paper.get("aliases", [])
        if not isinstance(aliases, list) or not all(isinstance(x, str) and x for x in aliases) or len(aliases) != len(set(aliases)):
            errors.append(f"{pid}: aliases must be unique nonempty strings")
        if "doi" in paper:
            doi = paper["doi"]
            if not isinstance(doi, str) or not re.fullmatch(r"10\.\d{4,9}/\S+", doi) or doi.lower() in dois:
                errors.append(f"{pid}: invalid or duplicate DOI")
            else:
                dois.add(doi.lower())
    company_ids = set()
    for company in data["companies"]:
        cid = company.get("id", "")
        if not SLUG_PATTERN.fullmatch(cid) or cid in company_ids:
            errors.append(f"invalid or duplicate company id {cid}")
        company_ids.add(cid)
        if not isinstance(company.get("name"), str) or not company["name"]:
            errors.append(f"{cid}: company name is required")
        if not isinstance(company.get("affiliation_aliases"), list) or not all(isinstance(x, str) and x for x in company.get("affiliation_aliases", [])):
            errors.append(f"{cid}: affiliation_aliases must be strings")
        for item in company.get("legacy_entries", []):
            if item.get("paper_id") not in ids or not item.get("label"):
                errors.append(f"{cid}: unresolved legacy company mention")
    if errors:
        raise ValueError("\n".join(errors))


def company_memberships(data):
    result = {paper["id"]: [] for paper in data["papers"]}
    for company in data["companies"]:
        legacy = {entry["paper_id"] for entry in company.get("legacy_entries", [])}
        for paper in data["papers"]:
            matches = any(re.search(r"(?<!\w)" + re.escape(alias) + r"(?!\w)", paper["affiliation"], re.I)
                          for alias in company["affiliation_aliases"])
            if matches or paper["id"] in legacy:
                result[paper["id"]].append(company["id"])
    return result


def md(value):
    """Escape inline prose for Markdown without changing stored source fields."""
    return str(value).replace("\\", "\\\\").replace("|", "\\|").replace("<", "&lt;").replace(">", "&gt;").replace("[", "\\[").replace("]", "\\]")


def links_md(paper):
    return " · ".join(f"[{md(link['label'])}]({link['url']})" for link in paper["links"])


def english_summary(paper):
    """All Markdown descriptions share the verified English summary source."""
    text = paper.get("summaries", {}).get("en", {}).get("text")
    return md(text).replace("\r\n", "\n").replace("\r", "\n").replace("\n", "<br>") if text else "English summary not yet available."


def paper_location(paper, categories, prefix=""):
    return prefix + category_path(categories[paper["category"]]) + "#" + anchor(paper["id"])


def topic_page(category, papers, data):
    title = category["title"]
    output = NOTICE + f"# {title}\n\n[← Catalog](../../README.md) · [All topics](../README.md) · [Search website]({data['meta']['site_url']}?category={category['id']})\n\n"
    output += f"{category['description']}\n\n{len(papers)} papers · Updated {data['meta']['updated']}\n\n"
    if category["collection"] == "core":
        output += TABLE_HEADER
        for paper in papers:
            cells = [f'<a id="{anchor(paper["id"])}"></a>**{md(paper["title"])}**', md(paper["affiliation"]), md(paper["venue"]), str(paper["year"]),
                     " ".join(f"`{tag}`" for tag in paper["tags"]), links_md(paper), english_summary(paper)]
            output += "| " + " | ".join(cells) + " |\n"
    else:
        for paper in papers:
            publication = " ".join(str(x) for x in (paper["venue"], paper["year"]) if x)
            metadata = " · ".join(x for x in (paper["affiliation"], publication) if x)
            output += f'<a id="{anchor(paper["id"])}"></a>\n\n'
            output += f"- **{md(paper['title'])}**: {english_summary(paper)} — {links_md(paper)} ({md(metadata)})\n\n"
    return output.rstrip() + "\n"


def readme(data, counts):
    meta = data["meta"]
    output = NOTICE + f"# {meta['title']}\n\nA curated library of **scaling laws and scalable ranking/CTR models** for industrial recommendation systems.\n\n"
    output += f"**{len(data['papers'])} papers** · **{counts['core']} core** · **{counts['related']} related** · Updated {meta['updated']}\n\n"
    output += f'<a id="table-of-contents"></a>\n\n[**Search the paper library →**]({meta["site_url"]}) · [**中文页面**]({meta["site_url"]}zh.html) · [All topics](docs/README.md) · [Company index](docs/companies.md) · [Contribute](CONTRIBUTING.md)\n\n'
    output += f"> **Scope:** {meta['scope']}\n\n## Papers\n\nFive focused reading paths. Each topic keeps the complete seven-column catalog: paper, affiliation, venue, year, tags, links and key contribution. The last column and related-work descriptions use the same source-grounded English summaries as the website.\n\n"
    for category in data["categories"]:
        if category["collection"] != "core":
            continue
        output += f'<a id="{legacy_anchor(category["title"])}"></a>\n\n'
        output += f"### {category['title']}\n\n{category['description']} [Browse {counts[category['id']]} papers →]({category_path(category)})\n\n"
    output += "## Related Work\n\nAdjacent research is grouped separately to keep the core CTR scaling signal clear.\n\n"
    for category in data["categories"]:
        if category["collection"] == "related":
            output += f'- <a id="{legacy_anchor(category["title"])}"></a>[{category["title"]}]({category_path(category)}) · {counts[category["id"]]} papers\n'
    output += "\n## Company Overview\n\n[Browse the linked company index](docs/companies.md). Every entry opens its paper in the relevant topic; the website also filters by company.\n\n"
    output += "## Keeping everything in sync\n\n[The canonical dataset](data/papers.json) generates this README, all topic pages, the company index and the website. Change a paper once, regenerate all views, and let CI reject drift.\n\n"
    output += "```sh\npython scripts/generate.py\npython scripts/generate.py --check\npython -m unittest discover -s tests -v\n```\n\n"
    output += "See [CONTRIBUTING.md](CONTRIBUTING.md) for the schema, update workflow and local preview; [deployment instructions](docs/deployment.md) cover GitHub Pages.\n\n## Contributing\n\nWe welcome relevant papers, corrections and better source links. Please open an issue or submit a pull request. Preserve verified summary details and use the [controlled tag vocabulary](docs/README.md#tag-vocabulary).\n\n## Star History\n\nIf you find this repository useful, please consider giving it a star!\n"
    return output


def generate(data, source_bytes, root=ROOT):
    validate(data)
    counts = Counter(p["collection"] for p in data["papers"])
    counts.update(p["category"] for p in data["papers"])
    categories = {item["id"]: item for item in data["categories"]}
    memberships = company_memberships(data)
    outputs = {"README.md": readme(data, counts)}
    index = NOTICE + "# Paper catalog\n\n[← Home](../README.md) · [Company index](companies.md)\n\n"
    for collection, title in (("core", "Core CTR scaling"), ("related", "Related work")):
        index += f"## {title}\n\n"
        for category in data["categories"]:
            if category["collection"] == collection:
                path = category_path(category)
                papers = [paper for paper in data["papers"] if paper["category"] == category["id"]]
                outputs[path] = topic_page(category, papers, data)
                index += f"- [{category['title']}]({path.removeprefix('docs/')}) ({len(papers)}) — {category['description']}\n"
        index += "\n"
    index += "## Tag vocabulary\n\n" + " · ".join(f"`{tag}`" for tag in data["tag_vocabulary"]) + "\n\nCore papers use 1–4 curated labels (some historical entries have one). Related-work entries without original tags remain untagged. Missing affiliation or venue metadata is left blank rather than inferred.\n"
    outputs["docs/README.md"] = index
    company_output = NOTICE + "# Company index\n\n[← Home](../README.md) · [All topics](README.md)\n\nCompany membership follows recorded affiliation aliases and preserved company-overview mentions. A paper may appear under multiple companies. This structural migration does not independently reverify affiliations or publication claims.\n\n"
    public_companies = []
    for company in data["companies"]:
        papers = [paper for paper in data["papers"] if company["id"] in memberships[paper["id"]]]
        public_companies.append({"id": company["id"], "name": company["name"], "count": len(papers)})
        company_output += f'- [{company["name"]}](#company-{company["id"]}) ({len(papers)})\n'
    for company in data["companies"]:
        papers = [paper for paper in data["papers"] if company["id"] in memberships[paper["id"]]]
        company_output += f'\n<a id="company-{company["id"]}"></a>\n\n## {company["name"]}\n\n'
        for paper in papers:
            path = paper_location(paper, categories).removeprefix("docs/")
            company_output += f"- [{md(paper['title'])}]({path}) · {paper['year']} · {'Core' if paper['collection'] == 'core' else 'Related'}\n"
    outputs["docs/companies.md"] = company_output
    source_hash = digest(source_bytes)
    coverage = {
        "known_added_dates": sum(p.get("added_at") is not None for p in data["papers"]),
        "papers_with_updates": sum(bool(p.get("change_history")) for p in data["papers"]),
        "verified_source_dates": sum(bool(p.get("source_dates")) for p in data["papers"]),
        "verified_abstracts": sum(p.get("original_abstract", {}).get("status") == "verified" for p in data["papers"]),
        "unavailable_abstracts": sum(p.get("original_abstract", {}).get("status") == "unavailable" for p in data["papers"]),
        "pending_abstracts": sum(p.get("original_abstract", {}).get("status", "pending") == "pending" for p in data["papers"]),
        "english_summaries": sum(bool(p.get("summaries", {}).get("en", {}).get("text")) for p in data["papers"]),
        "chinese_summaries": sum(bool(p.get("summaries", {}).get("zh", {}).get("text")) for p in data["papers"]),
    }
    public_data = {"coverage": coverage, "schema_version": data["schema_version"], "meta": {**data["meta"], "catalog_sha256": source_hash}, "categories": data["categories"], "companies": public_companies,
                   "papers": [{**paper, "companies": memberships[paper["id"]], "order": i} for i, paper in enumerate(data["papers"])]}
    outputs["site/catalog.json"] = json_text(public_data)
    substitutions = {"TOTAL": len(data["papers"]), "CORE": counts["core"], "RELATED": counts["related"], "UPDATED": data["meta"]["updated"], "CATALOG_SHA256": source_hash}
    for name in ("index.html", "zh.html", "styles.css", "app.js", "favicon.svg"):
        content = (root / "web" / name).read_text(encoding="utf-8")
        for key, value in substitutions.items():
            content = content.replace("{{" + key + "}}", str(value))
        if re.search(r"\{\{[A-Z_]+\}\}", content):
            raise ValueError(f"unresolved template token in {name}")
        outputs["site/" + name] = content
    outputs["site/.nojekyll"] = ""
    manifest = {"schema_version": 1, "catalog_sha256": source_hash, "paper_count": len(data["papers"]),
                "coverage": coverage, "collection_counts": {key: counts[key] for key in ("core", "related")},
                "files": {path: digest(content.encode()) for path, content in sorted(outputs.items())}}
    outputs["generated-manifest.json"] = json_text(manifest)
    return outputs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if any generated file is missing, stale or unexpected")
    args = parser.parse_args()
    try:
        source_bytes = (ROOT / "data/papers.json").read_bytes()
        outputs = generate(json.loads(source_bytes), source_bytes)
        stale = [path for path, content in outputs.items() if not (ROOT / path).is_file() or (ROOT / path).read_text(encoding="utf-8") != content]
        owned = [ROOT / "site", ROOT / "docs/topics", ROOT / "docs/related"]
        unexpected = [str(path.relative_to(ROOT)) for directory in owned if directory.exists() for path in directory.rglob("*") if path.is_file() and str(path.relative_to(ROOT)) not in outputs]
        if args.check:
            if stale or unexpected:
                print("Generated files are out of sync. Run python scripts/generate.py.", file=sys.stderr)
                for path in stale + unexpected:
                    print("  " + path, file=sys.stderr)
                return 1
            print(f"Synchronized: {len(outputs)} generated files, {len(json.loads(source_bytes)['papers'])} unique papers")
        else:
            for path, content in outputs.items():
                target = ROOT / path
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content, encoding="utf-8", newline="\n")
            # Never silently delete unexpected files. A renamed/removed topic requires explicit cleanup.
            if unexpected:
                print("Unexpected generated files require explicit cleanup: " + ", ".join(unexpected), file=sys.stderr)
                return 1
            print(f"Generated {len(outputs)} synchronized files")
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"Catalog build failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
