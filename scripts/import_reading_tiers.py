#!/usr/bin/env python3
"""Apply final reading tiers to existing paper IDs; dry-run by default."""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import os
from pathlib import Path
import sys

import generate
from upsert_papers import atomic_write

ROOT = Path(__file__).resolve().parents[1]


def merge_tiers(data, payload):
    if not isinstance(payload, dict) or set(payload) != {"papers"} or not isinstance(payload["papers"], list):
        raise ValueError("input must contain only a papers list")
    result = copy.deepcopy(data)
    by_id = {p["id"]: p for p in result["papers"]}
    seen = set()
    for row in payload["papers"]:
        if not isinstance(row, dict) or set(row) != {"id", "reading_tier"}:
            raise ValueError("each record must contain only id and reading_tier")
        pid, tier = row["id"], row["reading_tier"]
        if not isinstance(pid, str) or pid not in by_id or pid in seen:
            raise ValueError("record IDs must be unique existing paper IDs")
        if tier is not None and (not isinstance(tier, str) or tier not in generate.READING_TIERS):
            raise ValueError("unsupported reading tier")
        seen.add(pid)
        by_id[pid]["reading_tier"] = tier
    generate.validate(result)
    return result


def apply_tiers(path, root=ROOT, expect_sha256=None, write=False):
    lock = root / ".catalog-update.lock"
    if write and not expect_sha256:
        raise ValueError("--write requires --expect-sha256")
    locked = False
    try:
        if write:
            try:
                fd = os.open(lock, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
            except FileExistsError:
                raise ValueError("another catalog writer holds the update lock")
            locked = True
            with os.fdopen(fd, "w") as stream:
                stream.write(str(os.getpid()) + "\n")
        canonical = root / "data/papers.json"
        raw = canonical.read_bytes()
        before = hashlib.sha256(raw).hexdigest()
        if expect_sha256 and before != expect_sha256:
            raise ValueError("stale catalog; rebase the tier input on current data")
        data = merge_tiers(json.loads(raw), json.loads(Path(path).read_text(encoding="utf-8")))
        text = generate.json_text(data)
        outputs = generate.generate(data, text.encode(), root)
        unexpected = [str(p.relative_to(root)) for folder in ("site", "docs/topics", "docs/related")
                      for p in (root / folder).rglob("*") if p.is_file() and str(p.relative_to(root)) not in outputs]
        if unexpected:
            raise ValueError("unexpected generated files require explicit cleanup")
        changed = (["data/papers.json"] if text.encode() != raw else [])
        changed += [name for name, content in outputs.items()
                    if not (root / name).is_file() or (root / name).read_text(encoding="utf-8") != content]
        if write and changed:
            if canonical.read_bytes() != raw:
                raise ValueError("catalog changed while preparing update")
            for name, content in outputs.items():
                atomic_write(root / name, content)
            atomic_write(canonical, text)
        return {"mode": "written" if write else "dry-run", "before_sha256": before,
                "catalog_sha256": hashlib.sha256(text.encode()).hexdigest(),
                "paper_count": len(data["papers"]), "changed_files": changed}
    finally:
        if locked:
            lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("--expect-sha256")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    try:
        print(json.dumps(apply_tiers(args.input, expect_sha256=args.expect_sha256, write=args.write), indent=2))
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"Tier update refused: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
