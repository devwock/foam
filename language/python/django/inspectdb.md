---
title: inspectdb
summary: 
categories:
    - 
tags:
    - django
link: 
publish: true
---

# inspectdb

`inspectdb` 명령어는 장고에서 이미 DB에 테이블이 존재 할 경우 이를 리버스 엔지니어링 하여 모델 클래스로 만들어주는 명령어이다.

```shell
python manage.py inspectdb --database DB_NAME > filename.py
```
