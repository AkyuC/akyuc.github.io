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

### 面向对象
继承有个特点，就是子类无法访问父类的 private 字段或者 private 方法。
用 protected 修饰的字段可以被子类访问。
super 关键字表示父类（超类）。子类引用父类的字段时，可以用 super.fieldName。

阻止继承：
正常情况下，只要某个 class 没有 final 修饰符，那么任何类都可以从该 class 继承。
从 Java 15 开始，允许使用 sealed 修饰 class，并通过 permits 明确写出能够从该 class 继承的子类名称。

覆写 Object 方法，
因为所有的 class 最终都继承自 Object，而 Object 定义了几个重要的方法：
- toString()：把instance输出为String；
- equals()：判断两个instance是否逻辑相等；
- hashCode()：计算一个instance的哈希值。

继承可以允许子类覆写父类的方法。
如果一个父类不允许子类对它的某个方法进行覆写，可以把该方法标记为 final。用 final 修饰的方法不能被 Override。

类使用 extends 继承，接口使用 implements 实现。
在 Java 中，default 方法是 Java 8 引入的一个新特性，主要用于接口（interface）中。它允许在接口中定义带有具体实现的方法，而不仅仅是抽象方法。
一个 interface 可以继承自另一个 interface。interface 继承自 interface 使用 extends，它相当于扩展了接口的方法。
因为 interface 是一个纯抽象类，所以它不能定义实例字段。
但是，interface 是可以有静态字段的，并且静态字段必须为 final 类型。

Inner Class 和普通 Class 相比，除了能引用 Outer 实例外，还有一个额外的“特权”，就是可以修改 Outer Class 的 private 字段，因为 Inner Class 的作用域在 Outer Class 内部，所以能访问 Outer Class 的 private 字段和方法。

### java 核心类
StringBuilder：可变对象，可以预分配缓冲区，这样，往 StringBuilder 中新增字符时，不会创建新的临时对象。

StringJoiner：字符串拼接，需要指定开头和结尾。String 还提供了一个静态方法 join()，这个方法在内部使用了 StringJoiner 来拼接字符串，在不需要指定“开头”和“结尾”的时候，用 String.join() 更方便。

JavaBean：要枚举一个 JavaBean 的所有属性，可以直接使用 Java 核心库提供的 Introspector。

记录类，生成一个不变类，类似int的。
> record Point(int x, int y) {}

### 异常处理
Commons Logging和Log4j这一对好基友，它们一个负责充当日志API，一个负责实现日志底层，搭配使用非常便于开发。

其实SLF4J类似于Commons Logging，也是一个日志接口，而Logback类似于Log4j，是一个日志的实现。

### 反射
JVM 为每个加载的 class 创建了对应的 Class 实例，并在实例中保存了该 class 的所有信息，包括类名、包名、父类、实现的接口、所有方法、字段等，因此，如果获取了某个 Class 实例，我们就可以通过这个 Class 实例获取到该实例对应的 class 的所有信息。

这种通过 Class 实例获取 class 信息的方法称为反射（Reflection）。
Clas s实例在 JVM 中是唯一的，所以获取的 Class 实例是同一个实例。可以用 == 比较两个 Class 实例。

### 注解
注解是一种用作标注的“元数据”。
现在大量的框架使用注解进行功能开发。

### 泛型
泛型就是定义一种模板，
最基础的使用：
> List<String> list = new ArrayList<String>();

编写泛型类时，要特别注意，泛型类型不能用于静态方法。