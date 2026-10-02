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
from zoneinfo import ZoneInfo
import generate

ROOT = Path(__file__).resolve().parents[1]
FIELDS = {"id", "title", "collection", "category", "affiliation", "venue", "year", "tags", "links", "aliases", "doi", "original_abstract", "summaries", "source_dates", "change_source_url"}


def semantic(value, field):
    result = copy.deepcopy(value)
    if isinstance(result, dict):
        if field == "original_abstract":
            result.pop("retrieved_at", None)
        elif field == "source_dates":
            result.pop("verified_at", None)
        elif field == "summaries":
            for summary in result.values():
                if isinstance(summary, dict):
                    summary.pop("updated_at", None)
    return result


def merge_patches(data, patch, changed_at=None):
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
        values = {key: copy.deepcopy(value) for key, value in item.items() if key != "change_source_url"}
        if pid not in by_id:
            generate.utc_timestamp(changed_at)
            new = values
            source = item.get("change_source_url") or f"https://arxiv.org/abs/{pid}"
            if not generate.safe_url(source):
                raise ValueError(f"{pid}: invalid change_source_url")
            new.update(added_at=changed_at, added_provenance={"kind": "catalog_entry", "source_url": source}, change_history=[])
            result["papers"].append(new)
            by_id[pid] = new
        else:
            target = by_id[pid]
            before = copy.deepcopy(target)
            fields = []
            for key, value in values.items():
                if key == "id":
                    continue
                if key == "summaries" and isinstance(value, dict):
                    value = {**target.get(key, {}), **value}
                if key == "original_abstract" and (target.get(key) or {}).get("status") == "verified" and isinstance(value, dict) and value.get("status") != "verified":
                    raise ValueError(f"{pid}: preserve verified original abstract during source outages")
                if key == "source_dates" and target.get(key) and value is None:
                    raise ValueError(f"{pid}: preserve verified source dates during source outages")
                # Retrieval and summary-edit clocks alone are not content changes.
                if semantic(target.get(key), key) != semantic(value, key):
                    target[key] = value
                    fields.append(key)
            if not fields:
                continue
            try:
                generate.utc_timestamp(changed_at)
            except ValueError:
                raise ValueError(f"{pid}: actual content changes require --changed-at UTC timestamp")
            source = item.get("change_source_url")
            if not generate.safe_url(source):
                raise ValueError(f"{pid}: content changes require change_source_url evidence")
            events = []
            if "venue" in fields:
                events.append({"at": changed_at, "kind": "venue_update", "fields": ["venue"], "source_url": source})
                fields.remove("venue")
            old_dates, new_dates = before.get("source_dates") or {}, target.get("source_dates") or {}
            revised = ("source_dates" in fields and old_dates.get("source_version") and new_dates.get("source_version")
                       and old_dates["source_version"] != new_dates["source_version"])
            if revised:
                if (int(new_dates["source_version"][1:]) <= int(old_dates["source_version"][1:])
                        or new_dates.get("updated_at", "") <= old_dates.get("updated_at", "")):
                    raise ValueError(f"{pid}: source revision cannot regress version or update date")
                revision_fields = [f for f in fields if f in ("source_dates", "original_abstract", "summaries")]
                events.append({"at": changed_at, "kind": "paper_revision", "fields": sorted(revision_fields), "source_url": new_dates["source_url"], "source_version": new_dates["source_version"]})
                fields = [f for f in fields if f not in revision_fields]
            if fields:
                events.append({"at": changed_at, "kind": "metadata_enrichment", "fields": sorted(fields), "source_url": source})
            target["change_history"].extend(events)
    result["schema_version"] = 4
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


def _apply_patch_file(patch_path, root=ROOT, expect_sha256=None, updated=None, write=False, changed_at=None):
    canonical = root / "data/papers.json"
    raw = canonical.read_bytes()
    before = hashlib.sha256(raw).hexdigest()
    if expect_sha256 and before != expect_sha256:
        raise ValueError(f"stale catalog: expected {expect_sha256}, actual {before}; rebase the patch on current data")
    original = json.loads(raw)
    data = merge_patches(original, json.loads(Path(patch_path).read_text(encoding="utf-8")), changed_at)
    if data != original:
        stamp = generate.utc_timestamp(changed_at)
        maintenance_day = stamp.astimezone(ZoneInfo("Asia/Shanghai")).date().isoformat()
        if updated and date.fromisoformat(updated).isoformat() != maintenance_day:
            raise ValueError("--updated must match --changed-at in Asia/Shanghai")
        data["meta"]["updated"] = maintenance_day
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


def apply_patch_file(patch_path, root=ROOT, expect_sha256=None, updated=None, write=False, changed_at=None):
    if not write:
        return _apply_patch_file(patch_path, root, expect_sha256, updated, False, changed_at)
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
        return _apply_patch_file(patch_path, root, expect_sha256, updated, True, changed_at)
    finally:
        lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("patch", type=Path)
    parser.add_argument("--expect-sha256", help="refuse a patch based on stale canonical bytes")
    parser.add_argument("--updated", help="optional Asia/Shanghai maintenance date; must agree with --changed-at")
    parser.add_argument("--changed-at", help="explicit UTC content-change instant YYYY-MM-DDTHH:MM:SSZ; reused for dry-run and write")
    parser.add_argument("--write", action="store_true", help="write validated canonical data and regenerate every output")
    args = parser.parse_args()
    try:
        print(json.dumps(apply_patch_file(args.patch, expect_sha256=args.expect_sha256, updated=args.updated, write=args.write, changed_at=args.changed_at), indent=2))
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"Update refused: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
