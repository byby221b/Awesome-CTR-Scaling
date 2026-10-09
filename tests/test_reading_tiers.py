"""Final-tier schema, import isolation, and updater preservation tests."""
import copy
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import generate
import import_reading_tiers as importer
import upsert_papers


class ReadingTierTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / "data/papers.json").read_text())
        cls.pid = cls.data["papers"][0]["id"]

    def payload(self, tier="prioritize"):
        return {"papers": [{"id": self.pid, "reading_tier": tier}]}

    def test_supported_tiers_and_unrated(self):
        for tier in [None, *generate.READING_TIERS]:
            result = importer.merge_tiers(self.data, self.payload(tier))
            self.assertEqual(result["papers"][0]["reading_tier"], tier)
            self.assertEqual(result["papers"][1:], self.data["papers"][1:])
        result = copy.deepcopy(self.data)
        result["papers"][0].pop("reading_tier", None)
        generate.validate(result)
        self.assertEqual(generate.reading_label(result["papers"][0]), "Unrated")

    def test_unknown_record_fields_rejected(self):
        data = copy.deepcopy(self.data)
        data["papers"][0]["unexpected_annotation"] = "not a schema field"
        with self.assertRaisesRegex(ValueError, "unsupported paper fields"):
            generate.validate(data)

    def test_recursive_field_allowlists_reject_unknown_canonical_data(self):
        paths = [(), ("meta",), ("meta", "history"), ("categories", 0),
                 ("companies", 0), ("companies", 0, "legacy_entries", 0),
                 ("papers", 0), ("papers", 0, "links", 0),
                 ("papers", 0, "original_abstract"), ("papers", 0, "summaries"),
                 ("papers", 0, "summaries", "en"), ("papers", 0, "summaries", "zh"),
                 ("papers", 0, "source_dates"), ("papers", 0, "added_provenance"),
                 ("papers", 0, "change_history", 0)]
        for path in paths:
            with self.subTest(path=path):
                data = copy.deepcopy(self.data)
                target = data
                for key in path:
                    target = target[key]
                target["unexpected_field"] = {"nested": "SCHEMA_CANARY"}
                with self.assertRaisesRegex(ValueError, "unsupported") as caught:
                    generate.validate(data)
                self.assertNotIn("SCHEMA_CANARY", str(caught.exception))
                self.assertNotIn("unexpected_field", str(caught.exception))
                with self.assertRaises(ValueError):
                    importer.merge_tiers(data, self.payload())

    def test_nested_objects_cannot_hide_in_scalar_fields_or_arrays(self):
        paths = [("meta", "history", "backfill_policy"),
                 ("papers", 0, "original_abstract", "license"),
                 ("papers", 0, "tags", 0),
                 ("papers", 0, "summaries", "en", "source_urls", 0),
                 ("papers", 0, "change_history", 0, "fields", 0)]
        for path in paths:
            with self.subTest(path=path):
                data = copy.deepcopy(self.data)
                target = data
                for key in path[:-1]:
                    target = target[key]
                target[path[-1]] = {"unexpected_field": "SCHEMA_CANARY"}
                with self.assertRaisesRegex(ValueError, "must be a scalar"):
                    generate.validate(data)
                with self.assertRaises(ValueError):
                    generate.project_public_fields(data)

    def test_projection_preserves_public_fields_and_filters_each_object_boundary(self):
        baseline = copy.deepcopy(self.data)
        baseline["papers"][0]["original_abstract"]["reason"] = None
        generate.validate(baseline)
        projected = generate.project_public_fields(baseline)
        self.assertEqual(projected, baseline)
        self.assertIsNot(projected["papers"][0], baseline["papers"][0])
        data = copy.deepcopy(baseline)

        def add_unrecognized_fields(value):
            if isinstance(value, dict):
                for item in list(value.values()):
                    add_unrecognized_fields(item)
                value["unexpected_field"] = "SCHEMA_CANARY"
            elif isinstance(value, list):
                for item in value:
                    add_unrecognized_fields(item)

        add_unrecognized_fields(data)
        self.assertEqual(generate.project_public_fields(data), baseline)
        # Exercise the independent output boundary even if a future caller
        # accidentally omits canonical validation.
        with patch.object(generate, "validate"):
            outputs = generate.generate(data, generate.json_text(data).encode())
        self.assertTrue(all("SCHEMA_CANARY" not in content for content in outputs.values()))
        public = json.loads(outputs["site/catalog.json"])
        for expected, actual in zip(baseline["papers"], public["papers"]):
            self.assertEqual(expected, {key: actual[key] for key in expected})

    def test_ordinary_update_rejects_nested_unknown_fields(self):
        for field in ("original_abstract", "source_dates", "links", "summaries"):
            with self.subTest(field=field):
                value = copy.deepcopy(self.data["papers"][0][field])
                target = value[0] if field == "links" else value["en"] if field == "summaries" else value
                target["unexpected_field"] = "SCHEMA_CANARY"
                payload = {"papers": [{"id": self.pid, field: value,
                                       "change_source_url": f"https://arxiv.org/abs/{self.pid}"}]}
                with self.assertRaisesRegex(ValueError, "unsupported"):
                    upsert_papers.merge_patches(self.data, payload, "2026-10-09T13:00:00Z")

    def test_tier_type_and_enum_validation(self):
        for tier in ("", "unrated", "best", 0, False, [], {}):
            with self.subTest(tier=tier), self.assertRaises(ValueError):
                importer.merge_tiers(self.data, self.payload(tier))
            data = copy.deepcopy(self.data)
            data["papers"][0]["reading_tier"] = tier
            with self.assertRaises(ValueError):
                generate.validate(data)

    def test_input_shape_allowlist(self):
        for payload in ([], {}, {"papers": [], "extra": 1}, {"papers": {}},
                        {"papers": [{"id": self.pid}]},
                        {"papers": [{"id": self.pid, "reading_tier": None, "extra": 1}]},
                        {"papers": [{"id": "0000.00000", "reading_tier": None}]},
                        {"papers": [{"id": [], "reading_tier": None}]},
                        {"papers": self.payload()["papers"] * 2}):
            with self.subTest(payload=payload), self.assertRaises(ValueError):
                importer.merge_tiers(self.data, payload)

    def test_non_mutating_and_no_history_noise(self):
        before = copy.deepcopy(self.data)
        result = importer.merge_tiers(self.data, self.payload())
        self.assertEqual(self.data, before)
        expected = copy.deepcopy(before)
        expected["papers"][0]["reading_tier"] = "prioritize"
        self.assertEqual(result, expected)

    def test_ordinary_update_preserves_tiers(self):
        data = importer.merge_tiers(self.data, self.payload())
        payload = {"papers": [{"id": self.pid, "venue": "Verified venue test", "change_source_url": f"https://arxiv.org/abs/{self.pid}"}]}
        result = upsert_papers.merge_patches(data, payload, "2026-10-09T13:00:00Z")
        self.assertEqual(result["papers"][0]["reading_tier"], "prioritize")
        with self.assertRaisesRegex(ValueError, "unknown patch fields"):
            upsert_papers.merge_patches(data, self.payload(), "2026-10-09T13:00:00Z")

    def test_new_paper_starts_unrated(self):
        new = copy.deepcopy(self.data["papers"][0])
        new = {k: v for k, v in new.items() if k in upsert_papers.FIELDS}
        new.update(id="2610.99999", title="Tier default fixture", links=[{"label": "Paper", "url": "https://arxiv.org/abs/2610.99999"}])
        for key in ("original_abstract", "summaries", "source_dates", "doi"):
            new.pop(key, None)
        result = upsert_papers.merge_patches(self.data, {"papers": [new]}, "2026-10-09T13:00:00Z")
        self.assertIsNone(result["papers"][-1]["reading_tier"])

    def test_preview_write_stale_guard_and_lock(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "data").mkdir()
            raw = generate.json_text(self.data).encode()
            (root / "data/papers.json").write_bytes(raw)
            (root / "web").mkdir()
            for p in (ROOT / "web").iterdir():
                if p.is_file():
                    (root / "web" / p.name).write_bytes(p.read_bytes())
            path = root / "input.json"
            path.write_text(json.dumps(self.payload()))
            preview = importer.apply_tiers(path, root)
            self.assertEqual((root / "data/papers.json").read_bytes(), raw)
            self.assertEqual(preview["before_sha256"], hashlib.sha256(raw).hexdigest())
            for expected in (None, "0" * 64):
                with self.assertRaises(ValueError):
                    importer.apply_tiers(path, root, expected, True)
                self.assertEqual((root / "data/papers.json").read_bytes(), raw)
                self.assertFalse((root / ".catalog-update.lock").exists())
            (root / ".catalog-update.lock").write_text("another writer")
            with self.assertRaisesRegex(ValueError, "another catalog writer"):
                importer.apply_tiers(path, root, preview["before_sha256"], True)
            self.assertEqual((root / ".catalog-update.lock").read_text(), "another writer")
            (root / ".catalog-update.lock").unlink()
            report = importer.apply_tiers(path, root, preview["before_sha256"], True)
            self.assertEqual(report["mode"], "written")
            data = json.loads((root / "data/papers.json").read_text())
            self.assertEqual(data["papers"][0]["reading_tier"], "prioritize")
            public = json.loads((root / "site/catalog.json").read_text())
            self.assertEqual(public["papers"][0]["reading_tier"], "prioritize")


if __name__ == "__main__":
    unittest.main()
