---
title: Certbot Docker 이미지로 Let's Encrypt 인증서 발급
summary: 
categories:
    - 
tags:
    - server
    - docker
    - ssl
link: 
publish: true
---

# Certbot Docker

## 개요

이 포스팅에서는 certbot 도커 이미지만을 이용하여 (기타 예제에서의 NginX 도커 이미지를 사용하지 않음) standalone 모드로 SSL 인증서를 발급받는다.

DNS 인증을 이용한 와일드카드 인증서 발급은 이 포스팅에서 다루지 않는다.

TODO: docker-compose 사용으로 변경

### 왜 Docker 이미지로 발급받으려 하는가

이것저것 apt-get으로 깔기 싫었기 때문

### 왜 DNS 인증으로 와일드카드 인증서를 발급받지 않는가

Google domains가 와일드카드 인증서 자동 발급을 위한 관련 API를 제공하지 않았기 떄문

- <https://community.letsencrypt.org/t/google-domains-dns-api-support-not-google-cloud-dns/55480/7>
- <https://community.letsencrypt.org/t/setting-up-wildcard-certs-with-google-domains/106555/2>

여타 구글 도메인을 이용한 와일드카드 인증서 발급은 전부 구글 클라우드 DNS를 이용한 발급이다. 풍부한 API를 제공해준다고.

## 기술 개요

### Let's Encrypt

Let's Encrypt는 공익을 위해 Internet Security Research Group (ISRG)에서 제공하는 무료 자동화 인증서 발급 서비스이다.

### certbot

certbot은 Electronic Frontier Foundation (EFF)가 만든, 자동으로 Let's Encrypt 인증서를 발급받을 수 있는 무료, 오픈소스 소프트웨어 도구이다.

## 방법

### 클라우드 방화벽 열기

클라우드 혹은 라우터 등등을 사용한다면 반드시 TCP 80 포트를 열어줘야 한다.

### 디렉토리 지정

Certbot 도커에서 사용할 디렉토리를 만들고 도커에서 사용하도록 그룹권한을 준다.

```shell
mkdir work
chown <계정이름>:docker work

mkdir config
chown <계정이름>:docker config
```

### 발급

```shell
docker run -it --rm --name certbot \
            -v '<Host Config Directory>:/etc/letsencrypt' \
            -v '<Host Working Directory>:/var/lib/letsencrypt' \
            -p 80:80 \
            certbot/certbot certonly \
            --standalone \
            --agree-tos \
            --no-eff-email \
            --email '<Your Email Here>' \
            -d '<Your Domain Here>'
```

별도 웹서버를 사용하지 않았기 때문에 스탠드얼론 모드로 돌린다. 만일 웹서버를 사용하고 있다면 웹루트와 도커 폴더를 연결하고 [--webroot 옵션](https://certbot.eff.org/docs/using.html#webroot)을 사용한다.

도커에서 80 포트를 사용하기 위해 권한이 root로 올라간다. 따라서 config 폴더 내부 생성 파일들이 줄줄이 `root:root`로 생성되게 되는데, 이후 `chown -R <계정이름>:docker ./config` 로 일괄 변경해줘도 된다.

발급 후에는 `config/archive/<도메인>/`에 인증서가 생성된다.

### 갱신

Let's Encrypt의 인증서는 3달 후 만료되며, 20일 전부터 갱신할 수 있다.

갱신은 다음 명령어를 입력한다. 주기적으로 실행해야 하니 `.sh` 파일로 만들어서 `crontab`으로 돌리는 것을 권장

```shell
docker run -it --rm --name certbot \
            -v '<Host Config Directory>:/etc/letsencrypt' \
            -v '<Host Working Directory>:/var/lib/letsencrypt' \
            -p 80:80 \
            certbot/certbot renew
```

이후 이 스크립트를 `crontab -e` 명령어로 crontab에 등록한다.

```bash
# 매 15일마다 renew 스크립트 실행
0 0 */15 * * <renew 스크립트 경로>
```

## 참조 링크

- [certbot 도커 허브](https://hub.docker.com/r/certbot/certbot/)
- [certbot 실행 문서](https://certbot.eff.org/docs/using.html)
