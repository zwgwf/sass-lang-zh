# 操作符

Sass支持一些有用的运算符，用于处理不同的值。这些包括标准的数学运算符，如+和*，以及用于其他各种类型的运算符：

* [==和!=](./equality)用于检查两个值是否相同。
* [+, -，*，/和%](./numeric)对于数字具有通常的数学含义，并且对于单位也有特殊的行为，与科学数学中的单位使用相匹配。
* [<，<=，>和>=](./relational)用于检查两个数字的大小关系。
* [and，or和not](./boolean)具有通常的布尔行为。Sass认为除了false和null之外的每个值都为“true”。
* [+，-和/](./string)可用于连接字符串。

::: warning 注意
在Sass的早期阶段，它添加了对[颜色](../values/colors)的数学操作支持。这些操作会分别在颜色的RGB通道上进行运算，因此添加两个颜色会产生一个颜色，其红色通道是它们红色通道的和，依此类推。

这种行为并不是非常有用，因为按通道进行RGB算术与人类对颜色的感知并不相符。随后添加了[颜色函数](https://sass-lang.com/documentation/modules/color)，这些函数更加实用，而颜色操作被弃用。虽然LibSass和Ruby Sass仍然支持这些操作，但会产生警告，并且强烈建议用户避免使用它们。
:::

## 运算符优先级

Sass有一个相当标准的运算符优先级，从最紧密到最宽松的顺序：

1、一元运算符not, +, -,和/。
2、*，/，和%运算符。
3、+和-运算符。
4、>，>=，<和<=运算符
5、==和!=运算符。
6、and运算符。
7、or运算符。
8、=运算符（如果可用）

::: code-group
``` scss [scss]
@debug 1 + 2 * 3 == 1 + (2 * 3); // true
@debug true or false and false == true or (false and false); // true
```
``` sass [sass]
@debug 1 + 2 * 3 == 1 + (2 * 3)  // true
@debug true or false and false == true or (false and false)  // true
```
:::

## 圆括号

您可以使用括号明确控制操作的顺序。括号内的操作在括号外的任何操作之前进行计算。括号甚至可以嵌套，此时最内层的括号将首先进行计算。

::: code-group
``` scss [scss]
@debug (1 + 2) * 3; // 9
@debug ((1 + 2) * 3 + 4) * 5; // 65
```
``` sass [sass]
@debug (1 + 2) * 3  // 9
@debug ((1 + 2) * 3 + 4) * 5  // 65
```
:::

## 一个等于号

Sass支持一个特殊的=运算符，它只允许在函数参数中使用，它使用=将两个操作数分隔开来创建一个未引用的字符串。这是为了与非常旧的仅限于IE的语法保持向后兼容。

::: code-group
``` scss [scss]
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```
``` sass [sass]
.transparent-blue
  filter: chroma(color=#0000ff)
```
``` css [css]
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```
:::