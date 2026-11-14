# Technical verification sources

Checked 2026-11-14. Sources validate corrections to the user's supplied raw material. No source artwork, narration, or code was reused.

| Claim / correction | Primary source |
|---|---|
| Language models predict tokens using context; parameters and self-attention | [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course/llm) |
| Self-supervised pretraining uses the input text for its own targets; fine-tuning differs from pretraining | [Hugging Face model course](https://huggingface.co/learn/llm-course/chapter1/4) |
| Tokenization can use subword units and maps text to IDs | [Hugging Face tokenizers](https://huggingface.co/learn/llm-course/chapter2/4) |
| Weighted attention, positional information and network layers | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) |
| Autoregressive generation extends the input; token selection can use sampling | [Hugging Face generation guide](https://huggingface.co/docs/transformers/main/en/llm_tutorial) |
| Demonstrations and ranked human feedback can improve instruction-following without making outputs infallible | [Ouyang et al., 2022](https://arxiv.org/abs/2203.02155) |
| External retrieved text can condition generation separately from parametric knowledge | [Lewis et al., 2020](https://arxiv.org/abs/2005.11401) |
| Models can reproduce some training passages verbatim | [Carlini et al., 2020/2021](https://arxiv.org/abs/2012.07805) |

The search diagram is an original conceptual application flow, not a claim that all applications implement the same orchestration. The lesson avoids a categorical philosophical claim about consciousness; linguistic fluency does not establish human experience. No invented dataset size, training duration, token ID, measured probability or attention map is asserted. Numerical examples and token divisions are explicitly schematic.

Reference only: [Animated AI Icons Pack, HU Shahir / Motion Array](https://motionarray.com/stock-motion-graphics/animated-ai-icons-pack-1361492/?q=ai). Web text fetch failed, but the browser page and its directly linked poster were inspected. Poster archived for reference; never served by the project. No license to use the reference artwork is assumed.
