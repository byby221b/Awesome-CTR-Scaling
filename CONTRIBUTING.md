# Contributing

Paper content has one source of truth: [data/papers.json](data/papers.json).
The README, topic pages, company index and static website are deterministic generated views. Do not edit those outputs directly.

## Add or correct a paper

1. Verify the paper against primary sources. Search **all** records for the unversioned arXiv ID, title and aliases before adding anything; a paper belongs to one primary category, even if it is relevant elsewhere.
2. Edit `data/papers.json`. Keep the stable `id` for venue, title, affiliation and contribution corrections. Do not invent missing venue, affiliation, year or performance claims. Preserve important qualifications in contribution prose.
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
  "contribution": "A precise, source-grounded description with the relevant limitations.",
  "aliases": ["Optional known acronym"]
}
```

- `id`: unique, unversioned arXiv identifier. The matching canonical HTTPS arXiv abstract URL is required in `links`
- `title`, `affiliation`, `venue`, `contribution`: original strings; blank affiliation/venue means unspecified, not a guessed value
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

The immutable [migration snapshot](migration/original-README.md) contains the previous README at commit `31ad30becff83ca14a01f37fc99d52ba79f85565`. It is an audit fixture, not an editable content source. The migration retained 271 unique papers (77 core, 194 related), all original columns, every contribution sentence, 14 categories, and 32 company-overview rows.

```sh
python scripts/verify_migration.py
# Initial migration audit only, before later content corrections:
python scripts/verify_migration.py --strict
```

The strict audit compares all original paper fields and order. Normal CI allows later verified metadata corrections while protecting the complete baseline ID set and original company mentions. External paper URLs are syntax/identity checked offline; availability and scientific claims require primary-source verification when editing.

## Deployment

See [GitHub Pages deployment](docs/deployment.md). Pull requests only validate. A successful main-branch build deploys the same generated `site/` artifact; it never rewrites repository content or needs a personal access token.
