---
title: Git Strategy
summary: 
categories:
    - 
tags:
    - git
publish: true
---

# Git Strategy

현재 회사의 서비스 개발을 진행하면서 좌충우돌 계속 바꿔왔던 git 전략을 정리해보았다. 개발 페이즈에 따라, 개발팀 사이즈에 따라 전략이 계속 바뀌어야 했다.

## 암흑의 시대

![체계 없이 개발하던 시절](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/001.jpg "체계 없이 개발하던 시절")

서비스 개발은 2021년 9월부터 시작하였다. 이 때는 개발자도 소수였고, 런칭까지 단 3~4개월안에 만들어야 했기 때문에 자잘한 규칙을 무시하고 개발하였다.  
이 때 사용한 git 전략(전략이라고 하기도 뭐하지만)은 지금 생각해보면 `github flow`와 비슷한 전략이었다.  
개발을 굉장히 빠르게 진행했어야 했어야 했기에, 개발이 완료되면 `main`에 바로 병합하고, 알파와 스테이징 서버는 개발자가 필요로 할때 수시배포 하였다.  
하지만 런칭을 하고 상용 서버가 열리면서 본격적으로 git 전략을 세워야할 필요성을 느끼게 되었다.

## 계몽의 시대

![체계를 만들어가다. 다니엘 호도비에츠키 1791년 작](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/002.jpg "체계를 만들어가다. 다니엘 호도비에츠키 1791년 작")

서비스를 오픈하고 개발자가 늘어나면서 제대로 git 전략을 세우고 적용하자고 의견을 모았다. 우리가 검토한 git 전략은 가장 유명한 두가지였다.

### github flow 전략

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/003.jpg)

> Author: Rowan Haddad
> [Original blog post](https://www.flagship.io/git-branching-strategies/)

깃허브에서 강력하게 밀고 있는 깃허브 플로우 전략이다.

이 전략은 `main` 브랜치에서 `feature` 브랜치를 딴 뒤, 개발을 완료하고 바로 `main` 브랜치에 머지하는 전략이다.

해당 전략은

1. 우리가 테스트에 사용하는 알파/스테이징 서버 테스트 방법과 맞지 않음
2. `main`에 테스트가 완료되지 않은 `feature` 브랜치가 머지될 수 있음

등을 이유로 빠르게 반려되었다.

### git flow 전략

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/004.png)

> Author: Vincent Driessen
> [Original blog post](https://nvie.com/posts/a-successful-git-branching-model/)
> License: Creative Commons BY-SA

이 전략은

1. `develop`, `release` 브랜치를 알파/스테이징으로 사용할 수 있어 우리의 테스트 방법을 도입할 수 있다.
2. 브랜치가 많이 나뉘기 때문에 테스트가 완료된 브랜치만 머지할 수 있다.

를 이유로 채택하였다.

### 브랜치 목록

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/005.png)

- `prod`: 상용 서버 배포 브랜치
- `main`: 기본 브랜치
- `staging`: 스테이징 서버 배포 브랜치 (QA 테스트용)
- `release`: Release Candidate 브랜치
- `alpha`: 알파 서버 배포 브랜치 (개발자 내부 테스트용)
- `develop`: 개발 브랜치

해당 브랜치들은 다음과 같은 관계를 가진다.

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/006.png)

- `develop` → `alpha`
- `release` → `staging`
- `main` → `prod`

### git 전략

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/007.png)

1. `develop`에서 `feature` 브랜치 생성
2. `feature`를 `develop`에 병합
3. `develop`를 `alpha`에 병합 → 알파 서버 배포됨 → 개발자 내부 테스트 진행
4. `develop`를 `release`에 병합
5. `release`를 `staging`에 병합 → 스테이징 서버 배포됨 → QA 테스트 진행
6. `release`를 `main`에 병합
7. `main`을 `prod`에 병합 → 상용 서버 배포됨

### 단점

![feature2는 브랜치 생성시부터 feature1 변경내역을 가지고 있다](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/008.png "feature2는 브랜치 생성시부터 feature1 변경내역을 가지고 있다")

1. `feature` 브랜치가 `develop`에서 따이고, 개발 직후 `develop`에 병합되기 때문에 발생하는 문제
   - `develop`에서 `feature1` 브랜치 생성 → 개발 완료 직후 `develop`에 머지 → `develop`에서 `feature2` 브랜치 생성을 하게 되면 `feature2`는 `feature1`의 개발 내역을 전부 갖게 된다.
   - `feature1`이 버그나 일정으로 지연될 경우 `feature2`는 손으로 `feature1` 내역을 제거하거나 (이 경우 나중에 `feature1` 머지 충돌 발생), `feature1`이 배포 될 때 까지 지연되게 된다.

![feature1의 QA 실패가 feature2의 배포까지 막는다](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/009.png "feature1의 QA 실패가 feature2의 배포까지 막는다")

1. `develop` 브랜치가 `release`에 병합되기 때문에 발생하는 문제
   - 여러 개발 내역들이 병합되어 올라오기 때문에, `feature` 브랜치 중 하나라도 QA를 통과하지 못하면 배포가 통째로 지연되게 된다.

### 전략 1차 수정

![이제 feature2는 feature1 변경내역을 가지지 않는다](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/010.png "이제 feature2는 feature1 변경내역을 가지지 않는다")

우선 단점 1번을 제거하기 위해 다음과 같이 수정하였다.

1. `develop`에서 `feature` 브랜치 생성 → `main`에서 `feature` 브랜치 생성

상기 Git flow 단점의 1번 문제는 해결되었지만, 2번 문제인 릴리즈 병합으로 인한 배포 지연 문제는 여전히 발생하였다.

### 전략 2차 수정

![](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/011.png)

