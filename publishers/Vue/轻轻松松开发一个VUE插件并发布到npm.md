<!--title: 轻轻松松开发一个VUE插件并发布到npm-->
<!--date: 2019.05.06-->
<!--cate: 1-->
一直想了解如何发布一个npm包，然后也很想学习怎么开发一个vue插件，但是一直没有动手去做，最近对自己有点失望，💪卯足了劲终于动手做了一个还比较满意的插件。

> 在开发这个插件的时候，项目搭建是自己从头开始写的，所以记录了一下，可以参考[从零搭建一个vue项目](https://juejin.im/post/5cc580215188257feb01cad8#heading-0)

### 初始化项目
创建文件夹并初始化：
<!-- more -->

```
mkdir vue-fun-loading && cd vue-fun-loading
npm init
```

### 编写插件逻辑
安装vue及相关插件：

```
npm i -D vue vue-loader css-loader
```

创建插件的核心逻辑文件夹lib，以及写插件逻辑的文件：

```
mkdir lib && cd lib
touch Loading.vue
```
这里用一个loading的组件作为示例来说明，核心代码如下👇：

```
<!--/lib/Loading.vue-->
<template>
    <div :class="`fun-loading-circle-half fun-loading-circle-half-${size}`"></div>
</template>
<script>
    export default {
        name: 'FunLoadingCircleHalf',
        props: {
            size: {
                type: String,
                default: 'middle',
                elem: ['small', 'middle', 'large']
            }
        }
    }
</script>
<style>
    .fun-loading-circle-half {
        border-radius: 50%;
        border-color: #ff69b4 #ff69b4 transparent transparent;
        border-style: solid;
        animation: load_half_rorate .6s infinite;
    }

    .fun-loading-circle-half-small {
        width: 14px;
        height: 14px;
        border-width: 3px;
    }
    .fun-loading-circle-half-middle {
        width: 28px;
        height: 28px;
        border-width: 4px;
    }
    .fun-loading-circle-half-large {
        width: 40px;
        height: 40px;
        border-width: 5px;
    }

    @keyframes load_half_rorate {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
```
上面的代码比较简单，用css实现了一个半圆旋转的loading效果。

然后lib文件夹下创建一个index.js文件，在这个文件中，通过访问window.vue使用Vue.component方法注册封装的Loading👇：

```
// /lib/index.js
import Loading from './Loading';

const install = function (Vue, opts = {}) {
    if (install.installed) return;

    Vue.component(Loading.name, Loading);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;
```

到这里插件的核心逻辑就完成了，接下来的打包配置方面。

### webpack配置
安装webpack，创建webpack.config.js：

```
npm i -D webpack webpack-cli cross-env
touch webpack.config.js
```
通过配置webpack，对项目进行打包，配置如下👇：

```
const path = require('path');

const config = {
    mode: 'production',
    entry: './lib/index.js',
    output: {
        filename: 'vue-fun-loading.js',
        path: path.resolve(__dirname, './dist/'),
        library: 'VueFunLoading',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals: {
        'vue': 'vue'
    },
    devtool: '#eval-source-map'
};


module.exports = config;
```
其中loader的配置就不多说了，对于发布一个npm包最核心的配置就是output中的配置，这里说明一下：

- libary：库的名称，取决于output.libraryTarget 选项的值
- libaryTarget：配置如何暴露libary，值可以是：var（暴露为一个变量）、umd（暴露为所有的模块定义下都可运行的方式）、amd（暴露为 AMD 模块）、commonjs2（入口起点的返回值将分配给 module.exports 对象）或者通过在对象上赋值暴露等
- umdNamedDefine：会对 UMD 的构建过程中的 AMD 模块进行命名，否则使用匿名的define

> 关于更多的webpack创建libary的信息可以查看：[创建 library](https://www.webpackjs.com/guides/author-libraries/)

然后在package.json中配置脚本：

```
"scripts": {
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

运行npm run build可以看到生成了dist文件以及vue-fun-loading.js，表示打包运行成功✌️。

### npm发布与配置
首先在package.json中添加配置：

```
// 公开
"private": false,
// 指定了加载的入口文件。默认值是模块根目录下面的index.js
"main": "dist/vue-fun-loading.js",
// 数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来
"files": [
	"dist",
	"lib"
],
"keywords": [
	"loading",
	"vue"
],
// 如果有git项目，则可以配置git项目的地址
"repository": {
	"type": "git",
	"url": "https://github.com/OwnGhy/vue-fun-loading.git"
},
```
到这里所有的配置都完成了，只剩下发布npm包了✌️。

发布npm包首先需要[注册](http://npmjs.org)一个npm 账号，注册之后登录：

```
npm login
```

如果很久没有登录想要查看当前登录，使用：

```
npm who am i
```

登录之后就可以发布包了：

```
npm publish
```
需要注意的是，每次发布包基本更新package.json中的版本号。

### 本地调试
- `npm install 相对路径`直接安装相对路径进行调试，缺点是修改之后需要反复重新安装
- 使用`npm link`将模块link到全局，然后在需要使用的项目中`npm link xxx`就可以了，调试完成之后再`npm unlink xxx`即可
、
调试参考：[你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)

### 最后
最后的最后，推销一下，我开发了一个各种各样loading效果的插件，感兴趣的小伙伴可以参考一下： [vue-fun-loading](https://github.com/OwnGhy/vue-fun-loading)。

嘿嘿嘿，开心。