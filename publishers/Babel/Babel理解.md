<!--title: Babel 理解-->
<!--date: 2019.7.9-->
<!--cate: 1-->

本文只是出于记录自己在理解 babel 时对一些概念的整理，参考了很多文章，出于记录的目的。

官网：[https://babel.docschina.org/docs/en/](https://babel.docschina.org/docs/en/)

## 前言
对于 Babel 的理解，目前还只停留在能够将 ES6 的代码转成 ES5 的（其实这样理解是不准确的），用于解决不同浏览器以及浏览器版本对 ES6 支持的兼容问题。至于之前怎么用 Babel，目前为止还只是停留在表面应用，添加 Babel 配置或者是配合 Webpack 使用；但为什么这样使用？以及 Babel 的一些包都不是很理解怎么分类的。

所以，反问一下自己真的会用 Babel 吗？

<!-- more -->

## 什么是Babel？
官网说法，Babel 是一个 Javascript 编译器，可以把用最新标准编写的 JS 代码或者 JSX 等，编译成浏览器或者node环境下能运行的 JS 代码，这个过程叫做“源码到源码”编译，又称转译（transpiling）。通过这个方式，就可以提前使用下一代的标准和特性进行编码，然后在现在的环境下运行。

参考：[Babel快速入门](https://segmentfault.com/a/1190000006085436)

## Babel 工作原理
上面说了 Babel 是一个转译器，Babel 转译的过程分为三个阶段：

1. 解析（parsing）：将代码字符串解析成抽象语法树
2. 变换（transforming）：对抽象语法树进行变换
3. 再建（generating）：根据变换后的抽象语法树生成转译后的代码字符串

> 以 Babel 转译 ES6 代码为例：
>
> ES6 代码输入 ---> babylon 解析 ---> 得到 AST 树 ---> 用 babel-generator 通过 AST 树生成 ES5 代码

## Babel 的包构成

### 核心包
- **babel-core**：babel 转译器本身，提供了 babel 的转译 API，如 babel.transform 等，用于对代码进行转译。比如 webpack 的 babel-loader 就是调用这些 API 完成转译过程的
- **babylon**： JS 的磁阀解析器
- **babel-traverse**：用于对 AST 树遍历，主要给 plugin 用
- **babel-generator**：根据 AST 树生产代码

### 功能包
- **babel-plugin-xxx**：babel 转译过程中使用到的插件，其中
 babel-plugin-transform-xxx 插件用于 transform 阶段
- **babel-preset-xxx**：transform 阶段使用到的一系列的plugin的集合，例如 babel-preset-es2015 和 babel-preset-react等
- **babel-polyfill**：新标准新增的原生对象和API等的转译，实现上是 core-js 和 regenerator-runtime 两个包的封装
- **babel-runtime**：功能类似 babel-polyfill ，一般用于 library 或 plugin 中，因为它不会污染全局作用域
- **babel-types**： 检查、构建、改变 AST 树的节点
- **babel-template**：用于从字符串形式代码构建 AST 树节点
- **babel-helpers**
- **babel-code-frames**

### 工具包
- **babel-cli**：babel 的命令行工具，通过命令行对 JS 代码进行转译
- **babel-register**：通过绑定 node.js 的 require 来自动转译 require 引用的 JS 代码文件

关于 Babel 原理的实现细节可以参考：

[Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)

[【JavaScript】深入理解Babel原理及其使用](https://www.jianshu.com/p/e9b94b2d52e2)

## Babel 一些概念整理
### Babel Plugin 与 Babel Preset 对比

Babel Plugin：Babel代码转换功能的核心。（原始代码 --> [Babel Plugin] --> 转换后的代码）。但是 Babel 插件拆分得很小，比如要使用箭头函数需要引入`babel-plugin-transform-es2015-arrow-functions`插件，需要支持其他的新特性就需要引入相应的插件，达到按需引入的目的，提高了性能，也提高了扩展性。
 
Babel Preset 就是用来解决上面逐个引入插件配置繁琐的问题，可以简单把 Babel Preset 看作是 Babel Plugin 的集合。例如，babel-preset-es2015包含所有与ES6转换有关的插件。

参考：[Babel：plugin、preset的区别与使用](https://juejin.im/entry/5b15d3acf265da6e38191f80)

### TC39 与 ECMA Script
TC39：推动 JS 发展的委员会，由各个浏览器厂商的代表构成。TC39 这一组织主要制定 ECMAScript 标准，标准生成的流程，并进行实现。

ECMA Script 标准产生的流程：

-  stage 0（strawman）：TC39 成员讨论、提交想法的阶段。
-  stage 1（proposal）：正式提案，发现提案的潜在问题，与其他特性的关系，及实现难题。这阶段提案包括详细的API描述，使用例子，以及关于相关的语义和算法。
-  stage 2（draft）：初始草案规范，与最终标准中包含的特性不会有太大差别。草案之后，原则上只接受增量修改。开始实验如何实现，实现形式包括polyfill, 实现引擎（提供草案执行本地支持），或者编译转换（例如babel）。
-  stage 3（candidate）：候选阶段，获得具体实现和用户的反馈。
-  stage 4（finished）：准备就绪，该特性会出现在下个版本的ECMAScript规范之中。

参考：[精读 TC39 与 ECMAScript 提案](https://github.com/dt-fe/weekly/blob/master/15.%E7%B2%BE%E8%AF%BB%20TC39%20%E4%B8%8E%20ECMAScript%20%E6%8F%90%E6%A1%88.md)

### preset-stage-x 之间的关系
注意：stage-x 与上面的 ECMA Script 标准产生的流程相对应。

参考：[babel配置-各阶段的stage的区别](https://www.vanadis.cn/2017/03/18/babel-stage-x/)

### 什么是 babel-polyfill ？
从上面的 “ Babel 工作原理”部分可知，Babel 经过“解析、变换、重建”三个步骤只是对输入的代码进行转译，输出对应版本的代码，并不会对 JS 运行时进行处理。所以，有下面的结论。

Babel 默认只转译新标准引入的 JS 语法；不转译新新标准引入的原生对象、原生对象新增的原型方法、新增的 API 等，例如： Set、Map、Reflect、Promise、Iterator、Generator 等全局对象，或者 Object.assign、Array.from 等对象上的原型方法。要想让这些代码能够运行，就需要 babel-polyfill。

这些新特性，只能在代码运行时（Babel 默认是处于构建时），使用polyfill进行转译，所以它需要安装为 dependency 而不是 devDependency 。

babel-polyfill 的初衷时模拟一整套 ES2015+ 的运行时环境，会polyfill全局的原生对象（Map、Promise、Set），或者是向全局的原生对象注入原型方法（Array.prototype.from），所以 polyfill 适合应用级开发，不适合 library 的开发。

参考： [Babel polyfill 知多少](https://zhuanlan.zhihu.com/p/29058936)

**为什么 Babel 默认不转译新标准引入的原生对象、原生对象新增的原型方法或者新增的 API ？**

我在知乎上看到贺师俊大佬的答案：保留正确的语义。这样说我能理解。


### polyfill 与 runtime
在前面对 polyfill 的理解中说了，polyfill 适合应用级开发，不适合 library 中使用。 这是因为 library 是给外部使用的，外部的环境不在 library 的可控范围内，使用 polyfill 会污染外部环境，容易发生冲突。

runtime 就是为了解决在 library 中对 新标准引入的原生对象、原生对象新增的原型方法以及新增的 API 等进行转译。 

### transform-runtime 和 babel-runtime
babel-runtime 是提供 runtime 环境的包，babel-plugin-transform-runtime 插件依赖于 babel-runtime，即 transform-runtime 做的操作就是把 JS 代码中使用到的新标准引入的原生对象、原生对象新增的原型方法及 API 等，转换成对 babel-runtime 实现包的引用。如下：

```
// ES6 代码
var symbol = Symbol();
```
通过 transform-runtime 转换后的代码：

```
var _symbol = require("babel-runtime/core-js/symbol");
var sym = (0, _symbol.default)();
```
这样转换后的代码，可以看到，babel-runtime 保留了 Symbol 的功能，且没有像 polyfill 那样污染全局环境。

且 babel-runtime 的实现实际上是在 core-js 中。

## Babel 5 到 Babel 6 到Babel 7
Babel 5使用全家桶的方式，直接包含了各种 package 和 plugins，十分的臃肿，不必要使用的 package 和 plugins 的安装，造成了空间的浪费。

### Babel 6 相对于Babel 5 的变化

1. **模块化（内置库拆分成独立的模块）**：babel-core、babel-node、babel-cli等
2. **插件化机制**：所有插件可选，意味着 Babel 默认不会变易 ES2015 代码，所有的 transformer 完全独立
3. **预置条件**：一组完成特定转换的plugins，减少复杂插件的配置，使用preset可以快速进行转码。
4. **.babelrc**：自定义的配置

### Babel 7 相对于 Babel 6 的变化

1. 弃用 Yearly Presets（如 babel-preset-es20xx），用 preset-env 代替
2. 弃用 preset-stage-x， stage-x 插件原本与 ECMA Script 提案中的不同阶段相对应，每个阶段有不同的特性， stage-相插件就是集合这个阶段中几种特性转译的插件（每个插件都会包含下一阶段的所有插件）。但 ECMA Script 提案一直在变，且特性进入提案之后又可能被废弃，导致 babel 身份很尴尬，是应该兼容老项目，还是遵循 ECMA Script 的规范？所以最终，弃用了 stage-x。
3. 使用 @babel 命名空间，防止官方插件名字被非官方插件名字占用与冲突（以前使用babel-cli变成@babel/cli），以做区分。
4. 针对 TC39 提案的特性转译插件使用 -proposal- 命名，更加明确这些插件只是针对提案特性转译，不是 JS 正式发布的特性。
5. 新增 babel.config.js，用于编写不同运行环境的 babel 配置，且可以使用 overrides 这一新特性。
6. 提供 babel-upgrade 工具，进行 babel 升级

官方升级文档：[Upgrade to Babel 7](https://babel.docschina.org/docs/en/v7-migration)

博客参考：

[babel 7 简单升级指南](https://juejin.im/post/5b87cab1e51d4538ac05dc54)

[了解 Babel 6 & 7 生态](https://github.com/creeperyang/blog/issues/25)