---
title: Gopath
tags:
    - languate
    - go
publish: true
---

# Gopath

`$GOPATH`는 go의 패키지를 관리하는 폴더를 지정한다. (`node`의 `node_modules`와 같은 역할)

여기서 `$GOPATH` 경로를 프로젝트 루트로 하여 `go.mod`파일과 경로가 동일할 경우 다음 오류가 발생한다.

`$GOPATH/go.mod exists but should not`

따라서 `$GOPATH`는 반드시 프로젝트와 별도의 폴더로 관리해야한다.
