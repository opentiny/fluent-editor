# @提醒

通过配置 `mention` 模块，可以开启@提醒功能。

`mention` 模块配置项：

```typescript
interface IMentionOptions {
  itemKey: string,
  searchKey: string,
  search: (term: string) => object[]
}
```

:::demo src=demos/mention.vue
:::
