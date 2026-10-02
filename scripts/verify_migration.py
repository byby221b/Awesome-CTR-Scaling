#!/usr/bin/env python3
"""Audit retained migration metadata; --strict also compares bibliographic fields.

The prose-free baseline preserves stable IDs, categories and company attribution.
Obsolete catalog summaries are intentionally excluded from the current repository.
"""
import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASELINE_SHA256 = "0a4b73fad930c22e3c54e6004e75428f0bd70ed5ce656b34be15655df51f659f"
METADATA_FIELDS = ("id", "title", "collection", "category", "affiliation", "venue", "year", "tags", "links")


def audit(strict=False):
    baseline_bytes = (ROOT / "migration/metadata-baseline.json").read_bytes()
    assert hashlib.sha256(baseline_bytes).hexdigest() == BASELINE_SHA256, "metadata baseline was changed"
    baseline = json.loads(baseline_bytes)
    original = baseline["papers"]
    assert all(set(paper) == set(METADATA_FIELDS) for paper in original), "baseline must contain bibliographic metadata only"
    data = json.loads((ROOT / "data/papers.json").read_text(encoding="utf-8"))
    current = {paper["id"]: paper for paper in data["papers"]}
    assert len(current) == len(data["papers"]), "duplicate paper IDs"
    baseline_ids = {paper["id"] for paper in original}
    assert baseline_ids <= current.keys(), "baseline paper IDs missing"
    differences = [(paper["id"], field) for paper in original for field in METADATA_FIELDS
                   if current[paper["id"]].get(field) != paper[field]]
    companies = {company["id"]: company for company in data["companies"]}
    for company in baseline["company_overview"]:
        assert company["name"] == companies[company["id"]]["name"]
        assert company["legacy_labels"] == [entry["label"] for entry in companies[company["id"]]["legacy_entries"]]
    if strict:
        assert not differences, f"baseline metadata differences: {differences}"
        assert [paper["id"] for paper in original] == [paper["id"] for paper in data["papers"] if paper["id"] in baseline_ids], "baseline reading order changed"
    return {"source_commit": baseline["source_commit"], "source_readme_sha256": baseline["source_readme_sha256"],
            "metadata_baseline_sha256": BASELINE_SHA256,
            "baseline_papers": len(original), "core": sum(p["collection"] == "core" for p in original),
            "related": sum(p["collection"] == "related" for p in original), "categories": len(baseline["categories"]),
            "legacy_companies": len(baseline["company_overview"]), "metadata_fields_compared": len(original) * len(METADATA_FIELDS),
            "changed_metadata_fields": len(differences), "strict": strict}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    print(json.dumps(audit(args.strict), indent=2))
