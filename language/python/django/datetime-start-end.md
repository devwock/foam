---
title: datetime Start End
summary: 
categories:
    - 
tags:
    - django
link: 
publish: true
---

# datetime Start End

모델에서 필터링 하다보면 빈번하게 하루의 시작과 끝 시간으로 필터링 해야하게 되는데, `datetime` 객체로부터 시작과 끝시간을 만드는 코드.

```python
from django.utils import timezone

localtime = timezone.localtime() # datetime 객체

from_date = localtime.replace(hour=0, minute=0, second=0, microsecond=0)
until_date = localtime.replace(hour=23, minute=59, second=59, microsecond=999999)
```
