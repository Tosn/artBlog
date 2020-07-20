## Vue3

1、Reflect

2、weakMap

3、Set对象

Set 和 Map主要应用场景在于数组去重 和 数据存储

### Set

方法：size add clear delete entries forEach keys values [@@iterator]

Set.prototype.entries

```js
// 一个新的包含 [value, value] 形式的数组迭代器对象，value 是给定集合中的每个元素，迭代器 对象元素的顺序即集合对象中元素插入的顺序。
var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```



Set.prototype[@@iterator]()

```js
const set1 = new Set();

set1.add(42);
set1.add('forty two');

const iterator1 = set1[Symbol.iterator]();

console.log(iterator1.next().value);
// expected output: 42
// { value: 42, done: false }

console.log(iterator1.next().value);
// expected output: "forty two"
// { value: 'forty two', done: fase }

console.log(iterator1.next())
// { value: undefined, done: true }
```



 