<!--title: Web Components 之初识-->
<!--date: 2019.6.24-->
<!--cate: 1-->

## 发展史
> 关于发展史，可以看看廖雪峰大大的[MVVM 廖雪峰](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000)文章，是从前端的发展史开始讲到mvvm的，能让我们很好的理解前端的发胀，以及思考web Components相对于以前的开发方式有什么不同。

### 原生JS和jQuery
最早，html页面是完全静态的，只需要编写好html文件放到Web服务器上即可。

<!-- more -->

随后出现的是创建动态html的方式，例如：JSP、ASP。通过模版拼接的方式，可以将数据渲染逻辑插入到html中。

在这之前，浏览器必须通过重新向服务器获取 一份新的html文件的方式去更新页面的内容，且浏览器不能修改页面的内容。

直到JS的出现，JS带来了对DOM的操作和css样式的操作等。这时浏览器就可以通过运行JS，实现对页面的修改。这给前端带来了很大的变革，例如：以前数据的校验是在服务器端的，有了JS可以在数据提交之前就进行数据校验，这样就避免了不必要的请求；还有就是有了JS，要更新页面，可以不用再向服务器请求一个新的页面，直接通过JS对页面进行修改即可等等。

在原生JS的API基础上，jQuery对原生API进行了封装，使元素操作更加简洁，并且jQuery还对浏览器兼容性做了一定的解决。

### 面向对象
当面向对象的思想出现在前端的时候，将一组高内聚、低耦合的交互通过抽象，例如，与时间选择器相关的交互行为进行封装，从而封装得到一些插件。

例如jQuery的一些插件库，Bootstrap这样的库等等。

### angular、react、vue
后来出现了目前大热的三大主流前端框架：angluar、react、vue，提出了组件的思想，在这些框架基础上可以对一些高内聚低耦合的功能进行封装组件，以便达到代码复用的目的。

但是由于这三大框架其实又各不相同，导致每个框架所对应的组件库不通用，每个框架只能使用所对应的组件库。

另外一个重要的区别是，在三个框架中，所谓的组件封装，其实还是基于JS的API去对dom进行操作。

而Web Components则是利用相关的API真正的创建了一个可复用的元素。

## Web Components基本概念

Web Components由四项主要技术组成，一起使用来创建封装功能的定制元素，可以在任何地方重用，不必担心代码冲突。

- Custom elements（自定义元素）
- Shadow DOM（影子DOM）
- HTML templates（HTML魔板）
- HTML Imports（HTML导入）

### Custom elements（自定义元素）
用户自定义的元素，通过[CustomElementRegistry](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry)对象注册一个custom element且返回已注册的信息。

> **CustomElementRegistry**即自定义元素注册表，该接口提供注册自定义元素和查询已注册元素的方法。而CustomElementRegistry的实例通过window.customElements获取。CustomElementRegistry方法：
>
>- define()： 定义一个新的自定义元素
>- get()：返回指定自定义元素的构造函数，未注册的则返回undefined
>- whenDefined()：返回当使用给定名称定义自定义元素时将会执行的promise。

自定义元素首先通过CustomElementRegistry.define()方法来注册一个custom emelent，该方法接受以下参数：

- DOMString：自定义元素的名称，必须要有短横线
- 类对象：定义元素的行为
- 包含extends属性的配置对象，可选参数。指定了所创建的元素继承自哪个内置元素。

如下：

```
window.customElements.define('my-test', MyTest, {extends: 'p'});
```
这个元素叫`my-test`，它的类对象是`MyTest`, 继承自`<p>`元素.

可想而知，自定义元素的核心API在于类对象，在类对象中去写自定义元素的行为，从而扩展元素的功能。

而类对象可以继承自任何元素API，例如HTMLElement、HTMLParagraphElement、HTMLDivElement等。

