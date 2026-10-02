"""Offline favicon generation, project-prefix linking and SVG safety checks."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import sys
import unittest
from urllib.parse import urljoin
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import generate


class IconParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.icons = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and "icon" in attrs.get("rel", "").split():
            self.icons.append(attrs)


class FaviconTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        raw = (ROOT / "data/papers.json").read_bytes()
        cls.outputs = generate.generate(json.loads(raw), raw)

    def test_svg_is_copied_and_in_manifest(self):
        source = (ROOT / "web/favicon.svg").read_text(encoding="utf-8")
        self.assertEqual(self.outputs["site/favicon.svg"], source)
        manifest = json.loads(self.outputs["generated-manifest.json"])
        self.assertEqual(manifest["files"]["site/favicon.svg"],
                         hashlib.sha256(source.encode()).hexdigest())

    def test_both_languages_use_project_relative_svg_icon(self):
        for name in ("index.html", "zh.html"):
            with self.subTest(page=name):
                parser = IconParser()
                parser.feed(self.outputs[f"site/{name}"])
                self.assertEqual(len(parser.icons), 1)
                icon = parser.icons[0]
                self.assertEqual(icon["type"], "image/svg+xml")
                self.assertEqual(icon["sizes"], "any")
                self.assertEqual(icon["href"], "./favicon.svg")
                self.assertEqual(
                    urljoin(f"https://example.test/Awesome-CTR-Scaling/{name}", icon["href"]),
                    "https://example.test/Awesome-CTR-Scaling/favicon.svg")

    def test_svg_is_square_self_contained_and_passive(self):
        source = self.outputs["site/favicon.svg"]
        self.assertNotIn("<!DOCTYPE", source)
        self.assertNotIn("<!ENTITY", source)
        self.assertNotIn("<?xml-stylesheet", source)
        svg = ET.fromstring(source)
        namespace = "{http://www.w3.org/2000/svg}"
        self.assertEqual(svg.tag, namespace + "svg")
        self.assertEqual(svg.attrib["viewBox"], "0 0 32 32")
        self.assertEqual(svg.attrib["width"], svg.attrib["height"])
        self.assertIsNotNone(svg.find(namespace + "title"))
        for element in svg.iter():
            self.assertIn(element.tag, {namespace + tag for tag in ("svg", "title", "rect", "g", "path")})
            for key, value in element.attrib.items():
                self.assertFalse(key.lower().startswith("on"), key)
                self.assertNotIn("href", key.lower())
                self.assertNotIn("url(", value.lower())


if __name__ == "__main__":
    unittest.main()
