# @提醒

通过配置 `mention` 模块，可以开启@提醒功能。

`mention` 模块配置项：

```typescript
interface MentionOption {
  containerClass?: string;
  dataAttributes?: string[];
  defaultLink?: string;
  itemActiveClass?: string;
  itemKey: string;
  itemClass?: string;
  listClass?: string;
  listHideClass?: string;
  maxHeight?: number;
  mentionChar?: string;
  remove?: (data: any) => void;
  renderMentionItem?: (data: any) => HTMLElement;
  renderMentionText?: (data: any) => HTMLElement | string;
  search?: (term: string) => Promise<any[]>;
  searchKey: string;
  select?: (data: any) => void;
  target?: string;
}
```

:::demo src=demos/mention.vue
:::
