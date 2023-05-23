# @error

在编写接受参数的[混入](../at-rules/mixin)和[函数](../at-rules/function)时，通常需要确保这些参数具有 API 所期望的类型和格式。如果参数不符合要求，需要通知用户，并停止运行混入/函数。

Sass 通过 @error 规则简化了这个过程，写法为 `@error <expression>`。它会打印[表达式](../syntax/structure#表达式)的值（通常是一个字符串），并附上一个堆栈追踪，说明当前混入或函数是如何被调用的。一旦打印了错误，Sass 将停止编译样式表，并告知运行它的系统发生了错误。

::: code-group
``` scss [scss]
@mixin reflexive-position($property, $value) {
  @if $property != left and $property != right {
    @error "Property #{$property} must be either left or right.";
  }

  $left-value: if($property == right, initial, $value);
  $right-value: if($property == right, $value, initial);

  left: $left-value;
  right: $right-value;
  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include reflexive-position(top, 12px);
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Error: Property top must be either left or right.
}
```
``` sass [sass]
@mixin reflexive-position($property, $value)
  @if $property != left and $property != right
    @error "Property #{$property} must be either left or right."


  $left-value: if($property == right, initial, $value)
  $right-value: if($property == right, $value, initial)

  left: $left-value
  right: $right-value
  [dir=rtl] &
    left: $right-value
    right: $left-value



.sidebar
  @include reflexive-position(top, 12px)
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Error: Property top must be either left or right.
```
:::

错误和堆栈追踪的确切格式因实现而异，也可能取决于你的构建系统。在 Dart Sass 中，从命令行运行时，它的显示形式如下所示：

```
Error: "Property top must be either left or right."
  ╷
3 │     @error "Property #{$property} must be either left or right.";
  │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
  example.scss 3:5   reflexive-position()
  example.scss 19:3  root stylesheet
```