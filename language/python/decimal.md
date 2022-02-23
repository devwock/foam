---
title: Python Decimal 설정
summary: Python Decimal 설정
categories:
    - 
tags:
    - language
    - python
link: 
publish: true
---

# Decimal

Decimal에서 수치 정확도를 전체적으로 적용하려면 다음과 같이 사용한다.

```python
import decimal

decimal.DefaultContext.prec = 10
decimal.setcontext(decimal.DefaultContext)
```

이 경우 소수점 정확도까지 보장되기 때문에, 특정 자리에서 반올림 하고싶으면 다음과 같이 값을 구해야 한다.

```python
from decimal import Decimal
test = Decimal('3.141592')
print(test.quantize(Decimal('1.00')))

3.14
```
