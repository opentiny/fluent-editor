import type { TableUpOptions } from 'quill-table-up'
import type { ToolbarOption } from './type'

export interface IEditorModules {
  [key: string]: any
  'clipboard'?:
    | {
      matchers?: any[]
      matchVisual?: boolean
    }
    | boolean
  'history'?:
    | {
      delay?: number
      maxStack?: number
      userOnly?: boolean
    }
    | boolean
  'keyboard'?:
    | {
      bindings?: any
    }
    | boolean
  'syntax'?:
    | {
      interval?: number
      languages?: { key: string, label: string }[]
      hljs?: any
    }
    | boolean
  'toolbar'?:
    | (string | string[] | Record<string, any>)[][]
    | ToolbarOption
    | string
    | {
      container?: string | string[] | ToolbarOption
      handlers?: {
        [key: string]: any
      }
    }
    | boolean
  'table-up'?: Partial<TableUpOptions>
}
