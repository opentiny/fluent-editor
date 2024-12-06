import Quill from 'quill'

const Parchment = Quill.import('parchment')
export const FontStyle = new Parchment.ClassAttributor('font', 'ql-font', {
  scope: Parchment.Scope.INLINE,
})
