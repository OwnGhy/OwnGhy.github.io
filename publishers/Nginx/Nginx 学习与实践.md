<!--title: Nginx 学习与实践-->
<!--date: 2019.10.29-->
<!--cate: 1-->
nginx 平时经常听到，但是目前还没有使用过，也没理解过其中的含义。

### 概念

首先，nginx 是一款轻量级的 web 服务器、反向代理服务器，由于它内存占用少，启动快且高并发能力强，经常在互联网项目中广泛应用。

关键词：反向代理？什么是反向代理？

<!--more-->

#### 正向代理

一般情况下，我们是不能直接访问到 google 的，通常是通过 VPN 来访问。而 VPN 就是一个**正向代理**的例子。

**正向代理**大致过程：**客户端**不能访问某网站（例如：google），但是**客户端**能访问**代理服务器**；**代理服务器**可以访问 google；这时候**客户端**先连接上**代理服务器**，告诉它需要访问 google 的内容，**代理服务器**就会去取，返回给**客户端**。

正向代理“代理”的是**客户端**，**客户端**是知道目标的，但目标不知道**客户端**是通过 VPN 访问的。

**客户端**必须设置**正向代理服务器**，当然前提是要知道**正向代理服务器**的IP地址，还有代理程序的端口。

用途：

- 访问无法访问的资源
- 可以做缓存，加速访问资源
- 对**客户端**访问授权，上网进行认证
- 记录用户访问记录（上网行为管理），对外隐藏用户信息

#### 反向代理

**反向代理**对外是透明的，访问者并不知道自己访问的是一个代理，**客户端**是无法感知代理的存在的，因为**客户端**不需要任何配置就可以访问。

**反向代理**实际的运行方式是以代理服务器来接收 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将服务器上得到的结果返回给 internet 上请求连接的**客户端**，此时代理服务器对**客户端**就表现为一个服务器。

用途：

- 保证内网的安全，使用**反向代理**的 WAF（防火墙） 功能，阻止 web 攻击
- 负载均衡，通过**反向代理服务器**来优化网站的负载

#### 区别

正向代理：client 与 proxy 属于一个 LAN（局域网），对 server 透明

反向代理：server 与 proxy 属于一个 LAN（局域网），对 client 透明

### nginx

#### nginx 的 master-worker 模式

启动 nginx 后，在 80 端口启动了 Socket 服务进行监听，这个监听过程中主要使用到了 **master 进程** 和 **worker 进程**。

- **master 进程**：读取并验证配置文件 nginx.conf；管理 **worker 进程**，接收来自外界的信号，向各 **worker 进程**发送信号，监控 **worker 进程**的运行状态，当 **worker 进程**退出后(异常情况下)，会自动重新启动新的 **worker 进程**。

- **worker 进程**：每个 **worker 进程**都维护一个线程（避免线程切换），处理连接和请求；**worker 进程**的个数由配置文件决定，一般与 CPU 核数一致。**worker 进程**之间互相独立且对等，共同竞争来自客户端的请求，且独自处理。

所以要想操作 nginx，只需要与 **master 进程**通信就行了。例如（从容的， 服务不中断）重启 nginx 就是 通过 `kill -HUP pid`  命令向 **master 进程**发送信号，**master 进程**接收到 `HUP` 信号后先重新加载配置文件，然后再启动新的 **worker 进程**，并向所有老 **worker 进程**发送关闭的信号。

> kill -HUP pid 是老版本的重启命令，现在大多都用 ./nginx -s reload。

**master-worker 模式的好处**：

- 每个 **worker 进程**相互独立，不需要枷锁，所以省掉了锁的开销
- 每个 **worker 进程**相互独立，互相不影响，一个进程退出后，其他进程继续工作，服务不会中断

#### nginx 异步非阻塞实现高并发

在 **master-worker模式**中，每个 worker 里面只有一个主线程，表面看是有多少个 worker 就能处理多少个并发，看起来是不能达到高并发的目的；但是由于 nginx 采用了异步非阻塞模式，类似于 linux 的 epoll 模型，基于事件驱动机制，可以监控多个事件是否准备完毕，如果准备完毕就放入**队列**中，这个过程是**异步**的。**worker 进程**只需要从**队列**中循环处理事件即可。

**worker 进程**在循环处理**队列**中的事件的时候，不需要重新创建线程，每个事件占用的内存很小，没有上下文切换，事件处理是非常轻量级的。

**为什么将 worker 进程个数设置为 cpu 的核数？**

