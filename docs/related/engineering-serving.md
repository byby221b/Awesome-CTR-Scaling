<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Engineering & Serving

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=engineering-serving)

Systems, serving infrastructure and hardware-aware optimization.

17 papers · Updated 2026-10-02

<a id="paper-2510-18239"></a>

- **LIME**: Linear attention (O(N)) for efficient scaling — [Paper](https://arxiv.org/abs/2510.18239) (2025)

<a id="paper-2605-27450"></a>

- **Context Features Are Cheap**: Rank-Aware Decomposition for Efficient Feature Interaction in Recommender Systems — [Paper](https://arxiv.org/abs/2605.27450) (2026)

<a id="paper-2603-11486"></a>

- **Quantized Inference for OneRec-V2**: Low-precision quantization for industrial recommender deployment; OneRec follow-up — [Paper](https://arxiv.org/abs/2603.11486) (Kuaishou · 2026)

<a id="paper-2604-12110"></a>

- **SOLARIS**: Speculative offloading for serving large rec foundation models — [Paper](https://arxiv.org/abs/2604.12110) (Meta · SIGIR 2026)

<a id="paper-2604-24073"></a>

- **FreeScale**: Distributed training system; load-balanced samples + prioritized embedding updates + SM-free communication; up to 90.3% bubble reduction on 256 H100s — [Paper](https://arxiv.org/abs/2604.24073) (Meta · MLSys 2026)

<a id="paper-2604-24806"></a>

- **Versioned Late Materialization**: Data infrastructure for ultra-long sequence training — [Paper](https://arxiv.org/abs/2604.24806) (Meta · RecSys (Industry) 2026)

<a id="paper-2605-00324"></a>

- **Intelligent Elastic Feature Fading**: Retrain-free feature efficiency rollouts at scale via elastic feature coverage control at serving time — [Paper](https://arxiv.org/abs/2605.00324) (2026)

<a id="paper-2605-13433"></a>

- **TurboGR**: Accelerated training system for large-scale generative recommendation on Ascend NPUs; 54.71% MFU with near-linear scalability — [Paper](https://arxiv.org/abs/2605.13433) (2026)

<a id="paper-2601-01712"></a>

- **RelayGR**: Cross-stage relay-race inference for long-sequence generative recommendation; decouples user-independent tokens from ranking-stage computation; implemented on Huawei Ascend NPUs — [Paper](https://arxiv.org/abs/2601.01712) (Huawei · 2026)

<a id="paper-2606-21101"></a>

- **DPIFrame**: Dual-level parallelism framework for CTR model inference on GPU; intra-module + inter-module parallelism with multi-table lookup and breadth-first stream scheduling; 23× embedding latency reduction vs PyTorch — [Paper](https://arxiv.org/abs/2606.21101) (2026)

<a id="paper-2607-10044"></a>

- **FlashTrie**: GPU-accelerated constrained beam search for generative retrieval; integer-aware succinct trie layout with cooperative CUDA kernel; 24× speedup over CPU on 800M keywords; +0.71% revenue in online A/B on commercial search engine — [Paper](https://arxiv.org/abs/2607.10044) (Microsoft · 2026)

<a id="paper-2602-22647"></a>

- **STATIC**: Vectorized constrained decoding for LLM-based generative retrieval on TPUs/GPUs; flattens prefix tree into CSR sparse matrix for fully vectorized operations; 948× speedup over CPU trie; first production-scale deployment of strictly constrained GR — [Paper](https://arxiv.org/abs/2602.22647) (Google / YouTube · KDD 2026)

<a id="paper-2607-27744"></a>

- **ROCS**: Request-Oriented Compute Sharing; defers request-candidate interactions to share substantial model computation once per request; Generalized Layer Masking + Deep Cross Attention + In-Kernel Broadcast Optimization; 3× QPS gain on retrieval, 50% QPS gain on ranking; deployed across ads and organic surfaces — [Paper](https://arxiv.org/abs/2607.27744) (Meta · 2026)

<a id="paper-2608-00938"></a>

- **GRACE**: Generative Recommender Acceleration Engine for real-time ads retrieval; Generative Target Matching extends constrained decoding with personalized eligibility filtering via bitmask/Bloom-filter over SID prefixes; solves eligibility and latency at wide-beam scale — [Paper](https://arxiv.org/abs/2608.00938) (Meta · 2026)

<a id="paper-2508-04711"></a>

- **Context Parallelism for HSTU**: Context parallelism (CP) sharding activation memory along the sequence-length dimension for HSTU; addresses the activation-heavy nature of scaling long user-history sequences in generative recommenders where standard CP breaks down under causal streaming attention — [Paper](https://arxiv.org/abs/2508.04711) (Meta · RecSys 2025)

<a id="paper-2605-04450"></a>

- **RACER**: Jointly manages GPU HBM allocation between embedding hot caches and KV caches at runtime for generative recommender serving; addresses workload-dependent optimal EMB-KV ratio shifts (up to 0.35) while avoiding critical-path H2D refill traffic that causes P99 SLO violations; recovers 20-30% serving latency — [Paper](https://arxiv.org/abs/2605.04450) (HKBU / Alibaba · 2026)

<a id="paper-2609-30656"></a>

- **Component Benchmark: Hierarchical Model Profiling for Large-scale Recommendation Systems**: Hierarchical PyTorch submodule profiling captures real runtime inputs and decomposes latency, memory, FLOPs and utilization via extensible plugins; production case studies connect local diagnostics to compiler/fusion opportunities, a 34% QPS improvement and a separate 10% QPS/22% memory recovery — [Paper](https://arxiv.org/abs/2609.30656) (Meta · arXiv 2026)
