"""Regression tests for source provenance, bilingual coverage and safe update patches."""
import copy
import hashlib
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import generate
import upsert_papers

class EnrichmentTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / "data/papers.json").read_bytes())

    def test_bilingual_pages_share_fingerprint_and_assets(self):
        raw = generate.json_text(self.data).encode()
        outputs = generate.generate(self.data, raw)
        digest = hashlib.sha256(raw).hexdigest()
        self.assertIn('<html lang="en">', outputs['site/index.html'])
        self.assertIn('<html lang="zh-CN">', outputs['site/zh.html'])
        for name in ('site/index.html', 'site/zh.html'):
            self.assertIn(f'content="{digest}"', outputs[name])
            self.assertIn('href="./styles.css"', outputs[name])
            self.assertIn('src="./app.js"', outputs[name])
            self.assertNotIn('{{', outputs[name])

    def test_coverage_is_record_based(self):
        outputs = generate.generate(self.data, generate.json_text(self.data).encode())
        public = json.loads(outputs['site/catalog.json'])
        manifest = json.loads(outputs['generated-manifest.json'])
        self.assertEqual(public['coverage'], manifest['coverage'])
        self.assertEqual(public['coverage']['verified_abstracts'], sum(p.get('original_abstract', {}).get('status') == 'verified' for p in self.data['papers']))
        for lang, name in [('en', 'english_summaries'), ('zh', 'chinese_summaries')]:
            self.assertEqual(public['coverage'][name], sum(bool(p.get('summaries', {}).get(lang, {}).get('text')) for p in self.data['papers']))

    def test_original_text_preserved_exactly(self):
        raw = generate.json_text(self.data).encode()
        public = json.loads(generate.generate(self.data, raw)['site/catalog.json'])
        for before, after in zip(self.data['papers'], public['papers']):
            self.assertEqual(before.get('original_abstract'), after.get('original_abstract'))
            self.assertEqual(before.get('summaries'), after.get('summaries'))

    def test_missing_abstract_is_honest_and_valid(self):
        p = self.data['papers'][0]
        p['original_abstract'] = dict(status='unavailable', text='', language='en', source_url=f"https://arxiv.org/abs/{p['id']}", retrieved_at=None, license=None, reason='Source request failed; no verified original.')
        p.pop('summaries', None)
        generate.validate(self.data)
        p['original_abstract']['text'] = 'Fabricated fallback.'
        with self.assertRaisesRegex(ValueError, 'only a verified abstract'):
            generate.validate(self.data)

    def test_verified_abstract_needs_timestamp_and_safe_source(self):
        for field, value in [('retrieved_at', None), ('retrieved_at', '2026-10-02T04:00:00'), ('source_url', 'javascript:alert(1)'), ('text', '')]:
            with self.subTest(field=field):
                data = copy.deepcopy(self.data)
                data['papers'][0]['original_abstract'][field] = value
                with self.assertRaises(ValueError): generate.validate(data)

    def test_arxiv_source_identity_and_version_match(self):
        for field, value in [('source_url', 'https://arxiv.org/abs/1111.11111v1'), ('source_version', 'v999')]:
            data = copy.deepcopy(self.data)
            data['papers'][0]['original_abstract'][field] = value
            with self.assertRaisesRegex(ValueError, 'source .* mismatch'): generate.validate(data)
        data = copy.deepcopy(self.data)
        summary = dict(text='Test summary.', basis='original_abstract', method='editorial', updated_at='2026-10-02', source_urls=['https://arxiv.org/abs/1111.11111'])
        data['papers'][0]['summaries'] = {'en': summary}
        with self.assertRaisesRegex(ValueError, 'source identity mismatch'): generate.validate(data)

    def test_abstract_summary_requires_verified_basis(self):
        data = copy.deepcopy(self.data)
        p = data['papers'][0]
        p.pop('original_abstract')
        p['summaries'] = {'en':dict(text='Test.',basis='original_abstract',method='editorial',updated_at='2026-10-02',source_urls=[f"https://arxiv.org/abs/{p['id']}"])}
        with self.assertRaisesRegex(ValueError, 'requires a verified'): generate.validate(data)
        p['summaries']['en']['basis'] = 'catalog_contribution'
        with self.assertRaisesRegex(ValueError, 'basis must be original_abstract'): generate.validate(data)

    def test_normalized_title_duplicates_rejected(self):
        self.data['papers'][1]['title'] = self.data['papers'][0]['title'].upper() + '!!!'
        with self.assertRaisesRegex(ValueError, 'duplicate normalized title'): generate.validate(self.data)

    def test_partial_patch_preserves_every_unmentioned_field(self):
        p = self.data['papers'][0]
        summary = dict(text='定点更新中文总结。',basis='original_abstract',method='editorial',updated_at='2026-10-02',source_urls=[p['original_abstract']['source_url']])
        merged = upsert_papers.merge_patches(self.data, {'papers':[{'id':p['id'],'summaries':{'zh':summary}}]})
        for key, value in p.items():
            if key != 'summaries': self.assertEqual(merged['papers'][0][key], value)
        self.assertEqual(merged['papers'][0]['summaries'].get('en'), p.get('summaries', {}).get('en'))
        self.assertEqual(merged['papers'][0]['summaries']['zh'], summary)
        self.assertEqual(merged['papers'][1:], self.data['papers'][1:])

    def test_new_enriched_paper_updates_every_view(self):
        paper = copy.deepcopy(self.data['papers'][0])
        paper['id'] = '2610.99999'
        paper['title'] = 'Synthetic bilingual enrichment test fixture'
        source = 'https://arxiv.org/abs/2610.99999v1'
        paper['links'] = [{'label':'Paper','url':'https://arxiv.org/abs/2610.99999'}]
        paper['original_abstract'] = dict(status='verified',text='A genuine-source fixture for tests only.',language='en',source_url=source,retrieved_at='2026-10-02T04:00:00Z',license=None,source_version='v1',source_title=paper['title'])
        paper['summaries'] = {lang:dict(text=text,basis='original_abstract',method='editorial',updated_at='2026-10-02',source_urls=[source]) for lang,text in [('en','English fixture summary.'),('zh','中文测试总结。')]}
        data = upsert_papers.merge_patches(self.data, {'papers':[paper]})
        outputs = generate.generate(data, generate.json_text(data).encode())
        public = json.loads(outputs['site/catalog.json'])
        self.assertEqual(public['papers'][-1]['summaries']['zh']['text'], '中文测试总结。')
        self.assertEqual(public['coverage']['verified_abstracts'], sum(p.get('original_abstract', {}).get('status') == 'verified' for p in self.data['papers']) + 1)
        self.assertIn(paper['title'], outputs['docs/topics/scaling-law-theory.md'])
        self.assertIn(f"**{len(data['papers'])} papers**", outputs['README.md'])
        for page in ('site/index.html', 'site/zh.html'):
            self.assertIn(str(len(data['papers'])), outputs[page])

    def test_patch_rejects_duplicate_unknown_and_incomplete_records(self):
        pid = self.data['papers'][0]['id']
        for patch in [{'papers':[{'id':pid},{'id':pid}]}, {'papers':[{'id':pid,'sumaries':{}}]}, {'papers':[{'id':'2610.99999'}]}, {'papers':[], 'delete':pid}]:
            with self.subTest(patch=patch):
                with self.assertRaises(ValueError): upsert_papers.merge_patches(self.data, patch)

    def test_dry_run_stale_guard_lock_and_all_generated_outputs(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / 'web', root / 'web')
            shutil.copytree(ROOT / 'data', root / 'data')
            patch = root / 'patch.json'
            paper = self.data['papers'][0]
            patch.write_text(json.dumps({'papers':[{'id':paper['id'], 'aliases':paper.get('aliases', []) + ['Safe update fixture']}]}))
            before = (root / 'data/papers.json').read_bytes()
            sha = hashlib.sha256(before).hexdigest()
            preview = upsert_papers.apply_patch_file(patch, root, sha, '2026-10-02')
            self.assertEqual(preview['mode'], 'dry-run')
            self.assertEqual((root / 'data/papers.json').read_bytes(), before)
            self.assertFalse((root / 'site').exists())
            with self.assertRaisesRegex(ValueError, 'requires --expect-sha256'): upsert_papers.apply_patch_file(patch, root, write=True)
            with self.assertRaisesRegex(ValueError, 'stale catalog'): upsert_papers.apply_patch_file(patch, root, '0'*64, write=True)
            self.assertFalse((root / '.catalog-update.lock').exists())
            (root / '.catalog-update.lock').write_text('another writer')
            with self.assertRaisesRegex(ValueError, 'another catalog writer'): upsert_papers.apply_patch_file(patch, root, sha, write=True)
            self.assertEqual((root / 'data/papers.json').read_bytes(), before)
            (root / '.catalog-update.lock').unlink()
            result = upsert_papers.apply_patch_file(patch, root, sha, '2026-10-02', True)
            self.assertEqual(result['mode'], 'written')
            final = (root / 'data/papers.json').read_bytes()
            outputs = generate.generate(json.loads(final), final, root)
            for path, expected in outputs.items(): self.assertEqual((root / path).read_text(), expected)
            self.assertIn('site/zh.html', outputs)
            self.assertFalse((root / '.catalog-update.lock').exists())


    def test_removed_annotations_cannot_be_reintroduced(self):
        self.assertEqual(self.data['schema_version'], 3)
        self.assertTrue(all('contribution' not in paper for paper in self.data['papers']))
        self.assertFalse((ROOT / 'migration/original-README.md').exists())
        self.assertFalse((ROOT / 'scripts/legacy.py').exists())
        pid = self.data['papers'][0]['id']
        with self.assertRaisesRegex(ValueError, 'unknown patch fields contribution'):
            upsert_papers.merge_patches(self.data, {'papers':[{'id':pid, 'contribution':'Obsolete annotation fixture.'}]})
        self.data['papers'][0]['contribution'] = 'Obsolete annotation fixture.'
        with self.assertRaisesRegex(ValueError, 'contribution was removed'):
            generate.validate(self.data)
        del self.data['papers'][0]['contribution']
        self.data['schema_version'] = 2
        with self.assertRaisesRegex(ValueError, 'schema_version must be 3'):
            generate.validate(self.data)

    def test_all_markdown_descriptions_derive_from_english_summaries(self):
        outputs = generate.generate(self.data, generate.json_text(self.data).encode())
        categories = {category['id']: category for category in self.data['categories']}
        public = json.loads(outputs['site/catalog.json'])
        self.assertTrue(all('contribution' not in paper for paper in public['papers']))
        for paper in self.data['papers']:
            page = outputs[generate.category_path(categories[paper['category']])]
            self.assertIn(generate.english_summary(paper), page)
        paper = self.data['papers'][0]
        paper['summaries']['en']['text'] = 'A | B\nSame source, second line.'
        outputs = generate.generate(self.data, generate.json_text(self.data).encode())
        page = outputs[generate.category_path(categories[paper['category']])]
        self.assertIn('A \\| B<br>Same source, second line.', page)
        del paper['summaries']['en']
        outputs = generate.generate(self.data, generate.json_text(self.data).encode())
        self.assertIn('English summary not yet available.', outputs[generate.category_path(categories[paper['category']])])

    def test_strict_audit_preserves_metadata_but_allows_new_papers(self):
        import verify_migration
        from unittest.mock import patch
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / 'migration', root / 'migration')
            (root / 'data').mkdir()
            self.data['papers'].append({'id':'2610.99999'})
            target = root / 'data/papers.json'
            target.write_text(json.dumps(self.data))
            with patch.object(verify_migration, 'ROOT', root):
                report = verify_migration.audit(strict=True)
                self.assertEqual(report['changed_metadata_fields'], 0)
                self.assertEqual(report['metadata_fields_compared'], 271 * 9)
                self.data['papers'][0]['venue'] = 'Verified later correction fixture'
                target.write_text(json.dumps(self.data))
                self.assertEqual(verify_migration.audit()['changed_metadata_fields'], 1)
                with self.assertRaisesRegex(AssertionError, 'baseline metadata differences'):
                    verify_migration.audit(strict=True)

if __name__ == '__main__': unittest.main()
