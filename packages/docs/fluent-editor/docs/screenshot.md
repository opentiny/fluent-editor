# 截屏

截屏功能依赖 [`html2canvas`](https://github.com/niklasvh/html2canvas)，请自行导入

初始化编辑器前请将变量 `Html2Canvas` 暴露在 `window` 上。模块化项目可将导入变量整体传入选项

:::demo src=demos/screenshot.vue
:::


## options

可传递 html2canvas 支持的配置选项, 具体请查看[官方文档](https://html2canvas.hertzen.com/configuration)

除 html2canvas 支持的配置选项外，还支持以下配置

| 名称                   | 类型                                                         | 说明                                                                                                                                 | 默认值 |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Html2Canvas            | `html2canvas`                                                | html2canvas 模块                                                                                                                     | -      |
| beforeCreateCanvas     | `() => void`                                                 | canvas 绘制前执行函数, 可在此阶段对页面 dom 进行处理                                                                                 | -      |
| beforeCreateImage      | `(canvas: HTMLCanvasElement) => HTMLCanvasElement \| string` | canvas 绘制完成后执行函数, 可通过返回字符串作为最终生成图片的 url 路径, 否则默认生成 base64 作为图片 url. 也可对 canvas 绘制进行调整 | -      |
| useCORS                | `boolean`                                                    | html2canvas 配置选项                                                                                                                 | `true` |
| foreignObjectRendering | `boolean`                                                    | html2canvas 配置选项                                                                                                                 | `true` |
