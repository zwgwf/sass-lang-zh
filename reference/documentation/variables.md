# 变量

Sass变量非常简单：您将一个值赋给一个以$开头的名称，然后您可以引用该名称而不是值本身。尽管它们很简单，但它们是Sass带来的最有用的工具之一。变量可以减少重复，进行复杂的数学计算，配置库等。

通过使用变量，您可以轻松管理和维护样式表中的颜色、字体大小、间距等值。这使得在项目中保持一致性变得容易，并在需要时可以快速地更新样式。此外，变量还有助于提高代码的可读性，使其他开发者更容易理解和维护代码。

变量声明与[属性声明](./style-rules/declarations)非常相似，写法为：`<variable>: <expression>`。与属性不同的是，属性只能在样式规则或at-rule中声明，而变量可以在任何您想要的地方声明。要使用变量，只需将其包含在值中。

::: code-group
``` scss [scss]
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```
``` sass [sass]
$base-color: #c6538c
$border-dark: rgba($base-color, 0.88)

.alert
  border: 1px solid $border-dark
```
``` css [css]
.alert {
  border: 1px solid rgba(198, 83, 140, 0.88);
}
```
:::

::: warning 注意
CSS 也有[它自己的变量](./style-rules/declarations#自定义属性)，它和Sass中的变量是完全不同的。让我们了解一下它们之间的不同：

* Sass变量在编译过程中会被替换为实际值，而CSS变量会包含在输出的CSS中。
* CSS变量可以为不同的元素设置不同的值，但Sass变量在同一时间只能有一个值。
* Sass变量是命令式的，这意味着如果您使用一个变量然后更改其值，之前的使用将保持不变。CSS变量是声明式的，这意味着如果您更改值，它将影响先前的使用和后续的使用。

总之，Sass变量主要用于预处理阶段，帮助我们更轻松地编写和管理样式表，而CSS变量主要用于在浏览器运行时动态更改样式。两者有不同的用途，了解它们之间的区别非常重要。

::: code-group
``` scss [scss]
$variable: value 1;
.rule-1 {
  value: $variable;
}

$variable: value 2;
.rule-2 {
  value: $variable;
}
```
``` sass [sass]
$variable: value 1
.rule-1
  value: $variable


$variable: value 2
.rule-2
  value: $variable
```
``` css [css]
.rule-1 {
  value: value 1;
}

.rule-2 {
  value: value 2;
}
```
:::
:::

::: tip 提示
在Sass中，所有的标识符（包括变量名）都将破折号（-）和下划线（_）视为相同。这意味着，$font-size 和 $font_size 都被视为同一个变量。这个规则源于Sass的早期版本，那时它只允许在标识符名称中使用下划线。然而，为了与CSS的语法相匹配，Sass后来增加了对破折号的支持。为了简化从旧版本到新版本的迁移，Sass决定将破折号和下划线视为等同，这就是现在你看到的规则。
:::

## 默认值

通常情况下，当你为一个变量分配值时，如果这个变量已经有一个值，那么旧值将被覆盖。但是，如果你正在编写一个Sass库，你可能希望在生成CSS之前允许用户配置库的变量。

为了实现这一点，Sass提供了一个!default标志。这个标志仅在变量未定义或其值为null时为变量分配值。否则，将使用现有值。

### 配置模块

当使用[@use规则](./at-rules/use)来加载一个模块时，使用!defualt定义的变量能够被配置。Sass库通常使用!default变量来允许用户配置库的CSS。

要加载带有配置的模块，可以使用`@use <url> with (<variable>: <value>, <variable>: <value>)`语法。配置的值将覆盖变量的默认值。只有在样式表顶层使用!default标志编写的变量才能进行配置。这意味着你可以在加载模块时为这些变量设置自定义值，从而影响模块输出的CSS。

::: code-group
``` scss [scss]
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```
``` sass [sass]
// _library.sass
$black: #000 !default
$border-radius: 0.25rem !default
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default

code
  border-radius: $border-radius
  box-shadow: $box-shadow

// style.sass
@use 'library' with ($black: #222, $border-radius: 0.1rem)
```
``` css [css]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```
:::

## 内置模块

无法修改由内置模块定义的变量。

::: code-group
``` scss [scss]
@use "sass:math" as math;

// 这个设置将会失败
math.$pi: 0;
```
``` sass [sass]
@use "sass:math" as math

// 这个设置将会失败
math.$pi: 0
```
:::

## 作用域

在样式表的顶层声明的变量是全局的，这意味着在声明之后的整个模块中都可以访问它们。但并非所有变量都是全局的。在代码块（SCSS中的花括号或Sass中的缩进代码）中声明的变量通常是局部的，只能在声明它们的代码块内访问。这意味着局部变量的作用范围受到限制，只能在定义它们的特定范围内使用。

::: code-group
``` scss [scss]
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}

.sidebar {
  global: $global-variable;

  // 这将失败，因为 $local-variable不在当前作用域中:
  // local: $local-variable;
}
```
``` sass [sass]
$global-variable: global value

.content
  $local-variable: local value
  global: $global-variable
  local: $local-variable


.sidebar
  global: $global-variable

  // 这将失败，因为 $local-variable不在当前作用域中:
  // local: $local-variable;
```
``` css [css]
.content {
  global: global value;
  local: local value;
}

.sidebar {
  global: global value;
}
```
:::

### 遮蔽

局部变量可以与全局变量具有相同的名称。如果发生这种情况，实际上有两个具有相同名称的不同变量：一个是局部变量，另一个是全局变量。这有助于确保编写局部变量的作者在不知情的情况下，不会意外地更改全局变量的值。这种设计有助于避免变量值的误操作和冲突。

::: code-group
``` scss [scss]
$variable: global value;

.content {
  $variable: local value;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```
``` sass [sass]
$variable: global value

.content
  $variable: local value
  value: $variable


.sidebar
  value: $variable
```
```css [css]
.content {
  value: local value;
}

.sidebar {
  value: global value;
}

```
:::


这段话意味着如果您需要在局部作用域（例如在mixin中）设置全局变量的值，您可以使用!global标志。标记为!global的变量声明将始终分配给全局作用域。简而言之，当你需要在局部范围内修改全局变量时，可以通过在变量声明后加上!global标志来实现这个目的。

::: code-group
``` scss [scss]
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```
``` sass [sass]
$variable: first global value

.content
  $variable: second global value !global
  value: $variable


.sidebar
  value: $variable
```
``` css [css]
.content {
  value: second global value;
}

.sidebar {
  value: second global value;
}

```
:::

::: warning 注意
从DartSass 2.0.0版本开始!global 标志只能用于设置已经在文件顶层声明过的变量。它不能用于声明新的变量。
:::

### 流程控制作用域

在[流程控制规则](./at-rules/control/index)中声明的变量有特殊的作用域规则：它们不会遮蔽与流程控制规则同级别的变量。相反，它们会直接赋值给那些变量。这使得有条件地给变量赋值，或者作为循环的一部分构建值变得更容易。

::: code-group
``` scss [scss]
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```
``` sass [sass]
$dark-theme: true !default
$primary-color: #f8bbd0 !default
$accent-color: #6a1b9a !default

@if $dark-theme
  $primary-color: darken($primary-color, 60%)
  $accent-color: lighten($accent-color, 60%)


.button
  background-color: $primary-color
  border: 1px solid $accent-color
  border-radius: 3px
```
``` css [css]
.button {
  background-color: #750c30;
  border: 1px solid #f5ebfc;
  border-radius: 3px;
}
```
:::

::: warning 注意
在流程控制作用域中的变量可以给外部作用域中已存在的变量赋值，但是在流程控制作用域中声明的新变量在外部作用域中是无法访问的。因此，在给变量赋值之前，请确保变量已经被声明，即使需要将其声明为 null 也没关系。
:::

## 高级变量函数

Sass 核心库提供了一些高级函数来处理变量。[meta.variable-exists() 函数](https://sass-lang.com/documentation/modules/meta#variable-exists)用于检查当前作用域中是否存在给定名称的变量，而[meta.global-variable-exists()](https://sass-lang.com/documentation/modules/meta#global-variable-exists) 函数则用于检查全局作用域中是否存在给定名称的变量。这些函数可以帮助你判断特定变量在当前作用域或全局作用域中是否已经被声明。

::: warning 注意
有时用户希望使用插值来根据另一个变量来定义变量名。但是，Sass不允许这样做，因为这样会使得一眼就能看出哪些变量在哪里被定义变得更加困难。然而，你可以通过定义一个名称到值的映射（[map](./values/maps)）来实现类似的效果，然后可以使用变量来访问这个映射中的值。

::: code-group
``` scss [scss]
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning");
}
```
``` sass [sass]
@use "sass:map"

$theme-colors: ("success": #28a745, "info": #17a2b8, "warning": #ffc107)

.alert
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning")
```
``` css [css]
.alert {
  background-color: #ffc107;
}
```
:::
:::