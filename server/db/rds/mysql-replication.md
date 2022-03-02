---
title: MySQL Replication
summary: MySQL Replication 설정
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

# MySQL Replication

MySQL 로컬 호스트 <-> Docker Slave 설정 정리

## Master

다음 설정 변경으로 마스터 ID 할당

`/usr/local/etc/my.cnf`

```shell
[mysqld]
...
server_id = 10
...
```

다음 명령어로 마스터 확인

```sql
SHOW MASTER STATUS;
```

| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
| :-- | :-- | :-- | :-- | :-- |
| binlog.000083 | 157 | - | - | - |

다음 명령어로 호스트 이름 확인

```sql
select @@hostname;
```

다음 명령어로 서버 아이디 확인

```sql
SELECT @@server_id
```

| @@hostname |
| :-- |
| `<HOST NAME>` |

리플리케이션 유저 생성

```sql
CREATE USER 'repluser'@'%' IDENTIFIED BY 'replpw';
GRANT REPLICATION SLAVE ON *.* TO 'repluser'@'%';
```

유저 확인

```sql
USE mysql;
SELECT user, host FROM user;
```

| user | host |
| repluser | % |
| mysql.infoschema | localhost |
| mysql.session | localhost |
| mysql.sys | localhost |
| root | localhost |

## Slave

다음 도커 파일로 MySQL 실행

```yaml
version: '3.7'
services:
  mysql:
    image: mysql:latest
    container_name: mysql
    ports:
      - <MAPPING PORT>:3306
    command: 
        --default-authentication-plugin=mysql_native_password
        --server-id=11
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: <PASSWORD>
```

도커 컨테이너 접속해서 Slave ID 할당

`/etc/mysql/my.cnf`

```shell
[mysqld]
...
server_id = 11
...
```

다음 명령어로 서버 아이디 확인

```sql
SELECT @@server_id
```

슬레이브 DB에서 다음 SQL로 리플리케이션 실행

```sql
CHANGE MASTER TO
    MASTER_HOST='localhost',
    MASTER_USER='repluser',
    MASTER_PASSWORD='replpw',
    MASTER_LOG_FILE='binlog.000083',
    MASTER_LOG_POS=157
;
START SLAVE;
```

다음 명령어로 상태 확인

```sql
SHOW SLAVE STATUS;
```

`Last_ID_Errno`와 `Last_IO_Error`가 없으면 성공
