---
title: RabbitMQ
summary: 
categories:
    - 
tags:
    - server
    - rabbitmq
link: 
publish: true
---

# RabbitMQ

## 설치

RabbitMQ를 설치하고 서비스로 실행한다.

```bash
brew install rabbitmq
brew services start rabbitmq
```

## 사용자 추가

관리자를 추가한다.

```bash
/usr/local/sbin/rabbitmqctl add_user admin <비밀번호>
/usr/local/sbin/rabbitmqctl set_user_tags admin administrator
```

아이디/비밀번호가 test인 사용자를 생성한다.

```bash
/usr/local/sbin/rabbitmqctl add_user test test
```

## vHost 지정

RabbitMQ의 가상 호스트를 생성하고 test 계정에 권한을 부여한다.

```bash
/usr/local/sbin/rabbitmqctl add_vhost test_host
/usr/local/sbin/rabbitmqctl set_permissions -p test_host test ".*" ".*" ".*"
```

## vHost 삭제

```bash
/usr/local/sbin/rabbitmqctl delete_vhost test
```
