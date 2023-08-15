---
title: Certbot
tags:
    - server
publish: true
---

# Certbot

Let's Encrypt는 공익을 위해 Internet Security Research Group (ISRG)에서 제공하는 무료 자동화 인증서 발급 서비스이다.

certbot은 Electronic Frontier Foundation (EFF)가 만든, 자동으로 Let's Encrypt 인증서를 발급받을 수 있는 무료, 오픈소스 소프트웨어 도구이다.


## AWS

AWS Route53을 이용하여 Let's Encrypt 인증서 발급

### Route54 Rule 설정

```javascript
{
    "Version": "2012-10-17",
    "Id": "certbot-dns-route53 sample policy",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "route53:ListHostedZones",
                "route53:GetChange"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect" : "Allow",
            "Action" : [
                "route53:ChangeResourceRecordSets"
            ],
            "Resource" : [
                "arn:aws:route53:::hostedzone/YOURHOSTEDZONEID"
            ]
        }
    ]
}
```

### .aws 설정

`/root/.aws` 폴더를 생성하여 다음 파일을 생성한다.

`config`

```shell
[default]
region=ap-northeast-2
output=json
```

`credentials`

```shell
[default]
aws_access_key_id=<AWS 계정 KEY ID>
aws_secret_access_key=<AWS 계정 SECRET ACCESS KEY>
```

### 관련 프로그램 설치

```shell
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo snap install certbot-dns-route53
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo snap set certbot trust-plugin-with-root=ok
```

### 인증서 발급

```shell
sudo certbot certonly --dns-route53 -d <DOMAIN>
```

### 인증서 갱신

```shell
crontab -e
0 0 * * * /usr/bin/certbot renew --dns-route53
```

## Docker

Docker를 이용한 인증서 발급 및 갱신

- 클라우드 혹은 라우터 등등을 사용한다면 반드시 TCP 80 포트를 열어줘야 한다.
- Google Domains는 DNS Challenge를 이용한 와일드카드 인증서 API를 제공하지 않음.
  - <https://community.letsencrypt.org/t/google-domains-dns-api-support-not-google-cloud-dns/55480/7>
  - <https://community.letsencrypt.org/t/setting-up-wildcard-certs-with-google-domains/106555/2>

### 디렉토리 생성

Certbot 도커에서 사용할 디렉토리를 만들고 도커에서 사용하도록 그룹권한을 준다.

```shell
mkdir <인증서 저장 폴더>
chown <계정이름>:docker <인증서 저장 폴더>
```

### 발급

```shell
docker run -it --rm --name certbot \
            -v '<인증서 저장 폴더 경로>:/var/lib/letsencrypt' \
            -p 80:80 \
            certbot/certbot certonly \
            --standalone \
            --agree-tos \
            --no-eff-email \
            --email '<Your Email Here>' \
            -d '<Your Domain Here>'
```

별도 웹서버를 사용하지 않았기 때문에 스탠드얼론 모드로 돌린다. 만일 웹서버를 사용하고 있다면 웹루트와 도커 폴더를 연결하고 [--webroot 옵션](https://certbot.eff.org/docs/using.html#webroot)을 사용한다.

도커에서 80 포트를 사용하기 위해 권한이 root로 올라간다. 따라서 config 폴더 내부 생성 파일들이 줄줄이 `root:root`로 생성되게 되는데, 이후 `chown -R <계정이름>:docker ./<인증서 저장 폴더>` 로 일괄 변경해줘도 된다.

발급 후에는 `<인증서 저장 폴더>/live/<도메인>/`에 인증서가 생성된다.

### 갱신

Let's Encrypt의 인증서는 3달 후 만료되며, 20일 전부터 갱신할 수 있다.

갱신은 다음 명령어를 입력한다. 주기적으로 실행해야 하니 `.sh` 파일로 만들어서 `crontab`으로 돌리는 것을 권장

```shell
docker run -it --rm --name certbot \
            -v '<인증서 저장 폴더 경로>:/var/lib/letsencrypt' \
            -p 80:80 \
            certbot/certbot renew
```

이후 이 스크립트를 `crontab -e` 명령어로 crontab에 등록한다.

```shell
# 매 15일마다 renew 스크립트 실행
0 0 */15 * * <renew 스크립트 경로>
```

## 참조 링크

- [certbot 도커 허브](https://hub.docker.com/r/certbot/certbot/)
- [certbot 실행 문서](https://certbot.eff.org/docs/using.html)
