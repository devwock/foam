---
title: Collate
tags:
    - postgres
publish: true
---

# Collate

Postgres에서 테이블 생성 시 별도 collate를 지정하지 않으면 기본적으로 `en_US.UTF-8`로 설정되어 한글 정렬이 괴상하게 된다.

설정된 collate는 다음 SQL로 확인할 수 있다.

```sql
SELECT
    datname,
    datcollate,
    datctype
FROM pg_database;
```

해당 테이블의 collate 변경하여도 실제로 적용되지 않으며, DB를 새로 생성해야만 변경 가능하다.

## Collation 추가

한글 정렬을 위해선 `ko_KR.utf8` collation이 필요하다. 다음 SQL로 추가한다.

```sql
CREATE COLLATION "ko_KR.utf8" (
    LOCALE = 'ko_KR.utf8',
    PROVIDER = icu,
    DETERMINISTIC = true
);
```

## Collation을 포함하여 쿼리

collation을 포함하여 쿼리를 하면 해당 테이블 collation이 다른 언어로 되어있어도 특정 언어로 정렬 가능하다.

```sql
SELECT *
FROM table
ORDER_BY name COLLATE "ko_KR.utf8" ASC
```
