# Contributing

Paper content has one source of truth: [data/papers.json](data/papers.json).
The README, topic pages, company index and static website are deterministic generated views. Do not edit those outputs directly.

## Add or correct a paper

1. Verify the paper against primary sources. Search **all** records for the unversioned arXiv ID, title and aliases before adding anything; a paper belongs to one primary category, even if it is relevant elsewhere.
2. Edit `data/papers.json`. Keep the stable `id` for venue, title, affiliation and summary corrections. Do not invent missing venue, affiliation, year or performance claims. Preserve important qualifications in summary prose.
3. Use an existing category ID and matching `collection` (`core` or `related`). Core papers use 1–4 controlled tags; prefer 2–4 for new entries. Related papers may stay untagged. Add a tag to `tag_vocabulary` only as an intentional taxonomy change.
4. Update `meta.updated` to the date of the content update. Keep `meta.source_commit` unchanged: it records the historical migration source, not the latest deployment.
5. Regenerate, check and test. Commit the canonical data and **all** generated changes together.

```sh
python scripts/generate.py
python scripts/generate.py --check
python -m unittest discover -s tests -v
node --check web/app.js
node tests/frontend.test.cjs
```

Python 3.10+ is sufficient; no Python packages or JavaScript dependencies are required. CI uses Python 3.12. Frontend unit tests use Node.js 18+ with a small in-memory DOM harness; they do not replace browser/layout QA. Generation uses no network access or wall-clock timestamps.

Keep text files UTF-8 with LF line endings (`.gitattributes` enforces LF in Git). The generator writes UTF-8/LF explicitly so its output is reproducible across platforms.

## Paper schema

The canonical dataset uses `schema_version: 3`. The removed `contribution` field
and `catalog_contribution` summary basis are rejected, including in updater
patches. Keep summaries only in `summaries.en` and `summaries.zh`; do not create a
duplicate contribution alias or restore old annotations. Core Markdown tables
retain seven columns, with Key Contribution derived from `summaries.en.text`.
Related-work descriptions use that same English summary. If it is missing, the
view displays an explicit gap rather than falling back to old prose.

```json
{
  "id": "2609.37905",
  "title": "The original paper title",
  "collection": "core",
  "category": "scaling-law-theory",
  "affiliation": "Recorded affiliation; empty if unknown",
  "venue": "arXiv",
  "year": 2026,
  "tags": ["Scaling Law"],
  "links": [{"label": "Paper", "url": "https://arxiv.org/abs/2609.37905"}],
  "aliases": ["Optional known acronym"]
}
```

- `id`: unique, unversioned arXiv identifier. The matching canonical HTTPS arXiv abstract URL is required in `links`
- `title`, `affiliation`, `venue`: recorded strings; blank affiliation/venue means unspecified, not a guessed value
- `year`: the catalog's recorded publication year, which can differ from the arXiv-ID year
- `tags`: distinct values from `tag_vocabulary`; do not infer missing legacy tags during structural edits
- `aliases` (optional): established acronyms or former display labels used by full-catalog search
- `doi` (optional): verified DOI without a URL prefix; case-insensitive duplicates are rejected
- `links`: one or more labeled HTTP(S) URLs, including Paper; Code and other official sources may be added

Top-level `categories` define stable IDs, titles, collections and descriptions. Array order preserves the original reading-list order. New entries can be appended to the paper array; the website's default sort uses recorded year and then arXiv ID, and readers can switch to original order.

Top-level `companies` define IDs, display names and recorded `affiliation_aliases`. The generator matches complete aliases in affiliation strings. `legacy_entries` preserve and resolve all mentions in the previous company overview; keep them during future updates. A paper may match multiple companies. New memberships normally come from the recorded affiliation, not manual duplication. Add a verified alias/company definition if necessary. Generic labels such as Academic and Industry are not companies.

## Generated files

- `README.md`: compact entry point and preserved previous section anchors
- `docs/README.md`, `docs/topics/*.md`, `docs/related/*.md`, `docs/companies.md`: full-content Markdown views with stable paper anchors
- `site/`: deployable website, generated JSON and local assets
- `generated-manifest.json`: canonical data SHA256, counts and hashes of every generated file

