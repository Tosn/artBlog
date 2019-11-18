## 创建一个服务
```js
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = [
        {
            name: 'Tosn'
        }
    ]
    next()
})

app.use((ctx, next) => {
    if (ctx.url === '/html') {
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = `<b>我的名字是： ${ctx.body[0].name}</b>`
    }
    next()
})

app.listen(3000, () => {
    console.log('server running in 3000 port')
})


```

## 静态服务
```js
app.use(require('koa-static')(__dirname + '/'))
```

## 路由

```js
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

router.get('/string', async (ctx, next) => {
    ctx.body = 'Koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

app.use(router.routes())
app.listen('3000', () => {
    console.log(`server running on 3000 port`)
})

```