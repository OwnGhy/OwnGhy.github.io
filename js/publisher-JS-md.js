(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: JS正则实践记录-->\n<!--date: 2018.12.11-->\n<!--cate: 1-->\n正则一直是我的弱项，基本的知识看了好几遍，但是当需求来了的时候，往往还是不能正确的使用正则去处理问题，常常都是在网上搜索的答案😢。\n\n为了掌握正则，在这里记录自己平时遇到的一些正则需求，以及使用方法，通过越来越多的使用，希望能真的掌握正则。\n\n另：由于我基础真的不好，所以都写得很基础😢，目的在于能巩固一下。`啰嗦预警~`\n\n> 关于正则的概念与基础的学习，可以参考这篇文章[JS正则表达式完整教程（略长）](https://juejin.im/post/5965943ff265da6c30653879#heading-0)，写得比较系统完整，非常棒呀，终于系统的学习正则了。\n\n<!-- more -->\n## 实际需求类\n\n### 获取URL的查询参数\n之前获取url的查询参数都是用的第三方的工具，其实要自己匹配获取还是很简单的。\n\n```\n// ?name=nancy&id=123\nlet query = {};\nlocation.search.replace(/([^?&=]+)=([^&]+)/g, ($0, $1, $2) => query[$1] = $2);\nconsole.log(query);  // { name: 'nancy', id: '123' }\n```\n解析，主要是两个分组和一个`=`：\n\n- `([^?&=]+)`：这个分组用于匹配查询参数的key，`[^?&=]`这个反向字符集中表示，key不能包括`?`、`&`或者`=`，达到去除这三个符号的目的\n- `=`：用`=`间隔key和value\n- `([^&]+)`：这一个分组和前一个分组差不多，只不过不包括`?`因为后面的value不会出现`?`，只在第一个字符出现\n\n通过replace的方法，将匹配的到key和value赋值到结果query中，目的达到啦✌️。\n\n### 匹配16进制颜色值\n```\nconst reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;\n\nconst colors = '#ad4 #eee #ffffff #123fff';\n\nconsole.log(colors.match(reg));\n// [\"#ad4\", \"#eee\", \"#ffffff\", \"#123fff\"]\n```\n解析：\n\n- `#`：16进制颜色以`#`开头\n- `[0-9a-fA-F]`：匹配16进制字符\n- `{6}`和`{3}`： 16进制颜色可以是6位的，也可以是3位的缩写， `|`表示可选，需要注意的是，`{6}`在`{3}`前面，是为了避免匹配6位时提前结束匹配\n\n### 匹配元素的id\n需求，一个字符串中包含一个元素，要求匹配该字符串中元素的id。\n\n```\nconst element = '<div id=\"test\"></div>';\nconst reg = /id=\".*\"/\nconsole.log(element.match(reg));\n// id=\"test\"\n```\n上面的正则很简单，就是匹配`id=\"`后带有任意字符任意次数，且以`\"`结尾的字符串。\n\n但是❗️，需要注意的是，量词`*`是**贪婪**的，上面的元素id匹配没有问题，但是当元素字符串为`<div id=\"test\" class=\"content\"></div>`的时候，上面的正则匹配结果是`id=\"test\" class=\"content\"`，因为`*`的贪婪模式，且通配符`.`中也包括了`\"`，所以正则会在匹配最后一个`\"`的时候才结束匹配。\n\n解决方法：\n\n```\nconst element = '<div id=\"test\" class=\"content\"></div>';\nconst reg = /id=\".*?\"/\nconsole.log(element.match(reg));  // id=\"test\"\n```\n解析，核心是惰性匹配：\n\n- `*?`：在`*`后面添加`?`即惰性模式，表示尽可能少的去匹配，当匹配到第一个`\"`时，将其归纳为尾部的`\"`\n\n但是上面的做法效率比较低，会涉及到“回溯”这个概念。所以可以优化：\n\n```\nconst element = '<div id=\"test\" class=\"content\"></div>';\nconst reg = /id=\"[^\"]\"/\nconsole.log(element.match(reg));\n// id=\"test\"\n```\n解析：\n\n- `[^\"]`：使用反向字符集去排除`\"`即可\n\n> 回溯，也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种状态出发所能达到的所有“状态”，当一条路走到“尽头”的时候（不能再前进），再后退一步或若干步，从另一种可能“状态”出发，继续搜索，直到所有的“路径”（状态）都试探过。这种不断“前进”、不断“回溯”寻找解的方法，就称作“回溯法”。\n> \n> 关于更多关于正则回溯的解释可以参考最开始提过的文章：[JS正则表达式完整教程（略长）](https://juejin.im/post/5965943ff265da6c30653879#heading-21)\n\n### 中括号内容及中括号加粗\n#### 场景\n需求是对系统用户的操作进行记录，后端会将操作描述拼接为`[张三]创建账单[213]`这样的字符串，在前端拿到之后需要进行处理，将中括号及中括号中的内容加粗。\n\n```\ntext.replace(/\\[[^\\[\\]]*]/g,$0 => {\n\treturn `<b>${$0}</b>`;\n})\n// <b>[张三]</b>创建账单<b>[213]</b>\n```\n上面的代码可以正确的匹配并得到结果。\n\n解析：\n\n- `\\[`：`[`是特殊符号，需要转义\n- `[^\\[\\]]*`:`[^]`表示反向字符集，在反向字符集中添加`\\[\\]`表示不匹配`[`和`]`，以避免嵌套中括的情况，`*`表示不是`[`和`]`的字符可以出现任意次数\n- `]`：表示结尾的匹配，需要注意的是`]`不是特殊字符，可以不用转移，但是在上一步的反向字符集中，为了区分反向字符集的结尾，所以进行了转义\n\n#### 拓展\n上面的正则，如果中括号出现嵌套的情况，例如：`[[张三]]创建账单[213]`会替换成`[<b>[张三]</b>创建账单<b>[213]</b>`，只会匹配最内层的中括号，那么如何匹配最外层的中括号呢？\n\n```\ntext.replace(/\\[[^\\]]*]*/g,$0 => {\n\treturn `<b>${$0}</b>`;\n})\n// \"<b>[[张三]]</b>创建账单<b>[213]</b>\"\n```\n\n解析，最大的区别在于下面两点：\n- `[^\\]]`：反向字符集中去除了`\\[`，以达到可以包括`[`的目的，但是依旧包含`\\]`是为了在遇到第一个`]`的时候继续匹配\n- `]*`： 尾部的结束可以多个`]`，这样避免了在遇到多个`]`的时候正则匹配提前结束，如果不添加`]*`的情况，那么最后的匹配结果将是`<b>[[张三]</b>]创建账单<b>[213]</b>`，导致遇到第一个中括号提前结束，以致匹配错误\n\n### 数字的千位分隔符表示\n```\nconst reg = /(?!^)(?=(\\d{3})+$)/g;\nconst numStr = '123456789';\nconsole.log(numStr.replace(reg, ','));\n// 123,456,789\n```\n解析：\n\n`(?=(\\d{3})+$)`： 首先`(?=p)`是位置匹配模式，子模式 p 这里是`(\\d{3})+$`，`(\\d{3})+`表示每三位数字为一组，`$`在这里有从尾部开始匹配的含义。所以这一组的含义就是匹配每三位数字前的位置。\n`(?!^) `：这一正则的含义是匹配的位置不能是开头，是为了解决 123456 匹配成 ,123,456 的情况。\n\n## 数字类\n待续...\n\n## 正则sao操作\n### 匹配任意字符\n我们知道`.`表示匹配任务字符，除了换行符、回车符、行分隔符和段分隔符，等同于`[^\\n\\r\\u2028\\u2029]`，要匹配任意字符可以用：`[\\d\\D]`、`[\\w\\W]`、`[\\s\\S]`和`[^]`，反正我觉得是有点sao的🤣。\n\n### 不匹配任何字符的正则\nemm...正则不就是要匹配嘛，你让我不匹配任何字符？？？有意思嘛😂。\n\n不过我还真在网上看到这个正则：`/.^/`。该正则就可以不匹配任何字符。该正则要求只有一个任意字符且，在开头之前，所有就是不匹配任何字符了🤣。");

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: 用过 ≠ 掌握之文件上传-->\n<!--date: 2019.10.23-->\n<!--cate: 1-->\n在开发中，虽然经常借助组件库 or 工具库实现了很多业务功能，但往往都没有去探究过原理或者自己手动实现过。虽然在敏捷开发过程中，不要重复造轮子才能满足敏捷开发的快节奏的需求。但是学习其中的原理能对我们的水平有很大的提升。\n\n为了让自己坚持下去，不让自己成为一个 **API 调用师**，立一个 flag，每周至少学习一个**用过 ≠ 掌握**的知识，会陆陆续续出这个系列的笔记。\n\n进入正题。\n\n正好今天看到一篇文件上传很完整的博客，所以对这方面做一个知识整理。\n<!-- more -->\n\n参考：[写给新手前端的各种文件上传攻略，从小图片到大文件断点续传](https://juejin.im/post/5da14778f265da5bb628e590)\n\n### HTTP 文件上传背后发生了什么？\n\n#### 文件是什么？\n\n文件本质上就是磁盘上的一段空间，文件的内容就是一串 2 进制数字（1 或者 0）。\n\n文件传输，就是把这串数字同感 http 协议传过去。\n\n服务器端，接到这段数据之后，按照协议规定的格式，把这串数字取出来，然后创建一个空文件（分配一段空间），然后把这段数字写进去，就成了一个跟上传文件完全一致的新文件。\n\n参考：[http：文件上传背后发生了什么？ - 随溪漂胖猫的回答 - 知乎](http：文件上传背后发生了什么？ - 随溪漂胖猫的回答 - 知乎\nhttps://www.zhihu.com/question/58118565/answer/155688756)\n\n#### MIME 是什么？\n\n**MIME** 并不陌生，但是一直都不是很明白它到底是什么。在 HTTP 请求中也会用到 **MIME**，所以先预备一下知识。**MIME** 不是 HTTP 协议的一部分，其全称 **MIME（Multipurpose Internet Mail Extensions）**即多用途互联网邮件扩展类型。其本质就是用于根据每个资源自身的属性标识每个资源的类型，例如视频、HTML 页面、图片等，都是不同类型的资源。\n\n例如通过`http://localhost/image.png`访问图片，并不是根据.png后缀去判断资源的类型，而是通过获取这个资源的 **MIME** 来获取这个资源的类型`image/png`。\n\n**MIME** 使用的地方很多：\n\n- HTTP 请求头中，用于设置 `Content-Type` 去标识当前请求体中的数据格式类型\n- `<script type='text/javascript'></script>`等类似的标签去标识资源的类型\n- ...\n\n所有 **MIME** 类型值：[MIME 参考手册](https://www.w3school.com.cn/media/media_mimeref.asp)。\n\n#### Content-Type 几种常见的类型\n\n**Content-Type** 用于说明请求或返回的消息主题是用什么方式编码。\n\n常见的类型有：\n\n- `application/x-www-form-urlencoded`：浏览器的原生form表单，提交的数据按 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码\n- `multipart/form-data`：常见的 POST 数据提交方式，使用表单上传文件时，需设置 form 的 enctype='multipart/form-data'\n- `application/json`：数据时序列化后的 JSON 字符串\n\n更多的类型参考：[HTTP content-type](https://www.runoob.com/http/http-content-type.html)\n\n#### 上传文件的 HTTP 报文分析\n\n普通 Form 表单数据请求报文:\n\n```\nPOST /upload HTTP/1.1\nHost: localhst\nCache-Control: no-cache\nContent-Type: multipart/form-data; boundary=----WebKitFormBoundarybygnDMezTNBFKJW8\n\n\n------WebKitFormBoundarybygnDMezTNBFKJW8\nContent-Disposition: form-data; name=\"param1\"\n\n1\n------WebKitFormBoundarybygnDMezTNBFKJW8\nContent-Disposition: form-data; name=\"param2\"\n\n2\n------WebKitFormBoundarybygnDMezTNBFKJW8--\n\n```\n\n在请求头中的 `Content-Type` 类型是 `multipart/form-data`，其中 boundary=----xxx 是多个表单项之间的分隔符，以达到分割数据的目的。分割得到的表单项中， `Content-Disposition` 包含了表单项的基本信息，固定以 `form-data` 开头，name 表示表单元素属性名。换行之后就是表单项的值。\n\n含文件的 Form 表单数据请求报文：\n\n```\nPOST /upload HTTP/1.1\nHost: localhst\nCache-Control: no-cache\nContent-Type: multipart/form-data; boundary=----Boundary\n\n------Boundary\nContent-Disposition: form-data; name=\"file\"; filename=\"file.png\"\nContent-Type: image/png\n\n<这里是图片二进制内容>\n------Boundary\nContent-Disposition: form-data; name=\"param1\"\n\nvalue1\n------Boundary\nContent-Disposition: form-data; name=\"param2\"\n\nvalue2\n------Boundary--\n```\n\n上面就是一个包含文件上传的请求报文，与普通的表单数据的报文不同，文件的表单项中的 `Content-Disposition` 会多一个 `filename` 标识上传的文件的名称；除此之外还会多一个 `Content-Type` 标识上传的文件的类型。\n\n#### HTTP 文件传输原理\n\nHTTP 协议是基于 TCP 的**流式传输协议**，在文件传输的时候，可以借助 TCP 的特点。\n\n- 分块传输：TCP 数据包的大小是有限的，当传输大量数据时，就必须分成多个数据包进行传输，每个包拥有**编号**，以便接受端按照顺序还原数据，且可以在丢包时找到丢失的包。HTTP 协议头信息的 `Content-Length` 表示信息体的大小，用于接受端确定传输的结束\n- 断点续传：当出现丢包时，会进行重传，这也是 TCP 可靠传输的特点。当客户端超过合理的往返时延（**RTT**）还未收到确认码，就会被认为是出现了丢包的情况\n- 多线程传输：每个数据包的传输，互相之间不会阻塞，是并行的\n\n### 基础上传接口\n\n#### Nodejs 原生\n\n```js\nconst http = require('http');\nconst fs = require('fs');\nconst querystring = require('querystring');\n\n// 用 http 模块创建一个 http 服务器\nhttp.createServer((req, res) => {\n\t\t// 判断请求 url\n    if (req.url === '/upload') {\n    \t\t// 判断 method\n        if (req.method.toLowerCase() === 'get') {\n            // 显示一个用于上传文件的form\n            res.writeHead(200, {'content-type': 'text/html'});\n\n            res.end(\n                `<form action=\"/upload\" enctype=\"multipart/form-data\" method=\"post\">\n                <input type=\"file\" name=\"upload\" multiple=\"multiple\" />\n                <input type=\"submit\" value=\"Upload\" />\n            </form>`\n            )\n        } else {\n            //这里指定编码，处理乱码的问题\n            res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});\n\n            if (req.headers['content-type'].indexOf('multipart/form-data') !== -1) {\n            \t\t// 解析文件\n                parseFile(req, res);\n            } else if (req.method.toLowerCase() === 'post') {\n                res.end('其他提交方式');\n            }\n        }\n    } else {\n    \t\tres.end('404');\n    }\n}).listen(3000);\n\nconsole.log('listening on 3000....');\n\nfunction parseFile(req, res) {\n\t\t// 二进制\n    req.setEncoding('binary');\n    let body = ''; // 文件数据\n    let fileName; // 文件名\n    let contentType; // 文件类型\n\n    // 边界字符串\n    var boundary = req.headers['content-type'].split(';')[1].replace('boundary=', '');\n\n\t\t// http 文件是分块传输的，需要依次接收传输数据\n    req.on('data', function (chunk) {\n        body += chunk;\n    });\n\n    req.on('end', function () {\n        try {\n            const file = querystring.parse(body, '\\r\\n', ':');\n            // 只处理图片\n            if (file['Content-Type'].indexOf('image') !== -1) {\n                // 获取文件名\n                fileName = file['Content-Disposition'].match(/filename=\"(.*)\"/)[1];\n                // 获取图片类型\n                contentType = file['Content-Type'].substring(1);\n                // 获取文件二进制数据开始位置，即 contentType 的结尾\n                const upperBoundary = body.toString().indexOf(contentType) + contentType.length;\n                const shorterData = body.toString().substring(upperBoundary);\n                // 替换开始结束位置的空格\n                const binaryData = shorterData.replace(/^\\s\\s*/, '').replace(/\\s\\s*$/, '');\n                // 保存文件\n                fs.writeFile(fileName, binaryData, 'binary', function (err) {\n                    res.end('图片上传成功');\n                })\n            } else {\n                res.end('只能上传图片文件');\n            }\n        } catch (err) {\n            console.log(err);\n            res.end('出错' + err);\n        }\n    });\n}\n```\n\n#### Koa\n\n- [koa-static](https://github.com/dlau/koa-body)：静态资源管理中间件，使用了之后可以直接访问服务的静态资源\n- [koa-body](https://github.com/dlau/koa-body)：koa主体解析中间件，支持 multipart、urlencoded 和 json的请求体。与 express 的主体解析中间件 multer 类似\n\nHTML 代码如下，注意，上传文件必须设置 `enctype=\"multipart/form-data\"`：\n\n```html\n<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Document</title>\n</head>\n<body>\n<form method=\"post\" action=\"http://localhost:8100\" enctype=\"multipart/form-data\">\n    <input type=\"file\" name=\"file1\"/>\n    <button type=\"submit\">上 传</button>\n</form>\n</body>\n</html>\n```\n\nnodejs 代码，配置 koa-body 就可以实现上传文件的接口：\n\n```js\nconst http = require('http');\nconst path = require('path');\nconst fs = require('fs');\nconst koaStatic = require('koa-static');\nconst koaBody = require('koa-body');\nconst Koa = require('koa2');\n\nconst app = new Koa();\nconst port = process.env.PORT || '8100';\nconst host = `http://localhost:${port}`;\n\napp.use(koaBody({\n    // 开启文件上传，默认是关闭\n    multipart: true,\n    formidable: {\n        // 设置文件的保存目录，不设置则保存在系统临时目录下\n        uploadDir: path.resolve(__dirname, './static'),\n        // 保持源文件的扩展\n        keepExtensions: true,\n    },\n}));\n\n//开启静态文件访问\napp.use(koaStatic(\n    path.resolve(__dirname, './static')\n));\n\nconst server = http.createServer(app.callback());\nserver.listen(port);\nconsole.log('server start');\n```\n\n存在的问题：\n\n- 上传后的文件是随机命名的\n- 上传完成后不会给前端返回结果\n\n要解决上面的问题，加上下面的代码即可：\n\n```\n//文件二次处理，修改名称\napp.use((ctx) => {\n    const file = ctx.request.files.file1;\n    const fpath = file.path;\n    const fname = file.name;\n\n    fs.renameSync(fpath, `${path.resolve(__dirname, './static')}/${fname}`);\n    //以 json 形式输出上传文件地址\n    ctx.body = `{\n        \"fileUrl\":\"${host}/static/${fname}\"\n    }`;\n});\n```\n\n### Koa 多文件上传\n\n原生的 nodejs 如何实现多文件上传，我目前还没有成功，因为多个文件在一个boundary的分割之内，还没有找到方法解析，之后找到解决方法，会在这里更新。\n\nHTML5 中，通过设置 input 标签 multiple 属性，可以达到同时上传多个文件的目的。\n\n```html\n<input type=\"file\" name=\"file1\" multiple/> \n```\n\n在之前的 koa 代码中，如果只使用 koa-body 的基本配置，就可以实现多文件上传，但是如果要解决每个文件保持原文件的名字的话，在文件二次处理的地方修改成以下代码：\n\n```js\n//文件二次处理，修改名称\napp.use((ctx) => {\n    console.log(ctx.request.files);\n    const files = ctx.request.files.file1;\n\n    const urls = files.map(file => {\n        const fpath = file.path;\n        const fname = file.name;\n\n        fs.renameSync(fpath, `${path.resolve(__dirname, './static')}/${fname}`);\n        return `${host}/static/${fname}`;\n    });\n\n    //以 json 形式输出上传文件地址\n    ctx.body = `{\n        \"fileUrl\":\"${urls}\"\n    }`;\n});\n```\n\n在上传多文件的时候，file1 是一个数组，通过遍历依次修改文件名称，最后返回所有的文件的url。\n\n### 无刷新上传\n\n#### xhr 结合 FormData 上传\n\n前面直接使用的是 form 表单上传，上传成功之后，页面会进行刷新，是很不好的交互。\n\n所以这里使用 xhr 结合 FormData 实现上传，在 js 中拿到 input 的 files 值，去模拟 FormData，然后使用 xhr 发送请求实现上传。\n\n```html\n<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Document</title>\n</head>\n<body>\n<input type=\"file\" id=\"file1\" multiple />\n<button type=\"submit\" id=\"submit\">上 传</button>\n<script>\n    document.getElementById('submit').addEventListener('click', function () {\n        // 获取文件列表，注意这里不是数组，而是对象\n        const fileList = document.getElementById('file1').files;\n        if (!fileList.length) {\n            alert('请选择文件');\n            return;\n        }\n        let formData = new FormData();\n        // 多文件遍历生成 formData 对象\n        for (let i = 0, len = fileList.length; i < len; i++) {\n            formData.append('file1', fileList[i]);\n        }\n\n        const xhr = new XMLHttpRequest();\n        xhr.open('POST', 'http://localhost:8100', true);\n        // 发送时，Content-Type 默认是 multipart/form-data\n        xhr.send(formData);\n        xhr.onreadystatechange = function () {\n            console.log('state change', xhr.readyState);\n            if (this.readyState === 4 && this.status === 200) {\n                // 返回值\n                const obj = JSON.parse(xhr.responseText);\n\n                console.log(obj);\n\n                if (obj.fileUrl.length) {\n                    alert('上传成功');\n                }\n            }\n        }\n    });\n</script>\n</body>\n</html>\n```\n\n### 解决跨域\n\n在前面基础接口部分，我们使用 form 表单进行上传，不会存在跨域问题，但在 xhr 结合 FormData 上传的时候，直接调用后端就会存在跨域问题。\n\n原因是 form 表单提交到另一个域名之后，原来页面的脚本是获取不到新页面中的内容的，所以浏览器认为这是安全的。\n\n但 xhr 结合 FormData 上传的时候，是可以读取响应内容的，所以浏览器为了保证数据的安全，设置了跨域。\n\n参考：[为什么form表单提交没有跨域问题，但ajax提交有跨域问题？- 知乎](https://www.zhihu.com/question/31592553)\n\n#### 什么是跨域？\n\n跨域实际上是**浏览器同源策略限制**的一类请求场景。\n\n**同源策略（SOP：same origin policy）**：是一种约定，是浏览器最核心的安全功能，如果缺少了同源策略，浏览器很容易受到 **XSS**、**CSFR**等攻击。**同源**是指协议、域名、端口三者相同。\n\n#### koa 解决跨域\n\n安装 koa-cors：\n\n```bash\nnpm i -S koa-cors\n```\n\n添加代码：\n\n```js\nconst cors = require('koa-cors');\n\napp.use(cors());\n```\n\n#### nodejs 原生解决跨域\n\n前端发送请求时配置：\n\n```js\n// 前端设置是否允许带 cookie\nxhr.withCredentials = true;\n```\n\n后端这是 response 参数：\n\n```js\nres.writeHead(200, {\n\t\t// 后端允许发送Cookie\n    'Access-Control-Allow-Credentials': 'true',\n    // 允许访问的域（协议+域名+端口）\n    'Access-Control-Allow-Origin': 'xxx',    \n});\n```\n\n这里使用的解决跨域的方法都属于 **CORS（跨域资源共享）**，更多的解决办法参考：[前端常见跨域解决方案（全）](https://juejin.im/entry/59b8fb276fb9a00a42474a6f)。\n\n### 上传图片预览\n\nHTML 中添加一个存放预览图片的 div：\n\n```\n<div class=\"preview-container\" id=\"preview\"></div>\n```\n\nJS 中添加预览逻辑：\n\n```js\ndocument.getElementById('file1').addEventListener('change', function (e) {\n  \tconst files = e.target.files;\n  \tconst previewContainer = document.getElementById('preview');\n\n  \tfor (let i = 0, len = files.length; i < len; i++) {\n    \tlet file = files[i];\n    \tlet img = document.createElement('img');\n    \timg.src = window.URL.createObjectURL(file);\n    \timg.className = 'preview-item';\n\n    \tpreviewContainer.appendChild(img);\n  }\n});\n```\n\n> **URL.createObjectURL()** 静态方法会创建一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定。这个新的URL 对象表示指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。\n\n### 上传进度\n\n- 借助 **XMLHttpRequest** 的 **onprogress** api 可以实现预览图片上传进度的功能\n\n- 借助上传事件的 event 对象的 **event.loaded** 和 **event.total** 计算文件上传的百分比\n- 多文件上传如果需要计算上传进度需要依次分别创建 xhr 对象并发送请求\n\n完整代码如下：\n\n```html\n<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Document</title>\n    <style>\n        .preview-container .preview-item img {\n            width: 200px;\n        }\n        .red {\n            background: red;\n        }\n        .green {\n            background: green;\n        }\n        .progress {\n            height: 20px;\n        }\n    </style>\n</head>\n<body>\n<input type=\"file\" id=\"file1\" multiple />\n<button type=\"submit\" id=\"submit\">上 传</button>\n<div class=\"preview-container\" id=\"preview\"></div>\n<script>\n    let willUploadFiles = [];\n    document.getElementById('file1').addEventListener('change', function (e) {\n        const files = e.target.files;\n        const previewContainer = document.getElementById('preview');\n\n\t\t\t\t// 遍历依次创建预览和进度的 DOM\n        for (let i = 0, len = files.length; i < len; i++) {\n            let file = files[i];\n            let wrapper = document.createElement('div');\n            wrapper.className = 'preview-item';\n            let img = document.createElement('img');\n            img.src = window.URL.createObjectURL(file);\n            let  progress = document.createElement('div');\n            progress.className = 'progress';\n            progress.innerHTML = '<span class=\"red\"></span><button type=\"button\">Abort</button>';\n\n            wrapper.appendChild(img);\n            wrapper.appendChild(progress);\n            previewContainer.appendChild(wrapper);\n\n\t\t\t\t\t\t// 把上传的文件相关的信息暂存，后续上传进度修改时使用\n            willUploadFiles.push({file, wrapper, progress});\n        }\n    });\n    document.getElementById('submit').addEventListener('click', function () {\n        // 获取文件列表，注意这里不是数组，而是对象\n        const fileList = document.getElementById('file1').files;\n        if (!fileList.length) {\n            alert('请选择文件');\n            return;\n        }\n        willUploadFiles.forEach(item => {\n            xhrSend(item.file, item.progress);\n        });\n    });\n\n    function xhrSend(file, progress) {\n        let progressSpan = progress.firstElementChild;\n        progressSpan.style.width = '0';\n        progressSpan.classList.remove('green');\n\n        let formData = new FormData();\n        formData.append('file1', file);\n\n        const xhr = new XMLHttpRequest();\n        xhr.open('POST', 'http://localhost:8100', true);\n\n        xhr.onreadystatechange = function () {\n            console.log('state change', xhr.readyState);\n            if (this.readyState === 4 && this.status === 200) {\n                // 返回值\n                const obj = JSON.parse(xhr.responseText);\n                console.log(obj);\n            }\n        };\n\n        xhr.onprogress = updateProgress;\n        xhr.upload.onprogress = updateProgress;\n\n        function updateProgress (event) {\n            // ProgressEvent.lengthComputable 标示 ProgressEvent 所关联的资源是否具有可以计算的长度\n            if (event.lengthComputable) {\n                // 计算上传百分比\n                let completedPercent = (event.loaded / event.total * 100).toFixed(2);\n                progressSpan.style.width = `${completedPercent}%`;\n                progressSpan.innerHTML = `${completedPercent}%`;\n\n                // 进度条变色\n                if (completedPercent > 90) {\n                    progressSpan.classList.add('green');\n                } else if(completedPercent >= 100){\n                    xhr.uploaded = true;\n                }\n                console.log('已上传',completedPercent);\n            }\n        }\n\n        // 发送时，Content-Type 默认是 multipart/form-data\n        xhr.send(formData);\n\n        let abortBtn = progress.getElementsByTagName('button')[0];\n        abortBtn.addEventListener('click', function (e) {\n            if (xhr && xhr.readyState !== 4) {\n                // 取消上传\n                xhr.abort();\n            }\n        });\n    }\n</script>\n</body>\n</html>\n```\n\n### 拖拽上传\n\n基于 HTML5 **拖拽**新特性，可以实现拖拽进入区域，上传文件的功能。\n\n- 禁用浏览器的默认拖放行为\n- 监听 **drop** 事件\n- **drop** 事件中，通过 **e.dataTransfer.files** 获取拖拽中的文件对象\n- 使用 **FormData** 和 **xhr** 结合上传文件\n\n具体的代码就不贴了。\n\n> 啊，写完了，我要坚持！🤯");

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: 移动端开发适配-->\n<!--date: 2019.10.24-->\n<!--cate: 1-->\n很久没有开发移动端了，回顾一下。\n\n### viewport\n\n`viewport`代表当前可见的计算机图形区域，即`viewport`是当前文档的可见部分。\n\n`viewport`参数：\n\n- width：控制视口的宽度，数字 or `device-width`这种特殊值，表示`viewport`的宽度是设备的宽度\n- height：同width\n- initial-scale：控制页面最初加载时的缩放等级\n- user-scalable：控制是否可以缩放页面\n- maximum-scale：允许用户缩放到的最大比例\n- minimum-scale：反之\n\n<!-- more -->\n\n例如：\n\n```html\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\">\n```\n\n### 像素非像素\n\n前端开发都知道，px 即 像素是 css 的一种单位。但是我们在移动端开发的时候，又会有这样的概念：手机的分辨率为 xxx 像素。需要注意的是，这里的设备的像素与 css 的单位 px 不是一个东西，设备的像素是**硬件像素**，一个 css px 可以对应多一个**硬件像素**， 以便实现高分辨率的屏幕，实现更清晰的屏幕。\n\n移动设备的**硬件像素**，又可以分为**逻辑像素(pt)**和**物理像素(px)**。\n\n### PPI（像素密度）\n\n iPhone X手机的两个参数：5.8 英寸屏幕，1125 x 2436 **物理分辨率**。\n\n> **屏幕尺寸**是以手机对角线来衡量的。\n\n**PPI**，即 Pixels per inch，每英寸上排列的物理像素点的数量。**PPI**越高，屏幕显示效果越精细。\n\n计算方法如下：\n\n> $$\\sqrt{a^2 + b ^ 2}/c$$\n\na 和 b 分别为屏幕的横向和纵向的**物理分辨率**，c 为屏幕的尺寸。\n\n这里 iPhone X 的 **PPI** 计算出来大概是 458。\n\n### DPI（点密度）\n\n iPhone X手机的两个参数：5.8 英寸屏幕，375 x 812 **逻辑分辨率**。\n\n**DPI**，即 Dot per inch，每英寸上的点（pt）的数量。DPI越大，手机屏幕显示的内容越多。\n\n需要注意的是，在 ios 中，**逻辑像素**的单位是 pt，在 android 中，**逻辑像素**的单位是 dp。它们之间的关系，在后面进行描述，这里以 pt 为单位。**DPI** 的计算方法和 **PPI** 的计算方法一致，就不赘述了。\n\n###  倍率与逻辑像素\n\n在前端开发的时候，UI 给的切图会有 @2x(2倍图) 或者 @3x(3倍图)，这就跟屏幕的倍率有关了。\n\n倍率出现的原因是因为，苹果以普通屏幕为基础，为 **Retina 屏** 定义了一个倍率，iPhone 3gs 到 iPhone 6 是 2 倍，iPhone 6 plus 以后是 3 倍。\n\n这里就得到了**逻辑像素**和**物理像素**的关系：\n\n> 逻辑像素 = 物理像素 / 倍率\n\n如果两个屏幕的**逻辑像素**相同，它们的显示效果就是相同的。\n\n关于 iPhone 大部分机型的相关参数，参考：[史上最全iPhone分辨率和尺寸](https://juejin.im/post/5bfddc336fb9a049d441804e)。\n\n但是 Android 的屏幕尺寸就太多了，没有一个有规律的尺寸，所以 Android 的设备的 dpi 划分成为几个区间范围，给不同范围的设备定义不同的倍率，使显示效果相近。\n\n| 密度   | ldpi      | mdpi      | hdpi      | xhdpi      | xxhdpi      |\n| ------ | --------- | --------- | --------- | ---------- | ----------- |\n| 密度值 | 120       | 160       | 240       | 320        | 480         |\n| 分辨率 | 240 x 320 | 320 x 480 | 480 x 800 | 720 x 1280 | 1080 x 1920 |\n| 倍率   | 0.75      | 1         | 1.5       | 2          | 3           |\n\n### 单位\n\n- px：物理像素\n- pt：逻辑像素\n- dp：设备独立像素，安卓专用长度单位\n- sp：放大像素，安卓专用字体单位\n\n真正决定显示效果的是**逻辑像素**。为此，iOS 和 Android 平台都定义了各自的**逻辑像素**单位，iOS 的尺寸单位为 pt，Android 的尺寸单位为dp。\n\n对应关系：\n\n- 1 倍：1pt = 1dp = 1px （这里px为物理像素）\n- 2 倍：2pt = 1dp = 2px（这里px为物理像素）\n- 3 倍：1pt = 1dp = 3px（这里px为物理像素）\n\n### DPR （设备像素比）\n\n**物理像素** 和 **逻辑像素** 比值，即屏幕的倍率。\n\n- JS 可以通过 `window.devicePixelRatio` 获取 **dpr**\n- CSS 通过媒体查询 `min-device-pixel-ratio` 区分 **dpr**\n\n```css\n@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }\n```\n\n### 移动端适配方案（rem）\n\n####  简略版\n\n由于当前的设备更多的是偏向于接近 375 分辨率、>= 2 倍率的手机屏幕，且设计师大多都是以 750 * 1340 为基础出设计图，所以一种简略的适配方法就是所有的屏幕都以这个基础实现 **设计稿** 到 **css px** 的换算。\n\n```js\n(function(doc, win) {\n    var docEl = doc.documentElement,\n    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';\n    var metaEl = doc.createElement('meta');\n    metaEl.name = 'viewport';\n    metaEl.content = 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';\n    docEl.firstElementChild.appendChild(metaEl);\n    var recalc = function() {\n    var width = docEl.clientWidth;\n    // pc 端情况保持最大750，以保留移动端的设计图效果\n    if (width > 750) {\n    width = 750;\n    }\n    // 设计图为 750，对应的设备的 375，即 设计图是专门在 375 的屏幕基础上设计的\n    // 在 375 的屏幕中，1csspx = 2设计图px\n    // 其他宽度屏幕与375屏幕的比例 = width / 375 ，所以其他设备的1设计图px = (width / 375) / 2 csspx\n    docEl.style.fontSize = 100 * (width / 750) + 'px';\n    };\n    recalc()\n    if (!doc.addEventListener) return;\n    win.addEventListener(resizeEvt, recalc, false);\n})(document, window);\n```\n\n这种解决办法中，设计图与 css px 之间的换算与 dpr 无关，initial-scale 始终是 1，是移动端的一种折中解决办法，可以保证 >= 2 倍率的屏幕正确或者是相似的显示（在比 2 倍率大的屏幕上呈现的效果会有一定的缩放）。但是在 1 倍屏幕上就会有问题，可能出现设计图内容显示不全的问题，由于 1倍率的屏幕越来越少，所以这种折中的解决办法可以保证大部分机型正确显示。\n\n#### 完整版\n\n虽说上面的简略版可以实现大部分需求，但是我们还是要考虑一下，2 倍率的设计图如何在 1 倍率屏幕上显示完全，在 3 倍率屏幕上等比例正确显示。参考淘宝的解决方法：\n\n```js\n(function(win) {\n    var doc = win.document;\n    var docEl = doc.documentElement;\n    var metaEl = doc.querySelector('meta[name=\"viewport\"]');\n    var dpr = 0;\n    var scale = 0;\n    var tid;\n\n    if (metaEl) {\n        var match = metaEl.getAttribute('content').match(/initial\\-scale=([\\d\\.]+)/);\n        if (match) {\n            scale = parseFloat(match[1]);\n            dpr = parseInt(1 / scale);\n        }\n    }\n\n    if (!dpr && !scale) {\n        var isAndroid = win.navigator.appVersion.match(/android/gi);\n        var isIPhone = win.navigator.appVersion.match(/iphone/gi);\n        var devicePixelRatio = win.devicePixelRatio;\n        if (isIPhone) {\n            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {\n                dpr = 3;\n            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {\n                dpr = 2;\n            } else {\n                dpr = 1;\n            }\n        } else {\n            // 其他设备下，仍旧使用1倍的方案\n            dpr = 1;\n        }\n        scale = 1 / dpr;\n    }\n\n    docEl.setAttribute('data-dpr', dpr);\n    if (!metaEl) {\n        metaEl = doc.createElement('meta');\n        metaEl.setAttribute('name', 'viewport');\n        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');\n        if (docEl.firstElementChild) {\n            docEl.firstElementChild.appendChild(metaEl);\n        } else {\n            var wrap = doc.createElement('div');\n            wrap.appendChild(metaEl);\n            doc.write(wrap.innerHTML);\n        }\n    }\n\n    function refreshRem() {\n        var width = docEl.getBoundingClientRect().width;\n        // 适配平板\n\t    if (width / dpr > 750) {\n\t      width = 750 * dpr\n\t    }\n\t    var rem = 100 * (width / 750)\n        docEl.style.fontSize = rem + 'px';\n    }\n\n    win.addEventListener('resize', function() {\n        // 函数防抖\n      \tclearTimeout(tid);\n        tid = setTimeout(refreshRem, 300);\n    }, false);\n    win.addEventListener('pageshow', function(e) {\n        if (e.persisted) {\n            clearTimeout(tid);\n            tid = setTimeout(refreshRem, 300);\n        }\n    }, false);\n\n    if (doc.readyState === 'complete') {\n        doc.body.style.fontSize = 12 * dpr + 'px';\n    } else {\n        doc.addEventListener('DOMContentLoaded', function(e) {\n            doc.body.style.fontSize = 12 * dpr + 'px';\n        }, false);\n    }\n\n    refreshRem();\n})(window);\n```\n\n关键在于 initial-scale 的设置，initial-scale 会影响 docEl.getBoundingClientRect().width 所获取到的值，该值为 width / initial-scale。这个的含义是这样的，拿 375 分辨率、3 倍率的屏幕来说，屏幕本来的 视口 viewport 是 375，但是为了做移动端适配，将 initial-scale 设置为了 1/3，代表着，屏幕初始就缩小了 1/3，所以屏幕的整个视口能显示的宽度变成了3倍，所以这个时候，docEl.getBoundingClientRect().width 所获取到的值是 1125。\n\n参考：[移动端(手机端)页面自适应解决方案—rem布局篇](https://segmentfault.com/a/1190000012225828)\n\n### 移动端开发常见问题\n\n#### 1px 问题\n\n在 **dpr** 大于 1 的屏幕上，CSS 中写的 1px 实际上是被多个**物理像素**渲染的，就会出现 1px 在有些屏幕看起来很粗的问题。\n\n解决办法：\n\n- border-image\n- background-image\n- transform\n- svg：svg 是矢量的\n- 根据 **dpr** 设置 viewport，例如：**dpr** 为 `3` 时，将页面缩放 `1/3` 倍，这时 `1px` 等于一个真正的**物理像素**，但是该方法需要所有的布局都按照**物理像素**来写\n\n```javascript\nconst scale = 1 / window.devicePixelRatio;\nconst viewport = document.querySelector('meta[name=\"viewport\"]');\nif (!viewport) {\n  viewport = document.createElement('meta');\n  viewport.setAttribute('name', 'viewport');\n  window.document.head.appendChild(viewport);\n}\nviewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);\n\n```\n\n#### 图片模糊问题\n\n平时开发使用的图片大多都属于位图（png、jpg...），位图由一个个像素点构成，每个像素都具有特定的位置和颜色值。\n\n理论上来说，**位图的一个像素对应于屏幕一个物理像素**才能达到最佳的现实效果。\n\n例如：一个 **1 倍图**的图片，\n\n在 **dpr** 为 `1` 的设备上，一个**图片像素**对应的就是一个**物理像素**，那么每个**物理像素**都能正确渲染每个位置的**图片像素**的颜色。\n\n在 **dpr** 为 `2` 的设备上，一个**图片像素**对应的就是**四**个**物理像素**，但是每个**物理像素**并不能被准确的分配上对应位置的**图片像素**的颜色，只能取近似值，所以会出现图片模糊的情况。\n\n其他的以此类推。\n\n解决方法：不同 **dpr** 的设备使用不同的倍数的图片。\n\n如：在`dpr = 2`的屏幕上展示两倍图`(@2x)`，在`dpr = 3`的屏幕上展示三倍图`(@3x)`。\n\n- 媒体查询\n\n```css\n.content{\n\tbackground-image: url(test_1x.png);\n}\n@media only screen and (-webkit-min-device-pixel-ratio:2){\n\t.content{\n\t\tbackground-image: url(test_2x.png);\n\t}\n}\n@media only screen and (-webkit-min-device-pixel-ratio:3){\n\t.content{\n\t\tbackground-image: url(test_3x.png);\n\t}\n}\n```\n\n- image-set\n\n```css\n.content {\n  background-image: -webkit-image-set(\"test_1x.png\" 1x, \"test_2x.png\" 2x);\n}\n```\n\n- srcset\n\n```html\n<img src=\"test_1x.png\" srcset=\"test_2x.png 2x, test_3x.png 3x\">\n```\n\n- svg：svg 是可缩放的矢量图，不存在放大模糊的问题\n\n#### 页面点击穿透问题\n\n移动端有**双击放大**的功能，在移动端，浏览器为了识别用户的操作是否为双击，通过对 click 事件进行 300ms 的延迟实现，如果 300ms 又发生了一次点击事件，那么说明用户的操作是双击；若 300ms 内没有click 事件发生，说明用户操作是单击操作，执行第一次的 click 事件。\n\n点击穿透的三种现象：\n\n- 点击穿透问题：点击蒙层的关闭按钮（绑定的是 touch 事件），蒙层消失后，300ms 后才触发关闭按钮下面的元素的 click 事件\n- 跨页面点击穿透问题：情况和上面蕾丝，如果按钮下面恰好是一个有 href 属性的 a 标签，页面在 300ms 后就会跳转，因为 a 标签跳转默认是 click 事件触发\n- 另一种跨页面点击穿透问题：没有蒙层的情况，点击（touch）页面内按钮跳转到新页面，然后发现新页面中对应位置元素的 click 事件 被触发\n\n解决办法：\n\n1. 不混用 touch 和 click 事件\n2. 针对会出现点击穿透的情况额外处理，例如：touch 触发蒙层消失，让蒙层 350ms 再消失等\n\n### 移动端开发工具\n\n- 微信 web 开发者工具\n- charles 抓包，查看请求数据\n- iPhone 的 Safari 浏览器可以和 Mac 的 Safari 联调\n\n### 参考\n\n[移动端尺寸基础知识 --分辨率，ppi dpi,px,pt,dp,sp](https://www.jianshu.com/p/118f59150810)\n\n[关于移动端适配，你必须要知道的](https://juejin.im/post/5cddf289f265da038f77696c#heading-37)");

/***/ })

}]);
//# sourceMappingURL=publisher-JS-md.js.map