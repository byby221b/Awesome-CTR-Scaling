<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Knowledge Distillation & Compression

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=knowledge-distillation-compression)

Transferring, compressing and deploying larger recommendation models.

6 papers · Updated 2026-10-16

<a id="paper-2411-16122"></a>

- **KDEF**: KDEF studies why adding more subnetworks can destabilize CTR ensembles rather than reliably improve them. Knowledge distillation counters representation collapse and supports scaling, while deep mutual learning reduces disagreement and variance among subnetworks; their combination forms a model-agnostic framework for making larger ensembles more consistent and useful. — [Paper](https://arxiv.org/abs/2411.16122) (2024). Reading priority: Read first.

<a id="paper-2605-29280"></a>

- **LoopFM**: LoopFM complements scalar distillation by feeding compressed historical foundation-model embeddings into downstream recommenders, avoiding live foundation-model inference at serving. Public and industrial experiments support a richer transfer channel; the revised abstract explicitly reports scaling with sequence length, embedding dimension and upstream model size. Storage, embedding compression and downstream sequence-processing costs remain, and the public-scale evidence is not equivalent to the trillion-parameter production setting. — [Paper](https://arxiv.org/abs/2605.29280) (Meta · 2026). Reading priority: Read first.

<a id="paper-2605-29755"></a>

- **Rec-Distill**: Rec-Distill turns gains from large recommendation teachers into deployable lightweight students through an industrial distillation pipeline. Decoupled training, black-box knowledge transfer, debiasing, and hybrid batch-streaming updates address both model-size and data-freshness constraints, connecting offline scaling improvements to online business outcomes under strict serving-latency limits. — [Paper](https://arxiv.org/abs/2605.29755) (ByteDance · 2026). Reading priority: Read first.

<a id="paper-2608-08627"></a>

- **UniMoMo**: UniMoMo compresses a trained recommendation mixture-of-experts model into a smaller expert bank under an explicit deployment budget. It merges experts with similar responses on unlabeled calibration data and protects heavily used experts differently across layers, producing standard MoE checkpoints that improve serving speed while largely preserving recommendation quality after conversion and adaptation. — [Paper](https://arxiv.org/abs/2608.08627) (2026). Reading priority: Worth reading.

<a id="paper-2610-16569"></a>

- **From a Large-Scale Teacher to Efficient Multimodal Students for Search Relevance Prediction**: This search-relevance framework uses a small human-labeled set to refine an LLM judge, then distills its large-scale labels into compact multimodal student models. The students approach teacher quality while improving serving cost and throughput, offering a route to scale query–item relevance supervision. Evaluation distinguishes a test set used during teacher-prompt refinement from a separate cleaner test set; this is relevance-label distillation, not evidence of an online CTR gain. — [Paper](https://arxiv.org/abs/2610.16569) (eBay; Tooploox · arXiv 2026). Reading priority: Unrated.

<a id="paper-2606-26277"></a>

- **From Clicks to Intent: Cross-Platform Session Embeddings with LLM-Distilled Taxonomy for Financial Services Recommendations**: The framework turns web clickstreams into compact self-supervised Transformer session embeddings and separately distills an LLM-generated intent taxonomy into interpretable labels. In the reported mobile-homepage ranking task, session embeddings improve macro Recall@1 by 1.88% and reduce log loss by 13.38% against production baselines. The two outputs serve prediction and explanation under different latency constraints. For recommendation scaling, the useful separation is dense behavioral representation versus inexpensive intent labeling; cross-channel identity resolution and financial-services evaluation limit direct generalization. — [Paper](https://arxiv.org/abs/2606.26277) (Capital One · arXiv 2026). Reading priority: Unrated.