Website source lives in `web/`. Edit it there, then regenerate. Paper anchors use `paper-` plus the arXiv ID with `.` replaced by `-`. The renderer escapes Markdown and the website inserts catalog values as text.

`--check` fails for a missing/changed generated output or an unexpected file under a generated topic/site directory. The generator never silently deletes unexpected files; explicitly remove obsolete generated files when renaming a category. Hand-authored maintenance docs remain outside generated directories.

## Preview

```sh
python scripts/generate.py
python -m http.server 8000 --directory site
```

Open `http://localhost:8000`. Use an HTTP server rather than opening `index.html` as a file because the library fetches its local JSON. All asset and data paths are relative, so the same files work at the GitHub Pages project prefix.

For a project-prefix smoke test, copy `site/` into a temporary directory named `Awesome-CTR-Scaling` and serve its parent. Verify search, combined filters, reset, load more, direct paper links, Back/Forward, keyboard focus and a narrow viewport.

## Migration provenance

The prose-free [metadata baseline](migration/metadata-baseline.json) preserves the original bibliographic fields of 271 unique papers (77 core, 194 related), 14 categories and 32 company-overview rows from commit `31ad30becff83ca14a01f37fc99d52ba79f85565`. The obsolete contribution prose and full README snapshot have been removed from the current repository. Historical commits are unchanged. See [migration provenance](migration/README.md) for the retained evidence.

```sh
python scripts/verify_migration.py
# When baseline bibliographic metadata and relative order are unchanged:
python scripts/verify_migration.py --strict
```

The strict audit compares the nine original bibliographic fields and relative order of baseline papers. New IDs are allowed. Normal CI allows later verified metadata corrections while protecting the complete baseline ID set and original company mentions. Neither audit retains or compares deleted summary prose. External paper URLs are syntax/identity checked offline; availability and scientific claims require primary-source verification when editing.

## Deployment

See [GitHub Pages deployment](docs/deployment.md). Pull requests only validate. A successful main-branch build deploys the same generated `site/` artifact; it never rewrites repository content or needs a personal access token.

## Original abstracts and bilingual summaries (schema v3)

The English reader is `site/index.html`; the Chinese reader is `site/zh.html`.
Both read the same `site/catalog.json`. Switching language retains the current
search, filters, sort and paper anchor. Paper titles and identifiers are never
translated or replaced automatically. Search includes both summary languages and
original abstracts in either interface.

Each paper may carry the following enrichment in addition to the bibliographic
fields above. These are the only paper-summary and original-abstract sources.

```json
{
  "original_abstract": {
    "status": "verified",
    "text": "Exact abstract from the primary source, not a translation.",
    "language": "en",
    "source_url": "https://arxiv.org/abs/2208.08489v1",
    "retrieved_at": "2026-10-02T04:49:25Z",
    "license": "CC0-1.0",
    "source_title": "Understanding Scaling Laws for Recommendation Models",
    "source_version": "v1"
  },
  "summaries": {
    "en": {
      "text": "An evidence-grounded explanation of the problem, method and findings.",
      "basis": "original_abstract",
      "method": "ai_assisted",
      "updated_at": "2026-10-02",
      "source_urls": ["https://arxiv.org/abs/2208.08489v1"]
    },
    "zh": {
      "text": "基于同一份证据的中文总结，保留结论的范围和限制。",
      "basis": "original_abstract",
      "method": "ai_assisted",
      "updated_at": "2026-10-02",
      "source_urls": ["https://arxiv.org/abs/2208.08489v1"]
    }
  }
}
```

- Abstract `status` is `verified`, `unavailable`, or `pending`. Only `verified`
  can contain nonempty `text`; the other statuses require empty text and an
  explicit `reason`. `retrieved_at` may be null for unverified records. Do not
  replace a verified abstract with a transient fetch failure during routine updates
