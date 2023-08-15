---
title: Django Fixture 
tags:
    - django
publish: true
---

# Django Fixture

## 앱 단위 픽스쳐

```shell
python manage.py dumpdata -e contenttypes -e auth.Permission promotions --indent 4 > <filename.json>
```

## 프로젝트 단위 픽스쳐

```shell
python manage.py dumpdata -e contenttypes -e auth.Permission --indent 4 > <filename.json>
```

## 클래스(테이블) 단위 픽스쳐

```shell
python manage.py dumpdata <APP_NAME.CLASS_NAME> --database DB_NAME -e contenttypes -e auth.Permission --indent 4 > <filename.json>
```

## 픽스쳐 복원

```shell
python manage.py loaddata <filename.json>
```
