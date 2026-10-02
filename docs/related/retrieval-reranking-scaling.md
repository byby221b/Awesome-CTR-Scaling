<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Retrieval & Reranking Scaling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=retrieval-reranking-scaling)

Scaling retrieval and reranking stages of recommendation pipelines.

12 papers · Updated 2026-10-02

<a id="paper-2603-04816"></a>

- **Scaling Laws for Cross-Encoder Reranking**: This study finds predictable scaling relationships for cross-encoder reranking across model size, training exposure and pointwise, pairwise or listwise objectives. Fits from smaller runs forecast larger rerankers and guide compute allocation, with results often favoring more training data but also showing that the preferred allocation depends on the chosen ranking objective. — [Paper](https://arxiv.org/abs/2603.04816) (Academic · 2026)

<a id="paper-2605-27810"></a>

- **LRanker**: LRanker adapts language-model ranking to candidate pools too large to fit into a single context. It summarizes candidate structure through clustering and uses a graph-based test-time procedure to build and ensemble multiple query embeddings, improving the coverage and robustness of ranking across massive pools rather than relying on one query representation. — [Paper](https://arxiv.org/abs/2605.27810) (UIUC · 2026)

<a id="paper-2604-12965"></a>

- **Efficient Retrieval Scaling with Hierarchical Indexing**: The paper jointly learns a hierarchical retrieval index with cross-attention and residual quantization so larger recommendation models can search efficiently. Instead of treating indexing as a detached serving step, the learned hierarchy organizes model memory; the authors also find that its intermediate nodes identify useful data for further fine-tuning, improving deployed retrieval performance. — [Paper](https://arxiv.org/abs/2604.12965) (Meta · 2026)

<a id="paper-2606-13533"></a>

- **OneRetrieval**: OneRetrieval aims to replace fragmented e-commerce retrieval branches while preserving operators’ ability to add new search terms quickly. Its keyword-aligned item codes reserve positions that can be bound to new words after deployment, combining generative retrieval quality with index-like editability and reducing reliance on hand-tuned merging across separate retrieval systems. — [Paper](https://arxiv.org/abs/2606.13533) (Kuaishou · 2026)

<a id="paper-2606-18379"></a>

- **RankGraph-2**: RankGraph-2 co-designs graph construction, representation learning and serving for billion-node recommendation retrieval. Bias-corrected edge sampling and precomputed neighborhoods create self-contained training data, while a jointly learned residual-quantization cluster index avoids expensive online nearest-neighbor computation, showing how lifecycle-wide decisions can simplify infrastructure and improve retrieval quality together. — [Paper](https://arxiv.org/abs/2606.18379) (Meta · RecSys (Industry) 2026)

<a id="paper-2607-12392"></a>

- **MESH**: MESH addresses a scaling imbalance in retrieval: more model capacity often benefits popular content more than fresh or sparse items. It separates feature domains and uses gated bias correction to protect weak signals from dominant engagement features, combining a unified model with asynchronous serving to improve sparse-content retrieval without maintaining many specialized retrievers. — [Paper](https://arxiv.org/abs/2607.12392) (Pinterest · RecSys (Industry) 2026)

<a id="paper-2607-10096"></a>

- **Scaling and Stabilizing Large-Scale EBR**: This production retrieval pipeline improves both training signals and the transition to a stronger encoder. It combines diverse online cross-batch negatives with offline hard negatives selected using cross-encoder scores and metadata, then warm-starts the larger backbone through legacy-model distillation, preserving established domain knowledge while improving large-catalog discrimination. — [Paper](https://arxiv.org/abs/2607.10096) (Walmart · 2026)

<a id="paper-2607-27475"></a>

- **OneShot**: OneShot aligns retrieval indexing directly with the ranking objective rather than learning an index from embedding proximity alone. Its end-to-end, in-model index supports richer neural user–item scoring beyond dot products, reducing the mismatch between fast candidate search and accurate relevance estimation and improving the recall–efficiency trade-off in production recommendation. — [Paper](https://arxiv.org/abs/2607.27475) (2026)

<a id="paper-2608-25528"></a>

- **TransRetrieval**: TransRetrieval diagnoses heterogeneous feature-token norms as a reason that deeper Transformers can scale poorly in recommendation retrieval. Weighted aggregation stabilizes the token representation, target-token compression reduces candidate-side computation, and lightweight domain embeddings incorporate cross-domain data, enabling more effective scaling of retrieval quality under practical latency constraints. — [Paper](https://arxiv.org/abs/2608.25528) (Alibaba · CIKM 2026)

<a id="paper-2609-39327"></a>

- **Generative End-to-end Ad Retrieval at Douyin**: GEAR jointly trains the tokenizer, generator and reranker for advertising retrieval, addressing the linked problems of collapsed codebooks and items sharing the same code. Orthogonal-basis parameterization stabilizes codebook learning, a prefix-aware extension increases expressiveness, and context-conditioned reranking disambiguates collisions, making end-to-end generative retrieval more robust at large catalog scale. — [Paper](https://arxiv.org/abs/2609.39327) (ByteDance · arXiv 2026)

<a id="paper-2609-29180"></a>

- **X-Rec Technical Report**: X-Rec learns a recommendation distribution directly in continuous item-embedding space and generates vectors for approximate nearest-neighbor retrieval. Anchor conditioning separates coarse interest selection from refinement, geometry-aware flow matching respects the embedding sphere, and late interaction reduces repeated computation, offering diverse retrieval without discrete-code quantization and sequential token-generation overhead. — [Paper](https://arxiv.org/abs/2609.29180) (ByteDance (TikTok) · arXiv 2026)

<a id="paper-2609-30601"></a>

- **Embedding Subspace Partitioning for Dynamic Multi-Objective Retrieval**: Embedding Subspace Partitioning separates retrieval objectives into isolated portions of an embedding and scores candidates through a weighted sum of their similarities. Serving-time weights can change the objective balance without retraining, while segment-aware attention produces the subspaces in one pass and a shared GPU search index avoids maintaining separate retrieval infrastructure for each objective. — [Paper](https://arxiv.org/abs/2609.30601) (LinkedIn · RecSys (Industry) 2026)
