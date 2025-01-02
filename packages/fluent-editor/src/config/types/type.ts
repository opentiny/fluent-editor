import type { IToolbarItem } from './toolbar-item.interface'

export type ToolbarOption = (string[] | IToolbarItem[] | string | IToolbarItem)[]
export type EditorFormat = 'object' | 'json' | 'html' | 'text'
export type AnyFunction = (...args: any[]) => any
export type Constructor<T = any, U extends Array<any> = any[]> = new (...args: U) => T
