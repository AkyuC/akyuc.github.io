### 基本介绍
Java 三个不同版本：
- Java SE：Standard Edition
- Java EE：Enterprise Edition
- Java ME：Micro Edition

<img src="/img/java/java-ee-se-me.png" alt="java-ee-se-me" style="width: 50%; height: auto; display: block; margin: 0 auto;" />

简单来说，Java SE就是标准版，包含标准的JVM和标准库，
而Java EE是企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。

Java ME就和Java SE不同，它是一个针对嵌入式设备的“瘦身版”，Java SE的标准库无法在Java ME上使用，Java ME的虚拟机也是“瘦身版”。

毫无疑问，Java SE是整个Java平台的核心，而Java EE是进一步学习Web应用所必须的。
我们熟悉的Spring等框架都是Java EE开源生态系统的一部分。
不幸的是，Java ME从来没有真正流行起来，反而是Android开发成为了移动平台的标准之一，因此，没有特殊需求，不建议学习Java ME。

因此我们推荐的Java学习路线图如下：

- 首先要学习Java SE，掌握Java语言本身、Java核心开发技术以及Java标准库的使用；
- 如果继续学习Java EE，那么Spring框架、数据库开发、分布式架构就是需要学习的；
- 如果要学习大数据开发，那么Hadoop、Spark、Flink这些大数据平台就是需要学习的，他们都基于Java或Scala开发；
- 如果想要学习移动开发，那么就深入Android平台，掌握Android App开发。

### 名词解释
- JDK：Java Development Kit
- JRE：Java Runtime Environment
简单地说，JRE 就是运行Java字节码的虚拟机。
但是，如果只有Java源码，要编译成Java字节码，就需要JDK。
因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。
<img src="/img/java/jdk-jre.png" alt="jdk-jre" style="width: 50%; height: auto; display: block; margin: 0 auto;" />

### 程序基础
类名大写开头，方法名小写开头。
Java 入口程序规定的方法必须是静态方法。

final 为常量修饰符。

Java的字符串除了是一个引用类型外，还有个重要特点，就是字符串不可变。