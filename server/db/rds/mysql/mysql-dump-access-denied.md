---
title: MySQL Dump 복원 시 Access Denied 오류 해결
summary: MySQL Dump 복원 시 Access Denied 오류 해결
categories:
    - 
tags:
    - server
    - db
    - rds
    - mysql
link: 
publish: true
---

# MySQL Dump Access Denied

AWS RDS MySQL에서 덤프 import 시 다음 에러가 발생한다.

```shell
ERROR 1227 (42000) at line 18: Access denied; you need (at least one of) the SUPER privilege(s) for this operation
```

해당 오류는 다음의 경우 발생한다.

## DEFINER가 설정되어 있을 때

```sql
CREATE DEFINER = root@localhost
```

definer는 특정 유저 소유로 해당 명령어 권한을 부여하기때문에 수퍼유저가 필요.

## 상단부/하단부에 다음 설정이 있을 때

```sql
SET @@SESSION.SQL_LOG_BIN= 0;
SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
```

이 부분은 특정 로그를 남기지 않는 등 역할을 하는데, 해당 구문이 들어있으면 수퍼유저를 요구하기 때문에 제거하면 된다.
