# 公式

在Fluent Editor中处理公式有两种方法

# quill原生公式（KaTeX）

通过配置工具栏按钮 `formula`，可以开启插入公式功能。

由于插入公式依赖 `KaTeX`，需要安装 `katex` 依赖包，并引入对应的样式。

测试公式内容：e=mc^2

:::demo src=demos/formula.vue
:::

# mathlive公式（LaTeX）

通过配置工具栏按钮 formula，可以开启插入公式功能。
mathlive公式的格式为`LaTeX`。`mathlive`需要用户自行安装，安装后使用下面代码导入模块，并配置模块开启

### 导入模块

```javascript
import 'mathlive'
import 'mathlive/static.css'
import 'mathlive/fonts.css'
```

### 模块配置

```json
{
  "theme": "snow",
  "modules": {
    "toolbar": ["formula"],
    "mathlive": true
  }
}
```

开启mathlive公式后会覆盖quill原生的formula功能

:::demo src=demos/mathlive.vue
:::
