# Dart Sass

Dart Sass 是 Sass 的主要实现方式，这意味着在所有的 Sass 实现中，它会首先获得新功能。Dart Sass 运行速度快，安装简单，而且可以编译成纯 JavaScript，这使得它很容易整合到现代的 web 开发流程中。你可以在 [GitHub](https://github.com/sass/dart-sass) 上找到更多的信息，或者参与到它的开发中去。

## 命令行

Dart Sass 的独立命令行可执行文件使用了超快的 Dart VM 来编译你的样式表。要在命令行上安装 Dart Sass，可以查看安装指南。一旦你运行起来，你可以用它来编译文件：

```
sass source/index.scss css/index.css
```
输入 sass --help 可以查看关于命令行界面的更多信息。

### Dart库

你也可以将 Dart Sass 作为 Dart 库使用，以获得 Dart VM 的速度，并有能力定义你自己的函数和导入器。要将其添加到现有的项目中：

1、[安装 Dart SDK](https://www.dartlang.org/install#automated-installation-and-updates)。确保其 bin 目录[在你的 PATH 中](https://katiek2.github.io/path-doc/)。

2、创建一个像这样的 pubspec.yaml 文件：

```yaml
name: my_project
dev_dependencies:
  sass: ^1.62.1

```
1、运行 dart pub get。

2、创建一个像这样的 compile-sass.dart 文件：
```dart
import 'dart:io';
import 'package:sass/sass.dart' as sass;

void main(List<String> arguments) {
  var result = sass.compileToResult(arguments[0]);
  new File(arguments[1]).writeAsStringSync(result.css);
}
```
1、现在你可以使用这个来编译文件：

```
dart compile-sass.dart styles.scss styles.css

```

1、你可以进一步学习更多关于[编写 Dart 代码](https://www.dartlang.org/guides/language/language-tour)（它很简单！）和 [Sass 的 Dart API](https://pub.dev/documentation/sass/latest/sass/compileToResult.html)的信息。

### JavaScript库

Dart Sass 也以纯 JavaScript 的 sass 包的形式在 npm 上发布。纯 JS 版本比独立的可执行文件慢，但它易于集成到现有的工作流中，而且它允许你在 JavaScript 中定义自定义函数和导入器。你可以使用 npm install --save-dev sass 将它添加到你的项目中，并将它作为库引用：

```javascript
const sass = require('sass');

const result = sass.compile("style.scss");
console.log(result.css);

// 或者

const result = await sass.compileAsync("style.scss");
console.log(result.css);
```

当通过 npm 安装时，Dart Sass 支持一个全新的 JavaScript API，以及一个与旧的 Node Sass API 完全兼容的遗留 API。注意，当使用 sass 包时，由于异步回调的开销，同步 API 函数的速度是异步 API 的两倍多。