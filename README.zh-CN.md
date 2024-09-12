# FluentEditor 富文本编辑器
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#-贡献者)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

FluentEditor 是一个基于 Quill 2.0 的富文本编辑器，在 Quill 基础上扩展了表格、图片、超链接、复制粘贴、插入表情、文件上传、@提醒、斜杆菜单等丰富的模块和格式，框架无关、兼容 Quill API、兼容 Quill 模块生态。

[English](README.md) | 简体中文

## 项目优势

FluentEditor 主要有以下特点和优势：

* 包含30多种丰富的模块和格式，除了 Quill 内置的21种格式之外，还扩展和增强了表格、图片、超链接、字数统计、表情、文件上传、复制粘贴、@提醒、斜杆快捷菜单、截图等15种模块和格式
* 强大的表格功能，支持在工具栏插入指定行列的表格、表格行高/列宽拖拽、插入行/列、删除行/列、合并/拆分单元格等丰富的表格操作
* 与框架无关，可以在 Vue、React、Angular 等多种框架中使用
* 兼容 Quill 所有 API，兼容 Quill 生态模块和格式

## 快速入门

安装 FluentEditor：

```shell
npm i @opentiny/fluent-editor
```

编写 html：

```html
<div id="editor">
  <p>Hello FluentEditor!</p>
</div>
```

引入样式：

```css
@import '@opentiny/fluent-editor/style.css'
```

初始化 FluentEditor 编辑器：

```javascript
import FluentEditor from '@opentiny/fluent-editor'
import '@opentiny/fluent-editor/style.scss'

const editor = new FluentEditor('#editor', {
  theme: 'snow'
})
```

## 本地开发

```shell
git clone git@github.com:opentiny/fluent-editor.git
cd fluent-editor
pnpm i
pnpm dev
```

打开浏览器访问：[http://localhost:5173/fluent-editor/](http://localhost:5173/fluent-editor/)

## ✨ 贡献者

贡献者是在 OpenTiny 社区中合并了 1 个或多个 PR 的社区成员。

感谢以下 OpenTiny 的贡献者们 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zzxming"><img src="https://avatars.githubusercontent.com/u/74341337?v=4?s=100" width="100px;" alt="zzxming"/><br /><sub><b>zzxming</b></sub></a><br /><a href="https://github.com/opentiny/fluent-editor/commits?author=zzxming" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## ❤️ 致谢

感谢：

- [quill](https://github.com/slab/quill) 项目，它是一款API驱动的富文本编辑器，采用模块化架构，可扩展性好，易于使用，支持跨平台，FluentEditor 基于 Quill 扩展和增强了表格、图片、超链接等大量模块和格式。
- [quill-better-table](https://github.com/soccerloway/quill-better-table) 项目，它增强了 Quill 内置表格模块，增加了丰富的功能，FluentEditor 的表格操作功能基于 quill-better-table。
- [quill-emoji](https://github.com/contentco/quill-emoji) 项目，它是一个用于表情符号的 Quill 模块，FluentEditor 的插入表情功能基于 quill-emoji。
- [quill-blot-formatter](https://github.com/Fandom-OSS/quill-blot-formatter) 项目，它是一个用于调整图像和视频大小的 Quill 模块，FluentEditor 的图片缩放功能基于 quill-blot-formatter。

## License

[MIT](LICENSE)
