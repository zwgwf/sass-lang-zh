# At-Rules

Sass 在 CSS 基础上添加的一些额外功能，主要以新的 [at-rules](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule) 的形式呈现：

* [@use](./use) 用于从其他 Sass 样式表加载 mixins（混入宏）、函数和变量，并将多个样式表的 CSS 结合在一起。
* [@forward](./forward) 用于加载 Sass 样式表，并在使用 @use 规则加载样式表时提供其 mixins、函数和变量。
* [@import](./import) 扩展了 CSS at-rule，用于从其他样式表加载样式、mixins、函数和变量。
* [@mixin 和 @include](./mixin) 使得重复使用样式片段变得简单。
* [@function](./function) 用于定义可在 SassScript 表达式中使用的自定义函数。
* [@extend](./extend) 允许选择器从彼此继承样式。
* [@at-root](./at-root) 将其中的样式放在 CSS 文档的根节点上。
* [@error](./error) 会导致编译失败并显示错误信息。
* [@warn](./warn) 打印警告，但不会完全停止编译。
* [@debug](./debug) 打印用于调试目的的消息。
* 流程控制规则，如 [@if](./control/if)、[@each](./control/each)、[@for](./control/for) 和 [@while](./control/while)，用于控制样式的输出及其输出次数。

Sass 还为[纯 CSS at-rules](./css) 提供了一些特殊行为：它们可以包含[插值](../interpolation)，可以嵌套在样式规则中。其中一些规则（如 [@media](./css#media) 和 [@supports](./css#supports)）还允许在规则本身中直接使用 SassScript，无需插值。