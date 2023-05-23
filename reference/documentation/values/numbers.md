# Numbers

在 Sass 中，数字有两个组成部分：数字本身和单位。例如，在 16px 中，数字是 16，单位是 px。数字可以没有单位，也可以有复杂的单位。有关更多详细信息，请参阅下文的“[单位](#单位)”部分。

::: code-group
``` scss [scss]
@debug 100; // 100
@debug 0.8; // 0.8
@debug 16px; // 16px
@debug 5px * 2px; // 10px*px (read "square pixels")
```
``` sass [sass]
@debug 100  // 100
@debug 0.8  // 0.8
@debug 16px  // 16px
@debug 5px * 2px  // 10px*px (read "square pixels")
```
:::

Sass 数字支持与 CSS 数字相同的格式，包括[科学计数法](https://en.wikipedia.org/wiki/Scientific_notation)，在数字和 10 的幂之间写上 e 来表示。由于浏览器对科学计数法的支持历史上一直不稳定，因此 Sass 始终将其编译为完全展开的数字。这意味着 Sass 在生成 CSS 时会将科学计数法表示的数字转换为常规数字表示法，以确保浏览器能正确解析和显示它们。

::: code-group
``` scss [scss]
@debug 5.2e3; // 5200
@debug 6e-2; // 0.06
```
``` sass [sass]
@debug 5.2e3  // 5200
@debug 6e-2  // 0.06
```
:::

::: warning 提醒
Sass 不区分整数和小数，所以例如 math.div(5, 2) 返回的是 2.5 而不是 2。这与 JavaScript 的行为相同，但与许多其他编程语言不同。
:::

## 单位


Sass 对单位的操作有强大的支持，基于[现实世界中单位计算](https://en.wikipedia.org/wiki/Unit_of_measurement#Calculations_with_units_of_measurement)的原理。当两个数字相乘时，它们的单位也会相乘。当一个数字除以另一个数字时，结果的分子单位来自第一个数字，分母单位来自第二个数字。一个数字在分子和/或分母中可以有任意数量的单位。

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
由于 CSS 不支持像平方像素这样的复杂单位，将具有复杂单位的数字作为[属性值](../style-rules/declarations)会产生错误。然而，这实际上是一个隐藏的功能；如果最终没有得到正确的单位，通常意味着您的计算有问题！请记住，您可以随时使用 [@debug 规则](../at-rules/debug)来检查任何变量或[表达式](../syntax/structure#表达式)的单位
:::

Sass 会自动在兼容的单位之间进行转换，但结果选择的单位取决于你使用的 Sass 实现。如果尝试将不兼容的单位组合在一起，比如 1in + 1em，Sass 将抛出错误。

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


在现实世界的单位计算中，如果分子包含与分母兼容的单位（如 math.div(96px, 1in)），它们会抵消。这使得定义一个可以用于转换单位的比率变得简单。在下面的示例中，我们将所需的速度设置为每秒 50 像素，然后将其乘以过渡覆盖的像素数量以获得所需的时间。

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
如果你的算术计算得到的单位是错误的，你可能需要检查你的数学运算。你可能遗漏了应该有单位的数值！保持单位的准确性可以让 Sass 在出现问题时给出有用的错误提示。

你应该特别避免使用类似 #{$number}px 的插值。这实际上并没有创建一个数字！它创建了一个看起来像数字的[未加引号的字符串](./strings#未加引号的字符串)，但不能用于任何[数字操作](../operators/numeric)或[函数](https://sass-lang.com/documentation/modules/math)。尽量使你的数学运算保持单位完整，以便 $number 已经具有单位 px，或者写成 $number * 1px。
:::

::: warning 注意
在 Sass 中，百分比的工作方式与其他单位相同。它们不能与小数互换，因为在 CSS 中，小数和百分比具有不同的含义。例如，50% 是一个带有 % 单位的数字，Sass 认为它与数字 0.5 是不同的。

你可以使用单位算术在小数和百分比之间进行转换。math.div($percentage, 100%) 将返回相应的小数，而 $decimal * 100% 将返回相应的百分比。你还可以使用 math.percentage() 函数作为编写 $decimal * 100% 的更明确方式。
:::

## 精度

Sass 数字在内部表示为 64 位浮点值。在序列化为 CSS 以及用于等式计算时，它们支持小数点后最多 10 位的精度。这意味着几个不同的事情：

* 生成的 CSS 中只会包含小数点后的前十位数字。
* 类似 == 和 >= 的操作将把两个数字视为等效，如果它们在小数点后的第十位上是相同的。
* 如果一个数字距离一个整数小于 0.0000000001，那么对于需要整数参数的函数（如 [list.nth()](https://sass-lang.com/documentation/modules/list#nth)），它将被视为整数。

::: code-group
``` scss [scss]
@debug 0.012345678912345; // 0.0123456789
@debug 0.01234567891 == 0.01234567899; // true
@debug 1.00000000009; // 1
@debug 0.99999999991; // 1
```
``` sass [sass]
@debug 0.012345678912345  // 0.0123456789
@debug 0.01234567891 == 0.01234567899  // true
@debug 1.00000000009  // 1
@debug 0.99999999991  // 1
```
:::

::: tip 提示
数字在需要精确度的地方会懒惰地舍入到10位有效数字。这意味着数学函数在内部会使用完整的数字值来避免累积额外的舍入误差。
:::