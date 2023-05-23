# @mixin and @include

混入（mixin）允许在样式表中定义可重复使用的样式，便于避免使用非语义化的类名（如 .float-left），并在库中分发样式集合。

混入（mixin）是通过 @mixin at-rule 定义的，可以使用 `@mixin <name> { ... }` 或 `@mixin name(<arguments...>) { ... }` 的形式编写。混入的名称可以是任何 Sass 标识符，并且可以包含除[顶级声明](../syntax/structure#顶级声明)之外的任何[声明](../syntax/structure#声明)。混入可以用来封装可以放入单个[样式规则](../style-rules/index)中的样式；它们可以包含自己的样式规则，这些规则可以嵌套在其他规则中或包含在样式表的顶级；或者它们仅用于修改变量。

使用 @include at-rule 将混入包含到当前上下文中，写法为 `@include <name>` 或 `@include <name>(<arguments...>)`，名称为要包含的混入名称。

::: code-group
``` scss [scss]
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```
``` sass [sass]
@mixin reset-list
  margin: 0
  padding: 0
  list-style: none


@mixin horizontal-list
  @include reset-list

  li
    display: inline-block
    margin:
      left: -2px
      right: 2em




nav ul
  @include horizontal-list
```
``` css [css]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```
:::

::: tip 提示
混入名称（以及所有 Sass 标识符）将连字符和下划线视为相同。这意味着 reset-list 和 reset_list 都引用相同的混入。这是从 Sass 早期沿袭下来的历史遗留问题，当时 Sass 只允许在标识符名称中使用下划线。后来，为了匹配 CSS 语法，Sass 添加了对连字符的支持，将两者视为等价以便更容易地进行迁移。
:::

## 参数

mixin可以接收参数，以便在每次调用时自定义其行为。在@mixin规则中，参数紧跟在mixin名称之后，以用括号括起来的变量名列表的形式指定。在使用mixin时，必须以[SassScript表达式](../syntax/structure#表达式)的形式传递与参数列表中变量数量相同的参数。在mixin的主体内，这些表达式的值将作为相应的变量可用。

::: code-group
``` scss [scss]
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```
``` sass [sass]
@mixin rtl($property, $ltr-value, $rtl-value)
  #{$property}: $ltr-value

  [dir=rtl] &
    #{$property}: $rtl-value



.sidebar
  @include rtl(float, left, right)
```
``` css [css]
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}
```
:::

::: tip 提示
在Sass中，参数列表可以包含尾逗号。这个特性有助于避免在重构样式表时出现语法错误。尾逗号指的是在参数列表的最后一个参数之后添加的逗号。这样，在修改或重构代码时，即使在参数列表中添加、移除或更改参数，也不容易出现遗漏逗号或多余逗号导致的语法错误。
:::

### 可选的参数

当包含一个mixin时，通常需要传递该mixin声明的每个参数。但是，也可以通过定义默认值来使参数变为可选，如果没有传递该参数，则会使用默认值。默认值的语法与变量声明相同：变量名后跟一个冒号，再跟一个SassScript表达式。这种方法使得定义灵活的mixin API变得容易，可以以简单或复杂的方式使用这些API。

::: code-group
``` scss [scss]
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```
``` sass [sass]
SASS SYNTAX
@mixin replace-text($image, $x: 50%, $y: 50%)
  text-indent: -99999em
  overflow: hidden
  text-align: left

  background:
    image: $image
    repeat: no-repeat
    position: $x $y

.mail-icon
  @include replace-text(url("/images/mail.svg"), 0)
```
``` css [css]
.mail-icon {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;
  background-image: url("/images/mail.svg");
  background-repeat: no-repeat;
  background-position: 0 50%;
}

```
:::

::: tip 提示
为mixin参数设置的默认值可以是任何SassScript表达式，而且默认值甚至可以引用之前的参数。
:::

### 关键字参数

当包含一个mixin时，除了根据参数在参数列表中的位置来传递参数外，还可以通过参数名称来传递参数。对于具有多个可选参数的mixin，或者具有布尔参数且在没有名称的情况下不容易理解含义的mixin，使用关键字参数特别有用。关键字参数使用与变量声明和可选参数相同的语法。

::: code-group
``` scss [scss]
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```
``` sass [sass]
@mixin square($size, $radius: 0)
  width: $size
  height: $size

  @if $radius != 0
    border-radius: $radius



.avatar
  @include square(100px, $radius: 4px)
```
``` css [css]
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
```
:::

::: warning 注意
由于任何参数都可以通过名称传递，因此在重命名mixin参数时要小心，因为这可能会导致使用该mixin的用户出现问题。当你需要重命名mixin的参数时，可以暂时将旧参数名称保留为[可选参数](./mixin#可选参数)，以防止因改变参数名而导致用户代码出错。如果有人使用旧参数名称传递参数，建议打印[警告](./warn)信息，让他们知道需要迁移到新参数名称。
:::

### 使用任意参数

有时允许mixin接受任意数量的参数会很有用。如果在@mixin声明中，最后一个参数以...结尾，那么该mixin将能够接受任意数量的额外参数。这些额外的参数会作为一个[列表](../values/lists)传递给最后一个带有...的参数。这个参数被称为[参数列表](../values/lists#参数列表)。

::: code-group
``` scss [scss]
@mixin order($height, $selectors...) {
  @for $i from 0 to length($selectors) {
    #{nth($selectors, $i + 1)} {
      position: absolute;
      height: $height;
      margin-top: $i * $height;
    }
  }
}

@include order(150px, "input.name", "input.address", "input.zip");
```
``` sass [sass]
@mixin order($height, $selectors...)
  @for $i from 0 to length($selectors)
    #{nth($selectors, $i + 1)}
      position: absolute
      height: $height
      margin-top: $i * $height




@include order(150px, "input.name", "input.address", "input.zip")
```
``` css [css]
input.name {
  position: absolute;
  height: 150px;
  margin-top: 0px;
}

input.address {
  position: absolute;
  height: 150px;
  margin-top: 150px;
}

input.zip {
  position: absolute;
  height: 150px;
  margin-top: 300px;
}
```
:::

#### 使用任意关键字参数

参数列表还可以用于接收任意数量的关键字参数。使用meta.keywords()函数，可以从参数列表中提取传递给mixin的额外关键字参数。meta.keywords()函数接收一个参数列表，返回一个映射。这个映射包含了传递给mixin的关键字参数的名称（不包括$符号）及其对应的值。

::: code-group
``` scss [scss]
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```
``` sass [sass]
@use "sass:meta"

@mixin syntax-colors($args...)
  @debug meta.keywords($args)
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args)
    pre span.stx-#{$name}
      color: $color




@include syntax-colors($string: #080, $comment: #800, $variable: #60b)
```
``` css [css]
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```
:::

::: tip 提示
当不使用meta.keywords()函数处理参数列表时，mixin不会接受任何额外的关键字参数。这种做法有助于确保mixin的调用者在传递参数时不会意外地拼写错误参数名。
:::

#### 传递任意参数

与参数列表允许mixin接受任意数量的位置参数或关键字参数类似，同样的语法也可用于将位置参数和关键字参数传递给mixin。如果在include中，将一个带有...的列表作为最后一个参数传递，则列表中的元素将被视为额外的位置参数。类似地，如果将一个带有...的映射作为最后一个参数传递，它将被视为额外的关键字参数。您甚至可以同时传递位置参数和关键字参数。

::: code-group
``` scss [scss]
$form-selectors: "input.name", "input.address", "input.zip" !default;

@include order(150px, $form-selectors...);
```
``` sass [sass]
$form-selectors: "input.name", "input.address", "input.zip" !default

@include order(150px, $form-selectors...)
```
:::

::: tip 提示

[参数列表](../values/lists#参数列表)可以同时跟踪位置参数和关键字参数，因此可以将它们一起传递给另一个mixin。这使得定义mixin的别名变得非常简单。

::: code-group
``` scss [scss]
@mixin btn($args...) {
  @warn "The btn() mixin is deprecated. Include button() instead.";
  @include button($args...);
}
```
``` sass [sass]
@mixin btn($args...)
  @warn "The btn() mixin is deprecated. Include button() instead."
  @include button($args...)
```
:::

## 内容块

除了接受参数外，mixin还可以接受一整个样式块，称为内容块。mixin可以通过在其主体中包含@content指令来声明它接受一个内容块。内容块使用与Sass中的其他块相同的大括号（{}）表示法传递。内容块会替换mixin主体中的@content规则，将其注入到mixin的指定位置。

::: code-group
``` scss [scss]
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```
``` sass [sass]
@mixin hover
  &:not([disabled]):hover
    @content



.button
  border: 1px solid black
  @include hover
    border-width: 2px
```
``` css [css]

.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
}
```
:::

::: tip 提示
一个mixin可以包含多个@content指令。如果有多个@content指令，那么内容块将会分别对应每个@content进行注入。
:::

::: warning 注意
内容块遵循词法作用域，内容块只能访问包含mixin所在作用域的局部变量。内容块无法访问传递给的mixin中定义的变量，即使这些变量是在调用内容块之前定义的。
:::

### 将参数传递到内容块

mixin可以像传递参数给另一个mixin一样，将参数传递给其内容块。mixin可以通过编写`@content(<arguments...>)`的形式将参数传递给内容块。编写内容块的用户可以通过编写`@include <name> using (<arguments...>)`来接受这些参数。内容块的参数列表与mixin的参数列表类似，而通过@content传递给内容块的参数就像将参数传递给mixin一样。

::: warning 注意
当mixin向其内容块传递参数时，内容块必须声明它接受这些参数。只通过位置（而不是名称）传递参数是个好主意，因为这样可以避免混淆。增加传递的参数数量可能导致不兼容的更改，因此需要注意。

如果希望在向内容块传递信息时具有更多灵活性，可以考虑传递一个包含可能需要的信息的[映射](../values/maps)。
:::

::: code-group
``` scss [scss]
@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```
``` sass [sass]
@mixin media($types...)
  @each $type in $types
    @media #{$type}
      @content($type)




@include media(screen, print) using ($type)
  h1
    font-size: 40px
    @if $type == print
      font-family: Calluna

```
``` css [css]
@media screen {
  h1 {
    font-size: 40px;
  }
}
@media print {
  h1 {
    font-size: 40px;
    font-family: Calluna;
  }
}
```
:::

## 缩进Mixin语法

在Sass的缩进语法中，除了标准的@mixin和@include语法之外，还有一种特殊的语法用于定义和使用mixin。使用等号（=）定义mixin，使用加号（+）包含mixin。虽然这种语法更简洁，但它也不容易一眼就看懂。因此，建议用户避免使用这种特殊的语法，而坚持使用标准的@mixin和@include语法。

::: code-group
``` sass [sass]
=reset-list
  margin: 0
  padding: 0
  list-style: none

=horizontal-list
  +reset-list

  li
    display: inline-block
    margin:
      left: -2px
      right: 2em

nav ul
  +horizontal-list
```
``` css [css]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```
:::