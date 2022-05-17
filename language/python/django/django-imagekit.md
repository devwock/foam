---
title: Django Imagekit
summary: 
categories:
    - 
tags:
    - 
link: 
publish: true
---

# Django Imagekit

Django에서 썸네일 필드를 정의하고 썸네일 파일을 자동 생성 및 매핑 해주는 라이브러리

## Prerequired

```bash
pip install pillow
pip install pilkit
pip install django-imagekit
```

설정에 다음 항목 추가

```python
INSTALLED_APPS = [
    ..
    'imagekit'
]

##################################################################
# Thumbnail
##################################################################
IMAGEKIT_CACHEFILE_DIR = 'CACHE/images'
# imagekit.cachefiles.strategies.JustInTime: 파일 호출 시 썸네일 있는지 확인
# imagekit.cachefiles.strategies.Optimistic: 저장할때만 썸네일 생성
IMAGEKIT_DEFAULT_CACHFILE_STRATEGY = 'imagekit.cachefiles.strategies.JustInTime'
# JPEG, PNG, BMP.. https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
```

## 사용

모델에 다음과 같이 설정

```python
THUMBNAIL_FORMAT = 'JPEG'
THUMBNAIL_WIDTH = 100
THUMBNAIL_HEIGHT = 100
THUMBNAIL_QUALITY = 100

class ImageTest(models.Model):
    original_image = models.ImageField(null=True, blank=True, upload_to=IMAGE_ROOT_PATH)
    thumbnail_image = ImageSpecField(
        source='original_image', # 원본이 저장될 필드
        processors=[Thumbnail(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)],
        format=THUMBNAIL_FORMAT,
        options={'quality': THUMBNAIL_QUALITY}
    )
```

## 테스트

```python
from tests.models.image_test import ImageTest
image_test = ImageTest.objects.first()
print (image_test.thumbnail_image.url)

> /media/<IMAGEKIT_CACHEFILE_DIR>/<IMAGE_ROOT_PATH>/<원본파일이름>/199f2db624c51c3445c5b3f0356fc000.jpg
```

## 동작

1. 설정이 모델에 정의되어 있으므로 설정을 변경하려면 migrate를 해야한다.
2. 원본 이미지 필드를 source로 참조하고, 원본 이미지를 업로드 한다.
3. 썸네일 필드 객체를 호출하면 `/media/<IMAGEKIT_CACHEFILE_DIR>/<IMAGE_ROOT_PATH>/<원본파일이름>/` 폴더에 썸네일 이미지가 생성된다.
4. 크기 등 변경 시 해당 폴더에 새로운 썸네일이 생성되고, 설정값이 같으면 기존 생성된 썸네일을 사용한다.

## 캐시 정책

[캐시가 삭제되지 않음](https://github.com/matthewwithanm/django-imagekit/issues/229)

```python
from imagekit.utils import get_cache
get_cache().clear()
```

이런 방법이 있긴 한데 정상적으로 동작하지 않음. 아마 메모리 내 캐시만 날리는듯?
수동으로 파일 삭제하는게 가장 확실함

## 주의

설정 값이 변경되면

```bash
python manage.py makemigration
python manage.py migrate
```

꼭 해줘야함. 안하면 적용 안됨

## 참조링크

- [공식 문서](https://django-imagekit.readthedocs.io/en/latest/)
- [리포지토리](https://github.com/matthewwithanm/django-imagekit)

## 유사 서비스

- [sorl-thumbnail](https://github.com/jazzband/sorl-thumbnail)
  - 키밸류 스토어를 사용해야함. memcached나 redis를 권장함
