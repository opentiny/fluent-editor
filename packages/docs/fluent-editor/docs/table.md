# 表格

通过配置 `table-up` 模块，可以开启表格功能，同时需要配置工具栏按钮 `table-up`。

## 基础使用

:::demo src=demos/table-up-base.vue
:::

## 样式配置

通过配置`selection.tableMenu.contextmenu`为`false`来隐藏右键菜单，实现选中单元格后常驻显示工具栏

配置`resizerSetOuter`为`false`可直接拖动单元格的右边框或下边框进行单元格大小的改变

:::demo src=demos/table-up-style.vue
:::

## 修改 format 数据结构

可通过导出函数`updateTableConstants`对 format 名或内部使用到的部分变量进行修改

此函数需在编辑器初始化前执行, 且执行完成后需要重新注册模块

:::demo src=demos/table-up-override.vue
:::

## 配置

| 属性            | 描述                             | 类型             | 默认值  |
| --------------- | -------------------------------- | ---------------- | ------- |
| full            | 是否使表格占宽始终为 100%        | `boolean`        | `false` |
| resizerSetOuter | 是否使表格大小拖拽工具显示在外围 | `boolean`        | `true`  |
| customBtn       | 显示生成指定表格列宽输入按钮     | `boolean`        | `false` |
| selection       | table selection 配置项           | `TableSelection` | -       |

### TableSelection 配置

| 属性        | 描述              | 类型        | 默认值    |
| ----------- | ----------------- | ----------- | --------- |
| selectColor | 选择边框颜色      | `string`    | `#5170ff` |
| tableMenu   | table menu 配置项 | `TableMenu` | -         |

### TableMenu 配置

| 属性            | 描述                                    | 类型         | 默认值                  |
| --------------- | --------------------------------------- | ------------ | ----------------------- |
| localstorageKey | 已使用颜色在 localstorage 保存的 key 值 | `string`     | `__table-bg-used-color` |
| contextmenu     | 是否使用选中但单元格后右键唤起菜单      | `boolean`    | `true`                  |
| tipText         | 是否开启提示文字                        | `boolean`    | `true`                  |
| defaultColorMap | 显示的颜色组                            | `string[][]` | -                       |
| tools           | 菜单选项                                | `Tool[]`     | -                       |

<details>
  <summary> types </summary>

```ts
type Tool = ToolOption | ToolOptionBreak
interface ToolOption {
  name: string
  icon: string | ((tableModule: TableUp) => HTMLElement)
  tip?: string
  isColorChoose?: boolean
  handle: (tableModule: TableUp, selectedTds: TableCellInnerFormat[], e: Event | string) => void
}
interface ToolOptionBreak {
  name: 'break'
}
```

</details>

### better-table

由于 better-table 模块与 table-up 的数据结构不一致，所以无法进行数据迁移，但内部任然保留了 better-table 模块，如果你需要保留better-table 的功能，仍然可以在 modules 中配置 better-table 进行使用
