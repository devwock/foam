# 샐러리

@app.task와 @shared_task
shared_task는 앱과 관계 없이 전역에서 사용 가능

## 기본 설정

settings.py

```python
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TIMEZONE = 'Asia/Seoul'
CELERY_ENABLE_UTC = 'False'
```

project/project/celery.py

```python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'testapp_task.settings.local')

app = Celery('testapp_task')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```

project/app/tasks.py

```python
from __future__ import absolute_import, unicode_literals
from celery import shared_task

@shared_task
def bill():
    print('billing start...')
```

커맨드라인에서 다음을 입력

```bash
celery -A <prject> worker -l <log level>
```

## 작업 실행

### 로컬 실행

```python
from orders.tasks import test

test.apply_async(args=[arg1, arg2], kwargs={'kwarg1': 'x', 'kwarg2': 'y'})
test.delay(arg1, arg2, kwarg1='x', kwarg2='y')
```

### 원격 실행

```
from testapp.celery import app
app.send_task('orders.tasks.test')
```

## 주기적 작업

주기적 작업에는 [celery beat](https://docs.celeryproject.org/en/stable/userguide/periodic-tasks.html) 사용.  
기본적으로 UTC를 사용하나 앱에 `timezone = 'Asia/Seoul'` 를 설정하거나 `app.conf.timezone = 'Asia/Seoul'` 을 설정하거나 설정파일의 `app.config_from_object`로 타임존 불러서 사요 ㅇ가능

## 연관 서비스

- [[celery beat]]

