import type { AnyFunction } from './type'

export interface IPasteChange {
  files: File[]
  callback: AnyFunction
}
