import type { AnyFunction } from './type'

export interface ICounterOption {
  format?: 'text' | 'html'
  unit?: 'word' | 'char'
  count?: number
  template?: string | AnyFunction
  errorTemplate?: string | AnyFunction
}
