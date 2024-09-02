import { IToolbarItem } from './toolbar-item.interface'

export type ToolbarOption = string[][] | IToolbarItem[][]
export type EditorFormat = 'object' | 'json' | 'html' | 'text'
export type AnyFunction = (...args: any[]) => any
