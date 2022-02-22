---
title: iVim
summary: 
categories:
    - 
tags:
    - software
    - iOS
    - vim
link: https://github.com/terrychou/iVim
publish: true
---

# iVim

## [iVim](https://github.com/terrychou/iVim)

[iVim](https://github.com/terrychou/iVim)은 iOS용 vim 앱 중 가장 평가가 좋고 가장 많이 사용하는 앱이다.

앱 내 구매가 있긴 하지만, 이는 편집하다 앱 전환 해서 메모리가 날아갔을 때 복원해 주는 기능이고, 그 외에 어떠한 기능적 제약도 없다.

다음 예제는 `iVim`에서 `.vimrc`를 만들고, `Pathogen`으로 플러그인을 설치하고, `Working Copy`로 git 연동하고, `vimwiki`를 사용한다.

## `.vimrc` 생성

<!-- ![vim 디렉토리 편집]({{ site.img }}/2020-03-05-ivim/1.png) -->

`:e .` 을 입력해 현재 디렉토리를 편집한다.

<!-- ![vim 디렉토리 편집 모드]({{ site.img }}/2020-03-05-ivim/2.png) -->

이 화면에서 `%`를 누르면 새 파일을 생성할 수 있다. `%`를 누르고 `.vimrc` 파일을 생성하고 입맛에 맞게 편집한다.

## [Pathogen](https://github.com/tpope/vim-pathogen) 설치

### 개요

iVim에서는 [iOS에 git 명령어가 없어 Vundle이나 vim-plug를 사용할 수 없다.](https://github.com/terrychou/iVim/issues/22)

따라서 반 강제로 [Pathogen](https://github.com/tpope/vim-pathogen)을 사용해야 한다.

### 폴더 이름 변경

iOS의 파일 앱에서는 `.`으로 시작하는 파일이나 폴더는 숨김처리되어 볼 수 없으므로, `.vim` 폴더 이름을 임시로 변경한다.

<!-- ![.vim 폴더 이름 변경]({{ site.img }}/2020-03-05-ivim/3.png) -->

`:e .`을 입력해 디렉토리 편집 모드로 가서, .vim 폴더에서 `R` 키를 눌러 이름을 `vim`으로 변경한다.

### `Pathogen` 및 플러그인 다운로드

iOS에서 [pathgen.vim](https://github.com/tpope/vim-pathogen/blob/master/autoload/pathogen.vim) 파일을 다운로드 한다.

<!-- ![github 다운로드]({{ site.img }}/2020-03-05-ivim/github-download.png) -->

(선택) 기타 사용할 플러그인을 깃허브에서 zip 파일로 다운로드 한다. 나중에 다운받아 적용하려면 다시 이름 바꾸는 등 귀찮기 때문에 한번에 처리하는 것이 좋다.

### `Pathogen` 복사

우선 파일 앱에서 모든 zip 파일을 누르면 압축을 풀어 폴더로 만들어준다.

파일 앱에서 `On My iPad/iVim/vim` 폴더에 `autoload`와 `bundle` 폴더를 생성한다.

<!-- ![플로그인 이동]({{ site.img }}/2020-03-05-ivim/5.png) -->

`pathogen.vim` 파일을 `iVim/vim/autoload` 폴더로 복사한다.

나머지 플러그인 폴더들을 `iVim/vim/bundle` 폴더로 복사한다.

### 폴더 이름 복원

`:e .`을 입력해 디렉토리 편집 모드로 가서, vim 폴더에서 `R` 키를 눌러 이름을 `.vim`으로 변경한다.

### `.vimrc`

`.vimrc`에 다음 라인을 추가해 Pathogen 설정을 완료한다.

```vim
execute pathogen#infect()
syntax on
filetype plugin indent on
```

## `vimwiki` 설정 및 git 연동

### `vimwiki` 설정

`:e .` 으로 디렉토리 편집 모드로 이동하여 `vimwiki`를 저장할 폴더를 생성한다.

`.vimrc` 파일에서 vimwiki 폴더를 지정한다. 나는 `vimwiki`로 폴더를 생성했다.

```vim
let g:vimwiki_list = [
    \{
    \   'path': '~/vimwiki',
    \   'ext' : '.md'
    \}
\]
```

### [Working Copy](https://workingcopyapp.com)

[Working Copy](https://workingcopyapp.com)는 iOS의 git 클라이언트 중 가장 뛰어난 앱이다. 심지어 github 학생 등록하면 무료로 프로 버전을 사용 할 수 있다.

기능적으로도 편리성으로도 끝판왕이기 때문에 iOS에서 개발 비스므리한걸 하고싶으면 강력하게 추천한다.

iVim에서 작업한 결과물을 git으로 연동하는게 간단할 줄 알았는데 몇가지 문제가 있었다.

1. 위에서 말한대로 iOS에서 git 명령어를 쓸 수 없기 때문에 vim에서 직접 연동은 불가능.
2. `iShare` 기능으로 매번 공유하자니 너무 귀찮음
3. `Working Copy` 폴더를 `iDoc`으로 불러오자니 경로가 매번 바뀌기 때문에 `vimwiki` 패스 지정 불가

이 문제들을 `Working Copy`가 깔끔하게 해결해줬는데, [Files synchronisation](https://workingcopyapp.com/manual/files-sync) 기능 덕분이다.

1. 미리 깃허브에 `vimwiki` 리포지토리를 생성한다.
2. `Working Copy`의 `Repository`에서 `+` 버튼을 눌러 `Setup synced directory`를 선택한다.
3. 아까 생성한 `vimwiki` 리포지토리를 선택한다.
4. `Add Remote`를 선택해 리포지토리의 git 주소를 입력한다.
5. `Pull`을 해주면 연동이 완료된다.

이제 `vimwiki`에서 문서를 작성하고 `Working Copy`에서 `Commit`, `Pull`, `Push`를 할 수 있다.

---

## 부록

### iVim에서 사용할 수 있는 iOS 확장 기능들

iOS의 기능을 사용할 수 있는 명령어들이다.

자세한 설명은 [링크](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt) 참조

#### [폰트](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L18)

- `:ifo[nt]` 폰트 관리
- `:idel[etefont]` 폰트 삭제

#### [Share](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L79)

- `:ish[are]` iOS 공유 메뉴 열기
- `:idoc[uments]` iOS 파일 목록 열기
- `:idocuments-trash` 휴지통 보기

#### [Exuberant Ctags](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L163)

- `:ic[tags]` Exuberant Ctags 를 사용할 수 있게 해준다.

#### [Open URL](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L192)

- `:io[penurl] {url}` iOS 확장 URL 스키마를 사용할 수 있게 해준다.

#### [Set Extended Keyboard](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L285)

- `:iset[ekbd]` 확장 키보드 설정

#### [Old Document](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_commands.txt#L816)

- `:iold[docs]` 올드 도큐먼트 관리

### iVim에서 사용할 수 있는 외부 커맨드

iVim에서 사용할 수 있는 외부 커맨드들이다.

자세한 설명은 [링크](https://github.com/terrychou/iVim/wiki/External-commands) 참조

- [curl](https://github.com/terrychou/iVim/wiki/External-Command:-curl)
- [python3](https://github.com/terrychou/iVim/wiki/External-Command:-python3)
- [ssh](https://github.com/terrychou/iVim/wiki/External-Command:-ssh)

#### [iVim SSL 인증서](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_external_cmds.txt#L104)

`$SSL_CERT_FILE` iVim 인증서 기본 환경변수. 기본 위치는 `~/cacert.pem`으로 인증서를 해당 경로에 복사하고, 코드상에서 사용하면 된다.

별도의 인증서가 없을 땐 모질라에서 제공하는 인증서를 사용할 수 있다.

다운로드: `curl -kOL https://curl.haxx.se/ca/cacert.pem`

업데이트: `curl --remote-name --time-cond cacert.pem https://curl.haxx.se/ca/cacert.pem`

#### [입출력](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_external_cmds.txt#L121)

- `Ctrl-C` 외부 커맨드 인터럽트
- `Ctrl-D` EOF

출력은 스탠다드 아웃풋과 에러로 나오며 스크롤 백 못함

#### [터미널](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_external_cmds.txt#L158)

- `:terminal [명령어]` 터미널 열고 명령어 실행
- 외부 터미널 인터페이스가 열리며 한번에 하나씩밖에 실행 안됨.
- 여러 명령어 실행하려면 여러 터미널 창을 사용해야함

#### [ivish](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_external_cmds.txt#L195)

- `:terminal[ ivish]` 연속적인 터미널 명령 실행
- `ivish` 몇가지 인터널 커맨드
- `exit`: ivish 종료
- `help`: 헬프 문서 보여줌
- `history`: 히스토리 출력

#### [iVim에서 사용가능한 iOS 쉘 커맨드들](https://github.com/terrychou/iVim/blob/master/vim/runtime/doc/ios_shell_cmds)

| - | - | - | - | - |
| :--: | :--: | :--: | :--: | :--: |
| awk | bc | cat | catimg | cd |
| chflags | chksum | compress | cp | curl |
| cut | date | dc | diff | dig |
| du | echo | egrep | env | fgrep |
| find | grep | gunzip | gzip | head |
| host | ifconfig | ivish | link | ln |
| ls | lua | luac | md5 | mkdir |
| mv | nc | nslookup | open | openurl |
| pbcopy | pbpaste | ping | printenv | pwd |
| python3 | readlink | rlogin | rm | rmdir |
| say | scp | sed | setenv | sftp |
| sort | ssh | ssh-keygen | stat | sum |
| tail | tar | tee | telnet | touch |
| tr | uname | uncompress | uniq | unlink |
| unsetenv | uptime | wc | whoami | whois |
| xargs | - | - | - | - |
