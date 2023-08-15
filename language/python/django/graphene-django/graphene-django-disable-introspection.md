---
title: graphene-django에서 Introspection 제거
tags:
    - graphql
    - graphene-django
publish: true
---

# graphene-django Disable Introspection

GraphQL에서는 기본적으로 Introspection이라는 쿼리/뮤테이션 가이드 문서를 제공한다.

이는 개발시엔 편하지만 운영 시에는 API 목록을 공개하는 것과 같으므로 제거해야한다.

## 설정에서 제거하는 방법

<https://docs.graphene-python.org/en/latest/execution/queryvalidation/#disable-introspection>

## 미들웨어에서 직접 제거하는 방법

```python
class DisableIntrospectionMiddleware:
    """
    This class hides the introspection.
    """

    def resolve(self, next, root, info, **kwargs):
        if info.field_name.lower() in ['__schema', '_introspection']:
            query = GraphQLObjectType(
                "Query", lambda: {"Hello": GraphQLField(GraphQLString, resolver=lambda *_: "World")}
            )
            info.schema = GraphQLSchema(query=query)
            return next(root, info, **kwargs)
        return next(root, info, **kwargs)
```

이후 설정에 graphene 미들웨어 등록

```python
GRAPHENE = {
    ...
    'MIDDLEWARE': [
        'path.to.middleware.DisableIntrospectionMiddleware',
        ...
    ],
    ...
}
```

상기와 같이 적용하면 Introspection 문서를 볼 때 Hello만 보이게 된다.

[참조링크](https://medium.com/@pkinuthia10/disabling-djanog-graphene-introspection-query-8042b341c675)
