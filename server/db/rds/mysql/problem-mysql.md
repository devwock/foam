---
title: MySQL 사용 시 문제점
summary: 
categories:
    - 
tags:
    - mysql
publish: true
---
# MySQL 사용 시 문제점

## MySQL이 급격하게 느려져서 확인해보니 쿼리 행이 계속 걸림

```SQL
SHOW FULL PROCESSLIST;
```

로 확인해봐도 별다른 특별한점이 발견되지 않음

<https://www.popit.kr/mysql-lock-상황-문제-해결/>

`INNODB_LOCKS`, `INNODB_LOCK_WAITS`, `INNODB_TRX` 확인하여 `DBeaver`에서 `COMMIT`이 안될 경우 LOCK됨을 확인, 처리
