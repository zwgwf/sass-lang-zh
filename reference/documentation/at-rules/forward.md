# @forward

@forward 规则能够加载一个 Sass 样式表，并在你的样式表通过 @use 规则加载时，使其[混入](./mixin)，[函数](./function)和[变量](../variables)可用。这一特性使得你能在多个文件中组织 Sass 库，而只需要用户加载一个入口文件。

`@forward` 规则的语法是 `@forward "<url>"`。它会像 `@use` 规则一样，加载指定 URL 的模块。不过，不同的是，它会让加载的模块的公共成员对你的模块的用户可用，就好像它们是直接在你的模块中定义的一样。但这些成员在你的模块中实际上并不可用——如果你想让它们可用，你需要额外写一个 `@use` 规则。但别担心，它只会加载一次模块！

如果你在同一文件中对同一模块写了 `@forward` 和 `@use` 规则，最好先写 `@forward` 规则。因为库的使用者对[转发模块所做的配置](./use#配置)将在你自己的`@use规则`加载模块之前生效。这样，在你使用`@use规则`加载模块时，模块将自动应用库使用者的配置，无需再手动配置。如果不按照这个顺序，可能会导致配置不正确地应用或被忽略。

::: tip 提示
在处理模块的 CSS 方面，`@forward` 规则的行为就像 `@use` 规则。来自被转发模块的样式会被包含在编译后的 CSS 输出中，即使它并没有被 @use，拥有 `@forward` 的模块也可以扩展它。
:::



::: code-group
``` scss [scss]
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss 
@forward "src/list";

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```
``` sass [sass]
// src/_list.sass
@mixin list-reset
  margin: 0
  padding: 0
  list-style: none

// bootstrap.sass
@forward "src/list"

// styles.sass
@use "bootstrap"

li
  @include bootstrap.list-reset

```
``` css [css]
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
:::

## 添加前缀

因为模块成员通常会和命名空间一起使用，所以简短且简单的名称通常是最易读的选择。然而，这些名称在它们所定义的模块之外可能没有意义，所以 @forward 规则提供了为所有转发的成员添加额外前缀的选项。

这可以通过编写 `@forward "<url>" as <prefix>-*` 来实现，它会将给定的前缀添加到模块转发的每个 mixin、function 和 variable 名称的开头。例如，如果模块定义了一个名为 reset 的成员，并以 list-* 的形式进行转发，那么下游的样式表将会以 list-reset 的形式引用它。

::: code-group
``` scss [scss]
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list" as list-*;

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```
``` sass [sass]
// src/_list.sass
@mixin reset
  margin: 0
  padding: 0
  list-style: none

// bootstrap.sass
@forward "src/list" as list-*

// styles.sass
@use "bootstrap"

li
  @include bootstrap.list-reset
```
``` css [css]
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
:::

## 控制可见性

有时候你可能不想转发一个模块中的所有成员。你可能想将一些成员保持为私有，以便只有你的包可以使用它们，或者你可能希望要求用户以不同的方式加载一些成员。你可以通过编写 `@forward "<url>" hide <members...>` 或 `@forward "<url>" show <members...>` 来精确控制哪些成员被转发。

hide 形式意味着列出的成员不应被转发，但其他所有成员应被转发。show 形式意味着只有列出的成员应该被转发。在这两种形式中，你需要列出 mixins、functions 或 variables 的名称（包括 $ 符号）。

::: code-group
``` scss [scss]
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include list-reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}

// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;

// 此时如果通过@use 引入bootstrap.scss 模块，将访问不到那两个成员
```
``` sass [sass]
// src/_list.sass
$horizontal-list-gap: 2em

@mixin list-reset
  margin: 0
  padding: 0
  list-style: none


@mixin list-horizontal
  @include list-rest

  li
    display: inline-block
    margin:
      left: -2px
      right: $horizontal-list-gap

// bootstrap.sass
@forward "src/list" hide list-reset, $horizontal-list-gap

// 此时如果通过@use 引入bootstrap.scss 模块，将访问不到那两个成员
```
``` css [css]
```
:::

## 配置模块

@forward 规则还可以用[配置](./use#配置)加载一个模块。这在很大程度上与 @use 的工作方式相同，但有一个额外的功能：@forward 规则的配置可以在其配置中使用 !default 标志。这允许一个模块在更改上游样式表的默认值的同时，仍然允许下游样式表覆盖它们。

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
// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);
// style.scss
@use 'opinionated' with ($black: #333);
```
``` sass [sass]
// _library.sass
$black: #000 !default
$border-radius: 0.25rem !default
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default

code
  border-radius: $border-radius
  box-shadow: $box-shadow

// _opinionated.sass
@forward 'library' with ($black: #222 !default, $border-radius: 0.1rem !default)



// style.sass
@use 'opinionated' with ($black: #333)
```
``` css [css]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(51, 51, 51, 0.15);
}
```
:::

## 解释说明（自己加的）

对一些比较模糊的知识点做进一步的解释
### 为什么要用@forward转发，直接用@use引入那些混入、函数、变量不行吗？


确实，在某些情况下，@use 规则可以实现与 @forward 类似的功能。然而，这两者之间仍然存在一些关键区别，这使得在某些场景下 @forward 更适合用于封装和组织代码库。

在单个模块内部，@use 规则确实可以实现导入和访问其他模块的功能。但是，当我们谈论将多个模块组合成一个易于使用的库时，@forward 提供了一些额外的优势：

* 更简洁的入口点：通过使用 @forward，库的开发者可以将多个子模块整合到一个入口文件中。这使得库的使用者只需导入一个文件，而不是逐个导入库的所有组成部分。虽然 @use 也可以在库的主文件中导入其他模块，但它不会自动将这些模块的成员暴露给库的使用者。
* 成员过滤：@forward 规则允许您更精确地控制哪些成员应该暴露给库的使用者。您可以使用 hide 和 show 子句来选择性地转发模块中的成员。这在 @use 规则中无法实现。
* 成员重命名：@forward 规则允许您为转发的成员添加额外的前缀，以避免与其他库或用户自定义样式发生命名冲突。虽然您可以在 @use 规则中手动更改导入的命名空间，但这需要额外的工作并可能导致更多的维护负担。

尽管在某些场景下，您可以使用 @use 规则实现类似的功能，但 @forward 仍然为组织和封装代码库提供了额外的控制和灵活性。根据您的需求和具体场景选择合适的规则是很重要的。

### 为什么同一个文件中同时使用 @forward 和 @use 规则导入同一个模块，建议首先编写 @forward 规则？

这样做的好处在于，如果库的使用者希望配置被转发的模块，那么该配置将在 @use 加载模块之前应用到 @forward 规则。

简单来说，这意味着库使用者对转发模块所做的配置将在您自己的 @use 规则加载模块之前生效。这样，您在文件中使用 @use 规则加载的模块将自动应用库使用者的配置，而无需再次手动配置。如果不遵循这个顺序，可能会导致配置不正确地应用或被忽略。

例如，考虑以下情况：

* 您在一个文件中创建了一个 @forward 规则，以转发模块 A。
* 在同一个文件中，您还使用 @use 规则加载模块 A。
* 库的使用者希望配置模块 A。

按照上述建议，您应该首先编写 @forward 规则，然后是 @use 规则。这样，库使用者的配置将首先应用于 @forward 规则，然后再应用于 @use 规则。这样可以确保配置正确地应用，避免潜在的问题。

使用 @forward指令加载指定URL的模块后，虽然不能使用加载模块里面的mixin、函数、变量，但是可以通过使用@extend指令[扩展](./extend)规则

::: code-group
``` scss [scss]
// a.scss
$color: #ddd;
$margin: 10px;
.qwe {
  margin: $margin;
}

//b.scss
@forward "a";
.asd {
  @extend .qwe;
  font-size: 14px;
}

//c.scss
@use "b" as *;
.zxc {
  color: $color
}
```
``` sass [sass]
// a.sass
$color: #ddd
$margin: 10px
.qwe
  margin: $margin

//b.sass
@forward "a"
.asd
  @extend .qwe
  font-size: 14px

//c.sass
@use "b" as *
.zxc
  color: $color

```
``` css [css]
.qwe, .asd {
  margin: 10px;
}

.asd {
  font-size: 14px;
}

.zxc {
  color: #ddd;
}

```
:::


