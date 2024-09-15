import Quill from 'quill'

const Parchment = Quill.import('parchment')
export const FontStyle = new Parchment.StyleAttributor('font', 'font-family', {
  scope: Parchment.Scope.INLINE,
})
