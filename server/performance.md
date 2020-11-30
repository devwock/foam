# Performance

1. JMeter 등으로 성능 측정, 부하 몰리는 곳 DB 쿼리 익스플레인 떠서 Full scan 여부 판단
2. 트랜잭션이 필요 없는 MySQL 테이블을 MyISAM으로 변경
3. graphene query optimizer 사용
4. MySQL Connector 갯수 설정, Resolution 설정, 많거나 적으면 성능 하락됨
5. Model에 Index 선정
6. nginX 도커 인스턴스 분리
7. top 찍어서 load average > 1인 애를 찾아서 분리해야할지 결정
8. 리눅스 Tcp 커넥션 close time 줄임
9. wsgi 갯수 설정 시 장고 프로세스 / 스레드 갯수 설정, 스레드 갯수는 거의 의미가 없음
10. 인스턴스 여러개 만들어서 로드밸런서 설정
11. 성능 유틸 (그라파나/로키) 사용
12. nginx 리스폰스 타임 로깅 옵션에 넣어서 검증