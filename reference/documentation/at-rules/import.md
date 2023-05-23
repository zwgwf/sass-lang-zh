# @import

Sass 扩展了 CSS 的 [@import 规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import)，使其能够导入 Sass 和 CSS 样式表，提供对 [混入](./mixin)、[函数](./function) 和 [变量](../variables) 的访问，并将多个样式表的 CSS 合并在一起。与纯 CSS 导入不同，它们需要浏览器在渲染页面时发出多个 HTTP 请求，而 Sass 导入在编译过程中就已经完全处理好了。

Sass 导入与 CSS 导入具有相同的语法，只是它们允许多个导入用逗号分隔，而不是要求每个导入都有自己的 @import。此外，在[缩进语法](../syntax/index#缩进语法)中，导入的 URL 不需要引号。

::: warning 注意
Sass 团队不鼓励继续使用 @import 规则。Sass 将在未来几年[逐步淘汰它](https://github.com/sass/sass/blob/main/accepted/module-system.md#timeline)，并最终从语言中完全删除它。建议使用 [@use 规则](./use)代替。 （请注意，目前只有 Dart Sass 支持 @use。其他实现的用户必须使用 @import 规则代替。）

@import有什么问题？

@import 规则存在的一些严重问题：

* @import 使所有变量、mixin 和函数全局可访问，这使得人们（或工具）很难知道任何东西是在哪里定义的。
* 由于所有内容都是全局的，库必须为所有成员添加前缀以避免命名冲突。
* [@extend 规则](./extend)也是全局的，这使得预测哪些样式规则会被扩展变得困难。
* 每次执行 @import 时，都会执行样式表并输出其 CSS，这增加了编译时间并产生了臃肿的输出。
* 没有办法定义对下游样式表不可访问的私有成员或占位符选择器。

新的模块系统和 @use 规则解决了所有这些问题。

如何迁移？

Sass 团队已经编写了一个[迁移工具](https://sass-lang.com/documentation/cli/migrator)，该工具可以自动将大多数基于 @import 的代码快速转换为基于 @use 的代码。只需将它指向您的入口点并运行即可。
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
@import 'foundation/code', 'foundation/lists';
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
@import foundation/code, foundation/lists
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

当 Sass 导入一个文件时，该文件的内容将被视为直接出现在 @import 的位置。来自导入文件的任何 mixin、函数和变量都将变得可用，而且所有的 CSS 都会被包含在 @import 编写的确切位置。
而且在 @import 之前定义的任何 mixin、函数或变量（包括来自其他 @import 的内容）都可以在导入的样式表中使用。

::: warning 注意

如果同一个样式表被导入多次，它将每次都被重新编译。如果它只定义函数和 mixin，这通常不是什么大问题，但如果它包含样式规则，它们将被编译成多个重复的 CSS。

::: code-group

``` scss [scss]
// foundation/_code.sass
$color: #ddd;
$margin: 10px;
code {
  margin: $margin;
}

// style.sass
@import 'foundation/code', 'foundation/code', 'foundation/code';

```
``` sass [sass]
// foundation/_code.sass
$color: #ddd
$margin: 10px
code
  margin: $margin

// style.sass
@import foundation/code, foundation/code, foundation/code
```
``` css [css]
code {
  margin: 10px;
}

code {
  margin: 10px;
}

code {
  margin: 10px;
}

```

:::

## 查找文件

在查找要导入的文件时，Sass 使用了一个简化的算法，使得用户无需为每个要导入的样式表编写绝对 URL。首先，您不必明确写出要导入的文件的扩展名；例如 @import "variables" 将自动加载 variables.scss、variables.sass 或 variables.css。

::: warning 注意
为确保样式表在每个操作系统上都能正常工作，Sass 按 URL 而不是文件路径来导入文件。这意味着您需要使用正斜杠（/），而不是反斜杠（\），即使在 Windows 上也是如此。
:::

### 加载路径

所有 Sass 实现都允许用户提供加载路径，这些路径位于文件系统中，Sass 在解析导入时会在这些路径中查找。例如，如果您将 node_modules/susy/sass 作为加载路径，您可以使用 @import "susy" 加载 node_modules/susy/sass/susy.scss 文件。

导入始终首先相对于当前文件解析。只有在没有与导入匹配的相对文件存在时，才会使用加载路径。这确保了在添加新库时不会意外地破坏相对导入。

::: tip 提示
与其他一些语言不同，Sass 不要求您在相对导入时使用 ./。相对导入始终是可用的。
:::

### 局部文件

作为一种约定，仅用于导入的 Sass 文件（而不是单独编译的文件）以 _ 开头（如 _code.scss）。这些被称为局部文件，它们告诉 Sass 工具不要尝试单独编译这些文件。在导入部分文件时，可以省略 _。

### 索引文件

如果在文件夹中编写了 _index.scss 或 _index.sass，当导入该文件夹本身时，将在其位置加载该文件。

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
@import 'code', 'lists';
// style.scss
@import 'foundation';
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
@import code, lists
// style.sass
@import foundation
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

### 自定义导入器

所有 Sass 实现都提供了定义自定义导入器的方法，这些导入器控制如何通过 @import 定位样式表。不同 Sass 实现提供了不同的自定义导入器接口和方法。

* 在 npm 上的 Node Sass 和 Dart Sass 提供了一个作为其 JavaScript API 一部分的 importer 选项。
* 在 pub 上的 Dart Sass 提供了一个抽象的 Importer 类，可以通过自定义导入器来扩展它。
* Ruby Sass 提供了一个抽象的 Importers::Base 类，可以通过自定义导入器来扩展它。

## 嵌套

导入通常写在样式表的顶层，但它们也可以嵌套在样式规则或普通的 CSS at-rules 中。这种情况下，导入的 CSS 会嵌套在当前上下文中，使得嵌套导入在为特定元素或媒体查询限定一组 CSS 样式时非常有用。需要注意的是，嵌套导入中定义的顶层 mixins，函数和变量仍然是全局的。

::: tip 提示
嵌套导入非常适合将第三方样式表限定在特定范围内。但是，如果你是导入样式表的作者，通常最好将样式编写在一个 mixin 中，并将该 mixin 包含在嵌套上下文中。这样一来，mixin 可以以更灵活的方式使用，而且在查看导入的样式表时，它如何使用会更清晰。
:::

::: warning 注意
嵌套导入中的 CSS 会像 mixin 一样进行计算，这意味着任何[父选择器](../style-rules/parent-selector)都将引用包含样式表的选择器。

::: code-group
``` scss [scss]
// _theme.scss
ul li {
  $padding: 16px;
  padding-left: $padding;
  [dir=rtl] & {
    padding: {
      left: 0;
      right: $padding;
    }
  }
}
// style.scss
.theme-sample {
  @import "theme";
}
```
``` sass [sass]
// _theme.sass
ul li
  $padding: 16px
  padding-left: $padding
  [dir=rtl] &
    padding:
      left: 0
      right: $padding



// style.sass
.theme-sample
  @import theme
```
``` css [css]
.theme-sample ul li {
  padding-left: 16px;
}
[dir=rtl] .theme-sample ul li {
  padding-left: 0;
  padding-right: 16px;
}
```
:::

## 导入CSS

 Sass 除了可以导入 .sass 和 .scss 文件之外，还可以导入普通的 .css 文件。唯一的要求是导入时不能显式包含 .css 扩展名，因为这用于表示[纯 CSS 的 @import](./import#普通-css-imports)。

 ::: code-group
``` scss [scss]
// code.css
code {
  padding: .25em;
  line-height: 0;
}
// style.scss
@import 'code';
```
``` sass [sass]
// code.css
code
  padding: .25em
  line-height: 0

// style.sass
@import code
```
``` css [css]
code {
  padding: .25em;
  line-height: 0;
}
```
:::

当使用 Sass 导入一个 CSS 文件时，Sass 不会将其视为一个包含特殊 Sass 功能的文件。这意味着在这个 CSS 文件中，您只能使用标准的 CSS 语法。为了确保开发者不会在这些导入的 CSS 文件中意外地使用 Sass 语法，Sass 将对非 CSS 语法进行检查。如果在导入的 CSS 文件中发现了特殊的 Sass 语法，Sass 将产生错误。如果导入的 CSS 文件中没有使用任何特殊的 Sass 语法，那么这些 CSS 规则将原样保留，并可以在其他 Sass 文件中被[扩展](./extend)。这意味着您可以将导入的 CSS 规则与其他 Sass 规则组合在一起。

## 普通 CSS @imports

因为@import最开始就是CSS中的指令，Sass是扩展了它的功能。所以Sass 需要一种方法来编译普通的 CSS @import 规则，而不是在编译时尝试导入这些文件。这是为了确保 SCSS 尽可能地成为 CSS 的超集。如果碰到了下面的几种情况，Sass会将@import编译为普通 CSS 规则。

* URL 以 .css 结尾的导入。
* URL 以 http:// 或 https:// 开头的导入。
* 以 url() 形式编写的 URL 导入。
* 具有媒体查询的导入。

::: code-group
``` scss [scss]
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```
``` sass [sass]
@import "theme.css"
@import "http://fonts.googleapis.com/css?family=Droid+Sans"
@import url(theme)
@import "landscape" screen and (orientation: landscape)
```
``` css [css]
@import url(theme.css);
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```
:::

### 插值

虽然 Sass 导入不能使用[插值](../interpolation)（以确保总是可以分辨出[混入](./mixin) 、[函数](./function)和[变量](../variables)的来源），但普通的 CSS 导入可以使用。这使得动态生成导入成为可能，例如基于 mixin 参数。

::: code-group
``` scss [scss]
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Droid Sans");
```
``` sass [sass]
@mixin google-font($family)
  @import url("http://fonts.googleapis.com/css?family=#{$family}")


@include google-font("Droid Sans")
```
``` css [css]
@import url("http://fonts.googleapis.com/css?family=Droid Sans");
```
:::

## 导入和模块

Sass 的[模块系统](./use)与 @import 规则相互兼容，无论是导入包含 @use 规则的文件，还是将包含 @import 规则的文件作为模块加载。目的是让用户尽可能顺畅地从 @import 规则过渡到 @use 规则。

### 导入模块系统文件

当你导入一个包含 @use 规则的文件时，导入文件可以访问该文件中直接定义的所有成员（即使是私有成员），但不能访问该文件所加载模块中的成员。然而，如果该文件包含 [@forward 规则](./forward)，那么导入文件将可以访问被转发（forwarded）的成员。这意味着你可以导入一个为模块系统编写的库。

::: warning 注意
当一个文件中包含 @use 规则时，所有通过这些规则加载的 CSS 都会包含在生成的样式表中，即使它已经通过另一个导入包含在其中。如果不小心处理，这可能导致生成的 CSS 文件过大。
:::

#### 仅导入文件

对 @use 有意义的 API 可能对 @import 没有意义。例如，默认情况下， @use 会向所有成员添加一个命名空间，以便可以安全地使用短名称，但 @import 不会，因此可能需要更长的名称。对于库作者来说，当他们将库升级为使用新的模块系统时，可能担心现有基于 @import 的用户会遇到问题。为了解决这个问题，Sass 支持仅导入文件（import-only files）。如果将文件命名为 `<name>.import.scss`，它将仅用于 @import 规则，而不是 @use 规则。这样，您可以在为新模块系统的用户提供友好的 API 的同时，保持与 @import 用户的兼容性。

::: code-group
``` scss [scss]
// _reset.scss

// Module system users write `@include reset.list()`.
@mixin list() {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
// _reset.import.scss

// Legacy import users can keep writing `@include reset-list()`.
@forward "reset" as reset-*;
```
``` sass [sass]
// _reset.sass

// Module system users write `@include reset.list()`.
@mixin list()
  ul
    margin: 0
    padding: 0
    list-style: none


// _reset.import.sass

// Legacy import users can keep writing `@include reset-list()`.
@forward "reset" as reset-*
```
``` css [css]
```
:::

#### 通过导入配置模块

您可以在首次加载模块的 @import 之前定义全局变量来[配置](./use#配置)通过 @import 加载的模块。

::: code-group
``` scss [scss]
// _library.scss
$color: blue !default;

a {
  color: $color;
}
// _library.import.scss
@forward 'library' as lib-*;
// style.sass
$lib-color: green;
@import "library";
```
``` sass [sass]
$color: blue !default

a
  color: $color


// _library.import.sass
@forward 'library' as lib-*
// style.sass
$lib-color: green
@import "library"
```
``` css [css]
a {
  color: green;
}
```
:::

::: warning 注意
模块只加载一次，因此，如果在首次导入模块之后更改配置（即使间接地），再次导入模块时将忽略该更改。
:::

### 加载包含导入的模块

当您使用 @use（或 @forward）加载包含 @import 的模块时，该模块将包含您加载的样式表中定义的所有公共成员以及该样式表传递地导入的所有内容。换句话说，导入的所有内容都被视为是在一个大型样式表中编写的。

这使得在依赖的库都转换为新模块系统之前，就可以轻松地在样式表中开始使用 @use 规则。但请注意，如果库升级，他们的 API 可能会发生变化。
