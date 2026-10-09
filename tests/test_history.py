"""UTC history, semantic no-ops, provenance and daily updater integration."""
import copy
import hashlib
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import generate
import upsert_papers

STAMP = '2026-10-02T12:00:00Z'

class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.live_data = json.loads((ROOT / 'data/papers.json').read_bytes())
        self.data = copy.deepcopy(self.live_data)
        self.paper = self.data['papers'][0]
        # A deterministic updater fixture must not inherit tomorrow's live history.
        source = f"https://arxiv.org/abs/{self.paper['id']}v1"
        self.paper.update(added_at='2026-01-01T00:00:00Z', added_provenance={'kind':'catalog_entry','source_url':source}, change_history=[])
        self.paper['source_dates'] = {'published_at':'2026-01-01T00:00:00Z','updated_at':'2026-01-01T00:00:00Z','source_version':'v1','source_url':source,'verified_at':'2026-10-02T00:00:00Z'}
        self.paper['original_abstract'].update(source_version='v1',source_url=source)
        for summary in self.paper.get('summaries',{}).values(): summary['source_urls']=[source]

    def copy_fixture(self, root):
        shutil.copytree(ROOT/'web',root/'web')
        (root/'data').mkdir()
        (root/'data/papers.json').write_text(generate.json_text(self.data))

    def patch(self, fields, **kwargs):
        item = {'id': self.paper['id'], 'change_source_url': self.paper['links'][0]['url'], **fields}
        return upsert_papers.merge_patches(self.data, {'papers': [item]}, changed_at=kwargs.get('at', STAMP))

    def test_history_is_known_without_resetting_to_migration(self):
        baseline = {p['id'] for p in json.loads((ROOT/'migration/metadata-baseline.json').read_bytes())['papers']}
        recovered = [p for p in self.live_data['papers'] if p['id'] in baseline]
        self.assertEqual(len(recovered), len(baseline))
        self.assertTrue(all(p['added_at'] and p['added_provenance']['kind'] == 'repository_history' for p in recovered))
        restored = next(p for p in recovered if p['id'] == '2606.00422')
        self.assertTrue(restored['added_at'].startswith('2026-06-02'))
        kinds = [e['kind'] for p in recovered for e in p['change_history']]
        self.assertGreaterEqual(kinds.count('venue_update'), 54)
        self.assertGreaterEqual(kinds.count('metadata_enrichment'), 273)
        self.assertFalse(any(e['kind']=='paper_revision' and e['at']=='2026-10-02T05:34:42Z' for p in recovered for e in p['change_history']), 'the initial bulk backfill was not a source revision')

    def test_unknown_dates_are_valid_but_not_fabricated(self):
        self.paper.update(added_at=None, added_provenance=None, change_history=[])
        generate.validate(self.data)
        self.paper['added_provenance'] = {'kind':'catalog_entry','source_url':self.paper['links'][0]['url']}
        with self.assertRaisesRegex(ValueError, 'unknown added_at'): generate.validate(self.data)

    def test_bad_timestamp_and_unproved_added_date_are_rejected(self):
        for stamp in ['2026-10-02', '2026-10-02T12:00:00', '2026-10-02T20:00:00+08:00', '2026-13-02T00:00:00Z']:
            with self.subTest(stamp=stamp):
                d = copy.deepcopy(self.data); d['papers'][0]['added_at'] = stamp
                with self.assertRaises(ValueError): generate.validate(d)
        self.paper['added_provenance'] = None
        with self.assertRaisesRegex(ValueError, 'provenance'): generate.validate(self.data)

    def test_history_cannot_be_overwritten_by_patch(self):
        for key, value in [('added_at', STAMP), ('added_provenance', None), ('change_history', [])]:
            with self.subTest(key=key):
                with self.assertRaisesRegex(ValueError, 'unknown patch fields'): self.patch({key:value})

    def test_venue_and_metadata_events_are_separate_and_id_stable(self):
        result = self.patch({'venue':'Verified venue fixture', 'aliases':self.paper.get('aliases',[]) + ['New verified alias fixture']})
        after = result['papers'][0]
        self.assertEqual(after['added_at'], self.paper['added_at'])
        self.assertEqual(after['added_provenance'], self.paper['added_provenance'])
        self.assertEqual(after['id'], self.paper['id'])
        self.assertEqual([e['kind'] for e in after['change_history'][-2:]], ['venue_update','metadata_enrichment'])
        self.assertEqual(after['change_history'][-2]['fields'], ['venue'])
        self.assertEqual(result['papers'][1:], self.data['papers'][1:])
        self.assertNotIn('change_source_url', after)

    def test_duplicate_patch_and_fetch_clocks_are_noops(self):
        fields = {'venue':'Verified venue fixture'}
        first = self.patch(fields)
        item = {'id':self.paper['id'], 'change_source_url':self.paper['links'][0]['url'], **fields}
        self.assertEqual(first, upsert_papers.merge_patches(first, {'papers':[item]}, changed_at='2026-10-03T00:00:00Z'))
        abstract = copy.deepcopy(self.paper['original_abstract']); abstract['retrieved_at'] = STAMP
        summaries = copy.deepcopy(self.paper['summaries'])
        for value in summaries.values(): value['updated_at'] = '2026-10-03'
        source = copy.deepcopy(self.paper['source_dates']); source['verified_at'] = STAMP
        self.assertEqual(self.data, self.patch({'original_abstract':abstract,'summaries':summaries,'source_dates':source}))
        self.assertEqual(self.data, upsert_papers.merge_patches(self.data, {'papers':[{'id':self.paper['id']}]}, changed_at=None))

    def test_noop_write_keeps_bytes_and_maintenance_date(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            self.copy_fixture(root)
            raw = (root/'data/papers.json').read_bytes()
            for name, text in generate.generate(json.loads(raw), raw, root).items():
                target = root/name; target.parent.mkdir(parents=True,exist_ok=True); target.write_text(text)
            patch = root/'patch.json';patch.write_text(json.dumps({'papers':[{'id':self.paper['id']}]}))
            report = upsert_papers.apply_patch_file(patch, root, hashlib.sha256(raw).hexdigest(), '2030-01-01', True, changed_at='2030-01-01T00:00:00Z')
            self.assertEqual(report['changed_files'], [])
            self.assertEqual(raw, (root/'data/papers.json').read_bytes())

    def test_actual_changes_need_instant_and_source(self):
        with self.assertRaisesRegex(ValueError, 'changed-at'): self.patch({'venue':'New venue'}, at=None)
        with self.assertRaisesRegex(ValueError, 'change_source_url'):
            upsert_papers.merge_patches(self.data, {'papers':[{'id':self.paper['id'],'venue':'New venue'}]}, changed_at=STAMP)
        with self.assertRaisesRegex(ValueError, 'chronological'): self.patch({'venue':'New venue'}, at='2025-12-31T23:59:59Z')

    def test_new_paper_added_once_without_duplicate_update(self):
        paper = copy.deepcopy(self.paper)
        for key in ('added_at','added_provenance','change_history','source_dates','original_abstract','summaries','reading_tier'): paper.pop(key,None)
        paper.update(id='2610.99999',title='New paper entry fixture', links=[{'label':'Paper','url':'https://arxiv.org/abs/2610.99999'}])
        result = upsert_papers.merge_patches(self.data, {'papers':[paper]}, changed_at=STAMP)
        added = result['papers'][-1]
        self.assertEqual(added['added_at'], STAMP); self.assertEqual(added['change_history'], [])
        self.assertEqual(added['added_provenance']['kind'], 'catalog_entry')
        self.assertEqual(result, upsert_papers.merge_patches(result, {'papers':[paper]}, changed_at='2026-10-03T00:00:00Z'))

    def test_verified_revision_gets_separate_versioned_event(self):
        source = copy.deepcopy(self.paper['source_dates'])
        source.update(source_version='v99', source_url=f"https://arxiv.org/abs/{self.paper['id']}v99", updated_at='2026-10-02T10:00:00Z', verified_at=STAMP)
        abstract = copy.deepcopy(self.paper['original_abstract']); abstract.update(source_version='v99',source_url=source['source_url'],retrieved_at=STAMP)
        summaries = copy.deepcopy(self.paper['summaries'])
        for summary in summaries.values(): summary['source_urls'] = [source['source_url']]
        result = self.patch({'source_dates':source,'original_abstract':abstract,'summaries':summaries,'venue':'New venue fixture'})
        events = result['papers'][0]['change_history'][-2:]
        self.assertEqual([e['kind'] for e in events], ['venue_update','paper_revision'])
        self.assertEqual(events[-1]['source_version'],'v99')
        self.assertEqual(result['papers'][0]['added_at'],self.paper['added_at'])
        source['updated_at']=self.paper['source_dates']['updated_at']
        with self.assertRaisesRegex(ValueError,'regress'): self.patch({'source_dates':source,'original_abstract':abstract})

    def test_null_source_dates_backfill(self):
        source=copy.deepcopy(self.paper['source_dates'])
        self.paper['source_dates']=None
        generate.validate(self.data)
        after=self.patch({'source_dates':source})['papers'][0]
        self.assertEqual(after['source_dates'],source)
        self.assertEqual(after['change_history'][-1]['kind'],'metadata_enrichment')
        with self.assertRaisesRegex(ValueError,'preserve verified source dates'):
            upsert_papers.merge_patches({'papers': [after]}, {'papers':[{'id':after['id'],'source_dates':None}]}, changed_at=STAMP)

    def test_summary_content_is_enrichment_never_revision_or_addition(self):
        summary = copy.deepcopy(self.paper['summaries']['zh']);summary['text']='中文资料补全测试。'
        after = self.patch({'summaries':{'zh':summary}})['papers'][0]
        self.assertEqual(after['change_history'][-1]['kind'],'metadata_enrichment')
        self.assertEqual(after['change_history'][-1]['fields'],['summaries'])
        self.assertEqual(after['added_at'],self.paper['added_at'])

    def test_source_identity_version_and_order_are_verified(self):
        for field, value in [('source_url','https://arxiv.org/abs/1111.11111v1'),('published_at','2030-01-01T00:00:00Z'),('source_version','v99')]:
            with self.subTest(field=field):
                d=copy.deepcopy(self.data);d['papers'][0]['source_dates'][field]=value
                with self.assertRaises(ValueError): generate.validate(d)

    def test_outage_cannot_erase_verified_content(self):
        abstract=copy.deepcopy(self.paper['original_abstract']);abstract.update(status='unavailable',text='',reason='Temporary source outage')
        with self.assertRaisesRegex(ValueError,'preserve verified'): self.patch({'original_abstract':abstract})

    def test_maintenance_date_uses_shanghai(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);self.copy_fixture(root)
            raw=(root/'data/papers.json').read_bytes();patch=root/'patch.json'
            patch.write_text(json.dumps({'papers':[{'id':self.paper['id'],'venue':'Calendar-day fixture','change_source_url':self.paper['links'][0]['url']}]}))
            with self.assertRaisesRegex(ValueError,'Asia/Shanghai'):
                upsert_papers.apply_patch_file(patch,root,updated='2026-10-02',changed_at='2026-10-02T18:00:00Z')
            upsert_papers.apply_patch_file(patch,root,hashlib.sha256(raw).hexdigest(),'2026-10-03',True,changed_at='2026-10-02T18:00:00Z')
            self.assertEqual(json.loads((root/'data/papers.json').read_bytes())['meta']['updated'],'2026-10-03')

if __name__=='__main__': unittest.main()
