
## FileSaver 原理（javascript生成文件保存文件）

```js
let blob = new Blob(['hello world'])

function downLoadFile(blobData) {
    let url = window.URL.createObjectURL(blobData)
    var a = document.createElement('a')
    a.href = url
    a.download = '文字.doc'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}

```


[参考链接](https://www.jianshu.com/p/fba791ce8c4c)<br>
[官方链接](https://www.npmjs.com/package/file-saver)