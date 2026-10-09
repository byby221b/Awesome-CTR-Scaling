<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Generative Recommendation

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=generative-recommendation)

Generative retrieval, recommendation and ranking beyond discriminative CTR.

82 papers · Updated 2026-10-09

<a id="paper-2605-12617"></a>

- **SID-MLP**: SID-MLP observes that predicting later tokens of a hierarchical semantic identifier often needs less computation than predicting its first token. It encodes global user context once and distills an autoregressive teacher into position-specific MLP heads, preserving prefix dependencies while removing repeated decoder attention; an encoder-replacement variant explores a further speed-accuracy trade-off. — [Paper](https://arxiv.org/abs/2605.12617) (UCSD / Snap · 2026)

<a id="paper-2605-23312"></a>

- **Towards Generalizable and Efficient Large-Scale Generative Recommenders**: This study shows that scaling a generative recommender produces task-dependent gains and must be coordinated with production constraints. It uses scaling-law fits to diagnose headroom, multi-token prediction to address cached-serving delays, efficient decoding heads for repeated training, and semantic item towers for new titles whose collaborative embeddings are still unreliable. — [Paper](https://arxiv.org/abs/2605.23312) (Netflix · RecSys (Industry) 2026)

<a id="paper-2605-23702"></a>

- **TubiFM**: TubiFM serializes cross-surface watches, searches, sessions, and context into a shared 'user story' that mixes language and event tokens. A single prompted model then ranks items, carousels, or search results, using complementary discovery signals across tasks; online tests improved search and carousel viewing while simplifying the ranking stack. — [Paper](https://arxiv.org/abs/2605.23702) (Tubi · RecSys (Industry) 2026)

<a id="paper-2605-25749"></a>

- **DeGRe**: DeGRe addresses biased reranking targets and sparse list-level rewards with offline lookahead supervision. An evaluator explores promising sequences through beam search and supplies step-wise value estimates to a lightweight generator, transferring planning into training so that online reranking can use a single efficient greedy-decoding pass. — [Paper](https://arxiv.org/abs/2605.25749) (Alibaba · KDD (ADS) 2026)

<a id="paper-2605-17779"></a>

- **VarLenRec**: VarLenRec finds that popular items can benefit from short identifiers, while tail items need longer codes to express discriminative content. It combines popularity-aware information allocation, hyperbolic residual quantization, and a differentiable length controller, assigning encoding capacity where it is most useful instead of imposing one fixed identifier length on every item. — [Paper](https://arxiv.org/abs/2605.17779) (2026)

<a id="paper-2602-13581"></a>

- **Climber-Pilot**: Climber-Pilot addresses both short-sighted retrieval and the need to obey explicit business instructions. Time-aware multi-item prediction teaches longer-horizon consumption patterns without adding inference steps, while condition-guided sparse attention incorporates constraints into generation, allowing efficient single-step retrieval to consider broader user intent and controllable recommendation requirements. — [Paper](https://arxiv.org/abs/2602.13581) (NetEase · KDD (ADS) 2026)

<a id="paper-2603-02730"></a>

- **APAO**: APAO targets the mismatch between teacher-forced token training and beam-search inference, where a useful item can disappear because an early prefix scores poorly. Prefix-level losses and adaptive emphasis on the weakest prefix train the model to preserve promising branches, aligning learning more closely with the pruning decisions made during retrieval. — [Paper](https://arxiv.org/abs/2603.02730) (Tsinghua · KDD 2026)

<a id="paper-2604-05314"></a>

- **Next-Scale Generative Reranking**: Next-Scale Generative Reranking builds a recommendation list progressively from coarse interests to finer choices using a tree-based generator. A matching multi-scale evaluator and neighbor loss provide guidance at each scale, addressing both local-versus-global planning and inconsistent training signals between generator and evaluator; the framework is deployed in Meituan food delivery. — [Paper](https://arxiv.org/abs/2604.05314) (Meituan · 2026)

<a id="paper-2604-05329"></a>

- **STAMP**: STAMP attributes costly and unstable semantic-ID learning to redundant input tokens and sparse output supervision. It prunes low-information tokens during the forward pass and adds auxiliary multi-step prediction, pairing compact inputs with denser learning signals; experiments report lower memory use and faster training while maintaining or improving recommendation performance. — [Paper](https://arxiv.org/abs/2604.05329) (Zhejiang / Alibaba · 2026)

<a id="paper-2604-14878"></a>

- **GenRec**: GenRec addresses pagination ambiguity, long semantic-ID inputs, and preference alignment within one decoder-only recommender. Page-wise next-token prediction supplies page-level supervision, a token merger compresses the input, and relevance-gated reinforcement learning aligns generation with user satisfaction, connecting training consistency, serving efficiency, and preference optimization in a deployed JD system. — [Paper](https://arxiv.org/abs/2604.14878) (JD · SIGIR 2026)

<a id="paper-2604-11440"></a>

- **R3-VAE**: R3-VAE improves semantic-ID learning by stabilizing quantization and making identifier quality easier to assess. A reference vector anchors item semantics, a dot-product rating mechanism reduces codebook collapse, and semantic-cohesion plus preference-discrimination metrics serve as regularizers, connecting representation quality to recommendation usefulness before expensive downstream evaluation. — [Paper](https://arxiv.org/abs/2604.11440) (2026)

<a id="paper-2606-06260"></a>

- **OneReason**: OneReason argues that useful recommendation reasoning requires both understanding item tokens and reorganizing behavior into coherent interests. It grounds item tokens in language semantics during pretraining, introduces a three-level cognition-enhanced chain-of-thought format, and applies specialize-then-unify reinforcement learning, addressing why merely adding a thinking mode may not improve recommendation. — [Paper](https://arxiv.org/abs/2606.06260) (Kuaishou · 2026)

<a id="paper-2606-08604"></a>

- **Gryphon**: Gryphon supplements semantic-ID generation with joint item-level scoring that reuses the encoder's user representation. Resolving generated identifiers to actual items and scoring them directly separates identifier collisions and avoids relying on poorly calibrated beam likelihoods; a production test simplified candidate generation without a statistically significant change in total listening time. — [Paper](https://arxiv.org/abs/2606.08604) (Yandex · 2026)

<a id="paper-2606-08480"></a>

- **AdaGRPO**: AdaGRPO treats reward-guided learning as selective rather than universally useful because production rankers can give unreliable rewards. Supervised negative log-likelihood remains the anchor, while a per-sample gate admits GRPO updates only when policy difficulty and reward discriminability support them, reducing harmful reinforcement-learning gradients from noisy feedback. — [Paper](https://arxiv.org/abs/2606.08480) (JD · 2026)

<a id="paper-2606-07317"></a>

- **GBLA**: GBLA introduces bidirectional linear attention for the history encoder in generative retrieval, where long sequences make softmax attention expensive. Local convolution, key gating, and gated normalization augment kernelized attention; interleaving GBLA with ordinary self-attention preserves retrieval quality in the reported experiments while substantially reducing long-history attention cost. — [Paper](https://arxiv.org/abs/2606.07317) (Yandex · SIGIR 2026)

<a id="paper-2606-06970"></a>

- **SSRLive**: SSRLive adapts recommendation to changing live-room content by generating both static and dynamic semantic identifiers. A discriminative module combines these identifiers with user features and user-streamer interactions for multi-task prediction, linking fresh content representations with explicit behavioral signals; production tests improved viewing, transactions, and engagement measures. — [Paper](https://arxiv.org/abs/2606.06970) (Alibaba · 2026)

<a id="paper-2512-24787"></a>

- **HiGR**: HiGR makes whole-slate planning easier by learning semantic IDs whose prefixes encode shared meaning. A hierarchical decoder plans coarse preference representations before finer generation, and listwise alignment considers ranking fidelity, user interest, and diversity, jointly addressing semantic organization, inference cost, and the gap between token prediction and overall slate quality. — [Paper](https://arxiv.org/abs/2512.24787) (Tencent · CIKM 2026)

<a id="paper-2606-14260"></a>

- **ChronoID**: ChronoID investigates where and how explicit time information should enter semantic-ID learning. It organizes the design space along three independent dimensions and introduces a time-explicit recommendation benchmark, challenging the assumption that the same item representation should remain appropriate across changing temporal contexts and making alternatives systematically comparable. — [Paper](https://arxiv.org/abs/2606.14260) (Meta MRS / U. Rochester / MBZUAI · 2026)

<a id="paper-2606-14142"></a>

- **PauseRec**: PauseRec examines why explicit reasoning can fail when unfamiliar semantic-ID tokens disrupt an LLM's language-based reasoning interface. Its lightweight implicit-reasoning approach avoids collecting reasoning traces and performing reasoning-alignment training, reducing sensitivity to rationale quality while improving recommendation effectiveness and efficiency over the explicit-chain-of-thought approaches tested. — [Paper](https://arxiv.org/abs/2606.14142) (2026)

<a id="paper-2606-17276"></a>

- **On the Memorization Behavior of LLMs in Generative Recommendation**: This study finds that much of the apparent advantage of LLM-based generative recommendation comes from memorizing one-step item transitions. Its IIRG training strategy adds multi-hop co-occurrence and semantic item relations, improving recommendations especially when the desired item cannot be recovered from a transition already seen during training. — [Paper](https://arxiv.org/abs/2606.17276) (KAIST / Snap · 2026)

<a id="paper-2606-20554"></a>

- **G2Rec**: G2Rec combines holistic graph-based co-engagement modeling with semantic tokenization to organize distributed user interests. It addresses graph methods that scale poorly or see only local structure, alongside tokenizers lacking explicit guidance, giving the recommendation model semantically grounded interest prototypes without requiring labeled ground-truth user interests. — [Paper](https://arxiv.org/abs/2606.20554) (Meta / UIUC · RecSys (Industry) 2026)

<a id="paper-2606-25147"></a>

- **TokenMinds**: TokenMinds produces both discrete semantic-ID user tokens and dense embeddings from a pretrained encoder-decoder model. The shared item-and-user vocabulary supports semantically grounded behavior modeling, while the dense output remains compatible with existing rankers; asynchronous representation generation lets multiple YouTube surfaces reuse these complementary outputs at large scale. — [Paper](https://arxiv.org/abs/2606.25147) (Google / YouTube · 2026)

<a id="paper-2606-25496"></a>

- **RaG (Recommendation as Generation)**: Recommendation as Generation moves beyond selecting from an existing video catalog to creating personalized videos on demand. Shared semantic IDs separately represent content and creative style, guide video-generation agents, and connect recommendation with creation; cross-domain rewards combine user-interest alignment, feedback, and video quality within an industrial advertising deployment. — [Paper](https://arxiv.org/abs/2606.25496) (Kuaishou · 2026)

<a id="paper-2606-31984"></a>

- **GR2 Technical Report**: GR2 turns final-stage reranking into a reasoning-enabled generation task using semantic-ID mid-training, teacher reasoning traces, and reinforcement learning with verifiable rewards. Context compression and distillation address deployment cost, while conditional reward design counters shortcuts such as copying the incoming order, highlighting that reliable objectives are as important as a stronger model. — [Paper](https://arxiv.org/abs/2606.31984) (Meta · 2026)

<a id="paper-2606-31031"></a>

- **GenPage**: GenPage generates an entire structured, multi-row homepage from user and request context using a single Transformer. Pretraining on production pages and subsequent preference-oriented training replace separate construction stages, while deployment mechanisms handle freshness, cold start, and business rules; Netflix A/B tests improved engagement and reduced end-to-end latency. — [Paper](https://arxiv.org/abs/2606.31031) (Netflix · RecSys (Industry) 2026)

<a id="paper-2607-01170"></a>

- **Diffusion-GR2**: Diffusion-GR2 accelerates a reasoning reranker by converting autoregressive decoding into block-parallel diffusion. Conversion fine-tuning teaches valid permutations, on-policy distillation corrects the mismatch with the model's own trajectories, and reinforcement learning further aligns ranking; Amazon Beauty experiments recover near-autoregressive accuracy while increasing decoding throughput. — [Paper](https://arxiv.org/abs/2607.01170) (Meta · 2026)

<a id="paper-2606-31693"></a>

- **ShopX**: ShopX unifies shopping-intent understanding, execution planning, and semantic-ID operations inside one model. It can compose retrieval, listwise ranking, and product bundling through a serving framework with catalog grounding and state management, reducing information loss between an external shopping agent and separate item-selection tools on complex or ambiguous requests. — [Paper](https://arxiv.org/abs/2606.31693) (Alibaba · 2026)

<a id="paper-2607-03362"></a>

- **HGenPush**: HGenPush jointly generates video and author recommendations for push notifications through two branches sharing a user-understanding framework. It combines behavior from multiple scenarios, parallel multi-token prediction for efficiency, and feedback-based preference alignment, meeting interest in both content and creators; deployment on Kuaishou increased daily active users. — [Paper](https://arxiv.org/abs/2607.03362) (Kuaishou · KDD (ADS) 2026)

<a id="paper-2607-04068"></a>

- **UniSGR**: UniSGR joins semantic-ID generation with fine-grained multi-objective ranking through shared pretraining and scenario-specific alignment. Value-aware parallel token prediction and task-aware tokens connect generated candidates to downstream goals, while its STARK attention-and-cache strategy targets beam-search inefficiency, addressing both optimization consistency and serving cost within one framework. — [Paper](https://arxiv.org/abs/2607.04068) (Alibaba · 2026)

<a id="paper-2601-04674"></a>

- **PROMISE**: PROMISE addresses semantic drift, where an early identifier error sends generation into the wrong semantic branch. A lightweight process reward model evaluates intermediate steps and guides beam pruning, enabling extra inference computation to improve recommendation quality rather than relying only on a larger model or final-output scoring. — [Paper](https://arxiv.org/abs/2601.04674) (Kuaishou · RecSys (Industry) 2026)

<a id="paper-2607-02818"></a>

- **Long-Term Optimization for Large-Scale GR**: This work trains a two-tower retriever for session-level reward using autoregressive off-policy REINFORCE and multi-step importance-weight correction. A learned feedback simulator supports sequential offline evaluation and lookahead selection at inference; the reported longer-term gains are model-based and off-policy estimates on Yambda-5B, rather than demonstrated online user outcomes. — [Paper](https://arxiv.org/abs/2607.02818) (VK · 2026)

<a id="paper-2607-08365"></a>

- **DaV-Gen**: DaV-Gen combines fast vector-based candidate drafting with generative verification inside a jointly trained model. Contrastive learning shapes the drafting space, while a fused likelihood-and-similarity score verifies candidates, seeking the efficiency of retrieval and the precision of generative scoring without the objective mismatches of separately optimized cascade stages. — [Paper](https://arxiv.org/abs/2607.08365) (2026)

<a id="paper-2607-12277"></a>

- **Not Only NTP**: NONTP supplements next-token prediction with supervision for future trajectories and cross-domain context. Temporal contrastive learning aligns states with multi-step futures, while trans-domain learning opens another gradient path to item prediction; both auxiliary objectives disappear at inference, expanding what training can teach without adding serving overhead. — [Paper](https://arxiv.org/abs/2607.12277) (Meituan · 2026)

<a id="paper-2607-12425"></a>

- **Where Reasoning Matters**: Where Reasoning Matters finds that semantic-ID positions differ in how much uncertainty they remove about the target item. Its Information-Gain Budget Allocation framework learns to give more latent refinement steps to informative positions and fewer to others, improving the allocation of a fixed reasoning budget compared with uniform per-token computation. — [Paper](https://arxiv.org/abs/2607.12425) (2026)

<a id="paper-2607-11392"></a>

- **CRID (Beyond Semantic IDs)**: CRID separates each document identifier into a semantic cluster and a business-value rank within that cluster. This produces collision-free identifiers that can be updated through local reranking, while an analysis of cluster size explains the balance between personalized preferences and statistical priors; large-scale Taobao experiments connect identifier design to retrieval and business outcomes. — [Paper](https://arxiv.org/abs/2607.11392) (Alibaba · 2026)

<a id="paper-2607-11326"></a>

- **Prompt Generation Technical Report**: Prompt Generation decouples recommendation feature processing from model architecture through shared declarative configurations. The same definitions assemble and compress heterogeneous features for training and serving, reducing feature inconsistency and scenario-specific engineering; its main contribution is a reusable production framework that accelerates experimentation, deployment, and online execution. — [Paper](https://arxiv.org/abs/2607.11326) (Alibaba · 2026)

<a id="paper-2607-15591"></a>

- **RecGPT-V3**: RecGPT-V3 combines persistent user memory, joint text-and-semantic-ID modeling, and latent intent reasoning. The Memory Hub avoids repeatedly analyzing full histories, semantic IDs connect language understanding directly to items, and compact latent tokens replace lengthy explicit rationales, addressing three distinct efficiency and information-loss bottlenecks in a deployed Taobao recommender. — [Paper](https://arxiv.org/abs/2607.15591) (Alibaba · 2026)

<a id="paper-2607-18796"></a>

- **TSGR**: TSGR incorporates commercial value into both item identifiers and candidate scoring for e-commerce search. Query-aware parallel codebooks encode query-conditioned value orderings, while a jointly trained ranking module uses the same model for retrieval and preranking, aligning semantic relevance, user preference, and business goals earlier in the recommendation pipeline. — [Paper](https://arxiv.org/abs/2607.18796) (Alibaba · 2026)

<a id="paper-2607-21028"></a>

- **BARGE**: BARGE addresses two structural weaknesses of semantic-ID recommendation: flattening identifiers loses item boundaries, and hierarchical decoding can drift away from the correct semantic path. Item-context-aware attention restores item structure, while hierarchical path reranking and dual-path decoding provide complementary controls on generation errors; offline and online evaluations show recommendation improvements. — [Paper](https://arxiv.org/abs/2607.21028) (Tencent · 2026)

<a id="paper-2607-21519"></a>

- **DLMRec**: DLMRec replaces left-to-right recommendation generation with discrete diffusion, allowing iterative correction and bidirectional context. A collaborative-aware stochastic tokenizer captures multi-hop relations, a curriculum aligns denoising with preference recovery, and stability-aware voting combines iterative predictions, making the diffusion process better suited to recommendation structure and consistent outputs. — [Paper](https://arxiv.org/abs/2607.21519) (Tencent · 2026)

<a id="paper-2602-05663"></a>

- **GLASS**: GLASS injects long-term interests at different stages of semantic-ID generation. SID-Tier guides the initial token using a compact interest representation, then generated coarse identifiers retrieve relevant historical behaviors to refine later tokens; neighbor augmentation and codebook resizing address sparse matches, linking broad preference guidance with more targeted historical evidence. — [Paper](https://arxiv.org/abs/2602.05663) (Kuaishou · RecSys 2026)

<a id="paper-2607-26500"></a>

- **Multi-Decoder OneRec**: Multi-Decoder OneRec preserves explicit retrieval quotas while sharing user representations across objectives. Isolated LoRA experts learn objective-specific policies, and coordinated constrained beam search reduces overlap between routes, combining controllability with complementary candidates; the paper also releases the Kwai26 benchmark and evaluates the framework under a fixed total retrieval budget. — [Paper](https://arxiv.org/abs/2607.26500) (Kuaishou · 2026)

<a id="paper-2607-26621"></a>

- **WhisperRec**: OneLatent compresses teacher-generated reasoning into a small set of learnable latent tokens instead of emitting lengthy chains of thought. Multi-view adaptive reasoning supplies supervision, staged alignment internalizes it, and curriculum post-training activates the latent reasoning for recommendation, improving the quality-efficiency trade-off in public and industrial evaluations. — [Paper](https://arxiv.org/abs/2607.26621) (Kuaishou · 2026)

<a id="paper-2605-05803"></a>

- **UniVA**: UniVA aligns advertising value across semantic-ID construction, decoding, and serving because high generation probability alone need not mean high ad utility. Business-aware tokenization, value-fused token scores, and request-valid trie constraints help retain valuable eligible ads during limited-beam search, connecting relevance and commercial objectives throughout the generation pipeline. — [Paper](https://arxiv.org/abs/2605.05803) (Tencent · 2026)

<a id="paper-2607-26073"></a>

- **Gwhere**: Gwhere predicts the next point of interest by generating identifiers that jointly encode text, images, spatial structure, and collaborative behavior. Continued pretraining and supervised learning adapt the language model to mobility, while exposure-aware preference optimization aligns predictions with observed choices; deployment in Amap tests the framework under real-time industrial constraints. — [Paper](https://arxiv.org/abs/2607.26073) (Alibaba · RecSys (Industry) 2026)

<a id="paper-2608-06213"></a>

- **Gryphon-v2**: Gryphon-v2 encodes history once, generates semantic-ID candidates, and ranks their resolved items using shared encoder states. A training-only teacher supplies ranking supervision over both current-model rollouts and logged impressions, transferring fine-grained production preferences without another serving model; a Yandex Music test replaced an entire cascade and increased active users. — [Paper](https://arxiv.org/abs/2608.06213) (Yandex · 2026)

<a id="paper-2608-03150"></a>

- **UniGD**: UniGD jointly performs generative retrieval and query-ad relevance scoring to remove a separately served relevance model. Conflict-aware gradient coordination manages competing objectives, frozen multimodal codebooks anchor semantic representations, and type-aware modeling handles heterogeneous ad materials, improving both retrieval quality and serving efficiency in the reported industrial tests. — [Paper](https://arxiv.org/abs/2608.03150) (Kuaishou · 2026)

<a id="paper-2607-27647"></a>

- **LoopMemGR**: LoopMemGR remembers what a system recommended and the feedback it received, rather than reconstructing preferences only from user behavior logs. Recency, frequency, and global views extract reusable experience from recommendation-feedback trajectories, which are compressed into a fixed token budget to condition future generation without continually expanding the input. — [Paper](https://arxiv.org/abs/2607.27647) (Alibaba · 2026)

<a id="paper-2607-24439"></a>

- **UniR²**: UniR² places user context, generated semantic-ID trajectories, and item features in one decoder-only sequence for recall and ranking. Task-specific attention visibility and ranking-side LoRA preserve different optimization needs while sharing the backbone, reducing duplicated context computation and information loss between independently modeled retrieval and ranking stages. — [Paper](https://arxiv.org/abs/2607.24439) (Kuaishou · 2026)

<a id="paper-2607-27944"></a>

- **LGRID**: LGRID jointly encodes local-service attributes, then separates geographic and semantic factors into aligned slots before quantization. Generative and discriminative alignment make identifier positions interpretable and useful for retrieval, preserving cross-attribute relationships while reducing information mixing; the reported collision reduction is substantial but does not eliminate collisions. — [Paper](https://arxiv.org/abs/2607.27944) (Meituan · 2026)

<a id="paper-2607-27789"></a>

- **Feedback-Grounded Policy Discovery**: Feedback-Grounded Policy Discovery separates understanding user intent from choosing an effective recommendation policy. Candidate policies are tested and refined using their incremental outcome value over an intent-only baseline, then distilled with intent knowledge into two latent tokens, bringing feedback-validated guidance to a lightweight generator without an LLM on the serving path. — [Paper](https://arxiv.org/abs/2607.27789) (2026)

<a id="paper-2607-27682"></a>

- **Restoring Collaborative Signals in SID-based GR**: This framework restores collaborative information that compact semantic IDs can lose when content and interaction signals compete. Personalized natural language links collaborative patterns to their audiences and supplies hierarchical cues during generation, improving recommendation without changing the backbone or retraining the identifiers, rather than depending on longer explicit reasoning traces. — [Paper](https://arxiv.org/abs/2607.27682) (2026)

<a id="paper-2608-11980"></a>

- **HCGRec**: HCGRec helps reward-based training when wrong early semantic tokens make the target item unreachable and all sampled completions receive zero reward. It selectively supplies a minimal correct-prefix hint, supervises the hinted context, and applies GRPO to the sampled suffix, restoring informative comparisons while distinguishing provided information from actions the model actually chose. — [Paper](https://arxiv.org/abs/2608.11980) (CIKM 2026)

<a id="paper-2608-09634"></a>

- **IntHQ**: IntHQ addresses the dilution of task-specific signals, fixed task dependencies, and mismatched feature scales in multi-task generative recommendation. Separate context and task streams introduce identity early, learned cross-task interactions replace rigid funnels, and hierarchical queries gather information across layers, allowing each task to use shared information more selectively. — [Paper](https://arxiv.org/abs/2608.09634) (Alibaba · 2026)

<a id="paper-2607-28895"></a>

- **SnapLGR**: SnapLGR combines collaborative semantic-ID construction, vocabulary-grounding pretraining, and optimized beam-search serving for Snapchat video retrieval. Personalized PageRank-based co-engagement learning enriches item codes, continued pretraining teaches unfamiliar tokens to the LLM, and GPU-backed inference makes deployment practical, illustrating why model adaptation and systems design must be developed together. — [Paper](https://arxiv.org/abs/2607.28895) (Snap · 2026)

<a id="paper-2607-29010"></a>

- **EvoReason**: EvoReason replaces direct imitation of noisy reasoning traces with reusable reasoning primitives extracted from strong recommendation trajectories. These primitives structure teacher supervision, and on-policy distillation adapts the teaching process to the student's latent reasoning outcomes, creating a feedback loop intended to make reasoning transfer less redundant and better aligned. — [Paper](https://arxiv.org/abs/2607.29010) (2026)

<a id="paper-2608-02048"></a>

- **SmartGR**: SmartGR adapts knowledge distillation to the hierarchical codes and beam-search behavior of generative recommendation. Hierarchy-aware transfer accounts for uneven learning difficulty across identifier levels, while beam-aware ranking distillation teaches which prefixes should survive pruning, helping a smaller model retain both the teacher's representations and its candidate-selection preferences. — [Paper](https://arxiv.org/abs/2608.02048) (2026)

<a id="paper-2608-00750"></a>

- **HRPO**: HRPO converts final item feedback into token-specific learning signals for hierarchical semantic-ID decoding. It smooths prefix utilities over user clusters, decomposes them into residual credits, and applies clipped, regularized policy updates, addressing sparse credit assignment without broadcasting the same terminal reward indiscriminately to every token position. — [Paper](https://arxiv.org/abs/2608.00750) (KDD 2026)

<a id="paper-2607-25339"></a>

- **SPARC**: SPARC contextualizes behavior attributes before compressing them, avoiding both feature-expansion cost and premature information loss. It models each field's sequence dependencies, routes complementary representations into fixed-capacity slots, and compresses each historical item into one token, enriching the generator's input without increasing its sequence length. — [Paper](https://arxiv.org/abs/2607.25339) (Alibaba · 2026)

<a id="paper-2608-00816"></a>

- **Exp-RSFT**: Exp-RSFT fine-tunes a generative recommender by exponentially weighting logged interactions according to reward, without training a separate reward model. A temperature controls how strongly high-reward examples dominate, balancing limited data coverage against noisy feedback; the analysis and experiments emphasize that overly aggressive reward emphasis can undermine recommendation quality. — [Paper](https://arxiv.org/abs/2608.00816) (Pinterest · 2026)

<a id="paper-2608-17613"></a>

- **OGR (Once Generated, Ranked)**: OGR directly generates ordered recommendation slates using identifiers that fuse item semantics with local collaborative signals. Listwise preference planning and position-wise decoding capture global preferences and inter-item dependencies, while conservative reward-guided optimization aligns the resulting slate with user utility, combining generation and ranking instead of optimizing only a preselected candidate pool. — [Paper](https://arxiv.org/abs/2608.17613) (Kuaishou · 2026)

<a id="paper-2608-18952"></a>

- **rEDMRec**: rEDMRec stores a teacher LLM's reasoning in editable channels for long-term preference, short-term context, item perception, and counterfactual comparisons. A lightweight student retrieves this memory instead of repeating teacher reasoning, reducing online dependence on reasoning depth; ablations show that the usefulness of several channels varies with student capacity. — [Paper](https://arxiv.org/abs/2608.18952) (2026)

<a id="paper-2509-25522"></a>

- **Understanding SID-based GR from a Model-scaling View**: This scaling study finds that enlarging the modality encoder, quantizer, or recommender can quickly yield diminishing returns in semantic-ID-based systems. It identifies limited identifier capacity as a bottleneck and compares direct LLM recommenders, which scale better in the reported experiments, cautioning against assuming language-model scaling behavior transfers unchanged to compressed item codes. — [Paper](https://arxiv.org/abs/2509.25522) (Academic · KDD 2026)

<a id="paper-2601-17787"></a>

- **Beyond Uniform Token Training**: Beyond Uniform Token Training recognizes that semantic-ID tokens play different roles and occur at different frequencies. Prefix-aware weighting emphasizes ambiguity-reducing decisions, frequency weighting gives rarer tokens more attention, and a curriculum combines both with standard likelihood, aligning training effort with hierarchical structure while addressing popularity imbalance. — [Paper](https://arxiv.org/abs/2601.17787) (Academic · 2026)

<a id="paper-2608-21012"></a>

- **Single-Level Large Semantic Codebook**: This approach shortens item identifiers to one semantic token plus a collaborative disambiguation token, reducing autoregressive decoding work. Exposure-aware updates adjust the large codebook as traffic changes while penalizing disruptive identifier changes, balancing fresher representations with temporal stability; evaluation covers both recommendation quality and serving efficiency. — [Paper](https://arxiv.org/abs/2608.21012) (Kuaishou · 2026)

<a id="paper-2609-03313"></a>

- **SelfDR**: SelfDR transfers an LLM's own reasoning-enhanced recommendations into a same-backbone student that answers directly. A reward-trained reasoner supplies targeted rationales to the teacher, and dynamically weighted self-distillation teaches the student from its predictions, retaining useful reasoning effects without requiring external models or explicit reasoning generation at serving time. — [Paper](https://arxiv.org/abs/2609.03313) (2026)

<a id="paper-2609-03369"></a>

- **HypRQ-VAE**: HypRQ-VAE learns discrete item identifiers in hyperbolic space, whose expanding geometry can represent hierarchical and long-tail catalog structure more naturally. Its residual-quantized autoencoder combines textual semantics with this geometry, aiming to preserve distinctive information about sparsely observed items; experiments show particular benefits for tail-item recommendation. — [Paper](https://arxiv.org/abs/2609.03369) (2026)

<a id="paper-2609-03522"></a>

- **EPIC**: EPIC adds explicit competition between complete candidate items to semantic-ID diffusion decoding. It forms a personalized posterior from the current partial identifier and recent interactions, then projects that distribution onto unresolved token positions, preserving promising item hypotheses while leaving the pretrained backbone frozen and adding no extra decoder forward pass. — [Paper](https://arxiv.org/abs/2609.03522) (2026)

<a id="paper-2608-29652"></a>

- **ICEGR**: ICEGR carries query intent through item encoding, supervised training, and preference optimization for e-commerce search. Intent-aware identifiers capture query-product associations, synthetic queries support low-exposure products, and relevance-calibrated preference learning limits business-driven relevance loss, aligning the full retrieval pipeline with what the user is actually searching for. — [Paper](https://arxiv.org/abs/2608.29652) (Baidu · 2026)

<a id="paper-2609-36688"></a>

- **GRP v0.1 Technical Report**: GRP combines semantic-ID retrieval, candidate ranking, and reward reuse in one encoder-decoder framework. A frozen ranking module supplies reinforcement-learning rewards, with reference-anchored optimization protecting logged targets; progressive online experiments test retrieval and selected cascade replacements, showing deployment gains while explicitly retaining open questions about ranking quality and metric trade-offs. — [Paper](https://arxiv.org/abs/2609.36688) (Snap · arXiv 2026)

<a id="paper-2609-36670"></a>

- **FineSID: Scalable and Efficient Semantic Identifier Learning for Generative Recommendation**: FineSID targets sparse codebook learning caused by assigning each item to only one winning codeword during quantization. Soft, differentiable learning signals reach the full codebook while preserving semantic consistency, improving utilization and reducing collisions without relying on elaborate initialization or post-hoc fixes; experiments connect the better optimization to recommendation gains. — [Paper](https://arxiv.org/abs/2609.36670) (Tsinghua University / Huawei Noah’s Ark Lab / University of Science and Technology of China · arXiv 2026)

<a id="paper-2609-34306"></a>

- **SPRINT: Single-Step Generative Recommendation via Average Probability Velocity**: SPRINT predicts probabilities for all semantic-ID positions in one bidirectional-Transformer pass instead of repeated decoding or refinement. Its average-probability-velocity formulation motivates this shortcut, while token-level and whole-identifier contrastive objectives restore coherence between independently predicted positions, addressing the risk that fast parallel predictions form an inconsistent item code. — [Paper](https://arxiv.org/abs/2609.34306) (University of Technology Sydney / New York University Abu Dhabi / University of California, San Diego · arXiv 2026)

<a id="paper-2610-01533"></a>

- **Neither Black nor White: Balancing Semantic and Collaborative Signals with Graph-Informed Semantic IDs (GrIS)**: GrIS reframes semantic-ID construction for generative recommendation as hierarchical partitioning of a graph whose nodes encode semantic content and edges encode collaborative signals, with content-only quantization recovered as an empty-graph special case. It separates graph construction from recursive partitioning and studies RecDMoN, based on differentiable graph pooling, and RQ-GAE, which adds graph-aware representations and reconstruction to residual quantization. The abstract reports improvements over collaborative-filtering-aware state-of-the-art methods on real-world datasets, with Hit@10 gains of up to 52%. — [Paper](https://arxiv.org/abs/2610.01533) (Huawei Ireland Research Centre · arXiv 2026)

<a id="paper-2609-38646"></a>

- **Exploring Forum Post Retrieval with Generative Modeling**: The paper explores generative retrieval for Facebook Forum by transferring training signals from Facebook Groups and hierarchical semantic IDs learned from Facebook Feed. A 3B instruction-tuned language model generates item IDs from user context, while ablations examine SID construction, history composition and length, and user-profile features. — [Paper](https://arxiv.org/abs/2609.38646) (Meta; William & Mary · arXiv 2026)

<a id="paper-2609-39319"></a>

- **Residual Trajectory Distillation for Generative Retrieval**: ResTD transfers residual-quantization trajectories from a frozen semantic-ID indexer into generative retrieval training. Residual-derived soft targets teach decoder states distinctions hidden by hard SID labels and information about later quantization decisions, while keeping the retrieval index and inference procedure unchanged. Multilingual e-commerce experiments show consistent gains over strong baselines and controlled soft-target alternatives. — [Paper](https://arxiv.org/abs/2609.39319) (Beihang University; Meituan · arXiv 2026)

<a id="paper-2609-18148"></a>

- **LIGE-GR: A Smooth Leap from Ranking to Generative Recommendation in the LLM Era**: LIGE-GR upgrades an existing itemwise recommender into a listwise generation-and-evaluation system while preserving compatibility with its models, value functions and serving infrastructure. It provides an incremental route to sequence-level optimization in mature industrial recommendation systems. In Instagram Reels and Facebook Video experiments, the authors report time-spent gains of 1.14% and 0.72%, respectively, with modest additional inference resources. — [Paper](https://arxiv.org/abs/2609.18148) (Meta Platforms, Inc. · arXiv 2026)

<a id="paper-2610-02600"></a>

- **When History Misleads: Asymmetric Margin Supervision for Instruction-Guided LLM Generative Recommendation**: AIMS converts the effect of deleting misleading user-history events into request-specific ranking-margin targets, then learns them while retaining complete histories as input. An asymmetric auxiliary loss updates only the competitor score, leaving inference unchanged. Tests across six LLM backbones and three datasets report improved Recall and NDCG. — [Paper](https://arxiv.org/abs/2610.02600) (Meta; Duke University · arXiv 2026)

<a id="paper-2610-06590"></a>

- **SPRIG: Semantic-ID-enhanced Paths for Knowledge Graph-based Generative Recommendation**: SPRIG combines content-derived semantic IDs with knowledge-graph path reasoning. It trains a generative recommender on paths that end in quantized item tokens, seeking parameter sharing while retaining relational context. Movie and music experiments report competitive recommendation performance with fewer parameters and lower compute than prior generative models. — [Paper](https://arxiv.org/abs/2610.06590) (Johannes Kepler University Linz; Albatross AI; Criteo AI Lab; Linz Institute of Technology · arXiv 2026)

<a id="paper-2609-15598"></a>

- **Self-Evolving Memory for Generative Recommendation**: LION addresses conflicts between heterogeneous preference changes during continual adaptation of a shared generative recommender. Sparse key-value memory isolates activated behavior patterns, and consolidation loss reinforces underrepresented changes. Experiments evaluate per-period and user/item-group behavior on real-world datasets. The design is useful for sparse adaptation, but the reported Amazon setup uses at most ten history items and does not demonstrate ultra-long-history scaling. — [Paper](https://arxiv.org/abs/2609.15598) (National University of Singapore; Meta AI · arXiv 2026)

<a id="paper-2601-19501"></a>

- **Masked Diffusion Generative Recommendation**: MDGR replaces fixed-order semantic-ID generation with bidirectional masked diffusion. Parallel codebooks, interest-aware masking and a warm-up-to-parallel decoder improve retrieval quality while exposing a measured speed-quality tradeoff. Industrial A/B tests support practical use; the efficiency comparison is against its own serial decoder. — [Paper](https://arxiv.org/abs/2601.19501) (Alibaba International Digital Commerce Group; Wuhan University · RecSys (Industry) 2026)

<a id="paper-2610-10124"></a>

- **Training with Missed Targets in Generative Recommendation: Separating Supervision from Probability Competition**: The paper separates three effects of adding missed targets to generative-reranker training: candidate weighting, added supervision and probability competition. Matched losses show that competition can hurt returned-item ranking, motivating generator-specific validation before enabling candidate completion. — [Paper](https://arxiv.org/abs/2610.10124) (Independent Researcher; Zhejiang University · arXiv 2026)

<a id="paper-2610-07402"></a>

- **Rethinking Semantic ID Construction for Generative Recommendation: SimHash with Parallel Decoding and Semantic Alignment**: FLASH pairs training-free SimHash semantic IDs with parallel decoding and explicit semantic alignment. It argues that decoding mismatch and discretization loss explain hashing’s weakness, and reports competitive recommendation and cold-start performance without training a tokenizer. — [Paper](https://arxiv.org/abs/2610.07402) (University of Illinois Chicago; Amazon · NeurIPS 2026)
