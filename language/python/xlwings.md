---
title: XLwings를 개발 도구에서 시 권한 설정 방법
summary: XLwings를 개발 도구에서 시 권한 설정 방법
categories:
    - 
tags:
    - language
    - python
    - 개발환경
link: 
publish: true
---

# xlwings

`xlwings`는 실제로는 엑셀의 내부 서버를 사용하기 때문에, 사용하려면 맥의 `Automation` 권한 중 `System Event.app`과 `Microsoft Excel.app` 권한이 있어야한다. 해당 권한이 없다면 라이브러리 실행 중 권한 오류가 발생한다.

다음 방법으로 개발 도구에서 개발 시 권한을 획득할 수 있다.

다음 예시는 `pycharm` 기준으로 작성하였다.

## pycharm에서 권한 획득

### 방법 1

```zsh
/Applications/PyCharm.app/Contents/MacOS/pycharm
```

으로 파이참 실행하면 바로 사용 가능. 단 권한이 터미널 앱에 종속된다.

### 방법 2

1. `방법 1`을 수행해 먼저 터미널 앱에 해당 권한을 획득한다.
2. `sqlite3` 클라이언트에 `Files and Folders` 권한 중 `Full Disk Access` 권한을 부여한다.
3. `sqlite3` 클라이언트로 `/Users/<USER NAME>/Library/Application Support/com.apple.TCC/TCC.db`를 연다.
4. `access` 테이블의 `service`의 값이 `kTCCServiceAppleEvents`이고, `indirect_object_identifier`가 `System Event.app`과 `Microsoft Excel.app` 인 로우를 찾는다.
5. 해당 로우의 `client` 값을 `pycharm`의 패키지 명인 `com.jetbrains.pycharm`으로 업데이트한다.

### `access` 테이블

| 컬럼명 | 의미 |
| :-- | :-- |
| `service` | 시스템 권한 상수. `kTCCServiceAppleEvents`는 권한 중 `Automation`이다. |
| `client` | 권한을 부여할 앱 |
| `indirect_object_identifier` | 해당 앱에서 접근할 수 있는 앱 |
