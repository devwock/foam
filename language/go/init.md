---
title: Go 초기화 방법
summary: 
categories:
    - 
tags:
    - docker-compose
publish: true
---
# Go 초기화 방법

| Path | Description |
| :-- | :-- |
| `$GOROOT` | go의 바이너리 지정 (SDK의 경우 JDK와 같이 go를 포함하므로 SDK 폴더 지정도 무관) |
| `$GOPATH` | go의 패키지 디렉토리 |
| `go.mod` | 모듈 정의. 자신의 패키지 이름, go 버전, require를 지정 |

## ASDF 설치

```shell
asdf plugin add go-sdk
```

## direnv

```shell
asdf direnv local go-sdk 1.19.3
```

## .envrc

이후 gopath 폴더 생성 후 경로 지정

```bash
use asdf
export GOPATH=$(PWD)/gopath
```

```shell
direnv allow
```

## GoLand

### SDK 지정

```shell
$HOME/sdk/go1.19.3
```

### GO PATH 지정

gopath 폴더 생성 후 `Product GOPATH`에 해당 폴더 지정

## GO MOD init

```shell
go mod init <원하는 모듈 경로>
```

## Hello, World!

`main.go` 파일 생성 후 다음 코드 입력

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

## 실행

### Shell

```shell
go run main.go
```

### GoLand

| Variable | Value |
| :- | :- |
| Run Kind | File |
| Files | `<PRODUCT PATH>/main.go` |
