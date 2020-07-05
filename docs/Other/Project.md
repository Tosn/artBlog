# 项目实战总结

### 上传进度

Axios onUploadProgress

```js
this.$http.post('/uploadfile', form, {
  onUploadProgress: progress => {
    this.uploadProgress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
  }
})
```

### 下载进度

Axios onDownloadProgress 用法如上

### 图片上传格式判断

简单方式可以根据文件名称后缀来判断，但是如果用户自己把其他文件的后缀名修改，那么也可以通过，这个时候如果要判断图片是否是真的图片 就需要用到图片的文件流来判断

[根据文件识别头信息获取图片文件的类型](https://www.jianshu.com/p/45c0f85c47ed)

```js
handleFileChange (e) {
  const [ file ] = e.target.files
  if (!file) {
    return
  }
  this.file = file
},
  async blobToString (blob) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = function () {
        const ret = reader.result.split('')
        .map(v => v.charCodeAt())
        .map(v => v.toString(16).toUpperCase())
        .map(v => v.padStart(2, '0'))
        .join(' ')
        resolve(ret)
      }
      reader.readAsBinaryString(blob)
    })
  },
  async isGif (file) {
    // GIF89a 和 GIF87a
    // 前面6个16进制 ‘47 49 46 38 39 61’ 或 ‘47 49 46 38 37 61’
    // 16进制的转换
    const ret = await this.blobToString(file.slice(0, 6))
    const isGif = (ret == '47 49 46 38 39 61') || (ret == '47 49 46 38 37 61')
    return isGif
  },
  async isPng (file) {
    const ret = await this.blobToString(file.slice(0, 8))
    const isPng = (ret == '89 50 4E 47 0D 0A 1A 0A')
    return isPng
  },
  async isJpg (file) {
    const len = file.size
    const start = await this.blobToString(file.slice(0, 2))
    const tail = await this.blobToString(file.slice(-2, len))
    const isJpg = (start === 'FF D8' && tail == 'FF D9')
    // console.log('isJpg', isJpg)
    return isJpg
  },
  async isImage (file) {
    // 通过文件流来判定
    // 先判断是不是gif
    return await this.isGif(file) || await this.isPng(file) || await this.isJpg(file)

  },
  async uploadFile () {
    if (!await this.isImage(this.file)) {
      console.log('文件格式不正确')
    }
    else {
      console.log('文件格式正确')
    }
    const form = new FormData()
    form.append('name', 'file')
    form.append('file', this.file)
    const ret = this.$http.post('/uploadfile', form, {
      onUploadProgress: progress => {
        this.uploadProgress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
      }
    })
  }
```



### vue mixins

[vue mixins 官方](https://cn.vuejs.org/v2/guide/mixins.html)

非常适合全局的方法调用，统一混入，例如 对Messagebox进行一个二次封装

```js
// src/mixins/MessageBox.js
import { MessageBox } from 'element-ui'
export const _MessageBox = {
  methods: {
    error (msg) {
      return new Promise(resolve => {
        MessageBox({
          title: '错误',
          type: 'error',
          message: msg,
          showCancelButton: false,
          callback: () => {
            resolve()
          }
        })
      })
    },
    confirm (msg) {
      return new Promise((resolve, reject) => {
        MessageBox({
          title: '提示',
          type: 'info',
          message: msg,
          showCancelButton: true,
          callback: (action) => {
            if (action === 'confirm') {
              resolve()
            }
            else {
              reject()
            }
          },
        })
      })
    }
  }
}


// xxx.vue
import { _MessageBox } from '@/mixins/MessageBox'
export default {
  mixins: [_MessageBox],
  mounted () {
    this.error('页面报错了')
    //
    this.confirm(this.message)
      .then(() => {
        alert('你点击了确定')
      })
      .catch(err => {
        alert('你点击了取消')
      })
  }
}
```

