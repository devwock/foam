---
title: GraphQL
summary: 
categories:
    - 
tags:
    - service
publish: true
---
# GraphQL

## 장점

- 모든 조회 API 필드를 한번 설정해 놓으면 자동으로 구성해줌
  - 이후 클라이언트의 쿼리에 대해 계속 추가해줄 필요 없음
  - 개발 스펙이 변경되더라도 백엔드 작업이 아예 없을수도 있음
- introspection으로 매뉴얼이 자동으로 구성됨
  - 상용에서는 introspection을 오버라이드하여 보안을 지킴

## 단점

### 속도

- `graphene-django` 문제일 것 같은데, 로컬에서 테스트 하더라도 simple query에 50ms가 나오게 됨
  - 쿼리 파싱 후 데이터 구성하는데 시간이 많이 걸리는 것으로 보임
  - REST로 구성하면 동일 작업이라도 5ms정도 걸림

### 데이터베이스

- 클라이언트에서 복잡하게 요청할 경우 JOIN이 과도하게 걸려서 쿼리가 상당히 더럽게 나옴
  - 반정규화
  - 캐시
  - 자주 요청되는 관계에 대한 `annotation`
  - `select_related`
  - `prefetch_related`
  - raw query도 일부 고려했음
- n+1 문제가 발생함
- 별도로 요청하는 필드가 있으면 `resolver`를 설정해 줘야하는데, item 갯수 * 쿼리를 요청하게 됨
  - 해당 부분에 대해 많은 GraphQL 사용자가 문제점이라 말하고 있었음
  - `Apollo`에서 만든 `node.js`용 라이브러리에서는 해결 방법이 있다는데 확인해보지는 않았음

### 유지보수

- 많은 백엔드 측정 도구를 사용할 수 없음. DB 쿼리를 측정해주는 유틸 등
- 문제가 발생했을 때 로그를 잘 쌓지 않으면 디버깅이 힘듦
  - 엔드포인트가 전부 graphql이라 단순 요청만 봐서는 어느 요청인지 알기가 힘듦
  - 이후 query/mutation 문은 로그를 찍게 했으나, variables는 민감 정보가 많아 찍을수 없었음
  - APM으로 보완 가능 하지만, `datadog`이나 `sentry`등 많은 APM 도구에서 GraphQL 지원이 미약함
- 클라이언트에서 쿼리를 요청하는 방식이기 때문에 클라이언트 개발자가 신경쓰지 않으면 과도한 쿼리가 요청됨
  - 너무 심할 경우 timeout이 발생

### 보안

- 보안에 신경쓰지 않으면 하나의 모델에서 전체 데이터 접근 가능. 극단적인 예로 단순 상품 후기에서부터 전체 유저 테이블을 조회할수도 있음
  - 헤더 인증
  - 리졸버 권한 체크: 모든 관계 리졸버 권한 체크를 해야하는데, 인증 코스트 + 장고의 장점이 퇴색해서 일부 필드만 설정
  - 쿼리 사전 필터링
  - 쿼리 복잡도 평가: 클라이언트에서 이미 복잡하게 사용하는 곳이 있음
    - 해당 부분은 일정이 충분했다면 한 번에 요청할 쿼리를 여러번 쪼개서 요청하는 방식이 좋을것 같음
    - <https://blog.devgenius.io/a-principled-approach-to-graphql-query-cost-analysis-8c7243de42c1>
    - <https://arxiv.org/abs/2009.05632>
  - rate limit: 관리자와 쿼리를 같이 쓰기 때문에 불가
  - depth limit: 클라이언트에서 3 depth 이상 사용하는 곳이 있음
  - whitelist: Airbnb가 쓰고있다고 하나, 관리 포인트가 생기게 되고 사실상 REST와 다름 없어져 제외

## 참조

- <https://spec.graphql.org/>
- <https://graphql.org/learn/>
