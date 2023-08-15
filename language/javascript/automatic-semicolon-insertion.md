---
title: Automatic Semicolon Insertion
tags:
    - javascript
publish: true
---

# Automatic Semicolon Insertion

`Automatic Semicolon Insertion`은 자바스크립트에서 자동으로 세미콜론을 삽입하는 것을 뜻한다.

일부 자바스크립트 statement는 반드시 세미콜론으로 끝나야 하기 떄문에, 개발자가 명시적으로 세미콜론을 입력하지 않으면 ASI로 자동으로 세미콜론이 삽입된다.

- 빈 statement
- `let`, `const`, variable statement
- `import`, `export`, module 선언
- 표현 statement
- `debugger`
- `continue`, `break`, `throw`
- `return`

`ECMAScript` 명세에서는 [세미콜론 삽입에 대한 3가지 규칙](https://tc39.es/ecma262/#sec-rules-of-automatic-semicolon-insertion)이 있다.

1. 문법에서 허용하지 않는 `Line Terminator(<LF>, <CR>, <LS>, <PS>)`나 `}`를 만났을 때

```javascript
{ 1 2 } 3
// ASI 삽입 후
{ 1 2; } 3;
```

2. 토큰 입력 스트림의 끝이 감지되고, 파서가 완전한 프로그램으로서 단일 인풋 스트림을 파싱할 수 없을 때

다음 예제에서는 `++`이 `b`에 붙는 [postfix operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#increment)로 다루지 않고 `b`와 `++` 사이에 세미콜론을 삽입한다.

```javascript
a = b
++c
// ASI 삽입 후
a = b;
++c;
```

1. 문법에서 이후 추가 코드가 불가한(restricted productions) statement 뒤에 line terminator가 올 때. 이러한 "LineTerminator 없음" 규칙을 갖는 statement는 다음과 같다.

- PostfixExpression (`++`, `--`)
- `continue`
- `break`
- `return`
- `yield`, `yeild*`
- `module`

```javascript
return
a + b
// ASI 삽입 후
return;
a + b;
```

## Refrence

<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Lexical_grammar#자동_세미콜론_삽입>