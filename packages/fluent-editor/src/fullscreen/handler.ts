import type { FluentEditorToolbar } from '../config/types/editor-toolbat.interface'

let exitEscHandlerBindToolbar: (e: KeyboardEvent) => void
function exitEscHandler(toolbar: FluentEditorToolbar, e: KeyboardEvent) {
  if (e.code === 'Escape') {
    exitFullscreen(toolbar)
  }
}
function intoFullscreen(toolbar: FluentEditorToolbar) {
  toolbar.quill.isFullscreen = true
  toolbar.container.classList.add('fullscreen')
  toolbar.quill.container.classList.add('fullscreen')
  const toolbatRect = toolbar.container.getBoundingClientRect()
  toolbar.quill.container.style.setProperty('--top', `${toolbatRect.height}px`)
  document.documentElement.classList.add('scroll--lock')
  document.addEventListener('keydown', exitEscHandlerBindToolbar)
}
function exitFullscreen(toolbar: FluentEditorToolbar) {
  toolbar.quill.isFullscreen = false
  toolbar.container.classList.remove('fullscreen')
  toolbar.quill.container.classList.remove('fullscreen')
  document.documentElement.classList.remove('scroll--lock')
  document.removeEventListener('keydown', exitEscHandlerBindToolbar)
}
export function fullscreenHandler(this: FluentEditorToolbar) {
  if (this.quill.isFullscreen) {
    exitFullscreen(this)
  }
  else {
    exitEscHandlerBindToolbar = exitEscHandler.bind(undefined, this)
    intoFullscreen(this)
  }
}
