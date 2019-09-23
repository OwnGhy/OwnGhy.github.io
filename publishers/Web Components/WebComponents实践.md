<!--title: Web Components 之实践-->
<!--date: 2019.7.1-->
<!--cate: 1-->
在上一篇中学习了一些 Web Components 的基本概念（[WebComponents初识](./WebComponents初识.md)），这一篇主要是实践一下怎么使用 Web Components 的API。

## 自定义元素
首先，这里实现一个 WordCount 自定义标签的例子，用于统计当前标签的字数，在当前标签最后标识字数。

核心代码如下，创建了一个 WordCount 的类，继承于`HTMLElement`，然后在里面添加了一个内容为字数的 span 标签，并添加到当前元素的最后。

<!-- more -->

然后再通过注册表实例`customElements`调用 define 接口注册自定义元素。define 方法的第一个参数是我们新创建元素的标签名称，必须有短横线`-`，避免与原生元素名字发生冲突。

```
class WordCount extends HTMLElement {
    constructor() {
        super();

        let text = document.createElement('span');

        text.textContent = `（字数：${this.textContent.length}）`;

        this.appendChild(text);
    }
}

customElements.define('word-count', WordCount);
```
在 html 文件中直接使用即可：

```
<word-count>这是一段用于统计的文字，我也不知道这里有多少个字呢～</word-count>
```

渲染效果如下：

![说明截图1](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE1.png?raw=true)

最后渲染出来的 DOM 结构是这样的，`word-count`是一个真正的自定义的标签，直接使用，并且会直接渲染到 DOM 中。

```
<word-count>
	这是一段用于统计的文字，我也不知道这里有多少个字呢～
	<span>（字数：26）</span>
</word-count>
```

另外，由于 Web Components 是一个真正的自定义标签，所以，你可以给标签添加所有原生标签支持的属性，例如添加 class，还可以根据 class 给标签设置样式。例如：

```
// html
<word-count class="word-count">
	这是一段用于统计的文字，我也不知道这里有多少个字呢～
	<span>（字数：26）</span>
</word-count>

// css
.word-count {
	color: #999;
}
```

并且可以使用 js 的选择器查询到自定义的标签。例如：

```
document.querySelector('word-count');
```

## Web Components 自定义公共 API
上面的字数统计，作为元素使用很简单明了，但是如果想再次复用这个字数，需要再获取标签去计算，所以可以给 WordCount 类暴露公共 API 去实现这一需求。

```
class WordCount extends HTMLElement {
    constructor() {
        super();
        this.len = this.textContent.length;

        let text = document.createElement('span');

        text.textContent = `（字数：${this.len}）`;

        this.appendChild(text);
    }
    getCount() {
        return this.len;
    }
}

customElements.define('word-count', WordCount);
```
然后再 JS 中，可以直接通过 WordCount 元素的公共 API getCount() 方法获取字数。

```
let wordCount = document.querySelector('word-count');

console.log(wordCount.getCount()); // 26
```

## 使用Shadow DOM
使用 Shadow DOM 自定义的元素的 HTML 和 CSS 会完全封装在组件内部。该自定义元素将在文档的 DOM 树中显示为单个 HTML 标签，其内部 HTML 结构则放在一个 #shadow-root 中。
### 直接自定义元素的缺点
在类中定义的元素样式会影响到外层的元素样式，例如，这里给记录字数的 span 标签添加一个颜色：

```
let style = document.createElement('style');
style.textContent = `
    span {
        color: green;
    }
`;

this.appendChild(style);
```

最后看到，外层的 span 标签也被 WordCount 类中添加的样式所影响。

![说明截图2](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE2.png?raw=true)

### 使用 Shadow DOM 优化
```
class WordCount extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let wrapper = document.createElement('div');
        wrapper.textContent = this.textContent;

        let text = document.createElement('span');
        text.textContent = `（字数：${wrapper.textContent.length}）`;

        let style = document.createElement('style');
        style.textContent = `
            span {
                color: green;
            }
        `;

        wrapper.appendChild(text);   
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('word-count', WordCount);
```

使用 Shadow DOM 之后，添加的样式完全不会影响外层的样式。

