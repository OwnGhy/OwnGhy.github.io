---
title: React父组件render引起子组件render
date: 2018-11-12 14:14:21
categories:
- React
tags:
- React
---

### 父组件render引起子组件render
由于`redux`与`dva`的出现，在React开发时使用`dva`进行开发而忽略了原生的一些概念。比如：父组件render必然会引起子组件的render。

父组件的render默认情况下就会触发子组件的render过程，子组件的render过程又会触发它的子组件的render过程，一直到React元素（即`jsx`中的`<div>`这样的元素）。
<!-- more -->
当render过程到了叶子节点，即React元素的时候，`diff`过程才开始进行计算，这时候`diff`算法会决定是否切实更新DOM元素。

> 注意： diff发生在render之后.

父组件render必然引起子组件render这一做法是十分浪费性能的，如果子组件没有改变的话就会引起不必要的render。

### 如何防止不必要的子组件render？
- `shouldComponentUpdate`

通过`shouldComponentUpdate`生命周期手动的判断组件是否需要更新，防止不必要的render
- `PureComponent`

参考：[React PureComponent 使用指南](https://juejin.im/entry/5934c9bc570c35005b556e1a)

`PureComponent`顾名思义是纯组件，`PureComponent`是优化 React 应用程序最重要的方法之一，在其内部React 自动帮我们做了一层浅比较，减少了手动写`shouldComponentUpdate`函数，当组件更新时，如果组件的props和state 都没发生改变render方法就不会触发，省去`Virtual DOM`的生成和比对过程，达到提升性能的目的。

### Redux状态传播路径
Redux使用一个对象存储整个应用的状态(`global state`)，当`global state`发生改变引起的状态传递是理解基于redux的react应用的渲染性能优化的重点。

Redux将React组件分为容器型组件和展示型组件。

**容器组件**

容器型组件一般通过`connet`函数生成，它订阅了全局状态的变化，通过`mapStateToProps`函数，我们可以对全局状态进行过滤，只返回该容器型组件关注的局部状态。

每一次全局状态变化都会调用所有容器型组件的`mapStateToProps`方法，该方法返回一个常规的Javascript对象，并将其合并到容器型组件的props上。

**展示组件**

展示型组件不直接从global state获取数据，其数据来源于父组件。当容器型组件对应global state有变化时，它会将变化传播到其所有的子组件(一般为展示型组件)。


### Redux内部的默认性能优化
Redux官方API函数`connect生`成的容器型组件，默认会提供一个`shouldComponentUpdate`函数，其中对props和state进行了浅层比较

参考：

[react父组件更新会 导致子组件更新吗](https://segmentfault.com/q/1010000011289209/a-1020000011289904)

[react+redux渲染性能优化原理](https://foio.github.io/react-redux-performance-boost/)

[React高效渲染策略](https://github.com/fi3ework/blog/issues/15)