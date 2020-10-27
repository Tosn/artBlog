## qiankun 微前端实践
乾坤文档：[乾坤](https://qiankun.umijs.org/zh/guide)
### 目录结构
目录生成插件：[tree-cli](https://www.npmjs.com/package/tree-cli) windows下命令为 treee
```bash
# 整个微前端项目
├── lib  # 公用资源
|  ├── components
|  └── images
├── main-app # 主应用
|  ├── babel.config.js
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── README.md
|  ├── src
|  └── vue.config.js
├── package.json # 用于安装依赖、启动服务、打包等
├── vue-app1 # 子应用1
|  ├── babel.config.js
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── README.md
|  ├── src
|  └── vue.config.js
├── vue-app2 # 子应用2
|  ├── babel.config.js
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── README.md
|  ├── src
|  └── vue.config.js
└── vue-app3 # 子应用3
   ├── babel.config.js
   ├── package-lock.json
   ├── package.json
   ├── public
   ├── README.md
   ├── src
   └── vue.config.js
```
最外层package.json 主要用于统一管理，如安装依赖、启动服务、打包等
插件：[npm-run-all](https://www.npmjs.com/package/npm-run-all)
```json
// 示例
{
  "name": "mirco",
  "version": "1.0.0",
  "description": "test",
  "main": "index.js",
  "scripts": {
    "all:install": "npm-run-all --serial build install:*",
    "all:start": "npm-run-all --parallel start:*",
    "install:main": "cd main-app && cnpm i",
    "start:main": "cd main-app && npm run serve",
    "install:app1": "cd vue-app1 && cnpm i",
    "start:app1": "cd vue-app1 && npm run serve",
    "install:app2": "cd vue-app2 && cnpm i",
    "start:app2": "cd vue-app2 && npm run serve",
    "install:app3": "cd vue-app3 @@ cnpm i",
    "start:app3": "cd vue-app3 && npm run serve"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}

```

### 主应用注册

1.安装qiankun
```sh
npm i qiankun -S
```

2.注册子应用
新建src/micro.js文件
```js
import { registerMicroApps, start, initGlobalState } from 'qiankun'
import store from '@/store'

registerMicroApps([
  {
    name: 'vue app1',
    entry: '//localhost:8000',
    container: '#subapp-container', // 子应用挂载的容器
    activeRule: '/app1',
    props: {  // props在调用改应用会作为参数传入 mount的时候
      name: 'app1',
      message: 'This is vue app1'
    }
  },
  {
    name: 'vue app2',
    entry: '//localhost:9000',
    container: '#subapp-container',
    activeRule: '/app2',
    props: {
      name: 'app2',
      message: 'This is vue app2'
    }
  },
  {
    name: 'vue app3',
    entry: '//localhost:10000',
    container: '#subapp-container',
    activeRule: '/app3',
    props: {
      name: 'app3',
      message: 'This is vue app3'
    }
  }
])
// 全局定义 onGlobalStateChange 监听globalState修改  setGlobalState塞值（微应用只能修改已存在的一级属性）
// https://qiankun.umijs.org/zh/api#initglobalstatestate
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});
// value 当前 prev 之前的值
onGlobalStateChange((value, prev) => {
  store.commit('SET_STATE', {
    key: 'app',
    value
  })
  console.log('[onGlobalStateChange - master]:', value, prev)
})

setGlobalState({
  token: ''
})

start()

```
3.在主应用入口引用micro.js文件
```js
import './micro'
```

### 子应用注册
1.创建项目（vue create xxx）
2.新建src/public-path.js（修改publicPath）
```js
/* eslint-disable */
// https://qiankun.umijs.org/zh/faq#vue-router-%E6%8A%A5%E9%94%99-uncaught-typeerror-cannot-redefine-property-router
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

```


3.修改入口文件main.js

vue3
```js
import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

let router = null
let instance = null

function render (props = {}) {
  const { container } = props
  router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app1' : '/'),
    routes
  })
  instance = createApp(App)
  instance.use(router)
  instance.use(store)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped')
}

// setGlobalState 按一级属性设置全局状态，微应用中只能修改已存在的一级属性

function storeTest (props) {
  // 全局监听修改
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => {
        // 可以执行任何你想要的操作
        store.commit('SET_STATE', {
          key: 'app',
          value
        })
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
      },
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      user: {
        name: props.name
      }
    })
}

export async function mount (props) {
  storeTest(props) // 获取全局参数
  render() // 渲染挂载
  // 全局挂载监听和塞值
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

// 销毁
export async function unmount () {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  router = null
}

```

vue2
```js
import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router';

Vue.config.productionTip = false


let router = null
let instance = null

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app3' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}


if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => {
        store.commit('SET_STATE', {
          key: 'app',
          value
        })
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
      },
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      user: {
        name: props.name
      }
    })
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}

```

4.修改router/index.js

vue3

```js
const routes = [
  { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '@/views/Home') },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/About') }
]

export default routes
```
:::warning 注意事项
'@'在vue3中并未全局定义，如果要使用需要自己定义
:::
```js
// vue.config.js
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
 ...
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    ...
  }
}

```

vue2
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export default routes;

```

### 应用之间通信
:::tip
应用之间通信主要借助了qiankun的 <code>GlobalState</code> 和 <code>mount</code> 生命周期
[官方API](https://qiankun.umijs.org/zh/api#initglobalstatestate)
<code>initGlobalState</code> 注册全局state <code>onGlobalStateChange</code> 监听全局state变化 <code>offGlobalStateChange</code> 移除当前应用的状态监听，微应用 umount 时会默认调用
:::

### 应用之间的资源共用
1、共用资源放cdn，项目中引用cdn，webpack配置排除相关插件库
2、使用git依赖

* 新建一个共用资源仓库，如lib, 推送到git上（git地址：http://gitlab.xwsoftlan.com/webproject-go/micro-lib.git）
* 在当前需要引用共用资源的子应用上（git 地址：http://gitlab.xwsoftlan.com/webproject-go/micro-app1），pull 共用资源仓库
  
  这里涉及到git的subtree [说明文档](https://segmentfault.com/a/1190000012002151)
  git subtree 主要命令：
  ```sh
  git subtree add   --prefix=<prefix> <commit>
  git subtree add   --prefix=<prefix> <repository> <ref>
  git subtree pull  --prefix=<prefix> <repository> <ref>
  git subtree push  --prefix=<prefix> <repository> <ref>
  git subtree merge --prefix=<prefix> <commit>
  git subtree split --prefix=<prefix> [OPTIONS] [<commit>]
  ```

  例：在应用根目录操作

  git subtree add --prefix=src/lib http://gitlab.xwsoftlan.com/webproject-go/micro-lib.git master --squash

  这样在根目录的src下多了一个lib目录，里面即为远程仓库的公用资源

  更新：

  git subtree pull --prefix=src/lib http://gitlab.xwsoftlan.com/webproject-go/micro-lib.git master --squash

  推送：

  git subtree push --prefix=src/lib http://gitlab.xwsoftlan.com/webproject-go/micro-lib.git master --squash

  简化：
  ```sh
  git remote add -f lib http://gitlab.xwsoftlan.com/webproject-go/micro-lib.git

  # 接下来就可以这么使用 
  git subtree add --prefix=src/lib lib master --squash
  git subtree pull --prefix=src/lib lib master --squash
  git subtree push --prefix=src/lib lib master
  ```
  :::danger 注意
  1、公用组件写法一定要向下兼容

  2、如果仅仅是当前项目使用，是完全独立的，提交并不会更新原仓库，如果需要更新原仓库，一定要通知其他成员，不要做破坏性修改，导致其他项目引用报错
  :::