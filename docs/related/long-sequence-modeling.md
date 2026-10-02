<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Long Sequence Modeling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=long-sequence-modeling)

Long-history modeling, memory and compression for user behavior sequences.

23 papers · Updated 2026-10-02

<a id="paper-2504-06780"></a>

- **CHIME**: CHIME compresses complete, heterogeneous user histories instead of first selecting a small behavior subset. Adapted language-model encoders learn persistent and short-lived interests through multi-granularity contrastive objectives, then residual vector quantization produces compact representations. The framework seeks broad history coverage with representations cheap enough for downstream recommendation. — [Paper](https://arxiv.org/abs/2504.06780) (Kuaishou · 2025)

<a id="paper-2505-04421"></a>

- **LONGER**: LONGER combines global tokens for stable long-context attention with token merging and hybrid attention to control sequence cost. Training and serving optimizations include mixed precision, activation recomputation and key-value caching. Its contribution is an end-to-end long-history modeling stack that reduces reliance on a separately trained retrieval stage and its consistency problems. — [Paper](https://arxiv.org/abs/2505.04421) (ByteDance · RecSys 2025)

<a id="paper-2508-13567"></a>

- **ENCODE**: ENCODE divides long-history modeling into offline interest extraction and online target matching. It clusters the complete history in a lower-dimensional space designed to preserve pairwise relevance, then uses the same relevance metric when matching stored interests to candidates. The shared metric aims to avoid a mismatch between efficient compression and target-specific usefulness. — [Paper](https://arxiv.org/abs/2508.13567) (Alibaba · TKDE 2025)

<a id="paper-2508-17125"></a>

- **VQL**: VQL compresses attention keys through vector quantization while preserving the value information used for aggregation. Multiple small codebooks and context injection capture semantic and temporal structure without making cached states candidate-dependent. This supports low-cost attention over long histories, with the paper analyzing how quantization error behaves as sequence length grows. — [Paper](https://arxiv.org/abs/2508.17125) (Kuaishou · 2025)

<a id="paper-2511-06077"></a>

- **Make It Long, Keep It Fast**: This work uses stacked target-to-history cross-attention to read long user histories without quadratic history self-attention. Request-level batching shares the same user's encoding across candidates, while short-window training is evaluated on longer histories. The model and serving design jointly address attention cost, repeated feature transfer and the expense of training on every long sequence. — [Paper](https://arxiv.org/abs/2511.06077) (ByteDance · WWW 2026)

<a id="paper-2512-07216"></a>

- **MUSE**: MUSE distinguishes the roles of multimodal information in two-stage lifelong-interest modeling. It finds simple similarity search effective for coarse behavior retrieval, while the fine-grained stage needs richer multimodal sequence processing and fusion with item IDs. The framework therefore spends modeling complexity after retrieval, where the selected behaviors are interpreted in relation to the target. — [Paper](https://arxiv.org/abs/2512.07216) (Alibaba · 2025)

<a id="paper-2601-03479"></a>

- **PerSRec**: PerSRec compresses older interactions into learnable personalized tokens and combines them with recent behavior at prediction time. Existing sequential backbones can consume this shorter representation instead of repeatedly processing the full history. The method explores how retaining a compact long-term memory can reduce compute while preserving the value of historical interests. — [Paper](https://arxiv.org/abs/2601.03479) (Meta · ICDM 2025)

<a id="paper-2601-20234"></a>

- **MALLOC**: MALLOC benchmarks the memory cost hidden by long-sequence caching methods. It organizes and integrates compression strategies into sequential recommenders, comparing recommendation quality, efficiency and complexity. The benchmark makes storage overhead an explicit evaluation axis, since caching every user's historical states can become expensive even when it accelerates each request. — [Paper](https://arxiv.org/abs/2601.20234) (2026)

<a id="paper-2604-20858"></a>

- **MoS (Mixture of Sequence)**: Mixture of Sequence addresses histories in which interests stay stable within sessions but shift sharply between them. Theme-aware routing groups related sessions into coherent subsequences, and different experts combine global, recent and theme-specific information. This aims to reduce distraction from unrelated sessions without discarding the broader behavioral context. — [Paper](https://arxiv.org/abs/2604.20858) (Meta · WWW 2026)

<a id="paper-2605-24051"></a>

- **Memento**: Memento treats retained user engagements as a searchable corpus and each ad request as a query. Retrieval balances relevance with diversity, supporting both historical-embedding features and replay of past training examples. Quantization, temporal chunking and asynchronous serving make selective use of old information more practical than repeatedly processing an ever-longer recent-history window. — [Paper](https://arxiv.org/abs/2605.24051) (Meta · 2026)

<a id="paper-2605-25726"></a>

- **SIREN**: SIREN connects multimodal content with collaborative recommendation signals throughout both retrieval and fine-grained history modeling. Coarse retrieval can use content similarity or semantic identifiers; the second stage uses similarity buckets and identifier prefixes to express target relevance. This provides several interaction granularities instead of leaving multimodal information to a final fusion layer. — [Paper](https://arxiv.org/abs/2605.25726) (Tencent · 2026)

<a id="paper-2605-25583"></a>

- **LENS**: LENS restores candidate-specific control in models that read history through compressed latent queries. A target-conditioned gate selects query activity, and a target-conditioned position bias guides which historical positions are read. The study also finds that sparse-item settings benefit from conditioning on both the item and its sequence context, rather than the item representation alone. — [Paper](https://arxiv.org/abs/2605.25583) (2026)

<a id="paper-2606-07546"></a>

- **Beyond Item IDs**: This short-video framework tackles both weak item-ID semantics and expensive long-history attention. Coarse semantic identifiers let related and new videos share representation structure, while temporal folding and global queries compress long sequences. The combined design studies whether better content representation and cheaper history processing can scale together in production recommendation. — [Paper](https://arxiv.org/abs/2606.07546) (Google · SIGIR 2026)

<a id="paper-2606-09888"></a>

- **SinkRec**: SinkRec identifies a failure of recurrent linear attention: repeated semantic patterns can occupy the state and bias later predictions. It stores recurring patterns in a separate quantized memory, then conditions state updates and readouts to suppress information already covered there. This leaves the recurrent state more room to represent changing interests while keeping linear-time sequence processing. — [Paper](https://arxiv.org/abs/2606.09888) (2026)

<a id="paper-2606-28533"></a>

- **CMSL**: CMSL addresses the difficulty of representing several interests inside one mixed user history, where unrelated behaviors compete for attention. A learnable Sequence Construction Module separates behavior into coherent thematic sequences, which linear attention then models efficiently; the method has been deployed across ranking and retrieval on four major Meta surfaces. — [Paper](https://arxiv.org/abs/2606.28533) (Meta · 2026)

<a id="paper-2606-29946"></a>

- **POEM**: POEM models rapidly changing interests using partial-order relations derived from real-time ranking scores, including predicted clicks and watch duration. It combines score-conditioned sequence construction, multi-objective score fusion, and hierarchical sample learning, bringing upstream ranking signals into per-request interest modeling; online deployment on Kuaishou improved average viewing time. — [Paper](https://arxiv.org/abs/2606.29946) (Kuaishou · RecSys (Industry) 2026)

<a id="paper-2607-14331"></a>

- **Long-History User Transformers**: Long-History User Transformers separates expensive history encoding from latency-sensitive ad ranking. An offline Transformer learns feedback and next-item prediction from cross-surface logs, while a lightweight online model combines cached representations with recent events and request context; production experiments improved ranking and revenue without increasing serving latency. — [Paper](https://arxiv.org/abs/2607.14331) (Yandex · 2026)

<a id="paper-2602-23671"></a>

- **FuXi-Linear**: FuXi-Linear makes long-history recommendation more efficient with separate linear-complexity channels for temporal patterns and position. A Temporal Retention Channel models periodic timing independently of item semantics, while learnable positional kernels preserve ordering information, addressing two weaknesses of existing linear attention without returning to quadratic sequence computation. — [Paper](https://arxiv.org/abs/2602.23671) (KDD 2026)

<a id="paper-2608-03692"></a>

- **SITA**: SITA bridges target-aware recommendation and reusable history compression by organizing compressed interests into semantic structures. Semantic identifiers learned through parallel quantization let the model aggregate the relevant interests according to the target item's identifier, producing a target-specific user representation while retaining the scalability advantages of compressed histories. — [Paper](https://arxiv.org/abs/2608.03692) (Huawei · 2026)

<a id="paper-2608-07055"></a>

- **TM20K**: TM20K makes full-Transformer modeling of 20,000-step e-commerce histories more practical through token merging. A heavily trained full-token teacher transfers knowledge to a merged-token student in a two-stage framework, preserving richer sequential interactions than target-only attention while limiting the additional serving cost in ByteDance's advertising system. — [Paper](https://arxiv.org/abs/2608.07055) (ByteDance · 2026)

<a id="paper-2609-31045"></a>

- **KuaFu: Compressing Long User Behavior into Understanding at Billion Scale**: KuaFu compresses each behavior item along both token-count and representation-width axes to make large-scale user profiling affordable. Four-stage fidelity-oriented training and intermediate evaluation target distortions such as fabricated or omitted information, allowing a unified compression layer to support multiple profiling tasks while improving throughput in production. — [Paper](https://arxiv.org/abs/2609.31045) (Tencent · arXiv 2026)

<a id="paper-2609-32215"></a>

- **DP-Rec: Towards Dynamic Patching for Efficient Long-Sequence Recommendation**: DP-Rec avoids spending equal computation on every historical interaction by dividing the sequence at informative behavioral boundaries. Contrastive-entropy surprise determines variable-length patches, which a lightweight encoder compresses before a larger latent Transformer processes them; the approach improves the accuracy-efficiency balance under constrained computation budgets. — [Paper](https://arxiv.org/abs/2609.32215) (Capital One (AI Foundations) · RecSys 2026)

<a id="paper-2609-30576"></a>

- **T-RoPE: Time-Aware Rotary Position Embedding for Sequential Recommendation**: T-RoPE extends rotary position encoding to represent elapsed time and calendar phase rather than only event order. Learnable multiscale temporal frequencies, shifted query alignment, and non-stationary keys let attention distinguish seasonal contexts, while the added encoding cost remains linear in sequence length; experiments include public benchmarks and an online Shop-app test. — [Paper](https://arxiv.org/abs/2609.30576) (Shopify / MIT / Liquid AI · arXiv 2026)
