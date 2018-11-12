# OwnGhy.github.io
My git pages by hexo!

博客系统基于[Hexo](http://hexo.io/)搭建，使用主题[next.mist](https://github.com/iissnan/hexo-theme-next)。

## 环境搭建
* 基本环境
    * [git](https://github.com/)
    * [Node&npm](https://nodejs.org/en/)
    * [Hexo](http://hexo.io/)

	```
	npm install -g hexo-cli
	```

* 写博客

	```
	hexo s [-p 5000] // 启动博客本地环境，默认4000端口，供预览使用
	```
	博文路径
	```
	/source/_posts/{title}.md
	```
	直接复制已有文章md文件，修改头部信息即可。

	或者使用命令行创建新博客
	```
	hexo new [layout] <title>
	```

* 生存静态文件
```
hexo generate
// 简写
hexo g
```
| 选项          | 描述          |
| ------------- |:-------------:|
| `-d`,`--deploy`| 文件生成后立即部署网站 |
| `-w`,`--watch`      | 监视文件变动      |

* 发布草稿
```
hexo publish [layout] <filename>
```
* 部署
```
hexo deploy
// 简写
hexo d
```

## 博客规范
头部“---”行以前的部分为博文信息定义部分

```
title: 博客说明书                             // 博文名称
date: 2015-09-24 00:00:00                   // 博文创建时间
updated: 2015-09-25 00:00:00                // 博文修改时间【可选】
categories:                                 // 博文分类，可多级，有层级之分
- felix                                     // 一级分类为{namespace}即它所在文件夹的名称
- blog                                      // 二级分类个人管理，供归纳自己文章用【可选】
tags:                                       // 标签，可多个，无层级之分
- blog
- hexo
- node
---
```
