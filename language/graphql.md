---
title: GraphQL
tags:
    - language
publish: true
---

# GraphQL

해당 평가는 [graphene-django](https://github.com/graphql-python/graphene-django) 기준으로 사용되었으므로 타 언어/프레임워크 사용 시 달라질 수 있다.

## 장점

### 조회 API 구성이 매우 빠름

- 특정 테이블의 Type을 지정해두면 해당 테이블과 연관이 있는 모든 곳에서 해당 타입을 사용할 수 있다.
  - 간단히 말해 모든 테이블에 DRF의 ModelSerializer를 설정해두고 다른 Serializer에서 전부 연결시켜 두었다고 생각하면 된다.
- 이로 인해 기능 추가가 되더라도 조회 API에서 백엔드 작업이 아예 없을수도 있다.
- 또한 이 기능은 Mutation에서도 동일하게 작동하므로 요청과 조회를 한꺼번에 할 수 있다.

### Introspection으로 API 스펙 문서가 자동으로 구성됨

- 상용에서는 Introspection을 오버라이드하여 제거 가능하다.
- [라이브러리에서 disable도 지원](https://docs.graphene-python.org/en/latest/execution/queryvalidation/#disable-introspection)

### 필요한 필드만 요청할 수 있음

- 쿼리를 잘 짤 경우, 필요한 필드만 요청하여 불필요한 DB 조회를 하지 않을 수 있다.

### 엔드포인트가 하나

- 엔드포인트가 `/graphql` 하나이므로 단일 엔드포인트만 관리하면 된다.

### 각 edge별 필터링 가능

- 각 edge에서 필터를 걸 수 있어 클라이언트에서 원하는 데이터를 한번에 요청할 수 있다.

## 단점

### 프론트엔드 부담이 커짐

- 프론트엔드에서 요청을 한 번에 끝내려고 무리하게 Depth를 파고들어가 값을 가져오는 경우가 생긴다.
- 쿼리를 최대한 돌려쓰려고 하다가 지나치게 거대한 쿼리를 요청하는 경우도 왕왕 발생한다.
- Type간 관계를 잘 숙지하지 못하면 어떤 필드를 어디서 가져와야할 지 모르기 때문에 무리한 쿼리를 만들기 쉽다.

### DB에 강하게 결합됨

- 관계가 DB 위주로 결합되므로 관계를 편집하려면 노가다가 심해진다.

### 지연시간이 길어짐

- graphene-django 문제일 것 같은데, 로컬에서 테스트 하더라도 simple query에 50ms가 나오게 된다.
- 자세히 분석해보진 않았지만 쿼리 파싱 후 데이터 구성하는데 시간이 많이 걸리는 것으로 보이며, REST로 구성하면 동일 작업이라도 5ms정도 걸리는 것을 확인하였다.

### 복잡한 SQL를 요청하기 쉬움

- 프론트엔드에서 쿼리를 복잡하게 요청할 경우 JOIN이 과도하게 걸려서 Raw 쿼리가 상당히 더럽게 나온다.

### 최적화가 힘듦

- 쿼리 요청을 전적으로 프론트엔드에 맡기기 때문에 백엔드에서 쿼리 최적화를 하기 쉽지 않다.

### n+1 문제가 발생하기 매우 쉬움

- 커스텀 필드가 있으면 item 갯수 * 쿼리를 요청하게 된다. 이는 Serializer 사용시에도 발생할 수 있지만, GraphQL 쿼리 주도권이 프론트엔드에게 있어 발생하기 매우 쉽다.
- 특히 edge-node로 구성되는 M2M관계나 역참조 관계에서 매우 쉽게 발생한다.
- 해당 부분에 대해 많은 GraphQL 사용자가 문제점이라 말하고 있다.
- `Apollo`에서 만든 js용 라이브러리에서는 해결 방법이 있다는데 확인해보지는 않았다.

### 스키마 변경이 광역으로 일어남

- Type이 서로 관계를 갖기 때문에, 한 곳의 Type을 추가/수정/삭제할 경우 해당 Type과 관계가 있는 모든 쿼리가 영향을 받는다.
- 특히 필드 삭제, 이름 변경을 할 경우 해당 필드를 쓰는 모든 쿼리를 점검해봐야한다.

### 단점: 엔드포인트가 하나

- REST와 구조가 상당히 다르기 때문에 기존의 많은 측정/관리 라이브러리를 사용할 수 없다.  특히 APM 도구의 경우 베타거나 기능이 부실한 경우가 생긴다. (예: Datadog의 경우 많은 옵션이 사용 불가하다)
- 문제가 발생했을 때 로그를 잘 쌓지 않으면 디버깅이 힘들다
  - 엔드포인트가 전부 graphql이라 단순 요청만 봐서는 어느 요청인지 알기가 힘들기 때문에 Body를 파싱해야한다.
- 권한 설정을 엔드포인트로 할 수 없음
  - 각 Type, Field, Mutation별로 권한 설정을 따로 해야한다.

### 에러 정책이 다름

- GraphQL 권장으로, 통신 구간에 문제가 없으면 HTTP 응답 코드는 무조건 200이 된다.
- 즉, Status code는 200인데 내부 응답 코드는 404 NOT FOUND가 발생할 수 있다.
- 이로 인해 REST와 혼합하여 사용하는 경우 에러처리 로직을 다르게 가져가야한다.

### 개발 테스트 도구 선택의 폭이 좁음

- 흔하디 흔한 REST 테스트 도구와 달리 정식으로 GraphQL을 지원하는 툴이 생각보다 몇 개 없다. 물론 기존 REST 클라이언트로도 요청을 보낼 수 있지만 상당히 불편하다.
- GraphQL 테스트 도구는 하단 [테스트 클라이언트 목록](#테스트-클라이언트-목록) 참조

### 프레임워크 수명

- graphene-django 라이브러리가 [죽었다.](https://github.com/graphql-python/graphene-django/issues/1324) 최근 그래도 3.0 발표하고 다시 활동을 재개한 듯 싶다.
- 대안으로는 [Strawberry Graphql](https://github.com/strawberry-graphql/strawberry)가 있으나 프로젝트가 충분히 성숙하지 않았다.

## 단점의 해결 방법

### DB 반정규화

- DB를 반정규화해 JOIN 쿼리가 너무 복잡하게 나가는 것을 방지한다.

### 캐시

- 캐시를 두어 잘 변경되지 않는 데이터에 대해 캐시에서 가져갈 수 있도록 한다.

### 자주 요청되는 관계에 대한 annotation, subquery 사용

- 장고의 annotation과 subquery를 통해 쿼리가 그때그때 Resolver에서 발생하는게 아닌, 가져올 때 한번에 가져올 수 있도록 조치한다.

### select_related, prefetch_related

- 쿼리 사전 평가나 관계 있는 리졸버에 select_related와 prefetch_related를 넣어 쿼리 최적화를 한다.

### Raw query

- 최악의 경우 Raw SQL 쿼리를 사용한다.

### Depth 제한

- 쿼리를 사전 평가해 일정 깊이 이상 [Depth를 요청하지 못하도록 한다.](https://docs.graphene-python.org/en/latest/execution/queryvalidation/)

### 쿼리 복잡도 평가

- 쿼리를 사전 평가해 쿼리 복잡도가 일정 이상 넘어갈 경우 거절한다.
- 이 경우 평가 방식에 따라, 혹은 비즈니스에 따라 충분히 요청 가능한 쿼리도 반려될 수 있다. 
- <https://blog.devgenius.io/a-principled-approach-to-graphql-query-cost-analysis-8c7243de42c1>
- <https://arxiv.org/abs/2009.05632>

### DataLoader 사용

- [파이썬의 DataLoader를 사용하여](https://docs.graphene-python.org/en/latest/execution/dataloader/) 동일 데이터에 대해 DB를 다시 요청하지 않도록 한다.

### graphene-django-optimizer 사용

- 서드파티 라이브러리인 [graphene-django-optimizer](https://github.com/tfoxy/graphene-django-optimizer)를 사용하여 최적화한다.

## 보안

- 보안에 신경쓰지 않으면 하나의 모델에서 전체 데이터 접근 가능하다.
- 극단적인 예로 단순 상품 후기에서부터 전체 유저 테이블을 조회할수도 있다. 따라서 모든 관계에 대해 권한 체크를 해야함.

### 쿼리 사전 평가

- 상기 [Depth 제한](#depth-제한)과 [쿼리 복잡도 평가](#쿼리-복잡도-평가) 참조

### 리졸버 제거

- 리졸버가 DB 관계로 인해 자동으로 구성되어 역으로 파고들어가지 못하게 리졸버를 제거하거나 빈 값을 준다.

### Rate limit

- 복잡한 쿼리를 자주 반복하지 못하도록 Rate limit를 둔다.

### Whitelist

- 모든 쿼리를 등록해서 쓰는 방식으로 Airbnb가 쓰고있다고 하나, 관리 포인트가 생기게 되고 사실상 REST와 다름 없어진다.
- [37페이지 참조](https://deview.kr/data/deview/session/attach/GraphQL%E1%84%8B%E1%85%B5_%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A7%E1%84%8B%E1%85%A9%E1%86%AB_%E1%84%8B%E1%85%A6%E1%84%8B%E1%85%A5%E1%84%87%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%AB%E1%84%87%E1%85%B5_%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3_%E1%84%80%E1%85%B5%E1%84%89%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B4_%E1%84%87%E1%85%A7%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A1_1106.pdf)

## 팁

### 테스트 클라이언트 목록

- [GraphiQL](https://github.com/graphql/graphiql): graphene-django 기본 내장
- [GraphQL Playground](https://github.com/graphql/graphql-playground): Apollo 제작, 프로젝트 내장 가능, Introspection이 이쁘게 나옴
- [Postman](https://learning.postman.com/docs/sending-requests/graphql/graphql-http/)
- [Altair GraphQL Client](https://altairgraphql.dev/): 강력 추천. 유일하게 파일 업로드 가능, Collection 제작, Import, Export 가능, 플러그인 지원, 환경변수 사용 가능

## 참조

- <https://spec.graphql.org/>
- <https://graphql.org/learn/>
