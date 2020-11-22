### 类型注解
```ts
const user = (name: string) => {
  return `Hello ${name}`
}
const tolly = user('tolly') // => Hello tolly

- 布尔值
  let isDone: boolean = false

- 数字
  let decLiteral: number = 6 // 十进制
  let hexLiteral: number = 0xf00d // 十六进制
  let binaryLiteral: number = 0b1010 // 二进制
  let octalLiteral: number = 0o744 // 八进制

- 字符串
  let name: string = 'bob'

- 数组
  let list: number[] = [1, 2, 3]
  let list: Array<number> = [1, 2, 3]

- 元组
  let x: [string, number]
  x = ['Hello', 20] // ok
  x = [20, 'hello'] // error
```
