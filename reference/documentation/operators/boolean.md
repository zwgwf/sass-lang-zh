# 布尔运算符

与JavaScript等语言不同，Sass使用单词而不是符号作为其[布尔](../values/booleans)运算符。

* `not <expression>` 返回表达式值的反面：它将true转为false，将false转为true。
* `<expression> and <expression>` 如果两个表达式的值都为true，则返回true，如果任何一个为false，则返回false。
* `<expression> or <expression>` 如果任何一个表达式的值为true，则返回true，如果两者都为false，则返回false。

::: code-group
``` scss [scss]
@debug not true; // false
@debug not false; // true

@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false
```
``` sass [sass]
@debug not true  // false
@debug not false  // true

@debug true and true  // true
@debug true and false  // false

@debug true or false  // true
@debug false or false  // false
```
:::

## 真值和假值

在允许使用true或false的地方，你也可以使用其他值。false和[null](../values/null)的值被视为falsey，这意味着Sass认为它们表示为假，并会导致条件判断失败。除此之外的每一个值都被认为是truthy，因此Sass将它们视为true并导致条件判断成功。

例如，如果你想检查一个字符串是否包含空格，你可以简单地写 `string.index($string, " ")`。[string.index()函数](https://sass-lang.com/documentation/modules/string#index)在没有找到字符串时返回null，其他情况下返回一个数字。

::: warning 注意
一些编程语言认为除了 false 和 null 外，还有其他值也应视为 falsey（表示假）。然而，Sass 不属于这类语言！在 Sass 中，空字符串、空列表和数字0都被认为是 truthy（表示真）。
:::