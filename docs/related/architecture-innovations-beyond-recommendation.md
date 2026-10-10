<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Architecture Innovations Beyond Recommendation

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=architecture-innovations-beyond-recommendation)

Transferable ideas from general-purpose model architecture research.

75 papers · Updated 2026-10-09

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

- **Holistic MoE Scaling**: This framework translates compute budgets into complete MoE architecture configurations instead of fitting isolated expert-count trends. It jointly constrains compute, active parameters and total parameters, then reduces a large design space into two smaller search phases; experiments also show that larger scales permit a wider near-optimal band, leaving room to accommodate infrastructure constraints. — [Paper](https://arxiv.org/abs/2603.21862) (Academic · NeurIPS 2026). Reading priority: Worth reading.

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

- **MS-GLA: Multi-Scale Gated Linear Attention for Addressing Representational Bottlenecks via Multi-Temporal Resolution**: MS-GLA assigns gated linear-attention heads to different temporal resolutions so local syntax and long-range structure do not compete entirely within the same memory scale. Coarse heads pool longer spans, fine heads retain local detail, and input-dependent fusion combines them, improving effective representation without enlarging each head’s recurrent state. — [Paper](https://arxiv.org/abs/2609.35664) (International Institute of Information Technology Hyderabad · COLM 2026). Reading priority: Read as needed.

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
