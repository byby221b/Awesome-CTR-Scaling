#!/usr/bin/env python3
"""Fetch original arXiv abstract metadata, without editing the input catalog.

Uses the official export API serially, with a >=3 second delay after requests,
finite retries, Retry-After handling, and no access-denial bypass. Run no other
arXiv collector concurrently. Outputs raw Atom evidence, keyed abstracts.json,
importable patches.json and provenance.json. Python standard library only.
"""
import argparse
import datetime as dt
import difflib
import email.utils
import hashlib
import json
from pathlib import Path
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

NS = {"a": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
POLICY_URL = "https://info.arxiv.org/help/api/tou.html"
CC0_URL = "https://creativecommons.org/publicdomain/zero/1.0/"
ENDPOINT = "https://export.arxiv.org/api/query"
USER_AGENT = "Awesome-CTR-Scaling-metadata/1.0 (+https://github.com/byby221b/Awesome-CTR-Scaling)"


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def base_id(value):
    return re.sub(r"v\d+$", "", value)


def norm(value):
    return " ".join(value.split())


def comparable(value):
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def write_json(path, value):
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def retry_after_seconds(value):
    if not value:
        return 0
    try:
        return max(0, float(value))
    except ValueError:
        try:
            return max(0, (email.utils.parsedate_to_datetime(value) - dt.datetime.now(dt.timezone.utc)).total_seconds())
        except (TypeError, ValueError):
            return 0


class Collector:
    def __init__(self, output, timeout=45, attempts=2):
        self.output = output
        self.timeout = timeout
        self.attempts = attempts
        self.last_end = 0.0
        self.requests = []
        self.denied = False

    def get(self, ids):
        url = ENDPOINT + "?" + urllib.parse.urlencode({"id_list": ",".join(ids), "max_results": len(ids)})
        for attempt in range(1, self.attempts + 1):
            time.sleep(max(0, 3.2 - (time.monotonic() - self.last_end)))
            stamp = now()
            item = {"url": url, "ids": ids, "attempt": attempt, "started_at": stamp}
            pause = 0
            try:
                request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/atom+xml"})
                with urllib.request.urlopen(request, timeout=self.timeout) as response:
                    body = response.read()
                    item.update(status=response.status, final_url=response.url, headers=dict(response.headers))
                    if urllib.parse.urlparse(response.url).hostname != "export.arxiv.org":
                        raise ValueError("Unexpected endpoint redirect; stopped without accepting another host")
                digest = hashlib.sha256(body).hexdigest()
                filename = f"batch-{len(self.requests)+1:03d}-{digest[:12]}.xml"
                (self.output / "raw" / filename).write_bytes(body)
                item.update(raw_file="raw/" + filename, sha256=digest, bytes=len(body), finished_at=now())
                self.requests.append(item)
                self.last_end = time.monotonic()
                return body, item, None
            except urllib.error.HTTPError as error:
                item.update(status=error.code, error=str(error), headers=dict(error.headers), finished_at=now())
                if error.code in (401, 403):
                    self.denied = True
                retryable = error.code == 429 or 500 <= error.code <= 599
                pause = max(5 * attempt, retry_after_seconds(error.headers.get("Retry-After")))
            except (urllib.error.URLError, TimeoutError, OSError) as error:
                item.update(error=str(error), finished_at=now())
                retryable = True
                pause = 5 * attempt
            except ValueError as error:
                item.update(error=str(error), finished_at=now())
                retryable = False
                self.denied = True
            self.requests.append(item)
            self.last_end = time.monotonic()
            print(json.dumps({"request_failed": item, "will_retry": bool(retryable and attempt < self.attempts and not self.denied)}), flush=True)
            if not retryable or self.denied or attempt == self.attempts:
                return None, item, item.get("error", "Request failed")
            # Honor the full server Retry-After. Do not substitute an alternate host.
            time.sleep(pause)
        raise AssertionError("unreachable")


def parse(body, item, canonical):
    root = ET.fromstring(body)
    records = {}
    errors = []
    for entry in root.findall("a:entry", NS):
        eid = entry.findtext("a:id", "", NS).strip()
        if "api/errors" in eid:
            errors.append(entry.findtext("a:summary", "", NS).strip())
            continue
        identifier = urllib.parse.urlparse(eid).path.removeprefix("/abs/")
        key = base_id(identifier)
        if key not in canonical:
            errors.append(f"Unexpected returned ID: {identifier}")
            continue
        title_raw = entry.findtext("a:title", "", NS)
        abstract_raw = entry.findtext("a:summary", "", NS)
        title = norm(title_raw)
        abstract = abstract_raw.strip()
        source_url = "https://arxiv.org/abs/" + identifier
        version_match = re.search(r"v\d+$", identifier)
        version = version_match.group(0) if version_match else None
        title_equal = comparable(title) == comparable(canonical[key]["title"])
        similarity = difflib.SequenceMatcher(None, comparable(title), comparable(canonical[key]["title"])).ratio()
        records[key] = {
            "id": key, "status": "verified" if abstract else "unavailable", "title": title,
            "title_raw": title_raw, "authors": [author.findtext("a:name", "", NS) for author in entry.findall("a:author", NS)],
            "abstract": abstract, "abstract_raw": abstract_raw,
            "source_url": source_url, "canonical_source_url": "https://arxiv.org/abs/" + key,
            "retrieved_at": item["finished_at"], "fetched_at": item["finished_at"],
            "published": entry.findtext("a:published", None, NS),
            "updated": entry.findtext("a:updated", None, NS), "version": version,
            "categories": [category.get("term") for category in entry.findall("a:category", NS)],
            "doi": entry.findtext("arxiv:doi", None, NS),
            "journal_reference": entry.findtext("arxiv:journal_ref", None, NS),
            "license": "CC0-1.0", "license_url": CC0_URL,
            "license_provenance": {"scope": "descriptive metadata including abstract; not full paper", "policy_url": POLICY_URL, "checked_at": "2026-10-02T04:46:56Z"},
            "request_url": item["url"], "raw_file": item["raw_file"], "raw_sha256": item["sha256"],
            "canonical_title": canonical[key]["title"], "canonical_title_equal_normalized": title_equal,
            "canonical_title_similarity": round(similarity, 4),
        }
        if not abstract:
            records[key]["reason"] = "Official API returned no abstract text"
    return records, errors


def unavailable(paper, reason, fetched_at=None, request_url=None):
    return {"id": paper["id"], "status": "unavailable", "title": None, "authors": [], "abstract": "", "source_url": "https://arxiv.org/abs/" + paper["id"], "retrieved_at": fetched_at, "fetched_at": fetched_at, "version": None, "published": None, "updated": None, "license": None, "reason": reason, "request_url": request_url, "canonical_title": paper["title"]}


def save(output, papers, records, requests, input_sha):
    write_json(output / "abstracts.json", records)
    patches = []
    for paper in papers:
        record = records.get(paper["id"])
        if record is None:
            continue
        patch = {"status": record["status"], "text": record["abstract"], "language": "en", "source_url": record["source_url"], "retrieved_at": record["retrieved_at"], "license": record["license"]}
        if record.get("reason"):
            patch["reason"] = record["reason"]
        if record.get("title"):
            patch["source_title"] = record["title"]
        if record.get("version"):
            patch["source_version"] = record["version"]
        update = {"id": paper["id"], "original_abstract": patch, "change_source_url": record["source_url"]}
        if all(record.get(key) for key in ("published", "updated", "version", "retrieved_at")):
            update["source_dates"] = {"published_at": record["published"], "updated_at": record["updated"], "source_version": record["version"], "source_url": record["source_url"], "verified_at": record["retrieved_at"]}
        patches.append(update)
    write_json(output / "patches.json", {"papers": patches})
    verified = sum(record["status"] == "verified" for record in records.values())
    write_json(output / "provenance.json", {"updated_at": now(), "input_sha256": input_sha, "expected_ids": len(papers), "records": len(records), "verified": verified, "unavailable": len(records) - verified, "metadata_license": "CC0-1.0", "metadata_license_url": CC0_URL, "policy_url": POLICY_URL, "policy_checked_at": "2026-10-02T04:46:56Z", "policy_summary": "arXiv API terms explicitly include abstract, title and authors in descriptive metadata licensed under CC0 and allow retrieval, storage, transformation and sharing. Full paper content is outside this permission.", "requests": requests})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("catalog", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--batch-size", type=int, default=15)
    parser.add_argument("--attempts", type=int, default=2)
    parser.add_argument("--timeout", type=float, default=45)
    args = parser.parse_args()
    if not 1 <= args.batch_size <= 25 or not 1 <= args.attempts <= 3:
        parser.error("Use batches of 1–25 and 1–3 finite attempts")
    data = args.catalog.read_bytes()
    papers = json.loads(data)["papers"]
    canonical = {paper["id"]: paper for paper in papers}
    if len(canonical) != len(papers):
        parser.error("Catalog has duplicate IDs")
    if any(not re.fullmatch(r"(?:\d{4}\.\d{4,5}|[a-z.-]+/\d{7})(?:v\d+)?", identifier) for identifier in canonical):
        parser.error("Unsupported arXiv ID syntax")
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "raw").mkdir(exist_ok=True)
    collector = Collector(args.output, args.timeout, args.attempts)
    records = {}
    ids = list(canonical)
    for offset in range(0, len(ids), args.batch_size):
        batch = ids[offset:offset + args.batch_size]
        if collector.denied:
            for identifier in batch:
                records[identifier] = unavailable(canonical[identifier], "Not attempted: official endpoint denied access; collector stopped without bypass")
        else:
            body, item, error = collector.get(batch)
            parsed, errors = ({}, [])
            if body is not None:
                try:
                    parsed, errors = parse(body, item, {identifier: canonical[identifier] for identifier in batch})
                except ET.ParseError as exc:
                    errors = ["Invalid official Atom response: " + str(exc)]
            records.update(parsed)
            for identifier in batch:
                if identifier not in parsed:
                    reason = error or ("; ".join(errors) if errors else "Official API returned no entry for requested ID")
                    records[identifier] = unavailable(canonical[identifier], reason, item.get("finished_at"), item["url"])
        save(args.output, papers, records, collector.requests, hashlib.sha256(data).hexdigest())
        print(json.dumps({"processed": len(records), "expected": len(papers), "verified": sum(r["status"] == "verified" for r in records.values()), "denied": collector.denied}), flush=True)
    assert set(records) == set(canonical)


if __name__ == "__main__":
    main()
