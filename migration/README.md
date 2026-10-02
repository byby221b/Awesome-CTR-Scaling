# Original README audit snapshot

[original-README.md](original-README.md) is preserved verbatim from repository commit `31ad30becff83ca14a01f37fc99d52ba79f85565`.

- UTF-8 size: 95,496 bytes
- SHA256: `3152b05b92299adbc6d09727202233cb3328f14b489aa2dc8540a41c9087825c`
- 271 unique arXiv identifiers: 77 core + 194 related
- Five core categories, nine related-work categories, 32 company-overview rows

This immutable fixture documents the structural migration; edit [the canonical dataset](../data/papers.json) for all ongoing maintenance. The initial strict audit reconstructs every original paper row/bullet exactly, including contribution prose, affiliation, venue, year, tags and link text.

Company shorthand was resolved to stable paper IDs. GEAR and PISA use their previously verified paper aliases; UTTSI is named in the [official abstract](https://arxiv.org/abs/2605.24989). Original company display labels are retained in `legacy_entries`; three additional company definitions (Unbox AI, Kimi and Qualcomm AI Research) come from affiliations already present in the snapshot.

See [contribution instructions](../CONTRIBUTING.md) for audit commands and future updates.
