# 字符串运算符

Sass支持一些用于生成字符串的运算符：

* `<expression> + <expression>` 返回一个字符串，其中包含两个表达式的值。如果任一值是[加引号的字符串](../values/strings#加引号的字符串)，结果将加引号；否则，结果将未加引号的字符串。
* `<expression> - <expression>` 返回一个未加引号的字符串的字符串，其中包含两个表达式的值，由 - 分隔。这是一个遗留运算符，通常应使用[插值](../interpolation)替代。

::: code-group
``` scss [scss]
@debug "Helvetica" + " Neue"; // "Helvetica Neue"
@debug sans- + serif; // sans-serif
@debug sans - serif; // sans-serif
```
``` sass [sass]
@debug "Helvetica" + " Neue"  // "Helvetica Neue"
@debug sans- + serif  // sans-serif
@debug sans - serif  // sans-serif
```
:::


这些运算符不仅仅适用于字符串！它们可以用于任何可以写入CSS的值，但有一些例外：

* 数字不能用作左值，因为[它们有自己的运算符](./numeric)。
* 颜色不能用作左值，因为[它们曾经有自己的运算符](./index)。

::: code-group
``` scss [scss]
@debug "Elapsed time: " + 10s; // "Elapsed time: 10s";
@debug true + " is a boolean value"; // "true is a boolean value";
```
``` sass [sass]
@debug "Elapsed time: " + 10s  // "Elapsed time: 10s"
@debug true + " is a boolean value"  // "true is a boolean value"
```
:::

::: warning 注意
使用插值创建字符串，而不是依赖这些运算符，通常会更简洁、更明了。
:::

## 一元运算符

由于历史原因，Sass也支持使用/和-作为只需要一个值的一元运算符：

`/<expression>` 返回以/开头，后面跟着表达式值的未引用字符串。
`-<expression>` 返回以-开头，后面跟着表达式值的未引用字符串。

::: code-group
``` scss [scss]
@debug / 15px; // /15px
@debug - moz; // -moz
```
``` sass [sass]
@debug / 15px  // /15px
@debug - moz  // -moz
```
:::


