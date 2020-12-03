# Excel Import

https://xlrd.readthedocs.io/en/latest/
사용한 excel 라이브러리

https://gitlab.com/uconnec/waveby-backend/-/wikis/%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88-%EC%BF%A0%ED%82%A4-VS-DB-%EC%9E%A5%EB%8B%A8%EC%A0%90
xlrd in memory loading

```graphql
mutation createBrandsByExcel($file: Upload!) {
  createBrandsByExcel(file: $file) {
    brands {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
```