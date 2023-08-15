---
title: Code Server
tags:
    - software
link: https://github.com/cdr/code-server/
publish: true
---

# Code Server

## 개요

[Code Server](https://github.com/cdr/code-server/)는 Visual Studio Code를 웹으로 돌릴 수 있게 해주는 오픈소스 프로젝트이다.

다만 몇가지 제약이 있는데. (1.4 기준)

- iOS 사파리에서 한글 입력 버그 -> VSCode 문제로, [수정됨](https://github.com/coder/code-server/issues/1314)
- iOS에서 단축키 제약으로 단축키를 제대로 쓸 수 없음
- 파일 조회 권한이 code-server를 실행한 계정에 종속됨
  - 도커로 실행할 경우 root 권한이 된다. 로컬 폴더 볼륨 매핑할 경우 아주 위험할 수 있음.
- MS 공식 익스텐션등은 마켓에서 검색이 안되고 직접 설치해야함
- 잔버그가 많음 (폴더 로드 한 후 브라우저 껐다 켜면 로딩때문에 쓸수가 없다던가)

실제로 셋팅해봤는데 생각보다 버그가 좀 있어서 실사용은 힘들지 싶었다.

[Visual Studio Code for the Web](https://vscode.dev/)이 나왔지만 확장과 기능이 크게 제한된다.

## 로컬 설치 (다운로드)

1.4 이전 버전 기준이므로 현재와 다를 수 있음.

### 다운로드

```bash
wget https://github.com/cdr/code-server/releases/download/1.1156-vsc1.33.1/code-server1.1156-vsc1.33.1-linux-x64.tar.gz
mkdir vscode
tar xzf code-server1.1156-vsc1.33.1-linux-x64.tar.gz
mv ./code-server1.1156-vsc1.33.1-linux-x64/* ./vscode/
rm -rf./code-server1.1156-vsc1.33.1-linux-x64
cd vscode
mkdir workspace
```

이 중 workspace는 익스텐션부터 이거저거 설정파일이 들어갈 폴더이다. 다른 곳에 만들어줘도 무방하다.

### 서비스 등록

시스템 시작시 서비스로 등록하여 쉘이 꺼져도 항상 동작하게 만든다.

`/etc/systemd/system/code.service`

``` bash
[Unit]
Description=Visual Studio Code on the server
After=network.target
[Service]
ExecStart=<vscode 경로>/code-server -H -d <workspace경로>
User=<서비스 실행할 사용자 권한>
Restart=always
RestartSec=1
Environment=PASSWORD=<접속할 때 쓸 비밀번호>
[Install]
WantedBy=multi-user.target
```

서비스를 생성했으면 다음 명령어로 시작 서비스로 등록한 후 서비스를 시작해준다.

``` bash
systemctl daemon-reload
systemctl start code
systemctl enable code
journalctl -u code
```

## 로컬 설치 (설치 스크립트)

```shell
curl -fsSL https://code-server.dev/install.sh | sh
```

## docker-compose

code-server docker image는 다음 두 종류가 있다.

- [codercom](https://hub.docker.com/r/codercom/code-server/): 공식 프로젝트 관리자 docker hub
- [linuxserver](https://hub.docker.com/r/linuxserver/code-server/): linuxserver.io docker hub

하단 예제에서는 linuxserver 예제를 사용

```yaml
version: "2.1"
services:
  code-server:
    image: lscr.io/linuxserver/code-server
    container_name: code-server
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Seoul
      - PASSWORD=password #optional
      - HASHED_PASSWORD= #optional
      - SUDO_PASSWORD=password #optional
      - SUDO_PASSWORD_HASH= #optional
      - PROXY_DOMAIN=code-server.my.domain #optional
      - DEFAULT_WORKSPACE=/config/workspace #optional
    volumes:
      - /path/to/appdata/config:/config
    ports:
      - 8443:8443
    restart: unless-stopped
```
