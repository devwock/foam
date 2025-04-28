---
title: Grafana
tags:
    - server
publish: false
---

# Grafana

## 환경 변수에 따른 data source 선택

- 데이터 소스 이름을 특정 구분자를 넣어 작성한다. (예: `DATABASE | PROD`)
- 대시보드에서 variables에서 커스텀 레이블을 작성한다. (예: `name`: `environment`, `value`: `운영 : PROD, 스테이징 : STAGING, 개발 : DEV`)
- 대시보드에서 variables에서 `variable type`을 `Data source`로, `Instance name filter`를 다음과 같이 정규식으로 작성한다. (예: `DATABASE \| /^$environment/`)
