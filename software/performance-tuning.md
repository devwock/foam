---
title: 서버 부하 개선 방법
summary: 
categories:
    - 
tags:
    - server
link: 
publish: true
---

# Performance Tuning

성능 측정 및 서버 부하 개선 방법 정리

TODO: 각 개선 방법 상세하게 문서 써야함

## 측정

- JMeter, Locust, LoadRunner 등으로 성능 측정

## Django

- wsgi 갯수 설정 시 장고 프로세스, 스레드 갯수 설정. 단, 스레드 갯수는 거의 의미가 없음 (파이썬 GIL 때문)
- query optimizer 패키지 사용

## DB

- 성능 측정 결과 부하 집중되는 SQL 추출하여 DB 쿼리 익스플레인
- Full Scan 확인하여 쿼리 변경
- DB Connector 갯수 설정, Resolution 설정. 너무 많거나 너무 적으면 오히려 성능이 저하됨
- 트랜잭션이 필요 없는 MySQL 테이블을 MyISAM으로 변경
- 모델의 관계성 파악하여 Index 설정

## OS

- top으로 확인하여 load average > 1 인 프로세스를 찾아 분리할지 결정
- tcp 커넥션 close time 줄임

## Docker

- nginx 도커 인스턴스 분리
- 로드 밸런서 설정 후 인스턴스를 다중으로 띄움 (ECS 등)

## 검증

- nginx 리스폰스 타임을 로깅 옵션에 넣어 모니터링
- Grafana + Loki 로 성능 측정
- Datadog로 성능 측정
