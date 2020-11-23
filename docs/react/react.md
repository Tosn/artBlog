## react-基础

```js
jsx语法

// 变量
const name = 'Tosn'
// jsx
<div><{name}</div> // => <div>Tosn</div>

// function
const person = {
  firstName: 'Zhang',
  lastName: 'San'
}
function formatName (user) {
  return `${user.firstName} ${user.lastName}`
}
// jsx
<div>{formatName(person)}</div> // => <div>Zhang San</div>

// 条件语句
const isLogin = false
// jsx
<div>{isLogin ? '退出登录' : '去登陆'}</div> // => <div>去登陆</div>

// 循环
const list = [0, 1, 2, 3]
// jsx
<ul>
  {
    list.map(item => (
      <li key={item}>{item}</li>
    ))
  }
</ul>
or
<ul>
  {
    list.map(item => {
      return <li key={item}>{item}</li>
    })
  }
</ul>

/**
 * <ul>
 *  <li>0</li>
 *  <li>1</li>
 *  <li>2</li>
 *  <li>3</li>
 * </ul>
*/

// 属性
// jsx
<h4 style={{fontSize: '20px', color: 'red'}}>Test</h4> // => <h4 style="font-size: 20px;color: red">Test</h4>
// 注意 css font-size 在jsx使用驼峰 fontSize 或者加上引号 'font-size'

// 模块化
// index.module.css
.app {
  color: red;
  font-size: 20px;
}
// jsx
import styles from './index.module.css'
<div className={styles.app}>Test</div> // => 避免冲突 模块化后 class或解析成 src_app_字符串
```

## 组件

## redux
* createStore 创建 store
* reducer 初始化、修改状态函数
* getState 获取状态值
* dispatch 提交更新
* subscribe 变更订阅
```js
// 安装引入
npm install redux --save

// src/store/index.js
import { createStore } from 'redux'

function counterReducer (state = 0, action) {
  switch (action.type) {
    case 'ADD': 
      return state + action.value 
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}
const store = createStore(counterReducer)

export default store

// 页面使用
import React, { Component } from 'react';
import store from './store'
class App extends Component {
  componentDidMount () {
    // store变更 强制更新view
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  render() {
    return (
      <div>
        <h3>redux test</h3>
        <p>{ store.getState() }</p>
        <button onClick={() => store.dispatch({ type: 'ADD', value: 2 })}>add</button>
      </div>
    );
  }
}

export default App;
/**
 * store.subscribe 也可以使用在 入口页面，src/index.js
 * 全局监听store变化重新渲染视图
 */
 import store from './store'
 store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})
```

## react-router
```js
npm install react-router-dom --save

import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">个人中心</Link>
        <Switch>
          <Route exact path="/" 
            // component={Home} 
            render={() => {
              return (
                <div>render Comp</div>
              )
            }}
            // children={() => {
            //   return (
            //     <div>Children comp</div>
            //   )
            // }}
          />
          <Route path="/user" component={User} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

class Home extends React.Component {
  render () {
    return (
      <h1>Home Page</h1>
    )
  }
}

class User extends React.Component {
  render () {
    return (
      <h2>User Info</h2>
    )
  }
}

class ErrorPage extends React.Component {
  render () {
    return (
      <h1>Error Page 404</h1>
    )
  }
}

export default App;
```

路由组件三种引入方式
- component: component  location匹配时渲染
- children: function  不管location是否匹配都会渲染，其他工作方式和render方法一致
- render: function  location匹配时渲染

优先级： children > component > render

精确匹配：Link 加上 <code>exact</code>

唯一匹配： Route外层加上 Switch

## 生命周期

react 16之前
![生命周期](../images/react/react-16.png "react16生命周期")

对比图

旧：
![生命周期](../images/react/react-16-life.jpeg "旧的生命周期")

新:
![生命周期](../images/react/react-17-life.png "新的生命周期")