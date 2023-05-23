# 属性声明

在Sass和CSS中，属性声明定义了与选择器匹配的元素的样式。但Sass在此基础上增加了额外的功能，使编写属性声明更加简便，并支持自动化操作。首先，声明的值可以是任何[SassScript表达式](../syntax/structure#表达式)，Sass会计算该表达式并将结果包含在输出的CSS中。

::: code-group
``` scss [scss]
.circle {
  $size: 100px;
  width: $size;
  height: $size;
  border-radius: $size * 0.5;
}
```
``` sass [sass]
.circle
  $size: 100px
  width: $size
  height: $size
  border-radius: $size * 0.5
```
``` css [css]
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```
:::

## 插值

属性名可以包含[插值](../interpolation)，这使得可以根据需要动态生成属性名。你甚至可以对整个属性名进行插值！

::: code-group
``` scss [scss]
@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.gray {
  @include prefix(filter, grayscale(50%), moz webkit);
}
```
``` sass [sass]
@mixin prefix($property, $value, $prefixes)
  @each $prefix in $prefixes
    -#{$prefix}-#{$property}: $value

  #{$property}: $value


.gray
  @include prefix(filter, grayscale(50%), moz webkit)
```
``` css [css]
.gray {
  -moz-filter: grayscale(50%);
  -webkit-filter: grayscale(50%);
  filter: grayscale(50%);
}
```
:::

## 嵌套

许多CSS属性以相同的前缀开头，这些前缀相当于一种命名空间。例如，font-family、font-size和font-weight都以font-为前缀。为了简化编写过程并减少冗余，Sass允许将属性声明进行嵌套。外层属性名将添加到内层属性名，两者之间用连字符分隔。

::: code-group
``` scss [scss]
.enlarge {
  font-size: 14px;
  transition: {
    property: font-size;
    duration: 4s;
    delay: 2s;
  }

  &:hover { font-size: 36px; }
}
```
``` sass [sass]
.enlarge
  font-size: 14px
  transition:
    property: font-size
    duration: 4s
    delay: 2s

  &:hover
    font-size: 36px
```
``` css [css]
.enlarge {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
.enlarge:hover {
  font-size: 36px;
}
```
:::

一些CSS属性具有简写版本，这些简写版本将命名空间作为属性名。对于这类属性，你可以同时使用简写值和更详细的嵌套版本来书写样式。

::: code-group
``` scss [scss]
.info-page {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
}
```
``` sass [sass]
.info-page
  margin: auto
    bottom: 10px
    top: 2px
```
``` css [css]
.info-page {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 2px;
}
```
:::

## 隐式声明

有时候你可能只希望在某些情况下显示属性声明。如果属性声明的值为[null](../values/null)或[未加引号的字符串](../values/strings#未加引号的字符串)空值，Sass将不会将该声明编译到生成的CSS文件中。

::: code-group
``` scss [scss]
$rounded-corners: false;

.button {
  border: 1px solid black;
  border-radius: if($rounded-corners, 5px, null);
}
```
``` sass [sass]
$rounded-corners: false

.button
  border: 1px solid black
  border-radius: if($rounded-corners, 5px, null)
```
``` css [css]
.button {
  border: 1px solid black;
}
```
:::

## 自定义属性

[CSS自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)（也称为CSS变量）的特殊声明语法：它们的声明值允许包含几乎任何文本。此外，这些值可以被JavaScript访问，因此可能对用户具有实际意义。这包括通常会被解析为SassScript的值。

正因为如此，Sass对自定义属性声明的解析与其他属性声明的解析有所不同。所有令牌，包括看起来像SassScript的令牌，都将原样传递给CSS。唯一的例外是[插值](../interpolation)，这是将动态值注入自定义属性的唯一方法。

::: code-group
``` scss [scss]
$primary: #81899b;
$accent: #302e24;
$warn: #dfa612;

:root {
  --primary: #{$primary};
  --accent: #{$accent};
  --warn: #{$warn};

  // 尽管这看起来像一个Sass变量，但它是有效的CSS，所以它不被计算。
  --consumed-by-js: $primary;
}
```
``` sass [sass]
$primary: #81899b
$accent: #302e24
$warn: #dfa612

:root
  --primary: #{$primary}
  --accent: #{$accent}
  --warn: #{$warn}

  // 尽管这看起来像一个Sass变量，但它是有效的CSS，所以它不被计算。

  --consumed-by-js: $primary
```
``` css [css]
:root {
  --primary: #81899b;
  --accent: #302e24;
  --warn: #dfa612;
  --consumed-by-js: $primary;
}
```
:::

::: warning 注意
不幸地是[插值](../interpolation)会从字符串中移除引号，这让使得用引号字符串作为自定义属性值变得很困难。为了解决这个问题，可以使用Sass的[meta.inspect()函数](https://sass-lang.com/documentation/modules/meta#inspect)来保留字符串的引号。

::: code-group
``` scss [scss]
@use "sass:meta";

$font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas;

:root {
  --font-family-sans-serif: #{meta.inspect($font-family-sans-serif)};
  --font-family-monospace: #{meta.inspect($font-family-monospace)};
}
```
``` sass [sass]
@use "sass:meta"

$font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas

:root
  --font-family-sans-serif: #{meta.inspect($font-family-sans-serif)}
  --font-family-monospace: #{meta.inspect($font-family-monospace)}
```
``` css [css]
:root {
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas;
}
```
:::
:::

