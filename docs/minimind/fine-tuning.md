经过预训练，LLM 此时已经掌握了大量知识，然而此时它只会无脑地词语接龙，还不会与人聊天，需要进行大模型参数微调，使得模型能够正常对话。

从参数更新上分为 全参数微调（Full Fine-Tuning）和 PEFT（Parameter-Efficient Fine-Tuning），其中 PEFT 只对部分参数进行更新。
从训练方法上来看，分为 监督式微调 SFT(Supervised Fine Tuning) 和基于强化学习（Reinforcement Learning，RL）的微调，其中 RL 中有基于人类反馈的强化学习微调 RLHF (Reinforcement Learning with Human Feedback) 和 基于 AI 反馈的强化学习微调 RLAIF (Reinforcement Learning with AI Feedback)。

### 全参数微调（Full Fine-Tuning）
Full Fine-Tuning 实际上和预训练基本一致，只是使用的数据集不一样了，并且一般是固定格式的 prompt。

minimind 作者对 匠数大模型SFT数据集 和 Magpie-SFT数据集 进行了数据清洗（只保留中文字符占比高的内容），筛选长度<512的对话，得到sft_mini_512.jsonl(~1.2GB)。
所有sft文件 sft_X.jsonl 数据格式均为
```
{
    "conversations": [
        {"role": "user", "content": "你好"},
        {"role": "assistant", "content": "你好！"},
        {"role": "user", "content": "再见"},
        {"role": "assistant", "content": "再见！"}
    ]
}
```

### PEFT（Parameter-Efficient Fine-Tuning）

#### Prompt Tuning

#### Prefix Tuning

#### LoRA（Low-Rank Adaptation）

#### QLoRA（Quantized Low-Rank Adaptation）

### SFT

### RL
#### RLHF

#### RLAIF


### Reference
炼石成丹：大语言模型微调实战系列（二）模型微调篇：https://aws.amazon.com/cn/blogs/china/practical-series-on-fine-tuning-large-language-models-part-two/