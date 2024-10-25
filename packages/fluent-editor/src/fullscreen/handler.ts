import type { FluentEditorToolbar } from '../config/types'
import { namespace } from '../config'

let exitEscHandlerBindToolbar: (e: KeyboardEvent) => void
let resizeHandlerBindToolbar: () => void
function exitEscHandler(toolbar: FluentEditorToolbar, e: KeyboardEvent) {
  if (e.code === 'Escape') {
    exitFullscreen(toolbar)
  }
}
function updateToolbarHeight(toolbar: FluentEditorToolbar) {
  const toolbatRect = toolbar.container.getBoundingClientRect()
  toolbar.quill.container.style.setProperty(`--${namespace}-top`, `${toolbatRect.height}px`)
}
function intoFullscreen(toolbar: FluentEditorToolbar) {
  toolbar.quill.isFullscreen = true
  toolbar.container.classList.add('fullscreen')
  toolbar.quill.container.classList.add('fullscreen')
  document.documentElement.classList.add('scroll--lock')
  resizeHandlerBindToolbar()
  window.addEventListener('resize', resizeHandlerBindToolbar)
  document.addEventListener('keydown', exitEscHandlerBindToolbar)
}
function exitFullscreen(toolbar: FluentEditorToolbar) {
  toolbar.quill.isFullscreen = false
  toolbar.container.classList.remove('fullscreen')
  toolbar.quill.container.classList.remove('fullscreen')
  document.documentElement.classList.remove('scroll--lock')
  window.removeEventListener('resize', resizeHandlerBindToolbar)
  document.removeEventListener('keydown', exitEscHandlerBindToolbar)
}
export function fullscreenHandler(this: FluentEditorToolbar) {
  if (this.quill.isFullscreen) {
    exitFullscreen(this)
  }
  else {
    exitEscHandlerBindToolbar = exitEscHandler.bind(undefined, this)
    resizeHandlerBindToolbar = updateToolbarHeight.bind(undefined, this)
    intoFullscreen(this)
  }
}
