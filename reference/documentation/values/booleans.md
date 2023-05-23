# 布尔值

布尔值是逻辑值true和false。除了它们的字面形式外，布尔值还可以通过[等式](../operators/equality)和[关系](../operators/relational)运算符返回，以及许多内置函数，如[math.comparable()](https://sass-lang.com/documentation/modules/math#comparable)和[map.has-key()](https://sass-lang.com/documentation/modules/math#comparable)。

::: code-group
``` scss [scss]
@use "sass:math";

@debug 1px == 2px; // false
@debug 1px == 1px; // true
@debug 10px < 3px; // false
@debug math.comparable(100px, 3in); // true
```
``` sass [sass]
@use "sass:math"

@debug 1px == 2px  // false
@debug 1px == 1px  // true
@debug 10px < 3px  // false
@debug math.comparable(100px, 3in)  // true
```
:::


您可以使用[布尔运算符](../operators/boolean)处理布尔值。逻辑与运算符（and）在两个操作数都为true时返回true，逻辑或运算符（or）在任一操作数为true时返回true。逻辑非运算符（not）返回单个布尔值的相反值。

::: code-group
``` scss [scss]
@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false

@debug not true; // false
@debug not false; // true
```
``` sass [sass]
@debug true and true  // true
@debug true and false  // false

@debug true or false  // true
@debug false or false  // false

@debug not true  // false
@debug not false  // true
```
:::

## 使用布尔值

在Sass中，您可以使用布尔值来选择是否执行各种操作。[@if规则](../at-rules/control/if)会根据其参数的布尔值来判断一组样式块是否执行：

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

[if()函数](https://sass-lang.com/documentation/modules#if)根据其参数的布尔值返回一个值（如果参数为true）或另一个值（如果参数为false）：

::: code-group
``` scss [scss]
@debug if(true, 10px, 30px); // 10px
@debug if(false, 10px, 30px); // 30px
```
``` sass [sass]
@debug if(true, 10px, 30px)  // 10px
@debug if(false, 10px, 30px)  // 30px
```
:::

## 真值或假值

在允许使用true或false的任何位置，您也可以使用其他值。值false和[null](./null)被认为是假值（falsey），这意味着Sass将它们视为表示假，并导致条件失败。而其他所有值被视为真值（truthy），因此Sass将它们视为true并导致条件成功。

例如，如果您想检查一个字符串是否包含空格，您可以直接编写string.index($string, " ")。[string.index()函数](https://sass-lang.com/documentation/modules/string#index)如果未找到字符串，则返回null；否则返回一个数字。

::: warning 注意
有些语言认为除了false和null之外的更多值为假值。但Sass不属于这些语言！空字符串、空列表和数字0在Sass中都被视为真值。
:::
