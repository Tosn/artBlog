### 货币格式化
[原文链接](https://www.haorooms.com/post/js_qian_huobi_gs)
1. 利用toLocaleString
```js
    (1234567890).toLocaleString('en-US') // => 1,234,567,890
```
2. 利用Intl
```js
new Intl.NumberFormat().format(1234567890)  // => 1,234,567,890
```

### 防抖和节流
::: tip 防抖
在一定时间内，如果重复执行一个方法，超过等待时间，才会执行该方法
:::

```js
function debounce (fn, wait) {
    let timeout = null
    return () => {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}

function handle () {
    console.log(Math.random())
}

window.addEventListener('scroll', debounce(handle, 1000))
// 页面一直滑动，并不会一直执行handle,只有等待超过wait 1000时间才会执行
```

::: tip 节流
一定时间重复执行方法，只会在达到指定时间的时候才会执行
:::

```js
function throttle (func, delay) {
    let prev = Date.now()
    return function () {
        let context = this
        let args = arguments
        let now = Date.now()
        if (now >= prev + delay) {
            func.apply(context, args)
            prev = Date.now()
        }
    }
}

function handle () {
    console.log(Math.random())
}

window.addEventListener('scroll', throttle(handle, 1000))
// 页面一直滑动 每1秒执行一次handle
```