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