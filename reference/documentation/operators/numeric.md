# 数字运算符

Sass支持[数字](../values/numbers)的标准数学运算符集。它们会自动在兼容的单位之间进行转换。

* <表达式> + <表达式> 将第一个表达式的值加到第二个上。
* <表达式> - <表达式> 将第二个表达式的值从第一个中减去。
* <表达式> * <表达式> 将第一个表达式的值与第二个相乘。
* <表达式> % <表达式> 返回将第一个表达式的值除以第二个的余数。这被称为[模运算符](https://en.wikipedia.org/wiki/Modulo_operation)。

::: code-group
``` scss [scss]
@debug 10s + 15s; // 25s
@debug 1in - 10px; // 0.8958333333in
@debug 5px * 3px; // 15px*px
@debug 1in % 9px; // 0.0625in
```
``` sass [sass]
@debug 10s + 15s  // 25s
@debug 1in - 10px  // 0.8958333333in
@debug 5px * 3px  // 15px*px
@debug 1in % 9px  // 0.0625in
```
:::

无单位的数字可以与任何单位的数字一起使用。

::: code-group
``` scss [scss]
@debug 100px + 50; // 150px
@debug 4s * 10; // 40s
```
``` sass [sass]
@debug 100px + 50  // 150px
@debug 4s * 10  // 40s
```
:::

具有不兼容单位的数字不能与加法、减法或模运算符一起使用。

::: code-group
``` scss [scss]
@debug 100px + 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```
``` sass [sass]
@debug 100px + 10s
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```
:::

## 一元运算符

您也可以将 + 和 - 作为一元运算符来编写，这些运算符只接受一个值：

+<表达式> 返回表达式的值，但不改变它。
-<表达式> 返回表达式值的负数版本。

::: code-group
``` scss [scss]
@debug +(5s + 7s); // 12s
@debug -(50px + 30px); // -80px
@debug -(10px - 15px); // 5px
```
``` sass [sass]
@debug +(5s + 7s)  // 12s
@debug -(50px + 30px)  // -80px
@debug -(10px - 15px)  // 5px
```
:::

::: warning 注意
由于 - 可以表示减法和一元取反，所以在空格分隔的列表中可能会混淆它们。为了保险起见：

在减法时，总是在 - 两侧都写空格。
对于负数或一元取反，在 - 前写一个空格，但在后面不写。
如果一元取反在空格分隔的列表中，将其用括号包围。
在 Sass 中，- 的不同含义的优先级按以下顺序：

作为标识符的一部分。唯一的例外是单位；Sass 通常允许任何有效的标识符用作标识符，但单位不可以包含一个连字符后面跟着一个数字。
在表达式和没有空格的字面数字之间，这被解析为减法。
在字面数字的开头，这被解析为负数。
无论空格如何，都在两个数字之间，这被解析为减法。
在除字面数字之外的值前，这被解析为一元取反

::: code-group
``` scss [scss]
@debug a-1; // a-1
@debug 5px-3px; // 2px
@debug 5-3; // 2
@debug 1 -2 3; // 1 -2 3

$number: 2;
@debug 1 -$number 3; // -1 3
@debug 1 (-$number) 3; // 1 -2 3
```
``` sass [sass]
@debug a-1  // a-1
@debug 5px-3px  // 2px
@debug 5-3  // 2
@debug 1 -2 3  // 1 -2 3

$number: 2
@debug 1 -$number 3  // -1 3
@debug 1 (-$number) 3  // 1 -2 3
```
:::

## 除法

与其他数学运算不同，Sass 中的除法使用 [math.div()](https://sass-lang.com/documentation/modules/math#div) 函数执行。虽然许多编程语言使用 / 作为除法运算符，但在 CSS 中，/ 被用作分隔符（如 font: 15px/32px 或 hsl(120 100% 50% / 0.8)）。尽管 Sass 支持使用 / 作为除法运算符，但这已被弃用，并将在未来的版本中被移除。

### 使用斜杠分隔的值

在 Sass 仍然支持 / 作为除法运算符的同时，它必须有一种方式来区分 / 作为分隔符和 / 作为除法。为了使这个工作，如果两个数字之间有 /，Sass 会打印结果为斜杠分隔的而不是除法，除非满足以下条件之一：

* 表达式中的任一表达式除了字面数字以外的任何东西。
* 结果被存储在变量中或由函数返回。
* 除非这些括号在包含操作的列表之外，否则操作被括号包围。
* 结果被用作另一种操作的一部分（除 / 外）。

你可以使用 `[list.slash()]` 来强制使用 / 作为分隔符。

::: code-group
``` scss [scss]
@use "sass:list";

@debug 15px / 30px; // 15px/30px
@debug (10px + 5px) / 30px; // 0.5
@debug list.slash(10px + 5px, 30px); // 15px/30px

$result: 15px / 30px;
@debug $result; // 0.5

@function fifteen-divided-by-thirty() {
  @return 15px / 30px;
}
@debug fifteen-divided-by-thirty(); // 0.5

@debug (15px/30px); // 0.5
@debug (bold 15px/30px sans-serif); // bold 15px/30px sans-serif
@debug 15px/30px + 1; // 1.5
```
``` sass [sass]
@use "sass:list";

@debug 15px / 30px  // 15px/30px
@debug (10px + 5px) / 30px  // 0.5
@debug list.slash(10px + 5px, 30px)  // 15px/30px

$result: 15px / 30px
@debug $result  // 0.5

@function fifteen-divided-by-thirty()
  @return 15px / 30px

@debug fifteen-divided-by-thirty()  // 0.5

@debug (15px/30px)  // 0.5
@debug (bold 15px/30px sans-serif)  // bold 15px/30px sans-serif
@debug 15px/30px + 1  // 1.5
```
:::

## 单位

Sass具有强大的基于[现实世界单位计算](https://en.wikipedia.org/wiki/Unit_of_measurement#Calculations_with_units_of_measurement)方式操作单位的支持。当两个数相乘时，它们的单位也会相乘。当一个数被另一个数除时，结果的分子单位来自第一个数，分母单位来自第二个数。一个数字的分子和分母都可以有任意数量的单位。

::: code-group
``` scss [scss]
@debug 4px * 6px; // 24px*px (read "square pixels")
@debug math.div(5px, 2s); // 2.5px/s (read "pixels per second")

// 3.125px*deg/s*em (read "pixel-degrees per second-em")
@debug 5px * math.div(math.div(30deg, 2s), 24em); 

$degrees-per-second: math.div(20deg, 1s);
@debug $degrees-per-second; // 20deg/s
@debug math.div(1, $degrees-per-second); // 0.05s/deg
```
``` sass [sass]
@debug 4px * 6px  // 24px*px (read "square pixels")
@debug math.div(5px, 2s)  // 2.5px/s (read "pixels per second")

// 3.125px*deg/s*em (read "pixel-degrees per second-em")
@debug 5px * math.div(math.div(30deg, 2s), 24em)  

$degrees-per-second: math.div(20deg, 1s) 
@debug $degrees-per-second  // 20deg/s
@debug math.div(1, $degrees-per-second)  // 0.05s/deg
```
:::

::: warning 注意
因为 CSS 不支持像平方像素这样的复杂单位，因此在[属性值](../style-rules/declarations)中使用带有复杂单位的数字将产生错误。然而，这反而可以被看作是一种隐藏的功能；如果你得到的单位不正确，那通常意味着你的计算出现了问题！记住，你可以随时使用 [@debug 规则](../at-rules/debug)来检查任何变量或[表达式](../syntax/structure#表达式)的单位。
:::

Sass将自动在兼容的单位之间进行转换，尽管结果的单位选择将取决于你正在使用的Sass的实现。如果你试图结合不兼容的单位，比如 1in + 1em，Sass将会抛出一个错误。

::: code-group
``` scss [scss]
// CSS defines one inch as 96 pixels.
@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```
``` sass [sass]
// CSS defines one inch as 96 pixels.
@debug 1in + 6px  // 102px or 1.0625in

@debug 1in + 1s
//     ^^^^^^^^
// Error: Incompatible units s and in.
```
:::


在现实世界的单位计算中，如果分子中包含的单位与分母中的单位兼容（如math.div(96px, 1in)），它们将会被消除。这使得定义一个用于单位转换的比率变得容易。在下面的例子中，我们将期望的速度设置为每秒50像素，然后乘以过渡覆盖的像素数量来获得过渡应该花费的时间。

::: code-group
``` scss [scss]
$transition-speed: math.div(1s, 50px);

@mixin move($left-start, $left-stop) {
  position: absolute;
  left: $left-start;
  transition: left ($left-stop - $left-start) * $transition-speed;

  &:hover {
    left: $left-stop;
  }
}

.slider {
  @include move(10px, 120px);
}
```
``` sass [sass]
$transition-speed: math.div(1s, 50px)

@mixin move($left-start, $left-stop)
  position: absolute
  left: $left-start
  transition: left ($left-stop - $left-start) * $transition-speed

  &:hover
    left: $left-stop



.slider
  @include move(10px, 120px)
```
``` css [css]
.slider {
  position: absolute;
  left: 10px;
  transition: left 2.2s;
}
.slider:hover {
  left: 120px;
}
```
:::

::: warning 注意
如果你的算术运算得到的单位不对，你可能需要检查你的数学运算。你可能遗漏了应该带有单位的量！保持单位的正确性和一致性并且允许 Sass 在某些事情不对劲时给出有用的错误提示。

你尤其应该避免使用像 #{$number}px 这样的插值。这并没有真正创建一个数字！它创建了一个看起来像数字的[未加引号的字符串](../values/strings#未加引号的字符串)，但不会与任何[数字操作](./numeric)或[函数](https://sass-lang.com/documentation/modules/math)一起工作。尽量使你的数学运算保持单位的正确性和一致性，使得 $number 已经带有 px 单位，或者写 $number * 1px。
:::

::: warning 注意
在Sass中，百分比的工作方式与其他任何单位一样。它们与小数并不可互换，因为在CSS中，小数和百分比表示的是不同的含义。例如，50% 是一个单位为 % 的数字，Sass认为它与数字0.5是不同的。

你可以使用单位运算在小数和百分比之间进行转换。math.div($percentage, 100%) 将返回相应的小数，$decimal * 100% 将返回相应的百分比。你也可以使用[math.percentage()函数](https://sass-lang.com/documentation/modules/math#percentage)代替 $decimal * 100%，它是一种更明确的写法，。
:::