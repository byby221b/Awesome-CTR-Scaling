"""Cross-resource invariants and safe retirement of owned immutable assets."""
import hashlib
import json
import re
import sys
import tempfile
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import generate

class LayeredTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.raw = (ROOT / 'data/papers.json').read_bytes()
        cls.outputs = generate.generate(json.loads(cls.raw), cls.raw)
        html = cls.outputs['site/index.html']
        cls.version_path = re.search(r'id="asset-version" data-path="([^"]+)"', html)[1]
        cls.version = json.loads(cls.outputs['site/' + cls.version_path])

    def test_exact_reconstruction_and_complete_search_fields(self):
        version = self.version
        full = json.loads(self.outputs['site/catalog.json'])
        directory = json.loads(self.outputs['site/' + version['directory']['path']])
        details = {}
        for group in version['details']:
            rows = json.loads(self.outputs['site/' + group['path']])['papers']
            self.assertLessEqual(len(rows), 24)
            self.assertEqual([p['id'] for p in rows], group['ids'])
            for row in rows:
                self.assertNotIn(row['id'], details)
                details[row['id']] = row
        for light, original in zip(directory['papers'], full['papers']):
            self.assertNotIn('summaries', light)
            self.assertNotIn('text', light['original_abstract'])
            self.assertEqual({**light, **details[light['id']]}, original)
        search = json.loads(self.outputs['site/' + version['search']['path']])
        self.assertEqual([p['id'] for p in search['papers']], [p['id'] for p in full['papers']])
        self.assertTrue(all(all(isinstance(t, str) for t in row['texts']) for row in search['papers']))
        self.assertEqual(version['paper_count'], len(full['papers']))

    def test_every_asset_bound_to_html_and_manifest(self):
        source_hash = hashlib.sha256(self.raw).hexdigest()
        manifest = json.loads(self.outputs['generated-manifest.json'])
        for name, text in self.outputs.items():
            if not name.startswith('site/assets/'):
                continue
            digest = hashlib.sha256(text.encode()).hexdigest()
            self.assertTrue(name.endswith(digest + '.json'))
            self.assertEqual(manifest['files'][name], digest)
            value = json.loads(text)
            self.assertEqual(value['catalog_sha256'], source_hash)
            self.assertEqual((value['schema'], value['search_version']), (1, 1))
        for lang in ['index.html', 'zh.html']:
            self.assertIn(self.version_path, self.outputs['site/' + lang])

    def test_retirement_refuses_modified_and_unowned_files(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            body = b'{"old":true}\n'; sha = hashlib.sha256(body).hexdigest()
            name = 'site/assets/details-' + sha + '.json'
            target = root / name; target.parent.mkdir(parents=True); target.write_bytes(body)
            (root / 'generated-manifest.json').write_text(json.dumps({'files': {name: sha}}))
            self.assertEqual(generate.retired_assets(root, {}), [name])
            self.assertEqual(generate.retired_assets(root, {name: body.decode()}), [])
            target.write_bytes(body + b'changed')
            self.assertEqual(generate.retired_assets(root, {}), [])
            target.write_bytes(body)
            (root / 'generated-manifest.json').write_text('{"files":{}}')
            self.assertEqual(generate.retired_assets(root, {}), [])