> 补充：Document、Node、Element、HTMLDocument、HTMLCollection、HTMLElement、NodeList之间的关系
> 
> 参考：[Element和Node的区别你造吗？](https://www.jianshu.com/p/695b5c78a7ca)
> 
> [JavaScript DOM 1－ Node, HTMLElement之间到底是什么关系](https://segmentfault.com/a/1190000009863666)

CustomElements有两种类型：

- Autonomous custom elements：独立元素，不继承其他内奸的HTML元素，直接写成HTML标签形式，例如：<my-test></my-test>。注意：该类型总是继承自HTMLElement。
- Customized built-in elements：继承自基本的HTML元素。创建时，在基本元素上设置is属性创建自定义元素，例如：<p is="my-test"></p>

#### 生命周期回调函数
- connectedCallback：当custom element首次被插入文档DOM时被调用
- disconnectedCallback：当custom element从文档DOM中删除时，被调用
- adoptedCallback：当custom element被移动到新的文档时，被调用
- attributeChangedCallback： 当 custom element增加、删除、修改自身属性时，被调用

### Shadow DOM
Shadow DOM用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

Shadow DOM允许将隐藏的DOM树添加到常规的DOM树中——它以shadow root为起始根节点，在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。如下图，图源自于MDN。

![Shadow DOM 图源自MDN](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/shadow-dom.png?raw=true)

Shadow DOM相关技术：

- Shadow host： 一个常规 DOM节点，Shadow DOM会被添加到这个节点上。
- Shadow tree：Shadow DOM内部的DOM树。
- Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
- Shadow root: Shadow tree的根节点。

#### 基本用法
Shadow DOM使用Element.attachShadow()方法将一个shadow root附加到任何一个元素上，接受一个配置对象作为参数，对象有一个mode属性：open表示可以通过页面内的js方法获取Shadow DOM，closed则相反。

使用Shadow DOM的基本的步骤如下：

*创建shadow root*

```
// 将Shadow root添加到custom elment上
let shadow = this.attachShadow({mode: 'open'});
```
*创建Shadow DOM结构*

这一步骤主要使用JS的API创建元素以及构建DOM结构，和元素属性的设置。

```
var wrapper = document.createElement('span');
wrapper.setAttribute('class','wrapper');
```

*为Shadow DOM添加样式*

通过创建\<style\>元素，并设置其textContent设置css样式。

```
var style = document.createElement('style');

style.textContent = `.wrapper{}`;
```

*将Shadow DOM添加到Shadow root上*

使用appendChild的API添加到Shadow root上。

```
shadow.appendChild(style);
shadow.appendChild(wrapper);
```

*最后，定义并使用Custom element*

```
// 定义
window.customElements.define('my-test', MyTest);

// 使用
<my-test></my-test>
```

### HTML templates
使用\<template\> 和 \<slot\> 元素编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

Shadow DOM通过结合\<template\>和\<slot\>，可以减少使用JS创建元素的操作，并且使用template定义的结构可以复用。

关于template和slot相关的API，参考：[Using templates and slots
](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)

### HTML Imports
一旦定义了自定义组件，最简单的重用它的方法就是使其定义细节保存在一个单独的文件中，然后使用导入机制将其导入到想要实际使用它的页面中。HTML 导入就是这样一种机制，尽管存在争议 — Mozilla 根本不同意这种方法，并打算在将来实现更合适的。

### 使用Web Components的通用步骤
1. 使用ES6类语法创建一个类，在这个类中再实际去定义web组件的行为和功能。
2. 使用CustomElementRegistry.define()方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类以及可选的，其所继承自的元素。
3. 如果需要的话，使用Element.attachShadow()方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
4. 如果需要的话，使用\<template> 和 \<slot>方法定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中，达到模版复用的目的。
5. 在页面任何使用自定义元素，和使用常规HTML元素一样。


> 个人理解，web components的四部分，并不是互相区别的，而是相互协作一起使用实现更全面的web componets的。