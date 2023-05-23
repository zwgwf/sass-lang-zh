# 关系运算符

关系运算符确定数字之间的大小关系。它们会自动在兼容的单位之间进行转换。

`<expression> < <expression>` 返回第一个表达式的值是否小于第二个表达式的值。
`<expression> <= <expression>` 返回第一个表达式的值是否小于或等于第二个表达式的值。
`<expression> > <expression>` 返回第一个表达式的值是否大于第二个表达式的值。
`<expression> >= <expression>` 返回第一个表达式的值是否大于或等于第二个表达式的值。

::: code-group
``` scss [scss]
@debug 100 > 50; // true
@debug 10px < 17px; // true
@debug 96px >= 1in; // true
@debug 1000ms <= 1s; // true
```
``` sass [sass]
@debug 100 > 50  // true
@debug 10px < 17px  // true
@debug 96px >= 1in  // true
@debug 1000ms <= 1s  // true
```
:::

无单位的数字可以与任何数字进行比较。它们会自动转换为与之比较的数字的单位。

::: code-group
``` scss [scss]
@debug 100 > 50px; // true
@debug 10px < 17; // true
```
``` sass [sass]
@debug 100 > 50px  // true
@debug 10px < 17  // true
```
:::

具有不兼容单位的数字无法进行比较。

::: code-group
``` scss [scss]
@debug 100px > 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```
``` sass [sass]
@debug 100px > 10s
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```
:::