因为更多的 **worker 进程**，只会导致进程之间竞争 cpu 资源，带来不必要的上下文切换。nginx 为了更好的利用多核特性，将某一个进程绑定到某一个核上，就不会因为进程的切换带来 cache 失效等。

### nginx 应用

#### 安装（MAC）

安装 Homebrew：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装 nginx：

```bash
brew install nginx
```

查看 nginx 配置：

```bash
// 配置文件所在目录
cd /usr/local/etc/nginx
// 配置文件 nginx.conf
cat nginx.conf
// nginx 主页默认页面所在位置
cd /usr/local/var/www
// 该目录下存在 50x.html 和 index.html，index.html 就是 nginx.conf 中配置的页面
```

nginx.conf 的核心，其中配置了端口，root 的默认页面等：

```
# worker 进程数默认为 1
worker_processes  1;

# 事件配置
events {
    worker_connections  1024;
}

http {
		# 超时重启
		keepalive_timeout  65;
		
    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
        root   html;
        index  index.html index.htm;
        }
    }
}
```

常用命令：

```bash
// 运行 nginx
nginx
// 重启 nginx
nginx -s reload
// 快速关闭 nginx
nginx -s stop
// 完整有序的停止 nginx
nginx -s quit
```

#### 反向代理

**反向代理**多用于处理跨域问题，其原理就是，通过 nginx 启动一个服务器，配置 CORS，然后接收浏览器的请求，然后将请求转发到目标服务器。

修改 nginx.conf 配置：

```
location / {
			add_header Access-Control-Allow-Origin *;
			add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
			add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

			if ($request_method = 'OPTIONS') {
				return 204;
			}

	    root   html;
			index  index.html index.htm;
}

location ^~ /api/ {
			proxy_pass http://localhost:3000;
}
```

这里主要是配置了请求头，以使用 CORS 解决跨域，然后将所有匹配到以 /api/ 开头的请求，转发到 `http://localhost:3000`，目标服务器返回结果后，nginx 服务器再将结果转发给请求端。

> 跨域是浏览器的策略，所以在服务端互相请求是没有跨域问题的。

#### 负载均衡

在反向代理的时候，通过 `proxy_pass` 指定服务器的地址，但只能指定一台服务器地址。

但是负载均衡需要指定多台服务器地址，怎么配置呢？

```
http {
	server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

				add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';


				location / {
	    		root   html;
          index  index.html index.htm;
        }
				location ^~ /api/ {
	    		proxy_pass http://banlance; #负载均衡名
	    		# 设置用户真实ip否则获取到的都是nginx服务器的ip
          proxy_set_header X-real-ip $remote_addr;
          proxy_set_header Host $http_host;
				}
	}
	
	upstream banlance {
		# weight 表示权重，max_fails 表示最大失败次数，fail_timeout 表示请求失败暂停 x 时间后重新请求
		server localhost:3000 weight=1 max_fails=2 fail_timeout=20s;
		server localhost:4000 weight=1 max_fails=2 fail_timeout=20s;
  }
}
```

主要是通过 `upstream` 配置实现负载均衡，上面是配置了两个本地的服务，端口分别是 3000 和 4000。前端发送的请求发送到 nginx 服务的 8080 端口后，分发到配置的两个服务上，从而实现了负载均衡。

#### 负载测试

上面配置好了之后，如果需要检验一下，通过一下代码。

HTML：

```html

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>负载均衡测试</title>
</head>
<body>
<script>
		// 循环发送请求
    setInterval(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3001/api/get', true);
        xhr.send({name: 1});

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // 返回值
                const obj = JSON.parse(xhr.responseText);

                if (obj) {
                    console.log(`获取成功：${obj}`);
                }
            }
        };
    }, 600);
</script>
</body>
</html>
```

nodejs，创建两个 nodejs 文件，分别为 balance1.js 和 balance2.js，其内容都为如下，只有console 的内容不一样：

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/api/get') {
        if (req.method.toLowerCase() === 'get') {
            res.writeHead(200, {
                'content-type': 'text/html'
            });
						console.log('balance1 收到请求');
            // console.log('balance2 收到请求');

            setTimeout(() => {
                res.end('111');
            }, 1000);
        }
    }
}).listen(3000);
```

启动两个 nodejs，运行 HTML 文件后会发现，页面中一直循环发送请求，但是 balance1 和 balance2 会依次接收请求，实现了负载均衡的目的。

#### 缓存

nginx 也可以做缓存，但是我目前还没有尝试过，简单看了一下这篇文章：[使用nginx缓存服务器上的静态文件](https://juejin.im/post/5af38e0c518825670c45ef6e#heading-0)。

以后需要的时候再来尝试，懒了懒了。