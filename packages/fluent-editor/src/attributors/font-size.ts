import Quill from 'quill'

const Parchment = Quill.import('parchment')
export const SizeStyle = new Parchment.StyleAttributor('size', 'font-size', {
  scope: Parchment.Scope.INLINE,
})
