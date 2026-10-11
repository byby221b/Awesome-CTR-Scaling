"""Release guards against accidental files, changed tiers and concurrent main updates."""
import copy
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import check_release


class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.run_git('init', '-q')
        self.run_git('config', 'user.name', 'Release test')
        self.run_git('config', 'user.email', 'test@example.invalid')
        (self.root / 'data').mkdir()
        self.data = {'papers': [{'id': '1', 'reading_tier': 'consider'}, {'id': '2'}]}
        (self.root / 'data/papers.json').write_text(json.dumps(self.data))
        self.run_git('add', 'data/papers.json')
        self.run_git('commit', '-qm', 'fixture')
        self.base = self.run_git('rev-parse', 'HEAD').strip()
        (self.root / 'maintenance.md').write_text('Useful maintenance instructions\n')
        real_git = check_release.git
        self.remote = self.base
        def transport(root, *args):
            if args[0] == 'ls-remote':
                return self.remote + '\trefs/heads/main\n'
            return real_git(root, *args)
        self.mock = patch.object(check_release, 'git', side_effect=transport)
        self.mock.start()
        self.addCleanup(self.mock.stop)

    def run_git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.root, stderr=subprocess.PIPE, text=True)

    def check(self, committed=False, allowed=None):
        return check_release.check(self.root, self.base, allowed or ['maintenance.md'], committed)

    def test_review_and_single_commit_do_not_mutate_repository(self):
        before = self.run_git('status', '--porcelain')
        self.assertEqual(self.check()['preserved_assigned_tiers'], 1)
        self.assertEqual(before, self.run_git('status', '--porcelain'))
        self.run_git('add', 'maintenance.md')
        with self.assertRaisesRegex(ValueError, 'empty index'):
            self.check()
        self.run_git('commit', '-qm', 'Document maintenance')
        self.assertEqual(self.check(True)['mode'], 'committed')
        (self.root / 'maintenance.md').write_text('unreviewed edit')
        with self.assertRaisesRegex(ValueError, 'clean working tree'):
            self.check(True)

    def test_unexpected_file_remote_move_and_noop_are_rejected(self):
        (self.root / 'unreviewed.txt').write_text('fixture')
        with self.assertRaisesRegex(ValueError, 'exactly match'):
            self.check()
        (self.root / 'unreviewed.txt').unlink()
        self.remote = '0' * 40
        with self.assertRaisesRegex(ValueError, 'remote main moved'):
            self.check()
        (self.root / 'maintenance.md').unlink()
        with self.assertRaisesRegex(ValueError, 'no useful change'):
            self.check()

    def test_more_than_one_commit_is_rejected(self):
        self.run_git('add', 'maintenance.md')
        self.run_git('commit', '-qm', 'First change')
        (self.root / 'maintenance.md').write_text('Second change')
        self.run_git('commit', '-qam', 'Second change')
        with self.assertRaisesRegex(ValueError, 'exactly one'):
            self.check(True)

    def test_committed_tiers_use_commit_blob_not_hidden_worktree_content(self):
        target = self.root / 'data/papers.json'
        original = target.read_bytes()
        changed = copy.deepcopy(self.data)
        changed['papers'][0]['reading_tier'] = 'prioritize'
        target.write_text(json.dumps(changed))
        self.run_git('add', 'data/papers.json', 'maintenance.md')
        self.run_git('commit', '-qm', 'Changed tier fixture')
        self.run_git('update-index', '--skip-worktree', 'data/papers.json')
        target.write_bytes(original)
        self.assertEqual(self.run_git('status', '--porcelain'), '')
        with self.assertRaisesRegex(ValueError, 'reading tiers must be preserved'):
            self.check(True, ['data/papers.json', 'maintenance.md'])

    def test_tier_changes_removal_and_new_ratings_are_rejected(self):
        for mutation in ('tier', 'remove', 'new'):
            candidate = copy.deepcopy(self.data)
            if mutation == 'tier':
                candidate['papers'][0]['reading_tier'] = None
            elif mutation == 'remove':
                candidate['papers'].pop()
            else:
                candidate['papers'].append({'id': '3', 'reading_tier': 'prioritize'})
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                check_release.preserve_tiers(self.data, candidate)
        candidate = copy.deepcopy(self.data)
        candidate['papers'].append({'id': '3', 'reading_tier': None})
        check_release.preserve_tiers(self.data, candidate)


if __name__ == '__main__':
    unittest.main()
