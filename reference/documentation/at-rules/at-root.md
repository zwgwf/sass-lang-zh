# @at-root

`@at-root` 规则通常写作 `@at-root <selector> { ... }`，它会使其中的所有内容直接在文档的根级别输出，而不是按照正常的嵌套规则。当使用 [SassScript 父选择器](../style-rules/parent-selector#在-sassscript-中)和[选择器函数](https://sass-lang.com/documentation/modules/selector)进行[高级嵌套](../style-rules/parent-selector#高级嵌套)时，`@at-root` 规则最常用到。换句话说，`@at-root` 规则可以让您在处理复杂的嵌套结构时，将一部分样式规则从嵌套结构中提取出来，并将其放置在 CSS 文档的根级别。

例如，假设你想写一个选择器，它能匹配外部选择器和元素选择器。你可以编写一个像这样的混入，使用 [`selector.unify()`](https://sass-lang.com/documentation/modules/selector#unify) 函数将 `&`（代表当前选择器）与用户提供的选择器组合在一起。

::: code-group
``` scss [scss]
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;
  }
}

.wrapper .field {
  @include unify-parent("input") {
    /* ... */
  }
  @include unify-parent("select") {
    /* ... */
  }
}
```
``` sass [sass]
@use "sass:selector"

@mixin unify-parent($child)
  @at-root #{selector.unify(&, $child)}
    @content



.wrapper .field
  @include unify-parent("input")
    /* ... */

  @include unify-parent("select")
    /* ... */
```
``` css [css]
.wrapper input.field {
  /* ... */
}

.wrapper select.field {
  /* ... */
}
```
:::

在这个示例中，@at-root 规则是必需的，因为当 Sass 执行选择器嵌套时，它不知道生成选择器时使用了哪种插值（interpolation）。这意味着它会自动将外部选择器添加到内部选择器，即使你将 `& `作为 SassScript 表达式。@at-root 规则明确告诉 Sass 不要包含外部选择器。

::: tip
@at-root 规则也可以写成 @at-root { ... } 的形式，用于将多个样式规则放在文档的根部。实际上，`@at-root <selector> { ... }` 只是 `@at-root { <selector> { ... } }` 的简写！
:::

## 超越样式规则的考虑

`@at-root` 本身仅仅可以去除[样式规则](../style-rules/)，而类似 [`@media`](./css#media) 或 [`@supports`](../at-rules/css#supports) 等的 at-rules 仍然会保留。然而，如果你希望更加精确地控制其包含或排除的内容，可以使用类似[媒体查询功能](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries#%E5%AE%9A%E4%BD%8D%E5%AA%92%E4%BD%93%E7%89%B9%E6%80%A7)的语法，例如 `@at-root (with: <rules...>) { ... }` 或者 `@at-root (without: <rules...>) { ... }`。`(without: ...)` 查询告诉 Sass 应排除哪些规则，而 `(with: ...)` 查询会排除所有未列出的规则。这样可以让你在使用 `@at-root` 时更精确地控制其行为。

::: code-group
``` scss [scss]
@media print {
  .page {
    width: 8in;

    @at-root (without: media) {
      color: #111;
    }

    @at-root (with: rule) {
      font-size: 1.2em;
    }
  }
}
```
``` sass [sass]
@media print
  .page
    width: 8in

    @at-root (without: media)
      color: #111


    @at-root (with: rule)
      font-size: 1.2em
```
``` css [css]
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: #111;
}
.page {
  font-size: 1.2em;
}
```
:::

除了at-rules的名字之外，在查询中可以使用的两个特殊值：

*  `rule`代表样式规则。例如，使用@at-root (with: rule)可以排除所有的at-rule，只保留样式规则。
* `all`代表所有的at-rule和样式规则都应该被排除。