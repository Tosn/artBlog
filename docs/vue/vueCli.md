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
**space** 空格键选择
**a**键选择全部
**i**键取消全部
如果选择了css pre-processor 使用sass 尽量使用Sass/SCSS(with dart-sass)  dart-cass运行速度比node-sass更快
:::
![vue-cli Manually](https://cli.vuejs.org/cli-select-features.png 'vue-cli Manually')

[拓展阅读：CSS预处理器SASS的默认实现将迁移到Dart Sass](https://www.dart-china.org/t/topic/146)

拉去2.x模板
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
    <div>
        <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
            <use :xlink:href="iconName" />
        </svg>
    </div>
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

## 全局配置scss 

``` js
// vue.config.js

module.exports = {
    css: {
        loaderOptions: {
            // sass: {
            //     prependData: `@import "@/assets/sass/variable.sass"`
            // },
            scss: {
                prependData: `@import "@/assets/sass/variable.scss";`
            }
        },
    },
}
```
::: warning 注意
在 sass-loader v7 中，prependData这个选项名是 "data"
[官方文档](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9)
:::