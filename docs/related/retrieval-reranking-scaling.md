<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Retrieval & Reranking Scaling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=retrieval-reranking-scaling)

Scaling retrieval and reranking stages of recommendation pipelines.

12 papers · Updated 2026-10-02

<a id="paper-2603-04816"></a>

- **Scaling Laws for Cross-Encoder Reranking**: First systematic study of scaling laws for cross-encoder rerankers across pointwise / pairwise / listwise objectives — [Paper](https://arxiv.org/abs/2603.04816) (Academic · 2026)

<a id="paper-2605-27810"></a>

- **LRanker**: LLM ranker for massive candidate pools; addresses context length and computational cost constraints in real-world ranking — [Paper](https://arxiv.org/abs/2605.27810) (UIUC · 2026)

<a id="paper-2604-12965"></a>

- **Efficient Retrieval Scaling with Hierarchical Indexing**: Hierarchical index learning over foundational retrieval model memory; deployed at Meta — [Paper](https://arxiv.org/abs/2604.12965) (Meta · 2026)

<a id="paper-2606-13533"></a>

- **OneRetrieval**: One-model editable generative retrieval for industrial e-commerce search; Keyword-Aligned Encoding (KAE) ties identifier slots to interpretable attribute words; reserved codebook slots enable real-time term injection without retraining; matches strongest GR baseline on 5M real-traffic requests with order-of-magnitude higher intervention hit rate — [Paper](https://arxiv.org/abs/2606.13533) (Kuaishou · 2026)

<a id="paper-2606-18379"></a>

- **RankGraph-2**: Lifecycle co-design for billion-node graph-based retrieval (U2U2I/U2I2I); co-learns residual-quantization cluster index reducing serving cost 83%; 3.8× recall over GAT+DGI; +0.96% CTR across 20+ retrieval launches at Meta — [Paper](https://arxiv.org/abs/2606.18379) (Meta · RecSys (Industry) 2026)

<a id="paper-2607-12392"></a>

- **MESH**: Unified retrieval scaling framework addressing Scaling Bias of Heterogeneity; modularized architecture with gated bias correction achieves 14× improvement in scaling exponent for fresh items; deployed on Pinterest Related Pins — [Paper](https://arxiv.org/abs/2607.12392) (Pinterest · RecSys (Industry) 2026)

<a id="paper-2607-10096"></a>

- **Scaling and Stabilizing Large-Scale EBR**: Unified pipeline for scaling embedding-based retrieval at Walmart; Hybrid Hard Negative Mining + Legacy-Aware Distillation for smooth backbone evolution from DistilBERT to GTE-base; +7.34% NDCG@5, +0.50% revenue — [Paper](https://arxiv.org/abs/2607.10096) (Walmart · 2026)

<a id="paper-2607-27475"></a>

- **OneShot**: End-to-end in-model index learning framework that natively aligns index building with ranking objectives; resolves structural misalignment between ranking accuracy and indexing efficiency for billion-scale retrieval — [Paper](https://arxiv.org/abs/2607.27475) (2026)

<a id="paper-2608-25528"></a>

- **TransRetrieval**: Scaling up Transformer-based retrieval for industrial recommendation; weighted average aggregation restores the homogeneous-token assumption Transformers rely on, target token compression cuts per-candidate FLOPs by 85%, and position-style domain embeddings turn cross-domain data into a scaling asset; confirms robust log-linear scaling (+19.3/+22.2 pt Recall@2000) and lifts platform revenue +2.53% in online A/B — [Paper](https://arxiv.org/abs/2608.25528) (Alibaba · CIKM 2026)

<a id="paper-2609-39327"></a>

- **Generative End-to-end Ad Retrieval at Douyin**: Jointly trains the item tokenizer, generator and reranker; orthogonal-basis BasisVQ and prefix-aware BasisRQ stabilize codebook updates, while a context-conditioned head resolves SID collisions; minute-refreshed indexing and packed-INT4 scoring support a new Douyin Ads retrieval channel with +0.563% ADSS and +0.658% ADVV — [Paper](https://arxiv.org/abs/2609.39327) (ByteDance · arXiv 2026)

<a id="paper-2609-29180"></a>

- **X-Rec Technical Report**: Anchor-conditioned Riemannian flow matching generates continuous embedding triggers for ANN retrieval; a late-interaction diffusion Transformer confines repeated velocity evaluation to its final layer, delivering 3.46× trigger-generation throughput over the SID-AR comparator; deployed as a TikTok vertical-content retrieval source — [Paper](https://arxiv.org/abs/2609.29180) (ByteDance (TikTok) · arXiv 2026)

<a id="paper-2609-30601"></a>

- **Embedding Subspace Partitioning for Dynamic Multi-Objective Retrieval**: Task-isolated embedding subspaces allow serving-time objective reweighting without retraining; Transformer variant uses segment-aware masking and position resets in one pass, while single-index GPU exhaustive kNN supports production DNN-ESP at LinkedIn; selected operating point improves revenue 4.01% and job applications 3.95% — [Paper](https://arxiv.org/abs/2609.30601) (LinkedIn · RecSys (Industry) 2026)
