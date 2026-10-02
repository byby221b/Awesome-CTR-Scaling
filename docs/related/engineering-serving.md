<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Engineering & Serving

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=engineering-serving)

Systems, serving infrastructure and hardware-aware optimization.

17 papers · Updated 2026-10-02

<a id="paper-2510-18239"></a>

- **LIME**: LIME targets the cost of scoring many candidates against long user histories. Low-rank link embeddings separate user-side and candidate-side interactions so attention can be precomputed, while LIME-XOR makes history processing linear in sequence length; together they make larger candidate sets and longer histories more practical without giving up most of a Transformer’s recommendation quality. — [Paper](https://arxiv.org/abs/2510.18239) (2025)

<a id="paper-2605-27450"></a>

- **Context Features Are Cheap**: This work removes repeated user-and-context computation when a ranker scores many candidates for the same request. Exact block decompositions reuse context-only terms in common interaction operators without changing predictions, while a separate rDCN architecture preserves this separation across layers; the distinction matters because exact reuse in ordinary cross networks and self-attention is limited to their first layer. — [Paper](https://arxiv.org/abs/2605.27450) (2026)

<a id="paper-2603-11486"></a>

- **Quantized Inference for OneRec-V2**: The paper investigates why low-precision inference is more workable for OneRec-V2 than for traditional recommenders. Its more controlled weight and activation distributions, together with a compute-intensive workload, motivate an FP8 post-training quantization pipeline co-optimized with serving infrastructure; deployment evaluations report better latency and throughput without degradation in the measured core online metrics. — [Paper](https://arxiv.org/abs/2603.11486) (Kuaishou · 2026)

<a id="paper-2604-12110"></a>

- **SOLARIS**: SOLARIS makes expensive recommendation foundation-model representations usable within real-time serving budgets. It predicts user–item pairs likely to occur in future requests and asynchronously computes their interaction embeddings ahead of time, moving heavy inference away from the critical path; production results show that this speculative preparation can improve advertising outcomes at large scale. — [Paper](https://arxiv.org/abs/2604.12110) (Meta · SIGIR 2026)

<a id="paper-2604-24073"></a>

- **FreeScale**: FreeScale addresses wasted GPU time in distributed sequence-recommendation training, where uneven examples create stragglers and embedding communication stalls computation. It balances input workloads, prioritizes and overlaps embedding communication, and uses communication techniques that avoid competing for GPU streaming multiprocessors, reducing idle bubbles in large production-scale training jobs. — [Paper](https://arxiv.org/abs/2604.24073) (Meta · MLSys 2026)

<a id="paper-2604-24806"></a>

- **Versioned Late Materialization**: This system avoids storing a full user-history sequence in every training example, a redundancy that becomes costly for ultra-long histories and shared datasets. It stores histories once and reconstructs each example through versioned pointers at training time, combining leakage-prevention protocols with prefetching and locality optimizations to preserve consistency without turning data loading into the bottleneck. — [Paper](https://arxiv.org/abs/2604.24806) (Meta · RecSys (Industry) 2026)

<a id="paper-2605-00324"></a>

- **Intelligent Elastic Feature Fading**: Intelligent Elastic Feature Fading reduces the operational cost of retiring expensive ranking features. Instead of waiting for a dedicated retraining rollout, it gradually changes serving-time feature coverage while routine training adapts the model, with monitoring, rollback and safety controls; production evaluations find this gradual transition less disruptive than removing features abruptly. — [Paper](https://arxiv.org/abs/2605.00324) (2026)

<a id="paper-2605-13433"></a>

- **TurboGR**: TurboGR adapts generative-recommendation training to Ascend NPUs, whose dense-compute design struggles with irregular sequence and sparse operations. It combines jagged-operator acceleration and load balancing with communication overlap and cheaper negative sampling, improving device utilization and scaling efficiency while expanding the useful negative-sample space without extra embedding lookups. — [Paper](https://arxiv.org/abs/2605.13433) (2026)

<a id="paper-2601-01712"></a>

- **RelayGR**: RelayGR moves candidate-independent user-history computation earlier in a multi-stage recommendation pipeline. It selectively precomputes prefixes, keeps their key–value caches in accelerator memory and routes later ranking requests to the same instance, using admission control and local-memory reuse to support longer histories while respecting tail-latency and memory budgets. — [Paper](https://arxiv.org/abs/2601.01712) (Huawei · 2026)

<a id="paper-2606-21101"></a>

- **DPIFrame**: DPIFrame accelerates click-through-rate model inference by exposing parallelism both within modules and between modules. A workload-aware multi-table embedding lookup and breadth-first GPU stream scheduler reduce serialized work, showing that adapting execution to the model’s parallel structure can substantially cut inference latency relative to conventional frameworks. — [Paper](https://arxiv.org/abs/2606.21101) (2026)

<a id="paper-2607-10044"></a>

- **FlashTrie**: FlashTrie removes the CPU bottleneck in trie-constrained beam search for generative retrieval. A compressed, integer-oriented trie stays in GPU memory while cooperative kernels expand, validate and prune beams on-device, allowing wider searches over very large valid-identifier catalogs without the latency of repeated CPU traversal and host coordination. — [Paper](https://arxiv.org/abs/2607.10044) (Microsoft · 2026)

<a id="paper-2602-22647"></a>

- **STATIC**: STATIC makes strict output constraints affordable for accelerator-based generative retrieval. It converts a trie of allowed item identifiers into a compressed sparse-row transition matrix, replacing irregular tree traversal with vectorized sparse operations; this supports business-rule filtering with little decoding overhead and also improves cold-start retrieval in the reported benchmark evaluations. — [Paper](https://arxiv.org/abs/2602.22647) (Google / YouTube · KDD 2026)

<a id="paper-2607-27744"></a>

- **ROCS**: ROCS avoids repeatedly processing shared request features for every candidate by delaying request–candidate interaction and keeping candidate-dependent representations separate. It introduces masking and cross-attention designs for different recommendation backbones, plus a GPU broadcast optimization, turning request-level reuse into better serving efficiency while maintaining or improving prediction quality. — [Paper](https://arxiv.org/abs/2607.27744) (Meta · 2026)

<a id="paper-2608-00938"></a>

- **GRACE**: GRACE tackles both ad eligibility and wide-beam decoding cost in real-time generative retrieval. It filters semantic-ID prefixes using targeting-derived bitmasks and Bloom filters, then optimizes attention, key–value caches and beam search for short output sequences with many beams, improving the fraction of eligible generated ads while bringing decoder cost within serving budgets. — [Paper](https://arxiv.org/abs/2608.00938) (Meta · 2026)

<a id="paper-2508-04711"></a>

- **Context Parallelism for HSTU**: This work extends context parallelism to HSTU recommendation models with variable-length, jagged user histories. By distributing sequence-dimension computation and activation storage across GPUs, it addresses the memory pressure of longer histories while handling the irregular inputs that make language-model implementations unsuitable without adaptation. — [Paper](https://arxiv.org/abs/2508.04711) (Meta · RecSys 2025)

<a id="paper-2605-04450"></a>

- **RACER**: RACER jointly manages the GPU memory used by embedding caches and key–value caches, whose competing needs change with the workload. An adaptive controller adjusts their allocation while a cache-aware scheduler routes requests using both kinds of locality and node load, reducing tail latency without the critical-path refill penalties of naive reallocation. — [Paper](https://arxiv.org/abs/2605.04450) (HKBU / Alibaba · 2026)

<a id="paper-2609-30656"></a>

- **Component Benchmark: Hierarchical Model Profiling for Large-scale Recommendation Systems**: Component Benchmark fills the gap between whole-model throughput measurements and low-level operator traces for heterogeneous recommendation models. It independently benchmarks submodules and presents their performance in an interactive hierarchy, helping practitioners locate costs at the architectural level where they actually make modeling and optimization decisions. — [Paper](https://arxiv.org/abs/2609.30656) (Meta · arXiv 2026)
