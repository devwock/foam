---
title: Git Subtree
summary: 
categories:
    - 
tags:
    - git
publish: true
---
# Git Subtree

git에서 하위 경로를 다른 리포지토리로 분산하는 방법 중 `subtree`에 대해 설명한다.

subtree는 리눅스의 하드링크처럼 작동한다. 즉, 부모 리포지토리에는 자식의 전체 커밋과 파일을 가진다.

## 장점

- 부모 리포지토리에서 자식 리포지토리의 커밋 히스토리를 전부 가진다.
  - 따라서 `git log`등 히스토리 관리가 동작한다.
- 부모 리포지토리에서 자식 리포지토리 코드를 마음대로 수정할 수 있다. 이 경우 자식 리포지토리에 커밋된다.
- 부모 리포지토리에서 자식 관리하기가 쉽다. branch별로 따로 관리할 수도 있고, 분리나 병합도 쉽게 가능하다.

## 단점

- 자식 리포지토리가 직접 수정되었을 경우 부모 리포지토리에서 `git subtree pull`을 해줘야한다.
- 부모 리포지토리 사이즈가 커진다. 파일로만 따지면 복사한 것과 다름 없기 때문.

## 예시

### 추가

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

### pull

> `git subtree pull --prefix <디렉토리 이름> <git 주소> <branch 이름>`

```shell
git subtree pull --prefix foam foam main
```

역시 remote의 alias가 가능하다.

## 참조

- [Atlassian git subtree](https://www.atlassian.com/git/tutorials/git-subtree)
- [Git subtree를 활용한 코드 공유](https://blog.rhostem.com/posts/2020-01-03-code-sharing-with-git-subtree)
