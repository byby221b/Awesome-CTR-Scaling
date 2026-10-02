#!/usr/bin/env python3
"""Validate ID-keyed JSON paper patches; dry-run by default, write + regenerate explicitly."""
from __future__ import annotations
import argparse
import copy
import hashlib
import json
import os
from pathlib import Path
import sys
import tempfile
from datetime import date
import generate

ROOT = Path(__file__).resolve().parents[1]
FIELDS = {"id", "title", "collection", "category", "affiliation", "venue", "year", "tags", "links", "contribution", "aliases", "doi", "original_abstract", "summaries"}


def merge_patches(data, patch):
    """Never replace a paper wholesale or silently discard unknown patch fields."""
    if not isinstance(patch, dict) or set(patch) != {"papers"} or not isinstance(patch["papers"], list):
        raise ValueError('patch must be an object containing only a "papers" list')
    result = copy.deepcopy(data)
    by_id = {p["id"]: p for p in result["papers"]}
    seen = set()
    for item in patch["papers"]:
        if not isinstance(item, dict) or not isinstance(item.get("id"), str):
            raise ValueError("every patch needs a string id")
        pid = item["id"]
        if pid in seen:
            raise ValueError(f"duplicate patch id {pid}")
        seen.add(pid)
        unknown = set(item) - FIELDS
        if unknown:
            raise ValueError(f"{pid}: unknown patch fields {', '.join(sorted(unknown))}")
        if pid not in by_id:
            new = copy.deepcopy(item)
            result["papers"].append(new)
            by_id[pid] = new
        else:
            target = by_id[pid]
            for key, value in item.items():
                if key == "summaries" and isinstance(value, dict):
                    target[key] = {**target.get(key, {}), **copy.deepcopy(value)}
                else:
                    target[key] = copy.deepcopy(value)
    result["schema_version"] = 2
    generate.validate(result)
    return result


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def _apply_patch_file(patch_path, root=ROOT, expect_sha256=None, updated=None, write=False):
    canonical = root / "data/papers.json"
    raw = canonical.read_bytes()
    before = hashlib.sha256(raw).hexdigest()
    if expect_sha256 and before != expect_sha256:
        raise ValueError(f"stale catalog: expected {expect_sha256}, actual {before}; rebase the patch on current data")
    data = merge_patches(json.loads(raw), json.loads(Path(patch_path).read_text(encoding="utf-8")))
    if updated:
        date.fromisoformat(updated)
        data["meta"]["updated"] = updated
    text = generate.json_text(data)
    outputs = generate.generate(data, text.encode(), root)
    unexpected = [str(path.relative_to(root)) for folder in ("site", "docs/topics", "docs/related")
                  for path in (root / folder).rglob("*") if path.is_file() and str(path.relative_to(root)) not in outputs]
    if unexpected:
        raise ValueError("unexpected generated files require explicit cleanup: " + ", ".join(unexpected))
    changed = ["data/papers.json"] if text.encode() != raw else []
    changed += [name for name, content in outputs.items() if not (root / name).is_file() or (root / name).read_text(encoding="utf-8") != content]
    if write and changed:
        # All validation/rendering finishes before any mutation. Refuse stale local bytes.
        # Callers must serialize writers; remote publication additionally checks the parent commit.
        if canonical.read_bytes() != raw:
            raise ValueError("catalog changed while preparing update; retry from current data")
        for name, content in outputs.items():
            atomic_write(root / name, content)
        atomic_write(canonical, text)
    return {"mode": "written" if write else "dry-run", "before_sha256": before,
            "catalog_sha256": hashlib.sha256(text.encode()).hexdigest(), "paper_count": len(data["papers"]),
            "coverage": json.loads(outputs["generated-manifest.json"])["coverage"], "changed_files": changed}


def apply_patch_file(patch_path, root=ROOT, expect_sha256=None, updated=None, write=False):
    if not write:
        return _apply_patch_file(patch_path, root, expect_sha256, updated, False)
    if not expect_sha256:
        raise ValueError("--write requires --expect-sha256 from the current canonical bytes")
    lock = root / ".catalog-update.lock"
    try:
        fd = os.open(lock, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        raise ValueError("another catalog writer holds .catalog-update.lock; wait for it to finish")
    try:
        with os.fdopen(fd, "w") as stream:
            stream.write(str(os.getpid()) + "\n")
        return _apply_patch_file(patch_path, root, expect_sha256, updated, True)
    finally:
        lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("patch", type=Path)
    parser.add_argument("--expect-sha256", help="refuse a patch based on stale canonical bytes")
    parser.add_argument("--updated", help="explicit content-update date; does not modify publication dates")
    parser.add_argument("--write", action="store_true", help="write validated canonical data and regenerate every output")
    args = parser.parse_args()
    try:
        print(json.dumps(apply_patch_file(args.patch, expect_sha256=args.expect_sha256, updated=args.updated, write=args.write), indent=2))
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"Update refused: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
