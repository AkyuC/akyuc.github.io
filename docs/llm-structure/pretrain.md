下面介绍一下预训练的一些主要步骤

### Model Structure 
目前的 LLM 都是 decoder-only 的，经过分词器编码、Embedding、k 个 transformers、归一化、线性变换和 softmax 之后，最后使用分词器解码得到下一个词的预测输出。
其中 Transformer 有两种结构，Dense 和 MoE。

Dense model 就是 Transformer 传统架构加上 RoPE 编码优化。
MoE model 使用 MoE 层替换了 FFN 层，在一次推理中不激活所有的神经网络，使用门阀函数取 top-k 进行激活。

![LLM-structure](/img/llm-structure/LLM-structure.png)

![LLM-structure-moe](/img/llm-structure/LLM-structure-moe.png)

### Input Embedding
获取输入句子的每一个单词的表示向量 X，X 由单词的 Embedding（ Embedding 就是从原始数据提取出来的 Feature）和单词位置的 Embedding 相加得到。
<img src="/img/llm-structure/transformer-word-embedding.png" alt="transformer-word-embedding" style="width: 80%; height: auto; display: block; margin: 0 auto;" />

这里的 Token Embedding 实际上就是分词器输出之后，每个词的 ID，比如说 “我” 可能 ID 就是 2，用二进制表示就是只有最低的第二位为 1，其余为 0。

<img src="/img/llm-structure/transformer-pos-embedding.png" alt="transformer-pos-embedding" style="width: 40%; height: auto; display: block; margin: 0 auto;" />

众所周知，Transformer 模型之所以能够取得如此卓越的效果，其中的 Attention 机制功不可没，它的本质是计算输入序列中的每个 Token 与整个序列的注意力权重，所以位置编码很重要。

目前常用的位置编码为 Sinusoidal functions，其中 d 表示词向量的维度，k 表示位置索引，2i 和 2i+1 表示位置向量的分量索引，
例如 $p_{k,2i}$ 和 $p_{k,2i+1}$ 分别表示位置 k 的位置向量的第 2i 和第 2i+1 个分量：
<img src="/img/llm-structure/sinusoidal-functions.png" alt="sinusoidal-functions" style="width: 40%; height: auto; display: block; margin: 0 auto;"  />

### Transformer
这部分就不详细介绍了，网上有很多写得很好的，可以参考下面的 Reference。

RoPE 加入是对传统 transformer 架构的改进。RoPE位置编码通过将一个向量旋转某个角度，为其赋予位置信息。

从前面我们可以知道，Token embedding 中的 position embedding 具有位置信息，是个多维的向量。
我的理解是：通过向量角度的旋转，可以使得两个 Token 的向量同方向，进而能够直接比较两者的位置信息，这样能够在 **角度** 和 **长度** 两个角度比较相似性。

<img src="/img/llm-structure/RoPE.png" alt="RoPE" style="width: 60%; height: auto; display: block; margin: 0 auto;"  />

后面就是比较普通的归一化、线性层、softMax，最后分词器 decode。

### model train
预训练阶段就是在训练模型预测下一个 Token，然后计算交叉熵 loss 累积梯度下降更新参数

在信息论当中，使用KL散度（“相对熵”）来衡量两个分布 P 和 Q 之间的距离：
<img src="/img/llm-structure/KL.png" alt="KL" style="width: 60%; height: auto; display: block; margin: 0 auto;"  />

其中第一部分是 P 的熵，第二个部分就是交叉熵 $H(p,q) = - \sum_{i=1}^n p(x_i) log q(x_i)$。

在机器学习当中 P 往往用来表示样本的真实分布，即需要预测的下个 Token 的分布，这个可以从数据集中获取，这部分是一个固定值。
Q 为模型输出得到的分布，即实际模型输出的下个 Token 的分布。

当模型预测的 Token 分布和实际数据集的 Token 分布完全相同时， KL 散度为 0，模型完全拟合。

但是在进行梯度更新时，由于 $H(P)$ 是样本中的，不会改变，与模型无关，对模型参数求导为 0 ，所以在实际参数更新中，我们只关注 $H(p,q)$。

### minimind
代码需要分析 model/model.py、train_pretrain.py，待后面分析。

### Reference
- Transformer模型详解（图解最完整版）：https://zhuanlan.zhihu.com/p/338817680
- Transformer学习笔记一：Positional Encoding（位置编码）：https://zhuanlan.zhihu.com/p/454482273
- 图解RoPE旋转位置编码及其特性：https://zhuanlan.zhihu.com/p/667864459
- 深度学习 | 反向传播详解：https://zhuanlan.zhihu.com/p/115571464
- 反向传播算法推导-全连接神经网络：https://zhuanlan.zhihu.com/p/39195266
- 交叉熵的推导：https://zhuanlan.zhihu.com/p/126272731