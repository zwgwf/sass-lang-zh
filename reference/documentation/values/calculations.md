# 运算

计算（calculations）是Sass表示calc()函数以及类似函数如clamp()、min()和max()的方式。Sass会尽可能简化这些计算，即使它们相互组合在一起也是如此。

::: code-group
``` scss [scss]
@debug calc(400px + 10%); // calc(400px + 10%)
@debug calc(400px / 2); // 200px
@debug min(100px, calc(1rem + 10%)); // min(100px, 1rem + 10%)
```
``` sass [sass]
@debug calc(400px + 10%)  // calc(400px + 10%)
@debug calc(400px / 2)  // 200px
@debug min(100px, calc(1rem + 10%) ; // min(100px, 1rem + 10%)
```
:::


计算使用一种与普通SassScript不同的特殊语法。它与CSS的calc()使用相同的语法，但额外具有使用[Sass变量](../variables)和调用[Sass函数](https://sass-lang.com/documentation/modules)的能力。这意味着在计算中，/ 符号始终表示除法运算符！

::: tip 提示
Sass函数调用的参数使用普通的Sass语法，而不是特殊的计算语法！
:::

您还可以在计算中使用[插值](../interpolation)。但是，如果这样做，插值周围的括号中的内容不会被简化或进行类型检查，因此很容易得到额外冗长甚至无效的CSS。与其编写calc(10px + #{$var})，不如直接编写calc(10px + $var)！

## 简化

Sass会在计算中简化相邻的操作，如果它们使用的单位可以在编译时进行组合，例如1in + 10px或5s * 2。如果可能，它甚至会将整个计算简化为单个数字，例如clamp(0px, 30px, 20px)将返回20px

::: warning 注意
这意味着计算表达式不一定总是返回一个计算！如果您正在编写一个Sass库，您可以始终使用[meta.type-of()](https://sass-lang.com/documentation/modules/meta#type-of)函数来确定您正在处理的类型。
:::

在其他计算中，计算也会被简化。特别是，如果calc()出现在任何其他计算中，函数调用将被删除，并替换为普通的操作。

::: code-group
``` scss [scss]
$width: calc(400px + 10%);

.sidebar {
  width: $width;
  padding-left: calc($width / 4);
}
```
``` sass [sass]
$width: calc(400px + 10%)

.sidebar
  width: $width
  padding-left: calc($width / 4)
```
``` css [css]
.sidebar {
  width: calc(400px + 10%);
  padding-left: calc($width / 4);
}
```
:::

## 操作

在普通的SassScript操作（如+和*）中，您不能使用计算。如果您想编写一些允许计算的数学函数，只需将它们写在自己的calc()表达式中——如果它们传入一组具有兼容单位的数字，它们也会返回普通的数字；如果它们传入计算，它们将返回计算。

这个限制是为了确保如果不想使用计算，它们会尽快抛出错误。计算不能在所有纯数字可以使用的地方使用：例如，它们不能插入到CSS标识符（如.item-#{$n}）中，也不能传递给Sass的内置[数学函数](https://sass-lang.com/documentation/modules/math)。将SassScript操作保留给纯数字清楚地表明了计算允许和不允许的具体位置。

::: code-group
``` scss [scss]
$width: calc(100% + 10px);
@debug $width * 2; // Error!
@debug calc($width * 2); // calc((100% + 10px) * 2);
```
``` sass [sass]
$width: calc(100% + 10px)
@debug $width * 2 // Error!
@debug calc($width * 2); // calc((100% + 10px) * 2)
```
:::

## 常量

计算还可以包含常量，常量以CSS标识符的形式编写。为了与未来的CSS规范保持向前兼容，所有标识符都是允许的，默认情况下它们只被视为未引用的字符串，按原样传递。

::: code-group
``` scss [scss]
@debug calc(h + 30deg); // calc(h + 30deg);
```
``` sass [sass]
@debug calc(h + 30deg)  // calc(h + 30deg)
```
:::

Sass会自动解析CSS中指定的一些特殊常量名称，并将它们解析为无单位的数字：

pi是[数学常量π](https://en.wikipedia.org/wiki/Pi)的简写。

e是[数学常量e](https://en.wikipedia.org/wiki/E_(mathematical_constant))的简写。

infinity、-infinity和NaN表示相应的浮点数值。

::: code-group
``` scss [scss]
@use 'sass:math';

@debug calc(pi); // 3.1415926536
@debug calc(e);  // 2.7182818285
@debug calc(infinity) > math.$max-number;  // true
@debug calc(-infinity) < math.$min-number; // true
```
``` sass [sass]
@use 'sass:math'

@debug calc(pi)  // 3.1415926536
@debug calc(e)   // 2.7182818285
@debug calc(infinity) > math.$max-number   // true
@debug calc(-infinity) < math.$min-number  // true
```
:::

# mix() 和 max()

在CSS的Values and Units Level 4中，添加了对[min()和max()函数](https://drafts.csswg.org/css-values-4/#calc-notation)的支持，这些函数很快被Safari采用[以支持iPhoneX](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)。但是，在此之前，Sass就支持了自己的[min()](https://sass-lang.com/documentation/modules/math#min)和[max()](https://sass-lang.com/documentation/modules/math#max)函数，并且需要与所有现有的样式表保持向后兼容。这导致了对额外特殊的语法技巧的需求。

如果min()或max()函数调用是一个有效的计算表达式，它将被解析为计算。但是，一旦调用的任何部分包含在计算中不支持的SassScript功能，比如[取模运算符](../operators/numeric)，它将被解析为对Sass的核心min()或max()函数的调用。

由于计算在可能的情况下会被简化为数字，因此唯一实质性的区别是Sass函数仅支持在构建时可以组合的单位，因此min(12px % 10, 10%)将引发错误。

::: warning 注意
其他计算不允许无单位的数字与带单位的数字进行加法、减法或比较。但是min()和max()函数是不同的：为了与全局的Sass min()和max()函数向后兼容（出于历史原因，允许单位/无单位混合），只要它们直接包含在min()或max()计算中，这些单位可以混合使用。
:::

::: code-group
``` scss [scss]
SCSS SYNTAX
$padding: 12px;

.post {
  // Since these max() calls are valid calculation expressions, they're
  // parsed as calculations.
  padding-left: max($padding, env(safe-area-inset-left));
  padding-right: max($padding, env(safe-area-inset-right));
}

.sidebar {
  // Since these use the SassScript-only modulo operator, they're parsed as
  // SassScript function calls.
  padding-left: max($padding % 10, 20px);
  padding-right: max($padding % 10, 20px);
}
```
``` sass [sass]
$padding: 12px

.post
  // Since these max() calls are valid calculation expressions, they're
  // parsed as calculations.
  padding-left: max($padding, env(safe-area-inset-left))
  padding-right: max($padding, env(safe-area-inset-right))


.sidebar
  // Since these use the SassScript-only modulo operator, they're parsed as
  // SassScript function calls.
  padding-left: max($padding % 10, 20px)
  padding-right: max($padding % 10, 20px)
```
``` css [css]
.post {
  padding-left: max(12px, env(safe-area-inset-left));
  padding-right: max(12px, env(safe-area-inset-right));
}

.sidebar {
  padding-left: 20px;
  padding-right: 20px;
}
```
:::