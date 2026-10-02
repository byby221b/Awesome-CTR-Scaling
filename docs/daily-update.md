# Daily catalog update protocol

The scheduled researcher and the GitHub Pages workflow have separate jobs.
The researcher verifies papers and commits canonical data plus generated views.
`.github/workflows/pages.yml` checks and deploys that exact commit; it does not
research papers or rewrite the repository. Existing scheduling and notification
policy remain unchanged.

1. Start from the latest remote `main` commit. Read `CONTRIBUTING.md`, this file,
   the current generator, the upsert CLI help, and tests from that same revision.
   Record the remote parent SHA and the SHA256 of the exact `data/papers.json`
   bytes. Search all existing IDs, titles, aliases and DOIs before adding anything
2. Research primary sources. Keep publication/revision dates separate from
   catalog maintenance, abstract retrieval and summary-edit dates. New content
   and replacements of existing papers use the same stable ID. Do not invent
   unknown affiliation, venue, license, performance claims or historical dates
3. Preserve every unrelated field. Original abstracts must be faithful primary
   source text, with version, retrieval time and provenance; translations belong
   in summaries. Show missing content truthfully. Both summary languages must
   convey the same evidence and limitations. An abstract-based summary must not
   claim full-paper validation. Schema v4 has no `contribution` field and rejects
   `catalog_contribution` as a summary basis. Never restore deleted annotations,
   duplicate them as an alias, or use them as a fallback. Markdown descriptions
   derive directly from `summaries.en.text`; absent summaries remain explicit
   gaps. Preserve previous verified content during a
   transient source outage. A title mismatch needs editorial review, not an
   automatic canonical-title rewrite
4. Prepare focused `{"papers":[...]}` patches using the schema in
   `CONTRIBUTING.md`. Dry-run `python scripts/upsert_papers.py PATCH.json
   --expect-sha256 SHA --changed-at YYYY-MM-DDTHH:MM:SSZ --updated YYYY-MM-DD`, then use the same command with
   `--write`. A stale fingerprint requires a fresh read and merge, never removal
   of the guard. Serialize local writers. Only real content changes warrant a
   new maintenance date or commit. Existing content changes must include a
   per-record `change_source_url`; new records omit updater-owned history fields.
   Reuse the same actual UTC `--changed-at` for dry-run and write; `--updated`, if
   supplied, is its Asia/Shanghai date. The updater sets `added_at` once and
   appends typed events. Never edit or reset existing entry dates/history
5. Run every check below. Examine the diff for intended IDs, source identity,
   bilingual factual consistency, explicit gaps, counts, provenance and safe
   links. A new paper must appear in the catalog, topic view, company membership
   where applicable, and both language readers. The new-paper integration tests
   exercise the same path. If baseline bibliographic fields and relative order are untouched, also run
   the strict metadata migration audit (which permits newly added paper IDs)
6. Commit `data/papers.json`, `generated-manifest.json` and all changed generated
   files from the manifest together, plus intentional source/doc/test changes.
   This includes `site/index.html` and `site/zh.html`, which share one dataset.
   Never publish with sequential per-file writes. Recheck remote `main` before
   publishing. If its SHA changed, rebase/reconcile and rerun all checks. No force
   push, branch-protection bypass, permission expansion or empty test commits
7. Verify remote `main` contains the exact expected commit and changed files.
   Wait for validation and Pages deployment for that commit. A successful commit
   is not evidence of a deployed site. Verify both language URLs load, filters
   and paper anchors survive language switching, and search finds both languages
8. Compare the SHA256 of canonical bytes with `generated-manifest.json`'s
   `catalog_sha256`, published `catalog.json`'s `meta.catalog_sha256`, and the
   `catalog-sha256` meta tag in both published HTML pages. Compare deployed
   `catalog.json` to `site/catalog.json` from that exact commit. Stale caches,
   pending CI or failed deployment remain pending work; investigate or retry the
   same deployment within existing authority rather than fabricating content
9. Apply the existing notification policy only after its existing conditions are
   met. Abstract backfills, translations, summary edits and UI maintenance alone
   are not newly discovered papers. Do not send duplicate paper notifications
   for enrichment-only changes, deployment retries or content already announced

```sh
python scripts/generate.py --check
python -m unittest discover -s tests -v
node --check web/app.js
node tests/frontend.test.cjs
python scripts/verify_migration.py
# Only when baseline bibliographic fields and relative order remain unchanged:
python scripts/verify_migration.py --strict
```

## Coverage and failure reporting

`generated-manifest.json.coverage` and `site/catalog.json.coverage` contain
`verified_abstracts`, `unavailable_abstracts`, `pending_abstracts`,
`english_summaries`, and `chinese_summaries`. Verify these against the canonical
records rather than assuming every new paper has enrichment. Missing records do
not disappear. Unverified source text never appears as an original abstract.
The page shows independently counted coverage and explicit per-record gaps.

The original migration `meta.source_commit` is historical provenance, not the
current deployment SHA. Do not overwrite it. The canonical byte fingerprint is
the content synchronization contract across all generated views.


## Activity and date semantics

Follow schema v4's [recent-activity contract](../CONTRIBUTING.md#recent-additions-and-updates-schema-v4).
Preserve source publication/latest-version dates separately from catalog-entry
and maintenance instants. Import `source_dates` only with primary-source version
and verification evidence. For a verified replacement, advance its existing ID's
source metadata; the updater emits a `paper_revision` event only when both version
and source update time advance. Venue changes produce `venue_update`; genuine
metadata/summary additions produce `metadata_enrichment`. Re-fetching unchanged
content, refreshing retrieval/edit timestamps or regenerating views produces no
new event and no fresh addition. The default Recent updates view excludes
abstract/translation-only backfills; the explicit metadata filter retains them.
These events do not change the discovery thresholds, timing, recipients or
notification policy. Never re-email a paper for backfill-only events or retries.
