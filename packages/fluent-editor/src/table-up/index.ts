import { TableUp as ImportTableUp } from 'quill-table-up'

export const OriginTableUp = ImportTableUp

export class TableUp extends OriginTableUp {
  static moduleName = 'table-up'
}

export * from 'quill-table-up'
export default TableUp
