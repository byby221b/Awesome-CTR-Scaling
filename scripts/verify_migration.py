#!/usr/bin/env python3
"""Audit the pinned README migration; --strict also requires unchanged legacy fields.

Use --strict for the initial migration only. Later verified metadata corrections
are allowed; the normal audit still guarantees baseline IDs are retained.
"""
import argparse
import hashlib
import json
from pathlib import Path

from legacy import parse_source, format_original

ROOT = Path(__file__).resolve().parents[1]
SOURCE_SHA256 = "3152b05b92299adbc6d09727202233cb3328f14b489aa2dc8540a41c9087825c"


def audit(strict=False):
    source_bytes = (ROOT / "migration/original-README.md").read_bytes()
    assert hashlib.sha256(source_bytes).hexdigest() == SOURCE_SHA256, "migration snapshot was changed"
    source = source_bytes.decode()
    categories, original, overview = parse_source(source)
    expected_lines = [line for line in source.splitlines() if (line.startswith("| **") and "arxiv.org/abs/" in line) or line.startswith("- **")]
    assert [format_original(p) for p in original] == expected_lines, "source parser is not lossless"
    data = json.loads((ROOT / "data/papers.json").read_text(encoding="utf-8"))
    current = {paper["id"]: paper for paper in data["papers"]}
    assert len(current) == len(data["papers"]), "duplicate paper IDs"
    assert {p["id"] for p in original} <= current.keys(), "baseline paper IDs missing"
    fields = list(original[0])
    differences = [(p["id"], field) for p in original for field in fields if current[p["id"]].get(field) != p[field]]
    companies = {company["id"]: company for company in data["companies"]}
    for company in overview:
        assert company["name"] == companies[company["id"]]["name"]
        assert company["legacy_labels"] == [entry["label"] for entry in companies[company["id"]]["legacy_entries"]]
    if strict:
        assert not differences, f"legacy field differences: {differences}"
        assert len(original) == len(current), "initial migration has unexpected papers"
        assert [p["id"] for p in original] == [p["id"] for p in data["papers"]], "original reading order changed"
    return {"source_commit": "31ad30becff83ca14a01f37fc99d52ba79f85565", "source_sha256": SOURCE_SHA256,
            "baseline_papers": len(original), "core": sum(p["collection"] == "core" for p in original),
            "related": sum(p["collection"] == "related" for p in original), "categories": len(categories),
            "legacy_companies": len(overview), "original_fields_compared": len(original) * len(fields),
            "changed_legacy_fields": len(differences), "strict": strict}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    print(json.dumps(audit(args.strict), indent=2))
