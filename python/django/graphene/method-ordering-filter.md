# Method Ordering Filter

```python
from django_filters import OrderingFilter
from django_filters.constants import EMPTY_VALUES

from waveby.util.case_converter import camel_to_underscore


class MethodOrderingFilter(OrderingFilter):

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', {})
        fields = self.normalize_fields(fields)
        field_labels = kwargs.pop('field_labels', {})
        self.method_map = kwargs.pop('field_methods', {})

        self.param_map = {v: k for k, v in fields.items()}

        if 'choices' not in kwargs:
            kwargs['choices'] = self.build_choices(fields, field_labels)

        kwargs.setdefault('label', ('Ordering'))
        kwargs.setdefault('help_text', '')
        kwargs.setdefault('null_label', None)
        super(MethodOrderingFilter, self).__init__(*args, **kwargs)

    def filter(self, qs, value):
        if value in EMPTY_VALUES:
            return qs
        ordering = [self.get_ordering_value(param) for param in value]
        if self.method_map is not None:
            for ordering_item in ordering:
                if ordering_item[0] == '-':
                    ordering_item = ordering_item[1:]
                snake_item = camel_to_underscore(ordering_item)
                method = self.method_map.get(snake_item)
                if method is not None:
                    qs = method(self, qs)
        return qs.order_by(*ordering)
```

```python
def queryset_approved_at(self, qs):
    return qs.annotate(
        approvedAt=Max(
            'status__status_status_histories__created_at',
            filter=Q(status__status_status_histories__name=const.STATUS_APPROVED)
        )
    )

order_by = MethodOrderingFilter(
    fields=(
        ('sold_amount', 'soldAmount'),
        ('sold_quantity', 'soldQuantity'),
        ('approved_at', 'approvedAt'),
    ),
    # 반드시 맵으로 사용할 것
    field_methods={
        'sold_amount': queryset_sold_amount,
        'sold_quantity': queryset_sold_quantity,
        'approved_at': queryset_approved_at,
    },
)
```