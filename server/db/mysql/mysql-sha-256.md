---
title: MySQL에서 SHA256 길이 검증
tags:
    - mysql
publish: true
---

# SHA 256

## 개요

MySQL에서 `SHA2(<STRING>, 256)`을 `UNHEX` 안할 경우 BASE64 길이 검증

1. SHA256은 결과물이 256bit, 32byte이며 Base64는 3byte를 4글자로 (6bit per character) 치환한다.
2. MySQL `Function sha2(<STRING>,256)`은 [레퍼런스에 따르면](https://dev.mysql.com/doc/refman/8.0/en/encryption-functions.html#function_sha2) Non-binary string을 반환한다. (As of MySQL 5.5.6, the return value is a nonbinary string in the connection character set.)
3. `UNHEX`를 안할 경우 SHA 256의 결과인 256bit를 HEX로 치환한 값을 반환하기 때문에 HEX 한 글자당 4bit씩 잘라 HEX string으로 변환해 256 / 4 = 64자(32byte) HEX string으로 결과가 나오게 된다.
4. 이를 그대로 `TO_BASE64`에 넣으면 1character = 8bit이므로 64 * 8 = 512bit, HEX string 512비트가 들어가게 된다.
5. 따라서 올바른 해시값을 얻으려면 `SELECT TO_BASE64(UNHEX(sha2(<STRING>,256)))`로 HEX string을 bit로 변환해서 사용해야 한다.

## 확인

```MySQL
SELECT
    SHA2('test1', 256) AS 'Hashed String',
    UNHEX(SHA2('test1', 256)) AS 'Binary String',
    LENGTH(UNHEX(SHA2('test1', 256)))  AS 'Byte Count',
    TO_BASE64(SHA2('test1', 256)) AS 'Direct Base64',
    LENGTH(TO_BASE64(SHA2('test1', 256))) AS 'Direct Base64 Count',
    TO_BASE64(UNHEX(SHA2('test1', 256))) AS 'Correct Base64',
    LENGTH(TO_BASE64(UNHEX(SHA2('test1', 256)))) AS 'Correct Base64 Count';
```

| Column               | Value                                                                                    |
|:---------------------|:-----------------------------------------------------------------------------------------|
| Hashed String        | 1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014                         |
| Binary String        | 0x1B4F0E9851971998E732078544C96B36C3D01CEDF7CAA332359D6F1D83567014                       |
| Byte Count           | 32                                                                                       |
| Direct Base64        | MWI0ZjBlOTg1MTk3MTk5OGU3MzIwNzg1NDRjOTZiMzZjM2QwMWNlZGY3Y2FhMzMyMzU5ZDZmMWQ4MzU2NzAxNA== |
| Direct Base64 Count  | 88                                                                                       |
| Correct Base64       | G08OmFGXGZjnMgeFRMlrNsPQHO33yqMyNZ1vHYNWcBQ=                                             |
| Correct Base64 Count | 44                                                                                       |

## 검증

1. `SHA2('test1', 256) AS 'Hashed String'` 의 결과로 256 bit, 64자, 32 byte 생성
   - `SHA2()`의 결과물은 Non-Binary String이기 때문에 단순히 바이너리를 HEX String으로 치환한 값임.
2. 올바르게 BASE64를 진행하려면 `UNHEX`를 통해 HEX String을 Binary로 변환해야함.
3. 변환하지 않을 경우, Byte string을 input으로 그대로 사용하기 때문에, `TO_BASE64(SHA2('test1', 256)) AS 'Direct Base64'`를 수행하면 64 char * 8 bit per char로 인해 512 bit, 64 byte가 입력 값으로 들어가게 된다.
4. 이 경우 `BASE64`가 3 byte per 4 char 씩 자르므로 64 / 3 = 21.333이 된다. 21 * 4 char = 84 char가 되고, 나머지 바이트 + 패딩 `=` = 4자가 더해져 88자가 된다.
5. 올바르게 변환할 경우 32 byte / 3 = 10.66666 이므로 40자 + 4자로 44자가 된다.
