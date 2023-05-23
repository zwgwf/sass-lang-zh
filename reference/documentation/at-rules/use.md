# @use

@use 规则从其他 Sass 样式表加载 [mixins](./mixin)、[函数](./function)和[变量](../variables)，并将多个样式表的 CSS 合并在一起。通过 @use 加载的样式表被称为“模块”。Sass 还提供了[内置模块](https://sass-lang.com/documentation/modules)，其中包含许多有用的函数。

最简单的 @use 规则写作 `@use "<url>"`，它会加载给定 URL 的模块。以这种方式加载的样式将在编译后的 CSS 输出中只出现一次，无论加载这些样式的次数如何。

::: warning 注意
样式表的 @use 规则必须在除了 @forward 之外的任何其他规则之前，包括[样式规则](../style-rules/index)。然而，在 @use 规则之前，您可以声明变量以在[配置模块](./use#配置)时使用。
:::

::: code-group
``` scss [scss]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// style.scss
@use 'foundation/code';
@use 'foundation/lists';
```
``` sass [sass]
// foundation/_code.sass
code
  padding: .25em
  line-height: 0

// foundation/_lists.sass
ul, ol
  text-align: left

  & &
    padding:
      bottom: 0
      left: 0

// style.sass
@use 'foundation/code'
@use 'foundation/lists'
```
``` css [css]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}

```
:::

## 加载成员

您可以通过编写 `<namespace>.<variable>、<namespace>.<function>()` 或 `@include <namespace>.<mixin>()` 来访问另一个模块中的变量、函数和 mixins。默认情况下，命名空间就是模块 URL 的最后一个组成部分。

使用 @use 加载的成员（变量、函数和 mixins）仅在加载它们的样式表中可见。其他样式表需要编写自己的 @use 规则，如果它们也希望访问这些成员。这有助于轻松确定每个成员的来源。如果您想要一次从多个文件加载成员，可以使用 [@forward 规则](./forward)将它们全部从一个共享文件转发。

::: tip 提示
由于 @use 会为成员名称添加命名空间，因此在编写样式表时可以安全地选择非常简单的名称，如 $radius 或 $width。这与旧的 @import 规则不同，它鼓励用户编写类似于 $mat-corner-radius 的长名称，以避免与其他库发生冲突，同时有助于保持样式表清晰且易于阅读！
:::

::: code-group
``` scss [scss]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```
``` sass [sass]
// src/_corners.sass
$radius: 3px

@mixin rounded
  border-radius: $radius

// style.sass
@use "src/corners"

.button
  @include corners.rounded
  padding: 5px + corners.$radius
```
``` css [css]
.button {
  border-radius: 3px;
  padding: 8px;
}
```
:::

### 选择命名空间

默认情况下，模块的命名空间仅为其 URL 的最后一个组成部分，不包括文件扩展名。然而，有时您可能希望选择一个不同的命名空间——您可能希望为经常引用的模块使用更短的名称，或者可能正在加载具有相同文件名的多个模块。您可以通过编写 `@use "<url>" as <namespace>` 来实现这一点。

::: code-group
``` scss [scss]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}

```
``` sass [sass]
// src/_corners.sass
$radius: 3px

@mixin rounded
  border-radius: $radius

// style.sass
@use "src/corners" as c

.button
  @include c.rounded
  padding: 5px + c.$radius
```
``` css [css]
.button {
  border-radius: 3px;
  padding: 8px;
}
```
:::

您甚至可以通过编写 `@use "<url>" as *` 来加载没有命名空间的模块。不过，我们建议您只为自己编写的样式表这样做；否则，它们可能会引入新的成员，导致名称冲突！

::: code-group
``` scss [scss]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```
``` sass [sass]
// src/_corners.sass
$radius: 3px

@mixin rounded
  border-radius: $radius

// style.sass
@use "src/corners" as *

.button
  @include rounded
  padding: 5px + $radius
```
``` css [css]
.button {
  border-radius: 3px;
  padding: 8px;
}
```
:::

### 私有会员

作为样式表的作者，你可能不希望你定义的所有成员都在你的样式表之外可用。Sass 通过以 - 或 _ 开头来轻松定义私有成员。这些成员在定义它们的样式表中的工作方式与正常成员相同，但它们不会成为模块公共 API 的一部分。这意味着加载你的模块的样式表无法看到它们！

::: tip 提示
如果你想让一个成员在整个软件包中保持私有，而不仅仅是在单个模块中，只需不从软件包的任何入口点（你告诉用户加载以使用你的软件包的样式表）[转发其模块](./forward)。你甚至可以在转发其余模块的同时[隐藏该成员](./forward#控制可见性)！
:::

::: code-group
``` scss [scss]
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;

  // 这是错误的! $-radius 在`_corners.scss`模块外部不可见。
  padding: 5px + corners.$-radius;
}
```
``` sass [sass]
// src/_corners.sass
$-radius: 3px

@mixin rounded
  border-radius: $-radius

// style.sass
@use "src/corners"

.button
  @include corners.rounded

  // 这是错误的! $-radius 在`_corners.scss`模块外部不可见。
  padding: 5px + corners.$-radius

```
:::

## 配置

样式表可以使用 !default 标志定义变量，以使它们可配置。要加载带有配置的模块，编写  `@use <url> with (<variable>: <value>, <variable>: <value>)`。配置的值将覆盖变量的默认值。

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

### 与mixins结合

使用 @use ... with 配置模块非常方便，特别是在使用最初为与 [@import 规则](./import)一起使用而编写的库时。但它并不特别灵活，我们不建议将其用于更高级的用例。如果你发现自己想要一次配置许多变量，传递[映射](../values/maps)作为配置，或在加载模块后更新配置，请考虑编写一个 mixin 来设置变量，然后编写另一个 mixin 来注入你的样式。

::: code-group
``` scss [scss]
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

/// If the user has configured `$-box-shadow`, returns their configured value.
/// Otherwise returns a value derived from `$-black`.
@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}

// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```
``` sass [sass]
// _library.sass
$-black: #000
$-border-radius: 0.25rem
$-box-shadow: null

/// If the user has configured `$-box-shadow`, returns their configured value.
/// Otherwise returns a value derived from `$-black`.
@function -box-shadow()
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15))


@mixin configure($black: null, $border-radius: null, $box-shadow: null)
  @if $black
    $-black: $black !global
  @if $border-radius
    $-border-radius: $border-radius !global
  @if $box-shadow
    $-box-shadow: $box-shadow !global


@mixin styles
  code
    border-radius: $-border-radius
    box-shadow: -box-shadow()

// style.sass
@use 'library'
@include library.configure($black: #222, $border-radius: 0.1rem)
@include library.styles
```
``` css [css]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```
:::

### 重新分配变量

加载模块后，你可以重新分配其变量。

::: code-group
``` scss [scss]
// _library.scss
$color: red;

// _override.scss
@use 'library';
library.$color: blue;

// style.scss
@use 'library';
@use 'override';
@debug library.$color;  //=> blue
```
``` sass [sass]
// _library.sass
$color: red

// _override.sass
@use 'library'
library.$color: blue

// style.sass
@use 'library'
@use 'override'
@debug library.$color  //=> blue
```
:::

即使你使用 as * 导入没有命名空间的模块，这也是有效的。分配给该模块中定义的变量名将覆盖该模块中的值。

::: warning 注意
内置模块变量（如 math.$pi）不能被重新分配。
:::

## 查找模块

为每个加载的样式表编写绝对 URL 并不有趣，因此 Sass 的查找模块算法使其变得更容易。首先，你不必明确地写出要加载的文件的扩展名；@use "variables" 将自动加载 variables.scss、variables.sass 或 variables.css。

::: warning 注意
为了确保样式表在每个操作系统上都能正常工作，Sass 通过 URL 而非文件路径来加载文件。这意味着你需要使用正斜杠，而不是反斜杠，即使在 Windows 上也是如此。
:::

### 加载路径

所有 Sass 实现都允许用户提供加载路径：Sass 在定位模块时将查看文件系统上的路径。例如，如果你将 node_modules/susy/sass 作为加载路径，你可以使用 @use "susy" 来加载 node_modules/susy/sass/susy.scss。

然而，模块总是首先相对于当前文件加载的。只有当没有与模块 URL 匹配的相对文件存在时，才会使用加载路径。这确保你在添加新库时不会意外地破坏你的相对导入。

::: tip 提示
与一些其他语言不同，Sass 不要求你使用 ./ 进行相对导入。相对导入始终是可用的。
:::

### 局部文件

作为一种惯例，仅作为模块加载而不是自行编译的 Sass 文件以 _ 开头（如 _code.scss）。这些被称为局部文件，它们告诉 Sass 工具不要尝试自行编译这些文件。在导入部分文件时，你可以省略 _。


### 索引文件

如果你在文件夹中编写了 _index.scss 或 _index.sass，当你加载该文件夹的 URL 时，索引文件将自动加载。

::: code-group
``` scss [scss]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// foundation/_index.scss
@use 'code';
@use 'lists';

// style.scss
@use 'foundation';
```
``` sass [sass]
// foundation/_code.sass
code
  padding: .25em
  line-height: 0

// foundation/_lists.sass
ul, ol
  text-align: left

  & &
    padding:
      bottom: 0
      left: 0

// foundation/_index.sass
@use 'code'
@use 'lists'

// style.sass
@use 'foundation'
```
``` css [css]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```
:::

## 加载CSS

除了加载 .sass 和 .scss 文件外，Sass 还可以加载普通的旧 .css 文件。

::: code-group
``` scss [scss]
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@use 'code';
```
``` sass [sass]
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// code.css
code {
  padding: .25em;
  line-height: 0;
}
```
``` css [css]
// code.css
code {
  padding: .25em;
  line-height: 0;
}
```
:::

作为模块加载的 CSS 文件不允许任何特殊的 Sass 功能，因此不能暴露任何 Sass 变量、函数或混入。为了确保作者不会在他们的 CSS 中意外写入 Sass，所有不是有效 CSS 的 Sass 功能都会产生错误。否则，CSS 将按原样渲染。它甚至可以[被扩展](./extend)！

## 与 @import 的区别

@use 规则旨在替换旧的 [@import 规则](./import)，但它被有意设计为以不同的方式工作。以下是两者之间的一些主要区别：

* @use 只在当前文件的范围内使变量、函数和混入可用。它从不将它们添加到全局范围。这使得很容易找出你的 Sass 文件引用的每个名称来自哪里，并意味着你可以使用更短的名称，而无需冲突的风险。
* @use 只加载每个文件一次。这确保你不会无意中多次复制你的依赖项的 CSS。
* @use 必须出现在你的文件的开始，并且不能嵌套在样式规则中。
* 每个 @use 规则只能有一个 URL。
* @use 需要在其 URL 周围加上引号，即使在使用缩进语法时也是如此。

