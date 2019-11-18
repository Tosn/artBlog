## Class类

> 类实际上是个“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类语法有两个组成部分：类表达式和类声明。

```js
// 申明类
class Rectangle {
    constructor(height, width) {
        this.height = height
        this.width = width
    }
}
```

::: danger 注意
函数声明和类声明之间的一个重要区别是函数声明会提升，类声明不会。你首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError：
:::
```js
let p = new Rectangle(); 
// ReferenceError
class Rectangle {}
```

### 严格模式
> 类声明和类表达式的主体都执行在严格模式下。比如，构造函数，静态方法，原型方法，getter和setter都在严格模式下执行。

### 构造函数
> `constructor` 方法是一个特殊的方法，这种方法用于创建和初始化一个由 `class` 创建的对象。一个类只能拥有一个名为 “constructor”的特殊方法。如果类包含多个 `constructor` 的方法，则将抛出 一个SyntaxError 。

> 一个构造函数可以使用 super 关键字来调用一个父类的构造函数。

### 原型方法
```js
class Rectangle {
    constructor(height, width) {
        this.height = height
        this.width = width
    }

    get area() {
        return this.calcArea()
    }

    set area(w_h) {
        this.width = w_h.split('_')[0]
        this.height = w_h.split('_')[1]
    }

    calcArea() {
        return this.width * this.height
    }
}

const suqare = new Rectangle(10, 10)
suqare.area = '5_6'
console.log(suqare.area)   // > 30
```

### 静态方法
> `static` 关键字用来定义一个类的一个静态方法。调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法。静态方法通常用于为一个应用程序创建工具函数。

```js
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static distance(a, b) {
        // 静态方法里面无法直接调用class 类的constructor实体
        return `distance is X: ${b.x - a.x}, Y: ${b.y - a.y}`
    }
}

const p1 = new Point(0, 2)
const p2 = new Point(5, 10)
console.log(Point.distance(p1, p2))   // > distance is X: 5, Y: 8
console.log(Point.distance({ x: 1, y: 2 }, { x: 5, y: 10 }))  // > distance is X: 4, Y: 8
```

```js
// 静态方法和普通方法 this 区别
class Animal {
    constructor() {
        this.x = 2
        this.y = 3
    }
    speak() {
        return this
    }
    static eat() {
        return this
    }
}

console.log(Animal.eat())
/* 
class Animal {
    constructor() {
        this.x = 2
        this.y = 3
    }
    speak() {
        return this
    }
…
*/
let c = new Animal()
// Animal {x: 2, y: 3}
console.log(c.speak())
```

### 用原型和静态方法包装
> 当一个对象调用静态或原型方法时，如果该对象没有“this”值（或“this”作为布尔，字符串，数字，未定义或null) ，那么“this”值在被调用的函数内部将为 `undefined`。不会发生自动包装。即使我们以非严格模式编写代码，它的行为也是一样的，因为所有的函数、方法、构造函数、 `getters` 或 `setters` 都在严格模式下执行。因此如果我们没有指定this的值，this值将为 `undefined`。

```js
class Animal { 
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```