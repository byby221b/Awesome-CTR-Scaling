<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Sample/Instance Compression for Sequence Modeling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=sample-instance-compression-for-sequence-modeling)

Compressing complete interactions and raw samples into sequence tokens.

4 papers · Updated 2026-10-31

<a id="paper-2604-08933"></a>

- **IAT**: IAT replaces manually selected historical features with one compact token containing all features of an interaction instance. A first stage learns these embeddings, and downstream tasks fetch timestamp-linked tokens to model long-range preferences, separating instance compression from sequence learning and supporting transfer across different recommendation domains. — [Paper](https://arxiv.org/abs/2604.08933) (2026). Reading priority: Read first.

<a id="paper-2604-15650"></a>

- **SIF**: SIF treats a complete historical sample as a sequence feature instead of retaining only an item-level subset. Hierarchical group-adaptive quantization creates sample tokens, and SIF-Mixer performs token- and sample-level interactions over homogeneous representations, connecting richer historical context with a unified architecture for model-capacity scaling. — [Paper](https://arxiv.org/abs/2604.15650) (Meituan · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2610-35323"></a>

- **CRIM: Composable and Reusable Item Memory for Efficient Personalized Retrieval**: CRIM reduces repeated item-text encoding in personalized retrieval by compressing each item into user- and query-independent continuous memories. Requests compose cached memories in interaction order, while readout tokens and sampled live re-encoding support joint training with periodic cache refreshes. Evaluations on MovieLens-1M, Qilin and LazSeq report stronger retrieval with lower inference costs at the same backbone scale. The reusable item representation offers a practical route to compressing recommendation histories without removing request-level context modeling. — [Paper](https://arxiv.org/abs/2610.35323) (Tsinghua University; Alibaba International Digital Commerce Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39175"></a>

- **PRISM: Personalized Item Representations in User History**: PRISM makes each history-item representation user-specific by compressing all layer states from an upstream user tower, user–item tower, and same-request candidate mixing into one replayable embedding per scored pair. Offline evaluation on a billion-scale recommendation surface reports an average normalized-entropy change of −0.15%, versus −0.07% for VISTA at similar history lengths. Over 26–240 events, the reported NE gain follows a fitted power law with exponent 0.468, suggesting a way to reuse ranking computation when scaling history modeling. The abstract reports no online gains. — [Paper](https://arxiv.org/abs/2610.39175) (Meta · arXiv 2026). Reading priority: Unrated.
