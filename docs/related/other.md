<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Other

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=other)

Adjacent research, diagnostics and other relevant recommendation methods.

12 papers · Updated 2026-10-30

<a id="paper-2411-13700"></a>

- **CETNet**: CETNet scales click-through-rate prediction through a collaborating ensemble of distinct models, each with its own embedding table, to capture complementary interaction patterns. Confidence-based fusion gives more weight to reliable predictions while collaborative training refines the members, showing that diversity and coordination can be more effective than simply enlarging a single model. — [Paper](https://arxiv.org/abs/2411.13700) (Meta · 2024). Reading priority: Worth reading.

<a id="paper-2601-02807"></a>

- **COFFEE**: COFFEE studies richer user–ad embeddings along three axes: event-source diversity, history length and event attributes or multimodal content. It evaluates which information sources give better returns and reports strong gains from enriched ad-impression histories, improving representation quality without increasing the online model’s inference or serving complexity. — [Paper](https://arxiv.org/abs/2601.02807) (Meta · 2026). Reading priority: Worth reading.

<a id="paper-2604-26489"></a>

- **Understanding DNNs in Feature Interaction Models**: This paper offers a different explanation for the usefulness of dense neural networks inside feature-interaction recommenders: they can preserve the dimensional richness of embeddings. Experiments with parallel and stacked networks, component ablations and gradient analysis show how these networks mitigate dimensional collapse, complementing the usual debate about whether they learn explicit high-order interactions. — [Paper](https://arxiv.org/abs/2604.26489) (SIGIR (Short) 2026). Reading priority: Worth reading.

<a id="paper-2607-09696"></a>

- **Mitigating Early Training Collapse in CTR Models**: This empirical study investigates why click-through-rate models can lose validation quality immediately after the first training epoch despite falling training loss. On industrial data, reducing feature sparsity by removing very sparse features and grouping rare values stabilizes later training more effectively than learning-rate reduction alone, improving both offline and online outcomes. — [Paper](https://arxiv.org/abs/2607.09696) (Huawei · 2026). Reading priority: Worth reading.

<a id="paper-2607-24804"></a>

- **Bumblebee**: Bumblebee interleaves sequence personalization, attention encoding and feature crossing inside repeatable recommendation blocks. Each block passes a joint representation onward, enabling early and repeated interaction between behavioral sequences and other features; residual pathways and selectively removable components support better predictions and flexible quality–throughput trade-offs in industrial evaluations. — [Paper](https://arxiv.org/abs/2607.24804) (Industry · 2026). Reading priority: Worth reading.

<a id="paper-2607-27577"></a>

- **HA-MoE**: HA-MoE addresses heterogeneous recommendation feeds by exposing content-type context to both expert gates and expert representations. The case study pairs this specialization mechanism with LENS diagnostics and an evaluation metric covering global and cross-segment ranking, helping monitor negative transfer and majority bias as the production model is continuously retrained. — [Paper](https://arxiv.org/abs/2607.27577) (Google · RecSys (Industry) 2026). Reading priority: Read first.

<a id="paper-2608-07035"></a>

- **MISO**: MISO uses a trained ranker’s parameters, activations, gradients and normalization statistics to decide which components deserve scaling, replacement or removal. It turns those internal signals into a small set of interpretable edits and refreshes them after retraining, reducing expensive trial-and-error while adapting optimization decisions to changing model behavior. — [Paper](https://arxiv.org/abs/2608.07035) (Meta · OARS @ RecSys 2026). Reading priority: Worth reading.

<a id="paper-2609-34083"></a>

- **Beyond One Epoch: Uncertainty-Weighted Sensitivity Regularization for Recommendation Models**: This work explains one-epoch overfitting through self-influence: on later passes, an example can be scored using embedding changes caused by its own earlier label. Uncertainty-weighted sensitivity regularization discourages the shared prediction network from exploiting uncertain embeddings, preserving learned representations while making multi-epoch recommendation training generalize better in the reported benchmarks. — [Paper](https://arxiv.org/abs/2609.34083) (Meta · arXiv 2026). Reading priority: Read first.

<a id="paper-2609-39007"></a>

- **RouteRec: Behavior-Guided Sparse Routing for Sequential Recommendation**: RouteRec uses interaction tempo, item-group focus, repetition/carryover and popularity cues to guide sparse expert allocation at three history scopes. Cue scores select groups and backbone states refine experts within them. Six public datasets and routing ablations support behavior-aware allocation beyond extra capacity. It offers a routing design for sequential recommenders, but does not establish industrial scaling laws or online throughput gains. — [Paper](https://arxiv.org/abs/2609.39007) · [DOI](https://doi.org/10.1145/3799682.3841104) · [Official venue](https://cikm2026.diag.uniroma1.it/program/) (Korea Advanced Institute of Science and Technology; Seoul National University · CIKM 2026). Reading priority: Worth reading.

<a id="paper-2609-01431"></a>

- **Efficiently Estimating Optimal Hyperparameter Scaling Laws through Power-Law Entropy Search**: Power-Law Entropy Search chooses training configurations to maximize cost-adjusted uncertainty reduction about optimal-hyperparameter scaling laws. Its cost-aware, multi-fidelity Bayesian optimization targets the law itself rather than the best score at one fixed scale, allowing informative small runs to guide larger configurations. The authors evaluate synthetic tasks, fitted training-data surrogates and actual LLM pretraining, reporting substantially lower search budgets than the compared grid-search and other baselines. Compute is represented by a parameter-count–token-count proxy. The relevant idea for CTR scaling studies is experimental allocation across scales; the assumed law family and cost model still require validation for recommendation workloads. — [Paper](https://arxiv.org/abs/2609.01431) (Meta; National University of Singapore; Atomic Machines · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14709"></a>

- **Vela: User Behavior as Supervision Sparks LLM Intelligence**: Vela converts anonymized user-behavior records into supervised tasks and training trajectories, combining task templates, difficulty filtering and trajectory acceptance criteria. Fine-tuning a Qwen3.6-35B-A3B model improves the evaluated user-related tasks and general benchmarks, and the authors report further gains when increasing behavior-training data and adding reinforcement learning. For recommendation research, the relevant contribution is a reusable way to turn long-term behavior into user-modeling supervision. Its evidence concerns language-model task evaluations, not industrial CTR lift or a fitted recommendation scaling law, so broader transfer remains to be tested. — [Paper](https://arxiv.org/abs/2610.14709) (AllSpark Team · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-16297"></a>

- **SLDBench v2: Active Scaling Law Discovery**: SLDBench v2 tests experimental planning for scaling-law discovery through historical replay: agents buy recorded experiments, revise fitted laws, and predict hidden larger-scale outcomes. Across eight agent systems on 30 screened scenarios, active acquisition produces worse extrapolation than receiving all observations upfront; favoring cheap experiments can miss informative scale variation. Costs and prediction quality are reported separately, and prices include estimates/proxies rather than uniformly measured compute. CTR engineering inference: replay existing training sweeps to evaluate acquisition policies before funding new runs, preserving held-out scales and within-domain coverage. This is an empirical methodology benchmark, not a new architecture or CTR result. — [Paper](https://arxiv.org/abs/2610.16297) (The Chinese University of Hong Kong, Shenzhen; The University of Hong Kong; University of Electronic Science and Technology of China; Tsinghua University; Peking University · arXiv 2026). Reading priority: Unrated.
