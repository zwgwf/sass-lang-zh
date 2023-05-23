# 特殊函数

CSS中的很多函数可以在Sass中正常使用，因为它们会被解析为函数调用并原样编译为CSS。然而，也有一些例外情况，这些例外的函数具有特殊的语法，不能直接解析为[SassScript表达式](./structure#表达式)。所有这些特殊函数调用都返回[未加引号的字符串](../values/strings#未加引号的字符串)。


## url()

[`url()`函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url)在CSS中很常见，但它的语法与其他函数不同：它可以接受加引号或未加引号的字符串的URL。因为未加引号的字符串的URL不是有效的SassScript表达式，所以Sass需要特殊的逻辑来解析它。

如果参数是有效的未加引号的字符串的URL，Sass将原样解析。如果参数无效，则将其解析为普通的CSS函数调用。插值可以用于在url()函数中注入SassScript值。

[url() 函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url)在 CSS 中很常见，但它的语法与其他函数不同：它可以接受加引号或未加引号的字符串的 URL。因为未加引号的 URL 不是一个有效的 SassScript 表达式，所以 Sass 需要特殊的逻辑来解析它。

如果 url() 的参数是有效的未加引号的字符串的 URL，Sass 将原样解析它，尽管[插值](../interpolation)也可能用于注入 SassScript 值。如果它不是有效的未引用的 URL —— 例如，如果它包含[变量](../variables)或[函数调用](../at-rules/function) —— 它将被解析为[普通的 CSS 函数调用](../at-rules/function#普通CSS函数)。

::: code-group

```scss [scss]
$roboto-font-path: "../fonts/roboto";

@font-face {
    // 这被解析为一个普通的函数调用，它接受一个加引号的字符串。
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 100;
}

@font-face {
    // 这被解析为接受算术表达式的普通函数调用
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 300;
}

@font-face {
    // 这被解析为使用插值的特殊函数。
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");

    font-family: "Roboto";
    font-weight: 400;
}
```

```sass [sass]
$roboto-font-path: "../fonts/roboto"

@font-face
    // 这被解析为一个普通的函数调用，它接受一个加引号的字符串。
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2")

    font-family: "Roboto"
    font-weight: 100


@font-face
    // 这被解析为接受算术表达式的普通函数调用。
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2")

    font-family: "Roboto"
    font-weight: 300


@font-face
    // 这被解析为使用插值的特殊函数。
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2")

    font-family: "Roboto"
    font-weight: 400
```

```css [css]
@font-face {
  src: url("../fonts/roboto/Roboto-Thin.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 100;
}
@font-face {
  src: url("../fonts/roboto/Roboto-Light.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 300;
}
@font-face {
  src: url(../fonts/roboto/Roboto-Regular.woff2) format("woff2");
  font-family: "Roboto";
  font-weight: 400;
}
```
:::

## element(), progid:...(), and expression()

[element()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/element)函数：CSS规范中定义的element()函数中的ID可能被解析为颜色值。因此，它们需要特殊的解析方法来区分和处理。

[expression()](https://blogs.msdn.microsoft.com/ie/2008/10/16/ending-expressions/)和以[progid:](https://learn.microsoft.com/zh-cn/archive/blogs/ie/the-css-corner-using-filters-in-ie8)开头的函数：这些函数是遗留的Internet Explorer特性，它们使用非标准的语法。虽然现代浏览器已不再支持这些特性，但为了向后兼容，Sass仍会解析它们。

对于这些函数调用，Sass允许使用任意文本，包括嵌套的括号。在这些函数调用中，除了[插值](../interpolation)可以用于注入动态值外，其他内容都不会被解释为SassScript表达式。

::: code-group
```scss [scss]
$logo-element: logo-bg;

.logo {
  background: element(##{$logo-element});
}
```
```sass [sass]
$logo-element: logo-bg

.logo
  background: element(##{$logo-element})
```
```css [css]
.logo {
  background: element(#logo-bg);
}

```
:::
