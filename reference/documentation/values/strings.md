# String

字符串是字符序列（具体来说是 [Unicode 码位](https://en.wikipedia.org/wiki/Code_point)）。Sass 支持两种类型的字符串，它们的内部结构相同但呈现方式不同：[加引号的字符串](#加引号的字符串)，如 "Helvetica Neue"，以及未加引号的字符串的字符串（也称为标识符），如 bold。这些共同涵盖了在 CSS 中出现的不同类型的文本。

::: tip 提示
您可以使用 [string.unquote() 函数](https://sass-lang.com/documentation/modules/string#unquote)将加引号的字符串转换为未加引号的字符串，也可以使用 [string.quote()](https://sass-lang.com/documentation/modules/string#quote) 函数将未加引号的字符串转换为加引号的字符串。

::: code-group
``` scss [scss]
@use "sass:string";

@debug string.unquote(".widget:hover"); // .widget:hover
@debug string.quote(bold); // "bold"
```
``` sass [sass]
@use "sass:string"

@debug string.unquote(".widget:hover")  // .widget:hover
@debug string.quote(bold)  // "bold"
```
:::

## 转义

所有 Sass 字符串都支持标准 CSS [转义码](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string#%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99)：

除了字母 A 到 F 和数字 0 到 9 以外的任何字符（甚至换行符！）都可以通过在其前面加上 \ 的方式作为字符串的一部分。

可以通过在字符前面写上 \，然后写上[十六进制](https://en.wikipedia.org/wiki/Hexadecimal)表示的 [Unicode 码位编号](https://en.wikipedia.org/wiki/List_of_Unicode_characters)，将任何字符包含在字符串中。您可以在码位编号后面选择性地加上一个空格，以指示 Unicode 编号的结束。

::: code-group
``` scss [scss]
@debug "\""; // '"'
@debug \.widget; // \.widget
@debug "\a"; // "\a" (a string containing only a newline)
@debug "line1\a line2"; // "line1\a line2"
@debug "Nat + Liz \1F46D"; // "Nat + Liz 👭"
```
``` sass [sass]
@debug "\""  // '"'
@debug \.widget  // \.widget
@debug "\a"  // "\a" (a string containing only a newline)
@debug "line1\a line2"  // "line1\a line2" (foo and bar are separated by a newline)
@debug "Nat + Liz \1F46D"  // "Nat + Liz 👭"
```
:::

::: tip 提示
对于允许出现在字符串中的字符，编写 Unicode 转义码会产生与直接编写该字符完全相同的字符串。
:::

## 加引号的字符串

加引号的字符串用单引号或双引号括起来，如 "Helvetica Neue"。它们可以包含[插值](../interpolation)，以及除以下字符之外的任何未转义字符：

\，可以用 \ 转义；
' 或 "，取决于用于定义该字符串的符号，可以用 ' 或 " 转义；
换行符，可以用 \a 转义（包括尾随空格）。

加引号的字符串保证编译成与原始 Sass 字符串具有相同内容的 CSS 字符串。确切的格式可能因实现或配置而异 — 包含双引号的字符串可能编译为 """ 或 '"'，非 [ASCII](https://en.wikipedia.org/wiki/ASCII) 字符可能会被转义，也可能不会。但是，在任何符合标准的 CSS 实现中，包括所有浏览器，都应该以相同方式解析。


::: code-group
``` scss [scss]
@debug "Helvetica Neue"; // "Helvetica Neue"
@debug "C:\\Program Files"; // "C:\\Program Files"
@debug "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
@debug "line1\a line2"; // "line1\a line2"

$roboto-variant: "Mono";
@debug "Roboto #{$roboto-variant}"; // "Roboto Mono"
```
``` sass [sass]
@debug "Helvetica Neue"  // "Helvetica Neue"
@debug "C:\\Program Files"  // "C:\\Program Files"
@debug "\"Don't Fear the Reaper\""  // "\"Don't Fear the Reaper\""
@debug "line1\a line2"  // "line1\a line2"

$roboto-variant: "Mono"
@debug "Roboto #{$roboto-variant}"  // "Roboto Mono"
```
:::

::: tip 提示
当加引号的字符串通过插值注入到另一个值中时，[引号会被移除](../interpolation#加引号的字符串)！这使得编写包含选择器的字符串变得简单，例如，可以将其注入到样式规则中，而无需添加引号。
:::

## 未加引号的字符串

未加引号的字符串以 CSS 标识符的形式编写，遵循下面的语法图示。它们可以在任何地方包含插值。

![](https://sass-lang.com/assets/img/illustrations/identifier-diagram-269759f2.svg)

铁路图版权归 2018 年的 W3C（麻省理工学院，欧洲计算机科学联合实验室，庆应义塾大学，北京航空航天大学）所有。此外，W3C 的责任、商标和许可文件规则也适用于这段声明。

::: code-group
``` scss [scss]
@debug bold; // bold
@debug -webkit-flex; // -webkit-flex
@debug --123; // --123

$prefix: ms;
@debug -#{$prefix}-flex; // -ms-flex
```
``` sass [sass]
@debug bold  // bold
@debug -webkit-flex  // -webkit-flex
@debug --123  // --123

$prefix: ms
@debug -#{$prefix}-flex  // -ms-flex
```
:::

::: warning 注意
并非所有标识符都被解析为未加引号的字符串：

* [CSS 颜色名称](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords)被解析为颜色。
null 被解析为 [Sass 的 null 值](./null)。
true 和 false 被解析为[布尔值](./booleans)。
not、and 和 or 被解析为[布尔运算符](../operators/boolean)。

因此，通常建议编写加引号的字符串，除非您特意要编写使用未加引号的字符串的 CSS 属性值。
:::

### 未加引号的字符串中的转义

当解析未加引号的字符串时，转义字符的文字部分会被解析为字符串的一部分。例如，\a 被解析为字符 \，a 和空格。然而，为了确保具有相同 CSS 含义的未加引号的字符串以相同方式解析，这些转义字符会被规范化。对于每个码位，无论它是转义的还是未转义的：

如果它是一个有效的标识符字符，那么它将不带转义地包含在未加引号的字符串中。例如，\1F46D 返回未加引号的字符串 👭。

如果它是除换行符或制表符以外的可打印字符，那么它将在 \ 之后包含。例如，\21 返回未加引号的字符串 !。

否则，包含尾随空格的小写 Unicode 转义字符将被包含。例如，\7Fx 返回未加引号的字符串 \7f x。

## 字符串索引

Sass 具有许多[字符串函数](https://sass-lang.com/documentation/modules/string)，这些函数接受或返回称为索引的数字，这些索引指代字符串中的字符。索引 1 表示字符串的第一个字符。请注意，这与许多编程语言中索引从 0 开始不同！Sass 还可以轻松地引用字符串的末尾。索引 -1 指代字符串中的最后一个字符，-2 指代倒数第二个字符，依此类推。

::: code-group
``` scss [scss]
@use "sass:string";

@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
@debug string.slice("Roboto Mono", -4); // "Mono"
```
``` sass [sass]
@use "sass:string"

@debug string.index("Helvetica Neue", "Helvetica")  // 1
@debug string.index("Helvetica Neue", "Neue")  // 11
@debug string.slice("Roboto Mono", -4)  // "Mono"
```
:::