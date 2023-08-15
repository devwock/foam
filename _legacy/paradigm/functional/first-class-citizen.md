---
title: First-Class Citizen
summary: 
categories:
    - 
tags:
    - functional
link: 
publish: true
---

# First-Class Citizen

First-Class Citizen(Type Object, Entity, Value)란 프로그래밍 언어에서 다른 엔티티에서 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.

Robin Popplestone은 일급 객체를 다음과 같이 정의한다.

1. 함수의 파라미터로 전달 될 수 있다.
2. 함수의 결과로 리턴될 수 있다.
3. 변수로 할당될 수 있다.
4. 동일 비교를 할 수 있다.

## Javascript

자바스크립트는 함수를 First-Class Citizen으로 처리한다. 자바스크립트나 다른 함수형 프로그래밍 언어에서 함수들은 전부 객체이기 떄문이다.

### 속성 할당

자바스크립트에서 함수는 `function`객체이므로 속성을 추가할 수 있다.

```javascript
function test() {
    console.log('hello, world!');
}

test.test = 'hello'
console.log(test.test)
```

위 문법은 유효하나 매우 위험하다. 필요한 경우 오브젝트를 사용하는것이 좋다.

### 1. 함수의 파라미터로 전달

함수를 파라미터로 전달할 수 있다.

```javascript
const square = function(x) {
    return x * x;
}

function print_square(square, value) {
    console.log(square(value));
}

print_square(square, 5); // 25
```

### 2. 함수의 결과로 리턴

함수를 리턴으로 전달받을 수 있다.

```javascript
const square = function(x) {
    return x * x;
}

function get_square_function() {
    return square;
}

const returned_square = get_square_function();
returned_square(5); // 25
```

### 3. 변수로 할당

함수를 변수에 할당하는 것이 가능하다.

```javascript
const square = function(x) {
    return x * x;
}
square(5); // 25

const foo = square;
foo(6); // 36
```

### 4. 동일 비교

```javascript
const square = function(x) {
    return x * x;
}

function get_square_function() {
    return square;
}

const returned_square_1 = get_square_function();
const returned_square_2 = get_square_function();

console.log(returned_square_1 === returned_square_2); // true
```
