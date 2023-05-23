# Lists

列表包含一系列其他值。在 Sass 中，列表中的元素可以用逗号（Helvetica, Arial, sans-serif）、空格（10px 15px 0 0）或[斜杠](#用斜杠分割列表)分隔，只要在列表中保持一致即可。与大多数其他语言不同，Sass 中的列表不需要特殊的括号；任何用空格或逗号分隔的[表达式](../syntax/structure#表达式)都被视为列表。然而，您可以使用方括号编写列表（[line1 line2]），在使用 [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) 时很有用。

Sass 列表可以包含一个甚至零个元素。单元素列表可以写成`（<expression>,）`或 `[<expression>]`，而零元素列表可以写成 `()` 或 `[]`。此外，所有[列表函数](https://sass-lang.com/documentation/modules/list)都会将不在列表中的单个值视为包含该值的列表，这意味着您很少需要显式创建单元素列表。

::: warning 注意

没有括号的空列表在 CSS 中是无效的，因此 Sass 不允许您在属性值中使用没有括号的空列表。
:::

## 用斜杠分割列表


在 Sass 中，列表可以用斜杠分隔，表示像 font: 12px/30px 这样的值，这是设置字体大小和行高的简写，或者使用 hsl(80 100% 50% / 0.5) 语法创建具有给定不透明度值的颜色。然而，**目前不能直接编写斜杠分隔的列表**。Sass 历史上使用 / 字符表示除法，所以在现有样式表过渡到使用 [math.div()](https://sass-lang.com/documentation/modules/math#div) 时，斜杠分隔的列表只能使用 [list.slash()](https://sass-lang.com/documentation/modules/list#slash) 编写。

更多详细信息，请参阅[破坏性变化：作为除法的斜杠](https://sass-lang.com/documentation/breaking-changes/slash-div)。

## 使用列表

Sass 提供了一些函数，使您可以使用列表编写强大的样式库，或者使您的应用程序的样式表更整洁、易于维护。

### 索引

这些函数中的许多接受或返回数字，称为索引，它们指代列表中的元素。索引 1 表示列表中的第一个元素。请注意，这与许多编程语言中索引从 0 开始不同！Sass 还可以轻松地引用列表的末尾。索引 -1 指代列表中的最后一个元素，-2 指代倒数第二个元素，依此类推。

### 访问元素

如果无法从列表中获取值，那么列表就没有太大用处。您可以使用 [list.nth($list, $n) 函数](https://sass-lang.com/documentation/modules/list#nth)在列表中获取给定索引处的元素。第一个参数是列表本身，第二个参数是要获取的值的索引。

::: code-group
``` scss [scss]
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```
``` sass [sass]
@debug list.nth(10px 12px 16px, 2)  // 12px
@debug list.nth([line1, line2, line3], -1)  // line3
```
:::

### 为每个元素做一些事情

这实际上并没有使用函数，但它仍然是使用列表的最常见方法之一。[@each 规则](../at-rules/control/each)为列表中的每个元素评估一组样式，并将该元素分配给一个变量。

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

### 添加到列表

向列表中添加元素也很有用。[list.append($list, $val) 函数](https://sass-lang.com/documentation/modules/list#append)接受一个列表和一个值，并返回一个将值添加到末尾的列表副本。请注意，由于 Sass 列表是[不可变的](#不可变性)，它不会修改原始列表。

::: code-group
``` scss [scss]
@debug append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```
``` sass [sass]
@debug append(10px 12px 16px, 25px)  // 10px 12px 16px 25px
@debug append([col1-line1], col1-line2)  // [col1-line1, col1-line2]
```
:::

### 在列表中查找元素

如果您需要检查列表中是否包含某个元素或者找出它的索引位置，可以使用 [list.index($list, $value) 函数](https://sass-lang.com/documentation/modules/list#index)。这个函数接受一个列表和要在该列表中定位的值，并返回该值的索引。

::: code-group
``` scss [scss]
@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```
``` sass [sass]
@debug list.index(1px solid red, 1px)  // 1
@debug list.index(1px solid red, solid)  // 2
@debug list.index(1px solid red, dashed)  // null
```
:::


如果列表中完全没有该值，list.index() 将返回 [null](./null)。由于 null 是[假值](../at-rules/control/if#真值和假值)，您可以使用 list.index() 与 [@if](../at-rules/control/if) 或 [if()](https://sass-lang.com/documentation/modules#if) 一起检查列表是否包含给定值。

::: code-group
``` scss [scss]
@use "sass:list";

$valid-sides: top, bottom, left, right;

@mixin attach($side) {
  @if not list.index($valid-sides, $side) {
    @error "#{$side} is not a valid side. Expected one of #{$valid-sides}.";
  }

  // ...
}
```
``` sass [sass]
@use "sass:list"

$valid-sides: top, bottom, left, right

@mixin attach($side)
  @if not list.index($valid-sides, $side)
    @error "#{$side} is not a valid side. Expected one of #{$valid-sides}."


  // ...
```
:::

## 不可变性

Sass 中的列表是不可变的，这意味着列表值的内容永远不会改变。Sass 的列表函数都返回新列表，而不是修改原始列表。不可变性有助于避免许多难以捉摸的错误，这些错误可能在同一列表在样式表的不同部分共享时出现。

尽管如此，您仍然可以通过将新列表分配给相同的变量来随时间更新状态。这通常用于函数和混混入中，将一堆值收集到一个列表中。

::: code-group
``` scss [scss]
@use "sass:list";
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@function prefixes-for-browsers($browsers) {
  $prefixes: ();
  @each $browser in $browsers {
    $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser));
  }
  @return $prefixes;
}

@debug prefixes-for-browsers("firefox" "ie"); // moz ms
```
``` sass [sass]
@use "sass:list"
@use "sass:map"

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms)

@function prefixes-for-browsers($browsers)
  $prefixes: ()
  @each $browser in $browsers
    $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser))

  @return $prefixes


@debug prefixes-for-browsers("firefox" "ie")  // moz ms
```
``` css [css]
```
:::

## 参数列表

当您声明一个接受[任意参数](../at-rules/mixin#传递任意参数)的混混入或函数时，您得到的值是一个称为参数列表的特殊列表。它的行为就像一个包含传递给混混入或函数的所有参数的列表，具有一个额外的特性：如果用户传递了关键字参数，那么可以通过将参数列表传递给 [meta.keywords() 函数](https://sass-lang.com/documentation/modules/meta#keywords)作为映射来访问它们。

::: code-group
``` scss [scss]
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```
``` sass [sass]
@use "sass:meta"

@mixin syntax-colors($args...)
  @debug meta.keywords($args)
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args)
    pre span.stx-#{$name}
      color: $color




@include syntax-colors($string: #080, $comment: #800, $variable: #60b)
```
``` css [css]
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```
:::


