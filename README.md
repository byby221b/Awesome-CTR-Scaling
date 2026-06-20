# Awesome CTR Scaling [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated list of research papers on **Scaling Laws and Scaling Up Ranking/CTR Models** in industrial recommendation systems.

This repository focuses on a rapidly emerging research direction: how to effectively scale up Click-Through Rate (CTR) prediction and ranking models — drawing inspiration from the scaling laws observed in Large Language Models (LLMs) — to achieve continuous performance gains in industrial recommender systems.

> **Scope**: We cover papers that (1) study scaling laws for recommendation models, (2) propose scalable Transformer-based architectures for CTR/ranking, (3) address efficiency challenges in scaling up industrial ranking systems, or (4) explore novel paradigms (e.g., sparse scaling, generative pre-training, foundation models) for scalable recommendation.

---

## Table of Contents

- [Papers](#papers)
- [Related Work](#related-work)
- [Company Overview](#company-overview)
- [Contributing](#contributing)

---

## Papers

| Paper | Affiliation | Venue | Year | Links | Key Contribution |
|:------|:------------|:------|:-----|:------|:-----------------|
| **Understanding Scaling Laws for Recommendation Models** | Meta | arXiv | 2022 | [[Paper]](https://arxiv.org/abs/2208.08489) | First systematic study of scaling laws for DLRM-style CTR models; shows power-law + constant behavior across model size, data size, and compute |
| **DHEN: A Deep and Hierarchical Ensemble Network for Large-Scale Click-Through Rate Prediction** | Meta | arXiv | 2022 | [[Paper]](https://arxiv.org/abs/2203.11014) | Hierarchical ensemble of heterogeneous interaction modules; co-designed training system for efficiency |
| **Hiformer: Heterogeneous Feature Interactions Learning with Transformers for Recommender Systems** | Google | arXiv | 2023 | [[Paper]](https://arxiv.org/abs/2311.05884) | Learns heterogeneous feature interactions via Transformers; addresses sparse high-dimensional input challenges |
| **Wukong: Towards a Scaling Law for Large-Scale Recommendation** | Meta | ICML | 2024 | [[Paper]](https://arxiv.org/abs/2403.02545) | Proposes factorized stacked interaction layers enabling effective parameter scaling; demonstrates scaling law for recommendation |
| **HSTU: Actions Speak Louder than Words: Trillion-Parameter Sequential Transducers for Generative Recommendations** | Meta | ICML | 2024 | [[Paper]](https://arxiv.org/abs/2402.17152) | Hierarchical Sequential Transduction Unit; scales to trillion parameters; generative recommendation paradigm |
| **LiRank: Industrial Large Scale Ranking Models at LinkedIn** | LinkedIn | KDD | 2024 | [[Paper]](https://arxiv.org/abs/2402.06859) | Residual DCN + Transformer + Dense Gating; quantization and compression for serving |
| **InterFormer: Effective Heterogeneous Interaction Learning for Click-Through Rate Prediction** | Meta | CIKM | 2025 | [[Paper]](https://arxiv.org/abs/2411.09852) | Heterogeneous feature interaction with user profile, context, and behavior signals for CTR |
| **SUAN: Exploring Scaling Laws of CTR Model for Online Performance Improvement** | Meituan | RecSys | 2025 | [[Paper]](https://arxiv.org/abs/2508.15326) | Systematically explores how CTR model scaling translates to online performance; practical methodology for scaling decisions |
| **Climber: Toward Efficient Scaling Laws for Large Recommendation Models** | NetEase | WWW | 2025 | [[Paper]](https://arxiv.org/abs/2502.09888) | Multi-scale sequence extraction + dynamic temperature modulation; first publicly documented continuous online scaling |
| **RankMixer: Scaling Up Ranking Models in Industrial Recommenders** | ByteDance | CIKM | 2025 | [[Paper]](https://arxiv.org/abs/2507.15551) | Efficient TokenMixer-based architecture for scaling ranking models; addresses training and serving cost |
| **HHFT: Hierarchical Heterogeneous Feature Transformer for Recommendation Systems** | Alibaba | arXiv | 2025 | [[Paper]](https://arxiv.org/abs/2511.20235) | Hierarchical Transformer addressing DNN limitations with three key designs for heterogeneous features |
| **Realizing Scaling Laws in Recommender Systems: A Foundation-Expert Paradigm for Hyperscale Model Deployment** | Meta | arXiv | 2025 | [[Paper]](https://arxiv.org/abs/2508.02929) | Foundation model + surface-specific experts; HyperCast infrastructure; first Foundation-Expert deployment at scale |
| **MTmixAtt: Integrating Mixture-of-Experts with Multi-Mix Attention for Large-Scale Recommendation** | Meituan | arXiv | 2025 | [[Paper]](https://arxiv.org/abs/2510.15286) | MoE + multi-mix attention with AutoToken; scales to 1B params |
| **OnePiece: Bringing Context Engineering and Reasoning to Industrial Cascade Ranking System** | Shopee | arXiv | 2025 | [[Paper]](https://arxiv.org/abs/2509.18091) | LLM-style context engineering + block-wise latent reasoning in cascade ranking |
| **INFNet: Aggregate and Broadcast: Scalable and Efficient Feature Interaction for Recommender Systems** | Kuaishou | arXiv | 2025 | [[Paper]](https://arxiv.org/abs/2508.11565) | Linear-complexity task-aware feature interaction via aggregate-and-broadcast hub tokens |
| **OneTrans: Unified Feature Interaction and Sequence Modeling with One Transformer in Industrial Recommender** | ByteDance | WWW | 2026 | [[Paper]](https://arxiv.org/abs/2510.26104) | Unified tokenizer + causal attention + KV caching; co-optimizes sequence and feature interaction |
| **FAT: From Scaling to Structured Expressivity: Rethinking Transformers for CTR Prediction** | Alibaba | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2511.12081) | Field-Aware Transformer with decomposed content alignment; first formal scaling law for CTR based on Rademacher complexity |
| **Kunlun: Establishing Scaling Laws for Massive-Scale Recommendation Systems Through Unified Architecture Design** | Meta | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2602.10016) | Unified architecture design for predictable scaling laws; governs relationship between performance and computational investment |
| **SparseCTR: Unleashing the Potential of Sparse Attention on Long-Term Behaviors for CTR Prediction** | Meituan | WWW | 2026 | [[Paper]](https://arxiv.org/abs/2601.17836) | Three-branch sparse attention for long behaviors; demonstrates scaling law across 3 orders of magnitude in FLOPs |
| **LLaTTE: Scaling Laws for Multi-Stage Sequence Modeling in Large-Scale Ads Recommendation** | Meta | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2601.20083) | Power-law scaling for ads rec; two-stage async architecture; largest user model at Meta |
| **HyFormer: Revisiting the Roles of Sequence Modeling and Feature Interaction in CTR Prediction** | ByteDance | SIGIR | 2026 | [[Paper]](https://arxiv.org/abs/2601.12681) | Revisits the roles of sequence modeling vs. feature interaction under efficiency constraints |
| **Zenith: Scaling Up Ranking Models for Billion-Scale Livestreaming Recommendation** | ByteDance | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2601.21285) | Scales ranking models for livestream scenarios; demonstrates scaling benefits for feature interactions |
| **TokenMixer-Large: Scaling Up Large Ranking Models in Industrial Recommenders** | ByteDance | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2602.06563) | Addresses hardware under-utilization in scaling; optimized TokenMixer architecture for industrial deployment |
| **MSN: A Memory-based Sparse Activation Scaling Framework for Large-scale Industrial Recommendation** | ByteDance | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.07526) | Product-Key Memory with sub-linear retrieval; sparse activation via Top-k memory slots; deployed in Douyin Search Ranking |
| **HeteroMixer: Query-Mixed Interest Extraction and Heterogeneous Interaction: A Scalable CTR Model for Industrial Recommender Systems** | Alibaba | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.09387) | Query-mixed interest extraction with heterogeneous interaction for sparse multi-field inputs and ultra-long sequences |
| **UG-Sep: Compute Only Once: UG-Separation for Efficient Large Recommendation Models** | ByteDance | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.10455) | User-general feature separation to reduce redundant computation; enables affordable scaling |
| **EST: Towards Efficient Scaling Laws in Click-Through Rate Prediction via Unified Modeling** | Alibaba | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2602.10811) | Efficient unified modeling for scalable CTR; addresses early aggregation limitations |
| **MTFM: A Scalable and Alignment-Free Foundation Model for Industrial Recommendation in Meituan** | Meituan | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.11235) | Full Attn / Target Attn alternation; CPU-GPU pipeline optimization; custom Triton kernels (PyTorch → Triton) |
| **MixFormer: Co-Scaling Up Dense and Sequence in Industrial Recommenders** | ByteDance | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.14110) | User-item decoupled architecture (no ad-side sequence); co-scales dense features and user sequences |
| **ULTRA-HSTU: Bending the Scaling Law Curve in Large-Scale Recommendation Systems** | Meta | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.16986) | Sparse Attention + FlashAttention-V3; bends the scaling curve beyond HSTU |
| **CADET: Context-Conditioned Ads CTR Prediction With a Decoder-Only Transformer** | LinkedIn | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.11410) | Decoder-only Transformer for ads CTR; self-gated attention, timestamp RoPE, Flash Attention |
| **SORT: A Systematically Optimized Ranking Transformer for Industrial-Scale Recommenders** | Alibaba | SIGIR | 2026 | [[Paper]](https://arxiv.org/abs/2603.03988) | Systematically optimizes Transformer for industrial ranking; addresses high feature heterogeneity challenges |
| **Beyond Dense Connectivity: Explicit Sparsity for Scalable Recommendation** | Alibaba | SIGIR | 2026 | [[Paper]](https://arxiv.org/abs/2604.08011) | Introduces explicit sparsity mechanisms as an alternative to dense connectivity for scalable recommendation |
| **TokenFormer: Unify the Multi-Field and Sequential Recommendation Worlds** | Tencent | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2604.13737) | Unifies multi-field and sequential recommendation; Bottom-Full-Top-Sliding attention; solves Sequential Collapse Propagation |
| **UniMixer: A Unified Architecture for Scaling Laws in Recommendation Systems** | Kuaishou | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2604.00590) | Unifies attention/TokenMixer/FM into single scaling framework; proposes UniMixing-Lite for improved scaling ROI |
| **RankUp: Towards High-Rank Representations for Large Scale Advertising Recommender Systems** | Tencent (Weixin) | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2604.17878) | Addresses representation collapse when scaling MetaFormer-based ranking models |
| **LoopCTR: Unlocking the Loop Scaling Power for Click-Through Rate Prediction** | Alibaba | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2604.19550) | "Loop scaling" paradigm via recursive reuse of shared layers; decouples training-time compute from parameter count; train-multi-loop, infer-zero-loop strategy |
| **Expand More, Shrink Less: Shaping Effective-Rank Dynamics for Dense Scaling in Recommendation** | Tencent | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2605.23191) | Identifies embedding collapse in RankMixer-style dense scaling; RankElastor with parameterized full mixing + GLU-improved P-FFNs for spectrum-robust scaling |
| **Selective Test-Time Compute Scaling for CTR Prediction via Uncertainty-Triggered Feature Path Exploration** | Alibaba | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2605.24989) | UTTSI: training-free per-instance test-time compute scaling for CTR; routes uncertain instances through stochastic feature-path explorations |
| **On the Practice of Scaling Search Conversion Rate Prediction** | Coupang | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2605.29232) | **Search CVR** scaling: empirical study across backbone compute / embedding size / training data (independent and additive); warmstart training + decoupled graph execution + dynamic batching for low-latency GPU serving |
| **Scaling Laws for Behavioral Foundation Models over User Event Sequences** | Unbox AI | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2606.05257) | Systematic scaling law study for behavioral foundation models across ~600 runs and 10^15-10^19 FLOPs; reveals compute-optimal embedder size (~2%), data-heavy training, and metric-dependent scaling dynamics |
| **ML-DCN: Masked Low-Rank Deep Crossing Network Towards Scalable Ads Click-through Rate Prediction at Pinterest** | Pinterest | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2602.09194) | Instance-conditioned mask + low-rank crossing layer for scalable ads CTR; online A/B tests at Pinterest with neutral serving cost |
| **Scaling Recommender Transformers to One Billion Parameters** | Yandex | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2507.15994) | Recipe for training transformer recommenders up to 1B parameters; establishes scaling recipe for recommendation transformers |
| **Principled Synthetic Data Enables the First Scaling Laws for LLMs in Recommendation** | Meta | ICML | 2026 | [[Paper]](https://arxiv.org/abs/2602.07298) | Layered synthetic data framework enabling robust power-law scaling for continually pre-trained recommendation LLMs; demonstrates first predictable scaling laws for LLM-based recommendation |
| **DeRes: Decoupling Residual Stability and Adaptivity for Scalable CTR Prediction** | Industry | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2606.07980) | Dual-path residual (Identity + Block Attention Residual) with Pointwise AttnRes (SiLU); fits steeper compute–AUC scaling law (γ=0.118 vs 0.071 for OneTrans, 1.66× gap); 2× compute saving at equivalent AUC |
| **LUM: Unlocking Scaling Law in Industrial Recommendation Systems with a Three-step Paradigm based Large User Model** | Alibaba | WSDM | 2026 | [[Paper]](https://arxiv.org/abs/2502.08309) | Three-step paradigm (pre-training → fine-tuning → distillation) based Large User Model; scales to 7B parameters; unlocks scaling law for industrial recommendation surpassing DLRMs and E2E-GR |
| **UniPinRec: Unifying Generative Retrieval and Ranking at Pinterest Scale** | Pinterest | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2606.00422) | Full-stack unification of retrieval and ranking at Pinterest; shared transformer with Masked Action Modeling + blended training + cross-stage KV cache sharing; +1% engagement, -11.1% latency, +63.6% QPS |
| **OneRank: Unified Transformer-Native Ranking Architecture for Multi-Task Recommendation** | Shopee / RUC | KDD | 2026 | [[Paper]](https://arxiv.org/abs/2606.16838) | Eliminates encoder-predictor separation in multi-task ranking; task-private channels with task-conditioned selection, gradient detachment, and dynamic matching-based scoring |
| **Token Factory: Efficiently Integrating Diverse Signals into Large Recommendation Models** | Google | arXiv | 2026 | [[Paper]](https://arxiv.org/abs/2606.19635) | Transforms heterogeneous signals into soft tokens for LRMs; prevents prompt length explosion while enabling efficient scaling of signal integration |

## Related Work

Additional papers relevant to the CTR scaling landscape, grouped by sub-topic.

### Long Sequence Modeling

- **CHIME**: Compressive framework for holistic interest modeling; LLM-based encoding + residual VQ — [[Paper]](https://arxiv.org/abs/2504.06780) (Kuaishou, 2025)
- **LONGER**: Scales ultra-long user behavior sequences beyond two-stage retrieval — [[Paper]](https://arxiv.org/abs/2505.04421) (ByteDance, RecSys 2025)
- **ENCODE**: Efficient clustering-based two-stage approach for long-term user interest modeling — [[Paper]](https://arxiv.org/abs/2508.13567) (Alibaba, TKDE 2025)
- **VQL**: Context-aware vector quantization attention for ultra-long behavior modeling — [[Paper]](https://arxiv.org/abs/2508.17125) (Kuaishou, 2025)
- **Make It Long, Keep It Fast**: End-to-end 10K-sequence modeling at billion scale on Douyin — [[Paper]](https://arxiv.org/abs/2511.06077) (ByteDance, WWW 2026)
- **MUSE**: Multimodal search-based framework for 100K-length lifelong user interest modeling — [[Paper]](https://arxiv.org/abs/2512.07216) (Alibaba, 2025)
- **PerSRec**: Compresses long histories into learnable tokens for HSTU/HLLM — [[Paper]](https://arxiv.org/abs/2601.03479) (Meta, 2026)
- **MALLOC**: Benchmark for memory-efficient long sequence compression — [[Paper]](https://arxiv.org/abs/2601.20234) (2026)
- **MoS (Mixture of Sequence)**: Theme-aware MoE for long-sequence recommendation; routes subsequences to filter session-hopping noise — [[Paper]](https://arxiv.org/abs/2604.20858) (Meta, WWW 2026)
- **Memento**: RAG-style long-retention data scaling for Meta Ads; MMR-based retrieval over user-history corpus — [[Paper]](https://arxiv.org/abs/2605.24051) (Meta, 2026)
- **SIREN**: Multi-modal lifelong user interest via unified multi-granularity semantic interaction; deployed in Tencent advertising (Weixin) — [[Paper]](https://arxiv.org/abs/2605.25726) (Tencent, 2026)
- **LENS**: Target-Conditioned Query Gate and Position Bias for restoring target-specific control in latent-query CTR backbones — [[Paper]](https://arxiv.org/abs/2605.25583) (2026)
- **Beyond Item IDs**: Semantic-native long sequence modeling for short-form-video recommendation; Global-Aware Compression Transformer with non-parametric temporal folding; deployed at billion-user scale — [[Paper]](https://arxiv.org/abs/2606.07546) (Google, SIGIR 2026)
- **SinkRec**: Mitigates semantic state sink in linear attention for long-sequence recommendation; hybrid memory-transition looped architecture with memory-conditioned Gated Delta Networks — [[Paper]](https://arxiv.org/abs/2606.09888) (2026)

### Sample/Instance Compression for Sequence Modeling

- **IAT**: Instance-As-Token compression compresses all features of each historical interaction into a unified instance embedding — [[Paper]](https://arxiv.org/abs/2604.08933) (2026)
- **SIF**: Encodes historical raw samples directly into sequence tokens via hierarchical group-adaptive quantization (HGAQ); unifies sample information scaling and model capacity scaling — [[Paper]](https://arxiv.org/abs/2604.15650) (Meituan, 2026)

### Generative Recommendation

- **SID-MLP**: MLP-centric distillation of attention-heavy generative recommender decoders; 8.74× inference speedup — [[Paper]](https://arxiv.org/abs/2605.12617) (UCSD / Snap, 2026)
- **Towards Generalizable and Efficient Large-Scale Generative Recommenders**: Addresses task headroom, repeated-training cost, serving latency, and item freshness for production GR — [[Paper]](https://arxiv.org/abs/2605.23312) (Netflix, 2026)
- **TubiFM**: Unified foundation model across item / carousel / search ranking for streaming discovery — [[Paper]](https://arxiv.org/abs/2605.23702) (Tubi, 2026)
- **DeGRe**: Dense-supervised generative reranking with offline-online decoupled design; deployed on Taobao Flash Shopping — [[Paper]](https://arxiv.org/abs/2605.25749) (Alibaba, KDD 2026)
- **VarLenRec**: Variable-length tokenization for generative recommendation via hyperbolic residual quantization; addresses Popularity-Length Paradox — [[Paper]](https://arxiv.org/abs/2605.17779) (2026)
- **Climber-Pilot**: Non-myopic generative recommendation model addressing myopia in industrial scenarios via instruction-following; deployed at NetEase Cloud Music — [[Paper]](https://arxiv.org/abs/2602.13581) (NetEase, 2026)
- **APAO**: Adaptive prefix-aware optimization framework for generative recommendation with learnable prefix-aware objectives — [[Paper]](https://arxiv.org/abs/2603.02730) (Tsinghua, KDD 2026)
- **Next-Scale Generative Reranking**: Tree-based generative rerank framework for multi-stage recommendation; deployed on Meituan food delivery — [[Paper]](https://arxiv.org/abs/2604.05314) (Meituan, 2026)
- **GenRec**: Preference-oriented generative framework for large-scale recommendation via next-token prediction with preference alignment — [[Paper]](https://arxiv.org/abs/2604.14878) (JD, 2026)
- **R3-VAE**: Reference vector-guided rating residual quantization VAE for generative recommendation; improves semantic identifier quality — [[Paper]](https://arxiv.org/abs/2604.11440) (2026)
- **OneReason**: Reasoning-enhanced generative recommendation; perception + cognition-enhanced CoT + specialize-then-unify RL training; extends OneRec family — [[Paper]](https://arxiv.org/abs/2606.06260) (Kuaishou, 2026)
- **Gryphon**: Encoder-decoder GR with joint item-level scoring; resolves SID collisions and miscalibrated beam-likelihood; replaces 15+ candidate generators in A/B on Yandex Music — [[Paper]](https://arxiv.org/abs/2606.08604) (Yandex, 2026)
- **AdaGRPO**: Per-sample gated GRPO + NLL for noise-robust RL in generative recommendation; binary clip based on policy difficulty and reward discriminability; A/B CTR+dwell gains — [[Paper]](https://arxiv.org/abs/2606.08480) (JD, 2026)
- **GBLA**: Gated Bidirectional Linear Attention encoder for generative retrieval; linear-time with 8.2× speedup at 32K history vs FlashAttention-v3; hybrid SA/GBLA matches full self-attention quality — [[Paper]](https://arxiv.org/abs/2606.07317) (Yandex, SIGIR 2026)
- **SSRLive**: Dynamic Semantic ID for live streaming GR; generative + discriminative unified architecture with dynamic SID updates and user–streamer interaction; A/B +3.38% watch time, +0.72% GMV — [[Paper]](https://arxiv.org/abs/2606.06970) (Alibaba, 2026)
- **HiGR**: Industrial-scale hierarchical generative slate recommendation; structured SIDs via PCRQ-VAE + Hierarchical Slate Decoder for holistic slate quality and latency — [[Paper]](https://arxiv.org/abs/2512.24787) (Tencent, CIKM 2026)
- **ChronoID**: Time-aware Semantic ID learning for generative recommendation; characterizes the design space of temporal signals along three orthogonal dimensions; new time-explicit generation recommendation benchmark — [[Paper]](https://arxiv.org/abs/2606.14260) (Meta MRS / U. Rochester / MBZUAI, 2026)
- **PauseRec**: Implicit reasoning paradigm for LLM-based generative recommendation; outperforms explicit CoT by 6.22% while reducing training cost by 65% GPU hours and speeding up inference by 71.3% — [[Paper]](https://arxiv.org/abs/2606.14142) (2026)
- **On the Memorization Behavior of LLMs in Generative Recommendation**: Investigates one-hop memorization in LLM-based GR and proposes IIRG training strategy to capture multi-hop collaborative and semantic relations — [[Paper]](https://arxiv.org/abs/2606.17276) (KAIST / Snap, 2026)
- **G2Rec**: Scalable graph-based user interest tokenization for generative recommendation; unifies holistic co-engagement modeling with semantic tokenization at industrial scale — [[Paper]](https://arxiv.org/abs/2606.20554) (Meta / UIUC, 2026)

### Generative Pre-training for CTR

- **GE4Rec**: Shifts from discriminative feature interaction to supervised feature generation paradigm — [[Paper]](https://arxiv.org/abs/2512.14041) (Tencent, 2025)
- **GPSD**: Generative pretraining for discriminative downstream tasks (CTR/CVR); bridges generative and discriminative paradigms — [[Paper]](https://arxiv.org/abs/2506.03699) (Alibaba, KDD 2025)
- **HeteGenCTR**: Per-field learnable difficulty parameters for generative CTR; self-balancing loss and difficulty-guided attention address generative difficulty imbalance — [[Paper]](https://arxiv.org/abs/2605.24986) (Alibaba, 2026)

### Knowledge Distillation & Compression

- **KDEF**: KD+DML framework enabling CTR models to follow scaling laws — [[Paper]](https://arxiv.org/abs/2411.16122) (2024)
- **LoopFM**: FM-to-VM knowledge transfer via cached FM intermediate embeddings; bypasses real-time FM serving; ~2× transfer ratio over scalar KD on trillion-param FMs — [[Paper]](https://arxiv.org/abs/2605.29280) (Meta, 2026)
- **Rec-Distill**: Industrial knowledge distillation pipeline transferring large-scale teacher ranking models into deployable student models — [[Paper]](https://arxiv.org/abs/2605.29755) (ByteDance, 2026)

### Engineering & Serving

- **LIME**: Linear attention (O(N)) for efficient scaling — [[Paper]](https://arxiv.org/abs/2510.18239) (2025)
- **Context Features Are Cheap**: Rank-Aware Decomposition for Efficient Feature Interaction in Recommender Systems — [[Paper]](https://arxiv.org/abs/2605.27450) (2026)
- **Quantized Inference for OneRec-V2**: Low-precision quantization for industrial recommender deployment; OneRec follow-up — [[Paper]](https://arxiv.org/abs/2603.11486) (Kuaishou, 2026)
- **SOLARIS**: Speculative offloading for serving large rec foundation models — [[Paper]](https://arxiv.org/abs/2604.12110) (Meta, 2026)
- **FreeScale**: Distributed training system; load-balanced samples + prioritized embedding updates + SM-free communication; up to 90.3% bubble reduction on 256 H100s — [[Paper]](https://arxiv.org/abs/2604.24073) (Meta, MLSys 2026)
- **Versioned Late Materialization**: Data infrastructure for ultra-long sequence training — [[Paper]](https://arxiv.org/abs/2604.24806) (Meta, 2026)
- **Intelligent Elastic Feature Fading**: Retrain-free feature efficiency rollouts at scale via elastic feature coverage control at serving time — [[Paper]](https://arxiv.org/abs/2605.00324) (2026)
- **TurboGR**: Accelerated training system for large-scale generative recommendation on Ascend NPUs; 54.71% MFU with near-linear scalability — [[Paper]](https://arxiv.org/abs/2605.13433) (2026)

### Retrieval & Reranking Scaling

- **Scaling Laws for Cross-Encoder Reranking**: First systematic study of scaling laws for cross-encoder rerankers across pointwise / pairwise / listwise objectives — [[Paper]](https://arxiv.org/abs/2603.04816) (Academic, 2026)
- **LRanker**: LLM ranker for massive candidate pools; addresses context length and computational cost constraints in real-world ranking — [[Paper]](https://arxiv.org/abs/2605.27810) (UIUC, 2026)
- **Efficient Retrieval Scaling with Hierarchical Indexing**: Hierarchical index learning over foundational retrieval model memory; deployed at Meta — [[Paper]](https://arxiv.org/abs/2604.12965) (Meta, 2026)
- **OneRetrieval**: One-model editable generative retrieval for industrial e-commerce search; Keyword-Aligned Encoding (KAE) ties identifier slots to interpretable attribute words; reserved codebook slots enable real-time term injection without retraining; matches strongest GR baseline on 5M real-traffic requests with order-of-magnitude higher intervention hit rate — [[Paper]](https://arxiv.org/abs/2606.13533) (Kuaishou, 2026)
- **RankGraph-2**: Lifecycle co-design for billion-node graph-based retrieval (U2U2I/U2I2I); co-learns residual-quantization cluster index reducing serving cost 83%; 3.8× recall over GAT+DGI; +0.96% CTR across 20+ retrieval launches at Meta — [[Paper]](https://arxiv.org/abs/2606.18379) (Meta, 2026)

### Architecture Innovations Beyond Recommendation

> Papers on model architecture design from non-recommendation domains (NLP, CV, etc.) that may inspire CTR/ranking model scaling — e.g., efficient attention, sparse/MoE scaling, novel token mixing, training stability at depth.

- **Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models**: Shares expert parameters across consecutive transformer layers while preserving independent routing; reduces memory footprint by ~2× at virtually no quality degradation — [[Paper]](https://arxiv.org/abs/2606.16825) (2026)
- **Taming Curvature: Architecture Warm-Up for Stable Transformer Training**: Fast online estimator of largest Hessian eigenvalue for per-iteration curvature tracking; enables stable billion-parameter Transformer training — [[Paper]](https://arxiv.org/abs/2606.16768) (2026)
- **Taylor-Calibrate: Principled Initialization for Hybrid Linear Attention Distillation**: Principled initialization for converting pretrained Transformers to Gated DeltaNet linear attention students; addresses brittleness in hybrid linear attention distillation — [[Paper]](https://arxiv.org/abs/2606.16429) (2026)
- **SPRI: SVD-Partitioned Residual Initialization for Data-Constrained MoE Upcycling**: SVD-partitioned residual initialization for converting dense models to sparse MoE under data constraints; outperforms existing upcycling methods — [[Paper]](https://arxiv.org/abs/2606.16456) (2026)
- **SoftMoE: Soft Differentiable Routing for Mixture-of-Experts in LLMs**: Truncated soft top-k LapSum relaxation enabling gradient-based optimization of expert routing; learns layer-wise expert capacity allocation under a global budget constraint — [[Paper]](https://arxiv.org/abs/2606.17952) (ICML 2026)

### Other

- **CETNet**: Collaborative ensemble with confidence-based fusion — [[Paper]](https://arxiv.org/abs/2411.13700) (Meta, 2024)
- **COFFEE**: Enriches embeddings following scaling law principles — [[Paper]](https://arxiv.org/abs/2601.02807) (Meta, 2026)
- **Understanding DNNs in Feature Interaction Models**: Dimensional collapse perspective on DNN roles in feature interaction models — [[Paper]](https://arxiv.org/abs/2604.26489) (2026)

---

## Company Overview

| Company | Papers |
|:--------|:-------|
| **Meta** | Understanding Scaling Laws, Wukong, HSTU, InterFormer, ULTRA-HSTU, Foundation-Expert, Kunlun, LLaTTE, DHEN, Principled Synthetic Data Scaling Laws, LoopFM, MoS, Memento, FreeScale, Efficient Retrieval Scaling, RankGraph-2, G2Rec |
| **ByteDance** | RankMixer, OneTrans, HyFormer, Zenith, TokenMixer-Large, MSN, UG-Sep, MixFormer, Rec-Distill, LONGER, Make It Long Keep It Fast |
| **Alibaba** | GPSD, FAT, HHFT, EST, HeteroMixer, SORT, Beyond Dense Connectivity, LoopCTR, UTTSI, HeteGenCTR, ENCODE, MUSE, SSRLive, LUM |
| **Meituan** | SUAN, MTFM, MTmixAtt, SparseCTR, Next-Scale Generative Reranking |
| **Tencent** | GE4Rec, TokenFormer, RankUp (Weixin), RankElastor, SIREN (Weixin), HiGR |
| **Google** | Hiformer, Beyond Item IDs, Token Factory |
| **LinkedIn** | LiRank, CADET |
| **NetEase** | Climber, Climber-Pilot |
| **Kuaishou** | UniMixer, INFNet, CHIME, VQL, OneRec-V2 Quantized, OneReason, OneRetrieval |
| **Shopee** | OnePiece, OneRank |
| **Coupang** | Search CVR Scaling |
| **Netflix** | Large-Scale Generative Recommenders |
| **Tubi** | TubiFM |
| **Pinterest** | ML-DCN, UniPinRec |
| **Yandex** | Scaling Recommender Transformers, Gryphon, GBLA |
| **JD** | GenRec, AdaGRPO |

## Contributing

We welcome contributions! If you know of relevant papers not listed here, please open an issue or submit a pull request.

## Star History

If you find this repository useful, please consider giving it a star!
