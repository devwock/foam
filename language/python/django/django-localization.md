---
title: Django Localization
tags:
    - django
publish: true
---

# Django Localization

## 설정

Django 설정 파일에 다음 라인 삽입

```python
from django.utils.translation import gettext_lazy as _

MIDDLEWARE = [
    ...
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.locale.LocaleMiddleware",  # 사이에 삽입
    "django.middleware.common.CommonMiddleware",
    ...
]
...

LANGUAGE_CODE = "ko-KR"
LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)  # locale 대신 원하는 경로를 넣어도 됨
LANGUAGES = [  # 이 라인이 없으면 하나 이상 로컬라이징이 없으면 로컬라이징 파일이 생기지 않음
    ("ko", _("Korean")),
    ("en", _("English")),
]
```

이후 다음 라인 터미널에서 실행

```shell
python manage.py makemessages -l ko
python manage.py makemessages -l en
```

위 명령어를 실행하면 프로젝트 폴더에 `locale/en|ko/LC_MESSAGES/django.po` 파일이 생긴다. 해당 파일에 번역문을 넣으면 된다.

이후에는 다음 명령어로 랭귀지 파일 갱신 가능

```shell
python manage.py makemessages -a
```

이후 컴파일 해야 장고가 사용할 수 있다.

```shell
python manage.py compilemessages
```

## 사용

국제화를 해야하는 텍스트에 다음과 같이 처리해주고, 위의 갱신 명령어를 쳐주면 자동으로 랭귀지 파일에 텍스트가 추가된다.
이후 해당 텍스트를 호출하면 번역된 텍스트로 보이게 된다.

```python
from django.utils.translation import gettext_lazy as _

def test():
    return _("테스트")
```
