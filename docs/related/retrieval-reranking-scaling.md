<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Retrieval & Reranking Scaling

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=retrieval-reranking-scaling)

Scaling retrieval and reranking stages of recommendation pipelines.

37 papers · Updated 2026-10-29

<a id="paper-2603-04816"></a>

- **Scaling Laws for Cross-Encoder Reranking**: This study finds predictable scaling relationships for cross-encoder reranking across model size, training exposure and pointwise, pairwise or listwise objectives. Fits from smaller runs forecast larger rerankers and guide compute allocation, with results often favoring more training data but also showing that the preferred allocation depends on the chosen ranking objective. — [Paper](https://arxiv.org/abs/2603.04816) (Academic · 2026). Reading priority: Worth reading.

<a id="paper-2605-27810"></a>

- **LRanker**: LRanker combines K-means aggregation of offline candidate embeddings with graph-based test-time ensembling of partition-conditioned query embeddings. Cached inner-product scoring handles millions of candidates, while extra inference computation improves quality. Across seven RBench tasks, the revised abstract reports task-specific results, including a 27.0% improvement over Tiger on a recommendation task with over 6.8 million candidates; ablations support both aggregation and ensembling. — [Paper](https://arxiv.org/abs/2605.27810) (UIUC · 2026). Reading priority: Worth reading.

<a id="paper-2604-12965"></a>

- **Efficient Retrieval Scaling with Hierarchical Indexing**: The paper jointly learns a hierarchical retrieval index with cross-attention and residual quantization so larger recommendation models can search efficiently. Instead of treating indexing as a detached serving step, the learned hierarchy organizes model memory; the authors also find that its intermediate nodes identify useful data for further fine-tuning, improving deployed retrieval performance. — [Paper](https://arxiv.org/abs/2604.12965) · [DOI](https://doi.org/10.48786/EDBT.2026.57) · [Official venue](https://openproceedings.org/html/pages/2026_edbt.html) (Meta · EDBT (Industrial & Applications) 2026). Reading priority: Worth reading.

<a id="paper-2606-13533"></a>

- **OneRetrieval**: OneRetrieval aims to replace fragmented e-commerce retrieval branches while preserving operators’ ability to add new search terms quickly. Its keyword-aligned item codes reserve positions that can be bound to new words after deployment, combining generative retrieval quality with index-like editability and reducing reliance on hand-tuned merging across separate retrieval systems. — [Paper](https://arxiv.org/abs/2606.13533) (Kuaishou · 2026). Reading priority: Worth reading.

<a id="paper-2606-18379"></a>

- **RankGraph-2**: RankGraph-2 co-designs graph construction, representation learning and serving for billion-node recommendation retrieval. Bias-corrected edge sampling and precomputed neighborhoods create self-contained training data, while a jointly learned residual-quantization cluster index avoids expensive online nearest-neighbor computation, showing how lifecycle-wide decisions can simplify infrastructure and improve retrieval quality together. — [Paper](https://arxiv.org/abs/2606.18379) (Meta · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2607-12392"></a>

- **MESH**: MESH addresses a scaling imbalance in retrieval: more model capacity often benefits popular content more than fresh or sparse items. It separates feature domains and uses gated bias correction to protect weak signals from dominant engagement features, combining a unified model with asynchronous serving to improve sparse-content retrieval without maintaining many specialized retrievers. — [Paper](https://arxiv.org/abs/2607.12392) (Pinterest · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2607-10096"></a>

- **Scaling and Stabilizing Large-Scale EBR**: This production retrieval pipeline improves both training signals and the transition to a stronger encoder. It combines diverse online cross-batch negatives with offline hard negatives selected using cross-encoder scores and metadata, then warm-starts the larger backbone through legacy-model distillation, preserving established domain knowledge while improving large-catalog discrimination. — [Paper](https://arxiv.org/abs/2607.10096) (Walmart · SIGIR (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2607-27475"></a>

- **OneShot**: OneShot aligns retrieval indexing directly with the ranking objective rather than learning an index from embedding proximity alone. Its end-to-end, in-model index supports richer neural user–item scoring beyond dot products, reducing the mismatch between fast candidate search and accurate relevance estimation and improving the recall–efficiency trade-off in production recommendation. — [Paper](https://arxiv.org/abs/2607.27475) (2026). Reading priority: Read first.

<a id="paper-2608-25528"></a>

- **TransRetrieval**: TransRetrieval diagnoses heterogeneous feature-token norms as a reason that deeper Transformers can scale poorly in recommendation retrieval. Weighted aggregation stabilizes the token representation, target-token compression reduces candidate-side computation, and lightweight domain embeddings incorporate cross-domain data, enabling more effective scaling of retrieval quality under practical latency constraints. — [Paper](https://arxiv.org/abs/2608.25528) (Alibaba · CIKM (Applied) 2026). Reading priority: Read first.

<a id="paper-2609-39327"></a>

- **Generative End-to-end Ad Retrieval at Douyin**: GEAR jointly trains the tokenizer, generator and reranker for advertising retrieval, addressing the linked problems of collapsed codebooks and items sharing the same code. Orthogonal-basis parameterization stabilizes codebook learning, a prefix-aware extension increases expressiveness, and context-conditioned reranking disambiguates collisions, making end-to-end generative retrieval more robust at large catalog scale. — [Paper](https://arxiv.org/abs/2609.39327) (ByteDance · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-29180"></a>

- **X-Rec Technical Report**: X-Rec learns a recommendation distribution directly in continuous item-embedding space and generates vectors for approximate nearest-neighbor retrieval. Anchor conditioning separates coarse interest selection from refinement, geometry-aware flow matching respects the embedding sphere, and late interaction reduces repeated computation, offering diverse retrieval without discrete-code quantization and sequential token-generation overhead. — [Paper](https://arxiv.org/abs/2609.29180) (ByteDance (TikTok) · arXiv 2026). Reading priority: Read first.

<a id="paper-2609-30601"></a>

- **Embedding Subspace Partitioning for Dynamic Multi-Objective Retrieval**: Embedding Subspace Partitioning separates retrieval objectives into isolated portions of an embedding and scores candidates through a weighted sum of their similarities. Serving-time weights can change the objective balance without retraining, while segment-aware attention produces the subspaces in one pass and a shared GPU search index avoids maintaining separate retrieval infrastructure for each objective. — [Paper](https://arxiv.org/abs/2609.30601) (LinkedIn · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2609-23718"></a>

- **UNIQUE: A Unified Retrieval and Ranking System for Large-Scale Feed Recommendation**: UNIQUE unifies generative code-based retrieval and target-aware ranking in an early-fusion architecture, using balanced single-layer flat quantization to address unstable code allocation and cross-stage information loss. Offline evaluation examines retrieval, ranking and codebook balance, while Mobile Baidu A/B tests report gains of 0.96% in total watch duration and 1.08% in total distribution volume. The reported production serving configuration achieves 89 ms P99 latency and 44.23% inference MFU. — [Paper](https://arxiv.org/abs/2609.23718) · [Venue](https://recsys.acm.org/recsys26/posters-2/) (Baidu; Beihang University; Hong Kong Institute of AI for Science, City University of Hong Kong · RecSys (Industry) 2026). Reading priority: Worth reading.

<a id="paper-2609-12270"></a>

- **Recommendation Retrievers Need Verifiers: Universal Generative Reranking for Sequential Recommendations**: This work improves coverage within the short prefix passed from a retriever to expensive downstream rankers by adding a post-hoc generative verifier without retraining or replacing the retriever. The verifier scores candidate identifier-token likelihoods, trains with next-token cross entropy without sampled negatives or a training candidate pool, and reranks only the retriever’s top-K candidates at inference. The same training recipe improves Recall@10 for SASRec, GRU4Rec, NextItNet and MiniOneRec across the reported Amazon and YaMBDa recommendation evaluations, with ablations supporting an effect beyond content-feature injection alone. — [Paper](https://arxiv.org/abs/2609.12270) (Meta MRS · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2609-23677"></a>

- **MuSeR: Scalable Long-sequence Recommendation with Multi-interest Modeling**: MuSeR integrates hierarchical temporal compression, disentangled multi-interest queries and LLM-derived semantic features in a long-history retrieval system. Asynchronous user-state refresh, adaptive caching and hierarchical beam search address serving cost. Public and industrial evaluations and Baidu online tests support the integrated system. Its contribution is deployment-oriented integration rather than a new primitive, so gains should not be attributed to compression alone. — [Paper](https://arxiv.org/abs/2609.23677) (Baidu; City University of Hong Kong; Chinese University of Hong Kong · arXiv 2026). Reading priority: Worth reading.

<a id="paper-2610-10483"></a>

- **Two-Level Softmax Sampling Done Right: Correcting Bias from Size Imbalance and Dispersion**: Two-level softmax sampling is biased when cluster sizes and within-cluster similarity dispersion are ignored. Size-only and size-plus-dispersion corrections improve fidelity to exact softmax with little additional computation; experiments cover five large embedding datasets. — [Paper](https://arxiv.org/abs/2610.10483) (Spotify; SJTU Paris Elite Institute of Technology · NeurIPS 2026). Reading priority: Read first.

<a id="paper-2610-12300"></a>

- **Compact and Efficient Indexes for Learned Sparse Retrieval**: This work compresses learned sparse-retrieval indexes at both candidate-selection and scoring stages. It replaces block summaries with document medoids and combines vocabulary reordering, fused decompression/dot products, and per-component 4-bit value codebooks. On MS MARCO with three sparse encoders, experiments compare speed and memory at matched retrieval accuracy. The techniques offer a systems-level reference for scaling sparse candidate retrieval; they do not establish gains in downstream CTR ranking. — [Paper](https://arxiv.org/abs/2610.12300) (ISTI–CNR; University of Pisa; Linkup · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-08716"></a>

- **Disentangling Paradigm, Identifier, and Decoding in Generative Retrieval**: This study varies document identifiers and decoding across autoregressive, masked-diffusion, and block-diffusion retrieval on NQ320K and MS300K. Changing decoding alone moves diffusion Hit@1 by 6.6–13.7 points; one fully masked forward pass followed by corpus-code probability scoring matches or beats generate-and-match in 11 of 12 settings. Backbone sizes, pretraining data, and training recipes remain different, so cross-paradigm gaps do not isolate architecture alone. It informs controlled evaluation of generative retrieval rather than establishing CTR or serving gains. — [Paper](https://arxiv.org/abs/2610.08716) (Artefact Research Center · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-08732"></a>

- **A Systematic Study of Semantic ID Spaces for Generative Information Retrieval**: The study puts product quantization, residual quantization, and hybrid document identifiers in one design space, varying code length and codebook size on MS MARCO 300K and NQ320K. Training-free metrics diagnose collisions and structural properties, but do not reliably rank the downstream quality of otherwise usable identifier spaces. The practical lesson for semantic-ID scaling is to use intrinsic checks for screening, then validate retrieval performance; fixed encoders, model size, and decoding limit generalization, and recommendation transfer is untested. — [Paper](https://arxiv.org/abs/2610.08732) (Artefact Research Center; LERIA, Angers University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2606-01782"></a>

- **More Efficient LLM Reranking with Whole-Pool, Setwise, Long-Context Language Models**: When all retrieved candidates fit the context window, DualEnd Setwise selects the most and least relevant candidates together and fills a complete ranking from both ends. It ranks 100 candidates in 50 comparisons; experiments with nine open-weight LLMs and six BEIR datasets approximately halve tokens and ranking time versus single-end whole-pool ranking. This is an output-depth-specific efficiency tradeoff: top-10 quality can decline and main timings omit retry generations. It offers a test-time-compute design for reranking, not an established online CTR improvement. — [Paper](https://arxiv.org/abs/2606.01782) (The University of Queensland · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-17467"></a>

- **Computed, not Memorized: Bit-Factorized Identifiers for Efficient Generative Retrieval**: This generative-retrieval design factorizes numeric document identifiers into bits whose scores derive from the language model's representations, allowing new documents to remain scorable without retraining identifier embeddings. Across three benchmarks it improves unseen-document retrieval while maintaining comparable seen-document results; reported latency comparisons concern numeric-ID baselines. The approach is relevant to reducing index-refresh training costs in dynamic retrieval systems, with transfer to recommendation still untested. — [Paper](https://arxiv.org/abs/2610.17467) (Leiden University; Shandong University; Radboud University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-16979"></a>

- **WeGR: Towards Unified Generative Retrieval via Behavior-aware Tokenization and Preference Alignment**: WeGR addresses weak collaborative signals and sparse exact-ID rewards in generative retrieval. CoCo-VAE injects behavioral information before quantization and combats codebook collapse; DHPO progressively expands reward and optimization horizons. A six-week industrial e-commerce A/B test reports relative gains of 2.539% in orders, 1.508% in CTR and 1.381% in CVR, alongside 25.5% CPU and 26.1% GPU savings. These are system-level deployment results, not isolated generator-kernel speedups. — [Paper](https://arxiv.org/abs/2610.16979) (arXiv 2026). Reading priority: Unrated.

<a id="paper-2604-05379"></a>

- **Retrieve-then-Adapt: Retrieval-Augmented Test-Time Adaptation for Sequential Recommendation**: ReAd retrieves collaboratively similar items from a memory database and integrates them through a lightweight retrieval module to refine a sequential recommender’s predictions. The backbone stays frozen at inference; retrieved signals adapt the prediction without online parameter updates. Five benchmark datasets show improvements over the tested sequential methods. This offers a retrieval-based route to handle shifted or rare preferences, but requires extra retrieval/fusion work and does not establish production CTR or latency gains. — [Paper](https://arxiv.org/abs/2604.05379) · [DOI](https://doi.org/10.1145/3799682.3841085) · [Official venue](https://cikm2026.diag.uniroma1.it/program/) (Shenzhen Technology University; City University of Hong Kong; McGill University; Shenzhen University; Kuaishou Technology · CIKM 2026). Reading priority: Unrated.

<a id="paper-2610-19065"></a>

- **Revisiting Generative vs. Dense Retrieval: A Static Value Prior Reverses the Gap**: This study compares generative and dense retrieval on two Amazon Toys datasets using exact-target recall, best-item value among jointly covered users and value across the full ranked list. Their ordering changes with the metric, and adding the same static item-value prior to dense retrieval reverses the generative method’s measured best-item-value lead. A separate internal e-commerce test uses LLM-judged relevance. For recommendation scaling, it motivates matching evaluation populations, objectives and simple priors before attributing gains to larger generative models; it does not prove universal dense-retrieval superiority. — [Paper](https://arxiv.org/abs/2610.19065) (Shopify; University of Toronto · arXiv 2026). Reading priority: Unrated.

<a id="paper-2607-29606"></a>

- **QASP: Query-Adaptive Robust Vector Search Policy**: QASP predicts each query’s recall-progress curve with one upfront regression, then derives search depth for different recall targets. A lightweight reactive step adjusts depth from observed deviations without invoking the predictor again. The authors report lower per-query recall variance and reduced data access, including transfer across tested datasets and index configurations. This offers a way to allocate retrieval compute by query difficulty instead of a fixed search budget; extrapolation to production recommendation traffic requires calibration and validation. — [Paper](https://arxiv.org/abs/2607.29606) (Amazon; Tel Aviv University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21877"></a>

- **Aligning LLMs with Sparse Retrieval via Adaptive Sparse Supervision**: This framework trains an LLM-based sparse retriever using input-adaptive supervision from SPLADE. A cumulative-activation threshold selects salient lexical supports for each input instead of imposing a fixed support count; contrastive learning, distillation and sparsity regularization then refine retrieval. On MS MARCO and six selected BEIR datasets, the authors report a favorable effectiveness–efficiency trade-off against the evaluated sparse retrievers. The transferable idea for large retrieval stages is to adapt the sparsity budget to the input while measuring index size and end-to-end query cost; the evidence concerns text retrieval, not CTR prediction. — [Paper](https://arxiv.org/abs/2610.21877) (Soochow University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-21030"></a>

- **Learning When to Think: Utility-Guided Adaptive Reasoning for Efficient Text Retrieval**: AURA supervises intermediate query-reasoning states by their ability to separate relevant documents from hard distractors, then uses a lightweight utility estimator to decide when to stop reasoning. On BRIGHT, the reported 4B model obtains 34.7 average nDCG@10 with 2.8 reasoning steps and 96 generated tokens per query. Under matched deployment conditions, adaptive stopping lowers latency from 4.6 to 0.76 seconds relative to full-trajectory reasoning. For retrieval and ranking pipelines, the useful design principle is to allocate test-time computation according to predicted retrieval utility; these results do not establish CTR gains. — [Paper](https://arxiv.org/abs/2610.21030) (Carnegie Mellon University; University of Pittsburgh · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-23510"></a>

- **LSNR: Learned Sparse News Recommendations with Attentive User Modeling**: LSNR separately encodes news articles, then combines attention-weighted sparse article vectors with a dense-projected user expansion. This avoids flattening and truncating concatenated histories. On MIND and EBNeRD it outperforms STAR, remains competitive with dense recommenders in standard settings, and performs better with short histories. Its serving index is an order of magnitude smaller than the evaluated uncompressed dense baseline. — [Paper](https://arxiv.org/abs/2610.23510) (University of Amsterdam; Johns Hopkins University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-14196"></a>

- **Simple Linear Corrections for Compression in Late Interaction**: A lightweight linear correction distills uncompressed late-interaction retrieval scores after document-vector compression, leaving the encoder and compressor frozen. Across ColBERTv2, Jina v4 and ColPali2 experiments, it improves 154 of 160 in-domain BEIR settings; transfer from MS MARCO is more variable. The correction can be applied at query time or to stored vectors offline, recovering some quality without retraining encoders or recompressing documents. — [Paper](https://arxiv.org/abs/2610.14196) (Microsoft Research India · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-25172"></a>

- **RemoteANN: A Native Vector Search Engine for Cloud Object Storage**: RemoteANN co-designs vector indexing and querying for cloud object storage, combining IVF and RaBitQ with locality-aware reordering, cluster pruning, Range-GET merging and NVMe caching. QGKMeans reduces index construction latency. At 97% target recall, evaluations report up to 5.9x throughput and 16.1x fewer object-storage requests than representative baselines. This supports infrastructure choices for large vector retrieval; recommendation-quality gains are not established. — [Paper](https://arxiv.org/abs/2610.25172) (Nanyang Technological University; ByteDance · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-27273"></a>

- **FLINT: Fixed-budget Late Interaction**: FLINT reduces multi-vector retrieval storage and comparison costs by attention-pooling both queries and documents into fixed vector budgets. It retains comparable BEIR effectiveness and improves several long-query benchmarks across BERT and ModernBERT backbones. On long-query corpora, end-to-end retrieval is 1.5–2.8 times faster than ConstBERT; index size is 5.3–9.3 times smaller than token-level late-interaction models such as ColBERTv2. — [Paper](https://arxiv.org/abs/2610.27273) (University of Illinois Urbana-Champaign; University of California, Berkeley · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-27195"></a>

- **UIBK-Embedding: Effective Text Retrieval by Unifying Dense and Late-Interaction Retrieval**: UIBK-Embedding combines dense and token-level retrieval in one 179M-parameter encoder and one unchanged MaxSim index. Three extra vectors encode the dense representation, with a tag preventing cross-type matching; shared layers and fused-score distillation train both heads together. BEIR nDCG@10 reaches 59.79, exceeding LateOn by 2.10 points under matched document lengths. On decontaminated BEIR it leads on average and on eight of twelve datasets. — [Paper](https://arxiv.org/abs/2610.27195) (University of Innsbruck · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-27306"></a>

- **SweepANN: A GPU-Accelerated Large-K Approximate Vector Search for Drug Discovery**: SweepANN targets large-K vector retrieval, where conventional ANN indexes lose much of their advantage at high recall. It scans compressed GPU-resident partitions with batched matrix multiplication and selective top-K merging. Four RTX PRO 6000 GPUs process 26,562 drug-discovery queries in about 61 seconds at 99.6% mean recall, excluding library loading. The application is drug discovery; cross-hardware campaign comparisons do not isolate an algorithmic speedup. — [Paper](https://arxiv.org/abs/2610.27306) (Arizona State University; Independent Researcher · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-28435"></a>

- **Multimodal Reranking Is a System One Decision**: This study casts multimodal reranking as one multiple-choice decision over sixteen candidates, ranking label probabilities from a single VLM forward pass. It outperforms per-candidate yes/no scoring; text-only decision tuning further improves page reranking by 0.6–1.1 points while leaving natural images unchanged. Comparisons with supervised rerankers are confounded by model size and generation, so they do not isolate the proposed formulation’s effect. — [Paper](https://arxiv.org/abs/2610.28435) (Aalto University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-26938"></a>

- **GRaSP: Latency-Aware Optimization for Geo-Distributed Retrieval-Augmented Generation**: GRaSP reranks retrieval candidates using relevance, network latency and optional transfer cost under regional caps, without retraining. Its benefit depends on content placement. On a five-node testbed, a moderate setting reduces P90 fetch latency by 41% while retaining 78% of relevance-only recall. End-to-end QA reduces context-fetch latency by 43% while staying within 0.062 absolute EM of relevance-only retrieval; this is a quality-latency trade-off. — [Paper](https://arxiv.org/abs/2610.26938) (Independent Researcher; The Pennsylvania State University · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-30941"></a>

- **PAIR: Preference-Aligned Intent Retrieval for Premium People Recommendation at LinkedIn**: PAIR models complementary professional intent rather than profile similarity for people retrieval. An exposure-conditioned multi-negative contrastive objective learns preferences, while position-aware click-history aggregation permits constant-cost updates within a fixed history window. A 0.6B-parameter model reaches MAR@100 of 0.45 on LinkedIn Premium retrieval. Lightweight CPU updates avoid repeated language-model inference during personalization; the abstract reports no online business lift. — [Paper](https://arxiv.org/abs/2610.30941) (LinkedIn · arXiv 2026). Reading priority: Unrated.

<a id="paper-2610-35256"></a>

- **Octen-WebGR: Scaling Generative Retrieval to 200 Million Web Pages**: Octen-WebGR retrieves web pages by generating a two-token semantic identifier constrained to real URLs. Its 4B model indexes 201 million pages and reaches 59.6% top-1 accuracy on subsequent navigational traffic, versus 46.5% for a click-enhanced dense retriever. It is strongest on new queries for well-exposed pages; dense retrieval retains an advantage on rarely visited pages. Experiments up to 32 million URLs link capacity requirements to index size and exposure, offering evidence for large-scale generative retrieval rather than CTR ranking. — [Paper](https://arxiv.org/abs/2610.35256) (arXiv 2026). Reading priority: Unrated.
