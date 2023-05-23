# 插值

插值（Interpolation）可以在 Sass 样式表的几乎任何地方使用，用于将 [SassScript 表达式](./syntax/structure#表达式)的结果嵌入到 CSS 代码片段中。只需将表达式用 #{} 包裹在以下任何一个地方：

* [样式规则中的选择器](./style-rules/#插值)
* [声明中的属性名称](./style-rules/declarations#插值)
* [自定义属性值](./style-rules/declarations#自定义属性)
* [CSS at-rules](./at-rules/css)
* [@extend](./at-rules/extend)
* [普通CSS的@import](./at-rules/import#普通-css-imports)
* [加引号或未加引号的字符串的字符串](./values/strings)
* [特殊函数](./syntax/special-functions)
* [普通CSS函数](./at-rules/function#普通CSS函数)
* [多行注释](./syntax/comments)

::: code-group
``` scss [scss]
SCSS SYNTAX
@mixin corner-icon($name, $top-or-bottom, $left-or-right) {
  .icon-#{$name} {
    background-image: url("/icons/#{$name}.svg");
    position: absolute;
    #{$top-or-bottom}: 0;
    #{$left-or-right}: 0;
  }
}

@include corner-icon("mail", top, left);
```
``` sass [sass]
@mixin corner-icon($name, $top-or-bottom, $left-or-right)
  .icon-#{$name}
    background-image: url("/icons/#{$name}.svg")
    position: absolute
    #{$top-or-bottom}: 0
    #{$left-or-right}: 0



@include corner-icon("mail", top, left)
```
``` css [css]
.icon-mail {
  background-image: url("/icons/mail.svg");
  position: absolute;
  top: 0;
  left: 0;
}

```
:::

## 在SassScript中

在 SassScript 中，插值可用于将 SassScript 注入到[未加引号的字符串](./values/strings#unquoted)中。这在动态生成名称（例如动画）或使用[斜线分隔值](./operators/numeric#使用斜杠分隔的值)时特别有用。注意，SassScript 中的插值始终返回未加引号的字符串。

::: code-group
``` scss [scss]
@mixin inline-animation($duration) {
  $name: inline-#{unique-id()};

  @keyframes #{$name} {
    @content;
  }

  animation-name: $name;
  animation-duration: $duration;
  animation-iteration-count: infinite;
}

.pulse {
  @include inline-animation(2s) {
    from { background-color: yellow }
    to { background-color: red }
  }
}
```
``` sass [sass]
@mixin inline-animation($duration)
  $name: inline-#{unique-id()}

  @keyframes #{$name}
    @content


  animation-name: $name
  animation-duration: $duration
  animation-iteration-count: infinite


.pulse
  @include inline-animation(2s)
    from
      background-color: yellow
    to
      background-color: red
```
``` css [css]

CSS OUTPUT
.pulse {
  animation-name: inline-uoljdfspu;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes inline-uoljdfspu {
  from {
    background-color: yellow;
  }
  to {
    background-color: red;
  }
}
```
:::

::: tip 提示
插值对于将值注入到字符串中很有用，但在 SassScript 表达式中除此之外很少需要。您绝对不需要仅将变量用于属性值。与其编写 color: #{$accent}，不如直接编写 color: $accent！
:::

::: warning 注意
使用数字时，几乎总是不建议使用插值。插值返回无法进行进一步计算的未加引号字符串，并且它避免了 Sass 内置的保护措施，以确保正确使用单位。

您可以使用 Sass 的强大[单位算术功能](./values/numbers#单位)代替。例如，不要编写 #{$width}px，而是编写 $width * 1px——或者更好的是，从一开始就以 px 为单位声明 $width 变量。这样，如果 $width 已经有单位，您将得到一个很好的错误信息，而不是编译错误的 CSS。
:::

## 加引号的字符串

在大多数情况下，插值注入的文本与将表达式用作属性值时使用的文本完全相同。但有一个例外：删除引号字符串周围的引号（即使这些引号字符串在列表中）。这使得可以编写包含不允许在 SassScript 中使用的语法（如选择器）的引号字符串，并将它们插入到样式规则中。

::: code-group
``` scss [scss]
.example {
  unquoted: #{"string"};
}
```
``` sass [sass]
.example
  unquoted: #{"string"}
```
``` css [css]
.example {
  unquoted: string;
}
```
:::

::: warning 注意
虽然使用此功能将加引号的字符串转换为未加引号的字符串的字符串很有诱惑力，但使用 string.unquote() 函数会更清晰。与其编写 #{$string}，不如编写 string.unquote($string)！
:::

