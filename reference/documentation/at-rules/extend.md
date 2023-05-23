# @extend

在设计页面时，通常会出现这样的情况：一个类应该具有另一个类的所有样式以及其自己的特定样式。例如，[BEM（Block, Element, Modifier）方法](http://getbem.com/naming/)鼓励在与块或元素类相同的元素上使用修饰符类。但是这可能导致混乱的 HTML，因为容易忘记包含两个类，而且可能会将非语义样式问题带入标记。

```html
<div class="error error--serious">
  Oh no! You've been hacked!
</div>
```

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```

Sass 的 @extend 规则解决了这个问题。它的写法是 `@extend <selector>`，它告诉 Sass 一个选择器应该继承另一个选择器的样式。

::: code-group
``` scss [scss]
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```
``` sass [sass]
.error
  border: 1px #f00
  background-color: #fdd

  &--serious
    @extend .error
    border-width: 3px
```
``` css [css]
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```
:::

当一个类扩展另一个类时，Sass 将为匹配扩展者的所有元素设置样式，就好像它们也匹配了被扩展的类。当一个类选择器扩展另一个类选择器时，它的工作原理就像在 HTML 中的每个已经具有扩展类的元素上添加了被扩展的类一样。你只需编写 class="error--serious"，Sass 就会确保它的样式就像具有 class="error" 一样。

当然，选择器不仅仅是在样式规则中单独使用。Sass 会在选择器被使用的任何地方进行扩展。这确保了你的元素被设置样式就像它们匹配了被扩展的选择器一样。

::: code-group
``` scss [scss]
.error:hover {
  background-color: #fee;
}

.error--serious {
  @extend .error;
  border-width: 3px;
}
```
``` sass [sass]
.error:hover
  background-color: #fee


.error--serious
  @extend .error
  border-width: 3px
```
``` css [css]
.error:hover, .error--serious:hover {
  background-color: #fee;
}

.error--serious {
  border-width: 3px;
}
```
:::

::: warning 注意
扩展（extends）是在你的样式表编译的其余部分之后解析的。特别是，在解析父选择器之后进行扩展。这意味着，如果你使用 `@extend .error`，它不会影响 `.error { &__icon { ... } }` 中的内部选择器。这也意味着 [SassScript 中的父选择器](../style-rules/parent-selector#在-SassScript-中)无法看到扩展的结果。
:::

## 它是如何工作的

与[mixin](../at-rules/mixin)不同，它们将样式复制到当前样式规则中，`@extend` 则更新包含被扩展选择器的样式规则，使其也包含扩展选择器。在扩展选择器时，Sass 进行智能统一：

* 它不会生成像 `#main#footer` 这样的选择器，这些选择器不可能匹配到任何元素。
* 它确保复杂选择器交错插入，以便无论 HTML 元素以何种顺序嵌套，它们都能正常工作。
* 它尽可能地修剪多余的选择器，同时确保其特异性大于或等于扩展器的特异性。
* 它知道一个选择器何时匹配另一个选择器的所有内容，并可以将它们组合在一起。
* 它智能处理[组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors#%E7%BB%84%E5%90%88%E5%99%A8%EF%BC%88combinator%EF%BC%89)、[通用选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)和[包含选择器的伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)。

::: code-group
``` scss [scss]
.content nav.sidebar {
  @extend .info;
}

// This won't be extended, because `p` is incompatible with `nav`.
p.info {
  background-color: #dee9fc;
}

// There's no way to know whether `<div class="guide">` will be inside or
// outside `<div class="content">`, so Sass generates both to be safe.
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// Sass knows that every element matching "main.content" also matches ".content"
// and avoids generating unnecessary interleaved selectors.
main.content .info {
  font-size: 0.8em;
}
```
``` sass [sass]
.content nav.sidebar
  @extend .info


// This won't be extended, because `p` is incompatible with `nav`.
p.info
  background-color: #dee9fc


// There's no way to know whether `<div class="guide">` will be inside or
// outside `<div class="content">`, so Sass generates both to be safe.
.guide .info
  border: 1px solid rgba(#000, 0.8)
  border-radius: 2px


// Sass knows that every element matching "main.content" also matches ".content"
// and avoids generating unnecessary interleaved selectors.
main.content .info
  font-size: 0.8em
```
``` css [css]
p.info {
  background-color: #dee9fc;
}

.guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}

main.content .info, main.content nav.sidebar {
  font-size: 0.8em;
}
```
:::

::: tip 提示
你可以通过[选择器函数](https://sass-lang.com/documentation/modules/selector)直接访问 Sass 的智能统一功能！[`selector.unify()`](https://sass-lang.com/documentation/modules/selector#unify) 函数返回一个匹配两个选择器交集的选择器，而 [`selector.extend()`](https://sass-lang.com/documentation/modules/selector#extend) 函数的工作方式与 @extend 类似，但仅适用于单个选择器。
:::

::: warning 注意
由于 @extend 更新包含被扩展选择器的样式规则，因此它们在级联中的优先级是基于被扩展选择器的样式规则出现的位置，而不是基于 @extend 出现的位置。这可能会令人困惑，但请记住：如果将扩展类添加到 HTML 中，这些规则的优先级将保持不变。
:::

## 占位符选择器

有时你可能希望编写一个仅用于被扩展的样式规则。在这种情况下，你可以使用[占位符选择器](../style-rules/placeholder-selectors)，它们看起来像以 % 开头的类选择器，而不是以 . 开头。包含占位符的任何选择器都不会包含在 CSS 输出中，但是扩展它们的选择器会包含在内。

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

### 私有占位符

与模块成员类似，可以通过在占位符选择器名称前加上 - 或 _ 来将其标记为私有。私有占位符选择器只能在定义它的样式表内部被扩展。对于其他样式表来说，这个选择器就像不存在一样。

## 扩展范围

当一个样式表扩展一个选择器时，该扩展仅影响上游模块中编写的样式规则。也就是说，通过 [@use 规则](../at-rules/use)或 [@forward](../at-rules/forward) 规则被该样式表加载的模块，以及这些模块加载的模块等。这有助于使你的 @extend 规则更具可预测性，确保它们仅影响你在编写它们时了解的样式。

::: warning
如果你使用 @import 规则，那么扩展（@extend）将没有任何作用域限制。它们不仅会影响你导入的所有样式表，还会影响所有导入你的样式表的样式表，以及那些样式表导入的其他所有内容等等。在没有 @use 的情况下，扩展是全局的。
:::

## 强制性和可选择性扩展

通常情况下，如果一个 @extend 规则在样式表中没有匹配到任何选择器，Sass 会产生一个错误。这有助于防止因拼写错误或在不重命名继承自它的选择器的情况下重命名选择器。这种需要扩展的选择器存在的扩展被称为强制性的（mandatory）。

然而，这可能并不总是你想要的结果。如果你希望在扩展的选择器不存在时，@extend 不执行任何操作，只需在其后添加 !optional。这样，如果找不到对应的选择器，@extend 就会变成可选的，不会报错，并且不会执行任何操作。

## 扩展还是混入


这段话的意思是：

扩展（@extend）和[混入（@mixin）](../at-rules/mixin)都是在 Sass 中封装和重用样式的方法，这自然引出了一个问题：何时使用哪一个。当您需要通过[参数](../at-rules/mixin#参数)配置样式时，显然需要使用混入。但是如果只是一组样式呢？

作为经验法则，当你在表达语义类（或其他语义选择器）之间的关系时，扩展是最好的选择。因为具有类 .error--serious 的元素是一个错误，所以它有意义地扩展了 .error。但是对于非语义样式的集合，编写一个混入可以避免层叠问题，并使其更容易在之后进行配置。简而言之，当表示语义类之间的关系时使用 @extend，而在表示非语义样式集合时使用 @mixin。

::: tip 提示
大多数网络服务器使用一种非常擅长处理重复的相同文本块的算法来压缩他们服务的CSS。这意味着，尽管混入（mixins）可能比扩展（extends）生成更多的CSS，但它们可能不会大幅度增加用户需要下载的量。所以，你应该根据你的使用情况选择最有意义的特性，而不是生成最少的CSS的那个！
:::

## 局限性

### 不允许的选择器

只有简单选择器（例如 .info 或 a 这样的单个选择器）可以被扩展（extended）。如果 .message.info 可以被扩展，那么 @extend 的定义表明，与扩展器（extender）匹配的元素将被视为匹配 .message.info。这和同时匹配 .message 和 .info 是一样的，所以在这种情况下编写 @extend .message, .info 并没有什么好处。

类似地，如果 .main .info 可以被扩展，那么它所做的事情（几乎）与单独扩展 .info 是一样的。微妙的差别并不值得为了看起来像它在做某种不同的事情而产生混淆，所以这也是不允许的。简而言之，只有简单的选择器可以被扩展，而组合的选择器则不能被扩展。

::: code-group
``` scss [scss]
.alert {
  @extend .message.info;
  //      ^^^^^^^^^^^^^
  // Error: Write @extend .message, .info instead.

  @extend .main .info;
  //      ^^^^^^^^^^^
  // Error: write @extend .info instead.
}
```
``` sass [sass]
.alert
  @extend .message.info
  //      ^^^^^^^^^^^^^
  // Error: Write @extend .message, .info instead.

  @extend .main .info
  //      ^^^^^^^^^^^
  // Error: write @extend .info instead.
```
:::

### HTML启发式

当 @extend [交错处理复杂选择器](./extend#它是如何工作的)时，它并不会生成所有可能的祖先选择器组合。许多它可能生成的选择器在实际的 HTML 中不太可能匹配，而且生成所有这些选择器会使样式表变得过大，实际价值很小。因此，它采用了一种启发式方法：它假设每个选择器的祖先将是独立的，而不会与其他选择器的祖先交错。

::: code-group
``` scss [scss]
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  // Sass doesn't generate CSS to match the <dd> in
  //
  // <header>
  //   <aside>
  //     <div class="warning">
  //       <div class="notice">
  //         <dd>...</dd>
  //       </div>
  //     </div>
  //   </aside>
  // </header>
  //
  // because matching all elements like that would require us to generate nine
  // new selectors instead of just two.
  @extend li;
}
```
``` sass [sass]
header .warning li
  font-weight: bold


aside .notice dd
  // Sass doesn't generate CSS to match the <dd> in
  //
  // <header>
  //   <aside>
  //     <div class="warning">
  //       <div class="notice">
  //         <dd>...</dd>
  //       </div>
  //     </div>
  //   </aside>
  // </header>
  //
  // because matching all elements like that would require us to generate nine
  // new selectors instead of just two.
  @extend li
```
``` css [css]
header .warning li, header .warning aside .notice dd, aside .notice header .warning dd {
  font-weight: bold;
}
```
:::

### 在@media中扩展

虽然 @extend 在 [@media 和其他 CSS 规则（at-rules）](./css)内部是允许的，但它不能扩展出现在其 at-rule 之外的选择器。这是因为扩展选择器仅适用于特定的 media 上下文，而且在生成的选择器中保留这种限制的唯一方法是复制整个样式规则，这是不允许的。

::: code-group
``` scss [scss]
@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error;
    //      ^^^^^^
    // Error: ".error" was extended in @media, but used outside it.
  }
}

.error {
  border: 1px #f00;
  background-color: #fdd;
}
```
``` sass [sass]
@media screen and (max-width: 600px)
  .error--serious
    @extend .error
    //      ^^^^^^
    // Error: ".error" was extended in @media, but used outside it.



.error
  border: 1px #f00
  background-color: #fdd
```
:::