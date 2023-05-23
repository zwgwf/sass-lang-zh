# @function

函数可以让您在样式表中定义并重用复杂的[SassScript值](../values/index)操作。它们可以帮助您以一种易于阅读的方式抽象出通用的公式和行为。

函数使用@function指令定义，其格式为：`@function <name>(<arguments...>) { ... }`。函数的名称可以是任何Sass标识符。数内部只能包含[通用语句](../syntax/structure#通用声明)以及[@return指令](./function#return)，后者用于表示函数调用结果的值。函数调用使用常规的CSS函数语法。

::: code-group
``` scss [scss]
SCSS SYNTAX
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```
``` sass [sass]
@function pow($base, $exponent)
  $result: 1
  @for $_ from 1 through $exponent
    $result: $result * $base

  @return $result


.sidebar
  float: left
  margin-left: pow(4, 3) * 1px
```
``` css [css]
.sidebar {
  float: left;
  margin-left: 64px;
}
```
:::

::: tip 提示
同所有的sass标识符一样，在函数名称中，连字符（hyphens）和下划线（underscores）被视为相同。如scale-color和scale_color都指代同一个函数。这种处理方式源自Sass的早期历史。当时，Sass只允许在标识符名称中使用下划线。后来，Sass增加了对连字符的支持以匹配CSS的语法，为了便于迁移，将连字符和下划线视为等同。
:::

::: warning 注意
虽然从技术上来说，函数可以产生副作用，比如设置[全局变量](../variables#作用域)，但这种做法是非常不推荐的。使用mixin来实现具有副作用的操作。将函数仅用于计算值，避免引入副作用。
:::

## 参数

参数允许在每次调用函数时自定义其行为。参数在@function规则中定义，紧跟在函数名之后，用括号括起来的变量名列表表示。调用函数时，必须以SassScript表达式的形式传入与定义时相同数量的参数。在函数体内，可以通过相应的变量获取这些表达式的值。

::: tip 提示
在Sass函数参数列表中，可以在最后一个参数后添加一个逗号。尾随逗号有助于在重构样式表时避免语法错误。
:::

### 可选参数

通常来说，当调用一个函数时，需要传入该函数声明的所有参数。但是，可以通过为参数定义一个默认值来使其变为可选参数。如果在调用函数时没有传入该参数，将使用默认值。默认值的语法与[变量声明](../variables)相同：变量名后跟一个冒号，然后是一个[SassScript表达式](../syntax/structure#表达式)。通过使用默认值，可以轻松地定义灵活的函数API，适用于简单或复杂的用途。

::: code-group
``` scss [scss]
@function invert($color, $amount: 100%) {
  $inverse: change-color($color, $hue: hue($color) + 180);
  @return mix($inverse, $color, $amount);
}

$primary-color: #036;
.header {
  background-color: invert($primary-color, 80%);
}
```
``` sass [sass]
@function invert($color, $amount: 100%)
  $inverse: change-color($color, $hue: hue($color) + 180)
  @return mix($inverse, $color, $amount)


$primary-color: #036
.header
  background-color: invert($primary-color, 80%)
```
``` css [css]
.header {
  background-color: #523314;
}
```
:::

::: tip 提示
默认值可以是任何SassScript表达式，而且默认值甚至可以引用之前的参数。
:::

### 关键字参数

在调用Sass函数时，除了通过参数在参数列表中的位置传递之外，还可以通过名称传递参数。对于具有多个可选参数的函数或者[布尔](../values/booleans)参数含义不明确的情况，通过名称传递参数特别有用。关键字参数使用与[变量声明](../variables)和[可选参数](./function#可选参数)相同的语法。

::: code-group
``` scss [scss]
$primary-color: #036;
.banner {
  background-color: $primary-color;
  color: scale-color($primary-color, $lightness: +40%);
}
```
``` sass [sass]
$primary-color: #036
.banner
  background-color: $primary-color
  color: scale-color($primary-color, $lightness: +40%)
```
``` css [css]
.banner {
  background-color: #036;
  color: #0a85ff;
}
```
:::

::: warning 注意
因为任何参数都可以通过名称传递，所以在重命名函数参数时要特别小心，这可能会导致使用该函数的用户出现问题。在一段时间内，将旧名称作为可选参数保留，这样可以帮助用户进行过渡。如果有人使用旧参数名称，可以打印警告信息，提醒他们迁移到新参数名称。
:::

### 使用任意参数

有时候我们希望一个Sass函数可以接受任意数量的参数。如果在`@function`声明中，最后一个参数后面跟着`...`，那么该函数将能够接受任意数量的额外参数。这些额外参数将作为一个列表传递给带有`...`的那个参数。这个带有`...`的参数被称为[参数列表](../values/lists#参数列表)。

::: code-group
``` scss [scss]
@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);
}
```
``` sass [sass]
@function sum($numbers...)
  $sum: 0
  @each $number in $numbers
    $sum: $sum + $number

  @return $sum


.micro
  width: sum(50px, 30px, 100px)
```
``` css [css]
.micro {
  width: 180px;
}
```
:::

#### 使用任意关键字参数

参数列表也可以用于接收任意数量的关键字参数。`meta.keywords()`函数接受一个参数列表，并返回一个映射，该映射包含传递给函数的任何额外关键字参数。映射中的键是参数名称（不包括`$`），值是这些参数的值。

::: tip 提示
如果你从未将参数列表传递给`meta.keywords()`函数，那么该参数列表将不允许额外的关键字参数。这种限制有助于确保调用你的函数的人没有意外地拼错任何参数名称。
:::

#### 传递任意参数

就像参数列表允许函数接受任意数量的位置参数或关键字参数一样，同样的语法可以用来向函数传递位置参数和关键字参数。如果在函数调用的最后一个参数后跟一个列表和` ...`，那么列表中的元素将被视为额外的位置参数。类似地，如果在函数调用的最后一个参数后跟一个映射和 `...`，那么映射将被视为额外的关键字参数。你甚至可以同时传递位置参数和关键字参数！

::: code-group
``` scss [scss]
$widths: 50px, 30px, 100px;
.micro {
  width: min($widths...);
}
```
``` sass [sass]
$widths: 50px, 30px, 100px
.micro
  width: min($widths...)

```
``` css [css]
.micro {
  width: 30px;
}
```
:::

::: tip 提示
因为[参数列表](../values/lists#参数列表)同时跟踪位置参数和关键字参数，所以你可以使用参数列表同时将位置参数和关键字参数传递给另一个函数。这种方式使得为函数定义别名变得非常简单。
::: code-group
``` scss [scss]
@function fg($args...) {
  @warn "The fg() function is deprecated. Call foreground() instead.";
  @return foreground($args...);
}
```
``` sass [sass]
@function fg($args...)
  @warn "The fg() function is deprecated. Call foreground() instead."
  @return foreground($args...)
```
:::

## @return

`@return` 用于指示函数调用的结果值。 它只允许在 `@function` 体内使用，且每个 `@function` 必须以 `@return` 结束。当遇到 `@return` 时，它会立即结束函数并返回结果。在处理边缘情况或可以使用更高效算法的情况下，提前返回可能很有用，这样就不需要在整个函数中使用 `@else` 块。

::: code-group
``` scss [scss]
@use "sass:string";

@function str-insert($string, $insert, $index) {
  // Avoid making new strings if we don't need to.
  @if string.length($string) == 0 {
    @return $insert;
  }

  $before: string.slice($string, 0, $index);
  $after: string.slice($string, $index);
  @return $before + $insert + $after;
}
```
``` sass [sass]
@use "sass:string"

@function str-insert($string, $insert, $index)
  // Avoid making new strings if we don't need to.
  @if string.length($string) == 0
    @return $insert


  $before: string.slice($string, 0, $index)
  $after: string.slice($string, $index)
  @return $before + $insert + $after
```
``` css [css]
```
:::

## 其它函数

除了用户自定义函数之外，Sass 还提供了一个丰富的内置函数库，这些函数始终可供使用。Sass 实现还允许在宿主语言中定义[自定义函数](https://sass-lang.com/documentation/js-api/interfaces/LegacySharedOptions#functions)。当然，你还可以调用[普通的 CSS 函数](./function#普通css函数)（即使它们的[语法看起来很奇怪](../syntax/special-functions)）。

### 普通CSS函数

当一个函数调用既不是用户自定义函数也不是内置函数时，它将被编译为普通的 CSS 函数（除非它使用 Sass 参数语法）。这些参数将被编译成 CSS，并保持原样包含在函数调用中。这确保了 Sass 支持所有 CSS 函数，无需每次新增一个新函数时都发布新版本。

::: code-group
``` scss [scss]
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;
@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
```
``` sass [sass]
@debug var(--main-bg-color)  // var(--main-bg-color)

$primary: #f2ece4
$accent: #e1d7d2
@debug radial-gradient($primary, $accent)  // radial-gradient(#f2ece4, #e1d7d2)
```
:::

::: warning 注意
由于任何未知的函数都将被编译为 CSS，因此很容易在拼写错误的函数名时疏忽。建议在样式表的输出上运行一个 [CSS 检查工具（linter）](https://stylelint.io/)，以便在这种情况发生时得到通知！
:::

::: tip 提示
一些 CSS 函数，如 calc() 和 element()，具有不寻常的语法。Sass 将这些[函数特殊解析](../syntax/special-functions)为[未加引号的字符串](../values/strings#未加引号的字符串)。
:::