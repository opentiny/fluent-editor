import type { QuillOptions } from 'quill'
import { IEditorModules } from './editor-modules.interface'
import { EditorFormat } from './type'
import { ScreenShotOptions } from '../../screenshot'

export interface IEditorConfig extends QuillOptions {
  format?: EditorFormat
  modules?: IEditorModules
  screenshotOnStaticPage?: boolean
  scrollingContainer?: HTMLElement | string | null
  // Custom Config to track all changes or only changes by 'user'
  trackChanges?: 'user' | 'all'
  autoProtocol?: boolean
  editorPaste?: any
  uploadOption?: {
    imageUploadToServer?: boolean
    imageAccept?: Array<string>[] | string
    fileAccept?: Array<string>[] | string
    isVideoPlay?: boolean
  }
  screenshot?: Partial<ScreenShotOptions>
}
