# @while

@while 规则的语法是 `@while <expression> { ... }`。它的工作原理如下：

* 如果[表达式](../../syntax/structure#表达式)的返回值为 true，则执行大括号内的代码块。
* 如果表达式仍然返回 true，则再次执行代码块。
* 重复这个过程，直到表达式返回 false。

::: code-group
``` scss [scss]
@use "sass:math";

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}
```
``` sass [sass]
@use "sass:math"

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618)
  @while $value > $base
    $value: math.div($value, $ratio)
  @return $value



$normal-font-size: 16px
sup
  font-size: scale-below(20px, 16px)
```
``` css [css]
sup {
  font-size: 12.36094px;
}
```
:::

::: warning 注意
虽然在一些特别复杂的样式表中 `@while` 规则是必需的，但在大多数情况下，如果 [`@each`](./each) 或 [`@for`](./for) 能满足需求，那么更建议使用它们。原因有两点：首先，它们更容易让读者理解；其次，它们通常具有更快的编译速度。
:::

## 真值和假值

在 Sass 中，除了 true 和 false，其他值也可以用于条件判断。在 Sass 中，false 和 [null](../../values/null) 被认为是假值（falsey），表示条件失败。所有其他值被认为是真值（truthy），表示条件成功。

例如，如果你想检查一个字符串是否包含空格，你可以直接写 `string.index($string, " ")`。如果未找到该字符串，[`string.index()`](https://sass-lang.com/documentation/modules/string#index) 函数将返回 null，否则返回一个数字。在这种情况下，null 作为假值，表示未找到空格；而数字作为真值，表示找到了空格。

::: warning 注意
在 Sass 中，只有 false 和 null 被认为是假值（falsey）。而在其他一些编程语言中，可能还有更多的值被认为是假值。但在 Sass 中，空字符串、空列表和数字 0 都被认为是真值（truthy）。
:::
