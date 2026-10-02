#!/usr/bin/env python3
"""Parser used to audit the lossless migration of the pinned README snapshot."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_SHA = "31ad30becff83ca14a01f37fc99d52ba79f85565"
LINK = re.compile(r"\[\[([^]]+)\]\]\((https?://[^)]+)\)")


def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def parse_source(text):
    categories, papers, overview = [], [], []
    collection, category = None, None
    for line in text.splitlines():
        if line == "## Papers":
            collection = "core"
        elif line == "## Related Work":
            collection = "related"
        elif line == "## Company Overview":
            collection = "companies"
        elif line.startswith("## "):
            collection = None
        if line.startswith("### ") and collection in ("core", "related"):
            title = line[4:]
            category = slug(title)
            categories.append({"id": category, "title": title, "collection": collection})
        if collection == "core" and line.startswith("| **"):
            cells = [cell.strip() for cell in line.strip("|").split("|")]
            assert len(cells) == 7, line
            title, affiliation, venue, year, tags, links, contribution = cells
            title = title.removeprefix("**").removesuffix("**")
            tags = re.findall(r"`([^`]+)`", tags)
        elif collection == "related" and line.startswith("- **"):
            match = re.fullmatch(r"- \*\*(.+?)\*\*: (.+) — (\[\[Paper\]\]\(https://arxiv.org/abs/[\d.]+\)) \((.+)\)", line)
            assert match, line
            title, contribution, links, metadata = match.groups()
            year_match = re.search(r"\b(20\d{2})$", metadata)
            assert year_match, metadata
            year = year_match.group(1)
            prefix = metadata[:year_match.start()].rstrip()
            affiliation, venue = "", ""
            if prefix.endswith(","):
                affiliation = prefix[:-1]
            elif ", " in prefix:
                affiliation, venue = prefix.rsplit(", ", 1)
            else:
                venue = prefix
            tags = []
        elif collection == "companies" and line.startswith("| **"):
            name, aliases = [cell.strip() for cell in line.strip("|").split("|")]
            overview.append({"id": slug(name.strip("*")), "name": name.strip("*"), "legacy_labels": aliases.split(", ")})
            continue
        else:
            continue
        parsed_links = [{"label": label, "url": url} for label, url in LINK.findall(links)]
        assert parsed_links, links
        paper_id = re.search(r"arxiv.org/abs/(\d{4}\.\d{4,5})", links).group(1)
        papers.append({"id": paper_id, "title": title, "collection": collection,
                       "category": category, "affiliation": affiliation, "venue": venue,
                       "year": int(year), "tags": tags, "links": parsed_links,
                       "contribution": contribution})
    assert len(papers) == len({p['id'] for p in papers})
    return categories, papers, overview


def format_original(paper):
    links = " ".join(f"[[{link['label']}]]({link['url']})" for link in paper["links"])
    if paper["collection"] == "core":
        cells = [f"**{paper['title']}**", paper["affiliation"], paper["venue"], str(paper["year"]),
                 " ".join(f"`{tag}`" for tag in paper["tags"]), links, paper["contribution"]]
        return "| " + " | ".join(cells) + " |"
    publication = " ".join(str(x) for x in (paper["venue"], paper["year"]) if x)
    metadata = ", ".join(x for x in (paper["affiliation"], publication) if x)
    return f"- **{paper['title']}**: {paper['contribution']} — {links} ({metadata})"
