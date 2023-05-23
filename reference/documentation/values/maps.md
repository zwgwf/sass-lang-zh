# 映射

Sass 中的映射包含键值对，并且可以轻松地通过相应的键查找值。它们写作`(<expression>: <expression>, <expression>: <expression>)`。冒号前的[表达式](../syntax/structure#表达式)是键，冒号后的表达式是与该键关联的值。键必须是唯一的，但值可以重复。与[列表](./lists)不同，映射必须用括号括起来。一个没有键值对的映射写作 ()。

::: tip 提示
敏锐的读者可能会注意到，空映射 () 的写法与空列表相同。这是因为它既可以算作映射也可以算作列表。实际上，所有映射都可以算作列表！每个映射都可以算作一个列表，其中包含每个键/值对的两个元素列表。例如，(1: 2, 3: 4) 可以算作 (1 2, 3 4)。
:::

映射允许将任何 Sass 值用作其键。使用 == 运算符确定两个键是否相同。

::: warning 注意
大多数时候，最好使用加引号的字符串而不是未加引号的字符串的字符串作为映射键。这是因为一些值，如颜色名称，可能看起来像未加引号的字符串的字符串，但实际上是其他类型。为了避免后续出现混淆问题，请使用引号！
:::

## 使用映射


由于映射不是有效的 CSS 值，它们本身并没有太多作用。这就是为什么 Sass 提供了一系列[函数](https://sass-lang.com/documentation/modules/map)来创建映射并访问它们包含的值。

### 查找值

映射的核心在于关联键和值，因此自然有一种方法可以获得与键相关联的值：[map.get($map, $key) 函数](https://sass-lang.com/documentation/modules/map#get)！这个函数返回与给定键关联的映射中的值。如果映射不包含该键，它将返回 [null](./null)。

::: code-group
``` scss [scss]
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null
```
``` sass [sass]
$font-weights: ("regular": 400, "medium": 500, "bold": 700)

@debug map.get($font-weights, "medium")  // 500
@debug map.get($font-weights, "extra-bold")  // null
```
:::

### 为每一对键值做些什么

这实际上并没有使用函数，但仍然是使用映射的最常见方式之一。[@each 规则](../at-rules/control/each)为映射中的每一对键/值对评估一组样式。键和值被分配给变量，以便在块中轻松访问。

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
SASS SYNTAX
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

### 添加到映射中

向映射中添加新的键值对，或替换现有键的值，也是很有用的。[map.set($map, $key, $value) 函数](https://sass-lang.com/documentation/modules/map#set)就能完成这个操作：它返回一个 $map 的副本，其中 $key 的值设置为 $value。

::: code-group
``` scss [scss]
@use "sass:map";

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "extra-bold", 900);
// ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
@debug map.set($font-weights, "bold", 900);
// ("regular": 400, "medium": 500, "bold": 900)
```
``` sass [sass]
@use "sass:map"

$font-weights: ("regular": 400, "medium": 500, "bold": 700)

@debug map.set($font-weights, "extra-bold": 900)
// ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
@debug map.set($font-weights, "bold", 900)
// ("regular": 400, "medium": 500, "bold": 900)
```
:::

你也可以使用 map.merge($map1, $map2) 合并两个已存在的映射，而不是一次设置一个值。

::: code-group
``` scss [scss]
@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```
``` sass [sass]
@use "sass:map"

$light-weights: ("lightest": 100, "light": 300)
$heavy-weights: ("medium": 500, "bold": 700)

@debug map.merge($light-weights, $heavy-weights)
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```
:::

如果两个映射具有相同的键，则在返回的映射中使用第二个映射的值

::: code-group
``` scss [scss]
@use "sass:map";

$weights: ("light": 300, "medium": 500);

@debug map.merge($weights, ("medium": 700));
// ("light": 300, "medium": 700)
```
``` sass [sass]
@use "sass:map";

$weights: ("light": 300, "medium": 500)

@debug map.merge($weights, ("medium": 700))
// ("light": 300, "medium": 700)
```
:::

请注意，因为 Sass 映射是不可变的， map.set() 和 map.merge() 不会修改原始列表。

## 不可变性

Sass 中的映射是不可变的，这意味着映射值的内容永远不会改变。Sass 的映射函数都返回新映射，而不是修改原始映射。不可变性有助于避免许多难以捉摸的错误，这些错误可能在同一映射在样式表的不同部分共享时出现。

尽管如此，您仍然可以通过将新映射分配给相同的变量来随时间更新状态。这通常用于函数和混入中，将一堆值收集到一个映射中。

::: code-group
``` scss [scss]
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@mixin add-browser-prefix($browser, $prefix) {
  $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global;
}

@include add-browser-prefix("opera", o);
@debug $prefixes-by-browser;
// ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
```
``` sass [sass]
@use "sass:map"

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms)

@mixin add-browser-prefix($browser, $prefix)
  $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global


@include add-browser-prefix("opera", o)
@debug $prefixes-by-browser
// ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
```
:::