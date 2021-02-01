# Many to Many Combine

장고의 Many To Many를 결합하려면 다음과 같은 방법을 사용한다.

```python
instance.many.add(*other_instance.many.all())
```
