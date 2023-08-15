---
title: asdf
tags:
    - 프로그램
    - 개발환경
links:
    - https://asdf-vm.com/
publish: true
---

# asdf

[asdf](https://asdf-vm.com/)는 통합 개발 환경 버전 관리자이다. 내부에서는 각 언어별 버전 관리 매니저를 사용하기 때문에 비교적 안정적이다.

## 설치

```shell
brew install asdf
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
```

### [direnv](https://github.com/asdf-community/asdf-direnv)

[direnv](https://github.com/asdf-community/asdf-direnv)는 해당 폴더에 진입했을 때 버전 관리 설정을 자동으로 해주는 프로그램으로 별도 응용 프로그램으로 존재하나 `asdf-direnv` 프로젝트로 asdf의 플러그인으로 설치할 수 있다.

#### direnv 설치

```shell
asdf plugin-add direnv
asdf direnv setup --shell zsh --version latest
```

### 파이썬

#### 파이썬 플러그인 설치

```shell
asdf plugin-add python
asdf list all python
asdf install python 3.10.10
```

#### 파이썬 버전 설정

```shell
asdf direnv local python 3.10.10
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
