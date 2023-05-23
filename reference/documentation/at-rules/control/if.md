# @if and @else

`@if` 规则的书写格式为 `@if <expression> { ... }`，它控制其代码块是否被执行（包括将任何样式输出为 CSS）。[表达式](../../syntax/structure#表达式)通常返回 [true 或 false](../../values/booleans) —— 如果表达式返回 true，则执行该代码块；如果表达式返回 false，则不执行。这种规则允许你根据条件来决定是否应用某些样式或执行某些操作。

::: code-group
``` scss [scss]
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```
``` sass [sass]
@mixin avatar($size, $circle: false)
  width: $size
  height: $size

  @if $circle
    border-radius: $size / 2

.square-av
  @include avatar(100px, $circle: false)
.circle-av
  @include avatar(100px, $circle: true)
```
``` css [css]
.square-av {
  width: 100px;
  height: 100px;
}

.circle-av {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```
:::

## @else

 `@if` 规则可以选择性地跟随一个 `@else` 规则，书写格式为 `@else { ... }`。当 `@if` 表达式返回 false 时，`@else` 规则的代码块会被执行。

 ::: code-group
``` scss [scss]
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include theme-colors($light-theme: true);
  body.dark & {
    @include theme-colors($light-theme: false);
  }
}
```
``` sass [sass]
$light-background: #f2ece4
$light-text: #036
$dark-background: #6b717f
$dark-text: #d2e1dd

@mixin theme-colors($light-theme: true)
  @if $light-theme
    background-color: $light-background
    color: $light-text
  @else
    background-color: $dark-background
    color: $dark-text



.banner
  @include theme-colors($light-theme: true)
  body.dark &
    @include theme-colors($light-theme: false)
```
``` css [css]
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
```
:::

条件表达式可能包含布尔运算符（and，or，not）。

### @else if

你也可以使用 `@else if <expression> { ... }` 结构来决定是否执行 `@else` 规则的代码块。只有在前面的 `@if` 表达式返回 false，且 `@else if` 的表达式返回 true 时，才会执行这个 `@else if` 代码块。

实际上，你可以在一个 `@if` 之后链式地添加多个 `@else if`。链中第一个表达式返回 true 的代码块将被执行，其他的则不会。如果链的末尾有一个普通的 `@else`，那么只有在其他所有代码块都失败时，它的代码块才会被执行。这种结构可以让你根据不同的条件选择性地执行不同的样式或操作。

::: code-group
``` scss [scss]
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```
``` sass [sass]
@use "sass:math"

@mixin triangle($size, $color, $direction)
  height: 0
  width: 0

  border-color: transparent
  border-style: solid
  border-width: math.div($size, 2)

  @if $direction == up
    border-bottom-color: $color
  @else if $direction == right
    border-left-color: $color
  @else if $direction == down
    border-top-color: $color
  @else if $direction == left
    border-right-color: $color
  @else
    @error "Unknown direction #{$direction}."



.next
  @include triangle(5px, black, right)
```
``` css [css]
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
```
:::

## 真值和假值

在 Sass 中，除了 true 和 false，其他值也可以用于条件判断。在 Sass 中，false 和 [null](../../values/null) 被认为是假值（falsey），表示条件失败。所有其他值被认为是真值（truthy），表示条件成功。

例如，如果你想检查一个字符串是否包含空格，你可以直接写 `string.index($string, " ")`。如果未找到该字符串，[`string.index()`](https://sass-lang.com/documentation/modules/string#index) 函数将返回 null，否则返回一个数字。在这种情况下，null 作为假值，表示未找到空格；而数字作为真值，表示找到了空格。

::: warning 注意
在 Sass 中，只有 false 和 null 被认为是假值（falsey）。而在其他一些编程语言中，可能还有更多的值被认为是假值。但在 Sass 中，空字符串、空列表和数字 0 都被认为是真值（truthy）。
:::