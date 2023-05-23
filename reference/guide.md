# Sass基础

在你可以使用Sass之前，你需要在你的项目中设置它。如果你只想在这里浏览，尽管继续，但我们建议你首先去安装Sass。如果你想了解如何设置所有东西，[请点击这里](./install)。

## 预处理

CSS本身可以很有趣，但样式表正在变得更大、更复杂、更难维护。这就是预处理器能够提供帮助的地方。Sass具有CSS中尚不存在的特性，如嵌套、混入、继承和其他有助于你编写健壮、可维护CSS的巧妙功能。

一旦你开始使用Sass，它会将你的预处理Sass文件保存为你可以在你的网站中使用的普通CSS文件。

实现这一点的最直接方法是在你的终端中。一旦安装了Sass，你可以使用sass命令将你的Sass编译为CSS。你需要告诉Sass从哪个文件构建，以及将CSS输出到哪里。例如，从你的终端运行`sass input.scss output.css`将会从一个Sass文件--input.scss，编译该文件为output.css。

你还可以使用--watch标志来观察单个文件或目录。watch标志告诉Sass观察你的源文件的变化，并在你每次保存你的Sass时重新编译CSS。如果你想观察（而不是手动构建）你的input.scss文件，你只需在你的命令中添加watch标志，像这样：

```
sass --watch input.scss output.css
```


你可以通过使用文件夹路径作为输入和输出，并用冒号分隔它们，来监视和输出到目录。在这个例子中：

```
sass --watch app/sass:public/stylesheets
```

Sass将监视app/sass文件夹中的所有文件的更改，并将CSS编译到public/stylesheets文件夹中。

::: tip 提示

Sass有两种语法！最常用的是SCSS语法（.scss）。它是CSS的超集，这意味着所有有效的CSS也都是有效的SCSS。缩进语法（.sass）更为不寻常：它使用缩进而不是花括号来嵌套语句，并使用换行符而不是分号来分隔它们。我们的所有示例都适用于这两种语法。
:::

## 变量

将变量视为一种存储你希望在整个样式表中复用的信息的方式。你可以存储诸如颜色，字体堆叠或任何你认为你会想要复用的CSS值。Sass使用$符号来声明变量。这是一个例子：

::: code-group
```scss [scss]
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
```sass [sass]
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

```
```css [css]
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```
:::

Sass被处理时，它会取我们为$font-stack和$primary-color定义的变量，并输出带有我们变量值的普通CSS。在处理品牌颜色并在整个网站中保持其一致性时，这可能非常强大。

## 嵌套

在编写HTML时，你可能已经注意到它有一个明确的嵌套和视觉层次结构。然而，CSS并非如此。

Sass允许你按照与HTML相同的视觉层次结构来嵌套你的CSS选择器。需要注意的是，过度嵌套的规则会导致过于复杂的CSS，这可能难以维护，并且通常被认为是不好的做法。

牢记这一点，下面是一个网站导航的典型样式示例：

::: code-group
```scss [scss]
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
```sass [sass]
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
```
```css [css]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
:::


你会注意到ul，li和a选择器都嵌套在nav选择器内部。这是组织CSS并使其更易读的好方法。

## 局部文件

你可以创建局部Sass文件，其中包含可以包含在其他Sass文件中的小段CSS。这是模块化你的CSS并帮助保持易于维护性的好方法。局部文件是以下划线开头命名的Sass文件。你可能会给它命名为 _partial.scss。下划线让Sass知道该文件只是局部文件，不应生成为CSS文件。Sass局部文件是配合@use规则使用的。

## 模块化

::: details 兼容性: Dart Sass 从 1.23.0 &nbsp; 开始 &nbsp; | &nbsp; LibSass &nbsp; :x: &nbsp; | &nbsp; Ruby Sass &nbsp;  :x:
目前只有Dart Sass支持@use。其他实现的用户必须使用[@import规则](./documentation/at-rules/import)。
:::

你不需要将所有 Sass 写在一个文件中。你可以使用 @use 规则根据需要划分。这个规则将另一个 Sass 文件作为模块加载，这意味着你可以在你的 Sass 文件中通过基于文件名的命名空间来引用它的变量、混入和函数。使用一个文件也会在你的编译输出中包含它生成的 CSS！

::: code-group
```scss [scss]
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```
```sass [sass]
// _base.sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

