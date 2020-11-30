# Autonow

Django ORM에서 DatetimeField의 속성 중 `autonow=True` 를 설정하면 매 `save()` 시 마다 날짜가 갱신된다.

이를 막기 위해서 `default=timezone.now()` 를 설정해 보았으나 warning이 발생하였다.

리서치 결과, 이 경우 `autonow_add=True`를 사용하면 `create()` 시에만 날짜가 추가된다.

단, `test = Test() test.save()` 를 호출 시 `null` 값이 들어가게 되니 반드시 `create()`를 통해 객체를 생성한다.
