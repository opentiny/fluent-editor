import Quill from 'quill'

const Parchment = Quill.import('parchment')
export const LineHeightStyle = new Parchment.StyleAttributor('line-height', 'line-height', {
  scope: Parchment.Scope.INLINE,
})
