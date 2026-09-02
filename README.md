# Awesome CTR Scaling [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated list of research papers on **Scaling Laws and Scaling Up Ranking/CTR Models** in industrial recommendation systems.

This repository focuses on a rapidly emerging research direction: how to effectively scale up Click-Through Rate (CTR) prediction and ranking models — drawing inspiration from the scaling laws observed in Large Language Models (LLMs) — to achieve continuous performance gains in industrial recommender systems.

> **Scope**: We cover papers that (1) study scaling laws for recommendation models, (2) propose scalable Transformer-based architectures for CTR/ranking, (3) address efficiency challenges in scaling up industrial ranking systems, or (4) explore novel paradigms (e.g., sparse scaling, generative pre-training, foundation models) for scalable recommendation.

---

## Table of Contents

- [Papers](#papers)
  - [Scaling Law & Theory](#scaling-law--theory)
  - [Scalable Architecture](#scalable-architecture)
  - [Unified Feature & Sequence Modeling](#unified-feature--sequence-modeling)
  - [Foundation Models & Multi-Scenario](#foundation-models--multi-scenario)
  - [Efficiency & Deployment](#efficiency--deployment)
- [Related Work](#related-work)
- [Company Overview](#company-overview)
- [Contributing](#contributing)

---

## Papers

<details>
<summary><b>📋 Tag Vocabulary (click to expand)</b></summary>

**Method:**
`Scaling Law` · `Architecture` · `Attention` · `Token Mixing` · `MoE` · `Sparse Activation` · `Residual/Depth` · `Embedding Design` · `Tokenization` · `Knowledge Distillation` · `Test-time Compute` · `Loop Scaling`

**Modeling Target:**
`Feature Interaction` · `Sequence Modeling` · `Long Sequence` · `Unified FI+Seq` · `Multi-task` · `Multi-scenario` · `Foundation Model` · `User Modeling` · `Generative Rec`

**Engineering & Application:**
`Serving` · `Training Efficiency` · `Distributed` · `Quantization` · `Ads` · `E-commerce` · `Video/Live` · `Representation Collapse`

Each paper is tagged with 2–4 labels from this controlled vocabulary. New papers must only use tags from this list.

</details>

### Scaling Law & Theory

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| **Understanding Scaling Laws for Recommendation Models** | Meta | arXiv | 2022 | `Scaling Law` | [[Paper]](https://arxiv.org/abs/2208.08489) | First systematic study of scaling laws for DLRM-style CTR models; shows power-law + constant behavior across model size, data size, and compute |
| **Wukong: Towards a Scaling Law for Large-Scale Recommendation** | Meta | ICML | 2024 | `Scaling Law` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2403.02545) | Proposes factorized stacked interaction layers enabling effective parameter scaling; demonstrates scaling law for recommendation |
| **SUAN: Exploring Scaling Laws of CTR Model for Online Performance Improvement** | Meituan | RecSys | 2025 | `Scaling Law` | [[Paper]](https://arxiv.org/abs/2508.15326) | Systematically explores how CTR model scaling translates to online performance; practical methodology for scaling decisions |
| **Climber: Toward Efficient Scaling Laws for Large Recommendation Models** | NetEase | CIKM | 2025 | `Scaling Law` `Sequence Modeling` | [[Paper]](https://arxiv.org/abs/2502.09888) | Multi-scale sequence extraction + dynamic temperature modulation; first publicly documented continuous online scaling |
| **FAT: From Scaling to Structured Expressivity: Rethinking Transformers for CTR Prediction** | Alibaba | KDD | 2026 | `Scaling Law` `Architecture` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2511.12081) | Field-Aware Transformer with decomposed content alignment; first formal scaling law for CTR based on Rademacher complexity |
| **Kunlun: Establishing Scaling Laws for Massive-Scale Recommendation Systems Through Unified Architecture Design** | Meta | KDD | 2026 | `Scaling Law` `Architecture` | [[Paper]](https://arxiv.org/abs/2602.10016) | Unified architecture design for predictable scaling laws; governs relationship between performance and computational investment |
| **SparseCTR: Unleashing the Potential of Sparse Attention on Long-Term Behaviors for CTR Prediction** | Meituan | WWW | 2026 | `Scaling Law` `Attention` `Long Sequence` | [[Paper]](https://arxiv.org/abs/2601.17836) | Three-branch sparse attention for long behaviors; demonstrates scaling law across 3 orders of magnitude in FLOPs |
| **LLaTTE: Scaling Laws for Multi-Stage Sequence Modeling in Large-Scale Ads Recommendation** | Meta | KDD | 2026 | `Scaling Law` `Sequence Modeling` `Ads` | [[Paper]](https://arxiv.org/abs/2601.20083) | Power-law scaling for ads rec; two-stage async architecture; largest user model at Meta |
| **ULTRA-HSTU: Bending the Scaling Law Curve in Large-Scale Recommendation Systems** | Meta | KDD | 2026 | `Scaling Law` `Attention` `Sparse Activation` | [[Paper]](https://arxiv.org/abs/2602.16986) | Sparse Attention + FlashAttention-V3; bends the scaling curve beyond HSTU |
| **On the Practice of Scaling Search Conversion Rate Prediction** | Coupang | arXiv | 2026 | `Scaling Law` `E-commerce` `Serving` | [[Paper]](https://arxiv.org/abs/2605.29232) | Search CVR scaling: empirical study across backbone compute / embedding size / training data; warmstart training + decoupled graph execution + dynamic batching |
| **Scaling Laws for Behavioral Foundation Models over User Event Sequences** | Unbox AI | arXiv | 2026 | `Scaling Law` `Foundation Model` | [[Paper]](https://arxiv.org/abs/2606.05257) | Systematic scaling law study for behavioral foundation models across ~600 runs and 10^15-10^19 FLOPs; reveals compute-optimal embedder size and metric-dependent scaling dynamics |
| **Scaling Recommender Transformers to One Billion Parameters** | Yandex | KDD | 2026 | `Scaling Law` `Architecture` | [[Paper]](https://arxiv.org/abs/2507.15994) | Recipe for training transformer recommenders up to 1B parameters; establishes scaling recipe for recommendation transformers |
| **Principled Synthetic Data Enables the First Scaling Laws for LLMs in Recommendation** | Meta | ICML | 2026 | `Scaling Law` `Foundation Model` | [[Paper]](https://arxiv.org/abs/2602.07298) | Layered synthetic data framework enabling robust power-law scaling for continually pre-trained recommendation LLMs |
| **DeRes: Decoupling Residual Stability and Adaptivity for Scalable CTR Prediction** | Industry | arXiv | 2026 | `Scaling Law` `Residual/Depth` | [[Paper]](https://arxiv.org/abs/2606.07980) | Dual-path residual with Pointwise AttnRes; fits steeper compute–AUC scaling law (γ=0.118 vs 0.071); 2× compute saving at equivalent AUC |
| **SPRINT: The Pitfall of Scaling Up: Uncovering and Mitigating Popularity Bias Amplification in Scaling Transformer-based Recommenders** | Academic | KDD | 2026 | `Scaling Law` `Representation Collapse` | [[Paper]](https://arxiv.org/abs/2606.21911) | Identifies spectral collapse causing popularity bias amplification; SPRINT regularization enables more favorable scaling from 0.05M to 0.34B params |
| **UniRank: Benchmarking Ranking Models for Unified Sequential Modeling and Feature Interaction** | Academic | arXiv | 2026 | `Scaling Law` `Unified FI+Seq` | [[Paper]](https://arxiv.org/abs/2607.19987) | Open benchmark for unified ranking models; 15 models on 5 large-scale datasets; enables reproducible scaling law study |

### Scalable Architecture

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| **DHEN: A Deep and Hierarchical Ensemble Network for Large-Scale Click-Through Rate Prediction** | Meta | arXiv | 2022 | `Architecture` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2203.11014) | Hierarchical ensemble of heterogeneous interaction modules; co-designed training system for efficiency |
| **Hiformer: Heterogeneous Feature Interactions Learning with Transformers for Recommender Systems** | Google | arXiv | 2023 | `Architecture` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2311.05884) | Learns heterogeneous feature interactions via Transformers; addresses sparse high-dimensional input challenges |
| **HSTU: Actions Speak Louder than Words: Trillion-Parameter Sequential Transducers for Generative Recommendations** | Meta | ICML | 2024 | `Architecture` `Sequence Modeling` `Generative Rec` | [[Paper]](https://arxiv.org/abs/2402.17152) | Hierarchical Sequential Transduction Unit; scales to trillion parameters; generative recommendation paradigm |
| **InterFormer: Effective Heterogeneous Interaction Learning for Click-Through Rate Prediction** | Meta | CIKM | 2025 | `Architecture` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2411.09852) | Heterogeneous feature interaction with user profile, context, and behavior signals for CTR |
| **RankMixer: Scaling Up Ranking Models in Industrial Recommenders** | ByteDance | CIKM | 2025 | `Architecture` `Token Mixing` | [[Paper]](https://arxiv.org/abs/2507.15551) | Efficient TokenMixer-based architecture for scaling ranking models; addresses training and serving cost |
| **HHFT: Hierarchical Heterogeneous Feature Transformer for Recommendation Systems** | Alibaba | arXiv | 2025 | `Architecture` `Feature Interaction` `Attention` | [[Paper]](https://arxiv.org/abs/2511.20235) | Hierarchical Transformer addressing DNN limitations with three key designs for heterogeneous features |
| **MTmixAtt: Integrating Mixture-of-Experts with Multi-Mix Attention for Large-Scale Recommendation** | Meituan | arXiv | 2025 | `Architecture` `MoE` `Attention` | [[Paper]](https://arxiv.org/abs/2510.15286) | MoE + multi-mix attention with AutoToken; scales to 1B params |
| **INFNet: Aggregate and Broadcast: Scalable and Efficient Feature Interaction for Recommender Systems** | Kuaishou | arXiv | 2025 | `Architecture` `Feature Interaction` `Training Efficiency` | [[Paper]](https://arxiv.org/abs/2508.11565) | Linear-complexity task-aware feature interaction via aggregate-and-broadcast hub tokens |
| **Zenith: Scaling Up Ranking Models for Billion-Scale Livestreaming Recommendation** | ByteDance | arXiv | 2026 | `Architecture` `Feature Interaction` `Video/Live` | [[Paper]](https://arxiv.org/abs/2601.21285) | Scales ranking models for livestream scenarios; demonstrates scaling benefits for feature interactions |
| **TokenMixer-Large: Scaling Up Large Ranking Models in Industrial Recommenders** | ByteDance | KDD | 2026 | `Architecture` `Token Mixing` `Serving` | [[Paper]](https://arxiv.org/abs/2602.06563) | Addresses hardware under-utilization in scaling; optimized TokenMixer architecture for industrial deployment |
| **MSN: A Memory-based Sparse Activation Scaling Framework for Large-scale Industrial Recommendation** | ByteDance | KDD | 2026 | `Architecture` `Sparse Activation` | [[Paper]](https://arxiv.org/abs/2602.07526) | Product-Key Memory with sub-linear retrieval; sparse activation via Top-k memory slots; deployed in Douyin Search Ranking |
| **HeteroMixer: Query-Mixed Interest Extraction and Heterogeneous Interaction** | Alibaba | arXiv | 2026 | `Architecture` `Feature Interaction` `Long Sequence` | [[Paper]](https://arxiv.org/abs/2602.09387) | Query-mixed interest extraction with heterogeneous interaction for sparse multi-field inputs and ultra-long sequences |
| **ML-DCN: Masked Low-Rank Deep Crossing Network Towards Scalable Ads CTR at Pinterest** | Pinterest | arXiv | 2026 | `Architecture` `Feature Interaction` `Ads` | [[Paper]](https://arxiv.org/abs/2602.09194) | Instance-conditioned mask + low-rank crossing layer for scalable ads CTR; neutral serving cost |
| **CADET: Context-Conditioned Ads CTR Prediction With a Decoder-Only Transformer** | LinkedIn | arXiv | 2026 | `Architecture` `Attention` `Ads` | [[Paper]](https://arxiv.org/abs/2602.11410) | Decoder-only Transformer for ads CTR; self-gated attention, timestamp RoPE, Flash Attention |
| **SORT: A Systematically Optimized Ranking Transformer for Industrial-Scale Recommenders** | Alibaba | SIGIR | 2026 | `Architecture` `Attention` | [[Paper]](https://arxiv.org/abs/2603.03988) | Systematically optimizes Transformer for industrial ranking; addresses high feature heterogeneity challenges |
| **Beyond Dense Connectivity: Explicit Sparsity for Scalable Recommendation** | Alibaba | SIGIR | 2026 | `Architecture` `Sparse Activation` | [[Paper]](https://arxiv.org/abs/2604.08011) | Introduces explicit sparsity mechanisms as an alternative to dense connectivity for scalable recommendation |
| **RankUp: Towards High-Rank Representations for Large Scale Advertising Recommender Systems** | Tencent (Weixin) | arXiv | 2026 | `Architecture` `Representation Collapse` `Ads` | [[Paper]](https://arxiv.org/abs/2604.17878) | Addresses representation collapse when scaling MetaFormer-based ranking models |
| **LoopCTR: Unlocking the Loop Scaling Power for Click-Through Rate Prediction** | Alibaba | arXiv | 2026 | `Architecture` `Loop Scaling` | [[Paper]](https://arxiv.org/abs/2604.19550) | "Loop scaling" paradigm via recursive reuse of shared layers; decouples training-time compute from parameter count |
| **Expand More, Shrink Less: Shaping Effective-Rank Dynamics for Dense Scaling in Recommendation** | Tencent | KDD | 2026 | `Architecture` `Token Mixing` `Representation Collapse` | [[Paper]](https://arxiv.org/abs/2605.23191) | Identifies embedding collapse in RankMixer-style dense scaling; RankElastor with spectrum-robust scaling |
| **SpecFormer: Mitigating Embedding and Attention Collapse via Spectral-Aware Transformer for Recommendation** | Industry | arXiv | 2026 | `Architecture` `Attention` `Representation Collapse` | [[Paper]](https://arxiv.org/abs/2607.24025) | Reveals embedding/attention collapse as depth-scaling bottleneck; Spectral Softening unlocks effective depth-scaling |
| **OCP: Orthogonal Constrained Projection for Sparse Scaling in Industrial Commodity Recommendation** | JD | SIGIR | 2026 | `Architecture` `Embedding Design` `Sparse Activation` | [[Paper]](https://arxiv.org/abs/2603.18697) | Orthogonal constrained projection for sparse embedding scaling; +12.97% UCXR, +8.9% GMV on JD.com |
| **GateDiffInt: Gate-Mediated Controllable Diffusion and Multi-Intent LLM Distillation for User Behavior Modeling** | Xiaohongshu | arXiv | 2026 | `Architecture` `Knowledge Distillation` `User Modeling` | [[Paper]](https://arxiv.org/abs/2608.18764) | Controllable forward diffusion + LLM distillation for behavior denoising; deployed at hundreds of millions DAU |
| **HubMixer: Progressive Latent Hub Mixing for Parameter-Efficient Feature Interaction in Recommendation** | Kuaishou | arXiv | 2026 | `Architecture` `Feature Interaction` `Token Mixing` | [[Paper]](https://arxiv.org/abs/2608.27991) | Learnable latent hubs organize heterogeneous tokens via induction–interaction–readout; parameter-efficient feature interaction; +5.48% resume submission conversion in Kuaishou recruitment A/B |
| **PRIME: Mitigating Subgroup Optimization Competition in Shared CTR Top Networks with Plug-in Residual Input-Conditioned Mixture of Expert** | Alibaba / Henan Polytechnic University | arXiv | 2026 | `MoE` `Residual/Depth` `Feature Interaction` | [[Paper]](https://arxiv.org/abs/2608.30449) | Dense-anchored low-rank residual MoE with zero-residual init; input-conditioned routing for example-specific logit corrections; mitigates subgroup optimization competition in shared CTR top networks across 13 architectures |

### Unified Feature & Sequence Modeling

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| **OneTrans: Unified Feature Interaction and Sequence Modeling with One Transformer in Industrial Recommender** | ByteDance | WWW | 2026 | `Unified FI+Seq` `Attention` `Tokenization` | [[Paper]](https://arxiv.org/abs/2510.26104) | Unified tokenizer + causal attention + KV caching; co-optimizes sequence and feature interaction |
| **HyFormer: Revisiting the Roles of Sequence Modeling and Feature Interaction in CTR Prediction** | ByteDance | SIGIR | 2026 | `Unified FI+Seq` `Attention` | [[Paper]](https://arxiv.org/abs/2601.12681) | Revisits the roles of sequence modeling vs. feature interaction under efficiency constraints |
| **EST: Towards Efficient Scaling Laws in Click-Through Rate Prediction via Unified Modeling** | Alibaba | KDD | 2026 | `Unified FI+Seq` `Scaling Law` | [[Paper]](https://arxiv.org/abs/2602.10811) | Efficient unified modeling for scalable CTR; addresses early aggregation limitations |
| **MixFormer: Co-Scaling Up Dense and Sequence in Industrial Recommenders** | ByteDance | KDD | 2026 | `Unified FI+Seq` `Sequence Modeling` | [[Paper]](https://arxiv.org/abs/2602.14110) | User-item decoupled architecture; co-scales dense features and user sequences |
| **TokenFormer: Unify the Multi-Field and Sequential Recommendation Worlds** | Tencent | arXiv | 2026 | `Unified FI+Seq` `Attention` | [[Paper]](https://arxiv.org/abs/2604.13737) | Bottom-Full-Top-Sliding attention; solves Sequential Collapse Propagation |
| **UniMixer: A Unified Architecture for Scaling Laws in Recommendation Systems** | Kuaishou | arXiv | 2026 | `Unified FI+Seq` `Scaling Law` `Token Mixing` | [[Paper]](https://arxiv.org/abs/2604.00590) | Unifies attention/TokenMixer/FM into single scaling framework; proposes UniMixing-Lite |
| **UniFormer: Efficient and Unified Model-Centric Scaling for Industrial Recommendation** | Kuaishou | arXiv | 2026 | `Unified FI+Seq` `Tokenization` | [[Paper]](https://arxiv.org/abs/2606.27058) | Decomposes feature-space and task-space interactions; semantic tokenization for user-item decoupling |
| **WHALE: A Scalable Unified Model for Recommendation with Wukong-HSTU Architecture** | Meta | arXiv | 2026 | `Unified FI+Seq` `Architecture` | [[Paper]](https://arxiv.org/abs/2607.17017) | Unifies Wukong (feature interaction) and HSTU (long sequence) into a single architecture |
| **CCFormer: Efficient Cross-Field Interaction and Hierarchical Sequence Compression for Industrial Recommendation** | Tencent | arXiv | 2026 | `Unified FI+Seq` `Attention` `Long Sequence` | [[Paper]](https://arxiv.org/abs/2607.28070) | Hierarchical sequence compression with cross-field interaction; 2.21× training speedup over HSTU |
| **UniDot: A Unified Network for Sequence Modeling and Feature Interaction in Large-scale Recommendation** | Industry | arXiv | 2026 | `Unified FI+Seq` `Token Mixing` | [[Paper]](https://arxiv.org/abs/2608.16797) | Token-mixing bus + sequence-retrieval bus + FM Highway in a single macro-block; KDD Cup 2026 runner-up |
| **TMallGS: Scaling Unified Feature and Sequence Modeling for Generative E-commerce Search** | Alibaba (Tmall) | KDD | 2026 | `Unified FI+Seq` `Tokenization` `E-commerce` | [[Paper]](https://arxiv.org/abs/2607.13398) | Hierarchical Distribution-Calibrated Tokenization + Field-Adaptive Gated Transformer for Tmall search |
| **MaskRec: Topology-Masked Unified Backbone for Joint Feature Interaction and Multi-Domain Sequence Modeling** | Shandong University | arXiv | 2026 | `Unified FI+Seq` `Attention` `Multi-scenario` | [[Paper]](https://arxiv.org/abs/2608.27005) | Unified token interaction space with a structured TopoMask attention mask + learnable global/domain memory tokens; jointly models heterogeneous feature interaction and multi-domain behavior sequences within a single backbone for CVR prediction |

### Foundation Models & Multi-Scenario

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| **LiRank: Industrial Large Scale Ranking Models at LinkedIn** | LinkedIn | KDD | 2024 | `Foundation Model` `Multi-task` `Quantization` | [[Paper]](https://arxiv.org/abs/2402.06859) | Residual DCN + Transformer + Dense Gating; quantization and compression for serving |
| **Realizing Scaling Laws in Recommender Systems: A Foundation-Expert Paradigm for Hyperscale Model Deployment** | Meta | arXiv | 2025 | `Foundation Model` `MoE` `Serving` | [[Paper]](https://arxiv.org/abs/2508.02929) | Foundation model + surface-specific experts; HyperCast infrastructure; first Foundation-Expert deployment at scale |
| **OnePiece: Bringing Context Engineering and Reasoning to Industrial Cascade Ranking System** | Shopee | KDD | 2026 | `Foundation Model` `Architecture` | [[Paper]](https://arxiv.org/abs/2509.18091) | LLM-style context engineering + block-wise latent reasoning in cascade ranking |
| **LUM: Unlocking Scaling Law in Industrial Recommendation Systems with a Three-step Paradigm based Large User Model** | Alibaba | WSDM | 2026 | `Foundation Model` `Scaling Law` `Knowledge Distillation` | [[Paper]](https://arxiv.org/abs/2502.08309) | Three-step paradigm (pre-training → fine-tuning → distillation) based Large User Model; scales to 7B parameters |
| **MTFM: A Scalable and Alignment-Free Foundation Model for Industrial Recommendation in Meituan** | Meituan | KDD | 2026 | `Foundation Model` `Training Efficiency` | [[Paper]](https://arxiv.org/abs/2602.11235) | Full Attn / Target Attn alternation; CPU-GPU pipeline optimization; custom Triton kernels |
| **UniPinRec: Unifying Generative Retrieval and Ranking at Pinterest Scale** | Pinterest | arXiv | 2026 | `Foundation Model` `Generative Rec` `Serving` | [[Paper]](https://arxiv.org/abs/2606.00422) | Full-stack unification of retrieval and ranking; cross-stage KV cache sharing; +1% engagement, +63.6% QPS |
| **OneRank: Unified Transformer-Native Ranking Architecture for Multi-Task Recommendation** | Shopee / RUC | KDD | 2026 | `Multi-task` `Architecture` | [[Paper]](https://arxiv.org/abs/2606.16838) | Eliminates encoder-predictor separation in multi-task ranking; task-private channels with dynamic scoring |
| **Token Factory: Efficiently Integrating Diverse Signals into Large Recommendation Models** | Google | arXiv | 2026 | `Foundation Model` `Tokenization` | [[Paper]](https://arxiv.org/abs/2606.19635) | Transforms heterogeneous signals into soft tokens; prevents prompt length explosion |
| **OneModel: A Unified Foundation for Platform-Scale Multi-Scenario Ranking** | Xiaohongshu | arXiv | 2026 | `Multi-scenario` `Sequence Modeling` `Foundation Model` | [[Paper]](https://arxiv.org/abs/2608.18606) | Unified multi-stream ranking with Scenario-aware Information Modulation; deployed at Xiaohongshu |
| **AMBER: An Event is Worth One Token — Event Tokenization for Industrial-scale LLM Recommendation** | Meta | arXiv | 2026 | `Tokenization` `Foundation Model` | [[Paper]](https://arxiv.org/abs/2608.25546) | Compresses each event's full temporal snapshot into a compact Event Token; identifies snapshot resolution as a new scaling dimension; advances the compute-quality Pareto frontier for LLM-based recommendation |

### Efficiency & Deployment

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| **UG-Sep: Compute Only Once: UG-Separation for Efficient Large Recommendation Models** | ByteDance | arXiv | 2026 | `Serving` `Training Efficiency` | [[Paper]](https://arxiv.org/abs/2602.10455) | User-general feature separation to reduce redundant computation; enables affordable scaling |
| **TransX: Scaling Transformer-based Recommendation via Behavioral and Serving Stream Crossings** | LinkedIn | arXiv | 2026 | `Serving` `Attention` `Long Sequence` | [[Paper]](https://arxiv.org/abs/2607.28940) | Encoder-decoder decoupling behavior/serving streams; 80% compute reduction with +6.0% CTR |
| **SlimPer: Make Personalization Model Slim and Smart** | Meta | arXiv | 2026 | `Serving` `Long Sequence` `User Modeling` | [[Paper]](https://arxiv.org/abs/2607.12281) | O(N) iterative knowledge-base refinement; depth decoupled from history length; deployed on Instagram |
| **Selective Test-Time Compute Scaling for CTR Prediction via Uncertainty-Triggered Feature Path Exploration** | Alibaba | arXiv | 2026 | `Test-time Compute` `Sparse Activation` | [[Paper]](https://arxiv.org/abs/2605.24989) | Training-free per-instance test-time compute scaling; routes uncertain instances through stochastic paths |
| **Exploring Test-time Scaling via Prediction Merging on Large-Scale Recommendation** | Academic | SIGIR | 2026 | `Test-time Compute` | [[Paper]](https://arxiv.org/abs/2512.07650) | First study of test-time compute scaling for recommendation via prediction merging |

## Related Work

Additional papers relevant to the CTR scaling landscape, grouped by sub-topic.

### Long Sequence Modeling

- **CHIME**: Compressive framework for holistic interest modeling; LLM-based encoding + residual VQ — [[Paper]](https://arxiv.org/abs/2504.06780) (Kuaishou, 2025)
- **LONGER**: Scales ultra-long user behavior sequences beyond two-stage retrieval — [[Paper]](https://arxiv.org/abs/2505.04421) (ByteDance, RecSys 2025)
- **ENCODE**: Efficient clustering-based two-stage approach for long-term user interest modeling — [[Paper]](https://arxiv.org/abs/2508.13567) (Alibaba, TKDE 2025)
- **VQL**: Context-aware vector quantization attention for ultra-long behavior modeling — [[Paper]](https://arxiv.org/abs/2508.17125) (Kuaishou, 2025)
- **Make It Long, Keep It Fast**: End-to-end 10K-sequence modeling at billion scale on Douyin — [[Paper]](https://arxiv.org/abs/2511.06077) (ByteDance, WWW 2026)
- **MUSE**: Multimodal search-based framework for 100K-length lifelong user interest modeling — [[Paper]](https://arxiv.org/abs/2512.07216) (Alibaba, 2025)
- **PerSRec**: Compresses long histories into learnable tokens for HSTU/HLLM — [[Paper]](https://arxiv.org/abs/2601.03479) (Meta, ICDM 2025)
- **MALLOC**: Benchmark for memory-efficient long sequence compression — [[Paper]](https://arxiv.org/abs/2601.20234) (2026)
- **MoS (Mixture of Sequence)**: Theme-aware MoE for long-sequence recommendation; routes subsequences to filter session-hopping noise — [[Paper]](https://arxiv.org/abs/2604.20858) (Meta, WWW 2026)
- **Memento**: RAG-style long-retention data scaling for Meta Ads; MMR-based retrieval over user-history corpus — [[Paper]](https://arxiv.org/abs/2605.24051) (Meta, 2026)
- **SIREN**: Multi-modal lifelong user interest via unified multi-granularity semantic interaction; deployed in Tencent advertising (Weixin) — [[Paper]](https://arxiv.org/abs/2605.25726) (Tencent, 2026)
- **LENS**: Target-Conditioned Query Gate and Position Bias for restoring target-specific control in latent-query CTR backbones — [[Paper]](https://arxiv.org/abs/2605.25583) (2026)
- **Beyond Item IDs**: Semantic-native long sequence modeling for short-form-video recommendation; Global-Aware Compression Transformer with non-parametric temporal folding; deployed at billion-user scale — [[Paper]](https://arxiv.org/abs/2606.07546) (Google, SIGIR 2026)
- **SinkRec**: Mitigates semantic state sink in linear attention for long-sequence recommendation; hybrid memory-transition looped architecture with memory-conditioned Gated Delta Networks — [[Paper]](https://arxiv.org/abs/2606.09888) (2026)
- **CMSL**: Constructive Multi-Sequence Learning; disentangles user history into thematic strands via learnable Sequence Construction Module with linear attention; deployed across ranking and retrieval on four major surfaces at Meta — [[Paper]](https://arxiv.org/abs/2606.28533) (Meta, 2026)
- **POEM**: Partial-Order Enhanced Real-Time Sequential Modeling; constructs dynamic partial-order sequences from multi-task ranking scores for fine-grained real-time interest modeling; deployed on Kuaishou — [[Paper]](https://arxiv.org/abs/2606.29946) (Kuaishou, 2026)
- **Long-History User Transformers**: Decoupled offline/online architecture for full cross-surface user history in real-time ad ranking; offline transformer pre-trains on interaction logs with dual objective, cached representation + lightweight runtime model; +2.77% ranking metric, +2.26% revenue at Yandex — [[Paper]](https://arxiv.org/abs/2607.14331) (Yandex, 2026)
- **FuXi-Linear**: Linear-complexity model for long-term time-aware sequential recommendation; decouples temporal and semantic signals to avoid mutual interference while capturing behavioral periodicity; designed for deep architectures and long sequences — [[Paper]](https://arxiv.org/abs/2602.23671) (KDD 2026)
- **SITA**: Semantic Interest Tokens for Target-Aware Compression; bridges target-aware retrieval and target-agnostic compression via learnable interest tokens that absorb target-relevant signals during training; achieves target-specific adaptation without target-dependent inference computation — [[Paper]](https://arxiv.org/abs/2608.03692) (Huawei, 2026)
- **TM20K**: Full transformer + token merge for 20K e-commerce sequence; two-stage KD with full-token teacher boosting merged-token student; deployed in ByteDance advertising with +1.036% ADSS at only +5.6% serving latency — [[Paper]](https://arxiv.org/abs/2608.07055) (ByteDance, 2026)

### Sample/Instance Compression for Sequence Modeling

- **IAT**: Instance-As-Token compression compresses all features of each historical interaction into a unified instance embedding — [[Paper]](https://arxiv.org/abs/2604.08933) (2026)
- **SIF**: Encodes historical raw samples directly into sequence tokens via hierarchical group-adaptive quantization (HGAQ); unifies sample information scaling and model capacity scaling — [[Paper]](https://arxiv.org/abs/2604.15650) (Meituan, RecSys 2026)

### Generative Recommendation

- **SID-MLP**: MLP-centric distillation of attention-heavy generative recommender decoders; 8.74× inference speedup — [[Paper]](https://arxiv.org/abs/2605.12617) (UCSD / Snap, 2026)
- **Towards Generalizable and Efficient Large-Scale Generative Recommenders**: Addresses task headroom, repeated-training cost, serving latency, and item freshness for production GR — [[Paper]](https://arxiv.org/abs/2605.23312) (Netflix, 2026)
- **TubiFM**: Unified foundation model across item / carousel / search ranking for streaming discovery — [[Paper]](https://arxiv.org/abs/2605.23702) (Tubi, 2026)
- **DeGRe**: Dense-supervised generative reranking with offline-online decoupled design; deployed on Taobao Flash Shopping — [[Paper]](https://arxiv.org/abs/2605.25749) (Alibaba, KDD 2026)
- **VarLenRec**: Variable-length tokenization for generative recommendation via hyperbolic residual quantization; addresses Popularity-Length Paradox — [[Paper]](https://arxiv.org/abs/2605.17779) (2026)
- **Climber-Pilot**: Non-myopic generative recommendation model addressing myopia in industrial scenarios via instruction-following; deployed at NetEase Cloud Music — [[Paper]](https://arxiv.org/abs/2602.13581) (NetEase, KDD 2026)
- **APAO**: Adaptive prefix-aware optimization framework for generative recommendation with learnable prefix-aware objectives — [[Paper]](https://arxiv.org/abs/2603.02730) (Tsinghua, KDD 2026)
- **Next-Scale Generative Reranking**: Tree-based generative rerank framework for multi-stage recommendation; deployed on Meituan food delivery — [[Paper]](https://arxiv.org/abs/2604.05314) (Meituan, 2026)
- **STAMP**: Semantic Trimming and Auxiliary Multi-step Prediction for generative recommendation; Semantic Adaptive Pruning filters redundant SID tokens during the forward pass + Multi-step Auxiliary Prediction densifies supervision; 1.23–1.38× speedup and 17.2–54.7% VRAM reduction across multiple architectures — [[Paper]](https://arxiv.org/abs/2604.05329) (Zhejiang / Alibaba, 2026)
- **GenRec**: Preference-oriented generative framework for large-scale recommendation via next-token prediction with preference alignment — [[Paper]](https://arxiv.org/abs/2604.14878) (JD, SIGIR 2026)
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
- **TokenMinds**: Industrial-scale dual-output (discrete SID-based user tokens + dense user embeddings) via encoder-decoder LLM; extends PLUM from item to user modeling; deployed across multiple YouTube surfaces serving billions of users — [[Paper]](https://arxiv.org/abs/2606.25147) (Google / YouTube, 2026)
- **RaG (Recommendation as Generation)**: Unifies generative recommendation and on-demand personalized video generation via shared semantic IDs (content + style); Video Generation Agents conditioned on inferred SIDs with cross-domain reward learning — [[Paper]](https://arxiv.org/abs/2606.25496) (Kuaishou, 2026)
- **GR2 Technical Report**: End-to-end generative reasoning re-ranker; semantic ID mid-training + reasoning-trace distillation + RL with conditional verifiable rewards + On-Policy Distillation; +18.7% R@1 on industrial-scale traffic — [[Paper]](https://arxiv.org/abs/2606.31984) (Meta, 2026)
- **GenPage**: End-to-end generative homepage construction replacing multi-stage rec stack; autoregressive generation of structured multi-row pages; +0.24% engagement with 20% latency reduction in A/B — [[Paper]](https://arxiv.org/abs/2606.31031) (Netflix, 2026)
- **Diffusion-GR2**: Block-diffusion conversion of AR reasoning re-ranker (GR2); CFT + on-policy distillation + RL closes structural and distributional gaps; 2.4–3.5× decode throughput with near-parity accuracy — [[Paper]](https://arxiv.org/abs/2607.01170) (Meta, 2026)
- **ShopX**: Foundation model for agentic shopping; unifies intent understanding, execution planning, and SID-native item-space operations into a single model; deployed on Taobao — [[Paper]](https://arxiv.org/abs/2606.31693) (Alibaba, 2026)
- **HGenPush**: Heterogeneous generative recommendation for push notifications; dual-branch video + author generation with Chained-MTP multi-token prediction; +0.181% DAU on Kuaishou — [[Paper]](https://arxiv.org/abs/2607.03362) (Kuaishou, KDD 2026)
- **UniSGR**: Unified framework for Semantic ID generation and ranking; sparse MoE decoder with Value-Aware Parallel Multi-Token Prediction and STARK inference optimization; deployed on large-scale e-commerce — [[Paper]](https://arxiv.org/abs/2607.04068) (Alibaba, 2026)
- **PROMISE**: Process Reward Models for test-time scaling in generative recommendation; addresses Semantic Drift in hierarchical Semantic ID generation via step-level reward guidance — [[Paper]](https://arxiv.org/abs/2601.04674) (Kuaishou, 2026)
- **Long-Term Optimization for Large-Scale GR**: Off-policy REINFORCE for session-level generative retrieval training; multi-step importance weight approximation and feedback-model-based test-time scaling on Yambda-5B — [[Paper]](https://arxiv.org/abs/2607.02818) (VK, 2026)
- **DaV-Gen**: End-to-end generative retrieval via Draft-and-Verify; speculative-decoding-inspired framework that combines contrastive-learned vector drafting with fused generative verification scoring in a single unified model — [[Paper]](https://arxiv.org/abs/2607.08365) (2026)
- **Not Only NTP**: Extends NTP training signal coverage for generative recommendation; addresses temporal locality and spatial locality limitations of single-step next-token prediction in multi-domain sequences — [[Paper]](https://arxiv.org/abs/2607.12277) (Meituan, 2026)
- **Where Reasoning Matters**: Rethinks latent reasoning in Semantic ID-based generative recommendation; investigates adaptive allocation of reasoning computation across token positions in SID generation — [[Paper]](https://arxiv.org/abs/2607.12425) (2026)
- **CRID (Beyond Semantic IDs)**: Cluster-Ranked Identifier decoupling DocID into semantic clustering and business-value ranking for collision-free GR; deployed on 300M-item Taobao corpus with +1.06% GMV — [[Paper]](https://arxiv.org/abs/2607.11392) (Alibaba, 2026)
- **Prompt Generation Technical Report**: Configuration-driven framework decoupling feature-processing logic from GR model architecture via declarative JSON; accelerates training iteration, deployment, and inference; deployed on Taobao Search with +0.47% transactions, +0.51% GMV — [[Paper]](https://arxiv.org/abs/2607.11326) (Alibaba, 2026)
- **RecGPT-V3**: Stateful hybrid-modal recommender with Memory Hub for condensed user memory (55.8% compute reduction), Hybrid-modal Foundation Model jointly reasoning over text and Semantic IDs, and Latent Intent Reasoning internalizing CoT into learnable latent tokens (200× output token reduction); deployed on Taobao "Guess What You Like" with +1.28% IPV, +3.97% GMV — [[Paper]](https://arxiv.org/abs/2607.15591) (Alibaba, 2026)
- **TSGR**: Taobao Search Generative Retrieval; value-aware GR with Query-aware Parallel SID (QP-SID) encoding business value into SID construction and Value-aware Ranking Module (VRM) unifying retriever and pre-ranker; +0.43% IPV, +1.12% transactions, +1.64% GMV — [[Paper]](https://arxiv.org/abs/2607.18796) (Alibaba, 2026)
- **BARGE**: Bridges structural gaps in SID-based GR via Item Context-Aware Attention + Hierarchical Path Reranking + Dual-Path Decoding; +0.60% CTR, +1.34% click UV, +1.70% reading time in A/B on Tencent platform — [[Paper]](https://arxiv.org/abs/2607.21028) (Tencent, 2026)
- **DLMRec**: Discrete diffusion language model for recommendation; replaces autoregressive generation with diffusion-based denoising; collaborative-aware stochastic tokenizer + curriculum-driven training + stability-aware voting — [[Paper]](https://arxiv.org/abs/2607.21519) (Tencent, 2026)
- **GLASS**: Coarse-to-fine long-term interest integration for generative recommendation; SID-Tier maps long-term interactions into unified interest vectors; semantic hard search extracts relevant behaviors via generated SID keys — [[Paper]](https://arxiv.org/abs/2602.05663) (Kuaishou, 2026)
- **Multi-Decoder OneRec**: Controllable multi-objective generative retrieval; shared user-context module with isolated LoRA experts per objective + Multi-Decoder Constrained Beam Search; releases Kwai26 benchmark (1.31B records); +0.37% app usage time in A/B — [[Paper]](https://arxiv.org/abs/2607.26500) (Kuaishou, 2026)
- **WhisperRec**: Latent reasoning for efficient foundation recommendation models; compresses teacher CoT into learnable latent reasoning tokens (Latent-Reason-then-Answer); Multi-View Adaptive CoT + three-stage Latent Reasoning Alignment; 10× inference throughput over explicit CoT — [[Paper]](https://arxiv.org/abs/2607.26621) (Kuaishou, 2026)
- **UniVA**: Unified Value Alignment for generative advertising recommendation; Commercial SID Tokenization + Generation-as-Ranking decoder fusing generation scores with token-level value estimates + Value-Aware Constrained Serving; +1.5% GMV on Tencent WeChat Channels — [[Paper]](https://arxiv.org/abs/2605.05803) (Tencent, 2026)
- **Gwhere**: End-to-end industrial generative next-POI recommendation; contrastive residual-quantization SID tokenizer aligning textual/visual/spatial/collaborative signals + Exposure-Aware Kahneman-Tversky Optimization; +5.83% P-CTR deployed on Amap — [[Paper]](https://arxiv.org/abs/2607.26073) (Alibaba, 2026)
- **Gryphon-v2**: Unified generate-and-rank architecture replacing multi-stage cascade; Rollout Distillation from Teacher Ranker over decoder rollouts and logged impressions; single model replaces 15+ candidate generators at Yandex Music with +1.41% active users — [[Paper]](https://arxiv.org/abs/2608.06213) (Yandex, 2026)
- **UniGD**: Unified Generative-Discriminative framework for industrial search advertising retrieval; Conflict-Aware Gradient Enhancement + Codebook-Anchored Representation Module + Heterogeneous Ad-material Modeling; +5.78% revenue, -33% latency on Kuaishou — [[Paper]](https://arxiv.org/abs/2608.03150) (Kuaishou, 2026)
- **LoopMemGR**: Closed-loop recommendation experience memory for generative recommendation; maintains recommendation–feedback trajectory logs with recency/frequency/global views compressed into fixed experience tokens — [[Paper]](https://arxiv.org/abs/2607.27647) (Alibaba, 2026)
- **UniR²**: Unified decoder-only Transformer for generative recall and multi-objective ranking in a single sequence; Dual-Query Prefix-Causal Attention + ranking-side LoRA; deployed on Kuaishou — [[Paper]](https://arxiv.org/abs/2607.24439) (Kuaishou, 2026)
- **LGRID**: Interpretable disentangled SID generation via LLM-driven Encode→Disentangle→Align→Quantize pipeline; separates geographic, brand, and category into attribute-aligned slots to eliminate semantic entanglement and SID collisions; deployed for local-life service recommendation — [[Paper]](https://arxiv.org/abs/2607.27944) (Meituan, 2026)
- **Feedback-Grounded Policy Discovery**: Bridges Understanding-Action Gap in LLM-enhanced GR; discovers recommendation policies via outcome-derived feedback rather than linguistic plausibility; separates intent knowledge from policy knowledge for effective recommendation direction — [[Paper]](https://arxiv.org/abs/2607.27789) (2026)
- **Restoring Collaborative Signals in SID-based GR**: Addresses content–collaborative signal tension in Semantic IDs via personalized natural language; restores collaborative signals without explicit reasoning overhead when text and SID tokens live in misaligned embedding spaces — [[Paper]](https://arxiv.org/abs/2607.27682) (2026)
- **HCGRec**: Hint-Conditioned Generative Recommendation with Semantic IDs; addresses structured optimization bottleneck in reward-based post-training via hierarchical hint conditioning when early tokens enter wrong SID branches — [[Paper]](https://arxiv.org/abs/2608.11980) (CIKM 2026)
- **IntHQ**: Task-Interactive Hierarchical Query for multi-task generative recommendation; Dual-Stream Decoupling + Task-Interactive Modeling + Hierarchical Querying addressing source/relational/hierarchical collapse; deployed on Amap with +1.60% UVCTR — [[Paper]](https://arxiv.org/abs/2608.09634) (Alibaba, 2026)
- **SnapLGR**: Production LLM-based generative retrieval for short-video recommendation at Snapchat; PPR-enhanced SID construction with co-engagement contrastive learning + continued pretraining for vocabulary grounding + TensorRT-LLM beam search; +0.37% View Time over TIGER-style baseline in A/B — [[Paper]](https://arxiv.org/abs/2607.28895) (Snap, 2026)
- **EvoReason**: Self-evolving latent reasoning for generative recommendation; extracts reusable reasoning primitives from agentic trajectories as pseudo-tools; primitive-guided on-policy distillation with closed-loop co-evolution for better-aligned CoT supervision — [[Paper]](https://arxiv.org/abs/2607.29010) (2026)
- **SmartGR**: Hierarchy and Beam-Aware Knowledge Distillation for GR; Hierarchy-Aware SID Distillation transfers teacher modeling capability across SID levels + Beam-Aware Ranking Distillation prevents incorrect prefix pruning during beam search — [[Paper]](https://arxiv.org/abs/2608.02048) (2026)
- **HRPO**: Hierarchical Residual Policy Optimization; decomposes item-level reward into position-specific token credits via Hierarchical Residual Decomposition and optimizes per-position policy with Hierarchical PPO; resolves reward-sparsity and credit-assignment in SID decoding — [[Paper]](https://arxiv.org/abs/2608.00750) (2026)
- **SPARC**: Sequence-aware Progressive Attribute Routing and Compression Framework for generative recommendation; context-dependent routing and compression of heterogeneous behavior attributes (category/brand/price/timestamp) to curb input-length explosion while preserving context-relevant signals — [[Paper]](https://arxiv.org/abs/2607.25339) (Alibaba, 2026)
- **Exp-RSFT**: Exponential reward-weighted fine-tuning for GR under sparse and noisy feedback; optimizes directly on logged rewards with temperature-regularized exponential weighting; avoids reward over-optimization without requiring a separate reward model — [[Paper]](https://arxiv.org/abs/2608.00816) (Pinterest, 2026)
- **OGR (Once Generated, Ranked)**: End-to-end generative slate recommendation; TUSID adaptively fuses item-specific semantic and local collaborative signals into hierarchical Semantic IDs; list-wise preference planning + pipelined position-wise SID decoding directly generate ordered slates, unifying generation and ranking — [[Paper]](https://arxiv.org/abs/2608.17613) (Kuaishou, 2026)
- **rEDMRec**: Distills teacher LLM reasoning into four typed, editable experience channels (long-term / short-term / item-perception / counterfactual hard-negative) maintained by an LLM memory controller with Add/Delete/Modify/Keep ops refined via K-agent debate; lightweight student ranks purely by retrieving from memory, decoupling inference cost from reasoning depth — [[Paper]](https://arxiv.org/abs/2608.18952) (2026)
- **Understanding SID-based GR from a Model-scaling View**: Reveals SID-based generative recommendation saturates quickly when scaling each component (modality encoder, quantization tokenizer, recommender); identifies per-component scaling bottlenecks distinguishing SID-GR from established LLM scaling laws — [[Paper]](https://arxiv.org/abs/2509.25522) (Academic, 2025)
- **Beyond Uniform Token Training**: Token-weighted multi-target objectives aligning GR training with Semantic-ID structure; Front-Greater Weighting emphasizes prefix tokens that reduce candidate semantic ambiguity, plus frequency weighting against long-tail popularity bias, integrated via curriculum learning — [[Paper]](https://arxiv.org/abs/2601.17787) (Academic, 2026)
- **Single-Level Large Semantic Codebook**: Replaces multi-level residual quantization with one semantic token plus a separate collaborative disambiguation token to reduce item collisions; exposure-aware dynamic codebook update (temporal decay + EMA centers + exposure-weighted SID-change penalty) realigns with live traffic; shorter SID cuts autoregressive-decoding FLOPs ~48% and lifts single-card QPS 28–47%; +0.792% primary consumption metric in online A/B — [[Paper]](https://arxiv.org/abs/2608.21012) (Kuaishou, 2026)

### Generative Pre-training for CTR

- **GE4Rec**: Shifts from discriminative feature interaction to supervised feature generation paradigm — [[Paper]](https://arxiv.org/abs/2512.14041) (Tencent, 2025)
- **GPSD**: Generative pretraining for discriminative downstream tasks (CTR/CVR); bridges generative and discriminative paradigms — [[Paper]](https://arxiv.org/abs/2506.03699) (Alibaba, KDD 2025)
- **HeteGenCTR**: Per-field learnable difficulty parameters for generative CTR; self-balancing loss and difficulty-guided attention address generative difficulty imbalance — [[Paper]](https://arxiv.org/abs/2605.24986) (Alibaba, 2026)
- **KGD**: Knowledge-Geometry Decoupling for refreshable pretrained transfer in streaming recommendation; Behavioral Multi-Token Prediction for cleaner supervision + read-only cross-attention with Anchored Calibration Residual decoupling knowledge refresh from task adaptation; +1.75% GMV deployed on Shopee — [[Paper]](https://arxiv.org/abs/2608.02738) (Shopee, 2026)

### Knowledge Distillation & Compression

- **KDEF**: KD+DML framework enabling CTR models to follow scaling laws — [[Paper]](https://arxiv.org/abs/2411.16122) (2024)
- **LoopFM**: FM-to-VM knowledge transfer via cached FM intermediate embeddings; bypasses real-time FM serving; ~2× transfer ratio over scalar KD on trillion-param FMs — [[Paper]](https://arxiv.org/abs/2605.29280) (Meta, 2026)
- **Rec-Distill**: Industrial knowledge distillation pipeline transferring large-scale teacher ranking models into deployable student models — [[Paper]](https://arxiv.org/abs/2605.29755) (ByteDance, 2026)
- **UniMoMo**: Post-training MoE expert merging for large recommendation models; graph-coarsening formulation grouping experts by functional similarity with layer-adaptive protection for high-traffic experts — [[Paper]](https://arxiv.org/abs/2608.08627) (2026)

### Engineering & Serving

- **LIME**: Linear attention (O(N)) for efficient scaling — [[Paper]](https://arxiv.org/abs/2510.18239) (2025)
- **Context Features Are Cheap**: Rank-Aware Decomposition for Efficient Feature Interaction in Recommender Systems — [[Paper]](https://arxiv.org/abs/2605.27450) (2026)
- **Quantized Inference for OneRec-V2**: Low-precision quantization for industrial recommender deployment; OneRec follow-up — [[Paper]](https://arxiv.org/abs/2603.11486) (Kuaishou, 2026)
- **SOLARIS**: Speculative offloading for serving large rec foundation models — [[Paper]](https://arxiv.org/abs/2604.12110) (Meta, SIGIR 2026)
- **FreeScale**: Distributed training system; load-balanced samples + prioritized embedding updates + SM-free communication; up to 90.3% bubble reduction on 256 H100s — [[Paper]](https://arxiv.org/abs/2604.24073) (Meta, MLSys 2026)
- **Versioned Late Materialization**: Data infrastructure for ultra-long sequence training — [[Paper]](https://arxiv.org/abs/2604.24806) (Meta, 2026)
- **Intelligent Elastic Feature Fading**: Retrain-free feature efficiency rollouts at scale via elastic feature coverage control at serving time — [[Paper]](https://arxiv.org/abs/2605.00324) (2026)
- **TurboGR**: Accelerated training system for large-scale generative recommendation on Ascend NPUs; 54.71% MFU with near-linear scalability — [[Paper]](https://arxiv.org/abs/2605.13433) (2026)
- **RelayGR**: Cross-stage relay-race inference for long-sequence generative recommendation; decouples user-independent tokens from ranking-stage computation; implemented on Huawei Ascend NPUs — [[Paper]](https://arxiv.org/abs/2601.01712) (Huawei, 2026)
- **DPIFrame**: Dual-level parallelism framework for CTR model inference on GPU; intra-module + inter-module parallelism with multi-table lookup and breadth-first stream scheduling; 23× embedding latency reduction vs PyTorch — [[Paper]](https://arxiv.org/abs/2606.21101) (2026)
- **FlashTrie**: GPU-accelerated constrained beam search for generative retrieval; integer-aware succinct trie layout with cooperative CUDA kernel; 24× speedup over CPU on 800M keywords; +0.71% revenue in online A/B on commercial search engine — [[Paper]](https://arxiv.org/abs/2607.10044) (Microsoft, 2026)
- **STATIC**: Vectorized constrained decoding for LLM-based generative retrieval on TPUs/GPUs; flattens prefix tree into CSR sparse matrix for fully vectorized operations; 948× speedup over CPU trie; first production-scale deployment of strictly constrained GR — [[Paper]](https://arxiv.org/abs/2602.22647) (Google / YouTube, KDD 2026)
- **ROCS**: Request-Oriented Compute Sharing; defers request-candidate interactions to share substantial model computation once per request; Generalized Layer Masking + Deep Cross Attention + In-Kernel Broadcast Optimization; 3× QPS gain on retrieval, 50% QPS gain on ranking; deployed across ads and organic surfaces — [[Paper]](https://arxiv.org/abs/2607.27744) (Meta, 2026)
- **GRACE**: Generative Recommender Acceleration Engine for real-time ads retrieval; Generative Target Matching extends constrained decoding with personalized eligibility filtering via bitmask/Bloom-filter over SID prefixes; solves eligibility and latency at wide-beam scale — [[Paper]](https://arxiv.org/abs/2608.00938) (Meta, 2026)
- **Context Parallelism for HSTU**: Context parallelism (CP) sharding activation memory along the sequence-length dimension for HSTU; addresses the activation-heavy nature of scaling long user-history sequences in generative recommenders where standard CP breaks down under causal streaming attention — [[Paper]](https://arxiv.org/abs/2508.04711) (Meta, RecSys 2025)
- **RACER**: Jointly manages GPU HBM allocation between embedding hot caches and KV caches at runtime for generative recommender serving; addresses workload-dependent optimal EMB-KV ratio shifts (up to 0.35) while avoiding critical-path H2D refill traffic that causes P99 SLO violations; recovers 20-30% serving latency — [[Paper]](https://arxiv.org/abs/2605.04450) (HKBU / Alibaba, 2026)

### Retrieval & Reranking Scaling

- **Scaling Laws for Cross-Encoder Reranking**: First systematic study of scaling laws for cross-encoder rerankers across pointwise / pairwise / listwise objectives — [[Paper]](https://arxiv.org/abs/2603.04816) (Academic, 2026)
- **LRanker**: LLM ranker for massive candidate pools; addresses context length and computational cost constraints in real-world ranking — [[Paper]](https://arxiv.org/abs/2605.27810) (UIUC, 2026)
- **Efficient Retrieval Scaling with Hierarchical Indexing**: Hierarchical index learning over foundational retrieval model memory; deployed at Meta — [[Paper]](https://arxiv.org/abs/2604.12965) (Meta, 2026)
- **OneRetrieval**: One-model editable generative retrieval for industrial e-commerce search; Keyword-Aligned Encoding (KAE) ties identifier slots to interpretable attribute words; reserved codebook slots enable real-time term injection without retraining; matches strongest GR baseline on 5M real-traffic requests with order-of-magnitude higher intervention hit rate — [[Paper]](https://arxiv.org/abs/2606.13533) (Kuaishou, 2026)
- **RankGraph-2**: Lifecycle co-design for billion-node graph-based retrieval (U2U2I/U2I2I); co-learns residual-quantization cluster index reducing serving cost 83%; 3.8× recall over GAT+DGI; +0.96% CTR across 20+ retrieval launches at Meta — [[Paper]](https://arxiv.org/abs/2606.18379) (Meta, 2026)
- **MESH**: Unified retrieval scaling framework addressing Scaling Bias of Heterogeneity; modularized architecture with gated bias correction achieves 14× improvement in scaling exponent for fresh items; deployed on Pinterest Related Pins — [[Paper]](https://arxiv.org/abs/2607.12392) (Pinterest, 2026)
- **Scaling and Stabilizing Large-Scale EBR**: Unified pipeline for scaling embedding-based retrieval at Walmart; Hybrid Hard Negative Mining + Legacy-Aware Distillation for smooth backbone evolution from DistilBERT to GTE-base; +7.34% NDCG@5, +0.50% revenue — [[Paper]](https://arxiv.org/abs/2607.10096) (Walmart, 2026)
- **OneShot**: End-to-end in-model index learning framework that natively aligns index building with ranking objectives; resolves structural misalignment between ranking accuracy and indexing efficiency for billion-scale retrieval — [[Paper]](https://arxiv.org/abs/2607.27475) (2026)
- **TransRetrieval**: Scaling up Transformer-based retrieval for industrial recommendation; weighted average aggregation restores the homogeneous-token assumption Transformers rely on, target token compression cuts per-candidate FLOPs by 85%, and position-style domain embeddings turn cross-domain data into a scaling asset; confirms robust log-linear scaling (+19.3/+22.2 pt Recall@2000) and lifts platform revenue +2.53% in online A/B — [[Paper]](https://arxiv.org/abs/2608.25528) (Alibaba, CIKM 2026)

### Architecture Innovations Beyond Recommendation

> Papers on model architecture design from non-recommendation domains (NLP, CV, etc.) that may inspire CTR/ranking model scaling — e.g., efficient attention, sparse/MoE scaling, novel token mixing, training stability at depth.

- **Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models**: Shares expert parameters across consecutive transformer layers while preserving independent routing; reduces memory footprint by ~2× at virtually no quality degradation — [[Paper]](https://arxiv.org/abs/2606.16825) (2026)
- **Taming Curvature: Architecture Warm-Up for Stable Transformer Training**: Fast online estimator of largest Hessian eigenvalue for per-iteration curvature tracking; enables stable billion-parameter Transformer training — [[Paper]](https://arxiv.org/abs/2606.16768) (2026)
- **Taylor-Calibrate: Principled Initialization for Hybrid Linear Attention Distillation**: Principled initialization for converting pretrained Transformers to Gated DeltaNet linear attention students; addresses brittleness in hybrid linear attention distillation — [[Paper]](https://arxiv.org/abs/2606.16429) (2026)
- **SPRI: SVD-Partitioned Residual Initialization for Data-Constrained MoE Upcycling**: SVD-partitioned residual initialization for converting dense models to sparse MoE under data constraints; outperforms existing upcycling methods — [[Paper]](https://arxiv.org/abs/2606.16456) (2026)
- **SoftMoE: Soft Differentiable Routing for Mixture-of-Experts in LLMs**: Truncated soft top-k LapSum relaxation enabling gradient-based optimization of expert routing; learns layer-wise expert capacity allocation under a global budget constraint — [[Paper]](https://arxiv.org/abs/2606.17952) (ICML 2026)
- **Tapered Language Models**: Non-uniform parameter allocation across depth via cosine-scheduled MLP width tapering; shows earlier layers benefit from more capacity; works across Transformer, Gated Attention, and Titans architectures — [[Paper]](https://arxiv.org/abs/2606.23670) (Mila, 2026)
- **Emergent Capabilities Arise Randomly from Learning Sparse Attention Patterns**: Mechanistic study showing emergence corresponds to abrupt learning of task-relevant sparse attention patterns; scaling heads improves learning efficiency while head dimension yields diminishing returns past a minimum; insights for sparse-attention-based ranking architectures — [[Paper]](https://arxiv.org/abs/2606.25010) (2026)
- **Neural Scaling Universality**: Position paper arguing scaling-law exponents are fixed by generic mechanisms (Softmax nonlinearity, representational superposition, layer ensembling) and coefficients (sensitive to data/architecture) are the lever for practical gains — [[Paper]](https://arxiv.org/abs/2606.25008) (2026)
- **Smooth Scaling Laws Hide Stepwise Token Learning**: Token-level decomposition reveals scaling laws are governed by the distribution of localized token learning times; reshaping training distribution according to token learnability yields 11% faster loss reduction — [[Paper]](https://arxiv.org/abs/2606.29858) (2026)
- **MoUE (Mixture of Universal Experts)**: Introduces Virtual Width as a new MoE scaling dimension; reuses a universal layer-agnostic expert pool across layers, converting depth into virtual width under fixed per-token activation budget — [[Paper]](https://arxiv.org/abs/2603.04971) (Baidu, 2026)
- **Generalization and Scaling Laws for MoE Transformers**: Theory of MoE generalization; sup-norm covering-number bound separating active per-input capacity from routing combinatorics; yields generalization bound under distributional assumptions — [[Paper]](https://arxiv.org/abs/2604.09175) (Academic, 2026)
- **Holistic MoE Scaling**: Reusable framework for optimal MoE architecture optimization via holistic scaling laws; addresses combinatorially vast MoE design space by jointly considering all architectural variables — [[Paper]](https://arxiv.org/abs/2603.21862) (Academic, 2026)
- **HiLS**: Hierarchical Landmark Sparse Attention; learns chunk selection end-to-end under LM loss; factorizes attention hierarchically for chunk-specific extraction and fusion; extrapolates 64× training context with 90% retrieval accuracy — [[Paper]](https://arxiv.org/abs/2607.02980) (2026)
- **HOLA (Hippocampal Linear Attention)**: Adds bounded exact KV cache as hippocampal complement to recurrent linear attention state; semiparametric dual-memory architecture achieving 16.1% perplexity reduction while maintaining O(1) memory for inference — [[Paper]](https://arxiv.org/abs/2607.02303) (Academic, 2026)
- **SDM (Sparse Delta Memory)**: Scales linear RNN hidden state by orders of magnitude via sparse addressing; extends Gated DeltaNet with sparse reads/writes to a large explicit memory; isoFLOP-optimal state capacity significantly improves in-context learning and long-context recall — [[Paper]](https://arxiv.org/abs/2607.07386) (Meta, 2026)
- **Hidden Decoding at Scale**: Sequence-length scaling via Hidden Decoding during continued pretraining; expands each token into n streams with Stream-Factorized Attention (quadratic→linear in n); first demonstrated at 100B+ MoE scale (WeLM-HD4-80B/617B); a fixed-backbone scaling path orthogonal to parameter scaling — [[Paper]](https://arxiv.org/abs/2607.08186) (WeChat AI, 2026)
- **MLPs are Hebbians**: First Transformer-compatible closed-form MLP construction achieving information-theoretically optimal fact storage scaling; 10–104× fewer parameters than prior constructions at matched fact count; enables modular fact editing by swapping MLP layers — [[Paper]](https://arxiv.org/abs/2607.10034) (Stanford, 2026)
- **The Key to Going Linear**: Analysis-driven post-hoc Transformer linearization; reveals softmax relies on key-dependent rank-1 orthogonal projections explaining delta-style linear attention's superiority; introduces sink tokens, short convolutions, and fixed-budget cache routing to close the quality gap; scales to 32B on LLaMA and Qwen — [[Paper]](https://arxiv.org/abs/2607.07706) (Qualcomm AI Research, 2026)
- **DeepLoop**: Depth scaling for looped Transformers; formalizes tied-depth effect via visit-alignment coefficient; proper residual scaling rules (α, β exponents) for stable recurrent parameter reuse; complements loop scaling paradigm — [[Paper]](https://arxiv.org/abs/2607.13491) (2026)
- **xHC (Expanded Hyper-Connections)**: First HC-family method to expand residual stream beyond N=4; sparse update of k=4 streams while retaining dense access to N=16; 1.50× compute reduction vs vanilla at same loss on 18B/28B MoE; xHC-Flash reduces memory traffic for practical training — [[Paper]](https://arxiv.org/abs/2607.14530) (2026)
- **Transforming Rank**: Analyzes how each Transformer feedforward block component determines rank survival across depth; reinterprets skip connections and normalization as rank-preserving mechanisms; shows skip scale controls rank-collapse vs ensemble behavior trade-off — [[Paper]](https://arxiv.org/abs/2607.14018) (2026)
- **Loopie (Loop the Loopies!)**: Looped MoE Transformers resolving the longstanding challenge that parameter scaling outperforms loop scaling; 20B/6B MoE models with 2B/0.6B active params substantially outperform vanilla Transformer baselines at same compute budget; complements loop scaling paradigm for CTR — [[Paper]](https://arxiv.org/abs/2607.16051) (2026)
- **MHAR (Multi-Head Attention Residuals)**: Per-subspace depth routing with zero added parameters; reshapes routing query into H independent heads over depth history removing forced-compromise bottleneck of single-query attention residuals; improves validation loss at 100M/350M/1B scales — [[Paper]](https://arxiv.org/abs/2607.27230) (Academic, 2026)
- **MoSE (Mixture of Slimmable Experts)**: Each MoE expert has a nested slimmable structure executable at variable widths; enables continuous accuracy-compute trade-off spectrum at inference without retraining; lightweight test-time training maps router confidence to expert widths under fixed budget — [[Paper]](https://arxiv.org/abs/2602.06154) (MBZUAI / Amazon, 2026)
- **Soft MoE (From Sparse to Soft Mixtures of Experts)**: Fully-differentiable sparse Transformer replacing discrete token routing with implicit soft assignment; passes different weighted combinations of all input tokens to each expert; addresses training instability, token dropping, and expert scaling limitations of sparse MoE — [[Paper]](https://arxiv.org/abs/2308.00951) (Google, ICLR 2024)
- **A Survey on Inference Optimization Techniques for Mixture of Experts Models**: Comprehensive survey of MoE inference optimization across the full system stack; taxonomizes model-level (expert design, compression, dynamic routing, expert merging), system-level (distributed computing, load balancing, scheduling), and hardware-level optimizations — [[Paper]](https://arxiv.org/abs/2412.14219) (CUHK / SJTU, ACM Computing Surveys 2025)

### Other

- **CETNet**: Collaborative ensemble with confidence-based fusion — [[Paper]](https://arxiv.org/abs/2411.13700) (Meta, 2024)
- **COFFEE**: Enriches embeddings following scaling law principles — [[Paper]](https://arxiv.org/abs/2601.02807) (Meta, 2026)
- **Understanding DNNs in Feature Interaction Models**: Dimensional collapse perspective on DNN roles in feature interaction models — [[Paper]](https://arxiv.org/abs/2604.26489) (2026)
- **Mitigating Early Training Collapse in CTR Models**: Analyzes sharp validation performance decline after first epoch in CTR training; shows controlling feature sparsity (removing sparse features + aggregating infrequent values) is far more effective than learning rate tuning for stabilizing multi-epoch training — [[Paper]](https://arxiv.org/abs/2607.09696) (Huawei, 2026)
- **Bumblebee**: Interleaved mixed-layer building blocks for large-scale recommendation; each stackable block combines sequence personalization, attention-based encoding, and feature crossing; cross-modal residual connections; flexible quality-throughput trade-offs via component dropping — [[Paper]](https://arxiv.org/abs/2607.24804) (Industry, 2026)
- **HA-MoE**: Heterogeneity-Adaptive MoE for industrial-scale heterogeneous ranking at Google Discover; explicit heterogeneity context in gating and expert representations; LENS observability framework; Dual-Level AUC evaluation — [[Paper]](https://arxiv.org/abs/2607.27577) (Google, RecSys 2026)
- **MISO**: Model-Internal-State-Guided Optimization for ranking models; uses parameters, activations, gradients as first-class signals to prioritize scaling and optimization decisions; adaptive workflow tracking model behavior evolution — [[Paper]](https://arxiv.org/abs/2608.07035) (Industry, 2026)

---

## Company Overview

| Company | Papers |
|:--------|:-------|
| **Meta** | Understanding Scaling Laws, Wukong, HSTU, InterFormer, ULTRA-HSTU, Foundation-Expert, Kunlun, LLaTTE, DHEN, Principled Synthetic Data Scaling Laws, LoopFM, MoS, Memento, FreeScale, Efficient Retrieval Scaling, RankGraph-2, G2Rec, GR2 Technical Report, Diffusion-GR2, CMSL, SlimPer, WHALE, ROCS, GRACE, Context Parallelism for HSTU, AMBER |
| **ByteDance** | RankMixer, OneTrans, HyFormer, Zenith, TokenMixer-Large, MSN, UG-Sep, MixFormer, Rec-Distill, LONGER, Make It Long Keep It Fast, TM20K |
| **Alibaba** | GPSD, FAT, HHFT, EST, HeteroMixer, SORT, Beyond Dense Connectivity, LoopCTR, UTTSI, HeteGenCTR, ENCODE, MUSE, SSRLive, LUM, ShopX, UniSGR, TMallGS, CRID, Prompt Generation, RecGPT-V3, TSGR, Gwhere, LoopMemGR, IntHQ, RACER, TransRetrieval, STAMP, PRIME, SPARC |
| **Meituan** | SUAN, MTFM, MTmixAtt, SparseCTR, Next-Scale Generative Reranking, Not Only NTP, LGRID |
| **Tencent** | GE4Rec, TokenFormer, RankUp (Weixin), RankElastor, SIREN (Weixin), HiGR, BARGE, DLMRec, UniVA (Weixin), CCFormer |
| **Google** | Hiformer, Beyond Item IDs, Token Factory, TokenMinds, STATIC, HA-MoE |
| **LinkedIn** | LiRank, CADET, TransX |
| **NetEase** | Climber, Climber-Pilot |
| **Kuaishou** | UniMixer, INFNet, CHIME, VQL, OneRec-V2 Quantized, OneReason, OneRetrieval, RaG, UniFormer, POEM, HGenPush, PROMISE, GLASS, Multi-Decoder OneRec, WhisperRec, UniR², UniGD, OGR, Single-Level Large Semantic Codebook, HubMixer |
| **Huawei** | RelayGR, Mitigating Early Training Collapse, SITA |
| **Baidu** | MoUE |
| **Shopee** | OnePiece, OneRank, KGD |
| **Coupang** | Search CVR Scaling |
| **Netflix** | Large-Scale Generative Recommenders, GenPage |
| **Tubi** | TubiFM |
| **Pinterest** | ML-DCN, UniPinRec, MESH, Exp-RSFT |
| **Yandex** | Scaling Recommender Transformers, Gryphon, Gryphon-v2, GBLA, Long-History User Transformers |
| **JD** | GenRec, AdaGRPO, OCP |
| **VK** | Long-Term Optimization for Large-Scale GR |
| **Microsoft** | FlashTrie |
| **Walmart** | Scaling and Stabilizing Large-Scale EBR |
| **Snap** | SnapLGR |
| **Xiaohongshu** | OneModel, GateDiffInt |

## Contributing

We welcome contributions! If you know of relevant papers not listed here, please open an issue or submit a pull request.

## Star History

If you find this repository useful, please consider giving it a star!
