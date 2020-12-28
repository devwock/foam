# Fixture

## 앱 단위 픽스쳐

```bash
python manage.py dumpdata -e contenttypes -e auth.Permission promotions --indent 4 > testapp/fixture/promotion-data.json
```

## 프로젝트 단위 픽스쳐

```bash
python manage.py dumpdata -e contenttypes -e auth.Permission --indent 4 > testapp/fixture/testapp-data.json
```

## 픽스쳐 복원

```bash
python manage.py loaddata testapp/fixture/testapp-data.json
```
