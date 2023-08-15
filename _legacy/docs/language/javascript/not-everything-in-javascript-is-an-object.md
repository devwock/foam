# Not Everything in Javascript Is an Object

## 원시 데이터 타입

- boolean
- null
- undefined
- number: 2배 정밀도를 가진 64bit float. 자바스크립트에는 정수 타입이 존재하지 않음
- string
- symbol: ES6에서 처음 생김

그 외 ECMAScript 표준은 Object를 정의 했음. Object는 키-밸류 저장소임.

```javascript
const object = {
    key: "value"
}
```

다시말해 Primitive Type이 아닌 것은 Object임. 배열과 함수 모두.

## 원시 타입

원시 타입에는 어떠한 메소드도 없음. 이러한 특성으로 원시타입은 immutable 속성을 가짐. 왜냐하면 자신을 변경할 수 있는 메소드가 없기 때문.

immutable이기 때문에 변수에 원시 타입을 재할당 할 수 있지만 새로운 원시타입 값이 들어가는 것.

> Primitive types are immutable

원시타입은 참조로 저장되지 않고 값 자체로 저장 됨. 단 참조값이 다르면 같음 비교할 때 false로 리턴됨

```javascript
{} === {}; // false
(function() {}) === (function() {}); // false
```

> 원시타입은 value로 저장되고, 객체들은 reference로 저장됨.

## 함수

함수는 특별한 프로퍼티를 가진 새로운 형태의 객체이다.

```javascript
const foo = function(baz) {};
foo.name; // "foo"
foo.length; // 1
```

일반적인 객체와 같이 함수에 새로운 프로퍼티를 추가하는 것도 가능하다.

```javascript
foo.bar = "baz";
foo.bar // baz
```

함수의 이러한 특성은 함수를 [[first-class-citizen]]으로 만든다. 왜냐하면 다음 조건을 만족하기 때문.

1. 다른 함수의 인자 값으로 넘길 수 있다.
2. 변수나 데이터에 할당 가능.
3. 객체의 리턴 값으로 리턴 가능.

> 이러한 특성은 자바스크립트의 객체들이 갖는 특성과 같다.

## 메소드

메소드는 함수와 같이 객체의 프로퍼티이다.

> 메소드와 함수의 차이?? [[difference between a function and a method]]

```javascript
const foo = {}
foo.bar = function() { console.log("baz"); };
foo.bar(); // "baz"
```

## 생성자 함수

자바스크립트에서 생성자 함수란 리턴 값으로 함수를 객체 그 자체로 반환하는 함수이다.  
생성자 함수는 다른 함수와 다를게 없다. 단지 `new`라는 키워드가 붙은 이후 생성자 함수로 사용되고 객체 자체를 리턴할 뿐이다.

> 어떤 함수든 생성자 함수가 될 수 있다.

```javascript
const Foo = function() { };
const bar = new Foo();
bar; // {}
bar instanceof Foo; // true
bar instanceof object; // true
```

생성자 함수는 object를 리턴한다. object에 새로운 프로퍼티를 할당하기 위해 `this`를 함수의 몸통 안에서 사용할 수 있다.

```javascript
const Foo = function() {
    this.bar = "baz";
}
const qux = new Foo();
qux; // {bar: "baz"}
qux instanceof Foo; // true
qux instanceof object; // true
```

`new` 키워드 없이 `Foo()`를 실행하면 `Foo`는 일반적인 함수로 동작한다.  
그리고 함수 내부의 `this` 키워드는 '실행 컨텍스트[[execution context]]'와 응답을 주고 받는다.  
그래서 `Foo()`를 전역 컨텍스트에서 실행시키면 전역 컨텍스트 시점의 `this`인 `window` 객체에 `bar` 프로퍼티가 할당된다.

```javascript
Foo(); // undefined
window.bar; // "baz"
```

일반 함수를 생성자 함수로 실행하면 함수가 실행되는게 아니라 새로운 함수 오브젝트를 반환한다.

## Wrapper Object

`String`, `Number`, `Boolean`, `Function`와 같은 원시 타입을 `new`키워드로 생성하면 원시타입에 대한 `wrapper object`가 생성된다.

```javascript
const pet = new String("dog");
typeof pet; // object
pet === "dog"; // false
```

위의 생성자는 `wrapper object`를 생성한다.

```javascript
{
    0: "d",
    1: "o",
    2: "g",
    length: 3
}
```

> Wrapper Objects는 Object Wrapper라는 이름으로도 불린다.

## Auto-Boxing

흥미로운 점은 원시타입 문자열 생성자와 일반 오브젝트 생성자 둘다 `String` 함수를 이용한다.  
또한 원시 문자열 타입에서 `.constructor`를 이용하여 생성자 프로퍼티를 확인할 수 있다.

```javascript
const pet = new String("dog");
pet.constructor === String; // true
String("dog").constructor === String; // true
```

이것은 Auto-boxing때문에 일어난다. 특정한 원시타입에서 프로퍼티나 메소드를 호출하려 할 때, 자바스크립트는 이것을 임시 래퍼 오브젝트로 바꾼 후 프로퍼티나 메소드에 접근한다. 이 과정에서 원본에 아무런 영향을 끼치지 않는다.

```javascript
const foo = "bar";
foo.length; // 3
foo === "bar"; // true
```

위의 예에서, `length`라는 프로퍼티에 접근하기 위해 자바스크립트는 `foo`를 오토박싱 하고 래퍼 오브적테으 넣는다. 그리고 래퍼 오브젝트의 `length` 프로퍼티에 접근하고 값을 이용한 뒤 지워버린다. 이 과정에서 `foo` 원시타입 변수에 영향을 전혀 미치지 않는다.

이러한 과정은 우리가 원시 타입에 프로퍼티를 할당하려 할 때 자바스크립트가 아무런 경고나 에러를 보여주지 않는지 알 수 있다. 왜냐하면 프로퍼티를 할당할 때 잠시 원시타입을 이용한 wrapper object를 만들고 거기에 할당하기 때문이다.

```javascript
const foo = 42;
foo.bar = "baz"; // Assignment done on temporary wrapper object
foo.bar; // undefined
```

만일 `undefined`나 `null`과 같이 래퍼 오브젝트가 없는 원시 타입에 대해 프로퍼티를 할당하려 하면 자바스크립트는 오류 메세지를 나타낸다.

```javascript
const foo = null;
foo.bar = "baz"; // Uncaught TypeError: Cannot set property 'bar' of null
```

### 요약

1. 자바스크립트의 모든 것이 Object(객체)인 것은 아니다.
2. 자바스크립트에는 6개의 원시 타입이 존재한다.
3. 원시 타입이 아닌 것들은 모두 Object이다.
4. 함수는 단순히 특별한 타입의 Object일 뿐이다.
5. 함수는 새로운 Object를 만들기 위해 사용될 수 있다. (생성자 함수)
6. String, Boolean, Number는 원시 타입이면서 오브젝트이다. (래퍼 오브젝트를 갖는다.)
7. 자바 스크립트 내부에서 존재하는 오토박싱 때문에 몇몇 원시 타입 (String, Number, Boolean)은 Object처럼 동작한다.

<https://velog.io/@jakeseo_me/자바스크립트-개발자라면-알아야-할-33가지-개념-2-자바스크립트의-원시-타입Primitive-Type-번역>
