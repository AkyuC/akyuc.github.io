分词器实际上就是将文本字符串转换为更小单位（tokens）的工具，也是大语言模型基础组件之一。
这些小单位可以是单词、词根、子词或字符，具体取决于使用的分词策略。

最简单的分词方式是古典分词方法，直接按照标点符号分词，或者按语法规则分词。但是缺陷明显：
1. 对于未在词表中出现的词（Out Of Vocabulary, OOV ），模型将无法处理（未知符号标记为 [UNK]）
2. 词表中的低频词/稀疏词在模型训无法得到训练（因为词表大小有限，太大的话会影响效率）。
3. **很多语言难以用空格进行分词**，例如英语单词的多形态，"look"衍生出的"looks", "looking", "looked"，其实都是一个意思，但是在词表中却被当作不同的词处理，模型也无法通过 old, older, oldest 之间的关系学到 smart, smarter, smartest 之间的关系。这一方面增加了训练冗余，另一方面也造成了大词汇量问题。

目前最常用的三种分词算法是 BPE（Byte-Pair Encoding）、WordPiece 和 SentencePiece，简要介绍一下（~~抄一下~~）。

### WordPiece (Subword 算法)
基于子词的分词方法（Subword Tokenization）。
这种方法的目的是通过一个有限的词表 来解决所有单词的分词问题，同时尽可能将结果中 token 的数目降到最低。

例如，可以用更小的词片段来组成更大的词，例如：

“unfortunately ” = “un ” + “for ” + “tun ” + “ate ” + “ly ”。

可以看到，有点类似英语中的词根词缀拼词法，其中的这些小片段又可以用来构造其他词。
可见这样做，既可以降低词表的大小，同时对相近词也能更好地处理。


### BPE（Byte-Pair Encoding）
字节对编码（BPE, Byte Pair Encoder），又称 digram coding 双字母组合编码，是一种数据压缩 算法，用来在固定大小的词表中实现可变⻓度的子词。
该算法简单有效，因而目前它是最流行的方法。



### Reference
BPE 算法原理及使用指南【深入浅出】https://zhuanlan.zhihu.com/p/448147465 by Suprit