단점 2번을 제거하기 위해 다음과 같이 수정하였다.

1. `develop` 브랜치 제거
2. `main`에서 `feature` 브랜치 생성
3. `feature`를 `alpha`에 PR 및 병합 → 알파 서버 배포됨 → 개발자 내부 테스트 진행
4. `feature`를 `releases/<배포날짜>`에 병합
5. `releases/<배포날짜>`를 `staging`에 PR 및 병합 → 스테이징 서버 배포됨 → QA 테스트 진행
6. `releases/<배포날짜>`를 `main`에 병합
7. `main`을 `prod`에 PR 및 병합 → 상용 서버 배포됨

배포 날짜를 분리함으로써 이제 2번 문제도 해결되었다.

### 또다른 문제

하지만 이번에는 배포 주기가 문제가 되었다.

배포를 주 1회 진행하다보니 배포 사이즈가 커지게 되고, 배포 스트레스가 엄청나게 커지게 되었다.

![일주일간 쌓인 변경 내역을 배포하는 담당자](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/012.png "일주일간 쌓인 변경 내역을 배포하는 담당자")

또한 배포 후 잘 동작하는지 확인하는데 많은 시간이 소요되게 되어, 배포날은 다른 작업을 거의 진행하지 못하였다.

연관 부서에서도 요청 하루만에 작업 완료 되었음에도 최대 1주일 지연이 되는 문제가 생겼다.

## 현재

![카스파 다비드 프리드리히, 1817년 작](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/013.jpg "카스파 다비드 프리드리히, 1817년 작")

생각해보니 `main`이 `releases` 와 차이가 없다! 또한 날짜를 정해두고 배포하는것은 배포가 지연되는 순간 브랜치 이름이 안맞는다! 이렇게 된거 `releases` 브랜치를 없앤다!

`releases` 브랜치를 없애고 보니 `feature` 단위로 `main`에 병합할 수 있게 되었다! 배포 주기도 짧게 가져가자! 얼마나? 수시 배포하자!

![가자! 수시 배포!](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/014.png "가자! 수시 배포!")

### 브랜치 목록

![브랜치가 크게 간략화 되었다](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/015.png "브랜치가 크게 간략화 되었다")

- `alpha`: 알파 서버 배포 브랜치 (개발자 내부 테스트용)
- `staging`: 스테이징 서버 배포 브랜치 (QA 테스트용)
- `main`: 기본 브랜치. 언제든 배포가 가능하도록 유지한다. Release Candidate역할을 한다.
- `prod`: 상용 서버 배포 브랜치

### git 전략

![이제 feature 별로 개별 테스트 및 배포가 가능하다](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/016.png "이제 feature 별로 개별 테스트 및 배포가 가능하다")

1. `main`에서 `feature` 브랜치 생성
2. `feature`를 `alpha`에 PR 및 병합 → 알파 서버 배포됨 → 개발자 내부 테스트 진행
3. `feature`를 `staging`에 PR 및 병합 → 스테이징 서버 배포됨 → QA 테스트 진행
4. `feature`를 `main`에 PR 및 병합
5. `main`을 `prod`에 PR 및 병합 → 상용 서버 배포됨

처음에는 `feature`가 `main`에 병합되는 대로 수시 배포했다. 하지만 관리자가 심하면 하루 종일 PR 검토 및 배포만 하게 되는 일이 벌어졌다.

![하루 종일 배포 및 검토만 한 담당자](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/017.jpg "하루 종일 배포 및 검토만 한 담당자")

그렇다면 수시 배포하지 말고, 배포 주기를 짧게 가져가자!

하루 2회! 단, 핫픽스는 바로 배포한다!

그렇게 급하게 배포할 일은 많지 않고, feature 쌓이는 속도를 보니 오전, 오후 하루 2회로 충분하다!

하지만 금요일 오후 배포는 주말에 대응이 늦어질 수 있으므로 긴급한 수정이 아닐 경우 되도록 다음주 월요일로 미룬다!

![일 2회 배포를 진행하는 담당자](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/018.png "일 2회 배포를 진행하는 담당자")

### 장점

- 각 단계별 PR이 명확하다.
- 배포 주기를 짧게 가져갈 수 있어 배포가 길게 지연되지 않는다.
- 한번 배포할 때 들어가는 기능 단위가 작아 관리자 검토가 용이하다.

### 단점

- 각 `feature`당 PR을 3개씩 만들어야한다. (`alpha`, `staging`, `main`)
  - 이 부분은 `github action`으로 `alpha`에만 PR을 날리면 나머지 PR을 자동으로 만들어지도록 설정했다.
- `feature` 브랜치는 항상 `alpha`에 먼저 병합되므로 브랜치 목록에서 보면 항상 `merged` 상태가 된다. 따라서 PR 목록을 보지 않고서는 어느 단계까지 배포되었는지 알 수 없다.
  - 이는 각 개발자가 자신의 브랜치를 책임지고 관리하도록 하였다.

### 향후 개선점

상용 배포를 마치고 나면 `alpha`, `staging` 서버를 손으로 `main`과 동일하게 갱신해야하는 문제가 있다.  
이 역시 `github action`으로 빠른 시일내로 자동화할 예정이다.

## 마치며

어떠한 git 전략을 사용해도 단점이 없는 전략이 없기 때문에, 무엇이 정답인지 계속 고민하게 된다.

물론 앞으로 개발팀 인원이 더 늘어난다면 새로운 단점이 부각될 것이고, 그때의 우리는 더 좋은 전략을 찾을 것이다.

![우린 답을 찾을 것이다. 늘 그랬듯이](https://raw.githubusercontent.com/deadcatssociety/image/master/img/git-strategy/019.jpg "우린 답을 찾을 것이다. 늘 그랬듯이")
