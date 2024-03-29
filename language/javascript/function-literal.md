---
title: Function Literal
tags:
    - javascript
publish: true
---

# Function Literal

Function Literal이란 함수를 [[literal]] 표기법으로 생성하는 방법이다.

자바스크립트의 Function Literal은 Function Expression(함수 표현식)과 동의어이며 다음 4가지의 특징을 가진다.

1. 예약어 function (필수)
2. 함수 이름 (선택)
   - 재귀문으로 자기 자신 호출 가능
   - 디버거나 개발 도구에서 함수 식별 가능
   - 이름이 주어지지 않았을 경우 익명 함수가 됨
3. 매개 변수 집합 (필수)
   - 괄호로 묶임
   - 괄호 안에는 콤마로 구분된 0개 이상의 매개변수 이름이 설정됨
   - 매개 변수 이름은 함수 내 변수로 정의됨
   - 일반 변수와 다르게 `undefined`로 초기화되지 않고 함수가 호출되었을 때 제공되는 파라미터 초기화된다.
4. 함수 본문 (필수)

출처: [JavaScript: The Good Parts](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/ch04s02.html) - Douglas Crockford

```javascript
function add(a, b) { // 1. function, 2. 이름 add, 3. 매개변수 집합 (a, b)
    return a + b // 함수 본문
}
```

이 경우 다음과 같이 함수 정의한 것과 무엇이 다른가 하는 의문이 들 수 있다.

```javascript
function add(a, b) {
    return a + b;
}
```

맨 처음 방법은 함수가 런타임에 정의되고, 두번째 방법은 함수가 컴파일 타임에 정의되게 된다. 물론 둘 다 Function literal이다.

함수 이름을 선택사항으로 사용하려면 다음 조건을 충족해야 한다.

1. 함수를 할당받을 변수를 지정
2. 함수를 즉시 호출 [[immediately-invoked-function-expression]]

```javascript
const add = function(a, b) { return a + b };

(function(a, b) { return a + b}) (1, 2);
```

