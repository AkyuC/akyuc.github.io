预训练主要分为以下几个步骤
1. 输入配置（训练批次、批次大小、是否使用分布式训练等）
2. 初始化分词器和模型
3. 加载训练数据
4. scaler（精度设置）和 optimizer（优化设置）
5. 分批次训练

### Model Structure 
目前的LLM 都是 decoder-only 的，经过分词器编码、Embedding、k 个 transformers、归一化、线性变换和 softmax 之后，最后使用分词器解码得到下一个词的预测输出。
其中 transformer 有两种结构，dense 和 moe。

dense model 就是 transformer 传统架构加上 RoPE 编码优化。
moe model 使用 MoE 层替换了 FFN 层，在一次推理中不激活所有的神经网络，使用门阀函数取top-k进行激活。

![LLM-structure](/img/minimind/LLM-structure.png)

![LLM-structure-moe](/img/minimind/LLM-structure-moe.png)

### Input Embedding
获取输入句子的每一个单词的表示向量 X，X 由单词的 Embedding（ Embedding 就是从原始数据提取出来的Feature）和单词位置的 Embedding 相加得到。
![tansformer-word-embedding](/img/minimind/transformer-word-embedding.png)

这里的 token Embedding 实际上就是分词器输出之后，每个词的 ID，比如说 “我” 可能 ID 就是 2，用二进制表示就是只有最低的第二位为 1，其余为 0。

</div>
<div style="flex-basis: 30%;">

![tansformer-pos-embedding](/img/minimind/transformer-pos-embedding.png)
</div>
</div>
众所周知，transformer模型之所以能够取得如此卓越的效果，其中的Attention机制功不可没，它的本质是计算输入序列中的每个token与整个序列的注意力权重，所以位置编码很重要。

目前常用的位置编码为 Sinusoidal functions，其中 d 表示词向量的维度，k 表示位置索引，2i 和 2i+1 表示位置向量的分量索引，
例如 p_{k,2i} 和 p_{k,2i+1} 分别表示位置 k 的位置向量的第 2i 和第 2i+1 个分量：

</div>
<div style="flex-basis: 30%;">

![sinusoidal-functions](/img/minimind/sinusoidal-functions.png)
</div>
</div>

### Transformer
这部分就不详细介绍了，网上有很多写得很好的，可以参考下面的 Reference。

RoPE 加入是对传统 transformer 架构的改进。RoPE位置编码通过将一个向量旋转某个角度，为其赋予位置信息。

从前面我们可以知道，token embedding 中的 position embedding 具有位置信息，是个多维的向量。
我的理解是：通过向量角度的旋转，可以使得两个 token 的向量同方向，进而能够直接比较两者的位置信息，这样能够在 **角度** 和 **长度** 两个角度比较相似性。
</div>
<div style="flex-basis: 50%;">

![RoPE](/img/minimind/RoPE.png)
</div>
</div>

后面就是比较普通的归一化、线性层、softMax，最后分词器 decode

### minimind
代码需要分析 model/model.py、train_pretrain.py，待后面分析。

### Reference
Transformer模型详解（图解最完整版）：https://zhuanlan.zhihu.com/p/338817680

Transformer学习笔记一：Positional Encoding（位置编码）：https://zhuanlan.zhihu.com/p/454482273

图解RoPE旋转位置编码及其特性：https://zhuanlan.zhihu.com/p/667864459