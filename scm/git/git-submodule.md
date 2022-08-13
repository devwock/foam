---
title: Git Submodule
summary: 
categories:
    - 
tags:
    - git
publish: true
---
# Git Submodule

git에서 하위 경로를 다른 리포지토리로 분산하는 방법 중 `submodule`에 대해 설명한다.

`submodule`은 마치 윈도의 단축아이콘이나 리눅스의 심볼릭 링크처럼 작동한다. 즉, 부모 리포지토리에서는 자식의 링크만 가지고 있고, 파일 자체는 자식 리포지토리에서 관리한다.

## 장점

- 부모 리포지토리를 작은 사이즈로 유지할 수 있다.
- 커밋 ID가 고정되기 때문에 자식 리포지토리의 버전을 고정할 수 있다.

## 단점

- 부모 리포지토리에서 파일을 수정하였을 경우 무조건 최신 커밋이 자식 리포지토리에 적용된다.
  - 따라서 부모 리포지토리에서는 자식 리포지토리를 되도록 수정하지 말아야한다. 버전이 어떻게 꼬일지 모르기 때문
- 상기 이유로 submodule을 사용한 디렉토리를 명확하게 인지해야한다.
  - 이는 `.gitmodules` 파일에 명시가 되어 있고, 에디터에서 지원하기도 하지만 혼동하기 쉽다.
- 서브모듈 파일들은 `git log`등 히스토리 관리가 작동하지 않는다.

## 예시

### 추가

> `git submodule add <git 주소> <디렉토리 이름(옵션)>`

```shell
git submodule add https://github.com/devwock/foam foam
```

### clone

clone시 submodule의 디렉토리는 비어있기 때문에 명시적으로 submodule을 받아야한다.

```shell
git submodule init
git submodule update
```

clone시 한번에 초기화할 수도 있다.

```shell
git clone --recurse-submodules https://github.com/devwock/devwock.github.io
```

## 참조

- [git 공식 가이드 submodule](https://git-scm.com/book/ko/v2/Git-도구-서브모듈)
- [Atlassian git submodule](https://www.atlassian.com/git/tutorials/git-submodule)
