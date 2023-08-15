# Value Types and Reference Types

자바스크립트는 pass by value가 일어나는 5가지 데이터 타입이 있다. (Boolean, Null, Undefined, String, Number) 우리는 이러한 데이터 타입을 [[primitive types]]라고 부른다.
또 자바스크립트는 pass by reference가 일어나는 3가지 데이터 타입이 있다. (Array, Function, Object)

## [[promitive types]]

어떠한 원시 타입이 변수에 할당된다면, 우리는 그 변수를 원시 타입을 가진 변수라고 생각할 수 있다.

```javascript
var x = 10;
var y = 'abc';
var z = null;
```

이러한 변수는 메모리에 다음과 같은 이미지로 나타낼 수 있다.

| Variables | Values |
| :-- | :-- |
| x | 10 |
| y | 'abc' |
| z | null |

이 변수를 다른 변수에 `=` 키워드를 이용하여 할당할 때, 우리는 새로운 변수에 값을 **복사** 하게 된다.

```javascript
var x = 10;
var y = 'abc';

var a = x;
var b = y;
```


| Variables | Values |
| :-- | :-- |
| x | 10 |
| y | 'abc' |
| a | 10 |
| b | 'abc' |

이러한 값에 의한 복사는 변수를 바꾸더라도 다른 변수에는 영향이 없다.

## 객체

non-primitive value가 할당된 변수들은 그 값으로 향하는 reference를 갖게 된다. reference는 객체의 위치를 가리킨다. 변수는 실제로 값을 가지고 있지 않다.

```javascript
1) var arr = []
2) arr.push(1);
```

메모리 안에서 1과 2의 표기는 다음과 같다.

| Variables | Values | Addresses | Objects |
| :-- | :-- | :-- | :-- |
| arr | <#001> | #001 | [] |

| Variables | Values | Addresses | Objects |
| :-- | :-- | :-- | :-- |
| arr | <#001> | #001 | [1] |

`arr`이 가진 변수의 값(주소)은 정적이다. 변수의 값이 바뀌는게 아닌, 메모리 속의 배열의 값이 바뀌는 것이다. arr에 `push`하면 자바스크립트 엔진은 메모리 속의 `arr`의 위치로 가서, 해당 메모리 주소를 이요하여 작업한다.

## 참조로 할당

객체와 같은 참조 타입이 `=`를 이용하여 다른 변수로 복사될 때, 값의 주소는 실제로 복사된다. 객체는 값 대신 참조로 복사된다.

```javascript
var reference = [1];
var refCopy = reference;
```

위 코드는 메모리 상에서 아래와 같이 표기된다.

| Variables | Values | Addresses | Objects |
| :-- | :-- | :-- | :-- |
| reference | <#001> | #001 | [1] |
| refCopy | <#001> | | |

각각의 변수는 배열로 향하는 같은 레퍼런스를 갖는다. 즉, `reference`나 `refCopy`를 변경하면 둘 모두 변경된다.

## 참조 재할당

참조 값을 재할당 하면 오래된 참조를 대체한다.

```javascript
var obj = { first: 'reference' };
obj = { second: 'ref2' };
```

`obj`안에 저장된 주소 값은 변경된다. 첫번째 객체는 아직 메모리 상에 다음과 같이 표기가 된다.

| Variables | Values | Addresses | Objects |
| :-- | :-- | :-- | :-- |
| obj | <#678> | #234 | { first: 'reference' } |
| | | <#678> | { second: 'ref2' } |

남아있는 객체를 가리키는 참조가 남아있지 않을 때, 자바스크립트 엔진은 garbage collection을 동작시킬 수 있다. 자바스크립트 엔진은 주소가 사용되지 않는 객체를 메모리에서 안전하게 지워버린다. 이 경우 객체 { first: 'reference' } 가 더이상 접근 불가능하고 가비지 컬렉션 될 수 있다.

### == 와 ===

동등함을 비교하는 연산자 `==`와 `===`는 참조 타입의 변수를 비교할 때 사용된다. 이 연산자들은 참조를 체크한다. 만일 변수가 같은 item에 대해 참조를 갖고있다면, 비교 결과는 true가 나온다.

```javascript
var arrRef = ['Hi!'];
var arrRef2 = arrRef;

console.log(arrRef === arrRef2); // true
```

만일 2개의 구분 가능한 객체를 갖고있고, 프로퍼티가 동일한지 보고싶다면 가장 쉬운 방법은 둘을 문자열로 바꾸고 비교하는 것이다. 동등 연산자가 원시 타입을 비교할 떄는 값이 같은지만 확인한다.

```javascript
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);

console.log(arr1str); // true
```

또다른 선택지로는 객체를 이용해 재귀적으로 반복을 돌며 각각의 프로퍼티가 같은지 확인한다.

## 함수를 통한 파라미터의 전달

원시 값들을 함수로 전달할 때, 함수는 값을 복사하여 파라미터로 전달한다. 이것은 `=` 연산자를 이용하는 것과 같다.

```javascript
var hundred = 100;
var two = 2;

function multiply(x, y) {
    // PAUSE
    return x * y;
}

var twoHundred = multiply(hundred, two);
```

메모리는 다음과 같이 구성된다.

| Variables | Values | Addresses | Objects |
| :-- | :-- | :-- | :-- |
| hundred | 100 | #333 | function(x, y)... |
| two | 2 |  |  |
| multiply | #<333> | | |
| x | 100| | |
| y | 2 | |

## 순수함수

함수 중 바깥 스코프에 어떠한 영향도 미치지 않는 함수를 pure function이라고 한다. 함수가 오직 원시 값들을 파라미터로 이용하고, 주변 스코프에서 아무런 함수를 이용하지 않으면 그 함수는 자연스레 순수함수가 된다. 안에서 만들어지느 모든 변수들은 return 되지 않으면 즉시 가비지 콜렉션 처리가 된다.

객체를 받는 함수는 주변 스코프의 상태를 변화시킬 수 있다. 만일 함수가 배열 참조값을 가진 변수를 받고, 그 변수가 가리키는 배열에 push를 수행하면, 그 주변 스코프에 존재하는 변수들과 그 reference와 배열이 변하는 것을 볼 수 있다. 함수 리턴 후, 변화된 것들은 바깥 스코프에 남아있고, 이러한 현상은 side-effect를 줄 수 있다.

Array.map과 Array.filter를 비롯한 많은 네이티브 배열 함수는 그래서 순수 함수로 작성된다. 배열 참조를 받아서 내부적으로 배열을 복사하고, 원본 대신 복사한 배열로 작업한다. 그래서 새로운 배열의 참조를 반환하게 된다.

## 자가테스트

실행 후 로그를 추측할 것.

```javascript
function changeAgeAndReference(person) {
    person.age = 25; // 참조값 age 변경 -> 25
    person = {
        name: 'John',
        age: 50
    }; // person 재할당
    return person;
}

var personObj1 = {
    name: 'Alex',
    age: 30
};

var personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> { name: 'Alex', age: 25 }
console.log(personObj2); // -> { name: 'John', age: 50 }
```
