(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: 轻轻松松开发一个VUE插件并发布到npm-->\n<!--date: 2019.05.06-->\n<!--cate: 1-->\n一直想了解如何发布一个npm包，然后也很想学习怎么开发一个vue插件，但是一直没有动手去做，最近对自己有点失望，💪卯足了劲终于动手做了一个还比较满意的插件。\n\n> 在开发这个插件的时候，项目搭建是自己从头开始写的，所以记录了一下，可以参考[从零搭建一个vue项目](https://juejin.im/post/5cc580215188257feb01cad8#heading-0)\n\n### 初始化项目\n创建文件夹并初始化：\n<!-- more -->\n\n```\nmkdir vue-fun-loading && cd vue-fun-loading\nnpm init\n```\n\n### 编写插件逻辑\n安装vue及相关插件：\n\n```\nnpm i -D vue vue-loader css-loader\n```\n\n创建插件的核心逻辑文件夹lib，以及写插件逻辑的文件：\n\n```\nmkdir lib && cd lib\ntouch Loading.vue\n```\n这里用一个loading的组件作为示例来说明，核心代码如下👇：\n\n```\n<!--/lib/Loading.vue-->\n<template>\n    <div :class=\"`fun-loading-circle-half fun-loading-circle-half-${size}`\"></div>\n</template>\n<script>\n    export default {\n        name: 'FunLoadingCircleHalf',\n        props: {\n            size: {\n                type: String,\n                default: 'middle',\n                elem: ['small', 'middle', 'large']\n            }\n        }\n    }\n</script>\n<style>\n    .fun-loading-circle-half {\n        border-radius: 50%;\n        border-color: #ff69b4 #ff69b4 transparent transparent;\n        border-style: solid;\n        animation: load_half_rorate .6s infinite;\n    }\n\n    .fun-loading-circle-half-small {\n        width: 14px;\n        height: 14px;\n        border-width: 3px;\n    }\n    .fun-loading-circle-half-middle {\n        width: 28px;\n        height: 28px;\n        border-width: 4px;\n    }\n    .fun-loading-circle-half-large {\n        width: 40px;\n        height: 40px;\n        border-width: 5px;\n    }\n\n    @keyframes load_half_rorate {\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n</style>\n```\n上面的代码比较简单，用css实现了一个半圆旋转的loading效果。\n\n然后lib文件夹下创建一个index.js文件，在这个文件中，通过访问window.vue使用Vue.component方法注册封装的Loading👇：\n\n```\n// /lib/index.js\nimport Loading from './Loading';\n\nconst install = function (Vue, opts = {}) {\n    if (install.installed) return;\n\n    Vue.component(Loading.name, Loading);\n};\n\nif (typeof window !== 'undefined' && window.Vue) {\n    install(window.Vue);\n}\n\nexport default install;\n```\n\n到这里插件的核心逻辑就完成了，接下来的打包配置方面。\n\n### webpack配置\n安装webpack，创建webpack.config.js：\n\n```\nnpm i -D webpack webpack-cli cross-env\ntouch webpack.config.js\n```\n通过配置webpack，对项目进行打包，配置如下👇：\n\n```\nconst path = require('path');\n\nconst config = {\n    mode: 'production',\n    entry: './lib/index.js',\n    output: {\n        filename: 'vue-fun-loading.js',\n        path: path.resolve(__dirname, './dist/'),\n        library: 'VueFunLoading',\n        libraryTarget: 'umd',\n        umdNamedDefine: true\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.vue$/,\n                loader: 'vue-loader'\n            },\n            {\n                test: /\\.css$/,\n                loader: 'css-loader'\n            }\n        ]\n    },\n    resolve: {\n        extensions: ['*', '.js', '.vue', '.json'],\n        alias: {\n            'vue$': 'vue/dist/vue.esm.js'\n        }\n    },\n    externals: {\n        'vue': 'vue'\n    },\n    devtool: '#eval-source-map'\n};\n\n\nmodule.exports = config;\n```\n其中loader的配置就不多说了，对于发布一个npm包最核心的配置就是output中的配置，这里说明一下：\n\n- libary：库的名称，取决于output.libraryTarget 选项的值\n- libaryTarget：配置如何暴露libary，值可以是：var（暴露为一个变量）、umd（暴露为所有的模块定义下都可运行的方式）、amd（暴露为 AMD 模块）、commonjs2（入口起点的返回值将分配给 module.exports 对象）或者通过在对象上赋值暴露等\n- umdNamedDefine：会对 UMD 的构建过程中的 AMD 模块进行命名，否则使用匿名的define\n\n> 关于更多的webpack创建libary的信息可以查看：[创建 library](https://www.webpackjs.com/guides/author-libraries/)\n\n然后在package.json中配置脚本：\n\n```\n\"scripts\": {\n    \"build\": \"cross-env NODE_ENV=production webpack --config ./build/webpack.config.js\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n```\n\n运行npm run build可以看到生成了dist文件以及vue-fun-loading.js，表示打包运行成功✌️。\n\n### npm发布与配置\n首先在package.json中添加配置：\n\n```\n// 公开\n\"private\": false,\n// 指定了加载的入口文件。默认值是模块根目录下面的index.js\n\"main\": \"dist/vue-fun-loading.js\",\n// 数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来\n\"files\": [\n\t\"dist\",\n\t\"lib\"\n],\n\"keywords\": [\n\t\"loading\",\n\t\"vue\"\n],\n// 如果有git项目，则可以配置git项目的地址\n\"repository\": {\n\t\"type\": \"git\",\n\t\"url\": \"https://github.com/OwnGhy/vue-fun-loading.git\"\n},\n```\n到这里所有的配置都完成了，只剩下发布npm包了✌️。\n\n发布npm包首先需要[注册](http://npmjs.org)一个npm 账号，注册之后登录：\n\n```\nnpm login\n```\n\n如果很久没有登录想要查看当前登录，使用：\n\n```\nnpm who am i\n```\n\n登录之后就可以发布包了：\n\n```\nnpm publish\n```\n需要注意的是，每次发布包基本更新package.json中的版本号。\n\n### 本地调试\n- `npm install 相对路径`直接安装相对路径进行调试，缺点是修改之后需要反复重新安装\n- 使用`npm link`将模块link到全局，然后在需要使用的项目中`npm link xxx`就可以了，调试完成之后再`npm unlink xxx`即可\n、\n调试参考：[你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)\n\n### 最后\n最后的最后，推销一下，我开发了一个各种各样loading效果的插件，感兴趣的小伙伴可以参考一下： [vue-fun-loading](https://github.com/OwnGhy/vue-fun-loading)。\n\n嘿嘿嘿，开心。");

/***/ })

}]);
//# sourceMappingURL=publisher-Vue-VUE-npm-md.js.map