---
title: S3 명령어
tags:
    - aws
publish: true
---

# S3 명령어

## AWS S3 에서 특정 파일들 모두 내려받기

```shell
aws s3 cp s3://<bucket name>/ . --exclude "*" --include "<file name with wildcard>" --recursive
```

## AWS S3에서 가장 큰 파일 찾기

```shell
aws s3api list-objects-v2 --bucket "<bucket name>" --query "sort_by(Contents, &Size)[-1:]"
```
