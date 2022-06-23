---
title: Split Csv To Mysql
summary: 
categories:
    - 
tags:
    - mysql
publish: true
---
## Split Csv To Mysql

수백메가의 CSV 파일을 MySQL의 INSERT 쿼로 넣게 되면 타임아웃이 걸리면서 INSERT에 실패하게 된다. 이 경우 대량의 CSV를 리눅스의 split으로 쪼개서 LOAD DATA INFILE 명령어로 넣게되면 대량의 데이터를 빠르게 넣을 수 있다.

## 파일 쪼개기

리눅스에서 CSV를 split으로 개별적인 파일로 쪼갠다

```shell
split -d -a <자릿수> -l <라인수> <원본파일이름> <쪼개질 파일의 Prefix>
```

| 옵션 | 설명 |
| :-- | :-- |
| `-d` | 분할한 파일 이름 뒤에 숫자를 붙인다. |
| `-a <자릿수>` | 분할할 파일 이름 뒤 자릿수를 정한다. |
| `-l <라인수>` | 라인 수 기준으로 파일을 쪼갠다. |

리눅스의 split 명령어의 자세한 설명은 [split(Wikipedia)](https://en.wikipedia.org/wiki/Split_(Unix)) 참조

## MySQL에 적재

쪼갠 파일을 MySQL에서 LOAD DATA로 적재한다.

```SQL
LOAD DATA LOCAL INFILE '<파일 이름>'
INTO TABLE <테이블 이름>
FIELDS
    TERMINATED BY '<CSV의 필드 구분자 ex: , >'
LINES
    TERMINATED BY '<CSV의 라인 구분자 ex: \n >'
```

MySQL의 LOAD DATA INFILE 설명은 [링크](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 참조

- 반드시 Root계정으로 로그인 해야하며 bin/mysql 폴더에 CSV 파일이 있어야한다.
- 따라서 워크 벤치 등으로 원격에서는 파일 경로를 찾지 못하기 때문에 업로드 할 수 없음

파일 갯수가 지나치게 많을 경우 다음 쉘 스크립트를 고려한다.

```shell
#!/bin/bash
for f in *.csv
    do
        mysql -u <사용자이름> --password=<비밀번호> -e \
            "USE <DB 이름> \
            LOAD DATA LOCAL INFILE '"$f \
            "'INTO TABLE <테이블 이름> \
            FIELDS \
                TERMINATED BY '<CSV의 필드 구분자 ex: , >' \
            LINES \
                TERMINATED BY '<CSV의 라인 구분자 ex: \n >'" \
        <데이터베이스>
    done
```
