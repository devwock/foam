---
title: Literal
summary: 
categories:
    - 
tags:
    - compoter-engineering
link: 
publish: true
---

# Literal

컴퓨터 공학에서 리터럴이란 소스코드에 고정된 값을 나타낸다.  

```csharp
int a = 1;
string s = "cat";
```

상기 코드에서 `1`과 `cat`은 리터럴이다.  

## 객체 리터럴

일부 객체 지향 언어(ex: ECMAScript)에서는 리터럴로 객체를 만들 수 있다. 이 객체의 메소드는 객체 안의 펑션 리터럴로 정의할 수 있다.

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

## Reference

<https://en.wikipedia.org/wiki/Literal_(computer_programming)>
