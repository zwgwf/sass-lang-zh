# 相等运算符

相等运算符返回两个值是否相等。它们的写法是`<expression> == <expression>`，用于判断两个[表达式](../syntax/structure#表达式)是否相等，以及`<expression> != <expression>`，用于判断两个表达式是否不相等。对于不同的类型，两个值被认为相等的含义是不同的：

* [数字](../values/numbers)在具有相同的值和相同的单位时相等，或者当它们的单位相互转换时，它们的值相等。
* [字符串](../values/strings)具有特殊之处，未引用的字符串和具有相同内容的引用字符串被视为相等。
* [颜色](../values/colors)的红色、绿色、蓝色和透明度值相同，则它们相等。
* [列表](../values/lists)具有相同的内容时相等。逗号分隔的列表与空格分隔的列表不相等，带括号的列表与不带括号的列表不相等。
* [映射](../values/maps)具有相同的键和值时相等。
* [计算](../values/calculations)具有相同的名称和参数时相等。操作参数按文本进行比较。
* [true、false](../values/booleans)和[null](../values/null)仅与它们自身相等。
* [函数](../values/functions)与相同的函数相等。函数通过引用进行比较，所以即使两个函数具有相同的名称和定义，如果它们不在同一位置定义，它们被认为是不同的。

::: code-group
``` scss [scss]
@debug 1px == 1px; // true
@debug 1px != 1em; // true
@debug 1 != 1px; // true
@debug 96px == 1in; // true

@debug "Helvetica" == Helvetica; // true
@debug "Helvetica" != "Arial"; // true

@debug hsl(34, 35%, 92.1%) == #f2ece4; // true
@debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8); // true

@debug (5px 7px 10px) == (5px 7px 10px); // true
@debug (5px 7px 10px) != (10px 14px 20px); // true
@debug (5px 7px 10px) != (5px, 7px, 10px); // true
@debug (5px 7px 10px) != [5px 7px 10px]; // true

$theme: ("venus": #998099, "nebula": #d2e1dd);
@debug $theme == ("venus": #998099, "nebula": #d2e1dd); // true
@debug $theme != ("venus": #998099, "iron": #dadbdf); // true

@debug true == true; // true
@debug true != false; // true
@debug null != false; // true

@debug get-function("rgba") == get-function("rgba"); // true
@debug get-function("rgba") != get-function("hsla"); // true
```
``` sass [sass]
@debug 1px == 1px  // true
@debug 1px != 1em  // true
@debug 1 != 1px  // true
@debug 96px == 1in  // true

@debug "Helvetica" == Helvetica  // true
@debug "Helvetica" != "Arial"  // true

@debug hsl(34, 35%, 92.1%) == #f2ece4  // true
@debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8)  // true

@debug (5px 7px 10px) == (5px 7px 10px)  // true
@debug (5px 7px 10px) != (10px 14px 20px)  // true
@debug (5px 7px 10px) != (5px, 7px, 10px)  // true
@debug (5px 7px 10px) != [5px 7px 10px]  // true

$theme: ("venus": #998099, "nebula": #d2e1dd) 
@debug $theme == ("venus": #998099, "nebula": #d2e1dd)  // true
@debug $theme != ("venus": #998099, "iron": #dadbdf)  // true

@debug calc(10px + 10%) == calc(10px + 10%)  // true
@debug calc(10% + 10px) == calc(10px + 10%)  // false

@debug true == true  // true
@debug true != false  // true
@debug null != false  // true

@debug get-function("rgba") == get-function("rgba")  // true
@debug get-function("rgba") != get-function("hsla")  // true
```
:::