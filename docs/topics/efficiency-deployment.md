<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Efficiency & Deployment

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=efficiency-deployment)

Training, inference and deployment techniques that make model scaling practical.

7 papers · Updated 2026-10-02

| Paper | Affiliation | Venue | Year | Tags | Links | Key Contribution |
|:------|:------------|:------|:-----|:-----|:------|:-----------------|
| <a id="paper-2602-10455"></a>**UG-Sep: Compute Only Once: UG-Separation for Efficient Large Recommendation Models** | ByteDance | arXiv | 2026 | `Serving` `Training Efficiency` | [Paper](https://arxiv.org/abs/2602.10455) | User-general feature separation to reduce redundant computation; enables affordable scaling |
| <a id="paper-2607-28940"></a>**TransX: Scaling Transformer-based Recommendation via Behavioral and Serving Stream Crossings** | LinkedIn | KDD (ADS) | 2026 | `Serving` `Attention` `Long Sequence` | [Paper](https://arxiv.org/abs/2607.28940) | Encoder-decoder decoupling behavior/serving streams; 80% compute reduction with +6.0% CTR |
| <a id="paper-2607-12281"></a>**SlimPer: Make Personalization Model Slim and Smart** | Meta | arXiv | 2026 | `Serving` `Long Sequence` `User Modeling` | [Paper](https://arxiv.org/abs/2607.12281) | O(N) iterative knowledge-base refinement; depth decoupled from history length; deployed on Instagram |
| <a id="paper-2605-24989"></a>**Selective Test-Time Compute Scaling for CTR Prediction via Uncertainty-Triggered Feature Path Exploration** | Alibaba | arXiv | 2026 | `Test-time Compute` `Sparse Activation` | [Paper](https://arxiv.org/abs/2605.24989) | Training-free per-instance test-time compute scaling; routes uncertain instances through stochastic paths |
| <a id="paper-2512-07650"></a>**Exploring Test-time Scaling via Prediction Merging on Large-Scale Recommendation** | Academic | SIGIR | 2026 | `Test-time Compute` | [Paper](https://arxiv.org/abs/2512.07650) | First study of test-time compute scaling for recommendation via prediction merging |
| <a id="paper-2609-02671"></a>**DS-Frame: Recommender System as Slow and Fast Thinkers** | Academic | arXiv | 2026 | `Test-time Compute` `Sequence Modeling` | [Paper](https://arxiv.org/abs/2609.02671) | Adaptive fast–slow inference framework; Fast System for routine prediction + Slow System for iterative latent refinement + learned selector routing each sample under a controllable computation budget; larger gains on challenging user groups with effective accuracy–efficiency trade-offs |
| <a id="paper-2609-01807"></a>**SPD: Single Pass Decoding for Generative Reranking** | Amazon | arXiv | 2026 | `Test-time Compute` `Generative Rec` `Serving` | [Paper](https://arxiv.org/abs/2609.01807) | Format-specialized decoding for generative reranking; decodes all N item ordinals in O(1) forward passes via an N×K item-position score matrix read off prefill hidden states and optimal bipartite assignment, replacing autoregressive O(N) per-token decoding |
