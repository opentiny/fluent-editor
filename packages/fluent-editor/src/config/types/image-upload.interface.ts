import { AnyFunction } from './type';

export interface ImageUpload {
  file: File
  hasRejectedImage?: boolean
  callback: AnyFunction
}
