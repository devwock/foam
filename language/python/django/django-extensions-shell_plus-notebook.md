---
title: django-exentions shell_plus notebook
summary: 
categories:
    - 
tags:
    - django
link: 
publish: true
---

# django-exentions shell_plus notebook

장고에 주피터 노트북을 사용할 수 있게 해주는 `django-exentions`의 `shell_plus` 기능 중 `IPython Notebook`을 알아본다.

설정에 다음 항목 추가

```python
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
```

다음 명령어로 주피터 노트북 실행

```shell
python manage.py shell_plus --note
```
