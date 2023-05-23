# 概览

样式规则是Sass和CSS的共同基础，工作原理也是一样的：使用选择器选择要设置样式的元素，然后[声明](./declarations)影响这些元素外观的属性。

::: code-group
```scss [scss]
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```
```sass [sass]
.button
  padding: 3px 10px
  font-size: 12px
  border-radius: 3px
  border: 1px solid #e1e4e8
```
```css [css]
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```
:::

## 嵌套

Sass带来的便利之处，即支持嵌套样式规则。与重复编写相同的选择器不同，Sass允许在一个样式规则内部编写另一个样式规则。Sass会自动将外部规则的选择器与内部规则的选择器进行组合。

::: code-group
```scss [scss]
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
```sass [sass]
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
```
```css [css]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
:::

::: warning 注意
嵌套规则非常有用，因为它们可以简化CSS编写。然而，过度嵌套可能导致难以预见生成的CSS代码量。嵌套层级越深，传输CSS所需的带宽就越大，浏览器渲染所需的工作量也越大。因此，建议保持选择器的嵌套层次浅一些。
:::

### 选择器列表

嵌套规则在处理选择器列表（即用逗号分隔的选择器）时的智能处理方式。对于每个复杂选择器（逗号分隔的选择器之间的部分），Sass会分别进行嵌套处理，然后再将它们组合回一个选择器列表。

::: code-group
``` scss [scss]
SCSS SYNTAX
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```
``` sass [sass]
.alert, .warning
  ul, p
    margin-right: 0
    margin-left: 0
    padding-bottom: 0
```
``` css [css]
.alert ul, .alert p, .warning ul, .warning p {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 0;
}
```
:::

### 带有组合器的选择器

你还可以在嵌套规则中使用带有[组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors#%E7%BB%84%E5%90%88%E5%99%A8%EF%BC%88combinator%EF%BC%89)的选择器。你可以将组合器放在外部选择器的末尾、内部选择器的开头，甚至可以将组合器单独放在两个选择器之间。

::: code-group
``` scss [scss]
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```
``` sass [sass]
ul >
  li
    list-style-type: none



h2
  + p
    border-top: 1px solid gray



p
  ~
    span
      opacity: 0.8
```
``` css [css]
ul > li {
  list-style-type: none;
}

h2 + p {
  border-top: 1px solid gray;
}

p ~ span {
  opacity: 0.8;
}

```
:::

### 高级嵌套

如果你希望在嵌套样式规则中实现比仅仅通过后代组合器（即普通空格）按顺序组合选择器更多的功能，Sass也能满足你的需求。你可以查看[父选择器文档](./parent-selector)以获取更多详细信息。

## 插值

你可以使用[插值](../interpolation)在选择器中注入[表达式](../syntax/structure#表达式)（例如变量或函数调用）的值。这在编写[混入](../at-rules/mixin)时特别有用，因为这样可以根据用户传入的参数创建选择器。


::: code-group
``` scss [scss]
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: $glyph;
  }
}

@include define-emoji("women-holding-hands", "👭");
```
``` sass [sass]
@mixin define-emoji($name, $glyph)
  span.emoji-#{$name}
    font-family: IconFont
    font-variant: normal
    font-weight: normal
    content: $glyph



@include define-emoji("women-holding-hands", "👭")
```
``` css [css]
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  font-variant: normal;
  font-weight: normal;
  content: "👭";
}
```
:::

::: tip
在解析选择器之前，Sass会先解析插值。这意味着你可以放心地使用插值来生成选择器的任何部分，而无需担心解析过程中出现问题。
:::

你可以将插值与父选择器&、[@at-root规则](../at-rules/at-root)和[选择器函数](https://sass-lang.com/documentation/modules/selector)结合使用，从而在动态生成选择器时展现出强大的能力。如果你想了解更多信息，可以查看[父选择器文档](../style-rules/parent-selector)。