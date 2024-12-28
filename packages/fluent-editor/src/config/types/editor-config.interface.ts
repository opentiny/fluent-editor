import type { QuillOptions } from 'quill'
import type { ScreenShotOptions } from '../../screenshot'
import type { IEditorModules } from './editor-modules.interface'
import type { EditorFormat } from './type'

export interface IEditorConfig extends QuillOptions {
  format?: EditorFormat
  modules?: IEditorModules
  screenshotOnStaticPage?: boolean
  scrollingContainer?: HTMLElement | string | null
  // Custom Config to track all changes or only changes by 'user'
  trackChanges?: 'user' | 'all'
  // Auto protocol for link
  autoProtocol?: boolean | string
  editorPaste?: any
  uploadOption?: {
    imageUpload?: ({ file, callback, editor }) => void
    imageAccept?: Array<string>[] | string
    fileAccept?: Array<string>[] | string
    fileUpload: ({ file, callback, editor }) => void
    isVideoPlay?: boolean
    maxSize?: number
    success?: (file: File) => void
    fail?: (file: File) => void
    multiple?: boolean
  }
  screenshot?: Partial<ScreenShotOptions>
  i18n?: {
    lang?: string
    langText?: Record<string, string>
  }
}
