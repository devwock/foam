# Higher Order Function

고차함수는 함수를 인자로 받거나, 함수를 반환함으로써 작동하는 함수이다.
`Array.prototype.map`, `Array.prototype.filter`, `Array.prototype.reduce`는 빌트인 고차함수이다.

고차함수가 아닌 경우

```javascript
const arr1 = [1, 2, 3];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}
console.log(arr2);
```

고차함수인 경우

```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1.map(function(item) {
    return item * 2;
})
console.log(arr2);
```

화살표 함수를 사용

```javascript
const arr1 = [1, 2, 3];
const arr2 = arr2.map(item => item * 2);
console.log(arr2);
```

고차함수 만들기

```javascript
const strArray = [1, 2, 3];

function mapForEach(arr, fn) {
    const newArray = [];
    for(let i = 0; i < arr.length; i++) {
        newArray.push(
            fn(arr[i]);
        );
    }
    return newArray;
}

const lenArray = mapForEach(strArray, function(item) {
    return item.length
});

console.log(lenArray);
```

위 예제는 배열과 콜백함수 `fn`을 받는 `mapForEach` 고차함수를 만들었다. 이 함수는 제공받은 배열을 반복하고, `newArray.push` 함수 내부에서 반복마다 콜백함수 `fn`을 호출한다.

## 결론

고차함수는 함수를 인자로 받고, 함수를 반환할 수 있는 함수이다.

<https://velog.io/@jakeseo_me/자바스크립트-개발자라면-알아야-할-33가지-개념-22-자바스크립트-자바스크립트-고차-함수Higher-Order-Function-이해하기>
