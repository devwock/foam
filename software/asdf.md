---
title: ASDF 설정
summary: ASDF 및 direnv 설정법
categories:
    - 
tags:
    - software
    - 개발환경
link: 
publish: true
---

# ASDF

asdf는 통합 개발 환경 버전 관리자이다. 내부에서는 각 언어별 버전 관리 매니저를 사용하기 때문에 비교적 안정적이다.

## asdf 설치

```shell
brew install asdf
```

### direnv

`direnv`는 해당 폴더에 진입했을 때 버전 관리 설정을 자동으로 해주는 프로그램이다.

#### direnv 설치

```shell
asdf plugin-add direnv
asdf install direnv latest
asdf global direnv latest
```

#### `.zshrc`에 다음 항목 추가

```shell
. /usr/local/opt/asdf/asdf.sh
eval "$(direnv hook zsh)"
direnv() { asdf exec direnv "$@"; }
```

#### `~/.config/direnv/direnvrc` 파일 생성

```shell
# File: ~/.config/direnv/direnvrc
source "$(asdf direnv hook asdf)"

# Uncomment the following line to make direnv silent by default.
# export DIRENV_LOG_FORMAT=""
```

### 파이썬

#### 파이썬 플러그인 설치

```shell
asdf plugin-add python
asdf install python 3.8.10
asdf global python 3.8.10
```

#### 프로젝트 파이썬 .envrc 설정

만일 파이썬을 글로벌하게 셋팅하지 않았으면 다음 명령어 사용

```shell
asdf direnv local python 3.8.15
```

```shell
use asdf
layout python
```

### nodejs

#### nodejs 플러그인 설치

```shell
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs 16.13.2
asdf global nodejs 16.13.2
```

#### 프로젝트 nodejs .envrc 설정

```shell
use asdf
layout node
```

### 해당 프로젝트에서 direnv 실행

`.envrc` 설정 후 해당 폴더에 진입, 다음 명령어를 실행해 주어야 환경이 구축된다.

```shell
direnv allow
```
