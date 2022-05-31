---
title: Object Literal
summary: 
categories:
    - 
tags:
    - javascript
link: 
publish: true
---

# Object Literal

Object Literal이란 객체를 [[literal]] 표기법 (initializer 표기법)으로 생성하는 방법이다.

```javascript
const object1 = {
    a: 'foo',
    b: 42,
    c: {}
}
console.log(object1.a); // "foo"
```

자바스크립트에서는 객체 리터럴에서 [[function-literal]]로 함수까지 정의할 수 있다.

```javascript
var newobj = {
    var1: true,
    var2: "very interesting",
    method1: function () {
        alert(this.var1)
    },
    method2: function () {
        alert(this.var2)
    }
};
newobj.method1();
newobj.method2();
```

[//begin]: # "Autogenerated link references for markdown compatibility"
[literal]: ../../computer-engineering/literal.md "Literal"
[function-literal]: function-literal.md "Function Literal"
[//end]: # "Autogenerated link references"