---
title: TermHere
summary: 맥 파인더에서 해당 경로로 터미널을 바로 열어주는 유틸리티
categories:
    - 
tags:
    - software
    - mac
link: 
publish: true
---

# TermHere

![TermHere Banner](https://hashbang.productions/apps/termhere/banner.jpg)

[TermHere](https://hashbang.productions/apps/termhere/)

## 개요

맥에서 현재 열고 있는 폴더로 터미널을 열어주는 프로그램을 카탈리나 전에는 Go2Shell을 사용했는데, 이 앱이 업데이트를 계속 안하면서 카탈리나부터 사용할 수 없게 되었다.

그래서 대체품이 없나 고민하던 찰나, 괜찮은 앱 [TermHere](https://hashbang.productions/apps/termhere/)를 발견했다.

## 설치

홈페이지에서 .dmg 파일을 다운받아 설치하거나, `brew cask`로 설치할 수 있다.

```bash
brew cask install termhere
```

## 사용

<!-- ![파인더 확장 설정]({{ site.img }}/2020-03-14-termhere/1.png) -->

앱 실행 후 맥의 `System Preferences` - `Extensions` - `Finder Extensions` 에서 `TermHere` - `Finder Extension`에 체크 해 줘야한다.

<!-- ![Context 메뉴]({{ site.img }}/2020-03-14-termhere/2.png) -->

기본기능: 현재 폴더 빈공간이나 폴더, 파일을 선택하고 오른클릭해서 `New Terminal Here`을 선택하면 터미널이 열린다.

<!-- ![TermHere 설정]({{ site.img }}/2020-03-14-termhere/3.png) -->

`Terminal app:` 사용할 터미널 앱을 지정한다.

<!-- ![파인더 확장]({{ site.img }}/2020-03-14-termhere/4.png) -->

- `Show in:` 파인더의 상단 툴바에 현재 폴더에 터미널을 열 수 있는 아이콘을 표시한다. 상단 툴바에서 오른클릭해서 `Customize Toolbar...`를 눌러 아이콘을 추가해 줘야한다.
- `Open selected items` 아이템 여러개를 선택하고 터미널을 열면 터미널을 각각 열어준다. 비활성화하면 아이템이 있는 폴더에서 터미널을 연다.
- `Open in:` 터미널이 열리는 방법을 결정한다.
  - `New tab` 새 탭으로 터미널을 연다.
  - `New window` 새 창으로 터미널을 연다.
  - `Last used tab` 가장 마지막에 사용한 탭으로 터미널을 연다. 두 개 이상 선택시 같은 탭에서 한 탭에서 명령이 연달아 실행된다.

## 링크

- [TermHere](https://hashbang.productions/apps/termhere/)
- [Homebrew Formulae](https://formulae.brew.sh/cask/termhere)
