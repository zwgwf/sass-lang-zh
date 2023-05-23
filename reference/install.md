# 安装Sass

## 通过命令行的方式安装

![](https://sass-lang.com/assets/img/illustrations/keyboard-4d5a3e1a.svg)

当你在命令行中安装Sass时，你将能够运行sass可执行文件，将.sass和.scss文件编译为.css文件。例如：

```
sass source/stylesheets/index.scss build/stylesheets/index.css
```

首先使用以下选项之一安装Sass，然后运行sass --version以确保它已正确安装。如果安装正确，这将包括1.62.1。你也可以运行sass --help以获取有关命令行界面的更多信息。

一旦一切都设置好了，就去玩吧。如果你对Sass完全陌生，我们已经设置了一些资源来帮助你非常快地学习。

[学习更多关于Sass](./guide)

### 任何地方安装（npm）

如果你使用Node.js，你也可以通过运行npm来安装Sass。

```
npm install -g sass
```

然而，请注意，这将安装Sass的纯JavaScript实现，其运行速度比这里列出的其他选项稍慢。但它具有相同的接口，因此如果你稍后需要更快的速度，将另一个实现替换进来会很容易！

### 任何地方安装（独立）

你可以通过[从GitHub](https://github.com/sass/dart-sass/releases/tag/1.62.1)下载你的操作系统的包，并将其[添加到你的PATH](https://katiek2.github.io/path-doc/)来在Windows，Mac或Linux上安装Sass。没有外部依赖性，也不需要安装的其他任何东西。

### 在Windows上安装（Chocolatey）

如果你使用Windows的[Chocolatey包管理器](https://chocolatey.org/)，你可以通过运行以下命令来安装Dart Sass。

```
choco install sass
```

### 在Mac OS X或Linux上安装（Homebrew）

如果你使用Mac OS X或Linux的[Homebrew包管理器](https://brew.sh/)，你可以通过运行以下命令来安装Dart Sass。

```
brew install sass/sass/sass
```

## 通过应用程序的方式安装

![](https://sass-lang.com/assets/img/illustrations/mouse-3f5cd091.svg)

有许多应用程序可以让你在几分钟内在Mac、Windows和Linux上开始使用Sass。你可以免费下载大多数应用程序，但其中一些是付费应用程序（完全值得为它付费）。

* [CodeKit](https://codekitapp.com/)（付费）Mac
* [Prepros](https://prepros.io/)（付费）Mac Windows Linux

### 库

Sass团队维护了两个Node.js的Sass包，两者都支持[标准的JavaScript API](https://sass-lang.com/documentation/js-api)。[sass包](https://www.npmjs.com/package/sass)是纯JavaScript，稍微慢一些，但可以在Node.js支持的所有平台上安装。[sass-embedded包](https://www.npmjs.com/package/sass-embedded)在Dart VM周围包装了一个JS API，因此它更快，但只支持Windows，Mac OS和Linux。

还有社区维护的以下语言的包装器：

* [Ruby](https://github.com/ntkme/sass-embedded-host-ruby#readme)
* [Swift](https://github.com/johnfairh/swift-sass#readme)
* [Java](https://mvnrepository.com/artifact/de.larsgrefer.sass)，包括：
   * [一个Gradle插件](https://docs.freefair.io/gradle-plugins/current/reference/#_embedded_sass)。
   * 一个轻量级的[包装Sass CLI的Maven插件](https://github.com/HebiRobotics/sass-cli-maven-plugin)。它指定要使用的Sass版本。CLI参数通过`<args>`列表传入。
   * 一个包含全部功能的[包装Dart Sass的Maven插件](https://github.com/cleydyr/dart-sass-maven-plugin)。它捆绑了一个固定的dart-sass版本。CLI参数作为Maven参数暴露出来。