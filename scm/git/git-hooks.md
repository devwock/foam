---
title: Git Hooks
summary: Git Hooks 설정
categories:
    - 
tags:
    - scm
    - git
link: 
publish: true
---

# Git Hooks

`Git Hook`은 특정 이벤트가 발생했을 때 자동으로 특정 스크립트를 실행할 수 있게 해준다.

## Client Hook

### Pre Commit

`pre-commit`은 커밋 메세지 작성 전 호출된다. 만일 `exit` 코드가 `0`이 아니면 커밋이 취소된다.

#### 경로

```shell
<project>/.git/hooks/pre-commit
```

#### main 브랜치 커밋 막기

```shell
#!/bin/sh
branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" = "main" ]; then
    echo "You can't commit directly to main branch"
    exit 1
fi
```

## 참조

- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
