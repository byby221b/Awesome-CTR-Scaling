<!-- Generated from data/papers.json. Do not edit by hand; run python scripts/generate.py. -->

# Generative Pre-training for CTR

[← Catalog](../../README.md) · [All topics](../README.md) · [Search website](https://byby221b.github.io/Awesome-CTR-Scaling/?category=generative-pre-training-for-ctr)

Generative objectives and pre-training for discriminative CTR tasks.

4 papers · Updated 2026-10-09

<a id="paper-2512-14041"></a>

- **GE4Rec**: GE4Rec introduces supervised feature generation for click prediction, addressing collapse and redundancy in raw-ID feature interactions. An encoder forms hidden feature representations and a decoder regenerates feature embeddings under click-label supervision, allowing existing CTR architectures to adopt richer generative learning rather than relying solely on interactions among their original embeddings. — [Paper](https://arxiv.org/abs/2512.14041) (Tencent · 2025)

<a id="paper-2506-03699"></a>

- **GPSD**: GPSD improves the scalability of click and conversion prediction by initializing discriminative models from generative pretraining. Sparse parameter freezing then limits overfitting during adaptation, narrowing the generalization gap that can otherwise make larger rankers perform worse than smaller ones; experiments show continued gains as Transformer capacity increases. — [Paper](https://arxiv.org/abs/2506.03699) (Alibaba · KDD 2025)

<a id="paper-2605-24986"></a>

- **HeteGenCTR**: HeteGenCTR addresses unequal reconstruction difficulty across heterogeneous CTR feature fields, where easy fields can dominate generative training. Learned per-field difficulty controls both loss weighting and attention, directing gradients and cross-field information toward underfit fields through a shared signal; experiments report particularly strong benefits for cold-start and long-tail users. — [Paper](https://arxiv.org/abs/2605.24986) (Alibaba · 2026)

<a id="paper-2608-02738"></a>

- **KGD**: KGD separates refreshable behavioral knowledge from task-specific adaptation in streaming recommendation. Behavioral multi-token prediction filters unrelated future events from supervision, while read-only cross-attention and a separate calibration residual let downstream tasks use refreshed encoder knowledge without rewriting it, reducing interference between continual pretraining updates and existing task models. — [Paper](https://arxiv.org/abs/2608.02738) (Shopee · 2026)
