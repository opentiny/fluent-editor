# 快速开始

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
@import '@opentiny/fluent-editor/dist/style.css'
```

初始化 FluentEditor 编辑器：

```javascript
import FluentEditor from '@opentiny/fluent-editor'

const editor = new FluentEditor('#editor', {
  theme: 'snow'
})
```
