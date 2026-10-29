<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Knowledge Distillation & Compression

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=knowledge-distillation-compression)

Transferring, compressing and deploying larger recommendation models.

11 papers · Updated 2026-10-30

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

<a id="paper-2610-21220"></a>

- **RecSoup: Efficient Model Merging Approach for Controllable Multi-Objective Recommendation**: RecSoup reuses objective-specific recommendation models to adjust serving-time trade-offs without joint retraining. It first prunes parameters using objective-specific importance and cross-objective relevance, then learns a mapping from desired preferences to merging coefficients. Experiments report improved Pareto-front quality and substantially lower parameter-construction latency than the evaluated parameter-generating approaches; this comparison is not a general speedup over ordinary rankers. For multi-objective CTR systems, it offers a model-reuse and deployment option, rather than evidence of a recommendation scaling law. — [Paper](https://arxiv.org/abs/2610.21220) · [DOI](https://doi.org/10.1145/3799682.3840938) (Renmin University of China · CIKM 2026). Reading priority: Unrated.

<a id="paper-2610-26143"></a>

- **FLMNet: Self-Ensemble Distillation from Masks to Seeds for Single-Tower CTR Prediction**: FLMNet explains dropout self-distillation as a label loss plus a disagreement penalty in the infinite-mask limit. When dropout leaves feature gating unchanged, the penalty admits a closed-form approximation, enabling sampling-free training; distilling models trained from different seeds recovers part of the ensemble gain in one network. On five CTR benchmarks against seventeen baselines, the resulting models occupy the top two accuracy positions. The evidence concerns benchmark accuracy with single-network inference, not industrial scaling laws. — [Paper](https://arxiv.org/abs/2610.26143) (National University of Singapore; University of Science and Technology of China · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-32943"></a>

- **Knowledge Distillation across Item and Code Spaces for Parallel Generative Recommendation**: This work distills an item-space teacher into parallel semantic-ID generation, which avoids conditioning on previously generated codes. Item Distribution Matching reconstructs item probabilities, while Code Marginal Matching projects teacher distributions onto code marginals. Reported mean gains are 15.39% in Recall@10 for the former and 8.28% in NDCG@10 for the latter. The methods connect item-level knowledge with parallel code prediction. — [Paper](https://arxiv.org/abs/2610.32943) (The Hong Kong University of Science and Technology; University of Science and Technology of China · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-35218"></a>

- **MuSID-KD: Multigranularity Knowledge Distillation for Generative Recommendation with Semantic IDs**: MuSID-KD transfers semantic-ID recommendation knowledge to lightweight students at multiple granularities. It aligns candidate distributions aggregated by shared prefixes and allocates token-level supervision according to estimated ranking impact. Experiments with three student architectures report better recommendation accuracy and closer prefix and pairwise ranking alignment without changing online inference architecture. This is a training-side method for preserving ranking quality in compact generative recommenders. — [Paper](https://arxiv.org/abs/2610.35218) (East China Normal University; Fudan University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-36267"></a>

- **Preserving rare-item recall under a storage budget: quantization, distillation, and the limits of teacher fidelity**: Under a fixed embedding-storage budget, the study compares low-dimensional models, distilled students and higher-rank low-precision factorizations across seven dataset-backbone cells. A rank-300 4-bit factorization uses 13% of teacher storage while retaining 95–103% of tail recall@20 and 93–97% of NDCG@20, at 7.5 times the arithmetic per score. Teacher-hit retention can misrank candidates, so the authors recommend assessing total rare-item recall directly. — [Paper](https://arxiv.org/abs/2610.36267) (University of Texas at Austin; Unaffiliated · arXiv 2026). Reading priority: Unrated.
