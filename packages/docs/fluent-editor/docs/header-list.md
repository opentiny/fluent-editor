# 标题列表

## 基本用法

创建一个元素用于存放标题列表，并将其传入`header-list`的`container`属性。

内部使用`scrollIntoView`方法，若页面存在 fixed 元素在顶部需要进行滚动 offset(比如此文档页面)，可以通过`onItemClick`回调中进行手动设置。

:::demo src=demos/header-list.vue
:::
