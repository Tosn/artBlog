## Array.from()

从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
::: tip
语法：Array.from(arrayLike, mapFn, thisArg)

参数：

-   arrayLink 想要转换成数组的伪数组对象或可迭代对象
-   mapFn | 可选 如果制定了该参数，新数组中的每个元素会执行该回调函数
-   thisArg | 可选 可选参数，执行回调函数 `mapFn` 时 `this` 对象

:::

```js
Array.from('foo') // ['f', 'o', 'o']
Array.from([1, 2, 4], x => x + x) // [2, 4, 8]
Array.from(
    [1, 2, 4],
    function(x) {
        return x + this.c
    },
    { c: 3 }
) //[4, 5, 7]
/* 
注意：
当使用thisArg的时候，mapFn不可以使用箭头函数，因为箭头函数 this的指向是window 而不是自身的this对象
*/
```

## Array.isArray()

用于确定传递的值是否是一个 `Array` 如果值是 `Array`，则为 `true`; 否则为 `false`。

```js
Array.isArray([]) // true
Array.isArray(123) // false
Array.isArray([1, 2, [2]]) //true
```

## Array.prototype.copyWithin()

::: tip
语法：
arr.copyWithin(target, start, end)

参数：

-   target 0 为基底的索引，赋值序列到该位置。如果是负数，`target` 将从末尾开始计算。
    如果 `target` 大于 `arr.length` ，将会不发生拷贝。如果 `target` 在 `start` 之后，复制的序列将被修改以符合 `arr.length`
-   start 0 为基底的索引，开始复制元素的起始位置。如果是负数，`start` 将从末尾开始计算。
    如果 `start` 被忽略，`copyWithin` 将会从 0 开始复制。
-   end 0 为基底的索引，开始复制元素的结束位置。`copyWithin` 将会拷贝到该位置，但不包括 `end` 这个位置的元素。如果是负数，`end` 将从末尾开始计算。
    如果 `end` 被忽略，`copyWithin` 方法将会一直复制至数组结尾（默认为 `arr.length`）

:::

```js
const arr = [1, 2, 3, 4, 5]
arr.copyWithin(2) // [1, 2, 1, 2, 3]
arr.copyWithin(0, 2, 4) // [3, 4, 3, 4, 5]
arr.copyWithin(-2) // [1, 2, 3, 1, 2]
```

## Array.prototype.entries()

entries() 方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对。

```js
var array1 = ['a', 'b']

var iterator1 = array1.entries()

console.log(iterator1.next().value)
// interator1.next()  => { done: false, value: [0, a] }
// expected output: Array [0, "a"]

console.log(iterator1.next().value)
// interator1.next()  => { done: false, value: [1, b] }
// expected output: Array [1, "b"]
console.log(iterator1.next())
// {done: true, value: undefined}

// 二维数组排序
var a = [[2, 10, 4], [5, 1, 12, 34, 13], [12, 2, 32, 56]]
function sortArr(arr) {
    var goNext = true
    var entries = arr.entries()
    while (goNext) {
        var result = entries.next()
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b)
        } else {
            goNext = false
        }
    }

    return arr
}
sortArr(a)
/* 
[[2, 4, 10], [1, 5, 12, 13, 34], [2, 12, 32, 56]]
*/
```

## Array.prototype.every()

every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
::: tip
语法：
arr.every(callback, thisArg)

参数：

-   callback 用来测试每个元素的函数，它可以接受三个参数：
    1. **element** 用于测试的当前值
    2. **index** | 可选 用于测试的当前值的索引
    3. **array** | 可选 调用 `every` 的当前数组
-   thisArg 执行 `callback` 时使用的 `this` 值

:::

```js
var a = [2, 3, 6, 8]
a.every(x => x > 3) //false
a.every(x => x < 10) //true
a.every(function(x) {}, { c: 2 })
```

## Array.prototype.fill()

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
::: tip
语法：arr.fill(value, start, end)

参数：

-   **value** 用来填充数组元素的值
-   **start | 可选** 起始索引，默认值为 0
-   **end | 可选** 终止索引，默认值为 `this.length`

返回值：修改后的数组

:::

```js
let arr1 = [1, 2, 3, 4]
arr1.fill(0, 2, 4) // => [1, 2, 0, 0]
let arr2 = [2, 3, 4, 5]
arr2.fill(5, 1) // => [2, 5, 5, 5]
```

参考文档

[Web 开发技术 > Javascript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
