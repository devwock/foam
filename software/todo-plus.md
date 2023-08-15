---
title: Todo+
tags:
    - 프로그램
publish: true
---
# Todo+

![Todo+](https://github.com/fabiospampinato/vscode-todo-plus/raw/master/resources/demo/syntax.png)

## 개요

업무 정리를 위해 몇가지 TODO 앱들을 왕창 깔아서 비교해 본적이 있었다. Notion, 원노트, Wunderlist, Microsoft TODO 등등등.  
그런데 뭔가 성에 차지 않는 점이 몇개씩 있었다. 동선이 복잡하다던가, 무겁다던가, 키보드 단축키 지원이 미흡하다던가 등등.  
결국 텍스트 기반 TODO 앱을 찾아 헤멨는데 결국 정착하게 된것이 VSCode의 확장 Todo+ 이다.

## 요구사항

- 가벼울 것
- 단축키 지원
- 클라우드 연동

## Pros

- 단일 텍스트 기반: `파일이름.todo`로 텍스트 파일만 생성하면 된다. 따라서 git과 같이 쓸 수 있다. 프로젝트에 포함시키기도 가능.
- 직관적인 사용법
- 단축키 지원
- 작업 시간 시간 측정 가능

## Cons

- 텍스트 기반이라 인터페이스가 투박함
- 편의기능이 부족함
- 별도 앱이 없어 모바일에서 바로 확인이 힘듦

## 사용법

| 기능                          | 설명                                                                                    |
| :--------------------------- | :------------------------------------------------------------------------------------- |
| `<제목>:`                     | 카테고리를 정한다. 카테고리는 인덴트로 서브 카테고리를 정할 수 있으며, 아직 완료되지 않은 작업의 갯수도 보여준다. |
| `CTRL`/`CMD`+`ENTER`         | TODO를 만든다.                                                                           |
| `ALT`+`S`                    | TODO를 시작 상태로 변경한다. 체크박스가 마킹 되지 않는다.                                          |
| `ALT`+`D`                    | TODO를 완료 상태로 변경한다. 체크박스가 V자로 마킹된다.                                            |
| `ALT`+`C`                    | TODO를 취소 상태로 변경한다. 체크박스가 X자로 표시된다.                                            |
| `CTRL`/`CMD`+`SHIFT`+`ENTER` | TODO 리스트를 아카이빙한다.                                                                  |
| `@critical`                  | `critial` 레이블을 붙인다. 붉은색으로 표시됨                                                    |
| `@today`                     | `today` 레이블을 붙인다. 보라색으로 표시됨                                                      |
| `@high`                      | `high` 레이블을 붙인다. 주황색으로 표시됨                                                       |
| `@low`                       | `low` 레이블을 붙인다. 노란색으로 표시됨                                                        |

## 진행도 표시

![진행도](https://github.com/fabiospampinato/vscode-todo-plus/raw/master/resources/demo/statistics.png)

하단에 `✓ 3/9 (33%)` 로 진행도 표기도 해준다.

![카테고리진행도](https://github.com/fabiospampinato/vscode-todo-plus/raw/master/resources/demo/project_statistics.png)

![카테고리상세진행도](https://github.com/fabiospampinato/vscode-todo-plus/raw/master/resources/demo/project_statistics_adv.gif)

프로젝트 카테고리의 진행도도 상세하게 커스터마이징 가능하다.

## 액티비티 바

![액티비티바](https://github.com/fabiospampinato/vscode-todo-plus/raw/master/resources/demo/activity_bar_views.png)

단일 TODO 파일 외에 프로젝트의 코드상에 있는 TODO를 모아서 관리해주는 기능도 있다.

## 그외

단축키 변경, 심볼 변경, 걸린 시간 표시 안하기, 시간 형식 변경, 색 등 아주 다양한 커스터마이징을 제공한다.

## 링크

- [TODO+ 마켓플레이스](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus)
- [TODO+ GitHub](https://github.com/fabiospampinato/vscode-todo-plus)
