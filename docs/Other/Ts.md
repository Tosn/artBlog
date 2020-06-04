# Ts

## vue-ts

``` vue
// Ts 组件申明方式
<template>
  <div>
    {{msg}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      msg: 'This is a message'
    }
  }
})
</script>

<style scoped>

</style>

```

文件<code>shims-tsx.d.tsx</code>拓展了tsx语法，可以在项目中使用tsx文件

```ts
// tsx 组件模板
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Comp2 extends Vue {
  foo = 'hello, tsx!'
  render () {
    return <div>{this.foo}</div>
  }
}

```

```vue
// vue属性ts模板声明方式

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="feature in features" :key="feature">{{feature}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;  // props
  features: string[] = ['类型注解', '编译型语言']  // data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
```



## Ts语法

### 类型注解

```ts
let age: number = 10  // 数字类型
let name: string = 'Tosn'  // 字符串类型
let isDone: boolean = true  // 布尔类型
let list: number[] = [10, 20]  // 数组类型 元素为number
let list: Array<number> = [10, 20]  // 同上
let any: any = 1  // any类型  可以为任何类型
let x: [string, number]  // 元祖Tuple
x = ['heelo', 20]  // ok
x = [20, 'hello']  // error
/*
* 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和* * * number类型的元组。
*/

void 类型
// void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

function warnUser(): void {
  console.log("This is my warning message")
}

```





