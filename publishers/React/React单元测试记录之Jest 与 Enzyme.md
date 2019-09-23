<!--title: React单元测试记录之Jest 与 Enzyme-->
<!--date: 2018.8.24-->
<!--cate: 1-->

### 学习以及参考文章
官方：
1. [Jest文档](https://jestjs.io/docs/en/getting-started)
2. [Enzyme文档](https://airbnb.io/enzyme/)
3. [React官方测试说明](https://doc.react-china.org/docs/test-renderer.html)
4. [JEST 官方对于React测试的说明](https://jestjs.io/docs/en/tutorial-react)

<!-- more -->

教程：
1. [对React组件进行单元测试](https://juejin.im/post/5a71413e5188252edb593020#heading-28)，主要包括一些概念、工具、测试思想和测试方法的说明与理解
2. [基于 Jest + Enzyme 的 React 单元测试](https://juejin.im/post/59019ac8b123db260cc6ae91)，主要是对于一个测试流程的整理和记录
3. [利用 Jest 为 React 组件编写单元测试](https://juejin.im/entry/5b1691a06fb9a01e38212ed2)，利用React比较原始的API进行测试

### 前言
本文基于[基于 Jest + Enzyme 的 React 单元测试](https://juejin.im/post/59019ac8b123db260cc6ae91)教程进行尝试，测试的项目基于dva，因为参考的教程应该不是基于dva的，所以与本项目的测试会有一定的差别，也就存在了问题。本文总结了在上述配置环境下使用Jest&Enzyme进行测试遇到的问题和需要增加的配置。主要的实现路径由简到繁，如下述测试用例所示。

### 测试用例记录
1. 测试无状态组件传入props是否传入正常（属性和方法）
2. 功能函数输入输出是否达预期测试
3. 非无状态组件的点击事件测试
4. reducer和effect测试

### 遇到的问题以及解决办法
#### 1. babel未preset react
报错：
```
Jest encountered an unexpected token
      This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.
      By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".
    
    ...
    
> 12 |     const wrapper = shallow(<TaskDescription {...props} />);
     |                             ^
```
这里主要是因为Jest无法解析Jsx文件导致的错误，需要在babel中配置preset中加入react:
```
"babel": {
    "env": {
      "test": {
        "presets": [
          "env",
          "react"
        ]
      }
    }
  }
```

#### 2. enzyme版本问题
```
Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
          configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
          before using any of Enzyme's top level APIs, where `Adapter` is the adapter
          corresponding to the library currently being tested. For example:

          import Adapter from 'enzyme-adapter-react-15';

          To find out more about this, see http://airbnb.io/enzyme/docs/installation/index.html

      10 |     }
      11 | 
    > 12 |     const wrapper = shallow(<TaskDescription {...props} />);
         |                     ^
```
参考解决办法：[Could not find declaration file for enzyme-adapter-react-16?](https://stackoverflow.com/questions/46435558/could-not-find-declaration-file-for-enzyme-adapter-react-16)
```
npm install enzyme-adapter-react-16 -D

// 对enzyme添加adapter，在对应的测试用例之中
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
```

#### 3. 断言库语法错误
参考解决办法：[TypeError: Cannot read property 'equal' of undefined
](https://stackoverflow.com/questions/39926517/typeerror-cannot-read-property-equal-of-undefined)
报错如下：
```
TypeError: Cannot read property 'equal' of undefined
```
代码如下：
```
expect('test').innerText).to.equal(props.title);
```
主要的错误是Jest使用的自带的断言库，但是上面的断言语法是chai.js的。

所以把to.equal()改为toEqual()即可。
详细的语法参考：[Jest Expect](https://jestjs.io/docs/en/expect)。

#### 4. 测试封装的组件中包含其他组件的情况不能使用shallow浅渲染进行测试
代码如下，使用enzyme的shallow进行浅渲染，即渲染虚拟DOM
```
import React from 'react';
import TaskDescription from './../src/components/OkrUpdate/TaskDescription';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    // 模拟props
    const props = {
        title: 'test',
        content: '123content'
    }

    const wrapper = enzyme.shallow(<TaskDescription {...props} />);
    return {
        props,
        wrapper
    };
}

describe('TaskDescription', () => {
    const { wrapper, props } = setup();
    console.log(wrapper.text());
    it('TaskDescription component should render', () => {
        expect(wrapper.contains(props.title)).toEqual(true);
    });
})
```
最后我们打印出来的wrapper.text()的内容如下：
```
console.log __test__/PureCompoents.spec.js:24
    <Card />
```
这的问题是因为浅渲染不能渲染出引用的组件，导致无法获取相应的信息。所以对于在测试的组件中还使用了其他组件的情况不能使用shallow进行测试，而使用mount，如下：
```
const wrapper = enzyme.mount(<TaskDescription {...props} />);
```

备注：另一种方法是使用shallow的dive()方法进行深层次的渲染，但是dive()一次只能渲染一层，如果是嵌套多层的组件，需要多次dive()。

#### 5. Jest不支持ES6语法
参考解决办法：[JEST不支持ES6语法解决办法](http://www.voidcn.com/article/p-ceessvhb-bnv.html)

报错:
```
This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.
      By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".
      Here's what you can do:
       • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
       • If you need a custom transformation specify a "transform" option in your config.
       • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.
      You'll find more details and examples of these config options in the docs:

    ...

    callback = () =>{
             ^
    }

```
问题在于JEST无法识别函数简写语法。

解决办法：
```
npm install --save-dev babel-preset-stage-2
```
修改package.json的babel配置：
```
  "babel": {
    "env": {
      "test": {
        "presets": [
          "env",
          "react",
          "stage-2"
        ]
      }
    }
  }
```

#### 6. JEST不支持ES6---装饰器
报错：
```
/Users/xxx/tap4fun/project/bonus-fe/src/routes/Employees/index.js: Decorators are not officially supported yet in 6.x pending a proposal update.
    However, if you need to use them you can install the legacy decorators transform with:

    npm install babel-plugin-transform-decorators-legacy --save-dev

    and add the following line to your .babelrc file:

    {
      "plugins": ["transform-decorators-legacy"]
    }
```
解决办法：
```
npm install babel-plugin-transform-decorators-legacy --save-dev
```
修改babel配置：
```
{
    "plugins": ["transform-decorators-legacy"]
}

```

#### 7. import语法报错---之antd内部的ES6语法无法解析
参考解决办法：[Unexpected token 'import' error while running Jest tests?](https://stackoverflow.com/questions/51127176/unexpected-token-import-error-while-running-jest-tests/51224088)

报错：
```
/Users/xxx/tap4fun/project/bonus-fe/node_modules/antd/es/upload/utils.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import _extends from 'babel-runtime/helpers/extends';
                                                                                             ^^^^^^

    SyntaxError: Unexpected token import
```
从上面可以看到，报错的位置是在node_modules内部的antd的错误，这里个人理解的原因是（emm...可能不准确）：Jest运行时虽然配置了babel语法解析的环境，但是当进行深层解析到antd的内部代码是不能使用babel解析。

解决办法：使用Jest的配置参数transformIgnorePatterns去忽略需要忽略的模块。在Jest的config中加入以下代码：
```
"transformIgnorePatterns": ["/node_modules/(?!antd)"]
```
#### 8. 关于测试组件中使用了路由和dva导致的错误---注册应用之后进行测试
这里出现这个问题是这样的场景：emm...就是想测组件内部的点击事件嘛，然后这个组件用到了路由history什么的，然后它就报错了，找不到history。

参考解决办法：[组件内部有监听路由变化的逻辑](http://jacelynfish.top/)

然后我参考上面的链接中的【组件内部有监听路由变化的逻辑】部分，emm...了解了要跑整个项目的测试大概是需要在测试的时候注册整个应用吧，这样才能使用路由、redux等。

在测试中注册应用的方式大概就和开发项目注册应用的方式相同：
```
import React from 'react';
import dva from 'dva';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createLoading from 'dva-loading';

enzyme.configure({ adapter: new Adapter() });

let app, wrapper;
beforeAll(() => {
    app = dva();
    app.use(createLoading());
    app.model(require('./../src/models/task_okr_update').default);
    app.router(require('./router').default);
    let App = app.start();
    wrapper = enzyme.mount(<App />);
});
```
这样使用enzyme挂载的wrapper就包括了整个应用，整个应用就可以进行测试。这样的又一个问题是，会不会使测试变得十分笨重，那么在配置路由的时候，可以只配置需要测试的路由组件。如下：
```
import React, { Component } from 'react';
import { Router, Route, Switch } from 'dva/router';
import OkrRejectUpdate from './../src/routes/Task/OkrRejectUpdate';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <AllRoutes />
        </Router>
    );
}

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={OkrRejectUpdate} />
                <Route exact path="/other" render={<div>other path</div>} />
            </Switch>
        );
    }
}

export default RouterConfig;
```
但是这样的话每写一个测试就需要多写一个路由配置和应用注册，就很麻烦，至于选哪一种方式还需要进一步的考虑（太菜了...分不清哪样更好）。

#### 9. webpack别名在Jest不能识别
这里的原因是在webpack中配置了别名以便访问更加便捷。但是在Jest中没有webpack的别名配置，当然不能访问别名，所以导致错误。

解决办法，在package.json中配置jest如下，加上别名的配置。
```
"jest": {
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        ".*\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "^@styles(.*)$": "<rootDir>/src/components/styles$1",
        "^@components(.*)$": "<rootDir>/src/components$1",
        "@utils(.*)$": "<rootDir>/src/utils$1"
    },
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!antd)"
    ]
},
```

### mock dva方式替换注册应用方式
前面提到的通过注册应用的方式来解决jest无法使用dva相关的属性的问题，对于测试来说过于的笨重，测试应该尽量的做到轻量以及高效。这里用第二种方法来解决这个问题---mock dva。

在__mocks__文件中新建dva.js，写入如下内容，其核心是使用jest的genMockFromModule()接口对dva进行mock，并在写入dva需要的一些属性和方法。
```
const React = require('react');
const dva = jest.genMockFromModule('dva');

dva.connect = () => WrappedComponent =>
    class Connect extends React.Component {
        render() {
            const props = {
                subscribe: f => f,
                dispatch: f => f,
                getState: f => f,
                history: {},
                match: {},
                ...this.props
            };
            return <WrappedComponent {...props} />;
        }
    };
module.exports = dva;
```
然后在jest config中配置dva的mock路径。
```
"^dva$": "<rootDir>/__mocks__/dva.js"
```
注意：需要注意的是，如果对应测试的组件中使用到了dispatch的回调then的话，这与我们上面mock的dispatch方法相冲突，f => f是没有回调的，在对应的组件中通过props中复写diapatch来解决这个问题。
```
dispatch: () => Promise.resolve({}),
```

### reducer和effect测试
参考：[添加了几个复杂场景的demo，增加了单元测试](https://github.com/dvajs/dva-example-user-dashboard/pull/15/commits/df7b5fed8fe9a778b9f802a6a9944192cc1a80bb)

reducer是纯函数，对于固定的输入得到固定的输出，所以对于reducer的测试就是传入测试数据并判断输出是否为预期即可。

对于effect的测试，引用下面这段话：
> 所谓的单元测试，其实要测试的是某个函数自身的逻辑是否全被覆盖，像在一个effect中对外部服务（比如网络请求）的调用，这些外部服务的执行过程其实与本模块的单元测试无关，因此，我们只需要验证这件事：
> 
> 是否发起了对某个服务的调用
>
> 至于说，这个服务是否在执行，无关于本模块的正确性，那是这个服务的单元测试要做的事。所以这么一来，一个effect实际上是转化为同步逻辑的测试，因为它是一个generator函数，只需对这个effect一路next，就能跑完整个逻辑。


对redux-saga的测试是这样的原理，而dva是对redux-saga的封装，这块的机制是一致的，所以我们可以用同样的方式，从model对象中获取reducer和effect，分别编写测试用例。


### 优化

1. 将package.json中的jest配置单独提取出来，使用jest --config=jest.config.js的方式读取配置。
2. 提取enzyme的adapter配置。
3. mock dva，避免在测试中重新注册应用。