# Multi Threading

1. 파이썬은 GIL의 보호로 멀티스레드를 해도 싱글 스레드와 속도면에서 이점이 없다. 자원의 보호를 위해 한번에 하나씩만 스레드를 실행한다.
2. GIL은 유저스레드에만 영향을 미치고 I/O 등 커널 레벨에는 문제가 없다.

https://lee-seul.github.io/python/2017/05/02/python-gil.html
https://dgkim5360.tistory.com/entry/understanding-the-global-interpreter-lock-of-cpython
파이썬은 태생적 한계로 CPU 코어를 하나밖에 쓸 수 없음.
https://blog.seowonjung.com/index.php/2018/05/30/1111