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