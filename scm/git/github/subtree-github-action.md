---
title: Subtree 부모 리포지토리 push
summary: Subtree 자식이 업데이트 되었을 때 부모 리포지토리에 push하는 github action
categories:
    - 
tags:
    - scm
    - git
    - github
link: 
publish: true
---

# Subtree Github Action

자식 서브트리 리포지토리를 `push`했을 때 부모 리포지토리 `pull` 당겨서 `push`하는 깃허브 액션 스크립트 예제

```yaml
name: <이름>
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          repository: ${{ github.repository_owner }}/<리포지토리 주소>
          fetch-depth: 0
          token: ${{secrets.PAT}}
      - run: |
          git config user.name ${{ github.actor }}
          git config user.email ${{ github.actor }}@users.noreplay.github.com
          git remote add foam ${{ github.repositoryUrl }}
          git subtree pull --prefix <git 주소> <디렉토리 이름(옵션)> <branch 이름>
          git push
```
