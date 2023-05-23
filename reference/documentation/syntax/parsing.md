# 解析样式表

Sass 样式表是从一系列 Unicode 代码点中解析出来的。它是直接解析的，无需先转换为令牌流。

## 输入编码

::: details 兼容性: Dart Sass &nbsp; :x: &nbsp; | &nbsp; LibSass &nbsp; :white_check_mark: &nbsp; | &nbsp; Ruby Sass &nbsp;  :white_check_mark:
Dart Sass 目前只支持 UTF-8 编码。因此，将所有 Sass 样式表编码为 UTF-8 是最安全的。
:::

通常情况下，文档最初仅作为字节序列提供，必须将其解码为Unicode。 Sass按如下方式执行此解码：

* 如果字节序列以 U+FEFF [字节顺序标记](https://baike.baidu.com/item/BOM/2790364) 的 UTF-8 或 UTF-16 编码开头，则使用相应的编码。
* 如果字节序列以纯 ASCII 字符串 @charset 开头，Sass 会使用CSS算法的第2步来确定编码，[以确定回退编码](https://drafts.csswg.org/css-syntax-3/#input-byte-stream)。
* 否则，使用UTF-8。

## 解析错误

当Sass在样式表中遇到无效语法时，解析将失败并向用户显示错误，其中包含有关无效语法位置及其无效原因的信息。

请注意，这与 CSS 不同，CSS 规定如何从大多数错误中恢复，而不是立即失败。这是 SCSS 不严格作为 CSS 的超集的少数情况之一。然而，对于 Sass 用户来说，立即看到错误要比将它们传递到 CSS 输出更有用。

可以通过特定于实现的API访问解析错误的位置。例如，在Dart Sass中，您可以访问[SassException.span](https://pub.dartlang.org/documentation/sass/latest/sass/SassException/span.html) ，在 Node Sass 和 Dart Sass 的 JS API 中，您可以访问[file 、 line 和 column](https://github.com/sass/node-sass#error-object)属性。