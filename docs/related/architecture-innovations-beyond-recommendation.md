<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Architecture Innovations Beyond Recommendation

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=architecture-innovations-beyond-recommendation)

Transferable ideas from general-purpose model architecture research.

320 papers · Updated 2026-11-13

<a id="paper-2606-16825"></a>

- **Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models**: Expert Tying reduces the memory cost of mixture-of-experts language models by sharing expert weights across consecutive layers while keeping each layer’s attention and routing independent. Experiments across several MoE families indicate that much of the expert bank is redundant across depth, allowing substantial parameter-memory savings with little change in perplexity or downstream quality. — [Paper](https://arxiv.org/abs/2606.16825) (2026). Reading priority: Read as needed.

<a id="paper-2606-16768"></a>

- **Taming Curvature: Architecture Warm-Up for Stable Transformer Training**: This work connects Transformer training instability to sudden increases in optimizer-preconditioned curvature. A warm-started Hessian estimator makes curvature tracking practical at large scale, and the resulting observations motivate architecture warm-up: progressively adding depth to control curvature, reducing loss spikes and divergence without slowing convergence in the reported experiments. — [Paper](https://arxiv.org/abs/2606.16768) (2026). Reading priority: Read as needed.

<a id="paper-2606-16429"></a>

- **Taylor-Calibrate: Principled Initialization for Hybrid Linear Attention Distillation**: Taylor-Calibrate improves the starting point when converting a pretrained Transformer into a hybrid Gated DeltaNet model. Teacher attention statistics initialize the new recurrent memory timescales and gates, followed by brief layerwise output alignment, so distillation spends fewer tokens repairing mismatched dynamics and more efficiently recovers the teacher’s behavior. — [Paper](https://arxiv.org/abs/2606.16429) (2026). Reading priority: Read as needed.

<a id="paper-2606-16456"></a>

- **SPRI: SVD-Partitioned Residual Initialization for Data-Constrained MoE Upcycling**: SPRI converts a pretrained dense model into a mixture of experts when supervised adaptation data are limited. It partitions residual components of the feed-forward weights through singular-value decomposition to create controlled expert diversity, then uses two-stage training to stabilize adaptation; multilingual speech translation experiments show benefits over dense fine-tuning and prior upcycling approaches. — [Paper](https://arxiv.org/abs/2606.16456) (EMNLP 2026). Reading priority: Read as needed.

<a id="paper-2606-17952"></a>

- **SoftMoE: Soft Differentiable Routing for Mixture-of-Experts in LLMs**: SoftMoE replaces discrete top-k expert selection with a differentiable relaxation and learns how much expert computation each layer should receive under a global budget. The method preserves autoregressive causality and discovers uneven allocations, often using more experts in later layers, achieving competitive language-model quality with fewer activated experts. — [Paper](https://arxiv.org/abs/2606.17952) (ICML 2026). Reading priority: Read as needed.

<a id="paper-2606-23670"></a>

- **Tapered Language Models**: Tapered Language Models challenge the convention of giving every layer the same parameter capacity. They gradually narrow feed-forward layers with depth while keeping the total budget fixed, allocating more capacity to earlier transformations; controlled evaluations across several architecture families find better perplexity and downstream performance without extra parameters or computation. — [Paper](https://arxiv.org/abs/2606.23670) (Mila · 2026). Reading priority: Worth reading.

<a id="paper-2606-25010"></a>

- **Emergent Capabilities Arise Randomly from Learning Sparse Attention Patterns**: The paper links abrupt capability gains to the sudden discovery of task-relevant sparse attention patterns during training. Synthetic-task experiments show that these learning events are stochastic and depend on context length, pattern sparsity and head count, offering a mechanistic explanation for why smooth aggregate loss improvements can coexist with apparently abrupt downstream emergence. — [Paper](https://arxiv.org/abs/2606.25010) (2026). Reading priority: Read as needed.

<a id="paper-2606-25008"></a>

- **Neural Scaling Universality**: This position paper argues that common mechanisms may fix the exponents of language-model scaling laws across many architectures and datasets. It proposes shifting attention to the coefficients, which remain sensitive to design and data choices and determine practical compute-optimal trade-offs; these are theoretical arguments about a universality class rather than a universal empirical guarantee. — [Paper](https://arxiv.org/abs/2606.25008) (2026). Reading priority: Worth reading.

<a id="paper-2606-29858"></a>

- **Smooth Scaling Laws Hide Stepwise Token Learning**: This study explains smooth language-model scaling through many localized token-learning transitions occurring at different times. Sigmoid fits to contextualized token losses yield a learning-time distribution that reconstructs aggregate loss trends, and reshaping training data around when tokens become learnable demonstrates that the same microscopic signal can also guide more efficient training. — [Paper](https://arxiv.org/abs/2606.29858) (2026). Reading priority: Read as needed.

<a id="paper-2603-04971"></a>

- **MoUE (Mixture of Universal Experts)**: Mixture of Universal Experts reuses a layer-independent expert pool across depth to expand the choices available under a fixed per-token activation budget. Structured sharing, exposure-aware load balancing and a router with lightweight trajectory state control the resulting routing complexity, providing an alternative scaling axis through expert reuse rather than simply adding physical depth or width. — [Paper](https://arxiv.org/abs/2603.04971) (Baidu · 2026). Reading priority: Read as needed.

<a id="paper-2604-09175"></a>

- **Generalization and Scaling Laws for MoE Transformers**: This theoretical work separates an MoE Transformer’s active parameter capacity from the complexity of its possible routing patterns. Under specified data and target-function assumptions, it derives generalization, approximation and scaling results, clarifying when extra active capacity or more experts can help and which observed advantages require explanations beyond worst-case statistical bounds. — [Paper](https://arxiv.org/abs/2604.09175) (Academic · ICML 2026). Reading priority: Read as needed.

<a id="paper-2603-21862"></a>

- **Holistic Scaling Laws for Optimal Mixture-of-Experts Architecture Optimization**: This framework jointly characterizes MoE designs by FLOPs per token, active parameters, and total parameters, then reduces a 16-variable architecture search into two lower-dimensional phases. Its updated abstract explicitly reports 670+ models over 10^18 to 3 × 10^20 FLOPs and a widening near-optimal design band at larger scales. These model counts and compute points already existed in the earlier full text; they are clarified evidence, not newly expanded experiments. The resulting architecture-budget mapping can inform recommendation MoE design, but transfer to CTR remains untested. — [Paper](https://arxiv.org/abs/2603.21862) (Fudan University; Hi Lab, Xiaohongshu Inc.; Project Numina · NeurIPS 2026). Reading priority: Worth reading.

<a id="paper-2607-02980"></a>

- **HiLS**: HiLS learns sparse attention chunk selection directly through the language-model objective. Each selected chunk produces its own attention output, and retrieval scores determine how those outputs are combined, making selection trainable end to end; evaluations show strong in-domain quality and substantial context-length extrapolation, including after lightweight conversion of full-attention models. — [Paper](https://arxiv.org/abs/2607.02980) (2026). Reading priority: Read as needed.

<a id="paper-2607-02303"></a>

- **HOLA (Hippocampal Linear Attention)**: HOLA supplements linear attention’s compressed recurrent state with a bounded cache of exact key–value pairs. It retains associations whose committed prediction residual is large and uses a separate sharp retrieval path, preserving facts that compression might overwrite while keeping the usual recurrent memory for broadly compressible structure. — [Paper](https://arxiv.org/abs/2607.02303) (Academic · 2026). Reading priority: Read as needed.

<a id="paper-2607-07386"></a>

- **SDM (Sparse Delta Memory)**: Sparse Delta Memory expands a linear recurrent model’s state without paying for dense access to every memory location. It replaces Gated DeltaNet’s dense key–value update with sparse reads and writes into a larger explicit memory, improving long-context recall at matched compute and parameter budgets; learning the initial memory also benefits knowledge and reasoning tasks. — [Paper](https://arxiv.org/abs/2607.07386) (Meta · NeurIPS 2026). Reading priority: Read as needed.

<a id="paper-2607-08186"></a>

- **Hidden Decoding at Scale**: Hidden Decoding adds internal computation to a fixed Transformer backbone by expanding each token into multiple embedding streams during continued pretraining. Stream-factorized attention limits most interactions to individual streams, keeping expansion affordable and compatible with standard pipeline parallelism; experiments demonstrate a sequence-length-based scaling route without widening or adding backbone layers. — [Paper](https://arxiv.org/abs/2607.08186) (WeChat AI · 2026). Reading priority: Read as needed.

<a id="paper-2607-10034"></a>

- **MLPs are Hebbians**: This work constructs Transformer-compatible feed-forward networks that store and retrieve factual associations with efficient parameter scaling. By analyzing decoding margins as well as storage, it accounts for embedding geometry and demonstrates near-optimal capacity under its assumptions; a proof of concept also edits facts by replacing the corresponding constructed feed-forward module. — [Paper](https://arxiv.org/abs/2607.10034) (Stanford · 2026). Reading priority: Read as needed.

<a id="paper-2607-07706"></a>

- **The Key to Going Linear**: This study isolates recurrent state-update design when replacing softmax attention while freezing the rest of a Transformer. Its analysis connects softmax to key-dependent rank-one projections, motivating delta-style updates and targeted additions such as sink tokens, short convolutions and bounded cache routing to reduce the quality gap in post-hoc linearization. — [Paper](https://arxiv.org/abs/2607.07706) (Qualcomm AI Research · NeurIPS 2026). Reading priority: Read as needed.

<a id="paper-2607-13491"></a>

- **DeepLoop**: DeepLoop adjusts residual scaling for Transformers that revisit shared layers, where gradients from repeated visits contribute to the same parameter update. A perturbation analysis accounts for alignment between those visits and yields a different depth-scaling rule, improving stability and quality once recurrence is introduced rather than treating unrolled depth like independent layers. — [Paper](https://arxiv.org/abs/2607.13491) (2026). Reading priority: Read as needed.

<a id="paper-2607-14530"></a>

- **xHC (Expanded Hyper-Connections)**: xHC expands Transformer residual memory into more parallel streams while addressing the diminishing returns and rising costs of earlier hyper-connections. Richer write-back information and sparse stream updates retain access to the full residual state, while a specialized implementation reduces memory traffic, making residual-stream capacity a more practical language-model scaling dimension. — [Paper](https://arxiv.org/abs/2607.14530) (NeurIPS 2026). Reading priority: Read as needed.

<a id="paper-2607-14018"></a>

- **Transforming Rank**: This paper interprets Transformer block design through the survival of representation and gradient rank across depth at initialization. It shows how residual strength, normalization placement and feed-forward width expansion trade off rank collapse, compositional depth and parameter cost, offering a unifying explanation for architectural choices often discussed only in terms of activation magnitude. — [Paper](https://arxiv.org/abs/2607.14018) (2026). Reading priority: Worth reading.

<a id="paper-2607-16051"></a>

- **Loopie (Loop the Loopies!)**: The Loopie report presents two looped mixture-of-experts language models and examines whether reusing depth can compete with spending the same training compute on a conventional Transformer. Its ablations report gains over compute-matched baselines, and an additional post-training method strengthens reasoning; the abstract does not specify enough detail to reconstruct that training recipe. — [Paper](https://arxiv.org/abs/2607.16051) (2026). Reading priority: Read as needed.

<a id="paper-2603-15031"></a>

- **Attention Residuals (AttnRes)**: Attention Residuals replaces fixed addition of earlier layer outputs with input-dependent attention over depth. This lets layers select useful previous representations instead of diluting them in a growing residual sum, while a blockwise variant and communication optimizations make the approach practical for large-scale training and improve depthwise signal and gradient balance. — [Paper](https://arxiv.org/abs/2603.15031) (Kimi · 2026). Reading priority: Read as needed.

<a id="paper-2607-27230"></a>

- **MHAR (Multi-Head Attention Residuals)**: Multi-Head Attention Residuals lets different feature subspaces independently choose which earlier layers to read. Splitting the routing query into heads removes the single-distribution compromise of ordinary attention residuals without adding parameters, although the head count still needs tuning; fused kernels and identity-preserving conversion improve practicality for training and adapting larger models. — [Paper](https://arxiv.org/abs/2607.27230) (Academic · 2026). Reading priority: Read as needed.

<a id="paper-2602-06154"></a>

- **MoSE (Mixture of Slimmable Experts)**: MoSE makes each expert executable at several nested widths, so conditional computation chooses both which experts to use and how much of each to run. Multi-width training and runtime width selection allow one checkpoint to cover a smoother quality–compute frontier, including budget-aware policies that map router confidence to expert width. — [Paper](https://arxiv.org/abs/2602.06154) (MBZUAI / Amazon · ICML 2026). Reading priority: Read as needed.

<a id="paper-2308-00951"></a>

- **Soft MoE (From Sparse to Soft Mixtures of Experts)**: This Soft MoE forms weighted combinations of input tokens and sends those combined tokens to experts, making expert assignment fully differentiable. In visual-recognition experiments, the design addresses issues such as token dropping and unstable routing while expanding parameter capacity with modest inference cost, demonstrating a way to scale expert capacity through soft token assignment. — [Paper](https://arxiv.org/abs/2308.00951) (Google · ICLR 2024). Reading priority: Read as needed.

<a id="paper-2412-14219"></a>

- **A Survey on Inference Optimization Techniques for Mixture of Experts Models**: This survey organizes mixture-of-experts inference optimization across model, system and hardware layers. It connects techniques such as expert compression and routing to distributed scheduling, load balancing and hardware co-design, providing a map of deployment trade-offs and open challenges rather than proposing one universally best acceleration method. — [Paper](https://arxiv.org/abs/2412.14219) (CUHK / SJTU · ACM Computing Surveys 2025). Reading priority: Read as needed.

<a id="paper-2609-01343"></a>

- **SMELT: Scaling Laws for Compute-Matched MoE Looped Transformers**: SMELT tests looped MoE Transformers while matching per-token computation, non-embedding parameters and key–value cache budgets. Repeating the middle half of the network twice improves the fitted compute–loss frontier and downstream results, with attention analysis suggesting that the second visit reduces sink behavior and focuses more strongly on relevant content. — [Paper](https://arxiv.org/abs/2609.01343) (2026). Reading priority: Worth reading.

<a id="paper-2609-02881"></a>

- **Graph Machine: Towards Better Pretraining via Edges**: Graph Machine maintains a memory that grows with context but accesses only a small, dynamically chosen subset through differentiable pointer-like edges. Replacing most dense-attention layers with these sparse layers keeps sparse-layer complexity linear, and pretraining experiments show that a handful of retrieved tokens per head can preserve much of the dense model’s quality. — [Paper](https://arxiv.org/abs/2609.02881) (2026). Reading priority: Read as needed.

<a id="paper-2608-27763"></a>

- **Fast Weight Attention for Continual Learning (Falcon)**: Falcon treats fast-weight memory updates as online learning and carefully aligns the key–value examples with a prefix-prediction objective. It derives normalized regression and inner-product update families with recurrent and parallel implementations, separating temporal alignment, forgetting and rehearsal; representative variants remain competitive on language modeling and improve arithmetic length extrapolation. — [Paper](https://arxiv.org/abs/2608.27763) (Academic · 2026). Reading priority: Read as needed.

<a id="paper-2609-04575"></a>

- **Training-Free Halving of Activated Experts in Fine-Grained MoE**: The paper shows that reducing activated experts changes both expert selection and the output gain induced by router-probability normalization. Normalizing the selected experts against a separately chosen reference probability mass preserves more quality without retraining, but the best setting differs between perplexity and downstream accuracy, making compression calibration task-dependent. — [Paper](https://arxiv.org/abs/2609.04575) (University of Alberta · 2026). Reading priority: Worth reading.

<a id="paper-2609-40316"></a>

- **Scaling Laws for Looped Mixture of Experts**: Loop Scaling Laws jointly models recurrence, expert sparsity, model size and training data instead of treating looping and MoE as separate scaling mechanisms. A sparsity-dependent mapping estimates the effective capacity gained from reuse, helping choose architectures under compute and memory constraints and explaining how recurrence and sparse capacity can complement each other on reasoning tasks. — [Paper](https://arxiv.org/abs/2609.40316) (Meta AI · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-35751"></a>

- **How to Loop MoE: Flatten the Experts, Untie the Attention**: Foil improves looped MoE design by concentrating experts into fewer, wider expert layers and increasing the number of passes while keeping expert parameters and computation fixed. It also gives each pass separate attention parameters while sharing experts and routers, finding that broader routing choices and pass-specific attention improve pretraining loss and expert utilization. — [Paper](https://arxiv.org/abs/2609.35751) (Case Western Reserve University / Kyoto University / NII LLMC · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-36301"></a>

- **MoRE: Scaling mixture of experts with hardware-aware low-rank routing**: MoRE targets the router itself as a bottleneck when MoE models contain many small experts. A low-rank router factorization reduces scoring cost, with theory supporting compact routing representations under stated assumptions and a fused GPU kernel making the savings practical, allowing more experts within an active-compute budget and improving knowledge-oriented performance. — [Paper](https://arxiv.org/abs/2609.36301) (University of Pennsylvania / The Wharton School · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-31093"></a>

- **Block Sparse Attention with Log-Linear Complexity**: PISA addresses a hidden quadratic cost in sparse attention: choosing relevant blocks can still require scoring every query against every block. It searches a coarse-to-fine key pyramid while keeping the candidate set bounded at each level, achieving log-linear overall complexity with fused routing kernels and competitive language-model quality, particularly on retrieval tasks. — [Paper](https://arxiv.org/abs/2609.31093) (Shanghai Jiao Tong University / Shanghai Innovation Institute / ByteDance Seed · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-36529"></a>

- **Triadic Linear Attention: Three-Dimensional Recurrent States for Long-Context Sequence Modeling**: Triadic linear attention enlarges recurrent memory from a matrix to a three-dimensional tensor using two keys and one value for each write. Two query axes read the resulting state, increasing memory capacity with relatively few additional projections; the construction works with gating, delta updates and chunkwise training and improves long-context modeling and recall. — [Paper](https://arxiv.org/abs/2609.36529) (Massachusetts Institute of Technology / MIT-IBM Computing Research Lab · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-38832"></a>

- **Scaling Parameter and Context in Attention: Native Sparse Attention from Mixture-of-Head**: NAMOH routes each token to a subset of attention heads, and each head stores and attends only to its assigned token history. Head selection therefore controls both active parameters and accessible context; balanced routing can shorten per-head histories as total head count grows, making additional attention capacity compatible with more efficient long-context inference. — [Paper](https://arxiv.org/abs/2609.38832) (Peking University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-34212"></a>

- **X-MoD: Practical Scaling Laws for Sparse-Depth Routing Beyond Mixture-of-Depths**: X-MoD separates token sparsity from the spacing of dense anchor layers, allowing sparse-depth Transformers to grow total capacity without proportionally increasing active computation. Stabilizing gates and token balancing support training, while a fitted scaling law decomposes capacity gains and context-dependent effects to guide routing choices under a specified compute and context budget. — [Paper](https://arxiv.org/abs/2609.34212) (Tsinghua University / Tianjin University · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-32704"></a>

- **CoWindow Attention: Full Causal Coverage Is a Collective Property**: CoWindow Attention distributes distant-history coverage across attention heads instead of making every head revisit the entire past. Heads share local and prefix windows but receive complementary long-range windows, preserving collective causal coverage without a learned router; evaluations show that this structured division can retain strong recall and language-model quality while reducing computation and decoding memory. — [Paper](https://arxiv.org/abs/2609.32704) (HKUST (Guangzhou) / Beijing Academy of Artificial Intelligence / Université Paris Cité · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-38166"></a>

- **LeapQuant: Efficient Linear Attention with Accurate Recurrent State Quantization**: LeapQuant reduces the cost of repeatedly reading and updating linear attention’s recurrent state through training-free low-bit storage. It quantizes only at window boundaries, buffers intervening updates at higher precision and preserves large outliers as compensator tokens, limiting accumulated rounding error while delivering near-baseline quality and faster inference in the evaluated models. — [Paper](https://arxiv.org/abs/2609.38166) (UC Berkeley / University of Washington / MIT / Perplexity AI / NVIDIA · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-39137"></a>

- **ID Balancing: Stable Training of Extremely Sparse MoE via PID-Based Load Control**: ID Balancing treats expert-load balancing as a feedback-control problem for extremely sparse MoE training. Its integral correction scales with load error and its derivative correction activates when imbalance worsens, applying stronger action when necessary and smaller adjustments near balance, improving stability and utilization while retaining competitive language-model performance. — [Paper](https://arxiv.org/abs/2609.39137) (Qwen Team / Alibaba Token Hub / Alibaba Group · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-39034"></a>

- **Switching Linear Attention**: Switching Linear Attention increases the expressiveness of fixed-state recurrent attention by letting each output dimension select among multiple linear components. Derived as online expectation-maximization for a mixture of regressions, its update rule retains bounded recurrent memory while improving associative recall, in-context learning and language modeling relative to simpler linear-attention designs. — [Paper](https://arxiv.org/abs/2609.39034) (Stanford University · COLM 2026). Reading priority: Read as needed.

<a id="paper-2609-35664"></a>

- **MS-GLA: Multi-Scale Gated Linear Attention for Addressing Representational Bottlenecks via Multi-Temporal Resolution**: MS-GLA assigns gated linear-attention heads to different temporal resolutions so local syntax and long-range structure do not compete entirely within the same memory scale. Coarse heads pool longer spans, fine heads retain local detail, and input-dependent fusion combines them, improving effective representation without enlarging each head’s recurrent state. Version 2 corrects the training-budget description to 106,813 steps for all compared models; version 1 listed 68,664 steps for GLA and 106,813 for MS-GLA. The reported abstract and result tables are unchanged, so this is a protocol-description correction rather than a newly demonstrated gain. — [Paper](https://arxiv.org/abs/2609.35664) (International Institute of Information Technology Hyderabad · COLM 2026). Reading priority: Read as needed.

<a id="paper-2609-37379"></a>

- **Looped Transformers as Optimizers**: This paper treats a looped Transformer’s hidden state as a fast weight updated by an implicit local optimization process. The framework exposes mismatches in existing loop transitions and derives OperLoop with decay, adaptive step size and a delta objective, showing that optimizer-inspired transition design can improve looped models under matched training computation. — [Paper](https://arxiv.org/abs/2609.37379) (HKUST (Guangzhou) / StepFun / Shanghai Jiao Tong University / University of Chinese Academy of Sciences / Tsinghua University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-29812"></a>

- **FlashLoop: Fast and Memory-Efficient Looped Transformers via Lazy Updates**: FlashLoop exploits the observation that later loop iterations change only a limited part of a Transformer’s state. Token-sparse updates, sparse attention and quantized differences between successive key–value caches avoid repeated work and storage, translating parameter sharing into practical inference gains while preserving accuracy in the evaluated looped models. — [Paper](https://arxiv.org/abs/2609.29812) (ELLIS Institute Tübingen / Max Planck Institute for Intelligent Systems / Tübingen AI Center · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-36314"></a>

- **Fractional State Space Transition for Long Sequence Modeling**: FRAC gives state-space models a power-law memory profile rather than relying only on exponential forgetting. It approximates fractional dynamics with a finite collection of log-spaced exponential modes, retaining bounded-state decoding and parallel training while improving retention across broad time ranges and long-context performance in the reported language-model experiments. — [Paper](https://arxiv.org/abs/2609.36314) (Huawei Noah’s Ark Lab, Montreal Research Center · NeurIPS 2026). Reading priority: Read as needed.

<a id="paper-2602-04852"></a>

- **On State Reduction in Linear Attention**: This work studies why trained linear-attention states often use only a low-rank portion of their nominal capacity. It connects state rank to key and value structure, then prunes key and query dimensions using hardware-compatible methods, including rank-revealing QR, reducing recurrent memory with modest language-model quality loss in the evaluated settings. — [Paper](https://arxiv.org/abs/2602.04852) (Max Planck Institute for Intelligent Systems / ETH Zürich / ELLIS Institute Tübingen / Tübingen AI Center / Liquid AI · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2605-23893"></a>

- **Complete-muE: Optimal Hyperparameter Transfer and Scaling for MoE Models**: Complete-muE transfers hyperparameters between dense Transformers and varied MoE configurations by separating changes in active width from changes in expert sparsity. Its two-bridge scaling framework accounts for architecture and per-expert token changes, aiming to reuse a dense reference’s tuning across expert counts, granularity and broader training scales with only small empirical shifts in the optimum. — [Paper](https://arxiv.org/abs/2605.23893) (Adobe Research · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-30820"></a>

- **Quantizing Looped Transformers: Feedback Exposure and Calibration Blindness**: This study identifies two quantization risks in looped models: errors introduced outside residual identity paths can re-enter later iterations, and first-step calibration can miss states used by later loops. Gathering calibration statistics across recurrence steps improves low-bit accuracy, highlighting that both the error entry point and calibration coverage matter for post-training quantization. — [Paper](https://arxiv.org/abs/2609.30820) (Meta · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-07816"></a>

- **Kalman Delta Networks: Uncertainty-aware Associative Memory**: Kalman Delta Networks explicitly track uncertainty in a linear-attention memory and use it to decide how strongly new information should modify stored associations. A linear-Gaussian formulation yields Kalman-gain updates, while diagonal and isotropic approximations keep the extra state small and training parallelizable, improving quality over the tested linear-attention baselines. — [Paper](https://arxiv.org/abs/2609.07816) (Yale University · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-32712"></a>

- **MassAlloc Attention: Let Attention Allocate Its Own Compute**: MassAlloc Attention still scores every legal causal interaction but skips much of the subsequent work for interactions with negligible normalized attention mass. A shared tolerance guides adaptive retention during training and inference, reducing post-score computation while keeping output and gradient errors small and preserving the evaluated full-attention capabilities. — [Paper](https://arxiv.org/abs/2609.32712) (HKUST (Guangzhou) / Beijing Academy of Artificial Intelligence / Université Paris Cité · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-31947"></a>

- **On-Policy Attention Linearization**: OPAL trains a linear-attention student on long trajectories generated by the student itself, with dense feedback from a frozen full-attention teacher. This exposes the student to its own accumulating memory errors rather than only clean teacher trajectories, helping recover long-context retrieval and reasoning after attention conversion without additional supervised fine-tuning or reward-based training. — [Paper](https://arxiv.org/abs/2609.31947) (Carnegie Mellon University / Cornell University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-02185"></a>

- **Decoding Looped Transformers Better for (Almost) Free**: LoopCD is a training-free decoding method that contrasts a looped Transformer’s final prediction with an earlier recurrent pass, using either logits with one extra output pass or hidden states with no extra output pass. Across four model families, the abstract reports gains including AIME 2024 pass@1 from 61.88% to 73.33% for Ouro-2.6B-Thinking and HumanEval pass@1 from 22.56% to 31.71% for Huginn. It also reports configurations that halve recurrent loops while matching or exceeding full-depth unguided performance, reducing forward FLOPs by 22.5%–48.2%. — [Paper](https://arxiv.org/abs/2610.02185) (Apple · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-01153"></a>

- **Looping Beyond Twice: A Scalable Recipe for Looped Mixture-of-Experts**: LOOM addresses unstable recurrent states and repeated expert selection in looped MoE language models using residual scaling and embedding re-injection for stability, loop-specific routers to diversify expert selection, and a Looping Residual to preserve earlier outputs. Across 100M–1.7B models it reports stable scaling to 9–12 loops; in a near-iso-FLOP 700M comparison, five loops reduce perplexity from 18.36 to 16.54 and raise average zero-shot accuracy from 38.84% to 39.53%. Separately, without FLOP matching, a 1.7B model trained on 60B tokens peaks at nine loops, improving perplexity from 9.62 to 7.77 and accuracy from 42.4% to 47.7%. — [Paper](https://arxiv.org/abs/2610.01153) (Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences / Peng Cheng Laboratory / University of Chinese Academy of Sciences / The Hong Kong Polytechnic University / University of Surrey / ELLIS Institute Tübingen / Max Planck Institute for Intelligent Systems / Tübingen AI Center · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-40127"></a>

- **Learning Functional Subspaces for Neural Network Compression**: LSP jointly learns orthogonal projections against a frozen model’s output distribution or training objective, then exports shared low-rank factors. It improves compression quality across tested language and vision Transformers and reports faster small-batch decoding and lower weight-plus-KV-cache memory use through a shared attention latent. — [Paper](https://arxiv.org/abs/2609.40127) (Helmholtz Munich; Technical University of Munich; MCML; Orbital Industries; LTCI, Télécom Paris, Institut Polytechnique de Paris; Columbia University; University of Copenhagen; Technical University of Denmark; New York University · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2610-01172"></a>

- **Learning Rate Transfer for Hybrid Transformer-SSM Architectures**: For practical Transformer–SSM hybrids with simplified-ZOH Mamba and fixed state size, original muP with AdamW achieves near-zero learning-rate transfer gaps across tested widths and depths despite failed coordinate checks. The paper attributes this empirical behavior to global update-to-weight invariance and local per-parameter normalization, offering a practical scaling recipe rather than a new asymptotic guarantee. — [Paper](https://arxiv.org/abs/2610.01172) (Seoul National University; SB Intuitions; LG AI Research; Hodoo AI · NeurIPS 2026). Reading priority: Worth reading.

<a id="paper-2610-02816"></a>

- **Gated Slot Attention-2: Two-Sided Associative Memory Correction in Linear Attention**: GSA2 improves fixed-size linear-attention memory by combining key-side Gated Oja Rule-2 correction and value-side Gated Delta Rule-2 correction through shared latent slots. A chunkwise training algorithm supports parallel computation while retaining linear-time sequence processing and constant-memory recurrent decoding; the authors report improvements over strong linear-attention baselines. — [Paper](https://arxiv.org/abs/2610.02816) (The Hong Kong University of Science and Technology (Guangzhou); Tencent · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-02383"></a>

- **The Surprising Effectiveness of Shared Memory in Looped Transformers**: The Looped Prediction Transformer pretrains looped models so later recursions read the first recursion’s full-context KV cache while retaining only a short local window. Across 150M–1B parameters, its hybrid variant with five recursions reduces context memory by 76–79% and lowers FineWeb-Edu validation perplexity by 1.12–1.82 relative to a same-size standard Transformer. The analysis links shared memory to differentiated representations and a direct gradient path to the first recursion. — [Paper](https://arxiv.org/abs/2610.02383) (IBM Research; Cornell University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-02953"></a>

- **SlimKV: Joint Token-Feature KV Cache Compression with Reconstruction-Free Beacon Attention**: SlimKV jointly compresses context tokens into beacon memories and their KV features into low-rank latent representations, with layer-adaptive rank allocation. Training beacon keys without key-side RoPE enables reconstruction-free latent-space decoding. The authors report stronger high-compression LongBench results and retention of over 96% of the uncompressed score at 4×/8× compression. — [Paper](https://arxiv.org/abs/2610.02953) (University of Science and Technology of China; Nanyang Technological University; Tencent · EMNLP 2026). Reading priority: Read as needed.

<a id="paper-2610-04753"></a>

- **More Value per Key: Asymmetric Sparse Attention for Faster LLM Decoding**: SAGA separates key and value head counts in sparse attention, reducing query–key work while preserving more value capacity. Combined with approximate top-N selection, it exceeds 2× end-to-end decoding speedup over the authors’ full-attention GQA baseline at long contexts in models up to 1.5B parameters; the paper also introduces a conversion procedure for pretrained models. — [Paper](https://arxiv.org/abs/2610.04753) (Technion – Haifa, Israel; Crusoe AI; Corma; Stealth Startup · NeurIPS 2026). Reading priority: Read as needed.

<a id="paper-2610-04635"></a>

- **LatentIndex: Cross-Layer Sharing with Layer-Specific Selection for Sparse Attention**: LatentIndex shares continuous latent indexer caches across layers while retaining layer-specific token selection. Four-layer sharing cuts logical indexer-cache storage by 61.1% on DeepSeek-V3.2; hierarchical selection yields 2.30–2.72× decode-indexer speedups across 8K–128K contexts, with long-context evaluation close to native DSA. — [Paper](https://arxiv.org/abs/2610.04635) (Institute for Artificial Intelligence, Peking University; Dots Studio, Xiaohongshu Inc.; Beijing Institute of Technology · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-06833"></a>

- **Towards Looped Models Done Right, Part II: Rethinking at Fixed Points**: This paper learns the recurrence-depth prior and orthogonalizes input injection to improve fixed-point behavior in looped language models. Experiments from 100M to 1.6B parameters link this design to lower perplexity, terminal-KV sharing, faster distilled prefill, and rollout-state RL updates; at 1.6B, a 3× smaller KV cache matches the fixed-depth model’s downstream average. — [Paper](https://arxiv.org/abs/2610.06833) (Institute of Foundation Models (Mohamed bin Zayed University of Artificial Intelligence); USC; CMU · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-06677"></a>

- **How Sparse Probability Maps Shape Mixture-of-Experts Routing**: Matched 300M and 1B top-2 MoE experiments show that sparse probability maps and learned router scores co-adapt, so a map’s ability to output zeros does not determine expert participation. None improves validation loss over softmax, but sparse maps substantially reduce sensitivity to using more experts at inference. — [Paper](https://arxiv.org/abs/2610.06677) (Técnico, Universidade de Lisboa; INESC-ID; Instituto de Telecomunicações; ELLIS Unit Lisbon; Gandara AI · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-05265"></a>

- **Loopy: Low-Bit Quantization Framework for Looped Language Models**: Loopy selects low-bit shared-core representations using final prediction loss at the target recurrent depth, because quantization rankings can change with unrolling depth. It progressively allocates forward-only calibration windows to promising scaling and rotation candidates; on Ouro-1.4B W4A4 it reports 36.5% lower LAMBADA perplexity than SpinQuant. — [Paper](https://arxiv.org/abs/2610.05265) (The Hong Kong University of Science and Technology; Duke Kunshan University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-02815"></a>

- **iS-KV: Online Low-Rank KV Cache Compression via Block-Incremental SVD**: iS-KV retains recent KV states exactly and incrementally compresses older states into bounded-rank representations, updating historical coordinates whenever the basis changes. For long-horizon reasoning, it reports 82.6% accuracy at 4.06× persistent-KV compression on DeepSeek-R1-Distill-Llama-8B and 89.2% at 5.64× on Qwen3-8B, outperforming eviction baselines at matched memory. — [Paper](https://arxiv.org/abs/2610.02815) (The Hong Kong University of Science and Technology (Guangzhou); Guangdong OPPO Mobile Telecommunications Corp., Ltd.; Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences; University of Macau; Shenzhen University of Advanced Technology · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-36636"></a>

- **What Makes Recurrence Effective in Looped Language Models?**: Controlled looped-language-model experiments distinguish the effects of recurrence depth, the allocation of shared versus distinct layers, and state conditioning. Recurrence beyond the training horizon can improve reasoning while hurting knowledge; channel-wise history-state injection with timestep conditioning better preserves knowledge and robustness across inference budgets. — [Paper](https://arxiv.org/abs/2609.36636) (The Chinese University of Hong Kong; MBZUAI · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-05842"></a>

- **HLA: Expressive Hybrid Linear Attention via Chunk-Wise Dynamic Mixing**: HLA augments Gated DeltaNet with query-dependent mixing of chunk-wise affine state transitions. Content-based gates select how each chunk changes recurrent memory, with regularization encouraging sparse use. Experiments on Qwen3.5 adaptations and a 1.3B model trained from scratch report improved long-context retrieval, including evaluation beyond the training context length. — [Paper](https://arxiv.org/abs/2610.05842) (Monash University; Zhejiang University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2609-19107"></a>

- **How Model Growth, Recursion, and Boundary Operators Influence Scaling Exponents**: This study separates model growth, weight sharing and boundary operators when fitting compute–loss scaling laws. Growth during pretraining and normalized reinjection of earlier representations change fitted exponents, while looping also helps in data-limited multi-epoch training. The work offers experimental design ideas for depth scaling, but its roughly 20x GPT-3 compute comparison is explicitly uncontrolled across data and evaluation pipelines and is not a CTR result. — [Paper](https://arxiv.org/abs/2609.19107) (Q Labs; New York University · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2610-10381"></a>

- **ResidualQuant: KV Cache Quantization for Looped Transformers with 2-Bit Residuals**: ResidualQuant uses final-loop key-value states as a reference and quantizes residuals for other loops, combining least-square scaling, rotation-based quantization and loop-wise mixed precision. In the revised experiments on looped language models, near-BF16 accuracy accompanies an 80.7% reduction in theoretical KV storage. On an RTX 5090, the abstract reports up to 3.66-fold fixed-batch decoding throughput, up to eightfold larger batches and up to 5.38-fold peak throughput; these are distinct measured settings, not a general recommendation-serving speedup. — [Paper](https://arxiv.org/abs/2610.10381) (KAIST; Yonsei University; Seoul National University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-10135"></a>

- **Attention via Black-Box Vector Search**: The paper casts sparse attention as priority sampling over black-box vector search, derives retrieval/index trade-offs and proposes an augmented-key estimator. An LLM implementation improves attention approximation against top-k and sampling baselines on long contexts. — [Paper](https://arxiv.org/abs/2610.10135) (Columbia University; University of Pennsylvania · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-09025"></a>

- **SPIN: Shadow Predictive Indexer for Sparse Attention**: SPIN predicts important KV blocks from recent indexing scores, refreshes skipped blocks through random exploration and allocates per-layer block budgets by measured miss rates. The revised MRCRv2 experiments retain near-baseline quality at 50–57% effective block sparsity; vLLM serving reports up to 13.9% higher output throughput and 13.6% lower median inter-token latency. — [Paper](https://arxiv.org/abs/2610.09025) (arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-07207"></a>

- **Distributionally Robust Mixture-of-Experts Training**: DRMoET trains sparse experts for robustness to imperfect routing by emphasizing high-loss expert outcomes with an entropy-regularized, moving-average objective. Two MoE scales show stronger downstream performance and lower expert-loss variance without changing standard sparse computation. — [Paper](https://arxiv.org/abs/2610.07207) (New York University; Center for Data Science, NYU Shanghai · NeurIPS 2026). Reading priority: Worth reading.

<a id="paper-2610-07348"></a>

- **Stepped MoE: Segment-Level Routing with Configurable Inference Complexity**: Stepped MoE combines nested elastic subnetworks with segment-level expert routing so one checkpoint supports several active-parameter budgets. It reports stronger language-model accuracy than matched dense models while targeting flexible memory and compute constraints. — [Paper](https://arxiv.org/abs/2610.07348) (Apple · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-10114"></a>

- **Mechanics of Long-Context Hybrid Models Part 1.1: From Hybrid Attention to Hybrid Position**: The paper compares full-attention hybrids using sliding windows or gated linear attention and links their different context-extension behavior to positional biases. It proposes sliding-window linear attention and reports stronger training-free length extrapolation in the tested models. — [Paper](https://arxiv.org/abs/2610.10114) (Fudan University; Shanghai Innovation Institute; OpenMOSS Team · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-09342"></a>

- **Shared Low-rank Basis Factorization for Data-free Mixture-of-Experts Compression**: Shared Low-rank Basis Factorization (SLBF) compresses MoE expert weights without calibration data, preserving expert identities and router parameters; compressed hidden states can still change later-layer routing. Shared rank-k bases enable richer cross-expert reconstruction under a fixed parameter budget, and gauge fixing removes redundant factor parameters. Experiments cover five MoE LLM architectures from 16B to 122B parameters and compare pruning, merging, and weight-reconstruction methods. — [Paper](https://arxiv.org/abs/2610.09342) (Kyoto University; The University of Tokyo; RIKEN AIP · EMNLP (Findings) 2026). Reading priority: Read as needed.

<a id="paper-2610-11317"></a>

- **DivMoE: Fine-Grained MoE Upcycling via Cross-Domain Expert Composition**: DivMoE addresses routing collapse when fine-grained MoE experts are upcycled from a single dense model. It initializes experts from domain-specialized dense models and constrains each token to select experts from distinct domain groups. Across two base models and 15 language-model benchmarks, it reports 55.6% versus 51.6% average accuracy for the strongest baseline on Qwen3-1.7B; a 12B variant reaches 64.5% after supervised fine-tuning. Applying this expert-diversity design to recommendation is a transfer hypothesis, not demonstrated CTR evidence. — [Paper](https://arxiv.org/abs/2610.11317) · [Publication](https://neurips.cc/virtual/2026/poster/153517) (School of Computing, National University of Singapore, Singapore; Department of Computer Science and Engineering, Shanghai Jiao Tong University, Shanghai, China · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-11575"></a>

- **Smoothing the Top-k Exposure Boundary for Sparse Mixture-of-Experts**: Elastic Expert Routing softens the training-time top-k boundary by sampling the active expert count from a local symmetric distribution around k. This matches the expected expert-compute budget while retaining a fixed inference budget. The paper reports supervised-fine-tuning macro-average gains of 0.84 and 2.02 points on OLMoE-1B-7B and Qwen3-30B-A3B, plus a 1.6-point gain in from-scratch pretraining. Its relevance to recommendation MoE training is inferred; the evaluations do not establish CTR gains. Version 2 adds comparisons against Noisy top-k, expert FFN dropout, and DefaultMoE under static top-8 inference, reporting the best average scores in the tested Qwen3 fine-tuning and pretraining settings and up to 0.04 lower validation LM loss than static routing. — [Paper](https://arxiv.org/abs/2610.11575) (Shanghai AI Laboratory; Shanghai Jiao Tong University; Nanyang Technological University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11214"></a>

- **Bridging KV-Cache Quantization and Linear Attention: From Theory to Pretrained Weight Migration**: This work connects KV-cache quantization and linear attention through RAM-Net soft assignments over discrete addresses with recurrent continuous slot states. Under a restricted construction, the read–write overlap locally approximates full-attention similarity and enables a soft-quantized intermediate path for pretrained-weight migration. Across nine 0.3B–7B teachers and six commonsense/knowledge tasks, migration with 500M tokens per model recovers 87.1% of teacher accuracy gains above random guessing on average. Reusing the mechanism for long recommendation histories is an inference, not CTR evidence. — [Paper](https://arxiv.org/abs/2610.11214) (The Chinese University of Hong Kong · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11201"></a>

- **PageWeaver: KV-Guided Query Unions for Sparse Attention**: PageWeaver groups sparse-attention queries by selected-KV-page affinity while preserving each query’s original support and output ownership. On H200 with FP8 KV, its Union8 implementation reports a 1.70× geometric-mean complete-call speedup over the measured FlashInfer path across six captures. Whole-model prefill throughput is 7.88–14.36% above the tested native path, but incremental regrouping adds only 0.47–0.73% median throughput at 32K/64K and regresses at 8K; B300 results also show limits. Recommendation-serving applicability is an inference, not measured CTR or recommendation-system evidence. — [Paper](https://arxiv.org/abs/2610.11201) (SenseTime · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11158"></a>

- **Zepp: Accelerating Distributed MoE Serving under Relaxed Balance Constraints**: Zepp treats load balance as a resource constraint and directly optimizes bottleneck communication in distributed MoE serving. It coordinates expert-replica placement, split/merge communication, execution scheduling, and dynamic intra-node expert movement. Against seven systems it reports up to 6.68× MoE-layer speedup and 1.86× geometric-mean speedup over the fastest competitor; the maximum 6.68× is specifically against A2AV+GEMM, not the fastest competing baseline. Transfer to distributed recommendation MoEs is a systems hypothesis, with no CTR evaluation. — [Paper](https://arxiv.org/abs/2610.11158) (UCSD; Stanford University; ETH Zürich; Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-10871"></a>

- **Sparse Attention Is Matrix Approximation, Not Choosing from a Bag of Values**: MASA reframes sparse-attention selection as preserving a matrix–value product rather than selecting entries solely by attention magnitude. It replaces sparse-unit ranking with a closed-form approximation-error reduction score while retaining existing sparse kernels and budget rules. Experiments across multiple sparse-attention methods, LLM backbones, and long-context benchmarks report consistent average-score gains with negligible measured scoring overhead. Using this selection criterion for long recommendation histories remains a transfer inference, not demonstrated CTR evidence. — [Paper](https://arxiv.org/abs/2610.10871) (Stony Brook University; Duke University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-07940"></a>

- **Hybrid Latent Attention for Looped Language Models**: Hybrid Latent Attention reduces the KV-cache multiplication caused by reusing Transformer layers across loops. It retains exact recent keys and values in a sliding window and stores older tokens as directly readable compact latents. On frozen 1.4B and 2.6B Ouro backbones with four loops, the authors report a 10.7× cache reduction per token and retention of over 97% of original accuracy on their math, knowledge, and reasoning benchmarks. The design suggests a cache-sharing direction for recurrent recommendation architectures; no CTR experiment is reported. — [Paper](https://arxiv.org/abs/2610.07940) (Virginia Tech; Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-10623"></a>

- **Recurrent Self-Improvement: Dynamic Cross-Loop On-Policy Distillation for Looped Language Models**: LoopOPD trains an intermediate loop of a shared-parameter language model from a terminal-loop teacher using student-generated rollouts. Its dynamic variant refreshes the teacher as the shared model changes, turning extra recurrent computation into a source of dense distillation supervision. Experiments on Ouro-Thinking models report gains in mathematical reasoning and transfer to general reasoning and code tasks. This offers a possible training-compute versus inference-depth trade-off for recurrent ranking models, but that recommendation application remains untested. — [Paper](https://arxiv.org/abs/2610.10623) (ShanghaiTech University; Fudan University; Southeast University; Peking University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-07809"></a>

- **MASKerade: Token-Routed Mask Experts for Dense-to-MoE Upcycling**: MASKerade constructs token-routed experts as learned sparse masks over a frozen dense feed-forward network, rather than storing independent expert weight matrices. Jointly trained routing and binary-mask scores support several sparsity granularities; the main setup selects two of four half-dense 2:4 experts. Five vision-language benchmarks and compute-matched controls examine the benefit of learned connectivity. The method is relevant to memory-conscious MoE expansion in ranking, but nominal arithmetic equivalence does not establish equal serving latency or CTR gains. — [Paper](https://arxiv.org/abs/2610.07809) (Northeastern University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-04140"></a>

- **ExpertMuon-Compass: Alignment-Guided Step Sizes for Mixture-of-Experts Training**: ExpertMuon-Compass adapts Muon step lengths separately for MoE experts whose token distributions change during training. It combines layer-relative gradient/update alignment with a row-alignment radius while retaining Muon's update direction and momentum state. FineWeb-Edu and changing multilingual-data experiments compare it with Muon, NorMuon, and other optimizers. It suggests an optimization control for heterogeneous routed training in recommendation, although the reported evidence is from language models rather than CTR systems. — [Paper](https://arxiv.org/abs/2610.04140) (University of Texas at Austin · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11775"></a>

- **RouterInterp: Understanding Superposed Specialisation in Mixture of Experts Routing**: RouterInterp examines whether MoE experts specialize in combinations of fine-grained features rather than one coherent domain. It identifies sparse-autoencoder features predictive of routing and uses them to form natural-language explanations. Experiments on gpt-oss-20b compare explanation detection accuracy with token-statistics methods. This is a diagnostic reference for interpreting expert specialization in recommendation MoE, not evidence that a particular routing design improves CTR. — [Paper](https://arxiv.org/abs/2610.11775) · [Publication](https://proceedings.mlr.press/v306/lasy26a.html) (TU Wien; Independent; UK AI Security Institute · ICML 2026). Reading priority: Unrated.

<a id="paper-2610-06116"></a>

- **ORCA: The Annealed Spectral Conditioning Optimizer for Faster, Better LLM Training**: ORCA temporarily adds soft orthogonality regularization to Muon during early training, then removes it to let weights adapt freely. Experiments across LLaMA, Qwen3 and fine-grained MoE models from 130M to 8B parameters report improved optimization and validation loss with minimal overhead and no architectural changes. — [Paper](https://arxiv.org/abs/2610.06116) (Peking University; Kling Team · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11134"></a>

- **QUILT: Rethinking Sparse-Attention Prefill through Shared Query Execution**: QUILT shares overlapping KV entries across neighboring sparse-attention queries, using regular set decomposition, pipelining and hierarchical reuse to reduce redundant memory traffic. Evaluation uses GLM-5.3 and DeepSeek-3.2 on LongBench with 16 Ascend 910C NPUs. The transferable idea is cross-query reuse in sparse long-history computation; benefits depend on overlap and hardware layout, and tile-aware tail pruning means the complete method is not purely lossless reuse. — [Paper](https://arxiv.org/abs/2610.11134) (Huawei Technologies Co., Ltd. · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11570"></a>

- **Scaling to Tens of Thousands of Test-Time Iterations with Loop-Native Attention Residuals**: InfiLoop adds loop-native attention residuals that combine content-dependent weights and temporal decay to retain useful recurrent states. An exact streaming update keeps aggregation memory constant as loop count grows. A 7M-parameter model is evaluated on algorithmic reasoning tasks including Sudoku and ARC-AGI-2. It is a mechanism reference for recurrent-depth stability, not evidence that thousands of iterations are practical or beneficial for latency-constrained ranking. — [Paper](https://arxiv.org/abs/2610.11570) (The Hong Kong Polytechnic University; Independent Researcher; Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences; Peng Cheng Laboratory; University of Chinese Academy of Sciences; ELLIS Institute Tübingen; Max Planck Institute for Intelligent Systems; Tübingen AI Center; Shenzhen University of Advanced Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-09179"></a>

- **LayerRoPE: Dynamic Depth-wise Magnitude & Angular Superposition**: LayerRoPE replaces layer-specific normalization gains with a shared vector and depth-conditioned magnitude and rotation, regulating what Transformer blocks read and write along depth. Language-model scaling experiments and transfers to looped models and vision Transformers report improved convergence; its relevance to deeper CTR models is a transfer hypothesis, not a demonstrated ranking result. — [Paper](https://arxiv.org/abs/2610.09179) (University of Rochester · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-06750"></a>

- **Balancing Memory Pathways: Analyzing and Improving Memory Utilization in Hybrid LMs**: The paper finds that recurrent–attention hybrid language models underuse their recurrent state, and adds an auxiliary supervised pass that masks attention to earlier context while preserving recurrent access to the full sequence. Experiments on long-context question answering and agentic tasks report better memory coordination and overall performance; applying this objective to hybrid user-history rankers remains untested. — [Paper](https://arxiv.org/abs/2610.06750) (UNC Chapel Hill; The University of Texas at Austin; Mila; Yale University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-09051"></a>

- **A Self-Pruning Transformer: Extreme KV-Cache Compression with Universal Attention**: Universal Attention combines learned decay mechanisms with RoPE and softmax attention to adaptively evict low-contributing KV entries. Language and synthetic-task experiments report strong cache compression and competitive performance, but aggregation tasks, additional mask computation, and incomplete inference optimization limit direct deployment claims; transfer to compressed user-history attention is unverified. — [Paper](https://arxiv.org/abs/2610.09051) (IBM Research; SSAIL Lab, University of Illinois Urbana-Champaign · COLM 2026). Reading priority: Unrated.

<a id="paper-2610-12448"></a>

- **One Block, Multiple Depths: Recurrent Vision Transformers with Depth-Programmed Experts**: reViT recurrently applies one Transformer block and uses normalized depth to merge a shared FFN expert bank into one dense FFN per step. ImageNet training and DINOv2 distillation show substantial parameter-storage savings at comparable inference FLOPs, while fixed-depth materialization trades compact storage for ordinary dense execution; CTR transfer and inference acceleration are not established. — [Paper](https://arxiv.org/abs/2610.12448) (Samsung AI Cambridge; Technical University of Iasi; Queen Mary University of London · arXiv 2026). Reading priority: Unrated.

<a id="paper-2609-13205"></a>

- **Self-Indexing Attention for Compression-Compatible Sparse Long-Context LLM Inference**: Self-Indexing Attention reuses transformed key-sign bits as a token-retrieval index for both prefill and decoding, while remaining compatible with separate low-bit KV compression. At 5% attention density, LongBench and RULER results remain close to dense attention; the reported operator speedups are not end-to-end gains. A Qwen3.5-9B 64K-context test instead reports a 1.35× time-to-first-token speedup and 1.23× higher steady decoding throughput. The reusable-index design may inform long-history serving, but recommendation transfer is untested. — [Paper](https://arxiv.org/abs/2609.13205) (Hunan University; Tencent · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11784"></a>

- **Compile the Table: Query-Calibrated Operator Compression for Tabular In-Context Learning**: QCOC compiles fixed tabular in-context examples into reusable joint-KV prototypes, preserves cluster multiplicities, and calibrates values with a closed-form fit. Compressing 8,192 examples to 512 slots yields 10.5× cache compression and 1.98× faster online single-core CPU inference than full context over 1,000 queries, excluding compilation. A separate adult-dataset measurement takes 283.4 seconds to compile, and Covertype loses 4.27 accuracy points. The reusable-memory design is relevant to serving economics; transfer from exchangeable examples to ordered recommendation histories is untested. — [Paper](https://arxiv.org/abs/2610.11784) (JD.COM · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-12338"></a>

- **VFold: Symmetry-Aware Cross-Layer Value Cache Compression**: VFold uses calibration to align adjacent layers’ value representations, folds the maps into attention weights, and then approximately merges value caches. Halving value storage reduces total KV memory by 25%, retaining over 98% of aggregate LongBench and RULER scores on three tested models. In an A100 test, capacity rises from 33 to 38 sequences, but batch-one decoding slows from 21.0 to 27.8 ms per token. It provides a memory-capacity tradeoff for long-context serving, rather than guaranteed latency or recommendation gains. — [Paper](https://arxiv.org/abs/2610.12338) (Johns Hopkins University; George Mason University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13735"></a>

- **Orthros: Phase-Aware Heterogeneous Attention for Efficient Transformers**: Orthros changes attention computation by phase: linear-complexity prefill is paired with full-attention decoding. Language-model pretraining, conversion, and recall evaluations support the design for long prompts with comparatively short generation; the reported 21.9× prefill speedup occurs at one-million-token length and is not a universal end-to-end gain. Its phase-aware design may inform long-history processing, but CTR transfer has not been demonstrated. — [Paper](https://arxiv.org/abs/2610.13735) · [Official venue](https://neurips.cc/virtual/2026/poster/154037) (The Hong Kong Polytechnic University; University of Chinese Academy of Sciences; Independent Researcher; University of Sydney · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-13674"></a>

- **Not All Dimensions Are Equal: Outlier-Aware Attention Linearization with Grouped Quadratic Kernels**: OAL approximates pretrained attention with a positive quadratic kernel whose coefficients distinguish outlier dimensions and share parameters within contribution-scale groups. On Qwen2.5-0.5B, frozen-attention relative MSE falls about 8.9% versus DiJiang; matched middle-layer conversion with LoRA lowers WikiText-103 perplexity from 31.71 to 27.50 versus a learned global quadratic, while retaining a gap to adapted softmax. Linear sequence-length complexity assumes fixed head dimensions; recommendation and production speed gains remain untested. — [Paper](https://arxiv.org/abs/2610.13674) (The Chinese University of Hong Kong, Shenzhen; Beijing Normal University, Zhuhai; National University of Singapore · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13630"></a>

- **Multi-Stream Attention Residuals**: MSAR extends Attention Residuals to multiple depth-attention streams, deriving contextual views with multi-scale causal convolutions and mixing their retrieved representations. It retains single-stream stored sources and expands them on demand. In 18B and 28B MoE pretraining, it improves all 12 reported downstream benchmarks over the compared residual variants; scaling fits imply 1.58× iso-loss compute efficiency versus standard residuals. This is a depth-scaling design reference, not measured CTR improvement or 1.58× wall-clock training acceleration. — [Paper](https://arxiv.org/abs/2610.13630) (Shanghai Jiao Tong University; Shanghai Innovation Institute; Xiaohongshu; Peking University; Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13474"></a>

- **CompileMask: Bridging the Gap Between Expressiveness and Efficiency in Attention Masking**: CompileMask compiles region-based visibility rules into metadata-driven preprocessing kernels and compact endpoint descriptors, reducing custom attention-mask overhead. It tests HSTU, shared-prompt, local multimodal, and causal patterns on Blackwell GPUs. Qwen3-8B training with packed KuaiRand length traces and HSTU masks reaches 1.33× the throughput of FlexAttention with the FA4 backend. This directly informs custom-mask implementation for recommendation, but does not measure recommendation accuracy gains. — [Paper](https://arxiv.org/abs/2610.13474) (Beijing University of Posts and Telecommunications; JD; Peking University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13708"></a>

- **Adaptive DHiSparse: Speculative Decoding over a Load-Adaptive KV Hierarchy**: Adaptive DHiSparse combines load-adaptive GPU/host KV residency with draft-model speculative decoding, sharing missing-row retrieval while preserving the draft and acceptance rules. On B300 hardware with GLM-5.3, 100K context, and concurrency 128, it reports 793 output tokens/s per decode GPU, 1.45× HiSparse; prepared prefixes are reused in these workloads. It offers a memory-admission and serving co-design reference for long histories, while transfer to ranking workloads and broader request distributions remains unverified. — [Paper](https://arxiv.org/abs/2610.13708) (Umans AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-11730"></a>

- **Spectral Weight Decay: Inducing Low-Rank Structure in Neural Network Weights**: Spectral weight decay applies additive shrinkage to singular values after each optimizer step, encouraging weights that tolerate later low-rank factorization. Across 124M–500M LLaMA models, it improves SVD-LLM compression at matched validation loss. The 500M model reaches 1.89× compression and 1.18× GPU forward-pass speedup at a 4% validation-loss distortion budget; the latency test uses batch size 256. It suggests co-designing training regularization and serving compression, without establishing low-batch or recommendation gains. — [Paper](https://arxiv.org/abs/2610.11730) (Basic Research of Artificial Intelligence Laboratory (BRAIn Lab); SB AI Lab; Innopolis University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-12599"></a>

- **STAPLE: Static Sparse Upcycling of Pretrained Checkpoints via Embedding Modules**: STAPLE adds token-indexed embedding memory as a residual path while retaining pretrained feed-forward computation, expanding sparse capacity without starting pretraining over. OLMo-2 1B and 7B experiments support gains over continued dense training. In its throughput-oriented setup, host offloading and caching roughly the most frequent 5% of embeddings keep generation throughput within 1.5% of the dense baseline. Token-specific memory offers a possible recommendation-scaling design; host memory and transfer costs remain, and no CTR gains are established. — [Paper](https://arxiv.org/abs/2610.12599) (Carnegie Mellon University; D. E. Shaw Research; Meta AI; Amazon Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13370"></a>

- **Overcoming Data Imbalances with Expert Selection Biases**: Category-conditioned expert-selection biases steer low-resource categories toward dedicated expert subsets while permitting cross-category sharing. The study evaluates multimodal, multilingual, and multi-domain MoEs up to 10.6B total parameters and finds benefits for scarce categories. It suggests a controllable way to allocate sparse capacity across recommendation domains, but that transfer is untested. Training requires category labels and allocation choices; the bias can be removed at inference, avoiding inference-time category labels. Strong load-balancing regularization can suppress the effect. — [Paper](https://arxiv.org/abs/2610.13370) (EPFL · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-12657"></a>

- **Kronecker Product Attention: Memory-Efficient KV Compression via Structured Factorization**: KPA represents keys and values as sums of Kronecker products of compact token-dependent matrix factors and applies compatible rotary position transformations directly to those factors. Across four language-model scales and nine benchmarks, the paper reports competitive accuracy with up to 10x KV-cache compression. Its structured factorization may inform memory-efficient long-sequence recommendation architectures; these language-model results do not establish CTR improvements or equivalent end-to-end serving speedups. — [Paper](https://arxiv.org/abs/2610.12657) (Huawei; University of Waterloo · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13778"></a>

- **ReplaySSM: Cache SSM Inputs, Not State**: ReplaySSM represents recurrent state with a checkpoint plus recent inputs, deferring checkpoint writes and supporting cheap speculative rollback. Separate state precisions prevent low-precision output reads from feeding rounding error back into recurrent updates. At batch size 256, four hybrid language models obtain 1.20–1.47x standard-decoding speedups over tuned vLLM. It informs memory-traffic optimization for recurrent sequence models; batch-one results are below parity, and recommendation benefits remain untested. — [Paper](https://arxiv.org/abs/2610.13778) (Princeton University; NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13328"></a>

- **DuoRate: Two-Rate Per-Expert Precision Allocation for Mixture-of-Experts Serving**: DuoRate separates precision budgets for storing all MoE experts and reading selected experts during batch-one decoding. Label-free prefill profiles drive workload-specific per-expert allocation. On Qwen3-30B-A3B, quality matches evaluated 4-bit formats at a layout-derived read budget of 2.9 bits per weight. The prefix-read kernel and end-to-end traffic/latency measurements remain future work. This allocation principle may inform recommendation MoEs, but that transfer is untested; larger batches narrow the store-read distinction. — [Paper](https://arxiv.org/abs/2610.13328) (Huawei Technologies · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-12327"></a>

- **SparseDecoding: Decoding-Aware Pruning for Accurate and Efficient LLM Inference**: SparseDecoding calibrates pruning on activations from dense-model autoregressive generation rather than fixed natural text, then pairs it with an N:M sparse matrix-vector kernel suited to decoding. Llama and Qwen experiments on A100 GPUs report up to 1.48x end-to-end decoding speedup versus dense execution. It offers a workload-matched calibration and sparse-kernel design for efficient models; long-output generation is the evaluated setting, so ranking-serving gains require separate validation. — [Paper](https://arxiv.org/abs/2610.12327) (Westlake University; Ant Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13767"></a>

- **DualQuant: Dual-scale Calibration-free Weight-and-Activation Quantization for LLMs**: DualQuant jointly optimizes weight-reconstruction scales and obtains per-channel activation rescaling without calibration data, supporting MX and NVFP4 formats. Llama and Qwen evaluations compare accuracy across formats; a packed W4A4 path for Llama-3.1-8B on RTX 4090 reports up to 2.61x memory reduction and 2.46x throughput speedup over BF16. It suggests a calibration-free compression route for scalable models, but recommendation transfer and hardware-specific efficiency need separate measurement. — [Paper](https://arxiv.org/abs/2610.13767) (d-Matrix · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-08527"></a>

- **PHBA: Prefix-State Hybrid Block Attention**: PHBA couples top-k block-sparse token retrieval with a compact recurrent prefix state for each retrieved block, combining precise long-range evidence and compressed preceding context. A streaming Triton implementation avoids large intermediates; 760M and 1.3B language-model experiments compare long-context and retrieval performance with linear and hybrid baselines. The architecture suggests a way to combine search and compressed history for recommendation, but the paper does not evaluate CTR tasks. — [Paper](https://arxiv.org/abs/2610.08527) (The Hong Kong University of Science and Technology (Guangzhou); Independent researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-18654"></a>

- **Kwai Summary Attention V2 Technical Report**: Kwai Summary Attention V2 addresses hybrid summary-token/full-attention models whose shared compression granularity restricts KV-cache flexibility and whose full-attention layers still incur quadratic prefill cost. Summary tokens serve both as compressed key/value memory and as sparse indexers, enabling layer-specific compression and selective access. It offers a possible design direction for long-history compression, but the reported experiments concern language models rather than CTR ranking. — [Paper](https://arxiv.org/abs/2610.18654) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-18809"></a>

- **Depth Memory**: Depth Memory unifies residual and cross-layer aggregation as memory retrieval. Its Linear Depth Memory variant uses recursive least squares and three depth streams, with a hardware-aware implementation that reduces overhead relative to its naive implementation. It reports the lowest perplexities among tested PreLN, mHC and AttnRes baselines at 400M and 1.5B, with competitive zero-shot accuracy. This suggests a depth-scaling direction for ranking models, but no CTR experiments establish transfer. — [Paper](https://arxiv.org/abs/2610.18809) (ELLIS Institute Tübingen; Max Planck Institute for Intelligent Systems, Tübingen; Tübingen AI Center; ETH Zürich; Liquid AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17637"></a>

- **Mixed Precision Scaling Laws for Quantized Pretraining**: This mixed-precision scaling law separates capacity loss from persistent optimization error in forward and backward quantization. Selected 4-bit Qwen3 experiments and published Llama-style results yield up to 11× lower loss-prediction MSE than prior laws. A hardware-aware cost model jointly chooses model size, tokens and layer-wise precision, predicting higher optimal precision at larger budgets. This informs possible ranking-training budget studies, not demonstrated CTR gains or measured end-to-end acceleration. — [Paper](https://arxiv.org/abs/2610.17637) (Seoul National University; Amazon Annapurna Labs · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-16147"></a>

- **BARTER: Compact Dynamic Sparse Training with Standard Dense Kernels**: BARTER dynamically prunes and clones attention heads and FFN channels while physically resizing tensors and optimizer states, allowing standard dense kernels to train compact models. Vision-transformer experiments at densities 0.1–0.7 report competitive accuracy, up to 6.29× faster measured training segments and 81.3% lower peak allocated GPU memory on L40 versus full-tensor DST implementations. These are segment benchmarks, not complete-run speedups; ranking transfer remains untested. — [Paper](https://arxiv.org/abs/2610.16147) (Northwestern University; Arm Inc. · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17959"></a>

- **Virtual Head Attention**: Virtual Head Attention uses linear query premixing and low-rank head postmixing that fold into standard GQA-2 at inference. Across four 50B-token pretraining scales, it reports better evaluated quality with smaller KV caches; the dense comparisons use GQA-8 and the MoE comparison GQA-4. A separate matched long-context MoE study reduces KV heads only in full-attention layers. Its cache/quality tradeoff suggests ranking-attention designs, but no CTR results establish benefit. — [Paper](https://arxiv.org/abs/2610.17959) (Baidu Inc.; Peking University · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-14219"></a>

- **Learnable Low-Rank Polynomial Sketch for Effective Linear Attention**: LLoPS learns low-rank polynomial feature sketches for linear attention, aiming to reduce approximation error relative to existing polynomial-kernel constructions. It reports strong results against tested linear-attention baselines across language and long-range benchmarks. The language study adapts BASED checkpoints with matched continued training for the BASED comparator. The theoretical approximation result is not a guarantee of better task accuracy; possible long-history ranking use remains untested. — [Paper](https://arxiv.org/abs/2610.14219) (University of California, Los Angeles · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-15715"></a>

- **History Replays Itself: Unleashing Long-Context Capability in Linear Attention**: NoteBank adds a training-free episodic archive to pretrained recurrent models: it stores selected text before future queries are known, retrieves with native model features, and replays evidence through the original backbone. At one million tokens, Gated DeltaNet mean accuracy on six RULER retrieval tasks rises from 1.7% to 70.3%. Its small analytical-FLOPs overhead is not negligible wall-clock overhead, and the storage comparison excludes model weights and transient allocations. Long-history ranking is a possible transfer direction, not a tested CTR result. — [Paper](https://arxiv.org/abs/2610.15715) (King Abdullah University of Science and Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-20456"></a>

- **The COUNT: Counting N-grams Unlocks Scaling on Host Memory and Training-Free Adaptation**: COUNT stores precomputed n-gram counts in host memory and uses those frequencies to combine the language model’s output embeddings into additional input embeddings, without a separately learned n-gram table. In 1B-parameter pretraining, the authors report validation-loss gains comparable to spending 57% more estimated training compute on the baseline; changing count tables also enables training-free domain adaptation. Separating cheap stored statistics from active computation is relevant to memory-heavy recommendation designs, but the reported gains are language-model results, not CTR measurements. — [Paper](https://arxiv.org/abs/2610.20456) (University of Washington; Allen Institute for AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-19975"></a>

- **LatentLoop: Scaling Looped MoE Models with Asymmetric Compute Allocation**: LatentLoop allocates unequal computation to two visits of a shared MoE block: the first uses a compressed sequence, the second keeps full resolution, and saved compute increases model width. It shares expert weights but separates attention parameters and learns writeback strength. Across 15 configurations from 1.3B to 7B parameters, validation NLL improves; fitted curves at NLL 1.988 predict 19.0% and 7.9% less compute than vanilla and looped MoE baselines. These are fitted language-model savings, suggesting a budget-allocation hypothesis for recommendation rather than established CTR gains. — [Paper](https://arxiv.org/abs/2610.19975) (SJTU; Shanghai AI Lab; USTC; CUHK; NTU · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-19026"></a>

- **Joint Subspace Sparse Attention for Efficient Long-Context Decoding**: JSSA preserves query–key ranking information in a shared low-dimensional subspace and pairs token selection with an indexed-attention kernel that avoids gathering scattered cache entries. Tests across several attention architectures retain accuracy close to full-cache attention; on one NVIDIA B200 at 128K context with a 2,048-token KV budget, reported decoding throughput reaches up to 6.43 times the full-cache baseline. The transferable lesson is to optimize selection quality and memory access together for long histories; the experiments concern LLM decoding and do not establish recommendation serving gains. — [Paper](https://arxiv.org/abs/2610.19026) (Seoul National University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-18451"></a>

- **FastEEP: Fast Intra-Instance Elastic Scaling for Expert-Parallel MoE Serving**: FastEEP resizes expert-parallel groups inside a running MoE serving instance by separating reusable execution state from configuration-dependent resources. Reusing worker, GPU-memory and communication state avoids destroying and rebuilding the whole instance. Across the tested models, scaling operations are 4.5–11.7 times faster than a vLLM-based approach. This is reconfiguration speed, not token-generation throughput; the design offers a systems reference for elastic sparse-model serving, with recommendation-specific workloads still requiring validation. — [Paper](https://arxiv.org/abs/2610.18451) (Shanghai Jiao Tong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-15709"></a>

- **Preserving Updates in Low-Bit Recurrent State Quantization**: The paper targets low-bit recurrent-state quantization, where repeated rounding can discard small updates and create correlated errors. A low-rank bypass accumulates these updates, while bounded directional rounding prevents harmful update reversals without extra storage for that rounding rule. Tests on Gated DeltaNet, GLA, Mamba2 and RetNet outperform INT4, with up to 5.3-fold state-memory reduction and 1.9-fold decoding speedup versus FP32 states. Preserving update direction is a useful hypothesis for compressed recommendation histories; the evidence remains on the tested recurrent models. — [Paper](https://arxiv.org/abs/2610.15709) (The Chinese University of Hong Kong · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-16368"></a>

- **LoopQuant: Accurate and Efficient Post-Training Quantization for Looped Transformers**: LoopQuant adapts post-training quantization to repeated use of shared Transformer blocks. It canonicalizes cross-loop activation distributions, allocates activation precision by loop sensitivity and interactions, and calibrates the resulting low-bit trajectory. On Ouro-2.6B, the authors report that W4A4 exceeds the tested W4A8 baselines and gives a 1.7-fold decoding speedup versus BF16. This provides a loop-aware compression recipe for parameter-sharing architectures; the reported efficiency and accuracy do not establish gains for CTR models or other hardware configurations. — [Paper](https://arxiv.org/abs/2610.16368) (Peking University; Houmo AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-15124"></a>

- **ShellElastic: Scalable Elastic Pretraining with Simultaneous Maximal Updates and Hyperparameter Transfer**: ShellElastic trains nested subnetworks inside one shared Transformer by arranging hidden matrices as a dense core with block-lower-triangular shells. A full-width forward pass preserves each smaller network’s exact hidden-state prefix, enabling a fixed joint-training graph. Its maximal-update extension supports simultaneous subnetwork updates and hyperparameter transfer, with experiments comparing MatFormer, fully elastic and separately trained models. This is relevant to producing recommendation models for multiple serving budgets without wholly separate pretraining runs; recommendation-specific transfer remains untested. — [Paper](https://arxiv.org/abs/2610.15124) (Rutgers University; Adobe Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14754"></a>

- **GateSight: Recurrent Memory Anticipates Attention Memory for Query-Agnostic KV Eviction in Hybrid LLMs**: GateSight learns per-head predictors from recurrent-layer write, decay and magnitude signals to estimate the future usefulness of attention-cache entries before a query arrives. It scores once after prefill, sets layer budgets using native attention gates and physically evicts discarded entries. On two Qwen3.8 models with SCBench and RULER-4096, retaining one tenth of the attention KV cache ranks first among five query-agnostic methods on three of four model–benchmark pairs. It suggests reusing recurrent signals for hybrid long-history memory allocation, but requires learned predictors and is not a model-independent guarantee. Transfer to recommendation is untested. — [Paper](https://arxiv.org/abs/2610.14754) (Shanghai Jiao Tong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-15139"></a>

- **When Dynamic Scaling Fails: A Scale-State Feedback Governs Recurrent-State Quantization in Linear-Attention and SSM LLMs**: This study separates numerical instability from information loss in quantized recurrent states. Scale–state feedback can cause norm growth, but controlling that scale alone recovers only part of lost performance; finer resolution and long decoding horizons still matter. In the tested settings, group-wise INT4 at 32K decode performs no better than discarding the state, and learned layer precision allocation reduces to protecting early layers under article-disjoint evaluation. The useful warning for compressed recommendation histories is to validate error accumulation over the intended horizon, rather than certify a bit width from short recall tests. In the tested per-step quantization setting, outlier-aware schemes underperform persistent scaling; this comparison is specific to those schemes and that setting. — [Paper](https://arxiv.org/abs/2610.15139) (Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22130"></a>

- **DropKV: Decoupling Residual-Output Perturbation for Near-Optimal KV-Cache Eviction**: DropKV approximates the joint decision of which cached tokens to evict using independent scores based on residual-output perturbations. The approximation bound requires small attention weights and aligned value residuals within a candidate pool; empirical checks cover three models, not every layer, head or query. Fused Triton kernels accelerate prefill scoring without materializing the complete attention matrix, and RULER and LongBench evaluations compare quality at equal cache budgets. For compressed recommendation histories, the transferable idea is to score the effect of deletion on outputs and assess the implementation cost, rather than rely only on attention weights; direct CTR transfer remains untested. — [Paper](https://arxiv.org/abs/2610.22130) (University at Albany, SUNY; IBM Research; Northwestern University · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-20503"></a>

- **ReaDy: Recurrent States as Dynamic Context for Speculative Drafting in Hybrid Linear Attention Large Language Models**: ReaDy supplies a speculative drafter with position-specific context retrieved from the recurrent states of a hybrid linear-attention target model. Learned queries and a lightweight residual state reader complement ordinary hidden features; low-rank reads and fused operators limit additional I/O and computation. On seven benchmarks with Qwen3.8-27B on one NVIDIA B200, the authors report higher throughput and more output tokens per verification round than pretrained DSpark. This suggests reusing compressed recurrent memory as an active information source for generation, not just a passive cache; it assumes access to suitable hybrid-model states and does not demonstrate recommendation gains. — [Paper](https://arxiv.org/abs/2610.20503) (StartLux; University of Chinese Academy of Sciences; The University of Hong Kong · arXiv 2026). Reading priority: Unrated.

<a id="paper-2608-11805"></a>

- **Hybrid Gated Attention**: Hybrid Gated Attention combines three gating strategies using signals from multiple attention stages, with element-wise and head-wise modulation of intra-head and cross-head information. Low-rank decomposition and a learnable attention sink are added to improve training efficiency and stability. Across the evaluated backbones and computation budgets, the authors report lower training loss and better downstream results than gated-attention baselines. For scalable ranking Transformers, the relevant hypothesis is that richer but inexpensive gates can regulate information flow; those recommendation benefits have not been directly tested, and this is not a linear-time attention replacement. — [Paper](https://arxiv.org/abs/2608.11805) (Tencent Hunyuan; Peking University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22353"></a>

- **Rethinking Routing Exploration in Modern Mixture-of-Experts**: MirrorMoE addresses a tension between shared experts and fine-grained routing: shared experts can weaken the representation changes needed to distinguish alternative routes. It mixes routing distributions from original and negated logits for expert selection, but retains original probabilities for aggregation, adaptively suppressing some selected experts. Across four language-model scales, it improves perplexity and average downstream accuracy. The activated-expert count stays fixed, and gains without shared experts are limited. CTR engineering inference: inspect effective expert contributions before enlarging a shared-expert ranking model, and test routing changes under matched compute. The paper reports language-model experiments, not CTR experiments. — [Paper](https://arxiv.org/abs/2610.22353) (ETH Zurich; The University of Hong Kong; Max Planck Institute for Intelligent Systems; WU Vienna · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22256"></a>

- **BitSparse: Compact Activation Storage for ReLU Feed-Forward Networks**: BitSparse losslessly compresses sparse ReLU-family activation caches in their chosen BF16 or FP8 storage format, using tile bitmasks, compact values, and fused Triton kernels. A preallocated shared buffer avoids host synchronization for variable-size storage. Reported roughly 30% per-token memory reductions come from forward/backward benchmarks without retained optimizer or full-model gradient buffers; a separate NanoGPT training run preserves validation loss closely. Benefits depend on exact zeros and target feed-forward activations, not attention or Mamba states. CTR engineering inference: profile exact-zero sparsity in ranking MLPs before testing activation-cache compression against checkpointing. No CTR experiments are reported. — [Paper](https://arxiv.org/abs/2610.22256) (University of Cambridge; University of Oxford · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-20247"></a>

- **Scaling Multilingual Mixture-of-Experts: How Language Coverage Changes Capacity and Compute Allocation**: This study fits a repetition-aware scaling law linking active parameters, per-language training tokens, expert count, and language coverage. Across controlled multilingual pretraining configurations, extra experts reduce the penalty of broader coverage when active capacity and tokens per language are matched. Broader coverage also shifts the modeled capacity allocation toward experts, yet preserving average quality can still leave individual languages worse off. Conclusions are bounded by the studied Top-1 architecture and training regime; logical compute excludes hardware overheads. CTR engineering inference: allocate capacity across traffic domains while checking slice-level regressions and data repetition. These are multilingual language-model results, not CTR experiments. — [Paper](https://arxiv.org/abs/2610.20247) (Data Science Group, Heinz Nixdorf Institute, Paderborn University, Germany · arXiv 2026). Reading priority: Unrated.

<a id="paper-2608-30310"></a>

- **Tail-Replay: Escaping the Curse of Linear Attention in Prefix Caching for Hybrid LLMs**: Tail-Replay enables prefix reuse at arbitrary matched-token boundaries in hybrid full/linear-attention language models. It caches exact full-attention KV and output hidden states, then replays a recent suffix from zero-initialized recurrent states instead of keeping recurrent checkpoints. On three Gated DeltaNet-based models, replaying 5–10% of a matched prefix preserves most benchmark-average quality on LongBench and RULER and reduces first-token latency on tested long shared prefixes. Reconstruction is approximate, and quality retention varies by model and task. CTR engineering inference: distinguish exact reusable sequence features from approximate state recovery, then measure latency and slice-level quality together. No CTR experiments are reported. — [Paper](https://arxiv.org/abs/2608.30310) (Institute of Artificial Intelligence, China Telecom (TeleAI); Shanghai Jiao Tong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21594"></a>

- **LoopAhead: Speculating Ahead for Faster Decoding in Looped Language Models**: LoopAhead accelerates looped language models with a trained lightweight drafter that proposes multiple future tokens from early-loop states. Intermediate-loop feedback suspends or resumes speculative branches, while full-depth verification retains final acceptance authority and preserves the target distribution. Experiments cover Ouro and Raven models; the maximum 7.82× autoregressive-decoding speedup is Raven-TinyLlama on HumanEval under greedy decoding, with one request per A40 GPU. Drafters and scheduling require model-specific adaptation, and concurrent-serving gains remain untested. CTR engineering inference: use cheap intermediate signals to budget speculative computation while retaining final-model verification in suitable generative ranking pipelines. No CTR experiments are reported. — [Paper](https://arxiv.org/abs/2610.21594) (Shanghai Jiao Tong University; Tongji University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-20686"></a>

- **RoLaQ: Joint Rotation and Range Calibration for 2-Bit KV Caches in Multi-Head Latent Attention**: RoLaQ jointly calibrates rotations and quantization ranges for the shared content latent in multi-head latent attention, using frozen key/value projections and teacher predictions plus attention outputs. It achieves the highest six-benchmark average among compared 2-bit methods across three MLA models. Only content latents are quantized; positional keys remain BF16, with optional protected tokens. DeepSeek-V2-Lite serving tests improve long-context capacity and throughput, but short-context overhead can outweigh savings and measurements cover one A100 setup. CTR engineering inference: calibrate compressed shared representations against every downstream consumer and benchmark realistic sequence lengths. The paper evaluates language models, not CTR experiments. — [Paper](https://arxiv.org/abs/2610.20686) (Research Center for Social Computing and Interactive Robotics, Harbin Institute of Technology; Tsinghua University; Baidu Inc. · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-19761"></a>

- **CAST: History-Adaptive Spectral Clipping for LLM Pretraining**: CAST adapts soft spectral clipping before AdamW using two histories: the previous second moment sets row/column scales, and an exponential moving average of the clipped spectral norm sets each matrix’s threshold. It restores original coordinates before the optimizer update. In a single-seed MoE pretraining comparison, CAST lowers training and mean validation losses against nine gradient-processing baselines and reaches the best baseline’s final smoothed loss in fewer steps. Extra per-step work and hardware-dependent costs remain. CTR engineering inference: test history-adaptive gradient processing for unstable large-model training, reporting loss-versus-time alongside spike counts. This paper contains no CTR experiments. — [Paper](https://arxiv.org/abs/2610.19761) (Meituan · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-19232"></a>

- **Spectral-MoE: Heterogeneous Per-Layer Expert Utilization in Dense-to-MoE Conversion**: Spectral-MoE learns unequal expert-activation allocations across layers when converting dense language models into MoEs. A static allocator shares one layer schedule across tokens; a dynamic allocator revises each token’s remaining schedule from intermediate states while conserving its total expert budget. Across three models and analytic/learned conversion bases, heterogeneous allocation improves perplexity, with dynamic allocation also improving average task accuracy. Serving speedups are not measured, and the authors’ learned-base reproduction underperforms its published baseline. CTR engineering inference: test layer-sensitive compute allocation under fixed activation budgets, then verify real serving costs. No CTR experiments are reported. — [Paper](https://arxiv.org/abs/2610.19232) (Stanford University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-16484"></a>

- **SLEM: Spectrum-Aware Latent Expert Merging**: SLEM compresses MoE expert storage by training a variational autoencoder on expert weights, pairing experts through latent similarity, and merging them within or across layers using spectrum-derived coefficients and latent interpolation. It needs no input calibration dataset, but does require VAE training and model-dependent rank choices. Tests on three language models show competitive knowledge-task results and stronger average math/code generation than compared merging methods; higher compression still loses quality versus uncompressed models. CTR engineering inference: evaluate weight-only expert consolidation when calibration traffic is unavailable, including compression preparation cost and slice-level regression checks. No CTR experiments are reported. — [Paper](https://arxiv.org/abs/2610.16484) (KAIST; University of Oxford; Slater Labs; DeepAuto.ai · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-19844"></a>

- **Memory-Efficient Subspace Optimization with Residual Correction: From Momentum SGD to Muon**: Low-rank optimizer states save memory, but noisy gradients can make the retained subspace miss useful update directions. SMRC for momentum SGD and PMRC for Muon keep states in the subspace and add the orthogonal residual gradient back to the update. The paper proves an O(T^(-1/4)) convergence rate matching the corresponding full-space methods, including variants that periodically refresh the basis, and reports experiments supporting effectiveness and efficiency. The abstract provides no quantitative memory or speed gains; benefits for CTR training remain unverified. — [Paper](https://arxiv.org/abs/2610.19844) (Nanjing University; Nanjing University of Science and Technology; Alibaba Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22179"></a>

- **LCT: Losslessly Compressed Tensors with GPU friendly execution for Training**: LCT makes repeated lossless tensor encoding and decoding practical during GPU training by using precomputed Huffman codebooks and optimized kernels to exploit redundancy in floating-point weights, activations and optimizer states. On 162M-parameter NanoGPT, it reduces memory usage by 24.6% at a 7.2% increase in step time. In Qwen3-4B fine-tuning, it saves up to 23.8% of peak memory and enables 3.5x longer training context on the same GPU. These language-model experiments show a memory–runtime trade-off; effectiveness in recommendation training is not established. — [Paper](https://arxiv.org/abs/2610.22179) (University of Cambridge; University of Oxford · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17191"></a>

- **FreeSolo: Linear-time Sparse Attention with Zero-Shot Length Extrapolation**: FreeSolo avoids forcing all long-context information into a fixed recurrent state by combining a sliding-window branch with a long-range branch that selects keypoint cells for direct token attention. FS-L learns prefix pruning through short continued pretraining and has linear-time sequence cost; FS-B searches balanced trees with O(N log^2 N) cost including radix-sort construction. The paper reports stronger zero-shot length extrapolation than its baselines without long-context fine-tuning. The variants have different memory and complexity trade-offs, and the abstract does not establish gains on recommendation workloads. — [Paper](https://arxiv.org/abs/2610.17191) (National University of Singapore; University of Toronto; Sea AI Lab · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22985"></a>

- **Prism Attention: Proposal-Refined Index Sharing Mechanism for Efficient LLMs Inference**: Prism Attention reduces repeated sparse-index computation during long-context decoding by refining shared cross-layer proposals instead of reusing fixed indices. The authors report a 3.4x end-to-end decoding speedup over FlashAttention at 128K context, alongside strong results against the evaluated sparse-attention methods. Its index-sharing design may inform long-history recommendation, but recommendation gains are untested. — [Paper](https://arxiv.org/abs/2610.22985) (Soochow University; Baidu · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-22796"></a>

- **Causal Latent Workspaces for Looped Transformers**: This looped Transformer adds causal latent slots that exchange compact prefix summaries between shared-block applications while retaining the input embedding. Across three byte-level corpora, three seeds and two matched parameter budgets, it gives the best mean held-out perplexity in five of six settings. The evidence supports a compact recurrent-memory design at the tested scales; transfer to recommendation remains untested. — [Paper](https://arxiv.org/abs/2610.22796) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22714"></a>

- **First Passage Attention**: First Passage Attention penalizes keys using extrema of a learned scalar field, allowing intervening context to be forgotten while older relevant tokens survive. Beyond synthetic expressivity tests, a 110M-parameter language model matches the Forgetting Transformer in perplexity and achieves perfect passkey retrieval at eight times the training length with about 25% of the KV cache. These results motivate selective historical-memory mechanisms, with recommendation transfer untested. — [Paper](https://arxiv.org/abs/2610.22714) (University of Bergen · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-22428"></a>

- **Embeddings Are Overpriced? A Frozen 16 MB Vocabulary for Small and Ternary Language Models**: The study replaces a trainable vocabulary embedding table with frozen 512-bit codes derived from pretrained embeddings, using 16 MB and no trainable table parameters. At matched 2.05B training tokens, downstream results vary by benchmark and the learned table retains a 0.20-nat validation-loss advantage. A ternary-body configuration also reduces storage and CPU decoding cost. Frozen compressed embeddings offer a potential design for memory-bound models, without established recommendation results. — [Paper](https://arxiv.org/abs/2610.22428) (QLNI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-23036"></a>

- **Towards Looped Models Done Right, Part I: Topology, Input Injection, Recurrent-State Design**: The study separates recurrence placement, input injection and recurrent-state organization in looped language models under matched budgets. A Huginn-style prelude–recurrent-block–coda design transfers from dense models to MoE models. At matched training and inference FLOPs, the tested looped MoE uses 75% fewer resident parameters than a 112-layer feedforward MoE, with benchmark-dependent quality. The findings inform parameter-sharing architecture choices, not measured recommender improvements. — [Paper](https://arxiv.org/abs/2610.23036) (Institute of Foundation Models; USC; CMU · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13041"></a>

- **RAMP: Recurrent Adaptive Mixed Precision for Efficient Prefill in Recurrent-Depth Language Models**: RAMP reduces recurrent-depth prefill cost by using low-precision weights and activations in early iterations and restoring high precision for final refinement. Matched-budget experiments support greater tolerance of early quantization errors. At contexts up to 4K on an NVIDIA H100, it preserves near-full-precision prefill quality and achieves up to 1.16x end-to-end first-prefill speedup. This is a tested prefill result, with recommendation transfer unverified. — [Paper](https://arxiv.org/abs/2610.13041) (University of Virginia · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13990"></a>

- **DoSA: Dots Sparse Attention**: DoSA avoids fully scoring sparse-attention indexer candidates that provable bounds already rule out, preserving exact token selection under its stated conditions. The GPU implementation speeds up the full indexer by up to 2.74x over SGLang and 1.69x over LiteTopK. End-to-end tests on GLM-5.2 and DeepSeek-V3.2 report time-to-first-token speedups up to 1.94x and 1.50x against those baselines. Transfer to recommendation indexing remains untested. — [Paper](https://arxiv.org/abs/2610.13990) (Dots Studio, Xiaohongshu · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17966"></a>

- **BELT : BEhavior-Aligned Low-Rank KV Cache Compression with Learned Top-k Rank Allocation**: BELT compresses KV caches using an attention-distribution-based low-rank objective and a learned global rank allocator under a component budget. Across three LLMs, the authors report up to 70% low-rank cache compression and benchmark-specific gains; combining quantization reaches up to 17.8x cache reduction. GPU kernels yield up to 2.7x attention speedup and 3.3x end-to-end decoding throughput. These maxima describe different evaluated configurations; recommendation transfer remains untested. — [Paper](https://arxiv.org/abs/2610.17966) (Peking University; JD.com; Tencent; Beihang University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-15384"></a>

- **E8 Lattice Key Quantization for Low-Bit KV-Cache Compression**: E8 lattice vector quantization exploits correlations between key dimensions to support 2-bit keys and values, with table-based attention scoring that avoids explicit codebook decompression. Across five LLM families, it provides roughly 6x KV compression, about 20% less storage than scalar 3-bit-key/2-bit-value quantization, while retaining near-baseline perplexity and throughput parity with scalar baselines. It suggests a memory-efficient primitive whose recommendation applicability is untested. — [Paper](https://arxiv.org/abs/2610.15384) (Technical University of Berlin; logsight.ai · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13982"></a>

- **PRIME: Frequency-Aware Unified Pruning and Merging for MoE Compression**: PRIME jointly chooses expert pruning and merging through a global integer-linear optimization with a frequency-weighted surrogate objective. Experiments on Qwen3-30B-A3B and Qwen3.5-122B-A10B assess retained quality across knowledge, coding, mathematics and long-context tasks, with vLLM serving measurements of memory and throughput. The work offers a coordinated expert-compression design; gains for recommendation MoE models remain untested. — [Paper](https://arxiv.org/abs/2610.13982) (Baidu · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-20353"></a>

- **Beyond Expert Rankings: Contrast Calibration for Mixed-Precision MoE Quantization**: NatScale calibrates the contrast of gradient-based expert importance weights while preserving their ordering, then allocates mixed precision under a storage budget using joint gate/up/down error estimates. Across three MoE models and nine settings it gives the lowest native-to-quantized KL divergence and highest top-token agreement against five allocation baselines, and the lowest perplexity in seven settings. Recommendation-model benefits remain untested. — [Paper](https://arxiv.org/abs/2610.20353) (Nanjing University of Posts and Telecommunications; Tylogi AI Lab; Anhui University of Technology; Shanghai Jiao Tong University; Southeast University; Microsoft; University of Cambridge · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17970"></a>

- **AlignPred: Error-Controlled KV Cache Compression via Alignment and Predictive Coding**: AlignPred compresses persistent KV caches using local orthogonal alignment, cross-token/head/layer prediction and error-bounded residual coding. Its SGLang HiCache integration reduces persistent target-KV storage by 42–72% relative to native HiCache at comparable latency. It also preserves near-native scores at tested 128K LongBench-Pro operating points. The result concerns persistent cache storage; recommendation transfer remains untested. — [Paper](https://arxiv.org/abs/2610.17970) (Hunan University; Tencent; Central China Normal University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14688"></a>

- **Accelerating Cross-Model LLM Inference via Attention Map Reuse**: MapFlow reuses attention maps across heterogeneous LLMs processing shared context, combining partial recomputation, lightweight layer/head translation, block-sparse compression and a fused retrieval kernel. Experiments report lower prefill latency and better end-to-end serving efficiency while preserving generation quality across tested model pairs and multi-turn routing workloads. Cross-model attention reuse could inform shared-context serving, with recommendation gains unverified. — [Paper](https://arxiv.org/abs/2610.14688) (Peking University · SIGMOD 2027). Reading priority: Unrated.

<a id="paper-2610-14423"></a>

- **Scaling Laws for Multimodal Data Mixtures**: This multimodal scaling study fits data-mixture laws from 268 MoE experiments spanning 457M–8.3B parameters and up to 150B tokens. Compute-optimal allocation differs by modality: audio favors parameters more strongly, while text and vision favor balanced model/data growth. Repeating vision or audio data beyond twice offers negligible benefits, and cross-modal interference is asymmetric. These findings may guide multimodal recommendation budgeting, but that transfer is untested. — [Paper](https://arxiv.org/abs/2610.14423) (Mila; McGill University; EPFL; ETH; University of Washington · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-14344"></a>

- **On the Depth Transfer of Neural Optimizers via L-Smoothness**: The paper analyzes depth transfer through loss Lipschitz and smoothness constants, showing that inverse-depth residual scaling can keep these bounds depth-independent at fixed width under its assumptions. Learning-rate sweeps on GPT-2 and CIFAR-100 ResNets support stable Muon/MOGA transfer, including a common optimal rate across a 64-fold depth increase. This informs deep-model scaling recipes; recommender applicability remains untested. — [Paper](https://arxiv.org/abs/2610.14344) (University of Chicago; Peking University; University of British Columbia · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14644"></a>

- **Shaping Latent Mixture-of-Experts: From Expert Geometry to Layerwise Capacity Allocation**: The study treats latent-MoE expert input dimension and intermediate width as separate design variables, linking their balance to a local Jacobian-rank ceiling. Controlled sweeps favor near-square experts. Layerwise intrinsic-dimension-guided allocation improves validation loss and downstream results while keeping each layer's parameters, active FLOPs and communication volume fixed. Expert shape is a transferable design hypothesis, not a verified recommendation gain. — [Paper](https://arxiv.org/abs/2610.14644) (Xiamen University; Tencent Hunyuan; Soochow University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13605"></a>

- **zip2zip++: Towards Inference-Time Token Compression with Minimal Quality Loss**: zip2zip++ improves dynamic LZW token compression with separate input/output embeddings, size-aware RoPE and selective merges plus alternative segmentations. Across four models it improves tested-corpus perplexity and mathematical reasoning, closing roughly half the quality gap to uncompressed models at similar general-text compression ratios. It remains lossy in quality; transfer to compressed recommendation token streams is untested. — [Paper](https://arxiv.org/abs/2610.13605) (EPFL; Technical University of Munich; Zuse School ELIZA; ETH Zürich · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21126"></a>

- **Compression Does Not End at Selection: Post-Selection Positional Geometry for Sparse KV Caches**: RoPERelay reorganizes the positions of an already selected sparse KV cache using compact order-preserving coordinates and key phase rotations, synchronizing subsequent queries and generation. Without reselection, historical re-prefill or extra cache budget, it improves 32 of 36 tested comparisons; one LongMemEval-S configuration rises from 23.6% to 35.4% accuracy, with roughly 1–3% complete-request overhead. Recommendation transfer remains untested. — [Paper](https://arxiv.org/abs/2610.21126) (National University of Defense Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-20418"></a>

- **OrionMoE-v1.0: A Mixture-of-Experts Foundation Model for Tabular In-Context Learning**: OrionMoE-Small-v1.0 combines distribution-aware representations with dataset-conditioned sparse expert computation in a dual-axis tabular Transformer. The revised abstract describes routing as conditioned on individual cell representations and the wider dataset context, removing the earlier feature-axis-only wording. Synthetic-task pretraining enables prediction from labeled support tables without task-specific gradient updates, with competitive reported results against larger tabular foundation models. The revision corrects the mechanism description; it does not establish new recommendation results or new performance gains. — [Paper](https://arxiv.org/abs/2610.20418) (Lexsi Labs · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-18162"></a>

- **LoOPSD: On-Policy Self-Distillation with Looped Teachers**: LoOPSD searches for beneficial layer repetitions while holding weights fixed, uses the resulting stronger looped teacher to guide on-policy self-distillation, then repeats search and distillation. On GSM8K at a 400-token thinking budget, Qwen3-1.7B accuracy increases from 42.30% to 79.61%; later rounds add gains. The method offers a way to distill extra computation into a student, with recommendation transfer untested. — [Paper](https://arxiv.org/abs/2610.18162) (Anhui Province Key Laboratory of Digital Security; Alibaba Group; Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21682"></a>

- **Router Drift Control: Mitigating Off-Policy Degradation in Mixture-of-Experts Reinforcement Learning**: Router Drift Control filters high-drift responses using disagreement between rollout-time and training-time expert routing, preserving native routing on retained responses. It targets off-policy mismatch without replaying expert selections. In asynchronous RL, combining RDC with truncated importance sampling raises average peak validation accuracy on AIME 2024/2025 by 5.5 points over TIS and 4.5 over routing replay. Recommender-MoE training benefits remain untested. — [Paper](https://arxiv.org/abs/2610.21682) (Peking University; Shanghai Innovation Institute; Zhejiang University; Shanghai Jiaotong University; Infrawaves · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-15146"></a>

- **Compute-Optimal Scaling Laws for Spiking Language Models**: This IsoFLOP study evaluates SpikeGPT-family language models across widths 384–1536 and compute budgets of 3×10^17–10^19 FLOPs. The compute-optimal parameter exponent is 0.56. Matched training comparisons separate an approximately 0.16-nat backbone loss cost from a spiking cost that decreases from 0.34 to 0.23 nats with compute. It quantifies accuracy trade-offs in the tested range; it does not measure recommendation performance or hardware energy savings. — [Paper](https://arxiv.org/abs/2610.15146) (Luma AI; X School · NeurIPS AXIOM Workshop 2026). Reading priority: Unrated.

<a id="paper-2610-20951"></a>

- **LEV: Thinking Fast and Deep with Looped Decision Models**: LEV adapts looped language-model backbones into decision models that score options after each loop without generating reasoning text. A learned stopper allocates depth per question; across tested backbones it saves 15–24% computation at less than one accuracy-point cost. Locked-test comparisons also show gains over matched-latency dense models and cascades. Adaptive-depth scoring is relevant to ranking design, though recommendation results are untested. — [Paper](https://arxiv.org/abs/2610.20951) (Lehigh University; University of British Columbia; Vector Institute · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-13261"></a>

- **Data-Adaptive Mahalanobis Metric Learning for Cross-Head Attention in Transformers**: DAMCHA extends multi-head attention with an input-dependent full cross-head metric, allowing interactions omitted by independent head-wise similarities. Stack-wise parameter sharing and regularization target stable, efficient training. The authors report improvements across evaluated Transformer tasks with comparable or reduced computational overhead. Cross-head feature interactions are a potential recommendation application, not an established result of this study. — [Paper](https://arxiv.org/abs/2610.13261) (Zhongnan University of Economics and Law; CodeSoul.Co; The Chinese University of Hong Kong · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-16890"></a>

- **FORGE: Procedural Weight Generation for Sparse MoE Inference**: FORGE proposes a hardware unit that regenerates approximate MoE expert weights from compact rotor parameters instead of loading full tensors. With 30% of FFN layers replaced, the authors estimate 1.3–2.8x system throughput at matched GPU count and 1.10–1.15x lower short-context per-user decode latency, with downstream accuracy losses. The verified SystemVerilog design is a hardware proposal; these system estimates are not measured recommender deployment gains. — [Paper](https://arxiv.org/abs/2610.16890) (University of Wisconsin-Madison; Korea University; NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17425"></a>

- **When Sparsity Breaks Connectivity: Functional Reachability and Guided Topology Dynamics in Extreme Sparse Training**: The paper connects extreme dynamic-sparse-training failure to broken input–output pathways and guides pruning/regrowth using functional reachability. On image benchmarks it recovers up to 14.4 accuracy points at 99.9% sparsity; an MLP-Mixer remains trainable at 99.99% sparsity where unguided regrowth degrades. Connectivity-preserving sparse training may inform recommendation architectures, but the evidence is from vision tasks. — [Paper](https://arxiv.org/abs/2610.17425) (University of Twente; Paderborn University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-26834"></a>

- **Kronecker Delta Rule for Long Context Linear Attention**: KronLSTM introduces the Kronecker Delta Rule, which revises associative matrix memory along one matrix-space direction to reduce interference with stored information. Its analysis establishes a uniformly bounded expected memory norm and steady-state convergence under the described dynamics. Long-context language-model experiments are competitive with, and often outperform, tested linear-attention baselines including the (Gated) DeltaNet family. This is a potentially transferable stable-memory design; recommendation performance has not been tested. — [Paper](https://arxiv.org/abs/2610.26834) (Johannes Kepler University Linz; NXAI GmbH · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-26030"></a>

- **Truncate or Not? A Scaling Study of Looped Transformers with Truncated Backpropagation**: Across nearly 600 looped-Transformer training runs, the study models the joint effects of model size, data, forward loops and backward loops. When both loop counts are optimized under matched compute, full backpropagation through fewer loops outperforms truncation. With model size also variable, two fully trained loops achieve lower validation loss than the compute-optimal non-looped model using about 27% fewer non-embedding parameters and 8% more training compute. The result informs loop-training budget allocation within the studied language-model regime, not validated CTR scaling. — [Paper](https://arxiv.org/abs/2610.26030) (The University of Hong Kong; Yale University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-25717"></a>

- **Fine-Grained Units, Flat Decisions: Hierarchical Micro-Expert Pruning for Mixture-of-Experts Models**: UC-RAMP separates allocation of retained expert widths from channel selection in post-training MoE pruning. CAPE redistributes capacity under an exact layer budget; RAMP refines channels at fixed widths using interaction-guided exchanges. It has the best ten-task mean accuracy in five of six tested model/pruning settings. At 25% pruning on one A100, time to first token falls 19.7–23.9% and time per output token 20.2–22.3% versus unpruned models. Transfer to recommendation remains untested. — [Paper](https://arxiv.org/abs/2610.25717) (Houmo AI; University of Science and Technology of China; Southeast University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-28441"></a>

- **Stratified Sparse Attention: Reducing the Sparse-to-Dense Gap at Extreme Sparsity**: Stratified Sparse Attention combines deterministic retrieval of high-score tokens with score-guided sampling and inclusion-probability correction for residual attention mass. Across five language models and four benchmark suites, it improves accuracy at matched sparsity. Optimized CUDA kernels yield up to 2.96 times decode speedup over FlashInfer at one-million-token context. The evidence concerns language-model inference; recommendation transfer remains untested. — [Paper](https://arxiv.org/abs/2610.28441) (Rice University; University of California, Berkeley; Stanford University; Indian Institute of Technology Bombay · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-28385"></a>

- **RACE: RoPE-Aligned Attention Compression Based on Query-Key Activation Energies**: RACE reduces KV-cache dimensions without reconstructing full-dimensional states at inference. It selects complete RoPE rotary pairs using joint query-key activation energy and folds the selection into model weights. At 50% KV-cache retention and 256K context, it reports 47.8% fewer total inference FLOPs, 1.79 times throughput, 43.2% lower TTFT and 28.1% lower allocated GPU memory than the uncompressed model. Recommendation transfer is untested. — [Paper](https://arxiv.org/abs/2610.28385) (MIT CSAIL; MIT-IBM Computing Research Lab · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-27598"></a>

- **Meta Expert: Cross-Layer Expert Sharing for Storage- and Retrieval-Efficient MoE**: Meta Expert addresses redundant expert parameters across MoE layers by sharing experts between layers. Empirical comparisons show lower redundancy, lower cross-entropy and higher downstream accuracy; with activated expert count and granularity fixed, it matches vanilla MoE performance using 70–80% of the experts. The analysis attributes additional benefits to more flexible residual paths. These findings concern general model architecture, with no recommendation-specific evaluation. — [Paper](https://arxiv.org/abs/2610.27598) (Tsinghua University; Shanghai AI Laboratory · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-27123"></a>

- **Reconstruction-Optimized Expert Pruning for Mixture-of-Experts Language Models**: OptEP treats post-training MoE expert pruning as selecting a fixed-size subset that reconstructs the original layer output. A continuous relaxation optimizes expert selection, followed by lightweight updates of retained weights. Across mathematical-reasoning and code-generation tasks, it outperforms evaluated pruning baselines, especially at aggressive pruning. The method targets expert storage costs; its abstract does not establish recommendation gains or measured serving acceleration. — [Paper](https://arxiv.org/abs/2610.27123) (LinkedIn; MIT; Google · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-28489"></a>

- **Asymmetric Looped Transformers: Fixed Global Representations for an Iterative Decoder**: AsymLoop separates one-pass context encoding from recurrent state refinement. A causal encoder supplies fixed global KV caches, while a weight-tied decoder attends jointly to them and evolving local states. At matched effective depth and training tokens, models from 60M to 1B improve over full-stack looping. At 1B, average accuracy on seven commonsense benchmarks rises from 49.58% to 50.85%; recommendation transfer is untested. — [Paper](https://arxiv.org/abs/2610.28489) (Shanghai Jiao Tong University; University of Science and Technology of China; Nanyang Technological University; Nanjing University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-28369"></a>

- **Don't Skip the Baseline: A Controlled Comparison of Dynamic Expert Skipping in MoEs**: This controlled study compares four dynamic MoE expert-skipping methods with simply reducing the same expert count across layers and tokens. At matched expert-compute budgets, static reduction is difficult to beat consistently across text and multimodal models. Calibration-time effective expert counts can diverge from test-time counts, distorting cost comparisons. The contribution is a stronger evaluation baseline, not a new recommendation architecture. — [Paper](https://arxiv.org/abs/2610.28369) (Technical University of Munich; Tensordyne; ETH Zurich; Ulm University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-24998"></a>

- **Block Recursive Transformers for Structured Parameter Sharing**: Block Recursive Transformers partition layers into contiguous blocks and repeatedly apply each block before proceeding to the next. This intermediate sharing pattern balances local refinement and depth-wise differentiation without adding routing, auxiliary states or objectives. Across decoder-only models up to 1.7B parameters, with encoder-decoder and encoder-only studies, it improves validation loss and downstream accuracy over static recursive-sharing baselines. Recommendation transfer is untested. — [Paper](https://arxiv.org/abs/2610.24998) (Sungkyunkwan University; Korea University · EMNLP (Findings) 2026). Reading priority: Unrated.

<a id="paper-2610-25250"></a>

- **Improving the Expressive Power of Hybrid Sequence Models via Multi-Hop Retrieval**: MuRA lets efficient hybrid sequence layers perform multiple retrieval hops over a shared KV cache. For function-composition tasks, theory establishes a strict hierarchy in retrieval depth: a fixed-size m-hop block computes m-function composition, while one more composition requires polynomial size at that depth. Synthetic experiments support the hierarchy. This motivates more expressive efficient architectures, but does not establish language-model or recommendation production gains. — [Paper](https://arxiv.org/abs/2610.25250) (Technion - Israel Institute of Technology; NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-31642"></a>

- **A Fix for Softmax and Cross-Entropy**: This work identifies floating-point errors in softmax and cross-entropy: target gradients can round to zero, and near-matching teacher and student distributions can suffer cancellation. Revised implementations suppress the Slingshot effect and distillation drift in the reported experiments. The contribution improves numerical behavior of common training operators; recommendation-specific gains are not established. — [Paper](https://arxiv.org/abs/2610.31642) (Google DeepMind · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-31574"></a>

- **Rethinking Sequence Compression with Test-time Regression**: TTR-Compressor treats sequence compression as learned test-time regression, computing closed-form coefficients during the forward pass. It supports blockwise attention and visual-token merging. Experiments report strong RULER results, while a visual merger matches an MLP merger with 55.6% fewer tokens. These results concern long-context and multimodal models, with no recommendation-specific evaluation. — [Paper](https://arxiv.org/abs/2610.31574) (The Chinese University of Hong Kong; Independent Researcher; Token Foundry; Alibaba Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-35556"></a>

- **LoopFold: Parallelizing Recurrent Depth in Looped Transformers**: LoopFold reduces sequential dependencies in looped Transformers by predicting inputs to later loops, executing multiple depths in parallel, and correcting their outputs with newly available earlier states. In 1.4B language models, deeper configurations improve average zero-shot accuracy across eight tasks; five sequential stages reduce decoding latency by 46% relative to a nine-loop vanilla model using additional parallel computation. This suggests a latency–compute trade-off for recurrent architectures, with no recommendation evaluation reported. — [Paper](https://arxiv.org/abs/2610.35556) (Shanghai Jiao Tong University; Sun Yat-sen University; Shanghai Innovation Institute · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-35544"></a>

- **StateLoop: Persistent State for Looped Transformers**: StateLoop adds a persistent state to every token in a looped Transformer. A learned gate retains and updates information across iterations, and a projection feeds that state back into subsequent computation and prediction. It lowers Pile perplexity and improves average accuracy across eight zero-shot tasks against vanilla looping, with the perplexity advantage growing at greater trained depth. The mechanism is relevant to parameter-sharing architectures, but transfer to ranking remains untested. — [Paper](https://arxiv.org/abs/2610.35544) (Shanghai Jiao Tong University; Sun Yat-sen University; Shanghai Innovation Institute · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-34056"></a>

- **INTRA: Interleaved Non-contiguous Token spaRse Attention**: INTRA uses complementary Scatter and Gather sparse token groups to relay information across layers, with a GPU kernel that packs non-contiguous tokens for computation. After adaptation, it reports a 1.53-fold FLUX.1-dev generation speedup on an A100 and improved long-context prefill efficiency for LLaMA-3.1-8B. Larger reported gains are attention-only benchmarks, not end-to-end speedups. Its hardware-aware static pattern offers a transferable sparse-attention design; CTR performance is unverified. — [Paper](https://arxiv.org/abs/2610.34056) (New York University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37645"></a>

- **Multi-State Linear Attention with Generalized Second-Order Routing**: MERLIN improves multi-state linear attention by tracking first and second moments of segment keys, allowing queries to use both mean and variance of alignment when combining memory-state readouts. Tests on Gated DeltaNet-1.3B and Mamba-2-780M report stronger long-context retrieval and question answering, including improvements over baselines using four times more memory. The method offers a general content-aware routing design for compressed sequence states. — [Paper](https://arxiv.org/abs/2610.37645) (Princeton University; Google DeepMind · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37062"></a>

- **EnergyCal: Taming Loss Spikes in Muon-Family Optimizers for Sparse MoE Training**: EnergyCal attenuates routed-expert updates using normalized squared Frobenius norms of finite-step Newton-Schulz directions, leaving the spectral transform unchanged and adding no persistent optimizer state. On a 4B-parameter sparse MoE, it reduces mean thresholded loss-spike burden by 99.51% and final geometric-mean perplexity by 4.06% relative to a selected lower-learning-rate MuonH recipe, with modest throughput cost. Plain-Muon experiments also show stabilization within the evaluated settings. — [Paper](https://arxiv.org/abs/2610.37062) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-36520"></a>

- **Folding Attention Biases into Keys Makes Compacted KV Caches Run on Standard Kernels**: The method folds Attention Matching logit biases into retained keys along one fitted direction per head, producing compact KV caches compatible with standard attention kernels and the original query path. Unmodified vLLM serves these caches through a connector. Under equal head budgets, accuracy is within noise of Attention Matching in 13 of 14 tested settings; results are less uniformly favorable under the published per-head budgets, emphasizing budget-dependent tradeoffs. — [Paper](https://arxiv.org/abs/2610.36520) (Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37386"></a>

- **Channel Selection for Mixture-of-Experts Decoding Needs No Calibration Data**: The paper replaces calibrated channel-selection thresholds with per-token top-k selection for predictable routed-expert read budgets. It also builds a weight-only reader using a ternary sketch and low-rank recovery of skipped channels. Across three post-trained MoE models, the reader retains 98.1% of full-model accuracy at 17.8% of expert-weight reads; Triton MoE blocks run 1.60–1.90x faster than optimized vLLM at batch one, and up to 2.69x at larger batches. — [Paper](https://arxiv.org/abs/2610.37386) (KAIST; DeepAuto.ai · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37019"></a>

- **V-LUMEN: Visual Lookup Memory for Embedding Scaling in Vision-Language Models**: V-LUMEN expands vision-language capacity with a lookup table instead of additional dense per-token computation. A frozen codebook discretizes visual features; spatial hashing and text-conditioned relevance address memory, whose embeddings enter the backbone through gated residuals. Tests on five reasoning benchmarks and three disjoint-image transfer benchmarks support this capacity axis; matched-budget LoRA/MoE comparisons preserve accuracy on two backbones. Lookup occurs once at prefill and is constant in table size. — [Paper](https://arxiv.org/abs/2610.37019) (Korea University · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-33719"></a>

- **ZipFusion: Fusing Lossless KV Decompression with Attention for Efficient LLM Decoding**: ZipFusion co-designs a lossless KV format and attention kernel so compressed values are reconstructed directly in registers, avoiding a separate decompression pass and reducing GPU memory reads. Integrated with FlashInfer and SGLang, it reports about 1.25x decode-attention speed on H100 and up to 26.3% higher model decoding throughput at 8K context under the same GPU-memory budget. The up-to-2.76x comparison uses each lossless-compression baseline at its largest supported batch. — [Paper](https://arxiv.org/abs/2610.33719) (The Chinese University of Hong Kong; Unaffiliated · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-34828"></a>

- **Transporting Quantiles to Codebook: Scalable Vector Quantization without Codebook Collapse**: FlowVQ tackles VQ-VAE codebook collapse by jointly learning a latent distribution with a lightweight flow-matching model and constructing codes from equal-quantile partitions transported through that flow. Voronoi centroids provide the resulting structured discretization. Image tokenization/generation and two high-precision tokenization tasks show scalable, expressive codebooks with full utilization; recommendation semantic IDs remain a potential application rather than an evaluated result. — [Paper](https://arxiv.org/abs/2610.34828) (National University of Singapore; SEA AI Lab · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-38578"></a>

- **Dual DeltaNet: Value-Side Memory Reorganization for Linear Attention**: Dual DeltaNet extends Kimi Delta Attention with a two-sided delta rule: key-side updates correct the value associated with a key, while value-side updates reorganize addresses holding selected value features. A chunkwise parallel algorithm supports training, and a rank-2 recurrence increases inference arithmetic intensity. The abstract reports the strongest overall results among KDA, GDN-2, and Mamba-3 across language modeling, downstream tasks, and retrieval, with modest overhead relative to KDA. Its fixed-state memory management is a potential design reference for efficient sequence models, not a tested CTR result. — [Paper](https://arxiv.org/abs/2610.38578) (Zhejiang University; National University of Singapore; Huzhou Normal University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-38422"></a>

- **Deeper Backpropagation or More Updates? Training Looped Language Models Across Budgets**: This study compares how many final repetitions of a looped language model should retain gradients during training. Identical-data experiments isolate learning efficiency per token, while approximately time-matched recipes compare the trade-off between deeper backpropagation and more updates. The tested shorter window loses much of its advantage as training budgets grow, so the preferred choice can change with budget. This offers a budget-aware training lesson for weight-sharing depth architectures; it does not establish a universal optimal window or a CTR result. — [Paper](https://arxiv.org/abs/2610.38422) (The Chinese University of Hong Kong, Shenzhen · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-38822"></a>

- **CopyLoop: Fast Looped Transformer Decoding via Context Copying and Shallow Screening**: CopyLoop accelerates looped Transformer decoding without training by proposing multiple tokens copied from recurring context, filtering them at shallow recurrent depth, and overlapping newer blocks with earlier full-depth verification. Across six checkpoints from Ouro, Raven, and Huginn on code generation and mathematical reasoning, the abstract reports speedups of 2.98–10.70 times for Base models and 2.74–3.52 times for Thinking models over full-depth autoregressive decoding. It suggests a decoding design for recurrent-depth architectures, particularly when longer outputs contain reusable context; recommendation transfer remains untested. — [Paper](https://arxiv.org/abs/2610.38822) (DualverseAI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-40577"></a>

- **Multi-View Latent MoE: Letting Every Router Shape Expert Computation**: Multi-View Latent MoE combines several routers to select experts and uses their relative preferences to mix latent views into each selected expert’s input. Each selected expert runs once, preserving the active-expert count, expert FLOPs and all-to-all communication volume. On a 24-layer model with 10B total and 1B active parameters trained on 708B tokens, it improves the mean across nine downstream tasks by 1.18 percentage points over the baseline. The design is relevant to sparse ranking architectures that seek more expressive routing under a fixed expert-computation budget; it does not establish CTR gains. — [Paper](https://arxiv.org/abs/2610.40577) (Baidu · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37914"></a>

- **Muon Makes the First Mixture-of-Experts Layer Harder to Balance**: In MoE language models with 55M and 108M active parameters, this study finds that Muon can increase load imbalance in the first expert layer even when its router uses a different optimizer. Shared directions in router inputs coincide with expert overload; subtracting the batch mean removes the observed early overload with little loss change, while reducing Muon's learning rate helps on the smaller model. The findings inform optimizer and routing diagnostics for sparse scaling, but their demonstrated scope is limited to these model sizes and training settings. — [Paper](https://arxiv.org/abs/2610.37914) (Universidad Autónoma de Madrid · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39216"></a>

- **PDScope: Breaking the Prefill-Decode Seesaw for Memory-Bound MoE Inference**: PDScope accelerates CPU-GPU MoE inference when GPU memory cannot hold most experts. It predicts expert activations and adapts placement, prefetching and execution separately for compute-bound prefill and I/O-bound decoding, using cross-layer cost models and static execution pipelines. On tested MoE models, it reports 2.5–10.3× higher prefill throughput and 2.1–6.1× higher decoding throughput than existing systems. Phase-specific scheduling is a transferable serving idea for memory-constrained sparse models, though the reported experiments concern LLM inference rather than CTR ranking. — [Paper](https://arxiv.org/abs/2610.39216) (National University of Defense Technology; Qiyuan Laboratory · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37720"></a>

- **LRMoE: Demand-Side Load Re-Calibration for Efficient MoE Training on Memory-Constrained Nodes**: LRMoE reduces memory-constrained MoE training cost by jointly setting expert-placement and backward-retention quotas. It preserves all routed forward computations, then selects token-expert pairs for backpropagation according to estimated update contribution and routes retained pairs to instances of their original experts. Compact communication buffers and variable-size grouped matrix multiplications reduce backward work. On Qwen3-30B-A3B and GLM4.5-106B-A12B, cumulative MoE-layer time to fixed-loss targets falls by 21.2–44.8% versus SYMI, providing a systems reference for sparse scaling rather than a demonstrated recommendation gain. — [Paper](https://arxiv.org/abs/2610.37720) (JD.com · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39663"></a>

- **AB-Attention: Accurate Block Attention for Accelerating Video Diffusion Transformers**: AB-Attention approximates dense attention with dynamic block sparsity without retraining. It estimates block importance by clustering queries within each block, samples and reweights selected blocks by inclusion probability, and packs smaller key-value blocks into full tensor-core tiles. On Wan2.1 and HunyuanVideo, the abstract reports skipping 89–92% of attention and up to 2.23-fold end-to-end speedup. Its selection and kernel design may inform sparse long-sequence attention, but recommendation gains are not established. — [Paper](https://arxiv.org/abs/2610.39663) (InfRec; The Chinese University of Hong Kong, Shenzhen; Shandong University; The University of Tokyo; Fudan University; University of California, Berkeley; The Hong Kong University of Science and Technology; National University of Singapore · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-40305"></a>

- **Rimuru: Unified Memory Management for Modern LLM Serving via Elastic Expert Offloading**: Rimuru pools memory for expert weights and attention states instead of reserving fixed regions for each. Tensor-specific memory views, a split-and-merge page allocator, and a page-table-aware MoE kernel allow capacity to move between heterogeneous tensors without copying expert weights into contiguous buffers. A workload-aware controller adjusts allocation at runtime. Implemented on vLLM, the system reports improved throughput and time to first token in its tested settings; the transferable idea is jointly managing sparse-model weights and request state, not an established recommendation-serving gain. — [Paper](https://arxiv.org/abs/2610.40305) (Sun Yat-sen University; Independent Researcher; EPFL; Peng Cheng Laboratory · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-40325"></a>

- **How to Loop Your Transformer: Loop Scaling, Specialization, and Parallel Inference**: This study compares looped decoder-only Transformers under parameter, training-compute and decoding constraints, using models up to 1B parameters, 155B training tokens and 32 loops. Full-model looping generally works best at fixed parameter count, while middle-block looping gives better returns at fixed training FLOPs; additional loops can also saturate or destabilize training. Loop-specific low-rank adapters improve quality, and preserving the current-token embedding with separate normalization improves parallel-loop inference. The findings guide resource-aware shared-depth designs rather than establish recommendation gains. — [Paper](https://arxiv.org/abs/2610.40325) (FAIR at Meta; MIT · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37842"></a>

- **Improving Data-Constrained Scaling with Hyperparameter Transfer and Ensembling**: This work improves data-constrained language-model scaling by fitting power laws for hyperparameter transfer and scaling laws for allocating compute to ensembles. On 100M FineWeb training tokens, the recipe reduces validation loss by over 0.15 nats, or perplexity by 14%, relative to prior recipes, and reports monotonic improvements with compute through ensembling. Prescriptions fitted to smaller runs are validated at up to 12-fold larger compute budgets. The method may inform data-limited ranking experiments, but transfer to CTR models and ensemble serving costs remain unverified here. — [Paper](https://arxiv.org/abs/2610.37842) (Princeton University; Q Labs; New York University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-36617"></a>

- **Balanced State Subspaces with Spectral Rank Allocation for Mamba-2 State Compression**: This method compresses Mamba-2 states by preserving the rotated write–read subspace through balanced truncation, rather than scoring coordinates independently. Spectral rank allocation distributes a fixed state budget across layers using the Hankel spectrum, protecting flatter-spectrum layers that carry long-range associations. Across 130M–2.7B checkpoints, halving the state costs 0.3 WikiText-2 perplexity points on average versus 1.6 for GHOST, while retaining 97% of dense five-digit in-context recall. At quarter-state size, spectral allocation retains 77% of recall versus 5% with uniform ranks, with a 7% perplexity cost. This informs long-history state compression, not established CTR gains. — [Paper](https://arxiv.org/abs/2610.36617) (Shaanxi Normal University; State Key Laboratory of Robotics and Intelligent Systems, Shenyang Institute of Automation, Chinese Academy of Sciences · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-33404"></a>

- **COPE: Composable Performance Emulation for Mixture-of-Experts Offloading Policies**: COPE selects a MoE offloading policy for a target model and hardware platform before implementing it in the runtime. It separates expert residency from execution strategy, then combines profiles of operator schedules with offline routing traces to predict candidate performance. Against evaluated baselines, it reports better fastest-policy selection and lower prediction error, with policy-specific implementation effort reduced by up to 74%. The transferable idea is to choose offloading around actual memory, compute and bandwidth limits; the reported gains concern policy selection and integration effort, not model accuracy or CTR throughput. — [Paper](https://arxiv.org/abs/2610.33404) (Shanghai Jiao Tong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-36778"></a>

- **Does LLM Pre-Training Typically Occur at the Edge of Stability?**: This study tests when quadratic approximations misrepresent language-model training dynamics. Persistent negative curvature can make the approximate dynamics diverge at any learning rate while real training remains stable; after separating that effect, the authors define a stability-edge diagnostic for stochastic adaptive optimization. In pretraining runs up to 787M parameters, the learning-rate-dependent effect is common but disappears at sufficiently small learning rates or batch sizes. The results caution against equating local curvature-based instability with failed training; they do not provide a new optimizer or CTR evidence. — [Paper](https://arxiv.org/abs/2610.36778) (UC Berkeley; Tsinghua University; ByteDance Seed · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-37442"></a>

- **CRISP: Co-designing Pruning and Scheduling for Efficient MoE Inference on Edge Servers**: CRISP jointly designs expert pruning and runtime scheduling for memory-constrained MoE inference. Neuron reordering lets one stored expert execute at several widths; expert-combination frequency and each expert's role determine how much computation to retain, while heterogeneous widths help overlap weight loading with computation. On Mixtral-8x7B and DeepSeek-MoE-16B, it reports up to 2.1 times throughput at the same memory budget, with reported accuracy loss limited to 3.6% relative to full-width inference. The result informs sparse-model deployment with an explicit quality trade-off rather than demonstrating CTR gains. — [Paper](https://arxiv.org/abs/2610.37442) · [DOI](https://doi.org/10.1145/3795866.3844472) (Shandong University; TU Berlin; City University of Hong Kong · MobiCom 2026). Reading priority: Unrated.

<a id="paper-2610-34514"></a>

- **Ambiguous Fits: The Rashomon Effect and Challenges in Scaling Law Estimation**: Ambiguous Fits examines the final fitting stage of neural scaling laws, where different parameter settings can fit observed data nearly equally well yet diverge in large-scale extrapolation. It replaces heuristic local searches with deterministic branch-and-bound optimization that guarantees nearly optimal fitting loss and maps near-minimizers to a range of implied scaling curves. This provides a way to expose fitting ambiguity when planning ranking-model scale; the guarantee concerns fitting loss, not accurate extrapolation or demonstrated CTR performance. — [Paper](https://arxiv.org/abs/2610.34514) (University of Cambridge; Google DeepMind · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39931"></a>

- **Low-Bit GDN Recurrent-State Quantization: Global Gradient-aware Allocation and Pure-Write Sliding Windows**: Combines gradient-aware mixed-precision allocation with an FP8 window of recent pure writes for low-bit GDN recurrent states. On Qwen3.5-4B/9B, the combination improves long-reasoning task scores over the evaluated quantization baseline while reducing excessive generation; similar-storage comparisons motivate spending capacity on recent writes rather than only higher state precision. — [Paper](https://arxiv.org/abs/2610.39931) (Zhejiang University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-38981"></a>

- **Why Speculative Decoding Works Better Than Predicted on Sparse MoE Models**: Studies speculative decoding across ten sparse MoE models and explains unexpectedly strong low-batch gains through expert routing overlap and kernel bandwidth utilization. An IPF model predicts unique activated experts with under 4% error in the reported evaluations, offering a more grounded cost model than parameter-byte counts alone. — [Paper](https://arxiv.org/abs/2610.38981) (Cohere · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2610-36009"></a>

- **DuplexTune: Coupled-State Replay for Memory-Efficient Mixture-of-Experts Adaptation**: Replays coupled hidden states through pretrained attention and expert modules using trainable width bridges, with bridge warm-up and frozen routers. A single-H800 Qwen1.5-MoE experiment reports 38.8 versus 64.8 GB peak memory and higher throughput than checkpointed fine-tuning, with task-dependent quality tradeoffs including weaker multilingual performance. — [Paper](https://arxiv.org/abs/2610.36009) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-34721"></a>

- **Prefetch-Steered Routing: Deterministic Cache-Aware Expert Selection for Offloaded Mixture-of-Experts Decoding**: Uses a deterministic logical expert cache to steer routing in offloaded MoE decoding, separating model decisions from physical transfer timing. Reported speed and quality tradeoffs vary by model, expert residency and workload; results provide a reproducible way to study cache-aware routing and prefetching together. — [Paper](https://arxiv.org/abs/2610.34721) (Hong Kong University of Science and Technology (Guangzhou) · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-34440"></a>

- **Speculative Decoding for Mixture-of-Experts Models: Expert Bytes, Kernel Bandwidth and the Best Draft Length**: Models MoE speculative verification time using requested expert bytes, effective kernel bandwidth and fixed overhead. Measured engines show that deduplicating expert reads can lose bandwidth efficiency, so fewer bytes do not always mean lower latency; the model estimates crossover points and draft lengths with explicit error bounds. — [Paper](https://arxiv.org/abs/2610.34440) (ReClan AI Studio, LLC · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39442"></a>

- **Softmax Routing Dynamics in Mixture-of-Experts Models: Collapse and Recovery**: Analyzes expert suppression and recovery in softmax routing through simplified fixed-expert and adapting-expert dynamics. Transformer-MoE interventions connect class-conditional router gradients to recovery delays, offering theoretical and experimental insight into routing collapse rather than a general guaranteed remedy. — [Paper](https://arxiv.org/abs/2610.39442) (Chinese University of Hong Kong; Beijing Normal-Hong Kong Baptist University; Guangzhou Nanfang College · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-42147"></a>

- **Latent Sparse Attention: Towards Subquadratic Ultra-Long Context Attention**: Clusters keys hierarchically in a learned latent space so queries select clusters rather than score every key. Distilled and natively trained variants improve ultra-long-context attention; reported 10M-token speedups concern individual attention layers, while native training achieves a 1.6x per-layer speedup at 128K. The indexer offers a design reference for long-history retrieval. — [Paper](https://arxiv.org/abs/2610.42147) (Prefrontal AI; ETH Zurich · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-42112"></a>

- **Subquadratic Attention with a Hierarchical Tree-Structured Indexer**: ZHA builds a tree of compressed KV summaries and retrieves keys top-down, giving subquadratic indexing and attention cost. The revision specifies a one-billion-token KL-distillation stage to adapt pretrained models while retaining evaluated retrieval and reasoning capabilities. Advantages beyond one million context tokens are projections from a performance model. — [Paper](https://arxiv.org/abs/2610.42112) (Zyphra Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-42030"></a>

- **There Is No Free Loop: When Does Looping a Trained Model Pay for Its Inference Compute?**: Evaluates post-hoc layer looping against both equal-parameter and equal-inference-FLOP baselines. Across tested Qwen3 and Qwen3.5 models from 0.8B to 9B, only the 0.8B looped model beats both baselines. The controlled comparisons provide a practical methodology for assessing the compute return of shared-depth scaling. — [Paper](https://arxiv.org/abs/2610.42030) (Microsoft Applied Sciences Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41994"></a>

- **DAMI: Dual-Axis Memory Initialization for Enhanced Long-Context Retrieval in Gated Linear Attention**: Jointly initializes decay parameters to distribute memory timescales across heads and input sensitivity across depth. Small activation samples calibrate the initialization without adding trainable parameters. Reported RULER-style retrieval gains span 5.29–16.71 percentage points across gated recurrent architectures, suggesting an initialization strategy for long-history memory. — [Paper](https://arxiv.org/abs/2610.41994) (SpeedAI; Beihang University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41720"></a>

- **UpLoop: Training Looped Transformers via Upcycling at No Extra Pretraining Compute**: Starts with a shallow Transformer, grows it by copying learned layers, and spends the saved early compute on repeated execution of a shared middle block. With final parameters, training tokens and FLOPs matched to a dense baseline, the 1.3B model improves its mean score over 22 tasks from 22.99 to 27.52, providing a compute-budgeted depth-scaling schedule. — [Paper](https://arxiv.org/abs/2610.41720) (Shanghai Jiao Tong University; University of Science and Technology of China · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41420"></a>

- **SparseGDN: Chunk Sparse in Linear Attention**: Combines a block-adjacent Delta solver with input-dependent recurrent-event selection, reconstructing every token output from compact state snapshots. On Qwen3.5-4B and 9B, retaining about 29% of recurrent events yields 1.50–1.94x GDN-core prefill speedups over native FLA kernels across 4K–128K contexts, including online selection overhead. — [Paper](https://arxiv.org/abs/2610.41420) (Zhejiang University; ByteDance · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41366"></a>

- **What We Keep of What We Forget: Replacement Operators and Routing Semantics in Training-Free MoE Expert Pruning**: Holds pruning masks fixed to isolate replacement operators and surviving-expert gate scales. Introduces the tilted novice, a closed-form low-rank input map that improves over constant replacement on OLMoE and Moonlight. Experiments show that preserving trained routing scale and choosing calibration data materially affect pruning results, informing practical sparse-model compression. — [Paper](https://arxiv.org/abs/2610.41366) (National University of Sciences and Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41236"></a>

- **Experts Exhibit Structured Redundancy: Structure-Preserving Expert Pruning for Mixture-of-Experts Large Language Models**: Treats expert pruning as structure-preserving subset selection: PEEP preserves weighted projection energy, while DCEP preserves distributional coverage with router-derived weights. Greedy selection achieves the best reported average results at 75% and 50% expert retention on DeepSeek-V2-Lite and Qwen3-30B-A3B, targeting MoE storage cost. — [Paper](https://arxiv.org/abs/2610.41236) (Peking University; Shanghai Jiao Tong University; Qilu University of Technology; Shandong Computer Science Center · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-39876"></a>

- **Turing LLM Post-Training: Calibrated Distillation and Efficient Dynamic-MoE Execution**: Combines calibrated multi-teacher on-policy distillation with bounded-width dispatch, final-route replay and asynchronous rollout–training overlap. Turing-20B-A2B retains at least 90.16% of measured specialist gains in each domain. The complete PPU execution configuration reduces consolidation step time from 398.7 to 139.3 seconds, illustrating coordinated routing and training-system optimization. — [Paper](https://arxiv.org/abs/2610.39876) (XPeng · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41074"></a>

- **Where, When, and How Many Bits? Scaling Laws for SGD with Stochastic Rounding**: Derives stochastic-rounding scaling laws in a two-layer linear model with a fixed random first layer, distinguishing forward and backward rounding and parameter averaging. The analysis connects width, training time and precision budgets, with MLP and small-Transformer experiments examining rounding choices beyond the theoretical setting. It informs low-precision training allocation. — [Paper](https://arxiv.org/abs/2610.41074) (University of California, Berkeley; ICSI; Lawrence Berkeley National Laboratory · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-40943"></a>

- **Kernel-based Interpolatory Methods for Context Compression of Attention Mechanisms**: Expresses attention as a ratio of linear maps and uses empirical interpolation to build GAIM and Q-DAIM KV-cache compression. Kernel surrogates reduce compression cost to linear time, and streaming variants update compressed history. Numerical experiments and preliminary LongBench-E results offer a numerical-analysis approach to long-context memory reduction. — [Paper](https://arxiv.org/abs/2610.40943) (Paul Scherrer Institute; EPFL · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-38095"></a>

- **Nemotron 3.5 Super and Lightning: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Models for Agentic AI**: Presents the 120B/12B-active Super and 30B/3B-active Lightning hybrid Mamba-Transformer MoE models, combining distillation, long-context training and native speculative decoding. NVFP4 quantization reports 99.62% median accuracy recovery relative to BF16. The report provides engineering recipes connecting sparse architecture, cache management and deployment precision. — [Paper](https://arxiv.org/abs/2610.38095) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41850"></a>

- **Dynamical Memory Transformer: Selective Recurrent Memories with Constant Cost Attention**: Separates recurrent sequence encoding from attention-based reading of memory-unit outputs. Input-dependent updates and diagonal complex recurrence permit linear-work associative scans with fixed-size inference state. Cognitive tasks and selective-copy extrapolation show benefits; language modeling is close to the evaluated Transformer but trails Mamba, offering an alternative long-sequence memory design. — [Paper](https://arxiv.org/abs/2610.41850) (Inria, University of Bordeaux · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03577"></a>

- **Sonar-MoE: In-Backward Expert Updates for Memory-Efficient Mixture-of-Experts Training**: Sonar-MoE updates batched expert tensors during backpropagation and releases their gradients immediately, limiting resident expert gradients to one layer. BF16 fine-tuning of two MoE models reduces peak memory by 19–22%; updates match standard training bitwise without expert gradient clipping, while step time falls 17–23% relative to global-norm-clipped training. — [Paper](https://arxiv.org/abs/2611.03577) (Microsoft; Singapore Institute of Technology; Indian Institute of Technology Kanpur; Indian Institute of Technology Delhi; Indraprastha Institute of Information Technology Delhi; Nanyang Technological University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03526"></a>

- **Library of Layers (LoL): Adaptively Ordering Transformer Layers at Runtime**: Library of Layers dynamically selects the order of Transformer blocks from a shared library at inference. Library size interpolates between parameter reuse and sparse computation; text pretraining is competitive with dense, recurrent and MoE baselines, while synthetic and multilingual studies expose input-dependent layer ordering. — [Paper](https://arxiv.org/abs/2611.03526) (EPFL; New York University; Columbia University; University of Maryland · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03344"></a>

- **FLAMIA: FLAsh MIcroscaling Attention for Fast and Causally Safe Training on Blackwell**: FLAMIA co-designs microscaling quantization, consistent forward/backward numerics and packed-document scheduling for Blackwell attention training. Including quantization, its MXFP8 path accelerates combined forward and backward attention by 1.10–1.40× on B200 and 1.06–1.42× on B300 against the fastest evaluated baseline per workload, with Llama-style pretraining checks. — [Paper](https://arxiv.org/abs/2611.03344) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03200"></a>

- **CISA: Retrofitting Dense Attention Models with Chunk-Indexed Sparse Attention**: CISA retrofits dense attention without gradient updates by selecting fixed-size KV chunks using compact key summaries and sharing selections across queries. A four-B300 Nemotron 3 Ultra NVFP4 serving test reports 2.29× end-to-end throughput; tighter chunk budgets increase speed while widening quality gaps. — [Paper](https://arxiv.org/abs/2611.03200) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03173"></a>

- **PagedMoE: Cross-Precision Expert Caching for Token-Level Dynamic Precision in SSD-Resident MoE Inference**: PagedMoE stores each SSD-resident expert in a prefix-compatible codebook and bitplane layout so cached low-bit representations can be extended rather than refetched. At 2.5-bit average routed-expert precision and a 24 GiB expert cache, Qwen3.5 reaches 8.89 tokens/s, 1.33× independent-precision objects and 1.56× uniform 4-bit execution, with quality close to GPTQ-INT4. — [Paper](https://arxiv.org/abs/2611.03173) (Tsinghua University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-02508"></a>

- **AttentionIndex: Accelerating Learned Sparse Attention with a Causal Inverted-File Index**: AttentionIndex uses a causal inverted-file index to avoid scoring every key in learned sparse attention. At one million tokens on GLM-5.3 and DeepSeek-V4-Flash, prefill throughput is 1.3–1.8× exhaustive selection; at throughput within 5% of HiSA it recovers 17 and 10 percentage points more of exhaustive top-k respectively. — [Paper](https://arxiv.org/abs/2611.02508) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-02436"></a>

- **M3Former: Fine-Grained Cross-Layer Mixing for Transformers**: M3Former lets query, key, value and residual roles read separate token-dependent mixtures of earlier layers, further separating groups of hidden dimensions. It initializes as an exact residual connection and can add only 1.4% parameters and 1.8% FLOPs; experiments from 100M to 1.4B parameters report gains over conventional and coarser cross-layer connections, with extensions to sparse MoE. — [Paper](https://arxiv.org/abs/2611.02436) (Tsinghua University; Shanghai Jiao Tong University; Shanghai AI Laboratory; Institute of Automation, Chinese Academy of Sciences; Nanyang Technological University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-01940"></a>

- **ReWY: Faster Backpropagation for Delta-Rule Attention - From 7 to 3 Matrix Multiplications**: ReWY algebraically simplifies the backward pass of DeltaNet, GDN, KDA and GDN2, reducing seven local WY matrix products to three while preserving exact-arithmetic gradients. GPU and Ascend implementations exploit further contraction reuse; matched-policy GPU tests report 1.15–1.81× geometric-mean low-level backward speedups. — [Paper](https://arxiv.org/abs/2611.01940) (Tianjin University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-00421"></a>

- **RankLane: Efficient MoE Prefill on Accelerators with Ranked Expert Capacities**: RankLane assigns dynamically ranked expert loads to fixed-capacity execution lanes, combining static shapes with runtime expert selection and full-capacity overflow recovery. Four Cloud AI 100 Ultra SoCs with MXFP6 weights show full-model prefill speedups of 1.27–4.18× for Qwen3-30B-A3B and 1.93–3.46× for Gemma 4 26B-A4B over the evaluated dense baseline. — [Paper](https://arxiv.org/abs/2611.00421) (University of California, San Diego; Qualcomm AI Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-01704"></a>

- **MatMoE: Matryoshka Mixture-of-Experts with Dynamic Mixed-Precision Quantization for Efficient Inference**: MatMoE combines nested multi-precision expert representations, floor-and-compensation quantization and routing-aware dynamic bit allocation for changing latency budgets. Implemented in llama.cpp, it reports 1.3–3.7× speedups on Raspberry Pi 5 and 1.2–1.3× on RTX 4090 and Jetson AGX Orin, alongside accuracy gains over the tested static mixed-precision method. — [Paper](https://arxiv.org/abs/2611.01704) · [Program](https://confcats-event-sessions.s3.us-east-1.amazonaws.com/iccad26/uploads/ICCAD_2026_Program_v17.pdf) (Peking University; Beijing Advanced Innovation Center for Integrated Circuits; Sun Yat-sen University; Southeast University · ICCAD 2026). Reading priority: Unrated.

<a id="paper-2611-01426"></a>

- **FlyWheel: Attention Kernels Built for the TPU**: FlyWheel reduces vector work and repeated matrix-operand loads in TPU softmax and linear attention, then overlaps independent computation. Tests on TPU v6e/v7x report up to 4.14× softmax-kernel and 3.61× Gated DeltaNet prefill speedups; Qwen3.8-27B integration improves serving prefill throughput by up to 1.56× with comparable accuracy. — [Paper](https://arxiv.org/abs/2611.01426) (New York University; New York University Shanghai; Google · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-01182"></a>

- **Fast and Exact Relative-Position Attention via Structure-Aware Kernels**: This work integrates additive relative-position attention into exact FlashAttention-style tiling using offset-aware reuse and sharded gradient aggregation. At 8K tokens it reports 1.8–6.4× forward and 2.0–21× backward speedups over the strongest evaluated baseline for each mechanism; a transcription integration is 1.8× faster and uses 2.4× less memory. — [Paper](https://arxiv.org/abs/2611.01182) (INSAIT, Sofia University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-01022"></a>

- **Jet-QSparse: Accelerating Agentic LLM Inference with 4-Bit Sparse Attention**: Jet-QSparse combines NVFP4 KV storage and native FP4 key scoring with sparse higher-precision value aggregation on Blackwell. A 128-block budget shows no detected loss on evaluated tasks; a separate 64-block setting gives Qwen3.8-27B a 1.94× decode speedup at 128K context and batch 16 on one GB300. — [Paper](https://arxiv.org/abs/2611.01022) (Carnegie Mellon University; Virginia Tech; Massachusetts Institute of Technology; NVIDIA; Sungkyunkwan University; University of California, Berkeley · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41819"></a>

- **ElTab: Elastically Looped Tabular Transformers**: ElTab trains one looped tabular Transformer with randomly sampled early exits to serve multiple compute budgets. Across 30 OpenML classification datasets it matches six depth-specific looped models with less than half their training cost and matches a 12-layer TabPFN-style baseline using 25% fewer inference FLOPs. — [Paper](https://arxiv.org/abs/2610.41819) (Technical University of Darmstadt; University of Texas at Dallas; Hessian Center for Artificial Intelligence; German Research Center for Artificial Intelligence · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-38331"></a>

- **Multi-Token Prediction Done Right**: Soft-MTP separates a useful KL self-distillation gradient from a noisy residual in multi-token prediction. Straight-through routing recovers the KL gradient from existing cross-entropy computations without vocabulary-sized logit matrices; 167M–1.2B language-model experiments report improved next-token perplexity, speculative decoding and zero-shot accuracy over standard MTP. — [Paper](https://arxiv.org/abs/2610.38331) (Massachusetts Institute of Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-36950"></a>

- **DCKV: Learned Transform Coding of the Prompt KV Cache in Hybrid Language Models**: DCKV jointly trains a transform, quantizer and conditional entropy model to compress the prompt KV cache against a frozen hybrid language model. On Qwen3.5-2B it reports over 55× fewer bytes per compressed token with at most 1.8-point loss on three long-context benchmarks, or over 100× compression with at most 3.6-point loss. — [Paper](https://arxiv.org/abs/2610.36950) (MIL Team; DAIMLD · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-02270"></a>

- **Hinted Scaling Laws**: Hinted Scaling Laws uses privileged hints to make difficult evaluations informative for small models, then extrapolates performance across hint levels and compute scales. On pretraining and post-training model families, the reported median forecast error on GSM8K, AIME and HLE falls from 21 to 4.3 percentage points, offering a model-development tool rather than a validated recommendation scaling law. — [Paper](https://arxiv.org/abs/2611.02270) (Stanford University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-41711"></a>

- **Hierarchical Residuals: A Minimalist Decoupling of Residual Width from Compute Width**: HiRes separates residual-state width from per-layer compute width: narrow Transformer layers operate inside blocks, while learned read/write projections connect a wider outer residual stream. Experiments report 1.30× FLOPs efficiency from fitted scaling laws and a 1.14-point downstream gain for OLMoE-1B-7B after 500B training tokens. This provides a practical capacity-scaling direction for Transformer rankers without widening every layer; CTR gains remain untested. — [Paper](https://arxiv.org/abs/2610.41711) (Tsinghua University; ByteDance Seed · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-05234"></a>

- **ARLoop: Fully-Open Pre-trained Looped Transformers with Attention Residuals**: ARLoop combines shared-layer recurrence with attention residuals that selectively reuse representations across depth. Sliding-window depth attention matches or exceeds full-history attention at larger recurrent depths, with gains observed in controlled 140M/370M experiments and 0.6B/1.2B pretraining. The design suggests a parameter-efficient way to scale ranking-model depth while limiting residual-history access; the reported evaluations are language-model tasks, not CTR. — [Paper](https://arxiv.org/abs/2611.05234) (The Ohio State University; Saarland University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04327"></a>

- **Anchor: Augmented Cross-Layer Recurrent State for Long-Context Retrieval in Test-Time Training**: Anchor finds that long-context retrieval in sliding-window-attention/TTT hybrids concentrates in a few layers. It places recurrent memory at these anchor layers and shares a state that is written once and read through layer-specific maps. On Llama-3.1-8B and Mistral-7B, it reports 2.3–3.1× higher recall than LoLCATs with a 10× smaller recurrent state and up to 4.3× lower latency than softmax attention. Shared memory is a promising direction for long user-history rankers, although recommendation transfer is not evaluated. — [Paper](https://arxiv.org/abs/2611.04327) (University of Arizona · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04313"></a>

- **Coarse Semantic Blocks for Efficient Training-Free Sparse Attention**: This training-free sparse-attention method clusters noncontiguous keys into large semantic blocks, selects blocks using centroid scores, and groups queries that access the same block. Including indexing overhead, Qwen3.5 models achieve 2.3–2.4× whole-model prefill speedups at 512K tokens on one H200; the 35B-A3B model remains close to dense attention on several long-context benchmarks. Semantic block selection and grouped execution could reduce long behavior-history attention cost, but CTR accuracy and production ranking latency are untested. — [Paper](https://arxiv.org/abs/2611.04313) (Preferred Networks · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04401"></a>

- **LiquidCP: Decoupling Attention Tasks from Communication and Kernel Boundaries in Context Parallelism**: LiquidCP schedules context-parallel attention as tile-dependent transfer, compute, and reduction tasks rather than tying execution to communication and kernel boundaries. MegaRing balances token and attention loads for training/prefill, while MegaDCP schedules history-KV splits for decoding. On eight H100s, MegaRing improves core-attention forward/backward speed by 1.23×/1.18× and Transformer-layer speed by 1.08–1.16×. Its load balancing and overlap mechanisms are relevant to distributed long-history rankers, with recommendation-specific benefits still unverified. — [Paper](https://arxiv.org/abs/2611.04401) (Shanghai Jiao Tong University; Sun Yat-sen University; National University of Singapore; Guizhou University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-06828"></a>

- **Systolic Linear Attention: Co-Designing Tile-Grouped Gated Delta Attention for TPUs**: SLA co-designs gated-delta linear attention for TPU systolic units: 256-wide keys shared by grouped value heads, tile-grouped decay gates and matrix-based chunk solves in a fused kernel. On TPU v7x, SLA-R4 layers are reported 1.6–2.5x faster than the open Tokamax KDA kernel. In a 2,048-chip study of 6.5B–63.1B sparse MoE models, training is 11–24% faster at similar perplexity. The results concern TPU-aligned attention design, not measured recommendation gains. — [Paper](https://arxiv.org/abs/2611.06828) (Google · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-05906"></a>

- **CHARM+: Cross-Hardware Attention with Re-Merge Multistream Mechanism**: CHARM+ reorganizes distributed long-sequence attention communication into levels to overlap transfers and computation. It separates cross-NUMA or cross-node exchanges from local communication to reduce synchronization under unequal bandwidth. Relative to Ring-Attention, reported average forward/backward speedups are 1.3x/1.7x on dual-NUMA PCIe and 2.8x/2.9x on dual-node NVLink systems. These are attention implementation measurements, with potential relevance to distributed long-history model training. — [Paper](https://arxiv.org/abs/2611.05906) (Lenovo Research · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-04671"></a>

- **LeanSparse: Memory-Efficient Serving for Native Sparse-Attention LLMs**: LeanSparse reduces both persistent decode memory and temporary prefill memory for native sparse-attention models. It streams prefill histories through two reusable GPU buffers and uses compact coarse-to-fine indexing to fetch original indexer keys only for candidate refinement, with separate indexer and KV caches. Implemented in SGLang on DeepSeek-V4-Flash, it reports 2.95x concurrency and 2.14x decode throughput over HiSparse at 950K context, plus lower multi-turn latency in the evaluated traces. — [Paper](https://arxiv.org/abs/2611.04671) (University of California San Diego · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03768"></a>

- **Multi-layer Indexer: Overlapping Selection and Attention in DeepSeek Sparse Attention**: MLI overlaps sparse-attention selection and computation by letting a layer attend to the previous indexer layer's selected tokens while its own indexer runs. It composes with IndexCache's cross-layer reuse and needs no retraining or new weights for its default implementation. In SGLang evaluations on DeepSeek-V3.2 and GLM-5, equal-retention decode gains reach 14.5% and 9.8%, respectively; LongBench and RULER quality stays within a few percentage points of IndexCache. It trades selection freshness for overlap rather than proving exact equivalence. — [Paper](https://arxiv.org/abs/2611.03768) (Writer · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04376"></a>

- **Aligning Training and Rollout Policies for End-to-End FP4 RL on Mixture-of-Experts LLMs**: MoEResQ studies quantization recovery for end-to-end FP4 reinforcement-learning post-training of MoE models. Discrete expert routing makes train–rollout alignment sensitive to applying recovery corrections on only one side; the proposed recipe applies them symmetrically. The paper reports restored probability and routing alignment and a smaller accuracy gap to full precision. This is a transferable warning for low-precision sparse routing, not a recommendation-system benchmark. — [Paper](https://arxiv.org/abs/2611.04376) (Huawei · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-08376"></a>

- **Muir: Linear Attention with Sensitivity-Allocated Gating and Matched-Filter Readout**: Muir addresses uneven sensitivity in linear-attention erase and write gates and interference from slow-decaying state rows. It combines low-rank gate projections, a matched-filter readout and a numerically stable parallel update, reallocating saved parameters to the feed-forward network. Across 166M–1.34B models, it reports 1.8–2.0% lower perplexity than GDN-2 while matching its throughput; at 32K context, training is 2.7x faster than Transformer. Its 1.34B model also extrapolates from 4K training sequences to 10M-token streams without perplexity drift. Sensitivity-aware state updates offer a direction for long-history recommendation, which is not evaluated here. — [Paper](https://arxiv.org/abs/2611.08376) (University of Texas at Austin; Google · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07552"></a>

- **SPARE: Fast Linear Attention Decoding with Compact Recurrent States**: SPARE targets the memory traffic of linear attention's recurrent states, whose size grows quadratically with representation width. Without retraining, it uses fixed low-dimensional subspaces, heterogeneous ranks and write compensation to read and update compressed states directly, avoiding online decomposition and dense reconstruction. The abstract reports 2.55x full-model decode speedup, 7.49x lower recurrent-kernel DRAM traffic and 3.31x lower peak GPU memory, but does not identify the speed baseline or hardware. Associative retrieval is better than structured pruning at matched memory budgets. The mechanism offers a candidate approach for compact long-history states. — [Paper](https://arxiv.org/abs/2611.07552) (University of Virginia · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07496"></a>

- **ZYFA: Speed and Accuracy of FP8 FlashAttention on AMD CDNA4**: ZYFA targets the softmax and scheduling bottlenecks that limit FP8 attention on AMD MI355X. It combines direct score-to-FP8 probability conversion, overlapping matrix multiplication with softmax, and blockwise probability scaling before rounding. On activations captured from three models at sustained clock speeds, its prefill kernels deliver 1.16–1.76x AITER throughput. At head dimension 128, numerical error is close to Composable Kernel and Triton and lower than AITER. The paper also shows why random-input benchmarks can mispredict real-activation throughput on this hardware. This is a hardware-specific attention-kernel result, not an end-to-end recommendation speedup. — [Paper](https://arxiv.org/abs/2611.07496) (Zyphra · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07256"></a>

- **TriAttention: Unified Sparse Mixed-Precision Attention for Long-Context LLM Inference**: TriAttention jointly chooses which attention tiles to retain and whether to compute them at 4 or 8 bits. Two diagonal-distance boundaries per head encode the policy; offline calibration and model-wide allocation select boundaries under a shared compute budget. A fused prefill kernel combines both precisions, and decoding reuses the compressed KV cache. The abstract reports up to 2.65x end-to-end generation speedup over a BF16 baseline, with comparable general and long-context task quality, but does not specify the hardware or baseline implementation. Joint retention and precision allocation could inform long-sequence serving beyond LLMs. — [Paper](https://arxiv.org/abs/2611.07256) (University of North Texas; Saint Louis University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07232"></a>

- **Recursive Sparse Attention: Million-Token Length Extrapolation at Logarithmic Cost**: RecSA builds a tree over the KV cache and recursively selects candidates, combining exact tokens with summaries of unselected subtrees in one softmax. A per-layer pooler shared across tree levels and level-relative positions keep selection and reads logarithmic in sequence length while supporting length extrapolation. Starting from Qwen3-4B, training uses 0.62B tokens at 32K length. At 1M tokens, RULER scores 60.5 versus 40.0 for the best baseline, Dense + DCA. At 524K on one H200, prefill and decoding are 3.2x and 3.8x faster than dense attention. Hierarchical retrieval offers a transferable long-history design, without recommendation evaluation. — [Paper](https://arxiv.org/abs/2611.07232) (University of California, San Diego; Carnegie Mellon University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07226"></a>

- **Loopback Transformer: Towards a Unified View of Residual Looped Transformers**: Loopback separates the shared stack's input from individual residual updates, avoiding the repeated reweighting of history carried inside full block outputs. Geometric decay controls total update weight and recency, while attention allocates weight across updates. On ClimbMix, with training tokens and executed depth matched, it reaches lower validation loss than standard Transformers using 40–75% of their Transformer parameters, excluding embeddings and the output head, at reference scales of 191M–3B. It also improves mean accuracy on 13 tasks at 1.4B and 3B. The result informs parameter-efficient recurrent depth, not a demonstrated FLOP or latency reduction. — [Paper](https://arxiv.org/abs/2611.07226) (University of Wisconsin–Madison; University of California, Santa Barbara; California Institute of Technology; Microsoft · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07149"></a>

- **FastAFD: When Does Attention-FFN Disaggregation Pay on Rack-Scale NVLink?**: FastAFD tests when separating attention and MoE experts pays off on GB200 NVL72. It overlaps attention and expert computation across microbatches and compares against the best vLLM wide-expert-parallel configuration. Throughput gains reach 1.17x on Qwen3 and 1.16x on Qwen3.5, while MiniMax-M2.5 is matched. A model using colocated profiles predicts throughput within 3% and separates batch-size gains, overlap gains and the GPU cost of disaggregation. This gives a hardware-specific decision framework for sparse-model serving; the larger projected speedup with future SRAM-resident expert accelerators is not a measured result. — [Paper](https://arxiv.org/abs/2611.07149) (University of California, San Diego · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07084"></a>

- **DMuon-2: Scaling Matrix Optimizers in Data Parallelism with Topology-Aware Matrix Ownership and Communication**: DMuon reconciles whole-matrix optimization with sharded data-parallel training. Each matrix has one cost-balanced owner for its optimizer update; global ownership under HSDP avoids replicated optimizer work and state, while readiness-driven collectives follow the network topology. Across three dense LLMs and two VLA models on up to 256 H100s, it reports median throughput of 1.05x PyTorch FSDP2 with AdamW at 256 GPUs and 2.1x a gather-then-replicate Muon baseline. Matrix-level ownership and communication scheduling could help scale matrix optimizers for recommendation, but no recommendation or model-quality benefit is established here. — [Paper](https://arxiv.org/abs/2611.07084) (X Square Robot · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-06984"></a>

- **AdaFloor: Adaptive Floor Planning and Rank-Time Reuse for Long-Tail MoE RL Rollouts**: AdaFloor reclaims idle rank-time in synchronous MoE RL rollouts by planning KV-safe layouts, shrinking expert-parallel groups, and leasing detached ranks for auxiliary work. Different configurations target capacity, sidecar reuse, or latency: on 16-rank Qwen3-30B-A3B math rollouts, capacity mode reduces dummy-run rank-time by 96.15%; sidecar mode serves 3,134 Qwen3-8B queries per epoch with a 2–3% primary-throughput cost against its own no-sidecar configuration; latency mode cuts rollout time by 24.09% versus Vanilla. Public code rollouts show a 20.56% time reduction with stable work and reward. Elastic resource reuse may inform uneven-length serving, but these are distinct configurations and not recommendation results. — [Paper](https://arxiv.org/abs/2611.06984) (Tsinghua University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-06133"></a>

- **Accelerating Long-Context Decoding in Large-Scale Hybrid LLMs Without Retraining**: This method sparsifies the remaining full-attention layers in hybrid LLMs without retraining or changing weights. Each layer retains a recent window, a pinned prefix and a fixed budget of relevant context tokens, with per-layer settings chosen by multi-objective search. Across six models from three families, spanning 4B–397B parameters, selected configurations preserve baseline accuracy on 21 long-context datasets. At 256K context, reported decoding speedups reach 2.22x on Qwen3.5-4B, 2.23x on Qwen3.5-122B-A10B and 2.06x on Ornith-1.0-397B. Layer-specific sparse budgets offer a design to test for hybrid recommendation models, not an established recommendation result. — [Paper](https://arxiv.org/abs/2611.06133) (RIKEN Center for Computational Science · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-06057"></a>

- **vExpert: Virtualizing Expert Storage for Adaptive Load Balancing in Distributed MoE Inference**: vExpert addresses the mismatch between static expert placement and dynamic MoE routing. It keeps fully redundant expert storage in host DRAM, virtualizes GPU expert slots and uses a performance model covering host-to-device transfers, PCIe contention and load imbalance to choose mappings. A separate manager reduces multiprocess host-memory overhead. On DeepSeek-V3.1 in an eight-node H100 cluster, the system reports up to 55% improvement in its load-balance ratio and 1.2x end-to-end speedup. The design offers a systems approach to dynamic expert placement; its recommendation applicability and behavior on other interconnects remain untested in the abstract. — [Paper](https://arxiv.org/abs/2611.06057) (Tsinghua University; Infinigence AI; BNRist · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-05984"></a>

- **On the Design of Hyper-Connections: Simplification, Stability, and Scalability**: SimpleHC studies which Hyper-Connection components justify their training cost. It removes residual mixing while retaining learned read/write gates, then shares memory access through batched reads and deferred writes with scalar corrections that preserve preceding update contributions. Across 15B–30B MoE models, it maintains performance comparable to mHC; at the largest tested scale, end-to-end training takes only 2.4% longer than a vanilla residual baseline. It also reports smoother training gradients and stability under stress. Separating useful residual-state structure from expensive memory access could guide deeper recommendation architectures, which are not tested here. — [Paper](https://arxiv.org/abs/2611.05984) (Shanghai Jiao Tong University; Dots Studio, Xiaohongshu; Peking University; Independent Researcher; Nanyang Technological University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04222"></a>

- **GC-MoE: Overlapping Expert-Parallel Token Dispatch with FP8/FP4 Grouped GEMM via CUDA Green Contexts**: GC-MoE separates expert-parallel dispatch and grouped GEMM onto communication and compute partitions using CUDA Green Contexts. Independent kernels, a token-ring handshake and double-buffered counters overlap work without the usual trailing cross-rank barrier. At matched accuracy, the operator beats Mega MoE across all 54 measured points. On eight H20s, reported DeepSeek-V4.1-Flash decode speedup averages 1.188x in both routed and shared-expert suites; on eight B300s, GLM-5.2 and DeepSeek-V4.1-Flash average 1.106x, or 1.123x with fused shared experts. This supports hardware-aware partitioning for sparse inference, not a general recommendation throughput claim. — [Paper](https://arxiv.org/abs/2611.04222) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03590"></a>

- **A Scaling Theory of Multi-Epoch Pretraining: Late-Time Overfitting and Ensembling**: This study asks how to allocate compute between repeated training and ensembling when data are fixed. FineWeb language-model experiments show that logit averaging can reduce late-training deterioration and outperform wider or deeper single models at matched parameter-token budgets over a common training horizon. A dynamical mean-field theory for power-law random-feature ensembles links the benefit to reduced prediction variance and derives allocation laws at fixed data and individual model sizes. Data-limited recommendation may benefit from testing this trade-off, but the theoretical model is not a universal LLM scaling law, and inference cost is not matched by the stated training-budget comparison. — [Paper](https://arxiv.org/abs/2611.03590) (University of Texas at Austin; Carnegie Mellon University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-05804"></a>

- **Matching the Training-Time Weight Rule in Inference-Time Expert Deactivation**: This study isolates how expert deactivation interacts with the router weighting rule used in training. It compares removal, freezing, remaining-expert renormalization and unnormalized rerouting on identical disabled sets across five instruction-tuned checkpoints from four families, plus a base OLMoE model. With half the experts disabled, retaining the training rule yields perplexity of 1.4–73x the intact baseline; mismatches yield 14–28,740x. Even matching the rule does not guarantee task quality: OLMoE GSM8K strict-match accuracy falls to zero under all four implementations. Expert compression therefore needs routing-scale and task-level checks, not just expert importance rankings. — [Paper](https://arxiv.org/abs/2611.05804) (Zhejiang Gongshang University; University of Sussex; Chang’an University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-05304"></a>

- **LoopVQ: Sub 1-bit KV Cache Quantization for Looped Transformers**: LoopVQ addresses KV-cache growth in looped Transformers by jointly vector-quantizing channels across loop steps and tuning codebooks to match full-precision outputs. On Ouro and Huginn, it outperforms standard-model KV quantizers at 0.5 bits per element; combining it with TaSQ retains much of BF16 accuracy at 0.25 bits. Its SGLang implementation nearly halves decode latency at 32K context and reports peak throughput gains up to 4.3×/6.1× on Ouro 1.4B/2.6B relative to BF16. The design is relevant to the cache costs of recurrent-depth generation, but recommendation performance is not evaluated. — [Paper](https://arxiv.org/abs/2611.05304) (Seoul National University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07211"></a>

- **Not All Loops Cost the Same: Phase-Dependent Depth for Serving Looped Transformers**: LoopDuet independently selects prefill and decode loop budgets for pretrained looped Transformers, compacts tokens needing further recurrence, and adapts prefill depth using queue age. In a vLLM evaluation on full HotpotQA with one A100-80GB, Huginn achieves 19% higher throughput than the fastest tested uniform-depth setting meeting the same accuracy criterion. Two tested OLMo arrival traces show better answer accuracy while all requests meet a one-second time-to-first-token target. These results concern the reported QA serving settings and motivate, but do not validate, phase-specific compute allocation for recommendation. — [Paper](https://arxiv.org/abs/2611.07211) (Duke University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03998"></a>

- **Dory1.0-4B: A Looped Normalized-GPT**: Dory1.0-4B combines a normalized Transformer backbone, interleaved sliding-window/full attention and a shared recurrent block to vary inference depth from one checkpoint. Training uses six trillion tokens followed by supervised and verifiable-reward post-training with a difficulty-aware loop curriculum. More loops improve the reported coding, agentic and long-context results. Keeping only the final loop’s keys and values prevents KV-cache size from growing with loop count while retaining most reported accuracy gains. This supplies an elastic-depth and cache-management design for further study, not evidence of recommendation performance. — [Paper](https://arxiv.org/abs/2611.03998) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-03142"></a>

- **DepthGraft: Structural Regularization through Hierarchical Cross-Layer KV Reconstruction**: DepthGraft uses hierarchical cross-layer KV sharing to address depth-wise information dilution in Pre-LN models. Reconstructing deeper KV from stride-aligned shallow and middle layers creates non-local gradient paths to the source projections, while retaining early completion of prefill and reducing the KV cache by roughly one third. Experiments on 0.5B–16B dense and MoE language models report downstream improvements under GQA and MLA. The design links cross-layer representation learning with cache efficiency; its benefit to deeper recommendation models remains to be tested. — [Paper](https://arxiv.org/abs/2611.03142) (Shanghai Jiao Tong University; Shanghai Innovation Institute; Xiaohongshu · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-04449"></a>

- **Near-Zero Token Embeddings Silently Stall Training in Gated Sequence Models**: The paper traces a training failure in gated sequence models to near-zero input embeddings: vanishing current-token readout can suppress history, allowing repeated Pre-RMSNorm amplification to produce extreme gradients and overflow FP32 global-norm clipping. GroupClip isolates embedding clipping with a 64-bit or rescaled norm; GateFloor prevents a zero-valued SiLU gate at zero input during pretraining. The reported language-model experiments show recovery of discarded updates and reduced gradient amplification. These checks may inform long-sequence model training, but the failure and remedies have not been demonstrated in recommender systems. — [Paper](https://arxiv.org/abs/2611.04449) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-01864"></a>

- **Quantizing Recurrent Language Models Is Easier Than You Think**: This study separates recurrent-model quantization into weights/activations outside the state and the repeatedly updated decode state. Controlled 1.3B models show weaker residual outlier channels with decayed recurrences than with softmax attention. Its LoReS pipeline groups scales along the value axis, protects slowly decaying heads or channels with mixed precision, and uses stochastic rounding to limit repeated-quantization error. Experiments on Qwen-3.5 9B, Nemotron-H 8B and Kimi-Linear 48B-A3B support robust 8-bit states, with lower effective precision on shorter decode horizons and end-to-end vLLM speedups. Recommendation deployment remains to be tested. — [Paper](https://arxiv.org/abs/2611.01864) (Max Planck Institute for Intelligent Systems; ETH Zürich; Tübingen AI Center; ELLIS Institute Tübingen; MIT CSAIL; Liquid AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07217"></a>

- **TileQuant: Tile as the Precision-Allocation Unit for LLM Mixed-Precision Post-Training Quantization**: TileQuant allocates post-training precision to hardware-aligned 2D weight tiles rather than whole columns. Offline activation- or gradient-based sensitivity scoring selects tiles to retain at 16-bit, while the remaining tiles use 8-bit. Compact buffers and a mixed integer/16-bit kernel reduce memory traffic without runtime outlier detection. In the reported Llama-3.2-3B test on an A100-40GB with batch size one, generation throughput reaches 2.66× the original model; separate evaluations cover language modeling, reasoning, retrieval and QA quality. Its contribution is the joint choice of sensitivity granularity and execution layout; gains for recommendation models are untested. — [Paper](https://arxiv.org/abs/2611.07217) (University of North Texas; Saint Louis University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04887"></a>

- **FourSight: Stable FP4 RL Post-Training via Sequence Filtering and Sparse Channel Compensation**: FourSight targets concentrated errors in NVFP4 W4A4 reinforcement-learning post-training: it filters trajectories with severe training–inference mismatch and retains high-variance activation channels in BF16 while using native FP4 elsewhere. Its fused SpliceGEMM kernel separates prefill and decode paths. Reported quality evaluations retain near-BF16 accuracy; system evaluations extend to 120B-scale models with at most 2.3% additional step-time overhead over the uncompensated FP4 baseline. The approach offers a concrete way to investigate low-bit training mismatch; its effectiveness in generative recommendation remains untested. — [Paper](https://arxiv.org/abs/2611.04887) (Hong Kong University of Science and Technology; Hong Kong University of Science and Technology (Guangzhou); Alibaba Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09700"></a>

- **Attend at the Right Resolution: Head-Adaptive Sparse Attention via Query-Key Interaction Structure**: HASA makes training-free sparse attention selection depend on each pretrained head’s query-key interaction structure. The operator’s singular spectrum determines a compact response space, while neighboring sequence regions are merged according to response coherence. Attention then uses the original full-dimensional keys and values for selected regions. The paper reports improved long-context benchmark accuracy and attention speed relative to a recent sparse baseline. Its practical contribution is joint control of feature-space selection cost and sequence granularity, rather than a fixed token-selection heuristic. Applying this design to long user histories or ranking models still requires recommendation-specific evaluation. — [Paper](https://arxiv.org/abs/2611.09700) (University of Houston; University of Oklahoma · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-08924"></a>

- **ResQAdam: Residual-Preserving Adaptive Optimization for Memory-Efficient Quantization Aware Training**: ResQAdam targets the optimizer-state cost of quantization-aware training. It retains one BF16 momentum tensor, applies Adam updates within a low-dimensional principal subspace, and preserves information outside that subspace through a normalized residual-sign update. This addresses the loss of useful momentum caused by repeatedly discarding low-rank projection residuals. Across from-scratch and fine-tuning QAT pipelines, including weights down to two bits, the authors report 71–74% lower optimizer-state memory than AdamW with less than 2% training-throughput reduction. The memory accounting excludes embeddings and the output head; these are optimizer-state savings, not total training-memory savings. Benefits for large recommendation models remain untested. — [Paper](https://arxiv.org/abs/2611.08924) (Mohamed bin Zayed University of Artificial Intelligence; King Abdullah University of Science and Technology; Advanced Micro Devices; Carnegie Mellon University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09412"></a>

- **MIRA: Mitigating Pole Geometry Bias in Recurrent Language Models**: MIRA approaches recurrent language modeling as an infinite-impulse-response system. Its lattice–ladder realization supports temporal modes associated with both real and complex-conjugate poles, avoiding the real-axis restriction of several recurrent parameterizations while retaining linear-time sequence processing and parallel computation. The authors pretrain a 12-layer, 0.14B-parameter MIRA-S model and report lower perplexity, better context-length generalization, and higher throughput than recurrent baselines, with a dedicated CUDA kernel. This suggests an alternative sequence-mixing design for long behavioral histories, but the evidence is small-scale language modeling rather than industrial recommendation or large-model scaling. — [Paper](https://arxiv.org/abs/2611.09412) (University of Galway; Research Ireland D-REAL; Université Laval; Canada–CIFAR AI Chair; Mila; University of California, Merced · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09722"></a>

- **FOSCAR: Accelerating Decode Attention over 2- and 4-Bit KV Caches through Affine Folding**: FOSCAR accelerates decode attention over two- and four-bit KV caches by moving quantization scales and offsets into the other matrix operand or the output, rather than dequantizing each element separately. This affine folding reduces instruction overhead while preserving the dequantized result in exact arithmetic. Hardware-specific pipelines target Hopper and Blackwell GPUs, and an SGLang integration evaluates long-context serving. The distinction between kernel speed and end-to-end throughput matters when interpreting its gains. The technique is relevant to bandwidth-limited generative recommendation serving, but recommendation-specific quantization quality and serving performance remain untested. — [Paper](https://arxiv.org/abs/2611.09722) (Together AI; University of Sydney · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09825"></a>

- **BitDecoding-FP4: Native FP4 KV Cache Decoding via Algorithm-System Co-Design**: BitDecoding-FP4 co-designs quantization and GPU kernels for native FP4 KV-cache decoding. It separates queries into two FP4 residual components, rescales attention probabilities to avoid underflow, and suppresses key outliers through smoothing, rotation, and scale search. A fused transposed-softmax implementation supports paged caches. The paper evaluates dense and MoE models with GQA and MLA and reports close-to-BF16 quality; B300 serving experiments on two Qwen3 models show higher peak throughput. These hardware- and workload-specific results suggest techniques for low-bit generative recommendation, but do not demonstrate recommendation accuracy or serving gains. — [Paper](https://arxiv.org/abs/2611.09825) (University of Edinburgh; Tencent Hunyuan · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09598"></a>

- **Transformer-FSQ: Discrete Latents for Extreme KV-Cache Compression**: Transformer-FSQ replaces standard key and value projections with a finite-scalar-quantization bottleneck. Each cached token is stored as packed integer codes without per-token quantization metadata, and adapting a pretrained model trains only those projections. A fused Triton kernel consumes the compressed codes directly. Experiments across 0.6B–8B language models examine extreme compression and long-context retrieval, with strong accuracy relative to evaluated compression baselines. The contribution is extending retained context under a fixed memory budget, not uniformly accelerating every configuration. Applying the approach to persistent user histories would require projection adaptation and recommendation-specific quality checks. — [Paper](https://arxiv.org/abs/2611.09598) (University of Edinburgh · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09109"></a>

- **DARIC: A Position-Independent KV Cache Reuse System with Distribution-Aware Recomputation**: DARIC reuses position-independent KV caches while selectively recomputing tokens to restore interactions between cached chunks. Its selection rule follows observed distributions of cache deviations, balancing recomputation overhead against generation quality. A lightweight system design aims to preserve existing inference-engine optimizations rather than requiring a separate execution path. Across the evaluated language models and datasets, the paper reports faster time to first token with little quality loss. Reusing shared content or user-history segments could be useful for generative recommendation, but the applicable sharing patterns, cache-management costs, and recommendation quality have not been established. — [Paper](https://arxiv.org/abs/2611.09109) (Lenovo Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2607-00466"></a>

- **ELDR: Expert-Locality-Aware Decode Routing for PD-Disaggregated MoE Serving**: ELDR routes decode requests by expert locality in prefill–decode-disaggregated MoE serving. Prefill signatures predict later expert use, balanced clustering builds worker profiles, and a locality-band policy chooses a lightly loaded worker among close matches. A block-granular signature cache supports prefix reuse. In vLLM experiments using up to 40 GPUs, the method lowers median time per output token while preserving model outputs and token-to-expert assignments. This is a serving-layer placement improvement, not a change to the model router. Its usefulness for sparse recommendation models depends on comparable workload structure and remains unverified. — [Paper](https://arxiv.org/abs/2607.00466) (KAIST; Microsoft Research; Shanghai Xingyunzhili Artificial Intelligence Institute · arXiv 2026). Reading priority: Unrated.

<a id="paper-2605-22791"></a>

- **Gated DeltaNet-2: Decoupling Erase and Write in Linear Attention**: Gated DeltaNet-2 separates the channel-wise gates that erase old associations and write new values in a linear-attention recurrent state. It retains adaptive forgetting and channel-wise decay, while providing a chunkwise WY algorithm and gate-aware backward pass for parallel training. At 1.3B parameters trained on 100B FineWeb-Edu tokens, the paper compares language modeling, commonsense reasoning, and retrieval against recurrent baselines, with particular gains on long-context retrieval. The design offers a concrete memory-update mechanism for exploring long user sequences. Its recommendation accuracy and throughput on industrial ranking workloads remain untested. — [Paper](https://arxiv.org/abs/2605.22791) (NVIDIA · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-12729"></a>

- **KiteNorm: Variance Regularisation for Stable and Scalable Post-LN Transformers**: KiteNorm addresses the difficulty of scaling Post-LayerNorm Transformers by controlling hidden-state variance throughout training. It combines residual scaling, variance regularization and separately learnable scales for skip and residual branches. Experiments on decoder-only models up to 1.3B parameters report improved stability and favorable scaling across depth, width, batch size and training budget. This offers a concrete normalization recipe to investigate in deeper CTR architectures; recommendation gains have not been established. — [Paper](https://arxiv.org/abs/2611.12729) · [Venue](https://neurips.cc/Downloads/2026) (ELLIS Institute Tübingen; MPI for Intelligent Systems; Tübingen AI Center · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-10560"></a>

- **Large Language Models without QK-Normalization**: QK-MAP controls query-key scale without discarding token-specific magnitude information. Multiple learnable frequencies encode changes in magnitude as bounded phase patterns, keeping periodic features at fixed norm while preserving scale sensitivity. Models from 190M to 7B parameters achieve lower training and validation loss than standard attention and QK-Norm, with additional synthetic long-context evidence. The design suggests an alternative to normalizing away query/key magnitudes in scalable ranking Transformers; transfer to recommendation remains untested. — [Paper](https://arxiv.org/abs/2611.10560) (Peking University; Key Laboratory of High Confidence Software Technologies, Ministry of Education; Zhejiang University; Qilu University of Technology; Shanghai Jiaotong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11223"></a>

- **SGA-Sparse: Training Native SwiGLU Gates for Activation-Sparse and Low-Bit LLMs**: SGA-Sparse trains the existing SwiGLU gate as a fixed-budget top-k router, updating all model parameters without adding a separate router. After about 30B training tokens, 1B-8B LLaMA models retain 75-85% FFN channel sparsity with a 0.2-2.7 percentage-point average zero-shot accuracy gap to their dense checkpoints. Quantization-aware training helps combine sparsity with low-bit weights. The work informs sparse ranking-model FFNs, but its bit-equivalent comparison measures weight traffic, not realized end-to-end latency. — [Paper](https://arxiv.org/abs/2611.11223) (Meta AI · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-10634"></a>

- **Coverage-Verified Sparse Attention: Closed-Loop Quality Control for Long-Context LLM Decoding**: Coverage-Verified Sparse Attention adds a verify-and-correct loop to long-context decoding. It uses the softmax mass covered by selected tokens to decide whether to accept sparse attention and how to recover deficient heads. Evaluations at 7B and 70B parameters report near-dense benchmark quality and a maximum measured median decode-step speedup of 6.21x at 128K context. This suggests quality-aware compute allocation for long behavior sequences; the reported results are from language-model decoding rather than recommendation. — [Paper](https://arxiv.org/abs/2611.10634) · [Venue](https://neurips.cc/Downloads/2026) (National Taiwan University · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-11319"></a>

- **Verify Before You Fetch: Reliable KV Cache Compression for LLM Inference**: VerKV keeps pivotal tokens and a compact sketch on the GPU while retaining the complete KV cache in host memory. It estimates attention error for each query and fetches additional tokens only when the configured error tolerance is not met. On three language models at 32K context, evaluations averaged over RULER and LOFT retain 90-100% of dense quality while reducing GPU cache memory by 8-32x. Query-dependent verification is relevant to long-sequence serving, though the recommendation setting and its transfer costs require separate evaluation. — [Paper](https://arxiv.org/abs/2611.11319) (Indian Institute of Technology Bombay; Rice University; University of California, Berkeley · arXiv 2026). Reading priority: Unrated.

<a id="paper-2607-11976"></a>

- **LiteTopK: Exploiting the Curse of Dimensionality for a Fused Indexer-TopK Kernel in Long-Context Sparse Attention**: LiteTopK fuses score computation with candidate filtering to avoid materializing a full score matrix before top-k selection. Small samples estimate a score threshold; the two implementations use conservative filtering or a predicted threshold with fallback. LiteDSA additionally reuses overlapping keys and values across nearby queries. Integration into vLLM, SGLang and Megatron-LM reports up to 1.49x prefill speedup at 1M context on eight B200 GPUs. The shared Indexer-TopK primitive makes this directly relevant to recommendation retrieval, without establishing recommendation-specific speedups. — [Paper](https://arxiv.org/abs/2607.11976) (Nanyang Technological University; ETH Zurich; The Chinese University of Hong Kong · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11364"></a>

- **OOM: Offload-Optimized Full-Parameter MoE Training via Memory-Execution Co-Design**: OOM jointly plans expert execution, resident model state, retained activations and temporary worksets for CPU-offloaded MoE training. Cost models and short trial executions select configurations under GPU and host-memory budgets. On four H100s, it separately demonstrates training with 1M-token contexts and training a 122B-parameter MoE; matched-batch comparisons show geometric-mean throughput gains over CPU-offloaded FSDP2 on H100 and RTX 4090 platforms. The resource-allocation design can inform sparse recommendation training, but the evaluated workloads are language models. — [Paper](https://arxiv.org/abs/2611.11364) (The Hong Kong University of Science and Technology (Guangzhou) · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11857"></a>

- **OverlapAdvisor: Modeling and Adapting Computation-Communication Overlap for Distributed MoE Serving**: OverlapAdvisor models compute-communication dependencies at two granularities to select an overlap strategy for expert-parallel MoE serving. The preferred strategy changes with model shape, expert-parallel degree, input length and hardware, so selection happens at engine launch rather than relying on one fixed strategy. Tests of four 30B-235B models on four platforms report up to 31.7% end-to-end throughput improvement in SGLang and vLLM. This is a useful systems design for distributed sparse recommendation, with transfer gains still unmeasured. — [Paper](https://arxiv.org/abs/2611.11857) (Shanghai Jiao Tong University; Alibaba Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-10219"></a>

- **Multi-GPU MoE Inference with Adaptive Expert Offloading**: AdaOffload combines GPU-CPU parallelism and co-execution for MoE prefill and decoding, adapting online to hardware, batch sizes and workload differences. Unlike offloading policies tied to one device, it targets scaling across multiple GPUs and heterogeneous NUMA configurations. Evaluations on five platforms and three 284B-753B open-weight models report 1.9-15.5x throughput speedups over the compared systems. Its placement and scheduling ideas are transferable to memory-limited sparse ranking models; these are not CTR measurements. — [Paper](https://arxiv.org/abs/2611.10219) (University of California, Berkeley; Microsoft; Shanghai Jiaotong University; University of Texas at Austin; University of California, Davis · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-10649"></a>

- **MACaQ: Fast, Model Agnostic Calibrated Quantization for Low-Precision Weights and Activations**: MACaQ performs MXFP4 weight-activation post-training quantization independently for each linear layer, retaining activation transforms at inference while absorbing inverse transforms into weights. A Hessian-aware coordinate-descent step refines FP4 codes, and the layer-local design enables streaming quantization. It matches the compared methods’ best Llama-3-8B perplexity with 11x less quantization time and reports 2.3% transform overhead on Qwen3-32B in vLLM. This offers a practical low-memory conversion path for large ranking models, pending task-specific quality validation. — [Paper](https://arxiv.org/abs/2611.10649) (Computing Systems Lab, Huawei Technologies, Switzerland · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-12832"></a>

- **What the Loss Curve Misses: FP4 Pretraining Slows the Acquisition of Rare Facts**: This study asks whether similar validation loss guarantees similar rare-fact acquisition under low-precision pretraining. Transformers trained with emulated FP4 matrix operations on controlled synthetic biographies require more exposures to match BF16 recall, including when mixed with web text. Gradient-noise controls link much of the cost to reduced update signal-to-noise rather than merely smaller average steps. The findings motivate evaluating long-tail learning separately from aggregate loss when scaling low-precision recommendation training; the evidence is synthetic language-model learning, not recommendation. — [Paper](https://arxiv.org/abs/2611.12832) (Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04216"></a>

- **LiSA: Linear Stochastic Attention for Long-Range Visual Modeling**: LiSA extends linear attention beyond first-order token aggregation through stochastic diffusion based on truncated random walks, while favoring semantically similar neighbors to retain local detail. Experiments cover image classification, semantic segmentation and object detection and report improvements over the compared methods. Its higher-order token mixing is a candidate design for efficient long-sequence ranking, but recommendation performance has not been tested. — [Paper](https://arxiv.org/abs/2611.04216) (LIVIA, ÉTS Montreal; Mila – Quebec AI Institute; Polytechnique Montreal · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09008"></a>

- **ISER-MoE: Dynamic In-Switch Replication of Hot Experts for Load Balancing in Expert-Parallel**: ISER-MoE replicates hot experts through NVLink-switch multicast to balance expert-parallel inference without repeatedly sending each expert's weights from its owner. A GPU scheduler assigns hot experts to fixed groups, while multi-port broadcasts overlap with shared-expert computation. Trace replay removes 98–99% of excess load; DeepSeek-V4-Pro prefill throughput improves by 17.4% on a math benchmark and 7.2% on agentic prompts. Dynamic replication and communication overlap could inform large MoE recommendation serving, but the results concern language-model inference. — [Paper](https://arxiv.org/abs/2611.09008) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04794"></a>

- **Accelerating Offloading-Based MoE Inference by Interleaving Concurrent Requests**: Bevy replaces speculative expert prefetching with runahead scheduling across concurrent offloaded-MoE requests. Ready requests advance to reveal their actual next experts while other requests wait for transfers; a self-balancing scheduler batches ready requests and prioritizes lagging ones to limit repeated weight reads. On two local platforms, decode throughput reaches up to 3.46x llama.cpp and 1.55x the fastest prefetching baseline. The transferable idea is to hide expert-transfer latency through request scheduling; these are language-model results rather than recommendation measurements. — [Paper](https://arxiv.org/abs/2611.04794) (Seoul National University; Yale University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-04055"></a>

- **HybridSpec: Throughput-Aware Speculative Decoding for Hybrid GDN-MoE Models**: HybridSpec adapts speculative-decoding verification length to hybrid Gated DeltaNet–MoE targets, using draft acceptance estimates and measured target latency. A correction at the first MoE router accounts for actual expert assignments, and block-parallel GDN kernels reconstruct accepted-prefix states without retaining every intermediate state. Across three hybrid targets in single-request greedy decoding, it reports 1.75–1.88x autoregressive speed and 1.30–1.33x DFlash. Its cost-aware scheduling and state-reconstruction ideas may inform hybrid sequence-model serving; the gains do not establish batched or recommendation throughput. — [Paper](https://arxiv.org/abs/2611.04055) (Meta AI; New York University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09252"></a>

- **Rethinking MoE Load Balancing as Feedback Control**: PID-Balancer treats MoE load imbalance as a feedback-control error and expert routing biases as control inputs. Its analysis favors a pure-integral controller that removes persistent imbalance while averaging noisy load measurements, rather than proportional or derivative terms that pass or amplify fluctuations. In OLMoE training with a mid-run data-mixture switch and continual pretraining on a new corpus, this controller restores tighter balance than auxiliary-loss or loss-free balancing at comparable perplexity. It offers a mechanism to examine under shifting recommendation traffic, without demonstrating recommendation gains. — [Paper](https://arxiv.org/abs/2611.09252) (Umeå University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-05927"></a>

- **Modality-Aware Expert Pruning for MoE-Based Multimodal Large Language Models**: MAEP prunes multimodal MoE experts without training by separating their vision and text importance in one forward pass. It combines a redistribution-aware output-change metric with low-attention vision-token signals, preserving text-important experts while ranking pruning candidates globally across layers. Across three multimodal MoE models, it beats modality-agnostic baselines on most multimodal benchmarks while remaining competitive on text tasks, reducing BF16 expert weights by about 27 GB so an approximately 58 GB weight footprint fits on a 40 GB GPU. Modality-aware capacity allocation may inform multimodal recommendation, but no CTR benefit or full runtime-memory guarantee is established. — [Paper](https://arxiv.org/abs/2611.05927) · [Venue](https://neurips.cc/Downloads/2026) (Nota Inc. · NeurIPS 2026). Reading priority: Unrated.

<a id="paper-2611-13378"></a>

- **Looping Deeper Without Growing the KV Cache: Recurrent Depth for Causal Encoder-Decoders**: Looped CED places recurrent computation in the encoder of a causal encoder-decoder, where a few layers create the global key-value cache. Stochastic recurrence training allows rounds to share the final round’s cache, avoiding cache growth with recurrent depth. Language-modeling experiments and a DeepSeek-V4.1-Flash serving analysis examine the quality-memory tradeoff. The design suggests a way to deepen computation over long histories under a fixed cache budget; recommendation quality remains untested. — [Paper](https://arxiv.org/abs/2611.13378) (University of California, San Diego; Tsinghua University; Nanjing University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-13293"></a>

- **Decode Token Parallelism: Memory-Efficient Distributed Attention Parallelism for Scalable LLM Decoding**: Decode Token Parallelism separates model-weight placement from request-specific attention and key-value cache ownership. Layers are balanced across nodes, while each request’s attention and cache stay local; only token activations cross nodes. Experiments on Llama-3.1-405B and Nemotron-4-340B use up to 64 H100 GPUs and compare completion throughput at matched GPU counts. Local cache ownership may inform large generative recommenders, although the reported gains are from language-model serving. — [Paper](https://arxiv.org/abs/2611.13293) (NVIDIA; Texas A&M University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-13188"></a>

- **One-Sided Expert-Parallel All-to-All for Mixture-of-Experts Inference over NVLink**: NVLinkOneSided sends routed tokens directly into buffers organized by source rank and lets grouped matrix multiplication consume them in place. This removes metadata exchange and extra copies before expert computation. Separate synchronization modes target throughput and latency. Blackwell experiments report faster dispatch, combine and MoE-layer execution than evaluated baselines, especially for small batches. The idea is relevant to sparse recommendation serving, but its gains depend on the NVLink hardware and routing workload. — [Paper](https://arxiv.org/abs/2611.13188) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-13975"></a>

- **Understanding Mixture-of-Experts Language Models Beyond Expert Boundaries**: RAMP measures neuron contributions weighted by expert routing to study specialization inside MoE models. Domain-associated neuron sets extend across expert boundaries, and neuron rankings can change even when expert rankings remain stable. RAMPr uses this finer view to prune neurons across experts. Evaluations on six models examine quality, resident memory and prefill throughput at different retention levels. Neuron-level capacity allocation could inform sparse recommenders, but no recommendation result is established. — [Paper](https://arxiv.org/abs/2611.13975) (Nanyang Technological University; Tencent; National University of Singapore · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-14051"></a>

- **Can KV Cache Be Reused Across Model Updates? A DeepSeek-V4-Flash Case Study**: This study tests whether an old model’s key-value cache remains useful after a model update. Across four updates, utility and fidelity behave differently: reused caches can reduce time to first token on some question-answering tasks when caches already exist, yet cause large retrieval losses in other settings. Functional Cache Divergence compares next-token distributions to diagnose incompatibility. The work suggests checking cached-history compatibility during model refreshes rather than assuming reuse is safe; recommendation workloads are not evaluated. — [Paper](https://arxiv.org/abs/2611.14051) (Rank Computing · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-12362"></a>

- **Release Sooner, Expose Less: Offloading MoE Dispatch in NCCL-EP under Dual-Batch Overlap**: The paper offloads MoE dispatch progression so GPU resources can be released earlier and communication can overlap another microbatch’s computation. Three NCCL-EP research configurations move work toward network-interface or host-side progression. GB300 NVL72 experiments examine the computation window needed to hide communication and report lower median time per output token in vLLM. This is a concrete communication-computation overlap technique for sparse-model serving, with results tied to the evaluated hardware and batching conditions. — [Paper](https://arxiv.org/abs/2611.12362) (NVIDIA · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-12956"></a>

- **ADIndex: Layer-Adaptive Sparse Attention Indexing via Group-Level Distillation**: ADIndex reduces sparse-attention indexing cost by calibrating query overlap per layer, distilling group-level indexers and sharing candidate token banks with query-specific refinement. Experiments on DeepSeek-V3.2 and GLM-5.1 evaluate long-context quality and serving speed. Kernel acceleration is larger than the reported end-to-end improvement, so the two should be distinguished. Sharing indexing work may help long-sequence generative recommendation, but its recommendation accuracy and serving benefit have not been tested. — [Paper](https://arxiv.org/abs/2611.12956) (Nanjing University; Alibaba Group · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11533"></a>

- **Ostinato: Fast CPU-GPU MoE Inference for Local Agents via Resident Experts in Every Forward Pass**: Ostinato keeps frequently used experts resident on GPUs while offloading other MoE work to CPUs. It adapts execution to short and long prefills and uses fixed CUDA graphs for decoding. DeepSeek-V4-Flash agent-session experiments on four RTX 4090D GPUs report shorter waits after tool outputs and faster session completion than evaluated CPU-GPU baselines, without changing model outputs. The execution design may inform limited-memory sparse recommendation deployments, although recommendation workloads were not studied. — [Paper](https://arxiv.org/abs/2611.11533) (Beijing Normal-Hong Kong Baptist University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11402"></a>

- **A Per-Step Load-Balancing Engine for Expert-Parallel MoE Serving**: Relief balances token assignments across replicated experts at every decoding step. A pairwise integer-halving relaxation avoids solving an expensive optimization problem online, and the paper evaluates GPU, FPGA and on-die implementations. Its reported utilization improvements concern expert-parallel execution and should not be equated with end-to-end throughput gains. The method offers a hardware-oriented approach to per-step load balancing that could be tested in sparse recommendation serving. — [Paper](https://arxiv.org/abs/2611.11402) (The University of Hong Kong; The Hong Kong University of Science and Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-09225"></a>

- **Fused-Softmax for efficient quantized attention**: Fused-Softmax redesigns approximate softmax for quantized attention so more work runs on matrix cores instead of vector units. AMD CDNA 4 kernels cover MXFP8, MXFP6 and MXFP4, with additional approximation error below the tested operand-quantization error. Wan2.2 video-generation experiments provide an end-to-end evaluation alongside kernel benchmarks. The system illustrates how low-bit attention requires joint arithmetic and kernel design; gains on recommendation models remain unverified. — [Paper](https://arxiv.org/abs/2611.09225) (Advanced Micro Devices · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07542"></a>

- **FlashOffloading: Low-Latency KV Cache Offloading for Long-Context LLM Serving**: FlashOffloading stores the complete key-value cache in host DRAM while using GPU or accelerator memory for a rolling working set. It overlaps bulk transfers during prefill and fetches sparse-index-selected entries during decode, reducing lookup and transfer overhead. GLM-5.2 experiments on Ascend 910C examine both phases under a latency target. The design may support longer recommendation histories under limited device memory, but the reported speedups are specific to the evaluated language-model system. — [Paper](https://arxiv.org/abs/2611.07542) (Huawei Technologies; Huawei Ascend Computing Technology Development; Shanghai Jiao Tong University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-12240"></a>

- **Prune, Don't Merge: Expert Compression of Mixture-of-Experts LLMs on Multilingual Production Tasks**: The study compares expert pruning and merging on five multilingual production tasks using two 30B MoE models, matched calibration data, and 25% or 50% expert removal. Pruning is significantly better in 16 of 20 comparisons, while merging wins in two. Much of the observed generative degradation comes from output-contract failures such as invalid JSON and broken layouts, which academic scores can conceal. The practical lesson for compressing sparse recommenders is to validate the downstream output contract as well as quality; recommendation workloads were not tested. — [Paper](https://arxiv.org/abs/2611.12240) (Hostinger Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-12062"></a>

- **Translating KV Caches Between Hybrid-Attention Language Models: MLA Latents, Linear-Attention States and Sparse-Attention Indexers**: This work translates cached context across hybrid language models, covering compressed attention latents, recurrent states and sparse-attention indexer keys. Linear maps handle some latent caches, while recurrent transfer uses correction or replay of the target recurrence; exact long-range recall also requires token identity. Experiments on 16–48B hybrid pairs examine quality and time to first token, and segment-wise transfer avoids failures of naive repeated translation. The recipes may inform model switching over shared user histories; extension to 300B-plus models is a hypothesis, not a demonstrated result. — [Paper](https://arxiv.org/abs/2611.12062) (Hostinger Research · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11761"></a>

- **BridgeKV: Large-Model Prefill and Small-Model Decoding for LLM Inference via KV Cache Translation**: BridgeKV uses a large model for prompt prefill and a smaller model from the same family for decoding. A learned cache adapter mixes nearby layers and separately maps keys and values while both base models remain frozen; an optional second stage adds low-rank adapters. Across six model pairs and five datasets it beats matched-trainable-budget small-model baselines. A single-A40 experiment reports a threefold request speedup over the large model; larger gains come from simulation. The approach offers a quality-cost tradeoff to investigate for generative recommendation. — [Paper](https://arxiv.org/abs/2611.11761) (Georgia Institute of Technology; Microsoft · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-11696"></a>

- **Direct GPU Energy Measurements of Batch-Level Sharing in Mixture-of-Experts and Recurrent Models**: The paper measures GPU energy directly when batch rows share computation in recurrent policies and MoE language models. Recurrent-policy masking does not produce savings in the evaluated implementation. For Qwen3-30B-A3B, batch-aware routing reads fewer expert weights and lowers energy per token by 12–18% in a fused forward pass, with benchmark changes within noise on 500 items. A persistence-aware rule reduces expert churn but has no energy measurement yet. These single-GPU-type pilot results motivate measuring energy rather than inferring savings from operation counts. — [Paper](https://arxiv.org/abs/2611.11696) (Loughborough University London; Aston University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-10511"></a>

- **CALFA-KV: Joint Calibration and Fisher-Guided Anchors for 1-Bit KV Cache Compression**: CALFA-KV combines offline codebook calibration with selective high-precision cache states. It fits quantization parameters against the frozen model’s attention output, then uses gradient-derived channel sensitivities to rank reconstruction errors and retain important states under a fixed anchor budget. Three-model experiments compare nominal one-bit baselines across seven benchmarks. A higher-rate variant narrows the BF16 quality gap, but additional FP16 anchors mean nominal index bits are not total storage cost. The method is relevant to long-history serving; recommendation quality and throughput remain untested. — [Paper](https://arxiv.org/abs/2611.10511) (Shenzhen Intellifusion Technologies · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-07749"></a>

- **ConvPE: Convolutional Position Embedding Improves Transformers**: ConvPE adds a local, content-dependent bias to attention scores using a lightweight causal convolution over projected hidden states. It remains compatible with rotary position embeddings, attention masks and cache concatenation, and also supports higher-dimensional positional structure. Reported experiments cover language modeling, context extension and vision, with comparisons against one- and two-dimensional baselines. The plug-in offers a concrete way to combine local structure with attention for sequence models; recommendation gains have not been established. — [Paper](https://arxiv.org/abs/2611.07749) (Nanjing University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-08133"></a>

- **Beyond K/V Caches: Cross-Model State Handoff in Hybrid Linear-Attention LLMs**: Hybrid State Transfer handles full-attention caches, recurrent states and convolution histories when switching between hybrid linear-attention models. It uses structured recurrent-state maps, preserves temporal order during convolution alignment and calibrates adapters on the frozen target’s continuation outputs. Qwen3.5 transfer experiments evaluate five benchmarks; separate synthetic-input timings assume source caches already exist. The work identifies state types that a reusable-history interface must preserve, but its handoff speedups are not end-to-end recommendation measurements. — [Paper](https://arxiv.org/abs/2611.08133) (South China University of Technology · arXiv 2026). Reading priority: Unrated.

<a id="paper-2611-13534"></a>

- **Beyond the Log-Linear Frontier: Pre-Asymptotic Analysis of Finite-Budget Neural Scaling Laws**: The paper studies why scaling curves and compute allocations depart from simple power laws at finite budgets. It connects spectral and data-domain heterogeneity to curved learning curves, proposes an initialization method for small pilot grids and derives budget-dependent data mixing and model-data allocation rules. Evaluations use operator spectra and Pythia, Chinchilla and RegMix data. The practical connection to CTR scaling is to check finite-budget curvature before extrapolating from small experiments; the reported fits do not validate these laws for recommendation workloads. — [Paper](https://arxiv.org/abs/2611.13534) (LingQiong AI Lab; Shanghai Smart Logic Technology · arXiv 2026). Reading priority: Unrated.
