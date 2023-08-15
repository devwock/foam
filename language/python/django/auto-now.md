---
title: Django Auto Now
tags:
    - django
publish: true
---

# Django Auto Now

Django ORM에서 `models.DatetimeField`의 속성 중 `auto_now=True`를 설정할 경우, 매 `save()`시 날짜가 갱신된다.

만일 생성 시에만 현재 시간을 추가하고 싶다면 `auto_now_add=True`를 사용하면 `QuerySet.create()`시에만 날짜가 할당된다.  
`auto_now_add=True` 대신 `default=timezone.now()`를 쓸 경우 warning이 발생한다. (상수가 아니기 때문)

## 주의

다음과 같이 객체 생성 후 저장 시 해당 필드는 `null`값이 할당된다.

```python
test = Test()
test.save()
```

해당 방법으로 생성하면 `create()`함수가 호출되지 않기 때문. 따라서 위와 같이 사용하려면 다음과 같이 처리해야한다.

```python
test = Test()
test.created_at = timezone.now() # 명시적으로 필드를 지정
test.save()
```

또한 `QuerySet.update()` 호출시에도 갱신되지 않는다. 이 경우 역시 update 시 직접 시간을 지정해줘야 한다.

`auto_now`, `auto_now_add`, `default`는 상호 배제적이므로 섞어 쓸 경우 오류가 발생한다.

## Reference

<https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.DateField.auto_now>
