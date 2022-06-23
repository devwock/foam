---
title: Share Model
summary: 
categories:
    - 
tags:
    - django
publish: true
---
## Share Model

장고에서 다른 프로젝트와 모델 공유 방안 조사

1. [코어 앱 패키지화 하여 PIP에서 받아서 사용](https://www.reddit.com/r/django/comments/4gmjxe/django_best_way_to_use_models_between_multiple/)
2. 코드 베이스 공유
3. git 서브 트리 사용하여 공유-
   - <https://www.reddit.com/r/django/comments/arimd6/sharing_models_over_multiple_projects/egnjnqe/>
   - <https://stackoverflow.com/a/33579069>
4. 코드 복사하여 사용
5. [API로 공유](https://www.reddit.com/r/django/comments/5onnf1/how_to_share_datamodels_between_django_projects/)
6. [inspectdb 사용](https://docs.djangoproject.com/en/3.0/howto/legacy-databases/)
7. RAW SQL 사용

6번의 경우:

```shell
python mysite/manage.py inspectdb > mysite/myapp/models.py
```
