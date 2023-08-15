# Var, Let, Const 차이

## var: function-scope

var는 hoisting이 되기 때문에 같은 function 내면 block scope를 벗어나도 호출이 된다.  
막으려면 `'use strict'`를 사용해야 한다.

## `let`, `const`: block-scope

es2015에서 추가.

재선언 불가, const는 immutable 객체. let은 재할당 가능하지만 const는 불가능하다.

`let`은 값으르 할당하기 전 변수가 선언되야 함.  
`const`는 선언과 동시에 값을 할당해야 함.

<https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d>
