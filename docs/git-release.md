# Standard Git release

Use this procedure for a real, reviewed catalog or maintenance change. It uses
existing Git authentication and permissions. It never needs per-file API writes,
new credentials, force pushes, permission changes or an empty test commit.
A dry-run exercises transport but does **not** prove a new commit can be written.

## Pin and prepare

Start with a clean checkout and an empty index. Confirm that `origin` refers to
the intended repository without printing credential-bearing remote URLs. Use one
writer for the checkout. Keep patches, logs and recovery notes outside the repo.

```sh
set -eu
export GIT_TERMINAL_PROMPT=0
test -z "$(git status --porcelain --untracked-files=all)"
git fetch origin main
RELEASE_BASE=$(git rev-parse refs/remotes/origin/main)
test "$(git rev-parse HEAD)" = "$RELEASE_BASE"
git ls-remote --exit-code origin refs/heads/main
git push --dry-run --no-follow-tags --porcelain origin HEAD:refs/heads/main
```

If HEAD differs, reconcile the checkout before editing. Record `RELEASE_BASE`
outside the repository so it survives an interrupted session. Do not infer that
an up-to-date dry-run authenticated a particular user or proved write access.
Do not print tokens, credential helpers' output, HTTP headers or full Git config.
Transport restrictions and interactive approvals must be respected.

For paper changes, use the normal upsert dry-run and `--write` commands in
[CONTRIBUTING](../CONTRIBUTING.md#validated-update-interface), with the same
canonical SHA256 and actual `--changed-at`. Keep the stable IDs, existing reading
tiers and migration provenance. New papers remain unrated. For source changes,
regenerate with `python scripts/generate.py`. Never hand-edit generated files.
Maintenance-only changes do not need an artificial paper patch or new date.

## Review and validate

Review the complete diff and every new file. Create a shell array containing the
**exact** approved repository-relative paths, including all changed generated
outputs. Example for a documentation-only change, using Bash:

```sh
RELEASE_FILES=(docs/git-release.md)
python scripts/check_release.py --base "$RELEASE_BASE" \
  --allow docs/git-release.md
python scripts/generate.py --check
python -m unittest discover -s tests -v
node --check web/app.js
node tests/frontend.test.cjs
python scripts/verify_migration.py
git diff --check
git diff --stat
git diff
```

Repeat `--allow PATH` for every path in `RELEASE_FILES`; do not automatically
approve whatever `git status` finds. Review untracked files separately because
`git diff` does not display them. The read-only guard rejects unexpected files,
staged content before review, deleted existing paper IDs, changed existing tiers,
new ratings and a changed remote main. It does not replace content review or the
full suite above. It does not stage, commit, push, email or change schedules.

`verify_migration.py --strict` compares with the original migration baseline,
not the release base. Run it only if that baseline is still unchanged. Existing
verified bibliographic corrections can make it fail on an otherwise valid main;
record this separately and keep the ordinary migration audit mandatory. Do not
undo valid metadata corrections to make the strict audit pass.

## Commit and publish once

After review/authorization, stage only the listed paths and create one commit.
The commit is the publication unit for canonical data and every generated view.

```sh
git --literal-pathspecs add -- "${RELEASE_FILES[@]}"
git diff --cached --check
git diff --cached --stat
git diff --cached
# Use a specific message describing the actual change.
git commit -m 'Document standard Git release procedure'
RELEASE_COMMIT=$(git rev-parse HEAD)
# Repeat the same complete --allow list used above.
python scripts/check_release.py --base "$RELEASE_BASE" \
  --committed --allow docs/git-release.md
git push --no-follow-tags --porcelain origin "$RELEASE_COMMIT:refs/heads/main"
git ls-remote --exit-code origin refs/heads/main
```

The committed guard requires a clean checkout and exactly one non-merge commit
whose parent is the pinned base. No local writers may run between validation and
push. Committed data checks read the actual commit blob. Literal pathspecs keep
staging limited to the named files, and `--no-follow-tags` prevents configuration
from adding tags to the push. A normal push rejects a non-fast-forward race; the preflight read is not a
server-side compare-and-swap. On a conflict, fetch, reconcile against the new
main and repeat review and **all** checks. Never force push or drop a guard.

On timeout or uncertain write, first read remote main. If it equals
`RELEASE_COMMIT`, the write succeeded: continue verification without republishing.
If main advanced again, fetch and check whether it contains that exact commit.
If it still equals `RELEASE_BASE`, investigate the failure before deciding whether
to retry the same commit. Save base, commit, reviewed paths, test results and
pending work outside the repo; never blindly create a replacement commit.

## Read back and verify deployment

Fetch remote main and verify it contains the intended commit. Compare that
commit's changed paths and canonical/generated blobs with the reviewed local
commit. Remote content equality, Actions success and Pages success are separate
results. Inspect the `Validate and deploy catalog` workflow **for that exact
commit**, including both build and deploy jobs. An authenticated CLI, public API
or GitHub UI may be used within existing permissions. If unavailable, report
verification as blocked; do not infer CI success from a Git push.

After that deployment succeeds, fetch these public URLs with a cache-busting
query and a bounded timeout (for example 20 seconds per request):

- `https://byby221b.github.io/Awesome-CTR-Scaling/catalog.json`
- `https://byby221b.github.io/Awesome-CTR-Scaling/index.html`
- `https://byby221b.github.io/Awesome-CTR-Scaling/zh.html`

Compute SHA256 of `git show RELEASE_COMMIT:data/papers.json` bytes. It must equal
`generated-manifest.json.catalog_sha256`, the deployed catalog's
`meta.catalog_sha256`, and the `catalog-sha256` meta tag in **both** HTML pages.
Compare deployed catalog bytes with `git show RELEASE_COMMIT:site/catalog.json`;
compare HTML and assets against that same commit's manifest hashes. A maintenance
change can keep the dataset fingerprint unchanged, so the fingerprint alone does
not identify its deployed commit. Use exact-commit CI/Pages evidence as well.

Check bilingual search, language-switch retention of filters and anchors, and a
narrow viewport as described in [deployment](deployment.md). Offline frontend
tests are not browser QA. Network blocks, pending jobs, cache mismatches and
unperformed browser checks remain explicit pending work. Verification retries do
not warrant content changes, repeat paper notifications or schedule changes.

Report authentication evidence, dry-run result, actual commit/ref write,
exact-commit CI and Pages checks, and any approval prompts separately. One
successful operation cannot guarantee future operations will never ask approval.