- Preserve the author text, terms, caveats and formulas. Only boundary whitespace
  and XML entity decoding are normalized in the stored original. The reader
  displays common TeX typography, symbols and superscripts/subscripts without
  executing markup; unresolved source macros remain visibly marked. The exact
  source text is always available in the downloadable dataset
- `source_title` and `source_version` are evidence from the retrieved version.
  Source-title differences are shown beside the abstract; they can reflect a
  shortened catalog label, an acronym, or a later title revision. Review them
  before making a separate, evidenced bibliographic correction
- `license` is the verified metadata license or null, never a guessed paper/PDF
  license. The [official arXiv API terms](https://info.arxiv.org/help/api/tou.html)
  explicitly cover descriptive metadata, including abstracts, under CC0 1.0.
  This does not relicense a paper's PDF, figures, or source files
- Summary `basis` must be `original_abstract` and requires a verified original
  on the same paper. Old catalog annotations cannot serve as a source or fallback. `method` is `ai_assisted` or
  `editorial`; both are visibly distinguished from author text. `source_urls`
  identify the evidence. Translation is a summary, never an original abstract
- Summaries should explain the question, method and supported result in natural
  prose. Keep numerical claims, comparison scope and uncertainty aligned across
  English and Chinese. Do not imply full-paper review from an abstract-only basis
- Omit a summary language if it is genuinely missing; the page explicitly labels
  the gap. `coverage` in the public dataset and generated manifest counts verified
  abstracts and EN/ZH summaries independently

## Validated update interface

Use `scripts/upsert_papers.py` to add papers or apply focused JSON patches. It
validates the whole candidate catalog and renders every output before changing
files. It preserves unmentioned paper fields and merges `summaries` by language.
New IDs require a complete record; unknown fields, duplicate patch IDs, unsafe
URLs, unsupported labels and unsupported enrichment states are rejected.

```sh
# A patch is {"papers":[{"id":"2208.08489","summaries":{"zh":{...}}}]}
SHA=$(python -c 'import hashlib; print(hashlib.sha256(open("data/papers.json","rb").read()).hexdigest())')
python scripts/upsert_papers.py /tmp/paper-patch.json --expect-sha256 "$SHA" --updated 2026-10-02
python scripts/upsert_papers.py /tmp/paper-patch.json --expect-sha256 "$SHA" --updated 2026-10-02 --write
python scripts/generate.py --check
python -m unittest discover -s tests -v
node --check web/app.js
node tests/frontend.test.cjs
python scripts/verify_migration.py
```

The default is a dry-run. `--write` replaces canonical data with an atomic local
rename and regenerates all views; it never commits, pushes, or deploys. The write mode requires an expected canonical SHA and holds a local exclusive
`.catalog-update.lock` while validating and writing. Serialize callers. If a
process is interrupted, verify that no updater is running before removing a stale
lock. Preserve the expected canonical SHA. The generated file set spans
multiple files, so local filesystem writes are not a publication transaction:
publish the canonical file and all output changes in one Git commit. CI rejects
partial or stale output. `--updated` sets only `meta.updated`, not publication,
retrieval or summary-edit dates. Do not manufacture changes by refreshing dates.
Top-level taxonomy/company edits remain reviewed edits to the canonical data.

For verified original-abstract collection, use the standard-library helper:

```sh
python scripts/fetch_arxiv_abstracts.py data/papers.json /tmp/arxiv-enrichment
# Inspect provenance.json, title differences and exact source identity first
python scripts/upsert_papers.py /tmp/arxiv-enrichment/patches.json --expect-sha256 "$SHA"
```

The collector never edits the catalog. It uses one serial official API connection,
15-ID batches and at least 3.2 seconds between requests; it checkpoints source
responses, hashes and failure states, honors Retry-After and stops on access
restrictions. Do not run multiple arXiv requesters at once. On refresh, import only
meaningful changed verified content, retaining existing verified data if a source
fails transiently. Recheck official API terms/rate guidance before running.

See [daily update protocol](docs/daily-update.md) for the full scheduled-maintenance
and deployment verification contract.
