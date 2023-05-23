# 函数


函数也可以作为值存在！您不能直接将函数写成值，但是您可以将函数的名称传递给meta.get-function()函数以获取它作为值。一旦您获得了一个函数值，您可以将其传递给meta.call()函数来调用它。这对于编写调用其他函数的高阶函数非常有用。

::: code-group
``` scss [scss]
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// Return a copy of $list with all elements for which $condition returns `true`
/// removed.
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) {
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica"));
}
```
``` sass [sass]
@use "sass:list"
@use "sass:meta"
@use "sass:string"

/// Return a copy of $list with all elements for which $condition returns `true`
/// removed.
@function remove-where($list, $condition)
  $new-list: ()
  $separator: list.separator($list)
  @each $element in $list
    @if not meta.call($condition, $element)
      $new-list: list.append($new-list, $element, $separator: $separator)


  @return $new-list


$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif

.content
  @function contains-helvetica($string)
    @return string.index($string, "Helvetica")

  font-family: remove-where($fonts, meta.get-function("contains-helvetica"))
```
``` css [css]
.content {
  font-family: Tahoma, Geneva, Arial, sans-serif;
}

```
:::