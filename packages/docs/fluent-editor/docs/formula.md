# 公式

## 基本用法

通过配置工具栏按钮 `formula`，可以开启插入公式功能。

默认公式功能是 Quill 内置的，依赖 `KaTeX`，需要安装 `katex` 依赖包，并引入对应的样式。

测试公式内容：e=mc^2

:::demo src=demos/formula.vue
:::

## 可编辑公式

默认的公式不可编辑，可以通过配置 `mathlive` 模块为 true，开启可编辑公式，可编辑公式基于 `mathlive`，公式格式为 `LaTeX`，开启 `mathlive` 公式后会覆盖 Quill 内置的 formula 功能。

`mathlive` 需要用户自行安装，安装后使用下面代码导入模块，并配置模块开启。

导入 `mathlive` 模块和样式：

```javascript
import 'mathlive'
import 'mathlive/static.css'
import 'mathlive/fonts.css'
```

配置 `mathlive` 模块和工具栏：

```json
{
  "theme": "snow",
  "modules": {
    "toolbar": ["formula"],
    "mathlive": true
  }
}
```

:::demo src=demos/formula-mathlive.vue
:::
