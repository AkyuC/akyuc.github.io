分词器实际上就是将文本字符串转换为更小单位（tokens）的工具，也是大语言模型基础组件之一。
这些小单位可以是单词、词根、子词或字符，具体取决于使用的分词策略。

最简单的分词方式是古典分词方法，直接按照标点符号分词，或者按语法规则分词。但是缺陷明显：
1. 对于未在词表中出现的词（Out Of Vocabulary, OOV ），模型将无法处理（未知符号标记为 [UNK]）
2. 词表中的低频词/稀疏词在模型训无法得到训练（因为词表大小有限，太大的话会影响效率）。
3. **很多语言难以用空格进行分词**，例如英语单词的多形态，"look"衍生出的"looks", "looking", "looked"，其实都是一个意思，但是在词表中却被当作不同的词处理，模型也无法通过 old, older, oldest 之间的关系学到 smart, smarter, smartest 之间的关系。这一方面增加了训练冗余，另一方面也造成了大词汇量问题。

目前最常用的三种分词算法是 BPE（Byte-Pair Encoding）、WordPiece 和 SentencePiece，简要介绍一下（~~抄一下~~）。

主要看一下 BPE 算法

### BPE（Byte-Pair Encoding）
字节对编码（BPE, Byte Pair Encoder），又称 digram coding 双字母组合编码，是一种数据压缩 算法，用来在固定大小的词表中实现可变⻓度的子词。
该算法简单有效，因而目前它是最流行的方法。

BPE 首先将词分成单个字符，然后依次用另一个字符替换频率最高的一对字符 ，直到循环次数结束

1. 准备足够大的训练语料，并确定期望的Subword词表大小
2. 将单词拆分为成最小单元。比如英文中26个字母加上各种符号，这些作为初始词表
3. 在语料上统计单词内相邻单元对的频数，选取频数最高的单元对合并成新的Subword单元
4. 重复第3步直到达到第1步设定的Subword词表大小或下一个最高频数为1

![BPE](/img/minimind/BPE.jpg)

简要流程可以查看：https://zhuanlan.zhihu.com/p/191648421

### BBPE
BPE理论上还是会出现OOV的，当词汇表的大小受限时，一些较少频繁出现的子词和没有在训练过程中见过的子词，就会无法进入词汇表出现OOV，而Byte-level BPE(BBPE)理论上是不会出现这个情况的。

Byte-level BPE(BBPE)和Byte-Pair Encoding (BPE)区别就是BPE是最小词汇是字符级别，而BBPE是字节级别的，通过UTF-8的编码方式这一个字节的256的范围，理论上可以表示这个世界上的所有字符。

所以实现的步骤和BPE就是实现的粒度不一样，其他的都是一样的。

### minimind 中的 tokneizer

在 scripts/train_tokenizer.py 文件中，使用 hugging face 的 BBPE 算法来训练，但是没有给出分词的数据集
```
    # 初始化tokenizer
    tokenizer = Tokenizer(models.BPE())
    tokenizer.pre_tokenizer = pre_tokenizers.ByteLevel(add_prefix_space=False)

    # 定义特殊token
    special_tokens = ["<unk>", "<s>", "</s>"]

    # 设置训练器并添加特殊token
    trainer = trainers.BpeTrainer(
        vocab_size=6400,
        special_tokens=special_tokens,  # 确保这三个token被包含
        show_progress=True,
        initial_alphabet=pre_tokenizers.ByteLevel.alphabet()
    )

    # 读取文本数据
    texts = read_texts_from_jsonl(data_path)

    # 训练tokenizer
    tokenizer.train_from_iterator(texts, trainer=trainer)
```

在 train_pretrain.py 文件中，直接加载已经分好的词表

```
def init_model(lm_config):
    tokenizer = AutoTokenizer.from_pretrained('./model/minimind_tokenizer')
    model = MiniMindLM(lm_config).to(args.device)
    Logger(f'LLM总参数量：{sum(p.numel() for p in model.parameters() if p.requires_grad) / 1e6:.3f} 百万')
    return model, tokenizer
```

### Reference
BPE 算法原理及使用指南【深入浅出】：https://zhuanlan.zhihu.com/p/448147465 by Suprit

NLP三大Subword模型详解：BPE、WordPiece、ULM：https://zhuanlan.zhihu.com/p/191648421 by 阿北

LLM大语言模型之Tokenization分词方法（WordPiece，Byte-Pair Encoding (BPE)，Byte-level BPE(BBPE)原理及其代码实现）：https://zhuanlan.zhihu.com/p/652520262 by Glan格蓝
