## node 内置模块
- os
- fs
- path
- event
- http

## node 运行
```js
运用node 或者 nodemon 
// nodemon 文件修改自动刷新
// npm i nodemon -g
```

## 文件读取 fs

同步读取
```js
const fs = require(fs)
const data = fs.readFileSync('./download.js')
console.log(data)   // => 输入一个二进制的buffer
// 如果要显示成字符串 可以使用toString()方法
console.log(data.toString())
```

异步读取
```js
fs.readFile('./download.js', (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data.toString())
    }
})

```

## Buffer（缓冲区）
[菜鸟教程Buffer连接](https://www.runoob.com/nodejs/nodejs-buffer.html)
::: tip
node.js 目前支持的字符编码包括
- ascii 仅支持7位ASCII数据。如果设置去掉高位的话，这种编码是非常快的。
- utf8 多字节编码 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
- utf16le 2 或 4个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- ucs2 utf16le的别名。
- base64 Base64 编码。
- latin1 一种把Buffer 编码成一字节编码的字符串的方式。
- binary latin1的别名
- hex 将每个字节编码为两个十六进制的字符。
:::

```js
//创建
const buf1 = Buffer.alloc(10)  // => <Buffer 00 00 00 00 00 00 00 00 00 00>

//写入
buf1.write('ab')   // => <Buffer 61 62 00 00 00 00 00 00 00 00>
```
## http（创建web服务器）

```js
const http = require('http')
const server = http.createServer((request, response) => { 

}).listen(3000)
```

### 显示一个页面
```js
const http = require('http')
const fs = require('fs')
const server = http
    .createServer((request, response) => {
        const { url, method } = request
        if (url === '/' && method === 'GET') {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain;charset=utf-8'
                    })
                    response.end('500, 服务器错误')
                    return
                }
                response.statusCode = 200
                response.setHeader('Content-Type', 'text/html')
                response.end(data)
            })
        } else {
            response.statusCode = 404
            response.setHeader('Content-Type', 'text/plain;charset=utf-8')
            response.end('404, ⻚⾯没有找到')
        }
    })
    .listen(3000)
```

### 编写一个接口
```js
else if (url === '/users' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(
        JSON.stringify([
            {
                name: 'Tosn',
                age: 20
            }
        ])
    )
}
```

### http methods
```js
const http = require('http')
console.log(http.METHODS)
/* [ 'ACL',
    'BIND',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LINK',
    'LOCK',
    'M-SEARCH',
    'MERGE',
    'MKACTIVITY',
    'MKCALENDAR',
    'MKCOL',
    'MOVE',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REBIND',
    'REPORT',
    'SEARCH',
    'SOURCE',
    'SUBSCRIBE',
    'TRACE',
    'UNBIND',
    'UNLINK',
    'UNLOCK',
    'UNSUBSCRIBE' 
] */
```

### axios Request methods aliases
```js
axios.get(url[, config])   // GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.
axios.delete(url[, config])  // DELETE方法删除指定的资源。
axios.head(url[, config])  // HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体.
axios.options(url[, config])  // OPTIONS方法用于描述目标资源的通信选项。
axios.post(url[, data[, config]])  // POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用. 
axios.put(url[, data[, config]])  // PUT方法用请求有效载荷替换目标资源的所有当前表示。
axios.patch(url[, data[, config]])  // PATCH方法用于对资源应用部分修改。
```

### easyMock Request methods
```js
get
post
put
delete
patch
```

### HTTP中METHOD涵义和区别
[原文链接](https://www.jianshu.com/p/6c7761e49cb0)
1. **安全方法-Safe Methods**是指用户不管进行多少次操作，资源的状态都不会改变。比如说，GET和HEAD方法仅能获取资源，而不会执行动作（action），这些方法属于“安全”的方法。而POST,PUT,DELETE方法改变了资源的状态，可能会执行不安全的动作，使用者应该意识到这一点。
2. **幂等-Idempotent Methods**是数学的一个用语，对于单个输入或者无输入的运算方法，如果每次都是永阳的结果，则称其是幂等的。方法GET,HEAD,PUT,DELETE都有这种性质。POST方法不是幂等的，比如常见的POST重复加载问题；当我们多次发出同样的POST请求后，其结构是创建出了若干的资源。
3. **Option方法**是指，对一个已有的request/response chain，请求URI指定资源的选项信息。这种方法的响应是不能缓存的。请求URI中是否带"*"（星号）决定了请求应用于服务器的所有资源还是特定资源。
4. **GET方法**意思是获取被请求URI（Request-URI）指定的信息，该信息以实体的型式呈现。如果请求URI指向的是一个数据生成过程，那么这个生成的数据应该作为一个实体在响应中返回。GET请求的响应是可缓存的。
5. **HEAD方法**和GET方法一致，区别在于HEAD方法不需要服务器在响应里返回消息主体。HEAD请求响应里HTTP头域里的元信息应该和GET请求响应里的元信息一致。此方法被用来获取请求实体的元信息，而不需要传输实体主体（entity-body）。此方法经常被用来测试超文本链接的有效性，可访问性，和最近的改变。HEAD请求的响应是可缓存的。
6. **POST方法**给源服务器一个请求，源服务器接受这个请求中的实体，然后可以将其作为资源的一部分。POST方法的实际功能是由服务器决定的，并且经常依赖于请求URI（Request-URI）。POST方法提交的实体是请求URI的从属物，就好像一个文件从属于一个目录，一篇新闻文章从属于一个新闻组，或者一条记录从属于一个数据库
POST方法执行的动作可能不会对请求URI所指的资源起作用。在这种情况下，200（成功）或者204（没有内容）将是适合的响应状态，这取决于响应是否包含一个描述结果的实体。如果资源被源服务器创建，响应应该是201(Created)并且包含一个实体，此实体描述了请求的状态并且此实体引用了一个新资源和一个Location头域。
POST方法的响应是可缓存的。除非响应里有Cache-Control或者Expires头域指示其响应不可缓存。而303响应能指导用户获得可缓存的响应。
7. **PUT方法**请求服务器把请求里包含的实体存储在请求URI（Request-URI）标识下。如果请求URI（Request-URI）指定的的资源已经在源服务器上存在，那么此请求里的实体应该被当作是源服务器在此URI所指定资源实体的修改版本。如果请求URI（Request-URI）指定的资源不存在，并且此URI被用户代理定义为一个新资源，那么源服务器就应该根据请求里的实体创建一个此URI所标识下的资源。如果一个新的资源被创建了，源服务器必须能向用户代理发送201（已创建）响应。如果已存在的资源被改变了，那么源服务器应该发送200（Ok）或者204（无内容）响应。如果资源不能根据请求URI创建或者改变，应该给出一个合适的错误响应来反应问题的性质。实体的接收者不能忽略任何它不理解的Content-*（如：Content-Range）头域，并且必须返回501（没有被实现）响应。PUT方法的响应不应该被缓存。
8. POST方法和PUT方法最根本的区别在于，请求URI（Request-URI）的含义不同。POST请求里的URI指示的是一个能处理请求实体的资源（可能是一段程序，如jsp里的servlet）。而PUT方法请求里有一个实体，而且用户代理知道URI意指什么，并且服务器不能把此请求应用于其他URI指定的资源。如果服务器期望请求被应用于一个不同的URI，那么它必须发送301（永久移动了）响应；用户代理可以自己决定是否重定向请求。
9. DELETE方法请求源服务器删除请求URI指定的资源。客户端不能保证此操作能被执行，即使源服务器返回成功状态码。服务器打算删除资源或把此资源移到一个不可访问的位置时返回成功。如果响应里包含描述成功的实体，响应应该是200（Ok）；如果DELETE动作没有通过，应该以202（已接受）响应；如果DELETE方法请求已经通过了，但响应不包含实体，那么应该以204（无内容）响应。DELETE方法的响应是不能被缓存的。
10. TRACE方法被用于激发一个远程的应用层的请求消息回路。最后的接收者或者是接收请求里Max-Forwards头域值为0源服务器或者是代理服务器或者是网关。TRACE请求不能包含一个实体。TRACE方法允许客户端知道请求链的另一端接收什么，并且利用那些数据去测试或诊断。Via头域值有特殊的用途，因为它可以作为请求链的跟踪信息。利用Max-Forwards头域允许客户端限制请求链的长度去测试一串代理服务器是否在无限回路里转发消息。如果请求是有效的，响应应该在响应实体主体里包含整个请求消息，并且响应应该包含一个Content-Type头域值为”message/http”的头域。TRACE方法的响应不能不缓存。
