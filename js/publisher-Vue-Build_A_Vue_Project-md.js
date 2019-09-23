(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: 从零搭建一个vue项目-->\n<!--date: 2019.04.28-->\n<!--cate: 1-->\n\n最近感觉自己越来越像一个API调用程序员，很多基础的原理以及项目构建都没实际操作过，所以这里动手自己去搭建了一个vue项目，从webpack配置到vue配置，以及构建的优化，虽然写得并不好，但是自己在这个过程中也学到了一些东西，以此记录。\n\n`由于是真的从零开始，所以长文预警！！！😂`\n\n## 初始化项目\n首先☝️，在命令行中创建文件夹并进入，使用npm命令初始化项目：\n\n<!-- more -->\n\n```bash\nmkdir vue-starter && cd vue-starter\nnpm init\n```\n然后，创建index.html：\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <title>Vue Starter</title>\n</head>\n<body>\n    <h1>First Step!</h1>\n</body>\n</html>\n```\n\n创建src文件夹，并在src文件中创建main.js文件：\n\n```bash\nmkdir src && cd src\ntouch main.js\n```\nsrc/main.js中写入：\n\n```js\nwindow.onload = () => {\n\tconsole.log('load');\n};\n```\n\n这个时候如果在index.html中引入./src/main.js，并在浏览器中运行index.html会发现控制台中打印了‘load’。代码少看起来并不复杂，但是当我们业务变复杂，之后代码量过大，就需要我们进行打包构建了😊。\n\n所以下面进行webpack配置。\n\n## webpack第一步\n首先☝️，安装webpack 和webpack-cli：\n\n```bash\nnpm i -D webpack webpack-cli\n```\n\n然后，在package.json中配置运行webpack的脚本命令：\n\n```json\n\"scripts\": {\n    \"build\": \"cross-env NODE_ENV=production webpack --mode=production --config webpack.config.js\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n```\n这里用了新依赖，cross-env，进行安装：\n\n```bash\nnpm i -D cross-env\n```\n\n关于build脚本命令解释：\n\n1. cross-env依赖用于跨平台设置环境变量。在多数情况下，在windows平台下使用类似于: NODE_ENV=production的命令行指令会卡住；windows平台与POSIX在使用命令行时有许多区别（POSIX，使用$ENV_VAR；windows使用%ENV_VAR%）。cross-env就是解决这类跨平台问题的，统一每个平台的命令。\n2. NODE_ENV=development 设置 NODE 的环境变量为开发环境\n3. --mode=procution配置为生产环境模式\n4. --config webpack.config.js 指明配置文件位置（相对路径）\n\n创建webpack.config.js，webpack配置如下：\n\n```js\nconst path = require('path');\n\nconst config = {\n    entry: './src/main.js',\n    output: {\n        filename: 'bundle.js',\n        path: path.resolve(__dirname, './dist/')\n    }\n};\n\nmodule.exports = config;\n```\n上面是最基本的webpack配置，大概意思就是根据entry的./src/main.js内容进行打包构建输出到bundle.js.\n\n然后运行npm run build命令会，会得到dist文件夹以及dist/bundle.js文件，dist/bundle.js就是src/main.js打包构建之后的内容。\n\n现在将index.html中的src/main.js改成dist/bundle.js。\n\n```\n<script src=\"./dist/bundle.js\"></script>\n```\n再在浏览器中打开index.html，可以看到也得到了相同的效果。\n\n### 生成的bundle文件添加hash\n为什么添加hash？\n\n是为了防止浏览器缓存机制阻止文件的更新，为打包文件添加hash后缀之后，每次构建打包生成的文件名的hash都会发生改变，强制浏览器进行刷新，获取当前最新的文件就可以防止使用缓存文件。\n\n如何添加？\n在output中设置：\n\n```\noutput: {\n    filename: 'bundle.[hash].js',\n    path: path.resolve(__dirname, './dist/'),\n}\n```\n\n设置好hash之后，运行npm run build命令会发现dist下生成的bundle带上了hash。\n\n### 自动生成html文件\n在npm run build之后，dist文件夹中并没有index.html文件，要想引用打包的文件，需要手动引用，并且由于上一步为bundle添加了hash，所以每次构建都需要手动修改script标签的src路径。\n\n使用HtmlWebpackPlugin可以自动生成html文件并注入打包的文件。\n\n安装包：\n\n```bash\nnpm i -D html-webpack-plugin\n```\n\n在webpack.config.js中引入并在plugins中添加配置：\n\n```js\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\nconst htmlPlugin = new HtmlWebpackPlugin({\n    // 生成的html的title\n    title: 'Vue Starter',\n    // 生成的html的文件名\n    filename: 'index.html',\n    // 注入bundle到body中\n    inject: 'body'\n});\n\nconst config = {\n    entry: './src/main.js',\n    output: {\n        filename: 'bundle.[hash].js',\n        path: path.resolve(__dirname, './dist/')\n    },\n    plugins: [\n        htmlPlugin\n    ]\n};\n\nmodule.exports = config;\n```\n\n现在运行npm run build可以看到生成了index.html并且自动引用了带hash后缀的bundle.[hash].js。\n\n## 引入vue\n首先，安装vue与vue-loader：\n\n```bash\nnpm i -D vue vue-loader\n```\n安装成功之后会看到控制台有一个warning❗️：\n\n```bash\nnpm WARN vue-loader@15.6.2 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.\n```\n意思是安装的包还需要依赖css-loader，所以继续安装css-loader：\n\n```bash\nnpm i -D css-loader\n```\n\n然后在webpack.config.js中添加vue相关的loader：\n\n```js\nmodule: {\n    rules: [\n        {\n            test: /\\.vue$/,\n            loader:'vue-loader'\n        }\n    ]\n}\n```\nsrc下创建App.vue：\n\n```vue\n<template>\n    <div>\n        Second Step!\n    </div>\n</template>\n\n<script>\n    export default {\n        name: 'App',\n    }\n</script>\n```\n\nsrc下创建main.js：\n\n```js\nimport Vue from 'vue';\nimport App from './App.vue';\n\nconst root = document.createElement('div')\ndocument.body.appendChild(root)\n\nnew Vue({\n    render: (h) => h(App)\n}).$mount(root)\n```\n\n这时候我们运行npm run build命令会得到以下报错❗️：\n\n```bash\nModule Error (from ./node_modules/vue-loader/lib/index.js):\n[vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.\n```\n提示vue-loader需要依赖vue-template-compiler包，安装该包即可：\n\n```bash\nnpm i -D vue-template-compiler\n```\n然后运行npm run build又报错❗️啦：\n\n```\nERROR in ./src/App.vue\nModule Error (from ./node_modules/vue-loader/lib/index.js):\nvue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.\n @ ./src/main.js 2:0-28 8:21-24\n\nERROR in ./src/App.vue?vue&type=template&id=4fa9bc52& 2:0\nModule parse failed: Unexpected token (2:0)\nYou may need an appropriate loader to handle this file type.\n```\n这个bug是因为vue-loader版本问题引起的，v15版本需要依赖VueloaderPlugin包，解决这个问题的办法是使用v14版本的vue-loader，在package.json中修改vue-loader的版本为`14.2.2`，然后npm install一下就可以了。具体的解决办法参考👉[enableVueLoader does not include VueLoaderPlugin?](https://github.com/symfony/webpack-encore/issues/311)\n\n然后再运行npm run build，可以看到生成了dist文件夹与dist文件夹下的bundle.js。\n\n然后在浏览器中运行index.html可以看到，页面中内容为“Second Step！”，表示我们的npm run build成功构建了我们的vue代码啦✌️。\n\n## webpack开发环境（npm run dev）配置\n\n但是，这样的开发方式还不是很方便，每次写完代码之后，需要手动npm run build构建打包，再手动刷新页面。所以我们需要配置开发环境的运行脚本。\n\n首先，在package.json中添加dev命令脚本：\n\n```json\n\"scripts\": {\n    \"build\": \"cross-env NODE_ENV=production --mode=production webpack --config webpack.config.js\",\n    \"dev\": \"cross-env NODE_ENV=development webpack-dev-server --mode=development --config webpack.config.js --open\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n}\n```\n关于dev脚本命令解释：\n\n1. 与build不同的是，dev脚本使用了webpack-dev-server，webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包，用于开发者在开发中配置使用。\n2. --mode=development设置模式为开发环境\n3. --open设置后，会在服务器启动之后立即打开页面\n\n关于webpack-dev-server的理解与使用，可以参考这篇文章👉[详解webpack-dev-server的使用](https://segmentfault.com/a/1190000006964335)。\n\nwebpack-dev-server是独立的包，所以进行安装：\n\n```bash\nnpm i -D webpack-dev-server\n```\n对App.vue进行修改，将Second Step！修改为Third Step！\n\n然后命令行中运行npm run dev，服务器启动成功，命令行中出现：Project is running at http://localhost:8080/，从浏览器中进入http://localhost:8080/访问页面，但是页面中的内容依旧是Second Step！。\n\n服务器运行成功，但是页面内容未更新，这是什么原因呢？\n\n检查根目录下的index.html看到我们引入js的路径为/dist/bundle.js，但是进行npm run dev命令并没有更新dist的bundle.js。\n\n这是因为webpack-dev-server打包的内容是放在内存中的，并不会在真实的目录中生成。\n\n这里只需要把index.html中的引入bundle.js的script标签删除即可。因为在前面加了html-webpack-plugin包，在运行过程中会自动对内存中的index.html插入js。所以不需要再手动插入。\n\n> 注意：\n> \n> 如果还未使用html-webpack-plugin，则需要用publicPath来解决。设置devServer的publicPath为/dist/即可。\n> \n> 关于publicPath的理解可以参考这里👉[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094#heading-3)\n\n引入webpack-dev-server的目的就是为了在开发阶段根据修改快速更新页面，先试一下效果。修改App.vue内容为Third Step Updated!，然后Ctrl + s保存看看页面是否更新，在控制台中可以看到这样的提示：\n\n```\n[WDS] App updated. Recompiling...\nbundle.js:7 [WDS] App hot update...\n```\n可以看到进行了重新编译和更新，页面内容也进行了刷新，不需要重新运行npm run dev。\n\n## 进阶配置\n\n### 自动清理dist文件夹\n前面添加了hash的设置，每次npm run build的时候都会生成新的hash后缀的文件，不会覆盖之前的bundle.[hash].js，导致dist文件夹的内容越来越多。\n\n这里就可以使用clean-webpack-plugin包实现每次构建的时候自动清理dist文件夹，首先安装clean-webpack-plugin包：\n\n```bash\nnpm i -D clean-webpack-plugin\n```\n\nwebpack.config.js中引入clean-webpack-plugin包并在plugins中配置：\n\n```js\nconst CleanWebpackPlugin = require('clean-webpack-plugin');\n\nif (process.env.NODE_ENV === 'production') {\n\tconfig.plugins.push(new CleanWebpackPlugin());\n}\n```\n配置之后，每次运行npm run build就可以清理dist文件夹之前的内容了。\n\n### 添加css-loader\n一开始就安装了css-loader没使用，就算在App.vue中添加了样式也不会出错，那么css-loader到底是干什么的呢？\n\nwebpack的官方解释：\n> css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。\n\n在某些情况下，可能需要在js中引用css文件，例如添加一些全局的样式配置或者是通过引入css文件达到css修改热更新的目的等。这时候需要在js中通过require('xxx.css')引入，但是运行项目会出现以下错误。\n\n```bash\nERROR in ./src/text.css 1:0\nModule parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n```\n这时候在 webpack.config.js 中添加 css-loader 就能解决这个问题：\n\n```bash\n{\n    test: /\\.css$/,\n    loader:'css-loader'\n}\n```\n\n所以 css-loader 是处理 css 文件，将 css 装载到 javascript。\n\n> 注意\n> \n> 安装最新版本的css-loader（2.1.0）在构建（npm run build）的时候会出现如下错误：\n> \n> ValidationError: CSS Loader Invalid Options\n>\n> options should NOT have additional properties\n> \n> 由于目前暂未找到解决方法，所以暂时安装指定的旧版本（1.0.1），等找到解决方法之后会更新。\n\n\n关于css-loader理解参考这里👉[你真的知道 css-loader 怎么用吗？](https://juejin.im/entry/5826e755c4c9710054313d6e)\n\n关于style-loader理解参考这里👉[style-loader详细使用说明](https://juejin.im/post/5a2668996fb9a0450b663f20)\n\n关于样式相关的loader对比可以参考这里👉[style-loader、css-loader、mini-css-extract-plugin 区别](https://www.cnblogs.com/cag2050/p/10021306.html)\n\n### 添加图片处理loader\n```vue\n<template>\n    <div>\n        Third Step!\n    </div>\n</template>\n\n<script>\n    export default {\n       name: 'App',\n    }\n</script>\n<style>\n    div {\n    \twidth: 200px;\n\t\theight: 200px;\n\t\tbackground: url(\"./logo.png\");\n    }\n</style>\n```\n其中的关键是background的url设置，运行npm run dev会发现报错❗️：\n\n```bash\nERROR in ./src/logo.png 1:0\nModule parse failed: Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n```\n这个问题是项目不能识别图片后缀的原因，所以添加引用资源的loader：\n\n```bash\nnpm i -D url-loader\n```\nwebpack.config.js配置图片相关的loader：\n\n```js\n{\n    test: /\\.(png|jpg|gif)$/,\n    loader: 'url-loader'\n}\n```\n然后项目就可以成功运行且引入图片了✅。\n\n### 引入less\n安装less和less-loader：\n\n```bash\nnpm i -D less less-loader\n```\nwebpack.config.js中添加less的loader配置：\n\n```js\n{\n    test: /\\.less$/,\n    loader: 'style!css!less'\n}\n```\n然后既可以使用less了✌️！\n\n### 提取css\nextract-text-webpack-plugin只支持 webpack 4 以下提取 CSS 文件，webpack 4使用extract-text-webpack-plugin包的alpha版本，安装：\n\n```bash\nnpm i -D extract-text-webpack-plugin@next\n```\n\n在webpack.config.js中首先对vue文件中的样式做etract处理， 添加extractCSS的配置：\n\n```\n{\n    test: /\\.vue$/,\n    loader:'vue-loader',\n    options: {\n        extractCSS: true\n    }\n}\n```\n然后在plugins中使用extract-text-webpack-plugin：\n\n```\nconst ExtractTextPlugin = require('extract-text-webpack-plugin');\n\nplugins: [\n    htmlPlugin,\n    new ExtractTextPlugin('style.css')\n]\n```\n\n运行npm run build就可以成功单独提取css了。\n\n关于npm安装@next的解释参考这里👉[npm使用小技巧](https://www.jianshu.com/p/aee822f0ee7a)\n\n### 自动解析确定的扩展\n当前配置中，引用.vue等后缀的文件，不能省略后缀，必须明确写出，否则，无法识别。\n\n可以使用resolve的extensions配置，在webpack.config.js中添加下面的配置即可。\n\n```\n// other configurations\n\nresolve: {\n    extensions: ['*', '.js', '.vue', '.json']\n}\n\n// other configurations\n```\n现在就可以愉快的引入文件且不添加后缀啦。\n\n### 分离生产环境和开发环境的webpack配置，使用webpack-merge合并通用配置\n\n这一部分官网具体有说：[https://webpack.docschina.org/guides/production/](https://webpack.docschina.org/guides/production/)\n\n在上面的配置中，使用 npm run dev 运行开发环境，npm run build 运行生产环境。开发环境和生产环境的配置都在 webpack.config.js 中，对于两种环境不同的配置，使用 if 逻辑进行了判断与单独配置。当配置逻辑逐渐增加，if 中的逻辑会逐渐臃肿，所以有必要对生产环境和开发环境的配置进行分离。\n\n创建webpack.config.dev.js：\n\n```\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst ExtractTextPlugin = require('extract-text-webpack-plugin');\n\nconst htmlPlugin = new HtmlWebpackPlugin({\n    // 生成的html的title\n    title: 'Vue Starter',\n    // 生成的html的文件名\n    filename: 'index.html',\n    // 注入bundle到body中\n    inject: 'body'\n});\n\nconst config = {\n    entry: './src/main.js',\n    output: {\n        filename: 'bundle.[hash].js',\n        path: path.resolve(__dirname, './dist/')\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.vue$/,\n                loader:'vue-loader',\n                options: {\n                    extractCSS: true\n                }\n            },\n            {\n                test: /\\.css$/,\n                loader:'css-loader'\n            },\n            {\n                test: /\\.less$/,\n                loader: 'style!css!less'\n            },\n            {\n                test: /\\.(png|jpg|gif)$/,\n                loader: 'url-loader'\n            }\n        ]\n    },\n    plugins: [\n        htmlPlugin,\n        new ExtractTextPlugin('style.[hash].css')\n    ],\n    resolve: {\n        extensions: ['*', '.js', '.vue', '.json']\n    },\n    devtool: false,\n    devServer: {\n        noInfo: true\n    }\n};\nmodule.exports = config;\n```\n\n去掉了生产环境判断添加配置的逻辑。\n\n创建webpack.config.pro.js：\n\n```\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst CleanWebpackPlugin = require('clean-webpack-plugin');\nconst ExtractTextPlugin = require('extract-text-webpack-plugin');\n\nconst htmlPlugin = new HtmlWebpackPlugin({\n    // 生成的html的title\n    title: 'Vue Starter',\n    // 生成的html的文件名\n    filename: 'index.html',\n    // 注入bundle到body中\n    inject: 'body'\n});\n\nconst config = {\n    entry: './src/main.js',\n    output: {\n        filename: 'bundle.[hash].js',\n        path: path.resolve(__dirname, './dist/')\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.vue$/,\n                loader:'vue-loader',\n                options: {\n                    extractCSS: true\n                }\n            },\n            {\n                test: /\\.css$/,\n                loader:'css-loader'\n            },\n            {\n                test: /\\.less$/,\n                loader: 'style!css!less'\n            },\n            {\n                test: /\\.(png|jpg|gif)$/,\n                loader: 'url-loader'\n            }\n        ]\n    },\n    plugins: [\n        htmlPlugin,\n        new ExtractTextPlugin('style.[hash].css'),\n        new CleanWebpackPlugin()\n    ],\n    resolve: {\n        extensions: ['*', '.js', '.vue', '.json']\n    },\n    devtool: '#source-map',\n    devServer: {\n        noInfo: true\n    }\n};\n\nmodule.exports = config;\n```\n将 if 逻辑删除，直接配置生产环境需要的 plugins。\n\n修改 package.json 中开发环境和生产环境的配置文件：\n\n```\n\"dev\": \"cross-env NODE_ENV=development webpack-dev-server --mode=development --config webpack.config.dev.js --open\",\n\"build\": \"cross-env NODE_ENV=production webpack --mode=production --config webpack.config.pro.js\",\n```\n\n另外，除了一些特殊配置，可以看到还有很多相同的重复配置，本着 DRY 原则，可以提取通用的配置，然后使用 webpack-merge 进行合并。\n\n首先安装 webpack-merge：\n\n```bash\nnpm i -D webpack-merge\n```\n\n然后，将之前的 webpack.config.js 改名为 webpack.common.js，修改代码为 生产环境和开发环境通用的配置，主要是通用的 enter、output、module 和通用的 plugins。\n\n```\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst ExtractTextPlugin = require('extract-text-webpack-plugin');\n\nconst htmlPlugin = new HtmlWebpackPlugin({\n    // 生成的html的title\n    title: 'Vue Starter',\n    // 生成的html的文件名\n    filename: 'index.html',\n    // 注入bundle到body中\n    inject: 'body'\n});\n\nconst config = {\n    entry: './src/main.js',\n    output: {\n        filename: 'bundle.[hash].js',\n        path: path.resolve(__dirname, './dist/')\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.vue$/,\n                loader:'vue-loader',\n                options: {\n\t\t\t\t    extractCSS: true\n\t\t\t\t}\n            },\n            {\n\t\t\t    test: /\\.css$/,\n\t\t\t    loader:'css-loader'\n\t\t\t},\n\t\t\t{\n\t\t\t    test: /\\.less$/,\n\t\t\t    loader: 'style!css!less'\n\t\t\t},\n\t\t\t{\n\t\t\t    test: /\\.(png|jpg|gif)$/,\n\t\t\t    loader: 'url-loader'\n\t\t\t}\n        ]\n    },\n    plugins: [\n        htmlPlugin,\n        new ExtractTextPlugin('style.[hash].css')\n    ],\n    resolve: {\n        extensions: ['*', '.js', '.vue', '.json']\n    },\n};\n\n\nmodule.exports = config;\n```\n现在可以在 生产环境和开发环境的配置文件中使用 webpack-merge 和 通用的 common 配置。\n\nwebpack.config.dev.js：\n\n```\nconst merge = require('webpack-merge');\nconst common = require('./webpack.common.js');\n\nmodule.exports = merge(common, {\n    mode: 'development',\n      devtool: '#eval-source-map',\n    devServer: {\n        noInfo: true,\n        open: true\n    }\n});\n```\n\nwebpack.config.pro.js：\n\n```\nconst merge = require('webpack-merge');\nconst CleanWebpackPlugin = require('clean-webpack-plugin');\nconst common = require('./webpack.common.js');\n\nmodule.exports = merge(common, {\n    mode: 'production',\n    plugins: [\n        new CleanWebpackPlugin()\n    ],\n    devtool: '#source-map',\n});\n```\n\n然后修改 package.json，目的在于将之前的 mode 设置直接放到配置文件中，这样可以集中处理生产环境和开发环境的区别配置。\n\n```\n\"dev\": \"cross-env NODE_ENV=development webpack-dev-server --config webpack.config.dev.js\",\n\"build\": \"cross-env NODE_ENV=production webpack --config webpack.config.pro.js\",\n```\n\n这样就完成了，生产环境与开发环境的配置分离啦～✌️\n\n> 关于 source map\n> \n> 首先什么是 source map？\n> \n> 一句话来说，source map 就是一个信息文件，用来记录打包文件转换前的位置信息，便于调试。\n> \n> 详情参考阮一峰大大的博文：[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)\n> \n> 关于 webpack 中如何配置 source-map？\n> \n> 参考：[Webpack中的sourcemap以及如何在生产和开发环境中合理的设置sourcemap的类型\n](https://juejin.im/post/5b399490f265da59934b50c2)\n\n### 添加eslint\n使用eslint可以保证保证编码规范，自动检验代码，安装：\n\n```bash\nnpm i -D eslint eslint-config-standard babel-eslint eslint-config-vue eslint-plugin-vue  eslint-plugin-standard eslint-plugin-promise eslint-plugin-import\n```\n然后使用命令初始化eslint，会生成.eslintrc.js：\n\n```bash\neslint --init\n```\n\n在.eslintrc.js 写入如下配置：\n\n```js\nmodule.exports = {\n    parserOptions: {\n        parser: 'babel-eslint',\n        sourceType: 'module'\n    },\n    env: {\n        browser: true,\n    },\n    extends: ['vue', 'standard', 'plugin:vue/recommended'],\n    plugins: [\n        'vue',\n        \"standard\",\n        \"promise\"\n    ],\n    'rules': {\n        \"indent\": [\"error\", 4, { \"SwitchCase\": 1 }],\n        'arrow-parens': 0,\n        'generator-star-spacing': 0,\n        \"semi\": [\"error\", \"always\", { \"omitLastInOneLineBlock\": true }],\n        \"no-lone-blocks\": \"error\",\n        \"no-multi-spaces\": \"error\",\n        \"no-multiple-empty-lines\": [\"error\", { \"max\": 2 }],\n        \"no-param-reassign\": \"warn\",\n        \"no-spaced-func\": \"error\",\n        \"no-use-before-define\": \"error\",\n        \"no-unused-vars\": \"error\",\n        \"no-with\": \"error\",\n        \"key-spacing\": [\"error\", { \"beforeColon\": false, \"afterColon\": true }],\n        \"comma-spacing\": [\"error\", { \"before\": false, \"after\": true }],\n        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0\n    }\n}\n```\n\n然后在 package.json 中添加 lint 脚本命令：\n\n```\n    \"lint\": \"eslint --ext .js,.vue src\"\n```\n就可以通过npm run lint进行检查。\n\n为了能在编写代码的过程中编辑器就提醒错误，需要在webstorm -> Preferences -> Languages & Frameworks -> Javascript -> Code Quality Tools -> ESLint中勾选enable即可。\n\n## 参考\n本文相关的git地址：[vue-starter](https://github.com/OwnGhy/vue-starter)");

/***/ })

}]);
//# sourceMappingURL=publisher-Vue-Build_A_Vue_Project-md.js.map