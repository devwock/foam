---
title: Functional Programming
summary: 
categories:
    - 
tags:
    - 
link: functional
publish: true
---

# Functional Programming

함수형 프로그래밍이란 함수를 다른 함수의 파라미터로 넘길수도 있고, 반환 값으로 함수를 받을 수 있는 프로그래밍 형태이다.

## 디자인 조건

- 모듈 방식: 각각 프로그램을 반복하여 작은 단위로 쪼개야 함. 각각의 조각들이 상태를 공유하는 것을 피해야 함.
- 상태 오염: 가변 상태를 피한다. 데이터 의존성이 생기지 않도록 해야한다.
- 타입: 타입을 신중하게 사용해야함.
