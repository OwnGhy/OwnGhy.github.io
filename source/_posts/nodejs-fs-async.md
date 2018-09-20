---
title: 对fs异步读取文件的理解
date: 2018-09-19 16:38:07
categories:
- Nodejs
tags:
- Nodejs
- async/await
---
在nodejs的API文档中可以看到大部分的文件或者文件夹的读取操作都有异步和同步两种操作。

有这样一个需求，读取某个文件夹下面的所有文件，因为有文件夹的嵌套，所以需要使用递归来实现这一功能。
<!-- more -->
## 同步读取
首先使用同步的方法，很简单的可以实现：
```
const getFileOfDirSync = (dir) => {
    let files = fs.readdirSync(dir);
    let result;

    if (files) {
        result = files.map((file) => {
            let filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                return getFileOfDirSync(filePath);
            } else {
                return filePath;
            }
        });
    }

    // deepFlatten()是平铺数组的方法
    return deepFlatten(result);
}
```
同步的逻辑很简单，每一个步骤都等上一步执行完再执行，没多大问题。

那么使用异步如何实现呢？

## 异步读取错误示范
首先我想到的是，使用async/await去控制异步读取fs.readdir()的执行。
```
const getFileOfDirAsync = async (dir) => {
    let files = await fs.readdir(dir);
    let result;

    if (files) {
        result = files.map(file => {
            let filePath = path.join(dir, file);
            // 为了集中处理读取dir，这里使用同步的fs.statSync()
            if (fs.statSync(filePath).isDirectory()) {
                return getFileOfDirAsync(filePath);
            } else {
                return filePath;
            }
        });
    }

    return deepFlatten(result);
}
```

duang～报错～
```
DeprecationWarning: Calling an asynchronous function without callback is deprecated.
```

这里报错的原因是：nodejs的fs模块的方法都没有返回promise。当然不能使用async/await进行处理。

在nodejs的fs模块的源码中，如下：
```
function readdir(path, options, callback) {
  callback = makeCallback(typeof options === 'function' ? options : callback);
  options = getOptions(options, {});
  path = toPathIfFileURL(path);
  validatePath(path);

  const req = new FSReqCallback();
  if (!options.withFileTypes) {
    req.oncomplete = callback;
  } else {
    req.oncomplete = (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      getDirents(path, result, callback);
    };
  }
  binding.readdir(pathModule.toNamespacedPath(path), options.encoding,
                  !!options.withFileTypes, req);
}

function readdirSync(path, options) {
  options = getOptions(options, {});
  path = toPathIfFileURL(path);
  validatePath(path);
  const ctx = { path };
  const result = binding.readdir(pathModule.toNamespacedPath(path),
                                 options.encoding, !!options.withFileTypes,
                                 undefined, ctx);
  handleErrorFromBinding(ctx);
  return options.withFileTypes ? getDirents(path, result) : result;
}
```
fs模块的readdir()和readdirSync()方法的核心区别是：readdirSync()方法直接返回的是通过binding.readdir()方法读取的结果。而readdir()方法则未返回任何值，只是将callback作为FSReqCallback对象onComplete方法，表示再读取成功之后再执行callback方法，从何获取到返回的读取内容。

可以看到fs.readdir()方法并没有返回promise，直接用await去修饰fs.readdir()方法，并不会同步化该方法中通过I/O去异步读取文件信息的操作，这样的做法毫无意义。

所以，如何正确的使用异步读取的方法？

## 将fs.readdir()方法promise化
```
const promisify = function (nodeFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            nodeFunction.call(this, ...args, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };
};

// promise化异步读取方法
const readDir = promisify(fs.readdir);
const fileStat = promisify(fs.stat);

const getFilesPath = async (dir) => {
    let files = await readDir(dir);

    let result = files.map(file => {
        let filePath = path.join(dir, file);
        return fileStat(filePath).then(stat => {
            if (stat.isDirectory()) {
                return getFilesPath(filePath);
            } else {
                return filePath;
            }
        });
    });

    return deepFlatten(await Promise.all(result));
};
```

通过将fs.readdir()方法的返回promise化，这样就可以使用async/await了。

## 关于使用async/await意义的思考
使用async/await事实上将后续的操作阻塞了，需要等到readDir执行完之后再进行其他操作，那么这里的和同步没有实质上的区别，反而还多了很多操作，所以单单就readDir这里来说，将其promise化再使用async/await是无意义的。

但是这里在读取到files进行map的时候，里面的fs.stat()异步化，使用async/await是有意义的。这样可以不必等到操作完了在进入下一次遍历，有利于提升效率。

另外：推荐一篇讲异步递归的文章[【译】异步递归：回调、Promise、Async](https://zhuanlan.zhihu.com/p/29534555)