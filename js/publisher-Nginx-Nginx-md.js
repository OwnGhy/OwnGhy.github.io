(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--title: Nginx 学习与实践-->\n<!--date: 2019.10.29-->\n<!--cate: 1-->\nnginx 平时经常听到，但是目前还没有使用过，也没理解过其中的含义。\n\n### 概念\n\n首先，nginx 是一款轻量级的 web 服务器、反向代理服务器，由于它内存占用少，启动快且高并发能力强，经常在互联网项目中广泛应用。\n\n关键词：反向代理？什么是反向代理？\n\n<!--more-->\n\n#### 正向代理\n\n一般情况下，我们是不能直接访问到 google 的，通常是通过 VPN 来访问。而 VPN 就是一个**正向代理**的例子。\n\n**正向代理**大致过程：**客户端**不能访问某网站（例如：google），但是**客户端**能访问**代理服务器**；**代理服务器**可以访问 google；这时候**客户端**先连接上**代理服务器**，告诉它需要访问 google 的内容，**代理服务器**就会去取，返回给**客户端**。\n\n正向代理“代理”的是**客户端**，**客户端**是知道目标的，但目标不知道**客户端**是通过 VPN 访问的。\n\n**客户端**必须设置**正向代理服务器**，当然前提是要知道**正向代理服务器**的IP地址，还有代理程序的端口。\n\n用途：\n\n- 访问无法访问的资源\n- 可以做缓存，加速访问资源\n- 对**客户端**访问授权，上网进行认证\n- 记录用户访问记录（上网行为管理），对外隐藏用户信息\n\n#### 反向代理\n\n**反向代理**对外是透明的，访问者并不知道自己访问的是一个代理，**客户端**是无法感知代理的存在的，因为**客户端**不需要任何配置就可以访问。\n\n**反向代理**实际的运行方式是以代理服务器来接收 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将服务器上得到的结果返回给 internet 上请求连接的**客户端**，此时代理服务器对**客户端**就表现为一个服务器。\n\n用途：\n\n- 保证内网的安全，使用**反向代理**的 WAF（防火墙） 功能，阻止 web 攻击\n- 负载均衡，通过**反向代理服务器**来优化网站的负载\n\n#### 区别\n\n正向代理：client 与 proxy 属于一个 LAN（局域网），对 server 透明\n\n反向代理：server 与 proxy 属于一个 LAN（局域网），对 client 透明\n\n### nginx\n\n#### nginx 的 master-worker 模式\n\n启动 nginx 后，在 80 端口启动了 Socket 服务进行监听，这个监听过程中主要使用到了 **master 进程** 和 **worker 进程**。\n\n- **master 进程**：读取并验证配置文件 nginx.conf；管理 **worker 进程**，接收来自外界的信号，向各 **worker 进程**发送信号，监控 **worker 进程**的运行状态，当 **worker 进程**退出后(异常情况下)，会自动重新启动新的 **worker 进程**。\n\n- **worker 进程**：每个 **worker 进程**都维护一个线程（避免线程切换），处理连接和请求；**worker 进程**的个数由配置文件决定，一般与 CPU 核数一致。**worker 进程**之间互相独立且对等，共同竞争来自客户端的请求，且独自处理。\n\n所以要想操作 nginx，只需要与 **master 进程**通信就行了。例如（从容的， 服务不中断）重启 nginx 就是 通过 `kill -HUP pid`  命令向 **master 进程**发送信号，**master 进程**接收到 `HUP` 信号后先重新加载配置文件，然后再启动新的 **worker 进程**，并向所有老 **worker 进程**发送关闭的信号。\n\n> kill -HUP pid 是老版本的重启命令，现在大多都用 ./nginx -s reload。\n\n**master-worker 模式的好处**：\n\n- 每个 **worker 进程**相互独立，不需要枷锁，所以省掉了锁的开销\n- 每个 **worker 进程**相互独立，互相不影响，一个进程退出后，其他进程继续工作，服务不会中断\n\n#### nginx 异步非阻塞实现高并发\n\n在 **master-worker模式**中，每个 worker 里面只有一个主线程，表面看是有多少个 worker 就能处理多少个并发，看起来是不能达到高并发的目的；但是由于 nginx 采用了异步非阻塞模式，类似于 linux 的 epoll 模型，基于事件驱动机制，可以监控多个事件是否准备完毕，如果准备完毕就放入**队列**中，这个过程是**异步**的。**worker 进程**只需要从**队列**中循环处理事件即可。\n\n**worker 进程**在循环处理**队列**中的事件的时候，不需要重新创建线程，每个事件占用的内存很小，没有上下文切换，事件处理是非常轻量级的。\n\n**为什么将 worker 进程个数设置为 cpu 的核数？**\n\n因为更多的 **worker 进程**，只会导致进程之间竞争 cpu 资源，带来不必要的上下文切换。nginx 为了更好的利用多核特性，将某一个进程绑定到某一个核上，就不会因为进程的切换带来 cache 失效等。\n\n### nginx 应用\n\n#### 安装（MAC）\n\n安装 Homebrew：\n\n```bash\n/usr/bin/ruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)\"\n```\n\n安装 nginx：\n\n```bash\nbrew install nginx\n```\n\n查看 nginx 配置：\n\n```bash\n// 配置文件所在目录\ncd /usr/local/etc/nginx\n// 配置文件 nginx.conf\ncat nginx.conf\n// nginx 主页默认页面所在位置\ncd /usr/local/var/www\n// 该目录下存在 50x.html 和 index.html，index.html 就是 nginx.conf 中配置的页面\n```\n\nnginx.conf 的核心，其中配置了端口，root 的默认页面等：\n\n```\n# worker 进程数默认为 1\nworker_processes  1;\n\n# 事件配置\nevents {\n    worker_connections  1024;\n}\n\nhttp {\n\t\t# 超时重启\n\t\tkeepalive_timeout  65;\n\t\t\n    server {\n        listen       8080;\n        server_name  localhost;\n\n        #charset koi8-r;\n\n        #access_log  logs/host.access.log  main;\n\n        location / {\n        root   html;\n        index  index.html index.htm;\n        }\n    }\n}\n```\n\n常用命令：\n\n```bash\n// 运行 nginx\nnginx\n// 重启 nginx\nnginx -s reload\n// 快速关闭 nginx\nnginx -s stop\n// 完整有序的停止 nginx\nnginx -s quit\n```\n\n#### 反向代理\n\n**反向代理**多用于处理跨域问题，其原理就是，通过 nginx 启动一个服务器，配置 CORS，然后接收浏览器的请求，然后将请求转发到目标服务器。\n\n修改 nginx.conf 配置：\n\n```\nlocation / {\n\t\t\tadd_header Access-Control-Allow-Origin *;\n\t\t\tadd_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';\n\t\t\tadd_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';\n\n\t\t\tif ($request_method = 'OPTIONS') {\n\t\t\t\treturn 204;\n\t\t\t}\n\n\t    root   html;\n\t\t\tindex  index.html index.htm;\n}\n\nlocation ^~ /api/ {\n\t\t\tproxy_pass http://localhost:3000;\n}\n```\n\n这里主要是配置了请求头，以使用 CORS 解决跨域，然后将所有匹配到以 /api/ 开头的请求，转发到 `http://localhost:3000`，目标服务器返回结果后，nginx 服务器再将结果转发给请求端。\n\n> 跨域是浏览器的策略，所以在服务端互相请求是没有跨域问题的。\n\n#### 负载均衡\n\n在反向代理的时候，通过 `proxy_pass` 指定服务器的地址，但只能指定一台服务器地址。\n\n但是负载均衡需要指定多台服务器地址，怎么配置呢？\n\n```\nhttp {\n\tserver {\n        listen       8080;\n        server_name  localhost;\n\n        #charset koi8-r;\n\n        #access_log  logs/host.access.log  main;\n\n\t\t\t\tadd_header Access-Control-Allow-Origin *;\n        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';\n        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';\n\n\n\t\t\t\tlocation / {\n\t    \t\troot   html;\n          index  index.html index.htm;\n        }\n\t\t\t\tlocation ^~ /api/ {\n\t    \t\tproxy_pass http://banlance; #负载均衡名\n\t    \t\t# 设置用户真实ip否则获取到的都是nginx服务器的ip\n          proxy_set_header X-real-ip $remote_addr;\n          proxy_set_header Host $http_host;\n\t\t\t\t}\n\t}\n\t\n\tupstream banlance {\n\t\t# weight 表示权重，max_fails 表示最大失败次数，fail_timeout 表示请求失败暂停 x 时间后重新请求\n\t\tserver localhost:3000 weight=1 max_fails=2 fail_timeout=20s;\n\t\tserver localhost:4000 weight=1 max_fails=2 fail_timeout=20s;\n  }\n}\n```\n\n主要是通过 `upstream` 配置实现负载均衡，上面是配置了两个本地的服务，端口分别是 3000 和 4000。前端发送的请求发送到 nginx 服务的 8080 端口后，分发到配置的两个服务上，从而实现了负载均衡。\n\n#### 负载测试\n\n上面配置好了之后，如果需要检验一下，通过一下代码。\n\nHTML：\n\n```html\n\n<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>负载均衡测试</title>\n</head>\n<body>\n<script>\n\t\t// 循环发送请求\n    setInterval(() => {\n        const xhr = new XMLHttpRequest();\n        xhr.open('GET', 'http://localhost:3001/api/get', true);\n        xhr.send({name: 1});\n\n        xhr.onreadystatechange = function () {\n            if (this.readyState === 4 && this.status === 200) {\n                // 返回值\n                const obj = JSON.parse(xhr.responseText);\n\n                if (obj) {\n                    console.log(`获取成功：${obj}`);\n                }\n            }\n        };\n    }, 600);\n</script>\n</body>\n</html>\n```\n\nnodejs，创建两个 nodejs 文件，分别为 balance1.js 和 balance2.js，其内容都为如下，只有console 的内容不一样：\n\n```js\nconst http = require('http');\nconst fs = require('fs');\n\nhttp.createServer((req, res) => {\n    if (req.url === '/api/get') {\n        if (req.method.toLowerCase() === 'get') {\n            res.writeHead(200, {\n                'content-type': 'text/html'\n            });\n\t\t\t\t\t\tconsole.log('balance1 收到请求');\n            // console.log('balance2 收到请求');\n\n            setTimeout(() => {\n                res.end('111');\n            }, 1000);\n        }\n    }\n}).listen(3000);\n```\n\n启动两个 nodejs，运行 HTML 文件后会发现，页面中一直循环发送请求，但是 balance1 和 balance2 会依次接收请求，实现了负载均衡的目的。\n\n#### 缓存\n\nnginx 也可以做缓存，但是我目前还没有尝试过，简单看了一下这篇文章：[使用nginx缓存服务器上的静态文件](https://juejin.im/post/5af38e0c518825670c45ef6e#heading-0)。\n\n以后需要的时候再来尝试，懒了懒了。");

/***/ })

}]);
//# sourceMappingURL=publisher-Nginx-Nginx-md.js.map