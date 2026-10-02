"""Offline validation, metadata-baseline, link, determinism and drift checks."""
import copy
import hashlib
import json
import re
import subprocess
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import generate
from verify_migration import audit


class CatalogTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.raw = (ROOT / "data/papers.json").read_bytes()
        cls.data = json.loads(cls.raw)
        cls.outputs = generate.generate(cls.data, cls.raw)

    def test_schema(self):
        generate.validate(self.data)

    def test_baseline_ids_and_company_mentions_retained(self):
        report = audit()
        self.assertEqual(report["baseline_papers"], 271)
        self.assertEqual(report["core"], 77)
        self.assertEqual(report["related"], 194)

    def test_deterministic_output(self):
        self.assertEqual(self.outputs, generate.generate(self.data, self.raw))

    def test_committed_output_has_no_drift(self):
        for path, expected in self.outputs.items():
            with self.subTest(path=path):
                self.assertEqual((ROOT / path).read_text(encoding="utf-8"), expected)

    def test_check_command(self):
        result = subprocess.run([sys.executable, str(ROOT / "scripts/generate.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_check_detects_drift_and_unexpected_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            files = dict(self.outputs)
            for source in ("scripts/generate.py", "data/papers.json", "web/index.html", "web/zh.html", "web/styles.css", "web/app.js", "web/favicon.svg"):
                files[source] = (ROOT / source).read_text(encoding="utf-8")
            for path, content in files.items():
                target = root / path
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content)
            (root / "README.md").write_text("manual drift\n")
            (root / "site/unexpected.txt").write_text("not part of the artifact\n")
            result = subprocess.run([sys.executable, str(root / "scripts/generate.py"), "--check"], capture_output=True, text=True)
            self.assertEqual(result.returncode, 1)
            self.assertIn("README.md", result.stderr)
            self.assertIn("site/unexpected.txt", result.stderr)

    def test_duplicate_arxiv_id_rejected(self):
        data = copy.deepcopy(self.data)
        data["papers"].append(data["papers"][0])
        with self.assertRaisesRegex(ValueError, "duplicate arXiv"):
            generate.validate(data)

    def test_new_paper_updates_all_views_and_counts(self):
        data = copy.deepcopy(self.data)
        new = copy.deepcopy(data["papers"][0])
        new["id"] = "2610.99999"
        new["title"] = "Synthetic fixture for generator testing"
        new["links"] = [{"label": "Paper", "url": "https://arxiv.org/abs/2610.99999"}]
        new.pop("original_abstract", None)
        new.pop("summaries", None)
        data["papers"].append(new)
        raw = generate.json_text(data).encode()
        outputs = generate.generate(data, raw)
        self.assertEqual(json.loads(outputs["generated-manifest.json"])["paper_count"], len(data["papers"]))
        self.assertEqual(len(json.loads(outputs["site/catalog.json"])["papers"]), len(data["papers"]))
        self.assertIn(new["title"], outputs["docs/topics/scaling-law-theory.md"])
        self.assertIn(f"**{len(data['papers'])} papers**", outputs["README.md"])

    def test_metadata_correction_updates_both_views(self):
        data = copy.deepcopy(self.data)
        data["papers"][0]["summaries"]["en"]["text"] = "Corrected summary for test coverage."
        data["papers"][0]["venue"] = "Verified venue fixture"
        raw = generate.json_text(data).encode()
        outputs = generate.generate(data, raw)
        self.assertIn("Corrected summary for test coverage.", outputs["docs/topics/scaling-law-theory.md"])
        self.assertEqual(json.loads(outputs["site/catalog.json"])["papers"][0]["venue"], "Verified venue fixture")

    def test_unknown_tags_rejected(self):
        data = copy.deepcopy(self.data)
        data["papers"][0]["tags"].append("invented label")
        with self.assertRaisesRegex(ValueError, "unknown tag"):
            generate.validate(data)

    def test_mismatched_collection_rejected(self):
        data = copy.deepcopy(self.data)
        data["papers"][0]["collection"] = "related"
        with self.assertRaisesRegex(ValueError, "category/collection"):
            generate.validate(data)

    def test_unsafe_and_wrong_arxiv_links_rejected(self):
        for url in ("javascript:alert(1)", "https://arxiv.org/abs/1111.11111", "https://user:pass@example.org"):
            with self.subTest(url=url):
                data = copy.deepcopy(self.data)
                data["papers"][0]["links"][0]["url"] = url
                with self.assertRaises(ValueError):
                    generate.validate(data)

    def test_doi_duplicates_rejected(self):
        data = copy.deepcopy(self.data)
        data["papers"][0]["doi"] = "10.1234/paper"
        data["papers"][1]["doi"] = "10.1234/PAPER"
        with self.assertRaisesRegex(ValueError, "duplicate DOI"):
            generate.validate(data)

    def test_missing_fields_rejected(self):
        data = copy.deepcopy(self.data)
        del data["papers"][0]["title"]
        with self.assertRaisesRegex(ValueError, "title"):
            generate.validate(data)

    def test_every_record_in_topic_and_site(self):
        public = json.loads(self.outputs["site/catalog.json"])
        public_papers = {paper["id"]: paper for paper in public["papers"]}
        categories = {c["id"]: c for c in self.data["categories"]}
        for paper in self.data["papers"]:
            with self.subTest(paper=paper["id"]):
                page = self.outputs[generate.category_path(categories[paper["category"]])]
                self.assertIn(f'id="{generate.anchor(paper["id"])}"', page)
                self.assertIn(generate.english_summary(paper), page)
                for key, value in paper.items():
                    self.assertEqual(public_papers[paper["id"]][key], value)

    def test_core_pages_keep_seven_columns(self):
        for path, content in self.outputs.items():
            if not path.startswith("docs/topics/"):
                continue
            self.assertIn(generate.TABLE_HEADER, content)
            for row in content.splitlines():
                if row.startswith("| "):
                    self.assertEqual(len(re.split(r"(?<!\\)\|", row)) - 2, 7)

    def test_generated_counts_and_fingerprint(self):
        manifest = json.loads(self.outputs["generated-manifest.json"])
        public = json.loads(self.outputs["site/catalog.json"])
        fingerprint = hashlib.sha256(self.raw).hexdigest()
        self.assertEqual(manifest["catalog_sha256"], fingerprint)
        self.assertEqual(public["meta"]["catalog_sha256"], fingerprint)
        self.assertIn(f'content="{fingerprint}"', self.outputs["site/index.html"])
        self.assertEqual(manifest["paper_count"], len(self.data["papers"]))
        self.assertEqual(sum(manifest["collection_counts"].values()), len(self.data["papers"]))
        for path, expected in manifest["files"].items():
            self.assertEqual(hashlib.sha256(self.outputs[path].encode()).hexdigest(), expected)

    def test_company_links_have_valid_papers(self):
        memberships = generate.company_memberships(self.data)
        for company in self.data["companies"]:
            for mention in company["legacy_entries"]:
                self.assertIn(company["id"], memberships[mention["paper_id"]])

    def test_relative_markdown_links_and_anchors(self):
        markdown = {path: text for path, text in self.outputs.items() if path.endswith(".md")}
        for path in ("CONTRIBUTING.md", "docs/deployment.md", "migration/README.md"):
            markdown[path] = (ROOT / path).read_text(encoding="utf-8")
        for path, content in markdown.items():
            for href in re.findall(r"(?<!\\)\]\(([^\s)]+)\)", content):
                url = urlsplit(href)
                if url.scheme or url.netloc:
                    continue
                destination = (ROOT / path).parent / unquote(url.path) if url.path else ROOT / path
                destination = destination.resolve()
                with self.subTest(source=path, href=href):
                    self.assertTrue(destination.is_file(), f"missing {destination}")
                    self.assertTrue(destination.is_relative_to(ROOT))
                    if url.fragment and destination.suffix == ".md":
                        target = destination.read_text(encoding="utf-8")
                        anchors = re.findall(r'<a id="([^"]+)"', target)
                        anchors += [generate.legacy_anchor(x) for x in re.findall(r"^#+ (.+)$", target, re.M)]
                        self.assertIn(unquote(url.fragment), anchors)

    def test_previous_readme_category_anchors_retained(self):
        baseline = json.loads((ROOT / "migration/metadata-baseline.json").read_text(encoding="utf-8"))
        for category in baseline["categories"]:
            self.assertIn(f'id="{generate.legacy_anchor(category["title"])}"', self.outputs["README.md"])

    def test_site_relative_assets_and_no_external_dependencies(self):
        class Assets(HTMLParser):
            links = []
            def handle_starttag(self, tag, attrs):
                attrs = dict(attrs)
                if tag in ("script", "link", "img"):
                    value = attrs.get("src", attrs.get("href"))
                    if value:
                        self.links.append(value)
        parser = Assets()
        parser.feed(self.outputs["site/index.html"])
        for path in parser.links:
            self.assertTrue(path.startswith("./"), path)
            self.assertIn("site/" + path[2:], self.outputs)
        self.assertNotIn("@import", self.outputs["site/styles.css"])
        self.assertNotIn("innerHTML", self.outputs["site/app.js"])
        self.assertNotRegex(self.outputs["site/index.html"], r"\{\{[A-Z_]+\}\}")

    def test_homepage_hero_only_contains_project_name(self):
        for language in ("index.html", "zh.html"):
            for path, content in (
                (f"web/{language}", (ROOT / "web" / language).read_text(encoding="utf-8")),
                (f"site/{language}", self.outputs[f"site/{language}"]),
            ):
                with self.subTest(path=path):
                    hero = re.search(r'<div class="hero-copy">(.*?)</div>', content, re.S)
                    self.assertIsNotNone(hero)
                    self.assertEqual(hero.group(1).strip(), '<h1 id="hero-title" tabindex="-1">Awesome CTR Scaling</h1>')
                    for element_id in ("language-switch", "total-stat", "core-stat", "related-stat", "updated-at", "filter-toggle", "search-input"):
                        self.assertIn(f'id="{element_id}"', content)


if __name__ == "__main__":
    unittest.main()
