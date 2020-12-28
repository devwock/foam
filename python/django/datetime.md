# Datetime필드

## DateTime 필드와 Date 필드의 차이

쿼리 할 때 `date__year=2020`로 쿼리하면 다음과 같은 `where` 문이 붙는다.

```sql
`billings_sellerbilling`.`base_at` BETWEEN 2020-01-01 AND 2020-12-31
```

`date__month=10`으로 쿼리하면 다음과 같이 된다.

```sql
(EXTRACT(MONTH FROM `billings_sellerbilling`.`base_at`) = 10
```

문제는 `datetime` 필드에 `__month`로 쿼리하게 되면

```sql
(EXTRACT(MONTH FROM `billings_sellerbilling`.`base_at`) = 10
```

해당 조건문은 MySQL에서 null이 나오게 된다.

이유는 불명.
