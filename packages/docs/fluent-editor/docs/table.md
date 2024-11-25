# 表格

通过配置 `better-table` 模块，可以开启表格功能，同时需要配置工具栏按钮 `better-table`。

:::demo src=demos/table.vue
:::

## 文本配置

可以通过`better-table`的 options 对显示文字进行修改，或者通过`i18n`的 options 进行修改（[i18n相关文本配置](https://opentiny.github.io/fluent-editor/docs/i18n)）。

`better-table`的 options 文本配置优先级更高，下面示例表格菜单子标题将会显示`'主题色2'`而非`'主题色1'`。

:::demo src=demos/table-text-options.vue
:::

`better-table` 模块配置项：

```typescript
interface IBetterTableOptions {
  operationMenu: {
    items: {
      copyCells: boolean | {
        text: string
      }
      copyTable: boolean | {
        text: string
      }
      cutCells: boolean | {
        text: string
      }
      emptyCells: boolean | {
        text: string
      }
      insertRowUp: boolean | {
        text: string
      }
      insertRowDown: boolean | {
        text: string
      }
      insertColumnLeft: boolean | {
        text: string
      }
      insertColumnRight: boolean | {
        text: string
      }
      mergeCells: boolean | {
        text: string
      }
      unmergeCells: boolean | {
        text: string
      }
      deleteRow: boolean | {
        text: string
      }
      deleteColumn: boolean | {
        text: string
      }
      deleteTable: boolean | {
        text: string
      }
    }
    color: boolean | {
      text: string
      colors: string[]
    }
  }
}
```
