预训练主要分为以下几个步骤
1. 输入配置（训练批次、批次大小、是否使用分布式训练等）
2. 初始化分词器和模型
3. 加载训练数据
4. scaler（精度设置）和 optimizer（优化设置）
5. 分批次训练

### 前置知识
#### Model Structure 
![LLM-structure](/img/minimind/LLM-structure.jpg)

![LLM-structure-moe](/img/minimind/LLM-structure.jpg)