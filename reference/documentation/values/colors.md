# @colors

Sass 内置了对颜色值的支持。与 CSS 颜色一样，它们表示 [sRGB 颜色空间](https://en.wikipedia.org/wiki/SRGB)中的点，尽管许多 Sass [颜色函数](https://sass-lang.com/documentation/modules/color)使用 [HSL 坐标](https://en.wikipedia.org/wiki/HSL_and_HSV)进行操作（这只是表示 sRGB 颜色的另一种方式）。Sass 颜色可以用十六进制代码（#f2ece4 或 #b37399aa）、[CSS 颜色名称](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)（midnightblue、transparent）或函数 [rgb()](https://sass-lang.com/documentation/modules#rgb)、[rgba()](https://sass-lang.com/documentation/modules#rgba)、[hsl()](https://sass-lang.com/documentation/modules#hsl) 和 [hsla()](https://sass-lang.com/documentation/modules#hsla) 编写。

::: code-group
``` scss [scss]
@debug #f2ece4; // #f2ece4
@debug #b37399aa; // rgba(179, 115, 153, 67%)
@debug midnightblue; // #191970
@debug rgb(204, 102, 153); // #c69
@debug rgba(107, 113, 127, 0.8); // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%); // #dadbdf
@debug hsla(20, 20%, 85%, 0.7); // rgb(225, 215, 210, 0.7)
```
``` sass [sass]
@debug #f2ece4  // #f2ece4
@debug #b37399aa  // rgba(179, 115, 153, 67%)
@debug midnightblue  // #191970
@debug rgb(204, 102, 153)  // #c69
@debug rgba(107, 113, 127, 0.8)  // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%)  // #dadbdf
@debug hsla(20, 20%, 85%, 0.7)  // rgb(225, 215, 210, 0.7)
```
:::

::: tip 提示
无论 Sass 颜色最初是如何编写的，它都可以与基于 HSL 和基于 RGB 的函数一起使用！
:::

CSS 支持许多不同的格式，它们都可以表示相同的颜色：颜色名称、十六进制代码和[功能表示法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)。Sass 选择将颜色编译成哪种格式取决于颜色本身、原始样式表中的编写方式以及当前的输出模式。由于可能有很大的不同，样式表作者不应依赖于他们编写的颜色的任何特定输出格式。

Sass 支持许多有用的[颜色函数](https://sass-lang.com/documentation/modules/color)，可以通过将[颜色混合在一起](https://sass-lang.com/documentation/modules/color#mix)或[缩放它们的色调、饱和度或亮度](https://sass-lang.com/documentation/modules/color#scale)来根据现有颜色创建新颜色。

::: code-group
``` scss [scss]
$venus: #998099;

@debug scale-color($venus, $lightness: +15%); // #a893a8
@debug mix($venus, midnightblue); // #594d85
```
``` sass [sass]
$venus: #998099

@debug scale-color($venus, $lightness: +15%)  // #a893a8
@debug mix($venus, midnightblue)  // #594d85
```
:::