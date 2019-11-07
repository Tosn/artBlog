## 快速原型开发

[官方文档](https://cli.vuejs.org/zh/guide/prototyping.html)

可以使用 vue serve 和 vue build 对单个 .vue文件进行快速原型开发，需要先安装一个全局的扩展


``` bash
npm install -g @vue/cli-service-global
```
``` bash
如果单页面需要使用sass 需要安装sass-loader node-sass
```

## 创建项目
[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2)

安装
``` bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

创建项目
``` bash
vue create hello-word # 命令行创建
# OR
vue ui  # 图形化界面创建项目
```

![vue-cli](https://cli.vuejs.org/cli-new-project.png 'vue-cli')
::: tip 提示
default:包含babel、eslint的preset

Manually select features: 手动选择
`space` 空格键选择
`a` 键选择全部
`i` 键取消全部
如果选择了css `pre-processor` 使用sass 尽量使用Sass/SCSS(with dart-sass)  `dart-cass` 运行速度比 `node-sass` 更快
:::
![vue-cli Manually](https://cli.vuejs.org/cli-select-features.png 'vue-cli Manually')

[拓展阅读：CSS预处理器SASS的默认实现将迁移到Dart Sass](https://www.dart-china.org/t/topic/146)

拉取2.x模板
``` bash
npm install -g @vue/cli-init
# 'vue init' 的运行效果将会跟 'vue-cli@2.x' 相同
vue init webpack my-project
```

## 插件安装
``` bash
vue add plug-name
```
::: tip 
我们推荐在运行 vue add 之前将项目的最新状态提交，因为该命令将会调用插件的文件生成器并很有可能更改你现有的文件
:::


## Axios跨域配置

``` js
新建配置文件 vue.config.js  
//目录和package.json同级
// 会被 @vue/cli-service 自动加载  官方文档：https://cli.vuejs.org/zh/config/#vue-config-js

// router.js history模式 路径配置
// publicPath: pathName
/*
如果想开发服务器设置在根路径，可以加一个条件式的值
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'activity' : '/'
}

development 模式用于 vue-cli-service serve
production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
test 模式用于 vue-cli-service test:unit

如果要自己配置 NODE_ENV 可以建立对应的 .env文件 如修改 development下的 NODE_ENV的值
在根目录新建 .env.development文件 
内容： NODE_ENV = "node_dev"  此时全局的 process.env.NODE_ENV 值就变成了 "node_dev"
官方文档：https://cli.vuejs.org/zh/config/?#publicpath
*/

module.exports = {
    publicPath: '/activity',  //映射process.env.BASE_URL的值
    devServer: {  //服务器配置
        proxy: {   //代理
            '/ctaWebApi': {
                target: 'http://52.40.0.216:18088/ctaWebApi/',
                changeOrigin: true,   //是否可以跨域
                pathRewrite: {   //重写请求路径
                    '^/ctaWebApi': ''
                }
            }
        }
    }
}

// /plugins/axios.js
config.baseURL = '/ctaWebApi'

```

## Vue项目使用svg-icon

安装依赖 svg-sprite-loader
``` js
npm i svg-sprite-loader -D
```

新建存放icons文件夹
在src下面新建 icons文件夹 /src/icons，
icons里面新建svg文件夹用于存放svg文件，
icons里面新建index.js 用于处理svg文件

``` js
//  /src/icons/index.js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'  //svg组件

Vue.component(SvgIcon.name, SvgIcon)  //注册组件

const req = require.context('./svg', false, /\.svg$/)  //遍历svg下面所有的文件
req.keys().map(req)
```

新建SvgIcon组件 
``` html
<!-- /src/components/SvgIcon.vue -->

<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script>
    export default {
        name: 'svg-icon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            iconName () {
                return `#icon-${this.iconClass}`
            },
            svgClass () {
                return this.className ? `svg-icon ${this.className}` : `svg-icon`
            }
        }

    }
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
```

修改配置文件vue.config.js

``` js
// resolve定义一个绝对路径获取函数
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
} 
//...
chainWebpack (config) {
    // 配置svg规则排除icons目录中svg文件处理
    config.module
        .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    config.module
        .rule("icons")
            .test(/\.svg$/)
                .include.add(resolve("src/icons"))
                .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
                .options({
                    symbolId: "icon-[name]"
                })
                .end();
}
```
## Css相关

### 全局配置scss 

``` js
// vue.config.js

module.exports = {
    css: {
        loaderOptions: {
            // sass: {
            //     prependData: `@import "@/assets/scss/variable.sass"`
            // },
            scss: {
                prependData: `@import "@/assets/scss/variable.scss";`
            }
        },
    },
}
```
::: warning 注意
在 sass-loader v7 中，prependData这个选项名是 "data"
[官方文档](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9)
:::

### 全局设置px转换vw（手机端、pad端）

安装 `postcss-px-to-viewport`
``` js
npm i postcss-px-to-viewport -D
```

配置 `postcss`
找到 postcss.config.js (如果没有单独文件、则在vue.config.js里面添加postcss配置)<br>
[postcss官方文档](https://cli.vuejs.org/zh/guide/css.html#postcss)
[postcss-px-to-viewport官方文档](https://www.npmjs.com/package/postcss-px-to-viewport)

``` js
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 1920, // (Number) The width of the viewport. 
      viewportHeight: 1080, // (Number) The height of the viewport. 
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
      viewportUnit: 'vw', // (String) Expected units. 
      selectorBlackList: ['.ignore', '.hairlines',/^.el-/], // (Array) The selectors to ignore and leave as px. 
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
      mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
    },
  }
}
```

::: danger 警告
经测试，exclude配置暂时没有作用
:::

## 打包优化相关

### 使用CDN

配置 `vue.config.js` 

``` js
module.exports = {
    //其他配置
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'vue-scrollTo': 'VueScrollTo'
        }
    },
}
```

::: tip 注意
src/plugins/element.js 默认引入了 element 样式文件<br>
注释掉 //import '../element-variables.scss'
:::

``` js
import Vue from 'vue'
import Element from 'element-ui'
// import '../element-variables.scss'

Vue.use(Element)
```

/public/index.html 添加相关CDN

``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/display.css">
  <link rel="stylesheet" href="https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/base.css">
  <title>hello-world</title>
</head>

<body>
  <noscript>
    <strong>We're sorry but hello-world doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@2.6.10/dist/vue.min.js"></script>
  <script src="https://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js"></script>
  <script src="https://unpkg.com/vuex@3.1.1/dist/vuex.min.js"></script>
  <script src="https://unpkg.com/element-ui@2.12.0/lib/index.js"></script>
  <script src="https://unpkg.com/axios@0.19.0/dist/axios.min.js"></script>
  <script src="https://unpkg.com/vue-scrollto@2.17.1/vue-scrollto.js"></script>
  <!-- built files will be auto injected -->
</body>

</html>
```

### 开启GZIP
1、安装 `compression-webpack-plugin`
``` js
npm i compression-webpack-plugin -D
```

``` js
// vue.config.js 配置
const CompressionPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
module.exports = {
    //其他配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.plugins.push(
                new CompressionPlugin({
                    filename: '[path].gz[query]', // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
        } else {
            // 开发环境

        }
    },
}
```

### 生产环境关闭 `source-map`
[source-map官方文档](https://webpack.docschina.org/guides/development/#%E4%BD%BF%E7%94%A8-source-map)

``` js
// vue.config.js
module.exports = {
    // 其他配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.devtool = "none"
        }
        else {
            // 开发环境
        }
    }
}
```