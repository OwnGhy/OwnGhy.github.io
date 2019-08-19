<!--title: dva + typescript开发环境搭建-->
<!--date: 2019.02.28-->
<!--cate: 1-->

## 初始化项目
创建项目并进入项目使用npm命令初始化：

```bash
mkdir dva-typescript && cd dva-typescript
npm init
```

安装typescript:

```bash
npm i -D typescript
```
安装之后首先试一下，创建一个test.ts文件，写入一些测试代码：

```typescript
let num: number = 1;
let str: string = 'test string';

console.log(num);
console.log(str.split(''));
```
然后在命令行中进行编译，会发现目录下生成了ts编译为js代码的js文件。

```bash
tsc test.ts
```
测试成功之后这个文件可以删除啦。

创建tsconfig.json：

```bash
tsc --init
```
上面命令创建的tsconfig.json是默认的，下面改成我们需要的内容：

```json
{
  // 设置编译器选项
  "compilerOptions": {
    // 支持jsx，并使用react模式
    // react模式会生成React.createElement，使用前不需转换，输出.js文件
    "jsx": "react",
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "es6",
      "dom"
    ],
    // 仅用来控制输出的目录结构
    "rootDir": "src",
    // 指定生成哪个模块系统
    "module": "commonjs",
    // 指定ECMAScript目标版本
    "target": "es6",
    // 是否生成相应的.map文件
    "sourceMap": true,
    // 决定如何处理模块
    "moduleResolution": "node",
    // 不是函数的所有返回路径都有返回值时报错
    "noImplicitReturns": true,
    // 当 this表达式的值为 any类型的时候，生成一个错误
    "noImplicitThis": true,
    // 在表达式和声明上有隐含的 any类型时报错
    "noImplicitAny": true,
    // 严格的 null检查模式下， null和 undefined值不包含在任何类型里
    "strictNullChecks": true,
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 启用实验性的ES装饰器
    "experimentalDecorators": true
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

关于tsconfig.json的全部配置点这里👉[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html).

接下来安装react的相关依赖：

```bash
npm i -D react react-dom @types/react @types/react-dom
```
> 关于@types/xxx的安装
> 
> @types 支持全局和模块类型定义
> 
> npm中的@types包对大部分库支持，通过安装@types/xxx包为指定库添加声明文件。

react安装成功之后，试一下，src/routes文件夹下创建index.tsx，写入：

```
import * as React from 'react';

export default class Index extends React.Component {
    render() {
        return <div>react</div>
    }
}
```

> tsx后缀是ts对jsx语法支持的文件后缀。

然后在命令行中对tsx文件编译：

```bash
tsc --jsx react src/routes/index.tsx
```
可以看到生成的js文件则创建了React.createElement等逻辑。

## 配置webpack
安装webpack及相关包：

```bash
npm i -D webpack webpack-cli webpack-dev-server
```
创建webpack.config.js，写入：

```js
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlPlugin({
    title: 'Vue Starter',
    filename: 'index.html',
    template: 'index.html',
    inject: 'body'
});

module.exports = {
    mode: 'development',
    entry: [
        './src/index.tsx'
    ],
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ]
    },
    plugins: [
        htmlPlugin
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
};
```
在webpack中，为了识别tsx文件，我使用到了babel-loader和ts-loader，所以进行安装：

```bash
npm i -D babel-loader@7.1.5 ts-loader
```

安装样式相关loader：

```bash
npm i -D style-loader css-loader
```
另外为了避开手动写入bundle.js等问题，引入了html-webpack-pulgin包进行自动生成html并插入js，安装该插件：

```bash
npm i -D html-webpack-plugin
```

安装其他需要的相关babel包：

```bash
npm i -D babel-core babel-preset-es2015 babel-preset-react
```

配置.babelrc

```
{
  "presets": [
    "es2015",
    "react"
  ]
}
```

在package.json中添加脚本：

```
"scripts": {
    "start": "webpack-dev-server --progress --colors --hot --history-api-fallback --config ./webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

根目录下添加index.html作为模版：

```html
<!DOCTYPE html>
<html>
<head>
    <title>React Webpack Babel Setup</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

然后运行npm start项目就启动起来了。

## 配置dva
安装依赖：

```bash
npm i -D dva
```
然后在我们的入口文件中使用dva：

```
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

const app = dva({
    history: createHistory(),
    onError: (e) => {
        console.error(e.message);
    }
});

app.router(require('./router').default);

app.start("#root");
```
添加路由入口文件src/router.tsx：

```
import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import * as H from 'history';
import Index from './routes/Index';

function RouterConfig({ history }: { history: H.History }): JSX.Element {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
```

到这里一个基本的dva + typescript的开发环境就配置完啦。