# @提醒

通过输入 `@` 符号，可以触发提醒功能。

## 基本用法

通过配置 `mention` 模块，可以开启@提醒功能。

:::demo src=demos/mention.vue
:::

## 自定义列表样式

通过配置 `renderMentionItem` 方法，可以自定义选项列表的样式。

:::demo src=demos/mention-custom-list.vue
:::

## API

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
  renderMentionItem?: (data: any) => string | HTMLElement;
  renderMentionText?: (data: any) => string | HTMLElement;
  search?: (term: string) => Promise<any[]>;
  searchKey: string;
  select?: (data: any) => void;
  target?: string;
}
```
