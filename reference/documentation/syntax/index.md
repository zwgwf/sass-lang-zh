# 概览

Sass 支持两种不同的语法。每种语法都可以加载另一种，所以你和你的团队可以自由选择。

## SCSS

SCSS语法使用.scss作为文件扩展名。它是CSS的超集，除了一些极个别情况之外，基本上所有有效的CSS也是有效的SCSS。因为它与CSS相似，所以它是最容易上手的语法，也是最流行的语法。

SCSS语法如下所示：

```scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover { cursor: pointer; }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```

## 缩进语法

缩进语法是Sass的原始语法，因此它使用文件扩展名.sass。由于这个扩展名，它有时被称为“Sass”。缩进语法支持与SCSS相同的所有功能，但它使用缩进而不是大括号和分号来描述文档的格式。

一般来说，任何时候你在 CSS 或 SCSS 中编写花括号时，你都可以在缩进语法中缩进一层。任何时候一行结束，都算作分号。在缩进语法中还有一些额外的差异，在整个参考中都有注明。

::: warning 注意

缩进语法目前不支持跨多行的表达式。请查看 [issue#126](https://github.com/sass/sass/issues/216)

:::

缩进语法如下所示：

```sass
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```