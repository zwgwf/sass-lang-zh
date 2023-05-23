# 注释

Sass 注释的工作方式在 SCSS 和缩进语法之间有很大的不同。这两种语法都支持两种类型的注释：使用 /* */ 定义的注释（通常）编译到 CSS里面，使用 // 定义的注释不编译到 CSS里面。

## In SCSS

SCSS 中的注释与其他语言（如 JavaScript）中的注释类似。单行注释以 // 开头，一直到行尾。单行注释中的任何内容都不会作为 CSS 输出；就 Sass 而言，它们可能不存在。它们也被称为静默注释，因为它们不产生任何 CSS。

多行注释以 /* 开始，到下一个 */ 结束。如果多行注释写在允许语句的地方，它会被编译为 CSS 注释。与静默注释相比，它们也被称为有声注释。编译为 CSS 的多行注释可能包含插值，它会在注释被编译之前进行计算。

默认情况下，多行注释将从[压缩模式](https://sass-lang.com/documentation/cli/dart-sass#style)下编译的 CSS 中剥离。但是，如果注释以 /*! 开头，它将始终包含在 CSS 输出中。

::: code-group

```scss [scss]
// This comment won't be included in the CSS.

/* But this comment will, except in compressed mode. */

/* It can also contain interpolation:
 * 1 + 1 = #{1 + 1} */

/*! This comment will be included even in compressed mode. */

p /* Multi-line comments can be written anywhere
   * whitespace is allowed. */ .sans {
  font: Helvetica, // So can single-line comments.
        sans-serif;
}
```

```css [css]
/* But this comment will, except in compressed mode. */
/* It can also contain interpolation:
 * 1 + 1 = 2 */
/*! This comment will be included even in compressed mode. */
p .sans {
  font: Helvetica, sans-serif;
}
```

:::

## In Sass

缩进语法中的注释有点不同：它们是基于缩进的，就像其他语法一样。与 SCSS 一样，用 // 编写的静默注释永远不会作为 CSS 输出出，但与 SCSS 不同的是， // 开头下缩进的所有内容也会被注释掉。

除了以 /* 开头的缩进语法注释可以被编译为 CSS 之外，以 /* 开头的缩进语法注释与// 开头的缩进语法工作方式相同，因为注释的范围是基于缩进的，所以关闭标记： `*/` 是可选的。与 SCSS 一样， /* 注释可以包含插值，并且可以以 /*! 开头，以避免在压缩模式下被剥离。

注释也可以用在缩进语法的表达式中。在这种情况下，它们的语法与 SCSS 中的语法完全相同。

::: code-group

```sass [sass]
// This comment won't be included in the CSS.
   This is also commented out.

/* But this comment will, except in compressed mode.

/* It can also contain interpolation:
   1 + 1 = #{1 + 1}

/*! This comment will be included even in compressed mode.

p .sans
  font: Helvetica, /* Inline comments must be closed. */ sans-serif
```

```css [css]
/* But this comment will, except in compressed mode. */
/* It can also contain interpolation:
 * 1 + 1 = 2 */
/*! This comment will be included even in compressed mode. */
p .sans {
  font: Helvetica, sans-serif;
}
```

:::

## 文档注释

使用 Sass 编写样式库时，您可以使用注释来记录您的库提供的 [混入](../at-rules/mixin)、[函数](../at-rules/function)、[变量](../variables)和[占位符选择器](../style-rules/placeholder-selectors)，以及库本身。这些评论由 [SassDoc](http://sassdoc.com/) 工具读取，该工具使用它们生成精美的文档。查看 [Susy 网格引擎](http://oddbird.net/susy/docs/index.html)的文档以了解它的实际应用！

文档注释是静默注释，在您正在记录的内容正上方用三个斜杠 ( /// ) 书写。 SassDoc 将注释中的文本解析为 [Markdown](https://www.markdownguide.org/getting-started) ，并支持许多有用的[注释](http://sassdoc.com/annotations/)来详细描述它。

::: code-group

```scss [scss]
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```

```sass [sass]
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent)
  $result: 1
  @for $_ from 1 through $exponent
    $result: $result * $base

  @return $result
```

:::