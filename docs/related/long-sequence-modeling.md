<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Long Sequence Modeling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=long-sequence-modeling)

Long-history modeling, memory and compression for user behavior sequences.

23 papers · Updated 2026-10-02

<a id="paper-2504-06780"></a>

- **CHIME**: Compressive framework for holistic interest modeling; LLM-based encoding + residual VQ — [Paper](https://arxiv.org/abs/2504.06780) (Kuaishou · 2025)

<a id="paper-2505-04421"></a>

- **LONGER**: Scales ultra-long user behavior sequences beyond two-stage retrieval — [Paper](https://arxiv.org/abs/2505.04421) (ByteDance · RecSys 2025)

<a id="paper-2508-13567"></a>

- **ENCODE**: Efficient clustering-based two-stage approach for long-term user interest modeling — [Paper](https://arxiv.org/abs/2508.13567) (Alibaba · TKDE 2025)

<a id="paper-2508-17125"></a>

- **VQL**: Context-aware vector quantization attention for ultra-long behavior modeling — [Paper](https://arxiv.org/abs/2508.17125) (Kuaishou · 2025)

<a id="paper-2511-06077"></a>

- **Make It Long, Keep It Fast**: End-to-end 10K-sequence modeling at billion scale on Douyin — [Paper](https://arxiv.org/abs/2511.06077) (ByteDance · WWW 2026)

<a id="paper-2512-07216"></a>

- **MUSE**: Multimodal search-based framework for 100K-length lifelong user interest modeling — [Paper](https://arxiv.org/abs/2512.07216) (Alibaba · 2025)

<a id="paper-2601-03479"></a>

- **PerSRec**: Compresses long histories into learnable tokens for HSTU/HLLM — [Paper](https://arxiv.org/abs/2601.03479) (Meta · ICDM 2025)

<a id="paper-2601-20234"></a>

- **MALLOC**: Benchmark for memory-efficient long sequence compression — [Paper](https://arxiv.org/abs/2601.20234) (2026)

<a id="paper-2604-20858"></a>

- **MoS (Mixture of Sequence)**: Theme-aware MoE for long-sequence recommendation; routes subsequences to filter session-hopping noise — [Paper](https://arxiv.org/abs/2604.20858) (Meta · WWW 2026)

<a id="paper-2605-24051"></a>

- **Memento**: RAG-style long-retention data scaling for Meta Ads; MMR-based retrieval over user-history corpus — [Paper](https://arxiv.org/abs/2605.24051) (Meta · 2026)

<a id="paper-2605-25726"></a>

- **SIREN**: Multi-modal lifelong user interest via unified multi-granularity semantic interaction; deployed in Tencent advertising (Weixin) — [Paper](https://arxiv.org/abs/2605.25726) (Tencent · 2026)

<a id="paper-2605-25583"></a>

- **LENS**: Target-Conditioned Query Gate and Position Bias for restoring target-specific control in latent-query CTR backbones — [Paper](https://arxiv.org/abs/2605.25583) (2026)

<a id="paper-2606-07546"></a>

- **Beyond Item IDs**: Semantic-native long sequence modeling for short-form-video recommendation; Global-Aware Compression Transformer with non-parametric temporal folding; deployed at billion-user scale — [Paper](https://arxiv.org/abs/2606.07546) (Google · SIGIR 2026)

<a id="paper-2606-09888"></a>

- **SinkRec**: Mitigates semantic state sink in linear attention for long-sequence recommendation; hybrid memory-transition looped architecture with memory-conditioned Gated Delta Networks — [Paper](https://arxiv.org/abs/2606.09888) (2026)

<a id="paper-2606-28533"></a>

- **CMSL**: Constructive Multi-Sequence Learning; disentangles user history into thematic strands via learnable Sequence Construction Module with linear attention; deployed across ranking and retrieval on four major surfaces at Meta — [Paper](https://arxiv.org/abs/2606.28533) (Meta · 2026)

<a id="paper-2606-29946"></a>

- **POEM**: Partial-Order Enhanced Real-Time Sequential Modeling; constructs dynamic partial-order sequences from multi-task ranking scores for fine-grained real-time interest modeling; deployed on Kuaishou — [Paper](https://arxiv.org/abs/2606.29946) (Kuaishou · RecSys (Industry) 2026)

<a id="paper-2607-14331"></a>

- **Long-History User Transformers**: Decoupled offline/online architecture for full cross-surface user history in real-time ad ranking; offline transformer pre-trains on interaction logs with dual objective, cached representation + lightweight runtime model; +2.77% ranking metric, +2.26% revenue at Yandex — [Paper](https://arxiv.org/abs/2607.14331) (Yandex · 2026)

<a id="paper-2602-23671"></a>

- **FuXi-Linear**: Linear-complexity model for long-term time-aware sequential recommendation; decouples temporal and semantic signals to avoid mutual interference while capturing behavioral periodicity; designed for deep architectures and long sequences — [Paper](https://arxiv.org/abs/2602.23671) (KDD 2026)

<a id="paper-2608-03692"></a>

- **SITA**: Semantic Interest Tokens for Target-Aware Compression; bridges target-aware retrieval and target-agnostic compression via learnable interest tokens that absorb target-relevant signals during training; achieves target-specific adaptation without target-dependent inference computation — [Paper](https://arxiv.org/abs/2608.03692) (Huawei · 2026)

<a id="paper-2608-07055"></a>

- **TM20K**: Full transformer + token merge for 20K e-commerce sequence; two-stage KD with full-token teacher boosting merged-token student; deployed in ByteDance advertising with +1.036% ADSS at only +5.6% serving latency — [Paper](https://arxiv.org/abs/2608.07055) (ByteDance · 2026)

<a id="paper-2609-31045"></a>

- **KuaFu: Compressing Long User Behavior into Understanding at Billion Scale**: Item-level two-axis behavior compression reduces token count and width, enabling offline caching shared across users and tasks; fidelity-oriented four-stage training supports billion-user profile refresh, with 37–350% per-GPU throughput gains across production profiling tasks — [Paper](https://arxiv.org/abs/2609.31045) (Tencent · arXiv 2026)

<a id="paper-2609-32215"></a>

- **DP-Rec: Towards Dynamic Patching for Efficient Long-Sequence Recommendation**: Contrastive-surprise boundary detection forms variable-length behavior patches for a lightweight local encoder/decoder and larger latent Transformer; counts boundary-detection cost in matched-FLOP comparisons and improves NDCG@10 by 16.0%, 21.1% and 11.0% over the strongest respective baselines on three public datasets — [Paper](https://arxiv.org/abs/2609.32215) (Capital One (AI Foundations) · RecSys 2026)

<a id="paper-2609-30576"></a>

- **T-RoPE: Time-Aware Rotary Position Embedding for Sequential Recommendation**: Time-aware rotary encoding combines learnable multiscale temporal frequencies, shifted query alignment and non-stationary keys to represent elapsed time and calendar phase; adds linear-in-sequence encoding overhead and improves Shop-app CVR 0.33% (p=0.037) — [Paper](https://arxiv.org/abs/2609.30576) (Shopify / MIT / Liquid AI · arXiv 2026)
