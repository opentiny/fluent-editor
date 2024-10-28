import type TypeSyntax from 'quill/modules/syntax'
import Quill from 'quill'

const Syntax = Quill.import('modules/syntax') as typeof TypeSyntax

// @dynamic
class CustomSyntax extends Syntax {
  static DEFAULTS: { hljs: any, interval: number, languages: { key: string, label: string }[] }
}

CustomSyntax.DEFAULTS = {
  hljs: (() => {
    // @ts-ignore
    return window.hljs
  })(),
  interval: 1000,
  languages: [
    { key: 'plain', label: 'Plain' },
    { key: 'bash', label: 'Bash' },
    { key: 'cpp', label: 'C++' },
    { key: 'cs', label: 'C#' },
    { key: 'css', label: 'CSS' },
    { key: 'diff', label: 'Diff' },
    { key: 'xml', label: 'HTML/XML' },
    { key: 'java', label: 'Java' },
    { key: 'javascript', label: 'Javascript' },
    { key: 'markdown', label: 'Markdown' },
    { key: 'php', label: 'PHP' },
    { key: 'python', label: 'Python' },
    { key: 'ruby', label: 'Ruby' },
    { key: 'sql', label: 'SQL' },
  ],
}

export default CustomSyntax
