<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Engineering & Serving

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=engineering-serving)

Systems, serving infrastructure and hardware-aware optimization.

42 papers · Updated 2026-10-21

<a id="paper-2510-18239"></a>

- **LIME**: LIME targets the cost of scoring many candidates against long user histories. Low-rank link embeddings separate user-side and candidate-side interactions so attention can be precomputed, while LIME-XOR makes history processing linear in sequence length; together they make larger candidate sets and longer histories more practical without giving up most of a Transformer’s recommendation quality. — [Paper](https://arxiv.org/abs/2510.18239) (NeurIPS 2026). Reading priority: Read first.

<a id="paper-2605-27450"></a>

- **Context Features Are Cheap**: This work removes repeated user-and-context computation when a ranker scores many candidates for the same request. Exact block decompositions reuse context-only terms in common interaction operators without changing predictions, while a separate rDCN architecture preserves this separation across layers; the distinction matters because exact reuse in ordinary cross networks and self-attention is limited to their first layer. — [Paper](https://arxiv.org/abs/2605.27450) (2026). Reading priority: Read first.

<a id="paper-2603-11486"></a>

- **Quantized Inference for OneRec-V2**: The paper investigates why low-precision inference is more workable for OneRec-V2 than for traditional recommenders. Its more controlled weight and activation distributions, together with a compute-intensive workload, motivate an FP8 post-training quantization pipeline co-optimized with serving infrastructure; deployment evaluations report better latency and throughput without degradation in the measured core online metrics. — [Paper](https://arxiv.org/abs/2603.11486) (Kuaishou · 2026). Reading priority: Worth reading.

<a id="paper-2604-12110"></a>

- **SOLARIS**: SOLARIS makes expensive recommendation foundation-model representations usable within real-time serving budgets. It predicts user–item pairs likely to occur in future requests and asynchronously computes their interaction embeddings ahead of time, moving heavy inference away from the critical path; production results show that this speculative preparation can improve advertising outcomes at large scale. — [Paper](https://arxiv.org/abs/2604.12110) (Meta · SIGIR 2026). Reading priority: Worth reading.

<a id="paper-2604-24073"></a>

- **FreeScale**: FreeScale addresses wasted GPU time in distributed sequence-recommendation training, where uneven examples create stragglers and embedding communication stalls computation. It balances input workloads, prioritizes and overlaps embedding communication, and uses communication techniques that avoid competing for GPU streaming multiprocessors, reducing idle bubbles in large production-scale training jobs. — [Paper](https://arxiv.org/abs/2604.24073) (Meta · MLSys 2026). Reading priority: Read first.

<a id="paper-2604-24806"></a>

- **Versioned Late Materialization**: This system avoids storing a full user-history sequence in every training example, a redundancy that becomes costly for ultra-long histories and shared datasets. It stores histories once and reconstructs each example through versioned pointers at training time, combining leakage-prevention protocols with prefetching and locality optimizations to preserve consistency without turning data loading into the bottleneck. — [Paper](https://arxiv.org/abs/2604.24806) (Meta · RecSys (Industry) 2026). Reading priority: Read first.

<a id="paper-2605-00324"></a>

- **Intelligent Elastic Feature Fading**: Intelligent Elastic Feature Fading reduces the operational cost of retiring expensive ranking features. Instead of waiting for a dedicated retraining rollout, it gradually changes serving-time feature coverage while routine training adapts the model, with monitoring, rollback and safety controls; production evaluations find this gradual transition less disruptive than removing features abruptly. — [Paper](https://arxiv.org/abs/2605.00324) (2026). Reading priority: Worth reading.

<a id="paper-2605-13433"></a>

- **TurboGR**: TurboGR adapts generative-recommendation training to Ascend NPUs, whose dense-compute design struggles with irregular sequence and sparse operations. It combines jagged-operator acceleration and load balancing with communication overlap and cheaper negative sampling, improving device utilization and scaling efficiency while expanding the useful negative-sample space without extra embedding lookups. — [Paper](https://arxiv.org/abs/2605.13433) (2026). Reading priority: Worth reading.

<a id="paper-2601-01712"></a>

- **RelayGR**: RelayGR moves candidate-independent user-history computation earlier in a multi-stage recommendation pipeline. It selectively precomputes prefixes, keeps their key–value caches in accelerator memory and routes later ranking requests to the same instance, using admission control and local-memory reuse to support longer histories while respecting tail-latency and memory budgets. — [Paper](https://arxiv.org/abs/2601.01712) (Huawei · 2026). Reading priority: Read first.

<a id="paper-2606-21101"></a>

- **DPIFrame**: DPIFrame accelerates click-through-rate model inference by exposing parallelism both within modules and between modules. A workload-aware multi-table embedding lookup and breadth-first GPU stream scheduler reduce serialized work, showing that adapting execution to the model’s parallel structure can substantially cut inference latency relative to conventional frameworks. — [Paper](https://arxiv.org/abs/2606.21101) (2026). Reading priority: Worth reading.

<a id="paper-2607-10044"></a>

- **FlashTrie**: FlashTrie removes the CPU bottleneck in trie-constrained beam search for generative retrieval. A compressed, integer-oriented trie stays in GPU memory while cooperative kernels expand, validate and prune beams on-device, allowing wider searches over very large valid-identifier catalogs without the latency of repeated CPU traversal and host coordination. — [Paper](https://arxiv.org/abs/2607.10044) (Microsoft · 2026). Reading priority: Worth reading.

<a id="paper-2602-22647"></a>

- **STATIC**: STATIC makes strict output constraints affordable for accelerator-based generative retrieval. It converts a trie of allowed item identifiers into a compressed sparse-row transition matrix, replacing irregular tree traversal with vectorized sparse operations; this supports business-rule filtering with little decoding overhead and also improves cold-start retrieval in the reported benchmark evaluations. — [Paper](https://arxiv.org/abs/2602.22647) (Google / YouTube · KDD (ADS) 2026). Reading priority: Worth reading.

<a id="paper-2607-27744"></a>

- **ROCS**: ROCS avoids repeatedly processing shared request features for every candidate by delaying request–candidate interaction and keeping candidate-dependent representations separate. It introduces masking and cross-attention designs for different recommendation backbones, plus a GPU broadcast optimization, turning request-level reuse into better serving efficiency while maintaining or improving prediction quality. — [Paper](https://arxiv.org/abs/2607.27744) (Meta · 2026). Reading priority: Read first.

<a id="paper-2608-00938"></a>

- **GRACE**: GRACE tackles both ad eligibility and wide-beam decoding cost in real-time generative retrieval. It filters semantic-ID prefixes using targeting-derived bitmasks and Bloom filters, then optimizes attention, key–value caches and beam search for short output sequences with many beams, improving the fraction of eligible generated ads while bringing decoder cost within serving budgets. — [Paper](https://arxiv.org/abs/2608.00938) (Meta · 2026). Reading priority: Worth reading.

<a id="paper-2508-04711"></a>

- **Context Parallelism for HSTU**: This work extends context parallelism to HSTU recommendation models with variable-length, jagged user histories. By distributing sequence-dimension computation and activation storage across GPUs, it addresses the memory pressure of longer histories while handling the irregular inputs that make language-model implementations unsuitable without adaptation. — [Paper](https://arxiv.org/abs/2508.04711) (Meta · RecSys (Industry) 2025). Reading priority: Worth reading.

<a id="paper-2605-04450"></a>

- **RACER**: RACER jointly manages the GPU memory used by embedding caches and key–value caches, whose competing needs change with the workload. An adaptive controller adjusts their allocation while a cache-aware scheduler routes requests using both kinds of locality and node load, reducing tail latency without the critical-path refill penalties of naive reallocation. — [Paper](https://arxiv.org/abs/2605.04450) (HKBU / Alibaba · 2026). Reading priority: Worth reading.

<a id="paper-2609-30656"></a>

- **Component Benchmark: Hierarchical Model Profiling for Large-scale Recommendation Systems**: Component Benchmark fills the gap between whole-model throughput measurements and low-level operator traces for heterogeneous recommendation models. It independently benchmarks submodules and presents their performance in an interactive hierarchy, helping practitioners locate costs at the architectural level where they actually make modeling and optimization decisions. — [Paper](https://arxiv.org/abs/2609.30656) (Meta · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2610-02057"></a>

- **Optimizing Effective Training Time for Large-Scale Recommendation Systems**: This fleet-scale study uses Effective Training Time (ETT%) to identify lifecycle overhead that prevents large recommendation-training jobs from advancing on new data. The framework guides optimizations to trainer initialization, PyTorch 2 compilation, checkpointing, model publishing and recovery. The abstract reports improved ETT% on every benchmark, reaching 85% on the largest workload, while fleet-wide ETT% rose from about 80% to above 90% after deployment. — [Paper](https://arxiv.org/abs/2610.02057) (Meta Platforms, Inc. · arXiv 2026). Reading priority: Read first.

<a id="paper-2609-39350"></a>

- **HAPMoE: Heterogeneity-Aware Automatic Parallelism Planning for Mixture-of-Experts Models Training**: HAPMoE addresses automatic parallelization when mixture-of-experts models and heterogeneous accelerator clusters occur together, using a lightweight MoE-aware cost model and a six-dimensional parallelism search that emits Megatron-LM-deployable plans. The abstract reports end-to-end training throughput up to 3.2× that of baselines across heterogeneous clusters, with up to 78% additional gains from non-uniform pipeline partitioning. Its pruning-enhanced dynamic-programming search completes within one minute in the reported experiments. — [Paper](https://arxiv.org/abs/2609.39350) (Peking University / Infinigence AI / Tsinghua University · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-36070"></a>

- **Mixture-of-Kittens: MoE Megakernel for NVL72s**: Mixture-of-Kittens fuses MoE dispatch, expert computation and combine into a deterministic training megakernel tailored to NVL72 scale-up fabrics. Communication direction, overlap granularity and device-side execution yield up to 2.37x layer throughput and 1.41x end-to-end training throughput in a production run on 512 GPUs. — [Paper](https://arxiv.org/abs/2609.36070) (Department of Computer Science, Stanford University; Cursor Research · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-00671"></a>

- **MegaFlux: Skew-Resilient MoE Megakernels via Pipelined Expert Replication**: MegaFlux dynamically replicates hot MoE experts and pipelines replica-weight transfers and gradient reductions inside persistent kernels without changing router outputs. Across 147 configurations per direction on eight B200 GPUs, forward/backward geometric-mean speedups over fixed placement are 1.45x/1.28x; DeepSeek-V4-Pro prefill achieves 1.13–1.26x median end-to-end speedups. — [Paper](https://arxiv.org/abs/2610.00671) (Princeton University; NVIDIA · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-25433"></a>

- **Lightweight Ranking Heads: Accelerating Multi-Task Experimentation in Production Recommender Systems**: Light Heads adds shallow, stop-gradient task heads to continuously trained ranking models, resets them between training runs, and shares a central configuration across model fleets. The YouTube deployment reduces multi-task experimentation from weeks to days by avoiding backbone cold starts and speeding downstream co-training. The approach targets continuous-learning production systems. — [Paper](https://arxiv.org/abs/2609.25433) (Google LLC (YouTube) · OARS @ RecSys 2026). Reading priority: Read first.

<a id="paper-2610-00321"></a>

- **CAST: Cost-Aware Speculative Trees from One-Pass Block Drafters**: CAST reuses alternatives already scored by a one-pass block drafter, packs them into a speculative tree, and verifies them in one target pass without changing the target model, drafter weights, or decoding rule. It chooses tree width by balancing expected gains against measured verification cost, and the authors prove that greedy and sampled decoding preserve the target output distribution. Across five domains, three GPU generations, and two model families, its predicted width outperforms the standard chain in all eight settings by up to 43%, with the best width strongly dependent on the deployment. — [Paper](https://arxiv.org/abs/2610.00321) · [Code](https://github.com/js-lee-AI/CAST) (Korea University / Yonsei University Mirae Campus · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-00499"></a>

- **Denoising Surface: Modeling and Predicting Inference Cost for Diffusion LLM Serving**: Denoising Workload Surface (DWS) represents diffusion-LLM inference as a two-dimensional block-by-denoising-step probability surface, preserving workload information discarded by output length or total step count. A coarse-to-fine-trained, prompt-only predictor runs on a single CPU core and separates request behavior from deployment-specific costs, allowing transfer across hardware without retraining. The authors report cost-prediction error up to 2.50 times lower than scalar-based predictors and an end-to-end online-chatbot latency reduction by a factor of up to 1.92 with DWS-guided shortest-job-first scheduling. — [Paper](https://arxiv.org/abs/2610.00499) (Wuhan University / Shanghai Jiao Tong University / The Hong Kong University of Science and Technology / Damen Database Co., Ltd. / Central China Normal University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-05559"></a>

- **Cut Binary Cross Entropy: Efficient Large-Vocabulary Loss and Gradient Kernels for Sequential Recommendation**: CutBCE computes exact full-vocabulary binary cross-entropy for multi-label sequential recommendation without keeping the complete logits or their gradients in accelerator memory. Its JAX/Pallas implementation combines tiled computation, custom gradients, distributed-memory optimizations and count-based training metrics. On an 8-chip TPU SASRec workload with 876k items, it reports 65.7% less peak memory and 225.9% higher training speed with comparable accuracy. — [Paper](https://arxiv.org/abs/2610.05559) (Google Cloud · arXiv 2026). Reading priority: Read first.

<a id="paper-2607-20873"></a>

- **LO-FAR: A Cost-Aware Local Filter for Sparse Feature Ranking in Industrial Ad Recommendation**: LO-FAR cheaply filters sparse ID-list features before expensive ranker retraining. Per-feature local estimates run on CPUs and preserve competitive CTR/CVR quality after subset retraining, while reducing sparse storage. Evaluation is limited to short ID-list features on one private dataset; marginal scoring can miss interaction-only signals. — [Paper](https://arxiv.org/abs/2607.20873) (Meta Platforms, Inc. · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2610-09424"></a>

- **Democratizing MoE inference on commodity GPUs with CoMoE**: CoMoE reduces expert-parallel communication on PCIe-connected consumer GPUs by using the host for token multicast and fine-grained aggregation. RTX 5090 experiments show higher MoE inference throughput while reducing dependence on expensive peer-to-peer interconnects. — [Paper](https://arxiv.org/abs/2610.09424) (Tsinghua University; Nanjing University; Alibaba Cloud Computing · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-09372"></a>

- **Expert Coupling in MoE Pretraining: Reducing All-to-All Overhead with Correlated Placement and Token Shuffling**: The work exploits correlated expert selections to colocate experts and shuffle token ownership toward future experts. A deduplicating dispatcher reduces all-to-all traffic without changing model routing or weights, improving MoE training step time on AMD GPU clusters. — [Paper](https://arxiv.org/abs/2610.09372) (Zyphra · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2610-07333"></a>

- **Memory-Efficient Expert Routing for Distributed MoE Training**: RelayMoE replaces top-k-expanded all-to-all dispatch buffers with ring execution that circulates experts or tokens and overlaps transfer with compute. Hop-wise backward recomputation lowers peak memory, enabling larger batches or longer sequences and faster full-model training. — [Paper](https://arxiv.org/abs/2610.07333) (William & Mary; Barcelona Supercomputing Center · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-05744"></a>

- **CIPHER-MoE: Balancing Efficiency and Routing Fidelity in Trillion-Scale MoE Training**: CIPHER-MoE uses affinity-aware expert-to-token filtering and explicit capacity control to reduce overloaded experts while preserving token-side top-k selection. Large-model experiments report reduced hot-expert workload and faster training with comparable task quality. — [Paper](https://arxiv.org/abs/2610.05744) (Tongji University; Cornell University; Harbin Institute of Technology, Shenzhen; AI Training Platform Team, Shenzhen Loop Area Institute · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-03415"></a>

- **RailWave: Adaptive Spatial and Temporal Scheduling for Expert-Parallel Communication**: RailWave shapes expert-parallel traffic in space and time using rail balancing, reusable permutation schedules and a calibrated path selector. Training-derived communication replays show lower dispatch/combine latency on H800 and H20 clusters. — [Paper](https://arxiv.org/abs/2610.03415) (Sun Yat-sen University; Southeast University; Monash University; National University of Singapore; Shenzhen University of Advanced Technology; Renmin University of China · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-03203"></a>

- **AFORE: Attention-FFN Disaggregation with Overlapped Reconfiguration of Experts**: AFORE reconfigures experts in attention–FFN-disaggregated serving using upcoming microbatch demand. Its scheduler overlaps expert migration with in-flight work and uses GPU-to-GPU transfers, improving output throughput and tail token latency on dynamic workloads. — [Paper](https://arxiv.org/abs/2610.03203) (The Hong Kong University of Science and Technology; University of Cambridge; Wuhan University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-07516"></a>

- **NCCL M2N: A Layout- and Topology-Aware Collective for Distributed Tensor Resharding**: NCCL M2N derives tensor-resharding transfers from source/destination layouts and routes one copy across NVLink domains before local replication. It reduces redundant traffic and improves both isolated MoE-layer transfers and weight synchronization in a separate large RL training experiment. — [Paper](https://arxiv.org/abs/2610.07516) (NVIDIA Corporation · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-05619"></a>

- **SCOUT: Supply-Aware Cold-Start Proactive Query Suggestion for Travel Search**: SCOUT trains proactive travel-query suggestions against supply-side feedback from a production reranker, using GRPO to internalize inventory compatibility instead of paying for best-of-N search at serving time. Offline, destination-disjoint Qwen3-8B experiments compare inventory match and diversity. The engineering lesson is to move expensive selection into training; online CTR and booking improvements are not established, and the reward measures fulfillability rather than user appeal. — [Paper](https://arxiv.org/abs/2610.05619) (Airbnb, Inc. · GRAIL @ CIKM (non-archival workshop) 2026). Reading priority: Unrated.

<a id="paper-2610-13806"></a>

- **FORTE: A Production Framework for Feature Evaluation and Deprecation in Industrial Recommender Systems**: FORTE screens feature-removal candidates with repeated perturbation measurements, grouped ablations, retraining, online guardrails, and downstream lineage tracing. In two Pinterest recommender systems, the largest search-model removal set failed online guardrails, while removing eight features from a separate ranking model reduced trainable parameters by 29.9% and raised serving throughput by 19.8–25.5%. It offers a production process for reclaiming ranking-system capacity, not a guarantee that low individual importance makes a feature safe to remove. — [Paper](https://arxiv.org/abs/2610.13806) (Pinterest · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-12815"></a>

- **Deploying RDMA for Distributed Inference and Training At Scale**: ByteExpress is a software communication layer for RDMA in ByteDance parameter-server-based inference and training. It combines buffer management, zero-copy transfers, connection multiplexing, flow control, and recovery above the transport layer. Production inference reports 35.7% lower mean and 43.7% lower P99 parameter-fetch latency, plus 10.69% lower total CPU use versus kernel TCP. It directly informs recommendation parameter-serving infrastructure; these are communication and system metrics, not ranking-quality gains. — [Paper](https://arxiv.org/abs/2610.12815) (Fudan University; ByteDance Inc.; University of Michigan · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14394"></a>

- **Understanding and Mitigating Training Instability in Large-Scale Recommender Systems: A Cascade Perspective**: This study analyzes training divergence in an industrial short-video recommender as a coupled gradient–weight–loss cascade and groups interventions into gradient control, weight/activation stabilization, and loss shaping. Industrial experiments support combining these controls to stabilize continuously updated models under distribution shifts. The measurements do not establish the exact temporal cascade for every divergence event; the work offers a practical diagnostic framework for scaling rankers rather than a universal causal law. — [Paper](https://arxiv.org/abs/2610.14394) (Google · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17901"></a>

- **FlashMask-3: Efficient and Expressive Mask-Aware Distributed Attention**: FlashMask-3 combines a Hopper-optimized structured-mask attention kernel with zero-communication mask localization, load balancing and communication pruning for context parallelism. In 118B-A14B MoE training at 128K context on 128 H100 GPUs, throughput improves 7.3–11.0% over Dual Chunk all-gather. The separate kernel and distributed-attention gains are not end-to-end gains. Long-sequence ranking may benefit from these systems ideas, subject to mask and hardware compatibility; CTR transfer is untested. — [Paper](https://arxiv.org/abs/2610.17901) (Baidu Inc. · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-14798"></a>

- **Accelerating MoE Training through Expert Placement and Replica Coordination**: PlaceMoE jointly plans expert replicas, physical placement, and source-aware token-to-copy dispatch, distinguishing deduplicated communication from token–expert compute load. It also overlaps replica-gradient synchronization with attention backpropagation. GPU/NPU-cluster tests show faster steady-state training than the evaluated systems on Qwen3-VL and a six-MoE-layer DeepSeek-V3 configuration. Initial profiling, calibration, and planning are excluded from headline step timings, and extra replicas consume memory. CTR engineering inference: co-optimize placement and dispatch for distributed expert rankers using topology-calibrated costs, then include planning amortization and replica memory in end-to-end comparisons. These are language/multimodal-model systems experiments, not CTR experiments. — [Paper](https://arxiv.org/abs/2610.14798) (Harbin Institute of Technology, Shenzhen; Hong Kong University of Science and Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21676"></a>

- **ConStore: Search-Overlapped Prefetch and Co-Retrieval-Aware Content Storage for Disk-Based ANNS**: At large retrieval depth, loading the content behind vector-search results can cost as much as the search itself. ConStore overlaps bounded speculative content prefetch with disk-based ANNS, groups frequently co-retrieved documents, adapts the layout to workload changes, and batches page-aware reads. Across three multi-hop QA workloads with K from 10 to 1600, it reduces end-to-end retrieval latency by up to 48% on DiskANN and 25% on SPANN versus the best per-document-read baseline. Separate 100M- and billion-vector experiments test prefetch scalability. These are retrieval-system results, not measured CTR improvements. — [Paper](https://arxiv.org/abs/2610.21676) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-24481"></a>

- **DuoLM: Fast and Effective Personalized Recommendation with Language Models**: DuoLM separates an encoder that produces reusable compact item representations from a personalized LLM ranker, training both with recommendation supervision and teacher distillation. Virtual token IDs, shared history computation and CUDA Graph replay reduce serving overhead. Benchmarks retain quality comparable to the expert teacher; on one H100 the system scores about 26,400 candidates per second, roughly 60x the teacher throughput with vLLM and automatic prefix caching. The throughput comparison is specific to that hardware and serving setup. — [Paper](https://arxiv.org/abs/2610.24481) (University of California, Irvine; Google DeepMind; Oracle · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-23064"></a>

- **BaGuaLu-2: Taming Dynamic Memory Fluctuation for Efficient MoE Model Training over 10,000 GPUs**: BaGuaLu-2 addresses activation-memory fluctuations caused by MoE expert-load imbalance through per-batch dynamic provisioning and system optimizations. It trains a 1.04-trillion-parameter model on 12,288 GPUs at over 2 EFlops and 35% model FLOPs utilization. Reported average throughput is 1.14x Megatron-Kuai and 1.13x AdaPipe. The system offers a memory-management reference for large sparse-model training, with no recommendation-specific evaluation. — [Paper](https://arxiv.org/abs/2610.23064) · [Official venue](https://sc26.conference-program.com/presentation/?id=pap287&sess=sess211) (Tsinghua University; Qingcheng.AI; University of Science and Technology Beijing · SC 2026). Reading priority: Unrated.
