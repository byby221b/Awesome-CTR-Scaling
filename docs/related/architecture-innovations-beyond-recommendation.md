<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Architecture Innovations Beyond Recommendation

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=architecture-innovations-beyond-recommendation)

Transferable ideas from general-purpose model architecture research.

52 papers · Updated 2026-10-02

<a id="paper-2606-16825"></a>

- **Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models**: Shares expert parameters across consecutive transformer layers while preserving independent routing; reduces memory footprint by ~2× at virtually no quality degradation — [Paper](https://arxiv.org/abs/2606.16825) (2026)

<a id="paper-2606-16768"></a>

- **Taming Curvature: Architecture Warm-Up for Stable Transformer Training**: Fast online estimator of largest Hessian eigenvalue for per-iteration curvature tracking; enables stable billion-parameter Transformer training — [Paper](https://arxiv.org/abs/2606.16768) (2026)

<a id="paper-2606-16429"></a>

- **Taylor-Calibrate: Principled Initialization for Hybrid Linear Attention Distillation**: Principled initialization for converting pretrained Transformers to Gated DeltaNet linear attention students; addresses brittleness in hybrid linear attention distillation — [Paper](https://arxiv.org/abs/2606.16429) (2026)

<a id="paper-2606-16456"></a>

- **SPRI: SVD-Partitioned Residual Initialization for Data-Constrained MoE Upcycling**: SVD-partitioned residual initialization for converting dense models to sparse MoE under data constraints; outperforms existing upcycling methods — [Paper](https://arxiv.org/abs/2606.16456) (2026)

<a id="paper-2606-17952"></a>

- **SoftMoE: Soft Differentiable Routing for Mixture-of-Experts in LLMs**: Truncated soft top-k LapSum relaxation enabling gradient-based optimization of expert routing; learns layer-wise expert capacity allocation under a global budget constraint — [Paper](https://arxiv.org/abs/2606.17952) (ICML 2026)

<a id="paper-2606-23670"></a>

- **Tapered Language Models**: Non-uniform parameter allocation across depth via cosine-scheduled MLP width tapering; shows earlier layers benefit from more capacity; works across Transformer, Gated Attention, and Titans architectures — [Paper](https://arxiv.org/abs/2606.23670) (Mila · 2026)

<a id="paper-2606-25010"></a>

- **Emergent Capabilities Arise Randomly from Learning Sparse Attention Patterns**: Mechanistic study showing emergence corresponds to abrupt learning of task-relevant sparse attention patterns; scaling heads improves learning efficiency while head dimension yields diminishing returns past a minimum; insights for sparse-attention-based ranking architectures — [Paper](https://arxiv.org/abs/2606.25010) (2026)

<a id="paper-2606-25008"></a>

- **Neural Scaling Universality**: Position paper arguing scaling-law exponents are fixed by generic mechanisms (Softmax nonlinearity, representational superposition, layer ensembling) and coefficients (sensitive to data/architecture) are the lever for practical gains — [Paper](https://arxiv.org/abs/2606.25008) (2026)

<a id="paper-2606-29858"></a>

- **Smooth Scaling Laws Hide Stepwise Token Learning**: Token-level decomposition reveals scaling laws are governed by the distribution of localized token learning times; reshaping training distribution according to token learnability yields 11% faster loss reduction — [Paper](https://arxiv.org/abs/2606.29858) (2026)

<a id="paper-2603-04971"></a>

- **MoUE (Mixture of Universal Experts)**: Introduces Virtual Width as a new MoE scaling dimension; reuses a universal layer-agnostic expert pool across layers, converting depth into virtual width under fixed per-token activation budget — [Paper](https://arxiv.org/abs/2603.04971) (Baidu · 2026)

<a id="paper-2604-09175"></a>

- **Generalization and Scaling Laws for MoE Transformers**: Theory of MoE generalization; sup-norm covering-number bound separating active per-input capacity from routing combinatorics; yields generalization bound under distributional assumptions — [Paper](https://arxiv.org/abs/2604.09175) (Academic · 2026)

<a id="paper-2603-21862"></a>

- **Holistic MoE Scaling**: Reusable framework for optimal MoE architecture optimization via holistic scaling laws; addresses combinatorially vast MoE design space by jointly considering all architectural variables — [Paper](https://arxiv.org/abs/2603.21862) (Academic · 2026)

<a id="paper-2607-02980"></a>

- **HiLS**: Hierarchical Landmark Sparse Attention; learns chunk selection end-to-end under LM loss; factorizes attention hierarchically for chunk-specific extraction and fusion; extrapolates 64× training context with 90% retrieval accuracy — [Paper](https://arxiv.org/abs/2607.02980) (2026)

<a id="paper-2607-02303"></a>

- **HOLA (Hippocampal Linear Attention)**: Adds bounded exact KV cache as hippocampal complement to recurrent linear attention state; semiparametric dual-memory architecture achieving 16.1% perplexity reduction while maintaining O(1) memory for inference — [Paper](https://arxiv.org/abs/2607.02303) (Academic · 2026)

<a id="paper-2607-07386"></a>

- **SDM (Sparse Delta Memory)**: Scales linear RNN hidden state by orders of magnitude via sparse addressing; extends Gated DeltaNet with sparse reads/writes to a large explicit memory; isoFLOP-optimal state capacity significantly improves in-context learning and long-context recall — [Paper](https://arxiv.org/abs/2607.07386) (Meta · 2026)

<a id="paper-2607-08186"></a>

- **Hidden Decoding at Scale**: Sequence-length scaling via Hidden Decoding during continued pretraining; expands each token into n streams with Stream-Factorized Attention (quadratic→linear in n); first demonstrated at 100B+ MoE scale (WeLM-HD4-80B/617B); a fixed-backbone scaling path orthogonal to parameter scaling — [Paper](https://arxiv.org/abs/2607.08186) (WeChat AI · 2026)

<a id="paper-2607-10034"></a>

- **MLPs are Hebbians**: First Transformer-compatible closed-form MLP construction achieving information-theoretically optimal fact storage scaling; 10–104× fewer parameters than prior constructions at matched fact count; enables modular fact editing by swapping MLP layers — [Paper](https://arxiv.org/abs/2607.10034) (Stanford · 2026)

<a id="paper-2607-07706"></a>

- **The Key to Going Linear**: Analysis-driven post-hoc Transformer linearization; reveals softmax relies on key-dependent rank-1 orthogonal projections explaining delta-style linear attention's superiority; introduces sink tokens, short convolutions, and fixed-budget cache routing to close the quality gap; scales to 32B on LLaMA and Qwen — [Paper](https://arxiv.org/abs/2607.07706) (Qualcomm AI Research · NeurIPS 2026)

<a id="paper-2607-13491"></a>

- **DeepLoop**: Depth scaling for looped Transformers; formalizes tied-depth effect via visit-alignment coefficient; proper residual scaling rules (α, β exponents) for stable recurrent parameter reuse; complements loop scaling paradigm — [Paper](https://arxiv.org/abs/2607.13491) (2026)

<a id="paper-2607-14530"></a>

- **xHC (Expanded Hyper-Connections)**: First HC-family method to expand residual stream beyond N=4; sparse update of k=4 streams while retaining dense access to N=16; 1.50× compute reduction vs vanilla at same loss on 18B/28B MoE; xHC-Flash reduces memory traffic for practical training — [Paper](https://arxiv.org/abs/2607.14530) (2026)

<a id="paper-2607-14018"></a>

- **Transforming Rank**: Analyzes how each Transformer feedforward block component determines rank survival across depth; reinterprets skip connections and normalization as rank-preserving mechanisms; shows skip scale controls rank-collapse vs ensemble behavior trade-off — [Paper](https://arxiv.org/abs/2607.14018) (2026)

<a id="paper-2607-16051"></a>

- **Loopie (Loop the Loopies!)**: Looped MoE Transformers resolving the longstanding challenge that parameter scaling outperforms loop scaling; 20B/6B MoE models with 2B/0.6B active params substantially outperform vanilla Transformer baselines at same compute budget; complements loop scaling paradigm for CTR — [Paper](https://arxiv.org/abs/2607.16051) (2026)

<a id="paper-2603-15031"></a>

- **Attention Residuals (AttnRes)**: Replaces fixed unit-weight PreNorm residual accumulation with softmax attention over preceding layer outputs for input-dependent selective aggregation across depth, countering uncontrolled hidden-state growth that dilutes each layer's contribution; Block AttnRes partitions layers into blocks to bound memory and communication overhead for large-scale training — the residual-aggregation idea later adapted by CTR depth-scaling work (e.g. Pointwise AttnRes in DeRes) — [Paper](https://arxiv.org/abs/2603.15031) (Kimi · 2026)

<a id="paper-2607-27230"></a>

- **MHAR (Multi-Head Attention Residuals)**: Per-subspace depth routing with zero added parameters; reshapes routing query into H independent heads over depth history removing forced-compromise bottleneck of single-query attention residuals; improves validation loss at 100M/350M/1B scales — [Paper](https://arxiv.org/abs/2607.27230) (Academic · 2026)

<a id="paper-2602-06154"></a>

- **MoSE (Mixture of Slimmable Experts)**: Each MoE expert has a nested slimmable structure executable at variable widths; enables continuous accuracy-compute trade-off spectrum at inference without retraining; lightweight test-time training maps router confidence to expert widths under fixed budget — [Paper](https://arxiv.org/abs/2602.06154) (MBZUAI / Amazon · ICML 2026)

<a id="paper-2308-00951"></a>

- **Soft MoE (From Sparse to Soft Mixtures of Experts)**: Fully-differentiable sparse Transformer replacing discrete token routing with implicit soft assignment; passes different weighted combinations of all input tokens to each expert; addresses training instability, token dropping, and expert scaling limitations of sparse MoE — [Paper](https://arxiv.org/abs/2308.00951) (Google · ICLR 2024)

<a id="paper-2412-14219"></a>

- **A Survey on Inference Optimization Techniques for Mixture of Experts Models**: Comprehensive survey of MoE inference optimization across the full system stack; taxonomizes model-level (expert design, compression, dynamic routing, expert merging), system-level (distributed computing, load balancing, scheduling), and hardware-level optimizations — [Paper](https://arxiv.org/abs/2412.14219) (CUHK / SJTU · ACM Computing Surveys 2025)

<a id="paper-2609-01343"></a>

- **SMELT: Scaling Laws for Compute-Matched MoE Looped Transformers**: Studies MoE looping under strict compute-matching (FLOPs, params, KV cache); loop-middle-only with 2 iterations is optimal; scaling to 54B params shows 6.8–18.0% training FLOPs savings on compute-optimal frontier; rigorous scaling law for loop scaling paradigm — [Paper](https://arxiv.org/abs/2609.01343) (2026)

<a id="paper-2609-02881"></a>

- **Graph Machine: Towards Better Pretraining via Edges**: O(n)-state architecture with dynamic sparse routing via differentiable pointer-like edges and referral mechanism; replaces 75% dense layers in Qwen3-0.6B with sparse layers retrieving only 2-4 of 4096 tokens per KV head at marginal loss degradation — [Paper](https://arxiv.org/abs/2609.02881) (2026)

<a id="paper-2608-27763"></a>

- **Fast Weight Attention for Continual Learning (Falcon)**: Derives normalized first-order fast-weight updates under read-after-write autoregressive semantics; Falcon-1/2/3 family covers scalar NLMS to sliding-window mini-batch updates with recurrent, masked-parallel, and chunk-parallel forms; separates temporal alignment, plasticity, forgetting, and bounded rehearsal in recurrent models — [Paper](https://arxiv.org/abs/2608.27763) (Academic · 2026)

<a id="paper-2609-04575"></a>

- **Training-Free Halving of Activated Experts in Fine-Grained MoE**: Reveals that MoE routing renormalization implicitly calibrates expert output gain to the training top-k; separates the gain-calibration effect from expert selection to training-free halve activated experts at inference without retraining — [Paper](https://arxiv.org/abs/2609.04575) (University of Alberta · 2026)

<a id="paper-2609-40316"></a>

- **Scaling Laws for Looped Mixture of Experts**: Jointly models recurrence, sparsity, model size and data with a bounded sparsity-conditional effective-capacity law; guides looped-MoE designs under compute/memory limits; a 1.3B-total looped MoE matches a 2.9B-total non-looped MoE on reasoning at matched training compute, using more inference compute — [Paper](https://arxiv.org/abs/2609.40316) (Meta AI · arXiv 2026)

<a id="paper-2609-35751"></a>

- **How to Loop MoE: Flatten the Experts, Untie the Attention**: Flattens looped MoE into fewer, wider expert pools with more passes while untying per-pass attention and sharing experts/routers; improves pretraining loss by 0.012 nat at 100B tokens under equal parameters and compute, with matched-or-better downstream accuracy — [Paper](https://arxiv.org/abs/2609.35751) (Case Western Reserve University / Kyoto University / NII LLMC · arXiv 2026)

<a id="paper-2609-36301"></a>

- **MoRE: Scaling mixture of experts with hardware-aware low-rank routing**: Low-rank factorization reduces router cost from O(Mh) to O((h+M)r), with logarithmic-rank expressivity guarantees and fused inference kernels; fits 5–6× more total parameters at matched active FLOPs with similar prefill latency and improved knowledge recall — [Paper](https://arxiv.org/abs/2609.36301) (University of Pennsylvania / The Wharton School · arXiv 2026)

<a id="paper-2609-31093"></a>

- **Block Sparse Attention with Log-Linear Complexity**: Pyramid Top-K routing recursively narrows candidate key blocks using LogSumExp scoring, reducing block-sparse selection plus attention to O(N log N); fused training/inference kernels avoid a full score matrix; evaluated at 418M–2.67B with 100B-token pretraining — [Paper](https://arxiv.org/abs/2609.31093) (Shanghai Jiao Tong University / Shanghai Innovation Institute / ByteDance Seed · arXiv 2026)

<a id="paper-2609-36529"></a>

- **Triadic Linear Attention: Three-Dimensional Recurrent States for Long-Context Sequence Modeling**: Adds a second key/query axis to lift recurrent memory from a matrix to a third-order tensor; E-fold state expansion needs only two small projections and remains chunk-parallel; improves long-context modeling and recall at 400M/1.3B with ~1.2% parameter overhead for 8× state — [Paper](https://arxiv.org/abs/2609.36529) (Massachusetts Institute of Technology / MIT-IBM Computing Research Lab · arXiv 2026)

<a id="paper-2609-38832"></a>

- **Scaling Parameter and Context in Attention: Native Sparse Attention from Mixture-of-Head**: Native head routing activates K of H heads per token and stores only each head’s assigned subsequence, jointly scaling attention parameters and context; top-8-of-32 uses 1/4 KV storage and ~1/16 KV access versus 32-head MHA under balanced routing, with stronger LongBench average — [Paper](https://arxiv.org/abs/2609.38832) (Peking University · arXiv 2026)

<a id="paper-2609-34212"></a>

- **X-MoD: Practical Scaling Laws for Sparse-Depth Routing Beyond Mixture-of-Depths**: Decouples token sparsity from dense-anchor stride for scalable sparse-depth routing, stabilized by variance-scaled gates and token balancing; a FLOP-matched law predicts capacity/context/stride trade-offs; measured 1.70–1.93× training throughput versus similarly sized MoE at 936M active-equivalent scale — [Paper](https://arxiv.org/abs/2609.34212) (Tsinghua University / Tianjin University · arXiv 2026)

<a id="paper-2609-32704"></a>

- **CoWindow Attention: Full Causal Coverage Is a Collective Property**: Partitions long-range history into complementary KV-head windows while sharing local/sink windows, preserving collective causal coverage without a router; 0.6B–14B experiments retain comparable quality, with 28.5% total training-FLOP reduction for 14B at 32K context — [Paper](https://arxiv.org/abs/2609.32704) (HKUST (Guangzhou) / Beijing Academy of Artificial Intelligence / Université Paris Cité · arXiv 2026)

<a id="paper-2609-38166"></a>

- **LeapQuant: Efficient Linear Attention with Accurate Recurrent State Quantization**: Quantizes recurrent states only at window boundaries, buffering updates and retaining outliers as high-precision compensator tokens; near-FP32 accuracy with 8-bit states, 3.4× state compression and 1.47× average end-to-end throughput in evaluated hybrid-LLM serving workloads — [Paper](https://arxiv.org/abs/2609.38166) (UC Berkeley / University of Washington / MIT / Perplexity AI / NVIDIA · arXiv 2026)

<a id="paper-2609-39137"></a>

- **ID Balancing: Stable Training of Extremely Sparse MoE via PID-Based Load Control**: Integral–derivative routing-bias control scales corrections with expert-load error and reacts when imbalance worsens; stabilizes Top-3-of-768 routing and 18.9B→69.9B MoE scaling while maintaining competitive quality, without adding an auxiliary loss — [Paper](https://arxiv.org/abs/2609.39137) (Qwen Team / Alibaba Token Hub / Alibaba Group · arXiv 2026)

<a id="paper-2609-39034"></a>

- **Switching Linear Attention**: Derives mixture-of-linear-regressors recurrent memory through online EM, with input- and state-dependent responsibilities per output dimension; increases context-sensitive recall capacity while retaining sequence-length-independent state — [Paper](https://arxiv.org/abs/2609.39034) (Stanford University · COLM 2026)

<a id="paper-2609-35664"></a>

- **MS-GLA: Multi-Scale Gated Linear Attention for Addressing Representational Bottlenecks via Multi-Temporal Resolution**: Partitions a fixed GLA head/state budget across causally pooled temporal resolutions, then aligns and fuses outputs; retains chunk-parallel training, with measured throughput and memory overhead in the evaluated multi-scale configuration — [Paper](https://arxiv.org/abs/2609.35664) (International Institute of Information Technology Hyderabad · COLM 2026)

<a id="paper-2609-37379"></a>

- **Looped Transformers as Optimizers**: Treats looped hidden states as fast weights and derives loop transitions from local optimizer updates; OperLoop combines delta-error correction, learned decay and adaptive step sizes for shared-block refinement — [Paper](https://arxiv.org/abs/2609.37379) (HKUST (Guangzhou) / StepFun / Shanghai Jiao Tong University / University of Chinese Academy of Sciences / Tsinghua University · arXiv 2026)

<a id="paper-2609-29812"></a>

- **FlashLoop: Fast and Memory-Efficient Looped Transformers via Lazy Updates**: Reduces cross-loop redundancy through nested token updates, mass-corrected sparse attention and quantized KV residuals; fused execution lowers inference compute and cache memory with small, task-dependent quality changes — [Paper](https://arxiv.org/abs/2609.29812) (ELLIS Institute Tübingen / Max Planck Institute for Intelligent Systems / Tübingen AI Center · arXiv 2026)

<a id="paper-2609-36314"></a>

- **Fractional State Space Transition for Long Sequence Modeling**: FRAC approximates fractional long-memory dynamics over a finite horizon using log-spaced exponential modes and token-dependent read/write routing; retains chunk-parallel training and bounded-state decoding — [Paper](https://arxiv.org/abs/2609.36314) (Huawei Noah’s Ark Lab, Montreal Research Center · arXiv 2026)

<a id="paper-2602-04852"></a>

- **On State Reduction in Linear Attention**: Uses rank-revealing QR to select matched query/key channels and prune their depthwise-convolution filters, shrinking recurrent state while retaining fast-kernel compatibility; recovery fine-tuning mitigates task-dependent quality loss — [Paper](https://arxiv.org/abs/2602.04852) (Max Planck Institute for Intelligent Systems / ETH Zürich / ELLIS Institute Tübingen / Tübingen AI Center / Liquid AI · arXiv 2026)

<a id="paper-2605-23893"></a>

- **Complete-muE: Optimal Hyperparameter Transfer and Scaling for MoE Models**: Combines active-width and expert-exposure scaling rules to transfer initialization and AdamW hyperparameters across dense FFN, dense MoE and sparse MoE models; reduces repeated tuning across expert count, granularity and model scale in evaluated settings — [Paper](https://arxiv.org/abs/2605.23893) (Adobe Research · arXiv 2026)

<a id="paper-2609-30820"></a>

- **Quantizing Looped Transformers: Feedback Exposure and Calibration Blindness**: Identifies feedback amplification and step-zero calibration blindness in looped-model quantization; recurrence-aware GPTQ accumulates calibration statistics across loop steps, improving INT4 fake-quantization recovery on evaluated checkpoints — [Paper](https://arxiv.org/abs/2609.30820) (Meta · arXiv 2026)

<a id="paper-2609-07816"></a>

- **Kalman Delta Networks: Uncertainty-aware Associative Memory**: Tracks associative-memory uncertainty to adapt delta-rule update gains; diagonal and isotropic Kalman variants retain fixed-size recurrent memory and scan-parallel updates for recall and language modeling — [Paper](https://arxiv.org/abs/2609.07816) (Yale University · arXiv 2026)

<a id="paper-2609-32712"></a>

- **MassAlloc Attention: Let Attention Allocate Its Own Compute**: Allocates post-score attention computation by normalized probability mass in a fused operator; retains full causal QK discovery while skipping low-contribution work, with approximate backward gradients and quadratic score computation — [Paper](https://arxiv.org/abs/2609.32712) (HKUST (Guangzhou) / Beijing Academy of Artificial Intelligence / Université Paris Cité · arXiv 2026)

<a id="paper-2609-31947"></a>

- **On-Policy Attention Linearization**: Distills hybrid linear-attention students on their own long-context trajectories using a frozen dense-attention teacher; targets recurrent-state drift and improves evaluated retrieval and reasoning tasks without fully recovering every long-context result — [Paper](https://arxiv.org/abs/2609.31947) (Carnegie Mellon University / Cornell University · arXiv 2026)
