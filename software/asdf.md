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
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
```

### direnv

`direnv`는 해당 폴더에 진입했을 때 버전 관리 설정을 자동으로 해주는 프로그램이다.

#### direnv 설치

```shell
asdf plugin-add direnv
asdf direnv setup --shell zsh --version latest
# direnv를 golbal에서 사용하도록 변경
# 아래 명령어가 없으면 No version is set for command direnv 오류 계속 발생함
asdf global direnv latest
```

### 파이썬

#### 파이썬 플러그인 설치

```shell
asdf plugin-add python
asdf install python 3.10.10
```

### 프로젝트 설정

프로젝트 폴더를 생성하여 내부로 이동한다.

#### 파이썬 버전 설정

```shell
asdf direnv local python 3.8.16
```

#### `.envrc` 편집

```shell
use asdf
# 아래 라인 추가하면 .direnv 디렉토리에 venv를 생성함
# 추가하지 않으면 .asdf에 설치된 파이썬을 돌려씀
layout python
```

#### 파이썬 환경 적용

```shell
direnv allow
```
