---
title: 장고 필터 OrderingFilter에 커스텀 메소드 삽입
tags:
    - django
link: 
publish: true
---

# Django Method Ordering Filter

`django_filter.OrderingFilter`는 모델 내 필드를 정렬할 수 있지만, 커스텀을 삽입할 수 없다.

다음 방법을 사용하면 OrderingFilter 시 커스텀 로직을 삽입하여 annotate로 정렬을 할 수 있다.

## 구현

```python
import re
from django_filters import OrderingFilter
from django_filters.constants import EMPTY_VALUES


class MethodOrderingFilter(OrderingFilter):

    def __init__(self, *args, **kwargs):
        self.method_map = kwargs.pop('field_methods', {})
        super(MethodOrderingFilter, self).__init__(*args, **kwargs)

    def camel_to_underscore(self, name)
        return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

    def filter(self, qs, value):
        if value in EMPTY_VALUES:
            return qs
        ordering = [self.get_ordering_value(param) for param in value]
        if not self.method_map:
            return qs.order_by(*ordering)

        for ordering_item in ordering:
            if ordering_item[0] == '-':
                ordering_item = ordering_item[1:]
            snake_item = camel_to_underscore(ordering_item)
            method = self.method_map.get(snake_item)
            if method is not None:
                qs = method(self, qs)
        return qs.order_by(*ordering)
```

## 사용

사용 시 다음과 같이 사용한다.

```python
def annotate_approved_at(self, qs):
    return qs.annotate(
        approvedAt=Max(
            'model__model_m2m__approved_at'
        )
    )

order_by = MethodOrderingFilter(
    fields=(
        ('approved_at', 'approvedAt'),
    ),
    # 반드시 맵으로 사용할 것
    field_methods={
        'approved_at': order_by_approved_at,
    },
)
```

`annotate_approved_at` 내부에서 커스텀 로직을 정한 뒤, `MethodOrderingFilter`내에서 `field_methods`로 호출한다.
