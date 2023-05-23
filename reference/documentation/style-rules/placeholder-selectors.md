# 占位符选择器

Sass有一种特殊的选择器，称为“占位符”。它看起来和类选择器很像，但是它以%开头，并且不包含在CSS输出中。实际上，包含占位符选择器的任何复合选择器（逗号之间的那些）都不会包含在CSS中，同样，如果一个样式规则的所有选择器都包含占位符，那么这个样式规则也不会包含在CSS中。

::: code-group
``` scss [scss]
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}
```
``` sass [sass]
.alert:hover, %strong-alert
  font-weight: bold


%strong-alert:hover 
  color: red
```
``` css [css]
.alert:hover {
  font-weight: bold;
}
```
:::

不输出的选择器（占位符选择器）有什么用途呢？它们仍然可以被[扩展](../at-rules/extend)！与类选择器不同，如果占位符选择器没有被扩展，它们不会在CSS中产生冗余，而且它们不会强制使用库的用户在HTML中使用特定的类名。

::: code-group
``` scss [scss]
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, .12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
  @extend %toolbelt;
  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;
  color: #cddc39;
}
```
``` sass [sass]
%toolbelt
  box-sizing: border-box
  border-top: 1px rgba(#000, .12) solid
  padding: 16px 0
  width: 100%

  &:hover
    border: 2px rgba(#000, .5) solid

.action-buttons
  @extend %toolbelt
  color: #4285f4


.reset-buttons
  @extend %toolbelt
  color: #cddc39
```
``` css [css]
.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}
.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```
:::


占位符选择器在编写Sass库时非常有用，因为每个样式规则可能会被使用，也可能不被使用。作为一个经验法则，如果你只为自己的应用编写样式表，通常最好在可用的情况下扩展一个类选择器。