// styles.sass
@use 'base'

.inverse
  background-color: base.$primary-color
  color: white
```
```css [css]
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}

```
:::


注意我们在 styles.scss 文件中使用了 @use 'base'; 。当你使用一个文件时，你不需要包含文件扩展名。Sass 很聪明，它会为你解决这个问题。

## 混入

在CSS中，有些东西编写起来有点繁琐，尤其是在CSS3和许多供应商前缀的存在下。混入（Mixin）允许你创建可在整个网站中重用的CSS声明组。这有助于让你的Sass保持非常的DRY（Don't Repeat Yourself，不要重复自己）。你甚至可以传入值以使你的混入更加灵活。这里有一个关于主题的例子。

::: code-group
```scss [scss]
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```
```sass [sass]
@mixin theme($theme: DarkGray)
  background: $theme
  box-shadow: 0 0 1px rgba($theme, .25)
  color: #fff


.info
  @include theme

.alert
  @include theme($theme: DarkRed)

.success
  @include theme($theme: DarkGreen)
```
```css [css]
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```
:::


要创建混入（mixin），你可以使用@mixin指令并给它一个名字。我们将我们的混入命名为theme。我们也在括号内使用变量$theme，这样我们可以传入任何我们想要的主题。创建混入后，你可以像使用CSS声明那样使用它，以@include开始，然后是混入的名字。

## 扩展/继承

@extend指令允许你在多个选择器之间共享一组CSS属性。在我们的例子中，我们将使用另一个与extend配套使用的特性，即占位符类，来创建一系列用于错误、警告和成功的消息。占位符类是一种特殊的类，它只在被扩展时输出，这可以帮助保持你的编译CSS的整洁。

::: code-group
```scss [scss]
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
```sass [sass]
/* This CSS will print because %message-shared is extended. */
%message-shared
  border: 1px solid #ccc
  padding: 10px
  color: #333


// This CSS won't print because %equal-heights is never extended.
%equal-heights
  display: flex
  flex-wrap: wrap


.message
  @extend %message-shared


.success
  @extend %message-shared
  border-color: green


.error
  @extend %message-shared
  border-color: red


.warning
  @extend %message-shared
  border-color: yellow
```
```css [css]
/* This CSS will print because %message-shared is extended. */
.message, .success, .error, .warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```
:::

上述代码让.message，.success，.error和.warning的行为与%message-shared相同。这意味着无论%message-shared出现在哪里，.message，.success，.error和.warning也会出现。魔法发生在生成的CSS中，其中每一个类都会获得与%message-shared相同的CSS属性。这可以帮助你避免在HTML元素上写多个类名。

你可以使用@extend指令来继承大多数简单的CSS选择器的属性，这包括Sass特有的占位符类（用%定义的类）。然而，使用占位符类是一种更安全的方式，因为它确保你不会去继承在你的样式表中其他地方嵌套的类。如果你尝试去继承一个嵌套的类，可能会在生成的CSS中创建出意料之外的选择器，这可能不是你所预期的结果。

注意，因为%equal-heights从未被扩展，所以%equal-heights中的CSS没有被生成。

## 运算符

在CSS中进行数学运算非常有帮助。Sass具有一些标准的数学运算符，如 +、-、*、math.div() 和 %。在我们的示例中，我们将进行一些简单的数学运算，以计算文章和侧边栏的宽度。

::: code-group
```scss [scss]
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```
```sass [sass]
@use "sass:math"

.container
  display: flex

article[role="main"]
  width: math.div(600px, 960px) * 100%

aside[role="complementary"]
  width: math.div(300px, 960px) * 100%
  margin-left: auto
```
```css [css]
.container {
  display: flex;
}

article[role="main"] {
  width: 62.5%;
}

aside[role="complementary"] {
  width: 31.25%;
  margin-left: auto;
}

```
:::


我们创建了一个非常简单的基于960px的流体网格。Sass中的操作让我们能够轻松地将像素值转换为百分比。