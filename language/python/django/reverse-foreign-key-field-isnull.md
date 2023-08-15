---
title: 역참조 ForeignKey isnull 필터링
tags:
    - django
link: 
publish: true
---

# Django Reverse ForeignKey Field isnull

Django ORM에서 역참조 모델에 filter로 `Model.objects.filter(reverse_table1__reverse_table2__field__isnull=True)` 같이 역참조 필드에 `isnull`을 걸 경우, 실제 쿼리는 `LEFT OUTER JOIN reverse_table1`과 `LEFT OUTER JOIN reverse_table2`가 걸린다.  
이렇게 되면 `reverse_table1`에 `table2`가 `null`이어도 값이 나오는 문제가 발생한다.

따라서 다음과 같이 ID NULL 체크를 해줘야 한다.

```python
Model.objects.filter(
    reverse_table1__reverse_table2__isnull=False,
    reverse_table1__reverse_table2__field__isnull=True
)
```

이 경우 쿼리는 `LEFT OUTER JOIN reverse_table2 ... WHERE reverse_table2.id IS NOT NULL` 로 생성이 되면서 `reverse_table1`에 `table2`가 `null`일 경우 필터링 되어 나오지 않는다.
