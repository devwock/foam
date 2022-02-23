---
title: 리포지토리 분리
summary: 한 리포지토리를 하위 리포지토리로 분리
categories:
    - 
tags:
    - scm
    - git
link: 
publish: true
---

# Split Respository

git에서 하위 경로를 다른 리포지토리로 분산하는 방법은 `subtree`와 `submodule`이 있다.

## submodule

`submodule`은 마치 윈도의 단축아이콘이나 리눅스의 심볼릭 링크처럼 작동한다. 즉, 부모 리포지토리에서는 자식의 링크만 가지고 있고, 파일 자체는 자식 리포지토리에서 관리한다.

### submodule 장점

- 부모 리포지토리를 작은 사이즈로 유지할 수 있다.
- 커밋 ID가 고정되기 때문에 자식 리포지토리의 버전을 고정할 수 있다.

### submodule 단점

- 부모 리포지토리에서 파일을 수정하였을 경우 무조건 최신 커밋이 자식 리포지토리에 적용된다.
  - 따라서 부모 리포지토리에서는 자식 리포지토리를 되도록 수정하지 말아야한다. 버전이 어떻게 꼬일지 모르기 때문
- 상기 이유로 submodule을 사용한 디렉토리를 명확하게 인지해야한다.
  - 이는 `.gitmodules` 파일에 명시가 되어 있고, 에디터에서 지원하기도 하지만 혼동하기 쉽다.
- 서브모듈 파일들은 `git log`등 히스토리 관리가 작동하지 않는다.

### submodule 예시

#### submodule 추가

> `git submodule add <git 주소> <디렉토리 이름(옵션)>`

```shell
git submodule add https://github.com/devwock/foam foam
```

#### submodule clone

clone시 submodule의 디렉토리는 비어있기 때문에 명시적으로 submodule을 받아야한다.

```shell
git submodule init
git submodule update
```

clone시 한번에 초기화할 수도 있다.

```shell
git clone --recurse-submodules https://github.com/devwock/devwock.github.io
```

## subtree

subtree는 리눅스의 하드링크처럼 작동한다. 즉, 부모 리포지토리에는 자식의 전체 커밋과 파일을 가진다.

### subtree 장점

- 부모 리포지토리에서 자식 리포지토리의 커밋 히스토리를 전부 가진다.
  - 따라서 `git log`등 히스토리 관리가 동작한다.
- 부모 리포지토리에서 자식 리포지토리 코드를 마음대로 수정할 수 있다. 이 경우 자식 리포지토리에 커밋된다.
- 부모 리포지토리에서 자식 관리하기가 쉽다. branch별로 따로 관리할 수도 있고, 분리나 병합도 쉽게 가능하다.

### subtree 단점

- 자식 리포지토리가 직접 수정되었을 경우 부모 리포지토리에서 `git subtree pull`을 해줘야한다.
- 부모 리포지토리 사이즈가 커진다. 파일로만 따지면 복사한 것과 다름 없기 때문.

### subtree 예시

#### subtree 추가

> `git subtree add --prefix <디렉토리 이름> <git 주소> <branch 이름>`

```shell
git subtree add --prefix foam https://github.com/devwock/foam.git main
```

혹은 remote에 추가하여 alias로 사용해도 된다.

```shell
git remote add foam https://github.com/devwock/foam.git
git remote -v
git subtree add --prefix foam foam main
```

#### subtree pull

> `git subtree pull --prefix <디렉토리 이름> <git 주소> <branch 이름>` 

```shell
git subtree pull --prefix foam foam main
```

역시 remote의 alias가 가능하다.

## 참조

- [git 공식 가이드 submodule](https://git-scm.com/book/ko/v2/Git-도구-서브모듈)
- [Atlassian git submodule](https://www.atlassian.com/git/tutorials/git-submodule)
- [Atlassian git subtree](https://www.atlassian.com/git/tutorials/git-subtree)
- [Git subtree를 활용한 코드 공유](https://blog.rhostem.com/posts/2020-01-03-code-sharing-with-git-subtree)
