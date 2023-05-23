# @debug

在开发样式表时，有时查看变量或表达式的值会很有用。这就是 @debug 规则的作用：它的写法是 `@debug <expression>`，它会打印该表达式的值，以及文件名和行号。这样可以帮助你更轻松地调试和理解样式表中的变量和表达式。

::: code-group

``` scss [scss]
@mixin inset-divider-offset($offset, $padding) {
  $divider-offset: (2 * $padding) + $offset;
  @debug "divider offset: #{$divider-offset}";

  margin-left: $divider-offset;
  width: calc(100% - #{$divider-offset});
}
```
``` sass [sass]
@mixin inset-divider-offset($offset, $padding)
  $divider-offset: (2 * $padding) + $offset
  @debug "divider offset: #{$divider-offset}"

  margin-left: $divider-offset
  width: calc(100% - #{$divider-offset})
```

:::

debug 信息的确切格式因实现而异。这里提到了 Dart Sass 的示例:

```
test.scss:3 Debug: divider offset: 132px
```

::: tip 提示
您可以将任何值传递给 `@debug`，而不仅仅是字符串！`@debug` 会打印与 `meta.inspect()` 函数相同的值表示。
:::