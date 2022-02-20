---
title: 안드로이드 크롬 새 창 Deep link
summary: 안드로이드 인 앱에서 크롬 새 창으로 URL 열기
categories:
    - 
tags:
    - language
    - android
link: 
publish: true
---

# Deep Link

안드로이드 인 앱에서 크롬 새 창으로 URL을 여는 url 스킴은 다음 두 개가 성공하였다.

```url
Intent://navigate?url=www.naver.com#Intent;scheme=googlechrome;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end
```

```url
Intent://www.naver.com#Intent;scheme=googlechrome;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end
```

## 참조

- [카카오톡에서 url 스킴을 이용한 앱 열기 테스트 결과](https://help.adbrix.io/hc/ko/articles/360039757433-딥링크-Deeplink-URI스킴-유니버셜-링크-앱링크-구분과-이해)
- [네이버 앱의 url scheme 연동 가이드](https://developers.naver.com/docs/utils/mobileapp/)
- [라인 엔지니어링 딥링크 설명](https://engineering.linecorp.com/ko/blog/how-to-use-deeplink-in-trackit/)
- [스택 오버플로우](https://stackoverflow.com/questions/29250152/what-is-the-intent-to-launch-any-website-link-in-google-chrome)
- [안드로이드 구글 크롬 url 인텐트 공식 가이드](https://developer.chrome.com/multidevice/android/intents)
- [url 스킴 가이드](https://branch.io/glossary/chrome-intents/)
