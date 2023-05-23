# Values

Sass支持许多值类型，其中大部分直接来自 CSS。每个[表达式](../syntax/structure#表达式)都会产生一个值，变量保存值。大多数值类型直接来自 CSS：

* [数字](./numbers)，可能有也可能没有单位，如 12 或 100px 。
* [字符串](./strings)，可能有引号，也可能没有引号，如 "Helvetica Neue" 或 bold 。
* [颜色](./colors)，可以通过它们的十六进制表示或名称（如 #c6538c 或 blue ）引用，或从函数返回，如 rgb(107, 113, 127) 或 hsl(210, 100%, 20%) 。
* [值列表](./lists)，可以用空格或逗号分隔，也可以括在方括号中或根本没有括号，如 1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif 或 [col1-start] 。

还有一些特定于 Sass：

* [布尔值](./booleans) true 和 false 。
* 单一实例 [null](./null) 值。
* 将值与键相关联的[映射](./maps)，例如 ("background": red, "foreground": pink) 。
* [函数引用](./functions)由 [get-function()](https://sass-lang.com/documentation/modules/meta#get-function) 返回并使用 [call()](https://sass-lang.com/documentation/modules/meta#call) 调用。