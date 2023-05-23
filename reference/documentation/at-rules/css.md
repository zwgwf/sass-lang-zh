# CSS @规则

 Sass 支持 CSS 中的所有 @规则 。为了保持灵活性并与未来的 CSS 版本兼容，Sass 默认提供了涵盖几乎所有 @规则 的通用支持。CSS 的 @规则 可以写成如下格式：`@<name> <value>`、`@<name> { ... }` 或 `@<name> <value> { ... }`。名称必须是一个标识符，值（如果存在）可以是几乎任何内容。名称和值都可以包含[插值](../interpolation)。

 ::: code-group
``` scss [scss]
@namespace svg url(http://www.w3.org/2000/svg);

@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}

@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
}
```
``` sass [sass]
@namespace svg url(http://www.w3.org/2000/svg)

@font-face
  font-family: "Open Sans"
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2")

@counter-style thumbs
  system: cyclic
  symbols: "\1F44D"
```
``` css [css]
@namespace svg url(http://www.w3.org/2000/svg);
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}
@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
}
```
:::

如果一个 CSS @规则嵌套在一个样式规则内，它们会自动互换位置，使得 @规则 处于 CSS 输出的顶层，而样式规则则在其中。这样可以轻松地添加条件样式，而无需重写样式。

::: code-group
``` scss [scss]
.print-only {
  display: none;

  @media print { display: block; }
}
```
``` sass [sass]
.print-only
  display: none

  @media print
    display: block
```
``` css [css]
.print-only {
  display: none;
}
@media print {
  .print-only {
    display: block;
  }
}
```
:::

## @media

[@media 规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries)不仅允许插值（interpolation），还允许在[特征查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries#%E5%AE%9A%E4%BD%8D%E5%AA%92%E4%BD%93%E7%89%B9%E6%80%A7)中直接使用 [SassScript 表达式](../syntax/structure#表达式)。

::: code-group
``` scss [scss]
$layout-breakpoint-small: 960px;

@media (min-width: $layout-breakpoint-small) {
  .hide-extra-small {
    display: none;
  }
}
```
``` sass [sass]
$layout-breakpoint-small: 960px

@media (min-width: $layout-breakpoint-small)
  .hide-extra-small
    display: none
```
``` css [css]
@media (min-width: 960px) {
  .hide-extra-small {
    display: none;
  }
}
```
:::

Sass 会尽可能的合并嵌套在彼此之间的媒体查询，以便更容易地支持尚未原生支持嵌套 @media 规则的浏览器。

::: code-group
``` scss [scss]
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;

    @media (color) {
      border-color: #036;
    }
  }
}
```
``` sass [sass]
@media (hover: hover)
  .button:hover
    border: 2px solid black

    @media (color)
      border-color: #036
```
``` css [css]
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;
  }
}
@media (hover: hover) and (color) {
  .button:hover {
    border-color: #036;
  }
}
```
:::

## @supports

[`@supports` 规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)允许在声明查询中使用 SassScript 表达式。

::: code-group
``` scss [scss]
@mixin sticky-position {
  position: fixed;
  @supports (position: sticky) {
    position: sticky;
  }
}

.banner {
  @include sticky-position;
}
```
``` sass [sass]
@mixin sticky-position
  position: fixed
  @supports (position: sticky)
    position: sticky



.banner
  @include sticky-position
```
``` css [css]
.banner {
  position: fixed;
}
@supports (position: sticky) {
  .banner {
    position: sticky;
  }
}

```
:::

## @keyframes

[@keyframes 规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)的工作方式与一般的 @规则 类似，但它的子规则必须是有效的关键帧规则（如 `<number>%`、`from` 或 `to`），而不是普通的选择器。

::: code-group
``` scss [scss]
@keyframes slide-in {
  from {
    margin-left: 100%;
    width: 300%;
  }

  70% {
    margin-left: 90%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
``` sass [sass]
@keyframes slide-in
  from
    margin-left: 100%
    width: 300%


  70%
    margin-left: 90%
    width: 150%


  to
    margin-left: 0%
    width: 100%
```
``` css [css]

@keyframes slide-in {
  from {
    margin-left: 100%;
    width: 300%;
  }
  70% {
    margin-left: 90%;
    width: 150%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
:::