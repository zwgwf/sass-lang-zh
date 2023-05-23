# @for

@for 规则用于在一个数值范围内遍历并执行代码块。它的语法有两种形式：

* `@for <variable> from <expression> to <expression> { ... }`：这种形式从第一个[表达式](../../syntax/structure#表达式)的结果（一个数字）开始，到第二个表达式的结果（另一个数字）结束，但不包括这个结束数字。在这个范围内，代码块将针对每个数字进行求值，且每个数字都会被赋给指定的变量名。

* `@for <variable> from <expression> through <expression> { ... }`：与第一种形式类似，但在这种情况下，范围是包括结束数字的。这意味着代码块将针对从开始数字到结束数字（包括结束数字）的每个数字进行求值。

::: code-group
``` scss [scss]
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```
``` sass [sass]
$base-color: #036

@for $i from 1 through 3
  ul:nth-child(3n + #{$i})
    background-color: lighten($base-color, $i * 5%)
```
``` css [css]
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```
:::