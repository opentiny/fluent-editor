import Quill from 'quill'

const Parchment = Quill.import('parchment')
export const TextIndentStyle = new Parchment.StyleAttributor('text-indent', 'text-indent', {
  scope: Parchment.Scope.BLOCK,
})
