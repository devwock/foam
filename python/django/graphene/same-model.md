# 같은 모델 쓰는 Type 문제

## 이슈

```python
class InfluencerType(DjangoObjectType):
    class Meta:
        model = Influencer
        filterset_class = InfluencerFilter
        interfaces = (relay.Node,)
        connection_class = BaseConnection
        fields = "__all__"
    status = graphene.Field(InfluencerRoleStatusType)

class InfluencerCampaignType(DjangoObjectType):
    class Meta:
        model = Influencer
    nickname = graphene.String()
```

같은 모델을 사용하는 Type이 있을 경우 장고 런타임에서 model이 겹쳐, updateInfluencer를 할 때 Influencer ID를 넣으면 InfluencerCampaign ID를 넣으라고 에러가 발생한다.

## 해결책

메인 모델을 제외하고 다음과 같이 변경한다

```python
class InfluencerCampaignType(graphene.ObjectType):
    nickname = graphene.String()
```

`schema.py`에도 다음과 같이 변경한다.

```python
class CampaignsQueries(graphene.ObjectType):
    influencer_campaigns = graphene.List(InfluencerCampaignType, **get_filtering_args_from_filterset(InfluencerFilter, InfluencerCampaignType))

    def resolve_influencer_campaigns(self, info, *args, **kwargs):
        return InfluencerFilter(data=kwargs, queryset=Influencer.objects.all(), request=info.context).qs
```

`get_filtering_args_from_filterset(filter, type)`은 필터셋에서 args를 추출해준다. 이것을 리졸버로 넘겨서 받아준다.
리졸버에서는 `DjangoObjectType`에서 필터셋 초기화 하는 부분을 참고해서, 필터셋을 초기화하여 쿼리셋을 반환한다.

# 2. Same model type solve

Date: 2020-08-18

## Status

해결됨

## Context

UpdateInfluencer 뮤테이션을 테스트 하는 중, Influencer ID를 올바르게 입력했음에도 InfluencerCampaignType 아이디를 넣으라는 오류가 계속 발생  
버그를 확인해보니, Type의 Meta에서 같은 model을 사용할 경우 런타임에서 자동으로 resolver 만들 때 잘못 연결되는 문제가 있음 (@김주현)

## Decision

Type을 만들 때 DjangoObject 타입을 사용하지 말고 graphene.ObjectType을 사용할 것  
이 경우 Meta가 없기 때문에 resolver를 수동으로 만들어 줘야함.  
또한 리졸버에서 일일이 장고 필터를 적용하기 힘들기 때문에 이를 회피할 방법도 확인해야함.

`campaigns/types/campaign_types.py`
```python
class InfluencerCampaignType(DjangoObjectType):
    class Meta:
        model = Influencer

    nickname = graphene.String()
# 에서 다음으로 변경
class InfluencerCampaignType(graphene.ObjectType):
    nickname = graphene.String()

    @permission_required(IsAdminUser)
    def resolve_nickname(self, info):
        return self.nickname
```

`campaigns/schema.py`  
```python
class CampaignsQueries(graphene.ObjectType):
    influencer_campaigns = relay.ConnectionField(InfluencerCampaignConnection, **get_filtering_args_from_filterset(InfluencerFilter, InfluencerCampaignType))
    
    def resolve_influencer_campaigns(self, info, *args, **kwargs):
        return InfluencerFilter(data=kwargs, queryset=Influencer.objects.all(), request=info.context).qs
```

```python
class InfluencerCampaignConnection(Connection):
    class Meta:
        node = InfluencerCampaignType
```

## Consequences

### 동작 확인

- `updateInfluencer` 정상 동작 확인
- `queryInfluencerCampaign` 정상 동작 확인
