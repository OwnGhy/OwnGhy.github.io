(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: Web Components 之初识-->\n<!--date: 2019.6.24-->\n<!--cate: 1-->\n\n## 发展史\n> 关于发展史，可以看看廖雪峰大大的[MVVM 廖雪峰](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000)文章，是从前端的发展史开始讲到mvvm的，能让我们很好的理解前端的发胀，以及思考web Components相对于以前的开发方式有什么不同。\n\n### 原生JS和jQuery\n最早，html页面是完全静态的，只需要编写好html文件放到Web服务器上即可。\n\n<!-- more -->\n\n随后出现的是创建动态html的方式，例如：JSP、ASP。通过模版拼接的方式，可以将数据渲染逻辑插入到html中。\n\n在这之前，浏览器必须通过重新向服务器获取 一份新的html文件的方式去更新页面的内容，且浏览器不能修改页面的内容。\n\n直到JS的出现，JS带来了对DOM的操作和css样式的操作等。这时浏览器就可以通过运行JS，实现对页面的修改。这给前端带来了很大的变革，例如：以前数据的校验是在服务器端的，有了JS可以在数据提交之前就进行数据校验，这样就避免了不必要的请求；还有就是有了JS，要更新页面，可以不用再向服务器请求一个新的页面，直接通过JS对页面进行修改即可等等。\n\n在原生JS的API基础上，jQuery对原生API进行了封装，使元素操作更加简洁，并且jQuery还对浏览器兼容性做了一定的解决。\n\n### 面向对象\n当面向对象的思想出现在前端的时候，将一组高内聚、低耦合的交互通过抽象，例如，与时间选择器相关的交互行为进行封装，从而封装得到一些插件。\n\n例如jQuery的一些插件库，Bootstrap这样的库等等。\n\n### angular、react、vue\n后来出现了目前大热的三大主流前端框架：angluar、react、vue，提出了组件的思想，在这些框架基础上可以对一些高内聚低耦合的功能进行封装组件，以便达到代码复用的目的。\n\n但是由于这三大框架其实又各不相同，导致每个框架所对应的组件库不通用，每个框架只能使用所对应的组件库。\n\n另外一个重要的区别是，在三个框架中，所谓的组件封装，其实还是基于JS的API去对dom进行操作。\n\n而Web Components则是利用相关的API真正的创建了一个可复用的元素。\n\n## Web Components基本概念\n\nWeb Components由四项主要技术组成，一起使用来创建封装功能的定制元素，可以在任何地方重用，不必担心代码冲突。\n\n- Custom elements（自定义元素）\n- Shadow DOM（影子DOM）\n- HTML templates（HTML魔板）\n- HTML Imports（HTML导入）\n\n### Custom elements（自定义元素）\n用户自定义的元素，通过[CustomElementRegistry](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry)对象注册一个custom element且返回已注册的信息。\n\n> **CustomElementRegistry**即自定义元素注册表，该接口提供注册自定义元素和查询已注册元素的方法。而CustomElementRegistry的实例通过window.customElements获取。CustomElementRegistry方法：\n>\n>- define()： 定义一个新的自定义元素\n>- get()：返回指定自定义元素的构造函数，未注册的则返回undefined\n>- whenDefined()：返回当使用给定名称定义自定义元素时将会执行的promise。\n\n自定义元素首先通过CustomElementRegistry.define()方法来注册一个custom emelent，该方法接受以下参数：\n\n- DOMString：自定义元素的名称，必须要有短横线\n- 类对象：定义元素的行为\n- 包含extends属性的配置对象，可选参数。指定了所创建的元素继承自哪个内置元素。\n\n如下：\n\n```\nwindow.customElements.define('my-test', MyTest, {extends: 'p'});\n```\n这个元素叫`my-test`，它的类对象是`MyTest`, 继承自`<p>`元素.\n\n可想而知，自定义元素的核心API在于类对象，在类对象中去写自定义元素的行为，从而扩展元素的功能。\n\n而类对象可以继承自任何元素API，例如HTMLElement、HTMLParagraphElement、HTMLDivElement等。\n\n> 补充：Document、Node、Element、HTMLDocument、HTMLCollection、HTMLElement、NodeList之间的关系\n> \n> 参考：[Element和Node的区别你造吗？](https://www.jianshu.com/p/695b5c78a7ca)\n> \n> [JavaScript DOM 1－ Node, HTMLElement之间到底是什么关系](https://segmentfault.com/a/1190000009863666)\n\nCustomElements有两种类型：\n\n- Autonomous custom elements：独立元素，不继承其他内奸的HTML元素，直接写成HTML标签形式，例如：<my-test></my-test>。注意：该类型总是继承自HTMLElement。\n- Customized built-in elements：继承自基本的HTML元素。创建时，在基本元素上设置is属性创建自定义元素，例如：<p is=\"my-test\"></p>\n\n#### 生命周期回调函数\n- connectedCallback：当custom element首次被插入文档DOM时被调用\n- disconnectedCallback：当custom element从文档DOM中删除时，被调用\n- adoptedCallback：当custom element被移动到新的文档时，被调用\n- attributeChangedCallback： 当 custom element增加、删除、修改自身属性时，被调用\n\n### Shadow DOM\nShadow DOM用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。\n\nShadow DOM允许将隐藏的DOM树添加到常规的DOM树中——它以shadow root为起始根节点，在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。如下图，图源自于MDN。\n\n![Shadow DOM 图源自MDN](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/shadow-dom.png?raw=true)\n\nShadow DOM相关技术：\n\n- Shadow host： 一个常规 DOM节点，Shadow DOM会被添加到这个节点上。\n- Shadow tree：Shadow DOM内部的DOM树。\n- Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。\n- Shadow root: Shadow tree的根节点。\n\n#### 基本用法\nShadow DOM使用Element.attachShadow()方法将一个shadow root附加到任何一个元素上，接受一个配置对象作为参数，对象有一个mode属性：open表示可以通过页面内的js方法获取Shadow DOM，closed则相反。\n\n使用Shadow DOM的基本的步骤如下：\n\n*创建shadow root*\n\n```\n// 将Shadow root添加到custom elment上\nlet shadow = this.attachShadow({mode: 'open'});\n```\n*创建Shadow DOM结构*\n\n这一步骤主要使用JS的API创建元素以及构建DOM结构，和元素属性的设置。\n\n```\nvar wrapper = document.createElement('span');\nwrapper.setAttribute('class','wrapper');\n```\n\n*为Shadow DOM添加样式*\n\n通过创建\\<style\\>元素，并设置其textContent设置css样式。\n\n```\nvar style = document.createElement('style');\n\nstyle.textContent = `.wrapper{}`;\n```\n\n*将Shadow DOM添加到Shadow root上*\n\n使用appendChild的API添加到Shadow root上。\n\n```\nshadow.appendChild(style);\nshadow.appendChild(wrapper);\n```\n\n*最后，定义并使用Custom element*\n\n```\n// 定义\nwindow.customElements.define('my-test', MyTest);\n\n// 使用\n<my-test></my-test>\n```\n\n### HTML templates\n使用\\<template\\> 和 \\<slot\\> 元素编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。\n\nShadow DOM通过结合\\<template\\>和\\<slot\\>，可以减少使用JS创建元素的操作，并且使用template定义的结构可以复用。\n\n关于template和slot相关的API，参考：[Using templates and slots\n](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)\n\n### HTML Imports\n一旦定义了自定义组件，最简单的重用它的方法就是使其定义细节保存在一个单独的文件中，然后使用导入机制将其导入到想要实际使用它的页面中。HTML 导入就是这样一种机制，尽管存在争议 — Mozilla 根本不同意这种方法，并打算在将来实现更合适的。\n\n### 使用Web Components的通用步骤\n1. 使用ES6类语法创建一个类，在这个类中再实际去定义web组件的行为和功能。\n2. 使用CustomElementRegistry.define()方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类以及可选的，其所继承自的元素。\n3. 如果需要的话，使用Element.attachShadow()方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。\n4. 如果需要的话，使用\\<template> 和 \\<slot>方法定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中，达到模版复用的目的。\n5. 在页面任何使用自定义元素，和使用常规HTML元素一样。\n\n\n> 个人理解，web components的四部分，并不是互相区别的，而是相互协作一起使用实现更全面的web componets的。");

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: Web Components 之实践-->\n<!--date: 2019.7.1-->\n<!--cate: 1-->\n在上一篇中学习了一些 Web Components 的基本概念（[WebComponents初识](./WebComponents初识.md)），这一篇主要是实践一下怎么使用 Web Components 的API。\n\n## 自定义元素\n首先，这里实现一个 WordCount 自定义标签的例子，用于统计当前标签的字数，在当前标签最后标识字数。\n\n核心代码如下，创建了一个 WordCount 的类，继承于`HTMLElement`，然后在里面添加了一个内容为字数的 span 标签，并添加到当前元素的最后。\n\n<!-- more -->\n\n然后再通过注册表实例`customElements`调用 define 接口注册自定义元素。define 方法的第一个参数是我们新创建元素的标签名称，必须有短横线`-`，避免与原生元素名字发生冲突。\n\n```\nclass WordCount extends HTMLElement {\n    constructor() {\n        super();\n\n        let text = document.createElement('span');\n\n        text.textContent = `（字数：${this.textContent.length}）`;\n\n        this.appendChild(text);\n    }\n}\n\ncustomElements.define('word-count', WordCount);\n```\n在 html 文件中直接使用即可：\n\n```\n<word-count>这是一段用于统计的文字，我也不知道这里有多少个字呢～</word-count>\n```\n\n渲染效果如下：\n\n![说明截图1](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE1.png?raw=true)\n\n最后渲染出来的 DOM 结构是这样的，`word-count`是一个真正的自定义的标签，直接使用，并且会直接渲染到 DOM 中。\n\n```\n<word-count>\n\t这是一段用于统计的文字，我也不知道这里有多少个字呢～\n\t<span>（字数：26）</span>\n</word-count>\n```\n\n另外，由于 Web Components 是一个真正的自定义标签，所以，你可以给标签添加所有原生标签支持的属性，例如添加 class，还可以根据 class 给标签设置样式。例如：\n\n```\n// html\n<word-count class=\"word-count\">\n\t这是一段用于统计的文字，我也不知道这里有多少个字呢～\n\t<span>（字数：26）</span>\n</word-count>\n\n// css\n.word-count {\n\tcolor: #999;\n}\n```\n\n并且可以使用 js 的选择器查询到自定义的标签。例如：\n\n```\ndocument.querySelector('word-count');\n```\n\n## Web Components 自定义公共 API\n上面的字数统计，作为元素使用很简单明了，但是如果想再次复用这个字数，需要再获取标签去计算，所以可以给 WordCount 类暴露公共 API 去实现这一需求。\n\n```\nclass WordCount extends HTMLElement {\n    constructor() {\n        super();\n        this.len = this.textContent.length;\n\n        let text = document.createElement('span');\n\n        text.textContent = `（字数：${this.len}）`;\n\n        this.appendChild(text);\n    }\n    getCount() {\n        return this.len;\n    }\n}\n\ncustomElements.define('word-count', WordCount);\n```\n然后再 JS 中，可以直接通过 WordCount 元素的公共 API getCount() 方法获取字数。\n\n```\nlet wordCount = document.querySelector('word-count');\n\nconsole.log(wordCount.getCount()); // 26\n```\n\n## 使用Shadow DOM\n使用 Shadow DOM 自定义的元素的 HTML 和 CSS 会完全封装在组件内部。该自定义元素将在文档的 DOM 树中显示为单个 HTML 标签，其内部 HTML 结构则放在一个 #shadow-root 中。\n### 直接自定义元素的缺点\n在类中定义的元素样式会影响到外层的元素样式，例如，这里给记录字数的 span 标签添加一个颜色：\n\n```\nlet style = document.createElement('style');\nstyle.textContent = `\n    span {\n        color: green;\n    }\n`;\n\nthis.appendChild(style);\n```\n\n最后看到，外层的 span 标签也被 WordCount 类中添加的样式所影响。\n\n![说明截图2](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE2.png?raw=true)\n\n### 使用 Shadow DOM 优化\n```\nclass WordCount extends HTMLElement {\n    constructor() {\n        super();\n\n        let shadow = this.attachShadow({mode: 'open'});\n\n        let wrapper = document.createElement('div');\n        wrapper.textContent = this.textContent;\n\n        let text = document.createElement('span');\n        text.textContent = `（字数：${wrapper.textContent.length}）`;\n\n        let style = document.createElement('style');\n        style.textContent = `\n            span {\n                color: green;\n            }\n        `;\n\n        wrapper.appendChild(text);   \n        shadow.appendChild(style);\n        shadow.appendChild(wrapper);\n    }\n}\n\ncustomElements.define('word-count', WordCount);\n```\n\n使用 Shadow DOM 之后，添加的样式完全不会影响外层的样式。\n\n![说明截图3](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE3.png?raw=true)\n\nShadow DOM 内部的元素始终不会影响到它外部的元素，这为封装提供了便利，这也为 `CSS 提供了真正的作用域`，即组件内定义的所有 CSS 仅适用于组件本身。\n\n另，这里的`mode: \"open\"`表示它可以在开发工具中检查，并通过查询、配置任何公开的 CSS 属性或监听它抛出的事件来交互。\n\n## 生命周期\n先回顾一下几个生命周期：\n\n- connectedCallback：当 custom element 首次被插入文档 DOM 时调用。\n- disconnectedCallback：当 custom element 从文档 DOM 中删除时调用。\n- adoptedCallback：当 custom element 被移动到新的文档时调用。\n- attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时调用。\n\n### 对比 constructor 与 connectedCallback\nconstructor 是在创建自定义元素的时候调用，例如document.createElement时触发 contructor。\n\nconnectedCallback 在自定义元素插入到 DOM 的时候调用，例如 document.body.appendChild 插入自定义元素的时候调用 connectedCallback。\n\n\n### 执行顺序\n\n```\nconstructor() {\n\tsuper();\n\tconsole.log('constructor')\n}\nconnectedCallback() {\n    console.log('connectedCallback');\n}\nattributeChangedCallback(attr, odlVal, newVal) {\n        console.log('attributeChangedCallback');\n}\n```\n打印结果是：\n\n```\nconstructor\nattributeChangedCallback\nconnectedCallback\n```\nattributeChangedCallback 在 connectedCallback 前面的主要原因为了达到，在自定义元素被插入的时候，可以根据初始的属性去设置一些自定义元素的表现行为。所以在插入元素的时候，先触发一次 attributeChangedCallback，可以进行初始配置。\n\n### 对比 Web Components 的 constructor 与 React 的 constructor\n在 React 的 constructor 中，是不能操作 DOM 元素的，必须等到元素挂载完成之后，在 componentDidMount 生命周期中进行 DOM 的操作。\n\n在 Web Components 的 constructor 中就可以进行DOM操作了，可以进行 DOM 访问、插入、删除等操作。\n\n## 自定义元素的属性\n在 React 或者 Vue 写组件的时候，可以通过在标签上传递 props，然后根据 props 的值做一些表现行为。\n\n在 Web Components 中，如何实现呢？\n\n首先是给自定义标签传入属性，用于初始化设置。给上面的 WordCount 传入 `color=\"red\"`，如下：\n\n```\n<word-count color=\"red\">这是一段用于统计的文字，我也不知道这里有多少个字呢～</word-count>\n```\n然后在`WordCount.js`中添加 color属性的 `getter`，这样就可以直接通过`this.color`获取到属性了：\n\n```\nget color() {\n    return this.getAttribute('color');\n}\n```\n然后在 constructor 中添加根据 this.color 设置样式的逻辑：\n\n```\nlet style = document.createElement('style');\nstyle.textContent = `\n    span {\n        color: ${this.color}\n    }\n`;\n```\n这时候，刷新页面可以看到字数统计部分的 span 的颜色就变成了红色啦✌️。\n\n但是仅仅是根据传入值进行初始化是远远不够的，还需要当 color 属性改变的时候，同时也更新样式。要做到这一点，首先添加`observedAttributes`去监听 attribute color 的改变，然后添加`attributeChangedCallback`生命周期，当 attribute 改变时，去做相应的处理。如下：\n\n```\nstatic get observedAttributes() {\n    return ['color'];\n}\n\nattributeChangedCallback(attr, odlVal, newVal) {\n    switch(attr) {\n        case 'color':\n            this.color = newVal;\n            break;\n    }\n}\n```\n\n然后给`this.color`添加setter，当设置 color 的时候，去做一些样式处理。\n\n```\nset color(color) {\n    this.shadowRoot.querySelector('span').style.color = color;\n}\n```\n然后在页面中添加一个测试按钮：\n\n```\n<button id=\"change\">改变颜色</button>\n```\n为测试按钮绑定事件，去改变`word-count`标签的color属性：\n\n```\ndocument.getElementById('change').addEventListener('click', () => {\n    wordCount.setAttribute('color', 'green');\n});\n```\n测试，可以看到点击按钮的时候，颜色以及改变啦✌️～\n![webc-attribute.gif](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/webc-attribute.gif?raw=true)\n\n> 这里有点像手动实现数据双向绑定～\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

/***/ })

}]);
//# sourceMappingURL=publisher-Web-Components-WebComponents-md.js.map