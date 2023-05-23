# null

值null是其类型中唯一的值。它表示缺少值，并且通常由[函数](../at-rules/function)返回以指示缺少结果。

::: code-group
``` scss [scss]
@use "sass:map";
@use "sass:string";

@debug string.index("Helvetica Neue", "Roboto"); // null
@debug map.get(("large": 20px), "small"); // null
@debug &; // null
```
``` sass [sass]
@use "sass:map"
@use "sass:string"

@debug string.index("Helvetica Neue", "Roboto")  // null
@debug map.get(("large": 20px), "small")  // null
@debug &  // null
```
:::

如果一个[列表](./lists)中包含null，则生成的CSS中将省略该null。

::: code-group
``` scss [scss]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

h3 {
  font: 18px bold map-get($fonts, "sans");
}
```
``` sass [sass]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas")

h3
  font: 18px bold map-get($fonts, "sans")
```
``` css [css]
h3 {
  font: 18px bold;
}
```
:::

如果属性值为null，则该属性将完全省略。

::: code-group
``` scss [scss]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

h3 {
  font: {
    size: 18px;
    weight: bold;
    family: map-get($fonts, "sans");
  }
}
```
``` sass [sass]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas")

h3
  font:
    size: 18px
    weight: bold
    family: map-get($fonts, "sans")
```
``` css [css]
h3 {
  font-size: 18px;
  font-weight: bold;
}

```
:::

null也是假值（falsey），这意味着对于任何接受布尔值的规则或运算符，它都被视为false。这使得将可以为null的值用作@if和if()的条件变得很容易。

::: code-group
``` scss [scss]
@mixin app-background($color) {
  #{if(&, '&.app-background', '.app-background')} {
    background-color: $color;
    color: rgba(#fff, 0.75);
  }
}

@include app-background(#036);

.sidebar {
  @include app-background(#c6538c);
}
```
``` sass [sass]
@mixin app-background($color)
  #{if(&, '&.app-background', '.app-background')}
    background-color: $color
    color: rgba(#fff, 0.75)



@include app-background(#036)

.sidebar
  @include app-background(#c6538c)
```
``` css [css]
.app-background {
  background-color: #036;
  color: rgba(255, 255, 255, 0.75);
}

.sidebar.app-background {
  background-color: #c6538c;
  color: rgba(255, 255, 255, 0.75);
}

```
:::