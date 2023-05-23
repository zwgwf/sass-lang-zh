# 父选择器

父选择器 &，这是Sass发明的一种特殊选择器，用于[嵌套选择器](./index#嵌套)中以引用外部选择器。它使得在更复杂的情况下复用外部选择器成为可能，例如添加伪类或在父选择器之前添加一个选择器。

当在内部选择器中使用父选择器&时，它会被相应的外部选择器替换。这种替换是在正常嵌套行为之外发生的。

::: code-group
``` scss [scss]
SCSS SYNTAX
.alert {
  // 父选择器可用于向外部选择器添加伪类。
  &:hover {
    font-weight: bold;
  }

  // 它还可以用于在特定上下文中设置外部选择器的样式
  // 例如在一个从右到左阅读的语言环境中设置样式。
  [dir=rtl] & {
    margin-left: 0;
    margin-right: 10px;
  }

  // 您甚至可以将它用作伪类选择器的参数。
  :not(&) {
    opacity: 0.8;
  }
}
```
``` sass [sass]
.alert
  // 父选择器可用于向外部选择器添加伪类。
  &:hover
    font-weight: bold


  // 它还可以用于在特定上下文中设置外部选择器的样式
  // 例如在一个从右到左阅读的语言环境中设置样式。
  [dir=rtl] &
    margin-left: 0
    margin-right: 10px


  // 您甚至可以将它用作伪类选择器的参数。
  :not(&)
    opacity: 0.8
```
``` css [css]
.alert:hover {
  font-weight: bold;
}
[dir=rtl] .alert {
  margin-left: 0;
  margin-right: 10px;
}
:not(.alert) {
  opacity: 0.8;
}

```
:::

::: warning 注意
因为父选择器可能会被像h1这样的类型选择器替换，所以它只允许出现在复合选择器的开头，也就是类型选择器允许出现的地方。例如，span&这种写法是不被允许的。

尽管目前父选择器&的使用受到限制，但是开发者正在考虑放宽这些限制。如果你想帮助实现这一目标，可以查看相关的[GitHub issue](https://github.com/sass/sass/issues/1425)。
:::

## 添加后缀

你还可以使用父选择器&向外部选择器添加额外的后缀。这在使用类似[BEM](http://getbem.com/)这样的高度结构化类名方法时特别有用。只要外部选择器以字母数字名称结尾（如类名、ID和元素选择器），你就可以使用父选择器在其后添加额外的文本。

::: code-group
``` scss [scss]
.accordion {
  max-width: 600px;
  margin: 4rem auto;
  width: 90%;
  font-family: "Raleway", sans-serif;
  background: #f4f4f4;

  &__copy {
    display: none;
    padding: 1rem 1.5rem 2rem 1.5rem;
    color: gray;
    line-height: 1.6;
    font-size: 14px;
    font-weight: 500;

    &--open {
      display: block;
    }
  }
}
```
``` sass [sass]
.accordion
  max-width: 600px
  margin: 4rem auto
  width: 90%
  font-family: "Raleway", sans-serif
  background: #f4f4f4

  &__copy
    display: none
    padding: 1rem 1.5rem 2rem 1.5rem
    color: gray
    line-height: 1.6
    font-size: 14px
    font-weight: 500

    &--open
      display: block
```
``` css [css]

CSS OUTPUT
.accordion {
  max-width: 600px;
  margin: 4rem auto;
  width: 90%;
  font-family: "Raleway", sans-serif;
  background: #f4f4f4;
}
.accordion__copy {
  display: none;
  padding: 1rem 1.5rem 2rem 1.5rem;
  color: gray;
  line-height: 1.6;
  font-size: 14px;
  font-weight: 500;
}
.accordion__copy--open {
  display: block;
}
```
:::

## 在 SassScript 中

父选择器&也可以在SassScript中使用。它是一种特殊的表达式，返回当前父选择器，格式与[选择器函数](https://sass-lang.com/documentation/modules/selector#selector-values)使用的格式相同：一个逗号分隔的列表（选择器列表），其中包含由空格分隔的列表（复杂选择器），这些列表包含未加引号的字符串（复合选择器）。

::: code-group
``` scss [scss]
.main aside:hover,
.sidebar p {
  parent-selector: &;
  // => ((unquote(".main") unquote("aside:hover")),
  //     (unquote(".sidebar") unquote("p")))
}
```
``` sass [sass]
.main aside:hover,
.sidebar p
  parent-selector: &
  // => ((unquote(".main") unquote("aside:hover")),
  //     (unquote(".sidebar") unquote("p")))
```
``` css [css]
.main aside:hover,
.sidebar p {
  parent-selector: .main aside:hover, .sidebar p;
}
```
:::

如果&表达式在样式规则之外使用，它将返回null。由于null是[假值](../at-rules/control/if#真值和假值)，这意味着你可以很容易地使用它来判断一个mixin是否在样式规则中被调用。


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

## 高级嵌套

你可以像普通的SassScript表达式一样使用&，这意味着你可以将它传递给函数或将其包含在插值中，甚至用在其他选择器中！将其与[选择器函数](https://sass-lang.com/documentation/modules/selector#selector-values)和[@at-root规则](../at-rules/at-root)结合使用，可以让你以非常强大的方式嵌套选择器。

假设你想要编写一个选择器，它可以匹配外部选择器和一个元素选择器。你可以编写一个像这样的mixin，它使用[selector.unify()函数](https://sass-lang.com/documentation/modules/selector#unify)将&与用户的选择器组合起来。

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

CSS OUTPUT
.wrapper input.field {
  /* ... */
}

.wrapper select.field {
  /* ... */
}
```
:::

::: warning 注意
当Sass嵌套选择器时，它不知道生成它们的插值是什么。这意味着，即使你将&用作SassScript表达式，它也会自动将外部选择器添加到内部选择器。这就是为什么你需要显式使用[@at-root规则](../at-rules/at-root)来告诉Sass不要包含外部选择器。
:::