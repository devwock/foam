---
title: Traefik
tags:
    - server
publish: true
---

# Traefik

## 개요

`Traefik`은 과거에는 리버스 프록싱을 해주는 서비스를 의미했지만, 현재는 `traefiklabs`에서 여러 제품을 내놓았기 때문에 의미가 조금 달라졌다. 본문에서는 `Traefik proxy`만을 다룬다.

Traefik은 리버스 프록싱을 해주는 서비스이다. 리버스 프록싱이란 특정 엔트리 포인트에 요청이 들어오면 내부 특정 서버로 전달해주는 역할을 한다.  
이는 아파치 웹 서버나 NGINX로도 할 수 있지만, Traefik은 다음과 같은 장점이 있다.

- 도커별 리버스 프록싱 자동 등록 (재시작 하지 않아도 됨)
- 다양한 로드 밸런싱 알고리즘 지원
- Let's Encrypt 인증서 자동 등록
- (아직 미숙한) Dashboard
- 다양한 메트릭 지원
- Golang 싱글 바이너리

속도면에서는 [traefik 1.4에서 nginX와 비교 벤치마크하여 85%의 성능을 낸다고 공개한 적이 있다.](https://doc.traefik.io/traefik/v1.4/benchmarks/)

## Traefik 자체 설정

생각보다 매뉴얼이 직관적이지 않아 설정하는데 많이 헤맸다. 설정 파일은 `yaml`과 `toml` 중 선택할 수 있는데, 여기서는 toml로 진행한다.

`traefik.toml`

```toml
[global]
  # 새 버전 체크 여부
  checkNewVersion = true

[entryPoints]
  [entryPoints.web]
    address = ":80"
    [entryPoints.web.http.redirections.entryPoint]
      # 80으로 들어오면 443으로 리다이렉트
      to = "websecure"
      scheme = "https"
      permanent = true
  [entryPoints.websecure]
    address = ":443"
  [entryPoints.websecure.http.tls]
    # tls 리졸버 지정. 하단 certificatesResolvers.<이름>을 그대로 사용
    certResolver = "myresolver"

[log]
  # 로그 레벨 지정
  level = "DEBUG"
[accessLog]

[api]
  # 대시 보드 사용 여부 설정
  dashboard = true

[providers]
  [providers.docker]  
    # 도커 소켓과 네트워크를 지정, 새로 서비스가 올라오면 자동 감지
    endpoint = "unix:///var/run/docker.sock"
    exposedbydefault = false
    network = "traefik"
    #swarmMode = true

  #[providers.file]
    # Dynamic configuration을 사용하려면 다음 부분 설정
    # https://doc.traefik.io/traefik/providers/file/
    #directory = "/etc/traefik/dynamic"
    #filename = "/etc/dynamic/dashboard.toml"
    #watch = true

[certificatesResolvers]
# tlsChallenge로 인증서 발급, acme.json에 저장
# https://doc.traefik.io/traefik/https/acme/#tlschallenge
  [certificatesResolvers.myresolver.acme]
    email = "<EMAIL HERE>"
    storage = "acme.json"

  [certificatesResolvers.myresolver.acme.tlsChallenge]
```

`tlsChallenge`를 하는 이유는, `dnsChallenge`의 경우 Google domains 등 지원하지 않는 도메인 업체의 경우 (Google cloud DNS는 또 지원한다) 갱신을 매번 수동으로 해줘야하고, `httpChallenge`의 경우 80포트가 열려있어야 한다. 만일 제공하는 업체가 `dnsChallenge`를 지원할 경우 사용하면 훨씬 편하다.

`docker-compose.yml`

```yaml
version: '3.3'
  
services:
  traefik:
    image: traefik:latest
    container_name: traefik
    # toml 설정 사용 지정
    command: --configFile=/traefik.toml
    restart: unless-stopped
    logging:
      options:
        # 로그가 많이 쌓이기 때문에 사이즈를 지정
        max-size: 1m
    networks:
      - traefik
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # 도커 소켓을 반드시 연결해준다.
      - /var/run/docker.sock:/var/run/docker.sock
      # 상기 toml 파일 연결
      - /home/swarm/traefik/traefik.toml:/traefik.toml
      # Let's encrypt 인증서 연결
      - /home/swarm/traefik/acme.json:/acme.json
    labels:
      # labels가 제대로 지정되지 않으면 동작하지 않음
      - "traefik.enable=true"
      # traefik 자체 API와 대시보드 엔트리포인트 등록
      - "traefik.http.routers.api.rule=Host(`<DOMAIN>`) && (PathPrefix(`/api`) || PathPrefix(`/dashboard`))"
      # traefik API 설정
      - "traefik.http.routers.api.service=api@internal"
      - "traefik.http.routers.api.entrypoints=websecure"
      - "traefik.http.routers.api.middlewares=auth"
      # trailing slash를 강제 하지 않을 때 다음 항목을 설정
      - "traefik.http.middlewares.example.stripprefix.forceSlash=false"
      # 기본 Auth 지정 https://doc.traefik.io/traefik/v2.0/middlewares/basicauth/
      # 다음 명령어로 비밀번호를 구할 수 있음 cho $(htpasswd -nb user password) | sed -e s/\\$/\\$\\$/g
      - "traefik.http.middlewares.auth.basicauth.users=<USERNAME>:<PASSWORD>"

networks:
  traefik:
    external: true
```

## 다른 docker-compose들 설정

다른 도커 서비스가 올라올 때 traefik을 사용하려면 `labels`에 traefik 설정을 넣어줘야 한다.

`docker-compose.yml`

```yaml
version: "3.3"
services:
  vscode:
    image: <IMAGE NAME>
    expose:
      - <PORT NUMBER>
    networks:
      # traefik과 같은 네트워크를 지정해 주어야 한다
      - traefik
    labels:
      # traefik 사용 플래그
      - "traefik.enable=true"
      # PathPrefix에 trailing slash는 설정 시 제거해줘야한다.
      - "traefik.http.routers.<SERVICE NAME>.rule=Host(`<DOMAIN>`) && PathPrefix(`/<PATH>`)"
      # 상기 PathPrefix의 하위 패스를 전부 리다이렉션 하려면 다음 설정을 사용한다
      # 예: google.com/search 와 google.com/search/test를 모두 이 docker에서 받음
      # https://doc.traefik.io/traefik/middlewares/http/stripprefix/
      - "traefik.http.routers.<SERVICE NAME>.middlewares=<STRIP PREFIX NAME>"
      - "traefik.http.middlewares.<STRIP PREFIX NAME>.stripprefix.prefixes=/<PATH>"
      - "traefik.http.routers.<SERVICE NAME>.entrypoints=websecure"
      # trailing slash를 강제 하지 않을 때 다음 항목을 설정
      - "traefik.http.middlewares.example.stripprefix.forceSlash=false"
      # 다중 포트를 사용하거나 포트를 공개하지 않을 경우 traefik 통신을 위한 포트 지정
      # https://doc.traefik.io/traefik/providers/docker/#port-detection
      #- "traefik.http.services.<SERVICE NAME>.loadbalancer.server.port=8443"

networks:
  traefik:
    external: true
```

상기와 같이 설정하면 해당 docker-compose가 올라오면 traefik에서 자동 감지하여 리버스 프록싱을 시작한다. Dashboard가 켜져있는 경우 대시보드에서 리버스 프록싱 상태를 확인할수도 있다.

## 트러블 슈팅

### 리버스 프록싱 페이지가 404 page not found가 뜰 때

- trailing slash를 확인한다(test.com/test`/`). 슬래시가 없으면 traefik에서 페이지를 못찾는다.
- `traefik.http.middlewares.example.stripprefix.forceSlash=false` 설정으로 trailing slash를 제거할 수 있다.
