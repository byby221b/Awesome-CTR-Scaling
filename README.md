<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Awesome CTR Scaling

A curated library of **scaling laws and scalable ranking/CTR models** for industrial recommendation systems.

**271 papers** · **77 core** · **194 related** · Updated 2026-10-02

<a id="table-of-contents"></a>

[**Search the paper library →**](https://byby221b.github.io/Awesome-CTR-Scaling/) · [All topics](docs/README.md) · [Company index](docs/companies.md) · [Contribute](CONTRIBUTING.md)

> **Scope:** We cover papers that (1) study scaling laws for recommendation models, (2) propose scalable Transformer-based architectures for CTR/ranking, (3) address efficiency challenges in scaling up industrial ranking systems, or (4) explore novel paradigms (e.g., sparse scaling, generative pre-training, foundation models) for scalable recommendation.

## Papers

Five focused reading paths. Each topic keeps the complete seven-column catalog: paper, affiliation, venue, year, tags, links and key contribution.

<a id="scaling-law--theory"></a>

### Scaling Law & Theory

Empirical laws, scaling recipes and theoretical limits for recommendation models. [Browse 17 papers →](docs/topics/scaling-law-theory.md)

<a id="scalable-architecture"></a>

### Scalable Architecture

Transformer, mixer and sparse architectures built to scale industrial ranking. [Browse 27 papers →](docs/topics/scalable-architecture.md)

<a id="unified-feature--sequence-modeling"></a>

### Unified Feature & Sequence Modeling

Joint modeling of feature interactions, user histories and behavioral sequences. [Browse 15 papers →](docs/topics/unified-feature-sequence-modeling.md)

<a id="foundation-models--multi-scenario"></a>

### Foundation Models & Multi-Scenario

Shared foundations, multi-task learning and transfer across scenarios. [Browse 11 papers →](docs/topics/foundation-models-multi-scenario.md)

<a id="efficiency--deployment"></a>

### Efficiency & Deployment

Training, inference and deployment techniques that make model scaling practical. [Browse 7 papers →](docs/topics/efficiency-deployment.md)

## Related Work

Adjacent research is grouped separately to keep the core CTR scaling signal clear.

- <a id="long-sequence-modeling"></a>[Long Sequence Modeling](docs/related/long-sequence-modeling.md) · 23 papers
- <a id="sampleinstance-compression-for-sequence-modeling"></a>[Sample/Instance Compression for Sequence Modeling](docs/related/sample-instance-compression-for-sequence-modeling.md) · 2 papers
- <a id="generative-recommendation"></a>[Generative Recommendation](docs/related/generative-recommendation.md) · 72 papers
- <a id="generative-pre-training-for-ctr"></a>[Generative Pre-training for CTR](docs/related/generative-pre-training-for-ctr.md) · 4 papers
- <a id="knowledge-distillation--compression"></a>[Knowledge Distillation & Compression](docs/related/knowledge-distillation-compression.md) · 4 papers
- <a id="engineering--serving"></a>[Engineering & Serving](docs/related/engineering-serving.md) · 17 papers
- <a id="retrieval--reranking-scaling"></a>[Retrieval & Reranking Scaling](docs/related/retrieval-reranking-scaling.md) · 12 papers
- <a id="architecture-innovations-beyond-recommendation"></a>[Architecture Innovations Beyond Recommendation](docs/related/architecture-innovations-beyond-recommendation.md) · 52 papers
- <a id="other"></a>[Other](docs/related/other.md) · 8 papers

## Company Overview

[Browse the linked company index](docs/companies.md). Every entry opens its paper in the relevant topic; the website also filters by company.

## Keeping everything in sync

[The canonical dataset](data/papers.json) generates this README, all topic pages, the company index and the website. Change a paper once, regenerate all views, and let CI reject drift.

```sh
python scripts/generate.py
python scripts/generate.py --check
python -m unittest discover -s tests -v
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the schema, update workflow and local preview; [deployment instructions](docs/deployment.md) cover GitHub Pages.

## Contributing

We welcome relevant papers, corrections and better source links. Please open an issue or submit a pull request. Preserve verified contribution details and use the [controlled tag vocabulary](docs/README.md#tag-vocabulary).

## Star History

If you find this repository useful, please consider giving it a star!
