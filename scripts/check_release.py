#!/usr/bin/env python3
"""Read-only Git release guard. Run the full validation suite separately."""
import argparse
import json
import os
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def git(root, *args):
    result = subprocess.run(['git', *args], cwd=root, capture_output=True,
                            env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'}, timeout=45)
    if result.returncode:
        # Git transport/config diagnostics can contain credential-bearing URLs.
        raise ValueError('Git check failed; inspect transport locally without exposing credentials')
    return result.stdout.decode('utf-8')


def paths(output):
    return set(output.rstrip('\0').split('\0')) if output else set()


def preserve_tiers(before, after):
    old = {p['id']: p.get('reading_tier') for p in before['papers']}
    new = {p['id']: p.get('reading_tier') for p in after['papers']}
    if not old.keys() <= new.keys():
        raise ValueError('existing paper IDs must be preserved')
    if any(new[pid] != tier for pid, tier in old.items()):
        raise ValueError('existing reading tiers must be preserved')
    if any(new[pid] is not None for pid in new.keys() - old.keys()):
        raise ValueError('new papers must remain unrated')


def check(root, base, allowed, committed=False):
    if not re.fullmatch(r'[0-9a-f]{40}', base):
        raise ValueError('--base must be the full pinned main commit SHA')
    head = git(root, 'rev-parse', 'HEAD').strip()
    if committed:
        parents = git(root, 'rev-list', '--parents', '-n', '1', 'HEAD').split()
        if parents != [head, base]:
            raise ValueError('release must be exactly one non-merge commit on the pinned base')
        if git(root, 'status', '--porcelain', '--untracked-files=all'):
            raise ValueError('committed release requires a clean working tree and index')
        changed = paths(git(root, 'diff', '--no-renames', '--name-only', '-z', base, head, '--'))
    else:
        if head != base:
            raise ValueError('HEAD differs from pinned base')
        if git(root, 'diff', '--cached', '--name-only'):
            raise ValueError('review from an empty index; stage only after checks')
        changed = paths(git(root, 'diff', '--no-renames', '--name-only', '-z', base, '--'))
        changed |= paths(git(root, 'ls-files', '--others', '--exclude-standard', '-z'))
    if not changed:
        raise ValueError('no useful change to publish; do not manufacture a test commit')
    if changed != set(allowed):
        raise ValueError('changed files must exactly match the reviewed --allow paths')
    for name in changed:
        path = Path(name)
        if path.is_absolute() or '..' in path.parts or name.startswith('-'):
            raise ValueError('allow only repository-relative paths')
        if (root / path).is_symlink():
            raise ValueError('release paths must not be symlinks')
    before = json.loads(git(root, 'show', f'{base}:data/papers.json'))
    # A clean status can hide skip-worktree/assume-unchanged files. In committed
    # mode inspect the actual publication blob, never a working-tree substitute.
    after = json.loads(git(root, 'show', f'{head}:data/papers.json') if committed
                       else (root / 'data/papers.json').read_bytes())
    preserve_tiers(before, after)
    remote = git(root, 'ls-remote', '--exit-code', 'origin', 'refs/heads/main').split()
    if remote != [base, 'refs/heads/main']:
        raise ValueError('remote main moved; reconcile on its new base and rerun every check')
    return {'base': base, 'head': head, 'mode': 'committed' if committed else 'working-tree',
            'changed_files': sorted(changed), 'papers': len(after['papers']),
            'preserved_assigned_tiers': sum(p.get('reading_tier') is not None for p in before['papers']),
            'remote_main_matches_base': True}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', required=True)
    parser.add_argument('--allow', action='append', required=True, help='exact reviewed path; repeat for every changed file')
    parser.add_argument('--committed', action='store_true', help='check the single prepared commit before push')
    args = parser.parse_args()
    try:
        print(json.dumps(check(ROOT, args.base, args.allow, args.committed), indent=2))
    except (ValueError, OSError, subprocess.TimeoutExpired) as error:
        print(f'Release refused: {error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
