---
layout: post
title: "Homebrew 추천 앱들 정리"
excerpt: "Homebrew 앱 추천"
categories: [MacOS, Homebrew]
tags: [MacOS, Homebrew]
author: devwock
comments: true
---

## 목차

* 목차
{:toc}

## 개요

Homebrew는 맥에서 가장 많이 쓰는 패키지 매니저이다. 그 외 MacPorts나 각종 쉘 패키지 매니저인 bpkg, Antigen, Zgen 등이 있지만 인지도 면에서 Homebrew가 가장 보편적이다.

Homebrew는 커맨드라인 앱을 관리하는 ```brew```와 GUI 앱을 관리하는 ```brew cask```로 나뉜다. (Cask에 관한 자세한 설명은 다음 포스트로)

## wifi-password

![wifi-password](https://camo.githubusercontent.com/553e1755e772f9986165014da298013f88036f08/68747470733a2f2f692e636c6f756475702e636f6d2f75556f386953624b5852682f6b6d36694a542e676966)

wifi-password는 현재 접속한 와이파이의 비밀번호를 보여주는 앱이다. 와이파이에 붙어는 있으나 비밀번호를 모를 때 유용하게 쓸 수 있다.

### 설치

```bash
brew install wifi-password
```

### 사용법

#### 입력

```bash
wifi-password
```

#### 결과

```bash
… getting password for "<현재 접속한 와이파이 SSID>".
… keychain prompt incoming.
✓ "<현재 접속한 와이파이 비밀번호>"
```

### 참조링크

[GitHub](https://github.com/rauchg/wifi-password)

[Homebrew Formulae](https://formulae.brew.sh/formula/wifi-password)

## youtube-dl

youtube-dl은 유튜브 영상을 다운로드 할 수 있게 해주는 앱이다. 여러가지 제약 없이 4k 영상도 다운 가능하고, 업데이트도 활발하기 때문에 강력 추천.

### 설치

``` bash
brew install youtube-dl
```

### 사용법

#### 입력

``` bash
youtube-dl <동영상/재생목록 주소>
```

#### 결과

``` bash
[youtube] <동영상 고유값>: Downloading webpage
[youtube] <동영상 고유값>: Downloading video info webpage
[download] Destination: <동영상 제목>-<동영상 고유값>.mp4
[download] 100% of <동영상 용량>MiB in 00:01
```

현재 커맨드라인 폴더에 영상이 저장된다.

옵션이 매우 다양하고 강력하여 화질/음질 선택이나 자막 다운로드도 되기 때문에 옵션을 검색해 보는 것을 권장한다.

### 참조링크

[GitHub](https://ytdl-org.github.io/youtube-dl/index.html)

[Homebrew Formulae](https://formulae.brew.sh/formula/youtube-dl)

## fzf

![fzf](https://raw.githubusercontent.com/junegunn/i/master/fzf-preview.png)

fzf는 막 지은 이름같지만 FuZzyFinder의 줄임말이며 카카오의 Junegunn Choi라는 분이 만드신 유틸리티이다. 말그대로 퍼지 파인더이며 파일이나 히스토리를 엄청나게 강력하게 검색할 수 있다.

### 설치

```bash
brew install fzf

# To install useful key bindings and fuzzy completion:
$(brew --prefix)/opt/fzf/install
```

### 사용법

#### 입력

```bash
fzf
```

#### 결과

```bash
<파일 인덱싱 화면>
> <검색어 입력>
```

fzf 역시 옵션이 굉장히 다양하므로 검색하길 권장한다.

### 참조링크

[GitHub](https://github.com/junegunn/fzf)

[Homebrew Formulae](https://formulae.brew.sh/formula/fzf)
