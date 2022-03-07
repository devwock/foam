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

## 개요

로컬 컴퓨터에서 MySQL 서비스를 네이티브로 두 개 띄울 수 없으므로

- Native(MASTER) ↔ Docker(SLAVE) 혹은
- Docker(MASTER) ↔ Docker(SLAVE) 구성으로 띄워야 한다.

하지만 Native(MASTER) ↔ Docker(SLAVE) 구성에서 도커가 호스트 네트워크에 붙어야하는데, 호스트 네트워크 모드에서는 [포트 설정이 되지 않기 때문에](https://docs.docker.com/compose/compose-file/compose-file-v3/#ports) 네이티브 포트를 바꾸고 도커로 띄우거나, 둘 다 도커로 띄워야 로컬에서 테스트 가능하다.

이 예제에서는 모두 도커로 구성한다.

## docker-compose

다음 `docker-compose.yml` 생성

```yaml
version: '3.7'
services:
  mysql-master:
    image: mysql:latest
    container_name: mysql-master
    ports:
      - 3306:3306
    command:
      --default-authentication-plugin=mysql_native_password
      --server-id=10
      --log-bin=mysql-bin
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: <ROOT 비밀번호>
    volumes:
      - my-db-master:/var/lib/mysql
      - my-db-master:/var/lib/mysql-files
    networks:
      - net-mysql

  mysql-slave:
    image: mysql:latest
    container_name: mysql-slave
    ports:
      - 65206:3306
    command:
      --default-authentication-plugin=mysql_native_password
      --server-id=11
      --log-bin=mysql-bin
      --log-slave-updates=ON
      --read-only=ON
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: <ROOT 비밀번호>
    volumes:
      - my-db-slave:/var/lib/mysql
      - my-db-slave:/var/lib/mysql-files
    networks:
      - net-mysql

volumes:
  my-db-master:
  my-db-slave:

networks:
  net-mysql:
    driver: bridge
```

## server_id 확인

도커 구동 후 master와 slave에서 다음 설정을 확인한다.

```sql
SELECT @@server_id
```

| 구분 | @@server_id |
| :-- | --: |
| 마스터 | 10 |
| 슬레이브 | 11 |

두 값은 반드시 달라야한다.

## 리플리케이션 사용자 생성

마스터에 SQL 클라이언트로 접속하여 다음 명령어로 리플리케이션용 계정을 생성한다.

```sql
CREATE USER 'repluser'@'%' IDENTIFIED BY 'replpw';
GRANT REPLICATION SLAVE ON *.* TO 'repluser'@'%';
FLUSH PRIVILEGES;
```

생성 후 유저 확인

```sql
USE mysql;
SELECT user, host FROM user;
```

| user | host |
| :-- | :-- |
| repluser | % |
| mysql.infoschema | localhost |
| mysql.session | localhost |
| mysql.sys | localhost |
| root | localhost |

비밀번호 변경 시 다음 명령을 사용한다.

```sql
ALTER user 'repluser'@'%' IDENTIFIED WITH mysql_native_password BY 'replpw';
FLUSH PRIVILEGES;
```

## 도커 네트워크 확인

리플리케이션 구성을 위해 도커 네트워크를 확인한다.

```shell
docker network ls
```

결과

```shell
NETWORK ID     NAME                         DRIVER    SCOPE
1a314aef3efe   mysql-replcation_default     bridge    local
78396336308d   mysql-replcation_net-mysql   bridge    local
```

이 중 `mysql-replcation_default`의 `NETWORK ID`를 확인한다.

```shell
docker inspect 78396336308d
```

```json
[
    {
        ...
        "Containers": {
            "c16c6b79139fca57d536949572c2d342a0a3b94b520716eb1a596dec67ef274f": {
                "Name": "mysql-master",
                "EndpointID": "4e3f409dd2bff93fdda3a96bc38176877b7df47653f1025156de33aff5034755",
                "MacAddress": "02:42:ac:1a:00:02",
                "IPv4Address": "172.26.0.2/16",
                "IPv6Address": ""
            },
            "d46e0ce8146f0021ac95618012fe99a5de59b6f9f9e483d34811a6aa57528713": {
                "Name": "mysql-slave",
                "EndpointID": "b7651c2c301d4ccbcd260b1ce3bed9048e1c9929c0c7d9e74df6d60ec364f23e",
                "MacAddress": "02:42:ac:1a:00:03",
                "IPv4Address": "172.26.0.3/16",
                "IPv6Address": ""
            }
        },
        ...
    }
]
```

마스터로 슬레이브가 붙는 구조이기 때문에 컨테이너 중 `mysql-master`의 `IPv4Address`를 확인한다.

## 데이터 밀어넣기

덤프한 데이터를 마스터와 슬레이브에 밀어넣는다. 리플리케이션을 설정하고 밀어넣으면 너무 오래걸리기 때문에 미리 둘 다 넣어둔다.

## Master bin log 확인

리플리케이션은 bin log 기준으로 동기화 되기 때문에 다음 명령어로 bin log와 시퀀스를 확인한다.

```sql
SHOW MASTER STATUS;
```

| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
| :-- | :-- | :-- | :-- | :-- |
| mysql-bin.000004 | 882 | - | - | - |

## Slave 설정

슬레이브 DB에서 다음 SQL로 리플리케이션을 설정한다.

여기서 MASTER_HOST는 위의 도커 네트워크에서 확인한 `mysql-master`의 `IPv4Address`를 넣는다.

```sql
CHANGE MASTER TO
    MASTER_HOST='172.26.0.2',
    MASTER_USER='repluser',
    MASTER_PASSWORD='replpw',
    MASTER_LOG_FILE='mysql-bin.000004',
    MASTER_LOG_POS=882,
    MASTER_PORT=3306
;
START SLAVE;
```

다음 명령어로 연결 상태를 확인한다.

```sql
SHOW SLAVE STATUS;
```

`Last_ID_Errno`와 `Last_IO_Error`가 없으면 성공한 것이다.

이후 마스터에 CRUD를 진행하여 동기화 되는지 확인한다.
