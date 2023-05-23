# @warn

在编写[混入](./mixin)和[函数](./function)时，您可能希望阻止用户传递某些参数或某些值。他们可能正在传递已被弃用的旧参数，或者他们可能以不太理想的方式调用你的 API。

@warn 规则就是为此而设计的。它写作 `@warn <expression>`，并且将[表达式](../syntax/structure#表达式)的值（通常是一个字符串）打印给用户，同时附带一个堆栈追踪，显示当前混入或函数是如何被调用的。然而，与 [@error 规则](./error)不同的是，它不会完全停止 Sass。这意味着在向用户显示警告后，Sass 仍然会继续编译样式表。

::: code-group
``` scss [scss]
$known-prefixes: webkit, moz, ms, o;

@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    @if not index($known-prefixes, $prefix) {
      @warn "Unknown prefix #{$prefix}.";
    }

    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.tilt {
  // Oops, we typo'd "webkit" as "wekbit"!
  @include prefix(transform, rotate(15deg), wekbit ms);
}
```
``` sass [sass]
$known-prefixes: webkit, moz, ms, o

@mixin prefix($property, $value, $prefixes)
  @each $prefix in $prefixes
    @if not index($known-prefixes, $prefix)
      @warn "Unknown prefix #{$prefix}."


    -#{$prefix}-#{$property}: $value

  #{$property}: $value


.tilt
  // Oops, we typo'd "webkit" as "wekbit"!
  @include prefix(transform, rotate(15deg), wekbit ms)
```
``` css [css]
.tilt {
  -wekbit-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  transform: rotate(15deg);
}
```
:::

警告和堆栈追踪的确切格式因实现而异。这里提到了 Dart Sass 的示例:

```
Warning: Unknown prefix wekbit.
    example.scss 6:7   prefix()
    example.scss 16:3  root stylesheet
```