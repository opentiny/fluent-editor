# 公式

通过配置工具栏按钮 `formula`，可以开启插入公式功能。

由于插入公式依赖 `KaTeX`，需要安装 `katex` 依赖包，并引入对应的样式。

测试公式内容：e=mc^2

:::demo src=demos/formula.vue
:::

# mathlive公式

通过配置工具栏按钮 formula，可以开启插入公式功能。
mathlive公式的格式为LaTeX

模块配置

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
