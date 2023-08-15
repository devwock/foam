---
title: React Class Vs Function
tags:
    - react
publish: true
---

# React Class Vs Function

## function 베이스

```javascript
const test = (props) => <div>{props.name}</div>
```

## class 베이스

```javascript
class Test extends Component {
    render() {
        return <div>{this.props.name}</div>
    }
}
```

## 무엇이 더 나은가

function 베이스는 플레인 자바스크립트, `props`를 arg로 받음.  
class 컴포넌트는 `React.Compenent`를 상속받음.

function 베이스는 `setState()`를 사용할 수 없음. 그래서 `functional stateless` 컴포넌트로 불리기도 한다.

리액트 16.8 Hooks가 업데이트되면서 functional에서도 라이프사이클 훅 사용 가능.

<https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108>
