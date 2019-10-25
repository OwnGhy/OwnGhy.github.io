(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: dva + typescript开发环境搭建-->\n<!--date: 2019.02.28-->\n<!--cate: 1-->\n\n## 初始化项目\n创建项目并进入项目使用npm命令初始化：\n\n```bash\nmkdir dva-typescript && cd dva-typescript\nnpm init\n```\n<!-- more -->\n安装typescript:\n\n```bash\nnpm i -D typescript\n```\n安装之后首先试一下，创建一个test.ts文件，写入一些测试代码：\n\n```typescript\nlet num: number = 1;\nlet str: string = 'test string';\n\nconsole.log(num);\nconsole.log(str.split(''));\n```\n然后在命令行中进行编译，会发现目录下生成了ts编译为js代码的js文件。\n\n```bash\ntsc test.ts\n```\n测试成功之后这个文件可以删除啦。\n\n创建tsconfig.json：\n\n```bash\ntsc --init\n```\n上面命令创建的tsconfig.json是默认的，下面改成我们需要的内容：\n\n```json\n{\n  // 设置编译器选项\n  \"compilerOptions\": {\n    // 支持jsx，并使用react模式\n    // react模式会生成React.createElement，使用前不需转换，输出.js文件\n    \"jsx\": \"react\",\n    // 编译过程中需要引入的库文件的列表\n    \"lib\": [\n      \"es6\",\n      \"dom\"\n    ],\n    // 仅用来控制输出的目录结构\n    \"rootDir\": \"src\",\n    // 指定生成哪个模块系统\n    \"module\": \"commonjs\",\n    // 指定ECMAScript目标版本\n    \"target\": \"es6\",\n    // 是否生成相应的.map文件\n    \"sourceMap\": true,\n    // 决定如何处理模块\n    \"moduleResolution\": \"node\",\n    // 不是函数的所有返回路径都有返回值时报错\n    \"noImplicitReturns\": true,\n    // 当 this表达式的值为 any类型的时候，生成一个错误\n    \"noImplicitThis\": true,\n    // 在表达式和声明上有隐含的 any类型时报错\n    \"noImplicitAny\": true,\n    // 严格的 null检查模式下， null和 undefined值不包含在任何类型里\n    \"strictNullChecks\": true,\n    // 允许从没有设置默认导出的模块中默认导入\n    \"allowSyntheticDefaultImports\": true,\n    // 启用实验性的ES装饰器\n    \"experimentalDecorators\": true\n  },\n  \"include\": [\n    \"./src\"\n  ],\n  \"exclude\": [\n    \"node_modules\"\n  ]\n}\n```\n\n关于tsconfig.json的全部配置点这里👉[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html).\n\n接下来安装react的相关依赖：\n\n```bash\nnpm i -D react react-dom @types/react @types/react-dom\n```\n> 关于@types/xxx的安装\n> \n> @types 支持全局和模块类型定义\n> \n> npm中的@types包对大部分库支持，通过安装@types/xxx包为指定库添加声明文件。\n\nreact安装成功之后，试一下，src/routes文件夹下创建index.tsx，写入：\n\n```\nimport * as React from 'react';\n\nexport default class Index extends React.Component {\n    render() {\n        return <div>react</div>\n    }\n}\n```\n\n> tsx后缀是ts对jsx语法支持的文件后缀。\n\n然后在命令行中对tsx文件编译：\n\n```bash\ntsc --jsx react src/routes/index.tsx\n```\n可以看到生成的js文件则创建了React.createElement等逻辑。\n\n## 配置webpack\n安装webpack及相关包：\n\n```bash\nnpm i -D webpack webpack-cli webpack-dev-server\n```\n创建webpack.config.js，写入：\n\n```js\nconst path = require('path');\nconst HtmlPlugin = require('html-webpack-plugin');\n\nconst htmlPlugin = new HtmlPlugin({\n    title: 'Vue Starter',\n    filename: 'index.html',\n    template: 'index.html',\n    inject: 'body'\n});\n\nmodule.exports = {\n    mode: 'development',\n    entry: [\n        './src/index.tsx'\n    ],\n    output: {\n        path: path.resolve(__dirname, '/dist'),\n        filename: 'bundle.js'\n    },\n    devServer: {\n        port: 8080,\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.tsx?$/,\n                exclude: /node_modules/,\n                use: [\n                    {\n                        loader: 'babel-loader'\n                    },\n                    {\n                        loader: 'ts-loader',\n                    }\n                ]\n            },\n            {\n                test: /\\.css$/,\n                use: [\n                    {\n                        loader: 'style-loader'\n                    },\n                    {\n                        loader: 'css-loader',\n                    },\n                ]\n            },\n        ]\n    },\n    plugins: [\n        htmlPlugin\n    ],\n    resolve: {\n        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']\n    },\n};\n```\n在webpack中，为了识别tsx文件，我使用到了babel-loader和ts-loader，所以进行安装：\n\n```bash\nnpm i -D babel-loader@7.1.5 ts-loader\n```\n\n安装样式相关loader：\n\n```bash\nnpm i -D style-loader css-loader\n```\n另外为了避开手动写入bundle.js等问题，引入了html-webpack-pulgin包进行自动生成html并插入js，安装该插件：\n\n```bash\nnpm i -D html-webpack-plugin\n```\n\n安装其他需要的相关babel包：\n\n```bash\nnpm i -D babel-core babel-preset-es2015 babel-preset-react\n```\n\n配置.babelrc\n\n```\n{\n  \"presets\": [\n    \"es2015\",\n    \"react\"\n  ]\n}\n```\n\n在package.json中添加脚本：\n\n```\n\"scripts\": {\n    \"start\": \"webpack-dev-server --progress --colors --hot --history-api-fallback --config ./webpack.config.js\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  }\n```\n\n根目录下添加index.html作为模版：\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>React Webpack Babel Setup</title>\n</head>\n<body>\n<div id=\"root\"></div>\n</body>\n</html>\n```\n\n然后运行npm start项目就启动起来了。\n\n## 配置dva\n安装依赖：\n\n```bash\nnpm i -D dva\n```\n然后在我们的入口文件中使用dva：\n\n```\nimport dva from 'dva';\nimport createHistory from 'history/createBrowserHistory';\n\nconst app = dva({\n    history: createHistory(),\n    onError: (e) => {\n        console.error(e.message);\n    }\n});\n\napp.router(require('./router').default);\n\napp.start(\"#root\");\n```\n添加路由入口文件src/router.tsx：\n\n```\nimport * as React from 'react';\nimport { Router, Route, Switch, Redirect } from 'dva/router';\nimport * as H from 'history';\nimport Index from './routes/Index';\n\nfunction RouterConfig({ history }: { history: H.History }): JSX.Element {\n    return (\n        <Router history={history}>\n            <Switch>\n                <Route path=\"/\" component={Index} />\n            </Switch>\n        </Router>\n    );\n}\n\nexport default RouterConfig;\n```\n\n到这里一个基本的dva + typescript的开发环境就配置完啦。");

/***/ })

}]);
//# sourceMappingURL=publisher-React-TS_DVA_Build-md.js.map