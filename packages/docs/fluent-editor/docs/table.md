# 表格

通过配置 `better-table` 模块，可以开启表格功能，同时需要配置工具栏按钮 `better-table`。

:::demo src=demos/table.vue
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
