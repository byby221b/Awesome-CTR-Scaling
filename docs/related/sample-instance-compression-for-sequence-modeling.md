<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Sample/Instance Compression for Sequence Modeling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=sample-instance-compression-for-sequence-modeling)

Compressing complete interactions and raw samples into sequence tokens.

2 papers · Updated 2026-10-09

<a id="paper-2604-08933"></a>

- **IAT**: IAT replaces manually selected historical features with one compact token containing all features of an interaction instance. A first stage learns these embeddings, and downstream tasks fetch timestamp-linked tokens to model long-range preferences, separating instance compression from sequence learning and supporting transfer across different recommendation domains. — [Paper](https://arxiv.org/abs/2604.08933) (2026). Reading priority: Unrated.

<a id="paper-2604-15650"></a>

- **SIF**: SIF treats a complete historical sample as a sequence feature instead of retaining only an item-level subset. Hierarchical group-adaptive quantization creates sample tokens, and SIF-Mixer performs token- and sample-level interactions over homogeneous representations, connecting richer historical context with a unified architecture for model-capacity scaling. — [Paper](https://arxiv.org/abs/2604.15650) (Meituan · RecSys (Industry) 2026). Reading priority: Unrated.
