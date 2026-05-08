---
title: "EmBrace: A Collective Knowledge Fusion Framework Toward Unified EEG Foundation Models"
collection: publications
category: conferences
permalink: /publication/2026-embrace
# excerpt: 'This paper is about a famous math equation, $$E=mc^2$$'
date: 2026-07-12
venue: 'Forty-third International Conference on Machine Learning (ICML)'
# paperurl: 'https://academicpages.github.io/files/paper3.pdf'
# citation: 'Anonymous. (2026). EmBrace: A Collective Knowledge Fusion Framework Toward Unified EEG Foundation Models. Forty-Third International Conference on Machine Learning.'
published: true
---

**Accepted at ICML 2026!**  
<!-- <span style="font-family: 'Times New Roman', serif; font-style: italic;">
  Paper PDF coming soon...
</span> -->
<span style="font-family: 'Times New Roman', serif;">
  Paper PDF coming soon...
</span>


<br>

# Abstract
Electroencephalography (EEG) foundation models (EFMs) have achieved strong performance across a wide range of downstream EEG tasks via pretraining and fine-tuning. Through empirical analysis, we observe that **(i)** no single EFM consistently dominates all tasks, yet identifying the task-specific optimal model by fine-tuning all EFMs introduces substantial computational overhead; and **(ii)** models with inferior task-level performance still exhibit strengths at the sample level as distinct architectures induce diverse inductive biases. These observations motivate EmBrace, a representation-centric framework for sample-aware knowledge fusion that avoids the constraints of parameter-level or output-level alignment. EmBrace synchronizes discriminative intermediate representations into a unified manifold and adaptively weights multiple EFMs at the sample level while selecting the most compatible model as the carrier. Extensive experiments across multiple EEG benchmarks demonstrate that EmBrace consistently improves over SOTA EFMs and generalizes effectively under cross-task settings.

