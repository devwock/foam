---
title: Git Multiple Remote
tags:
    - git
publish: true
---

# Git Multiple Remote

git에서 repo를 다른 리포지토리로 연결하는 방법

1. 깃허브에 새로운 repository를 생성, 이 때 아무 파일도 넣지 말 것
2. 가져올 repository를 로컬로 clone
3. `git remote rename origin upstream`
4. `git remote add origin <GITHUB 새 REPOSITORY 주소>`
5. `git push origin main`

위 명령어는 기존 리포지토리 origin을 upstream으로 변경 후, 새로운 origin으로 생성한 리포지토리로 생성하고 push를 하게 된다.

이후 기존 repository 변경분을 반영하려면 다음 명령어를 사용한다.

`git pull upstream main && git push origin main`

## Reference

- <https://stackoverflow.com/questions/5181845/git-push-existing-repo-to-a-new-and-different-remote-repo-server>
