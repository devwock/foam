---
title: SlowQuitApps
summary: 맥에서 cmd + Q로 앱이 바로 닫히지 않게 해주는 유틸리티
categories:
    - 
tags:
    - software
    - mac
link: 
publish: true
---

# SlowQuitApps

![SlowQuitApps Banner](https://github.com/dteoh/SlowQuitApps/raw/master/img/preview.gif?raw=true)

## 개요

맥에서 `⌘`+`q`는 윈도에서 `alt`+`f4`와 같은, 앱을 종료하는 단축키이다.

다만 맥에서는 `q`키의 절묘한 위치로 인해 탭을 닫으려다(`⌘`+`w`) 앱을 통째로 종료하는 일이 가끔 생기곤 한다.

이 SlowQuitApps는 이 `⌘`+`q`에 딜레이를 줘서 실수로 앱을 닫는 것을 막아주는 역할을 한다.

## 설치

홈페이지에서 [다운로드](https://github.com/dteoh/SlowQuitApps/releases)하여 설치하거나, `brew cask`로 설치한다.

```bash
brew tap dteoh/sqa
brea cask install slowquitapps
```

<!-- ![Accessibility]({{ site.img }}/2020-03-16-slowquitapps/1.png) -->

앱 실행 후 `System Preferences` - `Security & Privacy` - `Privacy` - `Accessibility`에서 `SlowQuitApps.app`을 체크 해 줘야한다.

## 앱 설정

<!-- ![Dock Settings]({{ site.img }}/2020-03-16-slowquitapps/3.png) -->

앱에서 건드릴 수 있는 설정은 단 세개밖에 없다.

* `Remove from Dock` 독에서 앱 아이콘을 없앤다.
* `Open at Login` 로그인 할 때 마다 앱을 실행한다.
* `Show in Finder` 앱 위치를 파인더에서 연다.

## 커맨드라인 설정

### 필수사항

모든 설정은 앱을 재시작해야 적용된다.

### 종료 딜레이 확인

```bash
defaults read com.dteoh.SlowQuitApps
```

### 종료 딜레이 변경

5초로 변경하려면 다음과 같이 터미널에 입력한다.

```bash
defaults write com.dteoh.SlowQuitApps delay -int 5000
```

### 화이트리스트 등록

딜레이 없이 종료할 앱을 등록할 수 있다.

```bash
# 앱 패키지 이름 검색
osascript -e 'id of app "Notes"'
# 검색에서 나온 패키지 이름
com.apple.Notes
# 딜레이 변경
defaults write com.dteoh.SlowQuitApps whitelist -array-add com.apple.Notes
```

#### 화이트 리스트 리셋

```bash
defaults delete com.dteoh.SlowQuitApps whitelist
```

#### 화이트 리스트 확인

```bash
defaults read com.dteoh.SlowQuitApps whitelist
```

### 블랙리스트 모드

화이트리스트와 달리, 특정 앱만 딜레이를 줘서 종료하는 모드로 변경한다.

```bash
defaults write com.dteoh.SlowQuitApps invertList -bool YES
```

다시 되돌리려면 다음 명령어를 사용한다.

```bash
defaults delete com.dteoh.SlowQuitApps invertList
```

### 오버레이 숨김

`⌘`+`q`를 누를 때 나오는 애니메이션 오버레이를 제거한다.

```bash
defaults write com.dteoh.SlowQuitApps displayOverlay -bool NO
```

## 링크

[깃허브](https://github.com/dteoh/SlowQuitApps)
