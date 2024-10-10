import type { AnyFunction } from './type'

export interface IAdditionalToolItemData {
  name: string
  content: string
  icon: string
  handler: AnyFunction
}
