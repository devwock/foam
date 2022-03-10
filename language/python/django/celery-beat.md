---
title: Celery Beat 사용
summary: 
categories:
    - 
tags:
    - django
    - celery
link: 
publish: true
---

# Celery Beat

장고에서 주기적 작업을 실행할 수 있는 스케쥴러

<https://docs.celeryproject.org/en/stable/userguide/periodic-tasks.html>

## 사용법

### 설정에 셋팅하는 법

장고 설정에 다음 항목 삽입

```python
CELERY_BEAT_SCHEDULE = { ... }
```

### 별도 파일에 설정

`project/project/celery.py`

```python
app.conf.beat_schedule = { ... }
```

### 설정값

- `timedelta` 혹은 `crontab`을 사용
- solar time도 가능하다.

#### `timedelta`를 쓰는 경우

```python
app.conf.beat_schedule = {
    'test-schedule': {
        'task': 'demoapp.tasks.add',
        'schedule': timedelta(seconds=10),
        'args': (4, 4)
    }
}
```

#### `cron`을 쓰는 경우

```python
app.conf.beat_schedule =  {
    'test-schedule': {
        'task': 'demoapp.tasks.add',
        'schedule': crontab(minute='*/1'),
        'args': ()
    },
}
```

#### periodic_task decorator을 쓰는 경우

`periodic_task decorator` 사용 가능. 하지만 문서가 과거 버전만 있고 최신 버전에 없음. 동작은 함

`project/app/tasks.py`

```python
@periodic_task(run_every=timedelta(seconds=30))
def test():
    print('this is decorator')
```

## 실행법

```bash
celery beat -A <project> -l <log level>
```

## 출력 확인

print를 하더라도 `celery-beat`는 단지 스케쥴러만 관리하기 때문에 메세지를 소비할 worker를 띄워야 결과를 볼 수 있다.

```bash
celery -A <project> worker -l info
```

## 에러처리

셀러리 비트를 강제로 종료하면 스케쥴러 파일이 남아 다음에 실행 시 에러가 발생한다.

이 경우 프로젝트 메인에 있는 `celerybeat-schedule` 파일을 삭제하면 된다.
