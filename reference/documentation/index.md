# 文档

Sass是一种编译为CSS的样式表语言。它允许你使用[变量](./variables)、[嵌套规则](./style-rules/#嵌套)、[混入](./at-rules/mixin)、[函数](https://sass-lang.com/documentation/modules)等，所有这些都具有完全兼容CSS的语法。Sass有助于保持大型样式表的良好组织，并且使在项目内部和跨项目分享设计变得容易。

如果你在寻找Sass的入门教程，可以查看[教程](../guide)。

如果你想查找内置的Sass函数，不妨参考[内置模块](https://sass-lang.com/documentation/modules)。

如果你正在从JavaScript中调用Sass，你可能需要[JS API文档](https://github.com/sass/node-sass#usage)。

或者如果你正在从Dart中调用它，你可能需要[Dart API文档](https://pub.dartlang.org/documentation/sass/latest/sass/sass-library.html)。

否则，使用语言参考的目录！

## 较旧版本

这个文档是为Sass语言的最新版本编写的。如果你正在使用[Dart Sass](../dart-sass) 1.62.1，你将可以使用这里描述的所有功能。但是，如果你正在使用Dart Sass的旧版本，或者像LibSass或Ruby Sass这样的已弃用的Sass实现，那么可能存在一些行为差异。

在版本或实现之间的行为存在差异的任何地方，文档都包括一个兼容性指示器，如下所示：

兼容性（特性名称）：Dart Sass :white_check_mark: &nbsp; | LibSass 自3.6.0起 &nbsp; | Ruby Sass :x:

标有:white_check_mark:的实现完全支持相关特性，标有:x:的实现完全不支持。带有版本号的实现从那个版本开始支持相关特性。实现也可以被标记为“部分”：

::: details 兼容性：Dart Sass :white_check_mark: &nbsp; | LibSass 部分 &nbsp; | Ruby Sass :x:
额外的详细信息在这
:::

这表明实现只支持该特性的某些方面。这些兼容性指示器（以及其他许多指示器）有一个“▶”按钮，可以点击以显示更多关于实现如何不同以及哪些版本支持相关特性的各个方面的详细信息。