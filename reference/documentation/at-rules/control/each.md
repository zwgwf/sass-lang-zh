# @each

@each 规则用于轻松地为列表中的每个元素或映射中的每对键值设置样式或执行代码。它非常适用于在不同之间仅有少量变化的重复样式。通常，@each 规则的写法是 `@each <variable> in <expression> { ... }`，其中表达式返回一个列表。代码块将针对列表中的每个元素依次进行执行，并将结果分配给给定的变量名。

::: code-group
``` scss [scss]
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```
``` sass [sass]
$sizes: 40px, 50px, 80px

@each $size in $sizes
  .icon-#{$size}
    font-size: $size
    height: $size
    width: $size
```
``` css [css]
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```
:::

## 对映射使用@each

通过编写 `@each <variable>, <variable> in <expression> { ... }` 的形式，可以实现遍历映射中的每个键值对。键会被分配给第一个变量名，值会被分配给第二个变量名。

::: code-group
``` scss [scss]
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}

```
``` sass [sass]
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f")

@each $name, $glyph in $icons
  .icon-#{$name}:before
    display: inline-block
    font-family: "Icon Font"
    content: $glyph
```
``` css [css]
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}
```
:::

## 解构

当你有一个由多个列表组成的列表时，如何使用 @each 规则来自动为内部列表的每个值分配变量？通过编写 `@each <variable...> in <expression> { ... }` 的形式，你可以实现这个功能。这种方法被称为解构，因为变量的结构与内部列表的结构相匹配。每个变量名会被分配给列表中相应位置的值，如果列表没有足够的值，则被分配为 null。这样，你可以在代码块中使用这些变量来表示内部列表的各个值。

::: code-group
``` scss [scss]
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```
``` sass [sass]
$icons: "eye" "\f112" 12px, "start" "\f12e" 16px, "stop" "\f12f" 10px




@each $name, $glyph, $size in $icons
  .icon-#{$name}:before
    display: inline-block
    font-family: "Icon Font"
    content: $glyph
    font-size: $size
```
``` css [css]
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 12px;
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 16px;
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 10px;
}
```
:::

::: tip 提示
由于 @each 支持解构，并且将[映射(map)视为由列表组成的列表](../../values/maps)，所以 @each 在处理映射时不需要特别的支持。
:::