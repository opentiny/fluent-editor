import type Toolbar from 'quill/modules/toolbar'
import type { FluentEditor } from '../../fluent-editor'

export interface FluentEditorToolbar extends Toolbar {
  quill: FluentEditor
}