![说明截图3](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/%E8%AF%B4%E6%98%8E%E6%88%AA%E5%9B%BE3.png?raw=true)

Shadow DOM 内部的元素始终不会影响到它外部的元素，这为封装提供了便利，这也为 `CSS 提供了真正的作用域`，即组件内定义的所有 CSS 仅适用于组件本身。

另，这里的`mode: "open"`表示它可以在开发工具中检查，并通过查询、配置任何公开的 CSS 属性或监听它抛出的事件来交互。

## 生命周期
先回顾一下几个生命周期：

- connectedCallback：当 custom element 首次被插入文档 DOM 时调用。
- disconnectedCallback：当 custom element 从文档 DOM 中删除时调用。
- adoptedCallback：当 custom element 被移动到新的文档时调用。
- attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时调用。

### 对比 constructor 与 connectedCallback
constructor 是在创建自定义元素的时候调用，例如document.createElement时触发 contructor。

connectedCallback 在自定义元素插入到 DOM 的时候调用，例如 document.body.appendChild 插入自定义元素的时候调用 connectedCallback。


### 执行顺序

```
constructor() {
	super();
	console.log('constructor')
}
connectedCallback() {
    console.log('connectedCallback');
}
attributeChangedCallback(attr, odlVal, newVal) {
        console.log('attributeChangedCallback');
}
```
打印结果是：

```
constructor
attributeChangedCallback
connectedCallback
```
attributeChangedCallback 在 connectedCallback 前面的主要原因为了达到，在自定义元素被插入的时候，可以根据初始的属性去设置一些自定义元素的表现行为。所以在插入元素的时候，先触发一次 attributeChangedCallback，可以进行初始配置。

### 对比 Web Components 的 constructor 与 React 的 constructor
在 React 的 constructor 中，是不能操作 DOM 元素的，必须等到元素挂载完成之后，在 componentDidMount 生命周期中进行 DOM 的操作。

在 Web Components 的 constructor 中就可以进行DOM操作了，可以进行 DOM 访问、插入、删除等操作。

## 自定义元素的属性
在 React 或者 Vue 写组件的时候，可以通过在标签上传递 props，然后根据 props 的值做一些表现行为。

在 Web Components 中，如何实现呢？

首先是给自定义标签传入属性，用于初始化设置。给上面的 WordCount 传入 `color="red"`，如下：

```
<word-count color="red">这是一段用于统计的文字，我也不知道这里有多少个字呢～</word-count>
```
然后在`WordCount.js`中添加 color属性的 `getter`，这样就可以直接通过`this.color`获取到属性了：

```
get color() {
    return this.getAttribute('color');
}
```
然后在 constructor 中添加根据 this.color 设置样式的逻辑：

```
let style = document.createElement('style');
style.textContent = `
    span {
        color: ${this.color}
    }
`;
```
这时候，刷新页面可以看到字数统计部分的 span 的颜色就变成了红色啦✌️。

但是仅仅是根据传入值进行初始化是远远不够的，还需要当 color 属性改变的时候，同时也更新样式。要做到这一点，首先添加`observedAttributes`去监听 attribute color 的改变，然后添加`attributeChangedCallback`生命周期，当 attribute 改变时，去做相应的处理。如下：

```
static get observedAttributes() {
    return ['color'];
}

attributeChangedCallback(attr, odlVal, newVal) {
    switch(attr) {
        case 'color':
            this.color = newVal;
            break;
    }
}
```

然后给`this.color`添加setter，当设置 color 的时候，去做一些样式处理。

```
set color(color) {
    this.shadowRoot.querySelector('span').style.color = color;
}
```
然后在页面中添加一个测试按钮：

```
<button id="change">改变颜色</button>
```
为测试按钮绑定事件，去改变`word-count`标签的color属性：

```
document.getElementById('change').addEventListener('click', () => {
    wordCount.setAttribute('color', 'green');
});
```
测试，可以看到点击按钮的时候，颜色以及改变啦✌️～
![webc-attribute.gif](https://github.com/OwnGhy/Jotting/blob/master/assets/WebComponents/webc-attribute.gif?raw=true)

> 这里有点像手动实现数据双向绑定～













