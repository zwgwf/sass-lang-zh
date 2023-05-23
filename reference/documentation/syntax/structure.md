# 样式表的结构

就像CSS一样，大多数Sass样式表主要由包含属性声明的样式规则组成。但是Sass样式表有更多的特性可以与这些一起存在。

## 声明

Sass 样式表由一系列声明组成，这些声明经过执行以构建生成 CSS。某些声明可能包含使用 { 和 } 定义的块，其中块又包含其他声明。例如，样式规则是带有块的声明。该块包含其他声明，例如属性声明。

在 SCSS 中，声明由分号分隔（如果声明使用块，分号是可选的）。在缩进语法中，它们只是用换行符分隔。

### 通用声明

这些类型的声明可以在 Sass 样式表中的任何地方使用：

* [变量声明](../variables)，比如 $var: value 。
* [流程控制@规则](../at-rules/control/)，如 @if 和 @each 。
* [@error](../at-rules/error) 、 [@warn](../at-rules/warn) 和 [@debug](../at-rules/debug) 规则。

### css声明

这些声明产生 CSS。它们可以在除 @function 之外的任何地方使用：

* [样式规则](../style-rules/)，比如 h1 { /* ... */ }。
* [css @规则](../at-rules/css)，比如 @media 和 @font-face。
* 使用@include的[混入](../at-rules/mixin)用法。
* [@at-root 规则](../at-rules/at-root)。

### 顶级声明

这些声明只能在样式表的顶层使用，或嵌套在顶层的 CSS 声明中：

* [模块加载](../at-rules/use)，使用 @use
* [导入](../at-rules/import)，使用 @import 。
* 使用 @mixin 的 [混入定义](../at-rules/mixin)。
* 使用 @function 的[函数定义](../at-rules/function)。

### 其它声明

* width: 100px 之类的[属性声明](../style-rules/declarations)只能在样式规则和某些 CSS @规则中使用。
* [@extend 规则](../at-rules/extend)只能在样式规则中使用。

## 表达式

表达式是位于属性或变量声明右侧的任何内容。每个表达式产生一个[值](../values/)。任何有效的 CSS 属性值也是 Sass 表达式，但 Sass 表达式比普通 CSS 值更强大。它们作为参数传递给 [混入](../at-rules/mixin) 和 [函数](../at-rules/function)，用于通过 [@if 规则](../at-rules/control/if)控制流程，并使用[算术](../operators/numeric)进行操作。我们称 Sass 的表达式语法为 SassScript。

### 字面量

最简单的表达式只代表静态值

* [数字](../values/numbers) ，可能有也可能没有单位，例如 12 或 100px 。
* [字符串](../values/strings)，可能有也可能没有引号，例如 "Helvetica Neue" 或 bold 。
* [颜色](../values/colors) ，可以通过它们的十六进制表示或名称来引用，例如 #c6538c 或 blue 。
* [布尔值](../values/booleans)， true 或 false 。
* 唯一的实例[null](../values/null)。
* [值列表](../values/lists)，可以用空格或逗号分隔，可以用方括号括起来，也可以根本不带括号，例如 1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif 或 [col1-start] 。
* 将值与键相关联的[映射](../values/maps)，例如 ("background": red, "foreground": pink) 。

### 运算符

Sass 定义了许多操作的语法：

* [== 和 !=](../operators/equality) 用于检查两个值是否相同。
* [+ 、 - 、 * 、 / 和 %](../operators/numeric) 具有它们通常的数字数学含义，具有与科学数学中的单位使用相匹配的特殊行为。
* [< 、 <= 、 > 和 >=](../operators/relational) 检查两个数字是大于还是小于彼此。
* [and 、 or 和 not](../operators/boolean)具有通常的布尔行为。 Sass 认为除了 false 和 null 之外的每个值都是“真”。
* [+ 、 - 和 /](../operators/string) 可用于连接字符串。
* [( 和 )](../operators/#圆括号) 可用于明确控制操作的优先顺序。

### 其他表达方式

* [变量](../variables)，例如 $var 。
* [函数调用](../at-rules/function)，如 nth($list, 1) 或 var(--main-bg-color) ，可以调用 Sass 核心库函数或用户定义的函数，也可以直接编译为 CSS。
* [特殊函数](./special-functions)，例如 calc(1px + 100%) 或 url(http://myapp.com/assets/logo.png) ，它们有自己独特的解析规则。
* [父选择器](../style-rules/parent-selector)， & 。
* 值 !important ，被解析为未加引号的字符串的字符串。