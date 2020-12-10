# List Filter

filter 걸 때 리스트 and/or를 검색하고 싶으면 다음과 같이 사용

```python
product_names = ast.literal_eval(value)
return queryset.filter(reduce(operator.or_, (Q(name__icontains=product_name) for product_name in product_names)))
```
