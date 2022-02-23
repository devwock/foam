---
title: nodeenv
summary: nodeenv 설정
categories:
    - 
tags:
    - language
    - nodejs
    - 개발환경
link: 
publish: true
---

# nodeenv

`nodeenv`는 [[pyenv]]처럼 `nodejs` 버전을 관리해주는 유틸리티이다.

파이썬의 `virtualenv`처럼 동작하기 때문에 반드시 파이썬이 설치되어 있어야 한다.

단, 사용해본 결과 [[asdf]] 사용을 추천한다.

## 설치

```zsh
pip install nodeenv
```

## 버전 확인

```zsh
nodeenv --version
```

## Node 버전 확인

```zsh
nodeenv --list
```

## Node 설치

```zsh
nodeenv <경로> --node=16.13.0 --npm=8.1.0
```

## Activate

```zsh
source <경로>/bin/activate
```

## deactivate

```zsh
deactivate
```

## 링크

[깃허브](https://github.com/ekalinin/nodeenv)

[//begin]: # "Autogenerated link references for markdown compatibility"
[pyenv]: ../python/pyenv.md "pyenv"
[asdf]: ../../software/asdf.md "ASDF 설정"
[//end]: # "Autogenerated link references"