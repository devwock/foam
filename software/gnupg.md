---
title: GnuPG 사용법
summary: GnuPG 사용법
categories:
    - 
tags:
    - software
    - encrypt
    - gnu
link: 
publish: true
---

# GnuPG

[GnuPG](https://www.gnupg.org)는 `RFC4880`를 구현한 `OpenPGP`의 Gnu 구현체로 컴퓨터 파일을 암호화하고 복호화 하는 프로그램이다.

## 키 생성

```shell
gpg --full-generate-key
```

## 키 확인

```shell
gpg --list-keys
gpg --list-secret-keys
```

## 키 백업 생성

```shell
gpg --output backupkeys.pgp --armor --export-secret-keys --export-options export-backup <email>
gpg --export-ownertrust > trust_owner.pgp
```

## 맥에서 터미널 에러 해결

```shell
echo "pinentry-program /usr/local/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf
killall gpg-agent
```

## 키 복원

```shell
gpg --import-options import-restore --import backupkeys.pgp
gpg --import-ownertrust < trust_owner.pgp
```

## 키 권한설정

```shell
gpg --edit-key <email>
gpg> trust
```
