# Migration metadata provenance

[metadata-baseline.json](metadata-baseline.json) preserves the bibliographic metadata and attribution extracted from repository commit `31ad30becff83ca14a01f37fc99d52ba79f85565`:

- 271 unique arXiv identifiers: 77 core + 194 related
- Original titles, affiliations, venues, years, tags, links, categories and reading order
- Five core categories, nine related-work categories, 32 company-overview rows
- Original README SHA256: `3152b05b92299adbc6d09727202233cb3328f14b489aa2dc8540a41c9087825c`
- Metadata baseline SHA256: `0a4b73fad930c22e3c54e6004e75428f0bd70ed5ce656b34be15655df51f659f`

The obsolete contribution prose and full README snapshot were removed when schema v3 adopted source-grounded bilingual summaries. This baseline contains no paper summaries or abstracts. Historical commits remain intact; the current catalog does not republish the rejected prose for audit purposes.

Company shorthand is resolved to stable paper IDs in the canonical data. GEAR and PISA use their previously verified paper aliases; UTTSI is named in the [official abstract](https://arxiv.org/abs/2605.24989). Original company display labels are retained in `legacy_entries`; three additional company definitions (Unbox AI, Kimi and Qualcomm AI Research) come from recorded affiliations.

The normal audit protects baseline IDs and company mentions. `--strict` additionally compares the nine bibliographic fields and relative order of baseline papers, while allowing new paper IDs. Later verified metadata corrections may intentionally differ from this immutable baseline. See [contribution instructions](../CONTRIBUTING.md) for audit commands and future updates.
