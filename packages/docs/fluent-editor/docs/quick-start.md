# 快速开始

安装 Fluent Editor：

```shell
npm i @opentiny/fluent-editor
```

编写 html：

```html
<div id="editor">
  <p>Hello Fluent Editor!</p>
</div>
```

引入样式：

```css
@import '@opentiny/fluent-editor/style.css'
```

初始化 Fluent Editor 编辑器：

```javascript
import FluentEditor from '@opentiny/fluent-editor'

const editor = new FluentEditor('#editor', {
  theme: 'snow'
})
```
