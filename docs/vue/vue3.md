## vite创建项目
```bash
npm init vite-app <project-name>
```

## 项目配置
1、根目录新建vite.config.js（类似于vue.config.js）


## 踩坑记录
:::danger 注意事项：
1、vue文件引用组件，使用动态按需引入会无效
```js
// wrong
components: {
  HelloWorld: () => import('@/components/HelloWorld')
}
// right
import HelloWorld from '@/components/HelloWorld'
components: {
  HelloWorld
}
```
2、使用sass需要安装在开发插件上 
```js
// wrong
npm install sass -S
// right
npm install sass -D
```
:::

## vue3知识点
### 全局配置
```js
// before
Vue.prototype.$http = 'xxxx'
// after
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
const app = createApp(App)
app.config.globalProperties = {
  userName: 'Tosn'
}
app.mount('#app')

// 如果全局设置参数较多，可以单独拉出一个appConfig.js文件
// appConfig.js
export const function (app) {
  app.config.globalProperties = {...}
}
// main.js
import appConfig from './appConfig'
...
appConfig(appp)
```