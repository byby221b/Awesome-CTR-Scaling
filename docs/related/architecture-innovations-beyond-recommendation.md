<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Architecture Innovations Beyond Recommendation

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=architecture-innovations-beyond-recommendation)

Transferable ideas from general-purpose model architecture research.

141 papers · Updated 2026-10-19

<a id="paper-2606-16825"></a>

- **Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models**: Expert Tying reduces the memory cost of mixture-of-experts language models by sharing expert weights across consecutive layers while keeping each layer’s attention and routing independent. Experiments across several MoE families indicate that much of the expert bank is redundant across depth, allowing substantial parameter-memory savings with little change in perplexity or downstream quality. — [Paper](https://arxiv.org/abs/2606.16825) (2026). Reading priority: Read as needed.

<a id="paper-2606-16768"></a>

- **Taming Curvature: Architecture Warm-Up for Stable Transformer Training**: This work connects Transformer training instability to sudden increases in optimizer-preconditioned curvature. A warm-started Hessian estimator makes curvature tracking practical at large scale, and the resulting observations motivate architecture warm-up: progressively adding depth to control curvature, reducing loss spikes and divergence without slowing convergence in the reported experiments. — [Paper](https://arxiv.org/abs/2606.16768) (2026). Reading priority: Read as needed.

<a id="paper-2606-16429"></a>

- **Taylor-Calibrate: Principled Initialization for Hybrid Linear Attention Distillation**: Taylor-Calibrate improves the starting point when converting a pretrained Transformer into a hybrid Gated DeltaNet model. Teacher attention statistics initialize the new recurrent memory timescales and gates, followed by brief layerwise output alignment, so distillation spends fewer tokens repairing mismatched dynamics and more efficiently recovers the teacher’s behavior. — [Paper](https://arxiv.org/abs/2606.16429) (2026). Reading priority: Read as needed.

<a id="paper-2606-16456"></a>

- **SPRI: SVD-Partitioned Residual Initialization for Data-Constrained MoE Upcycling**: SPRI converts a pretrained dense model into a mixture of experts when supervised adaptation data are limited. It partitions residual components of the feed-forward weights through singular-value decomposition to create controlled expert diversity, then uses two-stage training to stabilize adaptation; multilingual speech translation experiments show benefits over dense fine-tuning and prior upcycling approaches. — [Paper](https://arxiv.org/abs/2606.16456) (2026). Reading priority: Read as needed.

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

- **SlimKV: Joint Token-Feature KV Cache Compression with Reconstruction-Free Beacon Attention**: SlimKV jointly compresses context tokens into beacon memories and their KV features into low-rank latent representations, with layer-adaptive rank allocation. Training beacon keys without key-side RoPE enables reconstruction-free latent-space decoding. The authors report stronger high-compression LongBench results and retention of over 96% of the uncompressed score at 4×/8× compression. — [Paper](https://arxiv.org/abs/2610.02953) (University of Science and Technology of China; Nanyang Technological University; Tencent · arXiv 2026). Reading priority: Read as needed.

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

- **ResidualQuant: KV Cache Quantization for Looped Transformers with 2-Bit Residuals**: ResidualQuant stores final-loop KV states as references and encodes other loops with low-precision residuals. Scaling, rotations and loop-wise mixed precision improve the quality–memory trade-off, with measured decoding speedups on looped language models. — [Paper](https://arxiv.org/abs/2610.10381) (KAIST; Yonsei University; Seoul National University · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-10135"></a>

- **Attention via Black-Box Vector Search**: The paper casts sparse attention as priority sampling over black-box vector search, derives retrieval/index trade-offs and proposes an augmented-key estimator. An LLM implementation improves attention approximation against top-k and sampling baselines on long contexts. — [Paper](https://arxiv.org/abs/2610.10135) (Columbia University; University of Pennsylvania · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-09025"></a>

- **SPIN: Shadow Predictive Indexer for Sparse Attention**: SPIN predicts important KV-cache blocks from recent indexing history, avoiding full-cache scoring at every decoding step. Its block-based indexer accounts for speculative decoding and reduces indexing work while preserving evaluated task quality. vLLM experiments report serving improvements; the transferable lesson is to optimize selection overhead as well as sparse attention itself. — [Paper](https://arxiv.org/abs/2610.09025) (arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-07207"></a>

- **Distributionally Robust Mixture-of-Experts Training**: DRMoET trains sparse experts for robustness to imperfect routing by emphasizing high-loss expert outcomes with an entropy-regularized, moving-average objective. Two MoE scales show stronger downstream performance and lower expert-loss variance without changing standard sparse computation. — [Paper](https://arxiv.org/abs/2610.07207) (New York University; Center for Data Science, NYU Shanghai · NeurIPS 2026). Reading priority: Worth reading.

<a id="paper-2610-07348"></a>

- **Stepped MoE: Segment-Level Routing with Configurable Inference Complexity**: Stepped MoE combines nested elastic subnetworks with segment-level expert routing so one checkpoint supports several active-parameter budgets. It reports stronger language-model accuracy than matched dense models while targeting flexible memory and compute constraints. — [Paper](https://arxiv.org/abs/2610.07348) (Apple · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-10114"></a>

- **Mechanics of Long-Context Hybrid Models Part 1.1: From Hybrid Attention to Hybrid Position**: The paper compares full-attention hybrids using sliding windows or gated linear attention and links their different context-extension behavior to positional biases. It proposes sliding-window linear attention and reports stronger training-free length extrapolation in the tested models. — [Paper](https://arxiv.org/abs/2610.10114) (Fudan University; Shanghai Innovation Institute; OpenMOSS Team · arXiv 2026). Reading priority: Read as needed.

<a id="paper-2610-09342"></a>

- **Shared Low-rank Basis Factorization for Data-free Mixture-of-Experts Compression**: Shared Low-rank Basis Factorization (SLBF) compresses MoE expert weights without calibration data, preserving expert identities and router parameters; compressed hidden states can still change later-layer routing. Shared rank-k bases enable richer cross-expert reconstruction under a fixed parameter budget, and gauge fixing removes redundant factor parameters. Experiments cover five MoE LLM architectures from 16B to 122B parameters and compare pruning, merging, and weight-reconstruction methods. — [Paper](https://arxiv.org/abs/2610.09342) (Kyoto University; The University of Tokyo; RIKEN AIP · arXiv 2026). Reading priority: Read as needed.

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

- **ORCA: The Annealed Spectral Conditioning Optimizer for Faster, Better LLM Training**: ORCA adds temporary soft orthogonality regularization to Muon early in training and removes it later, aiming to broaden useful weight directions without constraining the final solution. The authors report lower validation loss across LLaMA, Qwen3 and fine-grained MoE models from 130M to 8B parameters. This suggests an optimizer intervention for dense ranking projections, not verified CTR gains; embeddings and one-dimensional parameters retain their original AdamW updates. — [Paper](https://arxiv.org/abs/2610.06116) (Peking University; Kling Team · arXiv 2026). Reading priority: Unrated.

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

- **When Dynamic Scaling Fails: A Scale-State Feedback Governs Recurrent-State Quantization in Linear-Attention and SSM LLMs**: This study separates numerical instability from information loss in quantized recurrent states. Scale–state feedback can cause norm growth, but controlling that scale alone recovers only part of lost performance; finer resolution and long decoding horizons still matter. In the tested settings, group-wise INT4 at 32K decode performs no better than discarding the state, and learned layer precision allocation reduces to protecting early layers under article-disjoint evaluation. The useful warning for compressed recommendation histories is to validate error accumulation over the intended horizon, rather than certify a bit width from short recall tests. — [Paper](https://arxiv.org/abs/2610.15139) (Independent Researcher · arXiv 2026). Reading priority: Unrated.

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
