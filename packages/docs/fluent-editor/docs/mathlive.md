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
