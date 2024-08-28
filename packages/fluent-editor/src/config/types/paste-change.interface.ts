import { AnyFunction } from './type';

export interface IPasteChange {
  files: File[]
  callback: AnyFunction
}
