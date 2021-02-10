---
title: Implicit Coercion
layout: post
summary: 마크다운 및 플러그인 테스트
categories: [Markdown]
created: 2021-02-03 20:15:17
updated: 2021-02-03 20:15:17
link: "https://velog.io/@jakeseo_me/자바스크립트-개발자라면-알아야-할-33가지-개념-4-암묵적-타입-변환-번역"
toc: true
comments: true
public: true
tags: [tag1, tag2, tag3]
author: devwock
---

## 자바스크립트의 암묵적 타입 변환

자바스크립트의 암묵적 타입 변환이란 예상하지 못한 타입을 받았을 때 예상 가능한 타입으로 바꿔주는 것이다.

### 숫자 표현식에서 숫자가 아닌 값

#### 문자열

숫자 표현식에서 문자열을 피연산자로 넘겼을 때 숫자의 암묵적 타입 변환 프로세스는 문자열을 인자로 자바스크립트 내부에 내장된 `Number` 함수를 불러 오는것과 비슷하게 동작한다. 따라서 숫자 문자(Numeric Characters)를 가졌다면 어떤 문자열이라도 동등한 숫자로 바뀐다. 하지만 문자열에 숫자가 아닌 것(Non-Numeric Characters)가 포함되어 있다면 `NaN`을 리턴하게 된다.

#### + 연산자

`+` 연산자는 다음 두가지 기능을 한다.

1. 수학적인 덧셈
2. 문자열 합치기

문자열이 `+` 연산자의 피연산자로 주어졌을 때, 자바스크립트는 문자열을 숫자로 바꾸지 않고 숫자를 문자로 바꾸려 한다.

```javascript
1 + "2" // "12"
1 + 2 // 3
(1 + 2) + "1" // "31"
```

#### 객체

자바스크립트에서 객체 대부분의 암묵적 형 변환은 결과값으로 `[object Object]`를 반환한다.

```javascript
"name" + {} // name[object Object]
```

모든 자바스크립트 객체는 `toString` 메소드를 상속받는다. 상속받은 `toString` 메소드는 객체가 문자열 타입으로 변환해야할 때 사용된다. `toString` 반환 값은 문자열 합치기(string concatenation) 혹은 수학적 표현식(mathematical expressions)과 같은 연산에서 사용되게 된다.

```javascript
const foo = {
    toString: () => 4
}

2 * foo // 8
2 / foo // 0.5
2 + foo // 6
"four" + foo // "four4"

const baz = {
    toString: () => "four"
}

2 * baz // NaN
2 + baz // 2four

const bar = {
    toString: () => "2"
}

2 + bar // "22"
2 * bar // 4
```

#### 배열 객체

배열에서 상속된 `toString` 메소드는 약간 다르게 동작한다. 이것은 배열에서 아무런 인자도 넣지 않은 `join` 메소드를 호출한 것과 비슷하게 동작한다.

```javascript
[1, 2, 3].toString() // "1, 2, 3"
[1, 2, 3].join() // "1, 2, 3"
[].toString() // ""
[].join() // ""

"me" + [1, 2, 3] // "me1, 2, 3"
4 + [1, 2, 3] // "41, 2, 3"
4 * [1, 2, 3] // NaN
```

배열을 어딘가로 넘길 때는 언제나 `toString` 메소드를 거치면 어떻게 될지 생각해야 한다. 숫자로 변할지 문자로 변할지.

```javascript
4 * [] // 0
4 / [2] // 2

4 * Number([].toString())
4 * Number("")
4 * 0
```

#### True, False, 그리고 ""

```javascript
Number(true) // 1
Number(false) // 0
Number("") // 0

4 + true // 5
3 * false // 0
3 * "" // 0
3 + "" // 3
```

#### valueOf 메소드는

문자열이나 숫자가 올 곳에 객체를 넘길 때 마다 자바스크립트 엔진에 의해 사용될 `valueOf` 메소드를 정의하는 것도 가능하다.

```javascript
const foo = {
    valueOf: () => 3
}

3 + foo // 6
3 * foo // 9
```

객체에 `toString`과 `valueOf` 메소드가 전부 정의되어 있을 때 자바스크립트 엔진은 `valueOf` 메소드를 사용한다.

```javascript
const bar = {
    valueOf: () => 5,
    toString: () => 2
}

"sa" + bar // "sa5"
```

`valueOf` 메소드는 객체가 어떠한 숫자 값을 나타낼 때 사용하기 위해 만들어졌다.

```javascript
const two = new Number(2)
two.valueOf() // 2
```

#### Falsy와 Truthy

모든 자바스크립트 값은 `true`나 `false`로 변환될 수 있는 특서응ㄹ 갖고 있다. `true`로 형변환을 강제하는 것을 `truthy`라고 한다. 또 `false`로 형변환을 강제하는 것을 `falsy`라고 한다.

다음은 자바스크립트에서 변환시에 `falsy`로 취급되는 값들이다.

1. false
2. 0
3. null
4. undefined
5. ""
6. NaN
7. -0

이외는 전부 `truthy`로 취급된다. `truthy`를 이용해도 괜찮지만 값이 참임을 명시적으로 표현해 주는 것이 더 좋은 작성법이다. 자바스크립트의 묵시적 형변환을 완벽하게 이해하더라도 의존하면 안된다.

#### NaN

`NaN`은 자기 자신과도 같지 않은 특별한 숫자 값이다.

```javascript
NaN === NaN // false
const notANumber = 3 * "a" // NaN
notANumber == notANumber // NaN
notANumber === notANumber //NaN
```

`NaN`은 자바스크립트에서 유일하게 자기 자신과 같지 않은 값이다.  
ECMAScript 6은 `NaN`을 체크하기 위한 메소드가 있다. (`Number.isNaN`)

전역 `isNaN` 함수도 있다. 이 함수는 인자가 실제로 `NaN`인지 체크하기 전 인자로 들어온 값의 형 변환을 강제한다.

```javascript
isNaN("number"); // true
isNaN("1"); // false
```

전역 `isNaN` 함수는 사용하지 않는 것이 좋다. 이 함수 동작은 다음의 코드와 비슷하다.

```javascript
const coerceThenCheckNaN = (val) => {
	const coercedVal = Number(val)
    return coercedVal !== coercedVal ? true : false
}

coerceThenCheckNaN("1a") // true
coerceThenCheckNaN("1") // false
coerceThenCheckNaN("as") // true
coerceThenCheckNaN(NaN) // true
coerceThenCheckNaN(10) // false
```

#tag

<https://velog.io/@jakeseo_me/자바스크립트-개발자라면-알아야-할-33가지-개념-4-암묵적-타입-변환-번역>
