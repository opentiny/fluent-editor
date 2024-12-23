# 图片上传

## 基本用法

通过配置工具栏按钮 `image`，可以开启图片上传功能，图片支持等比放大/缩小。

:::demo src=demos/image-upload.vue
:::

## 多图片上传

配置 `uploadOption.multi` 可以开启多图片上传功能。

:::demo src=demos/image-upload-multi.vue
:::

## 上传到服务器

配置 `uploadOption.imageUpload` 可以将图片上传到服务器，并将服务器返回的图片 URL 渲染到编辑器中。

:::demo src=demos/image-upload-to-server.vue
:::

## 上传选项

通过 `uploadOption` 属性可以配置文件格式、文件大小、上传成功和失败的回调等选项。

以下示例配置了仅允许上传 `image/png` 和 `image/gif` 两种格式的图片，并且图片大小不能超过 1MB。按 F12 打开控制台可以查看上传结果信息。

:::demo src=demos/image-upload-option.vue
:::

## 上传前钩子函数

`uploadOption.imageUpload` 除了配置图片上传到服务器，还可以做一些图片上传前的校验，给用户提供了更大的灵活性。

以下示例配置了不允许上传 `image/gif` 格式的图片，并且图片大小不能超过 1MB。按 F12 打开控制台可以查看上传结果信息。

:::demo src=demos/image-upload-before-upload.vue
:::

## API

`uploadOption` 类型：

```typescript
interface uploadOption {
  imageUpload?: ({ file: File, callback, editor }) => void
  imageAccept?: string[] | string
  maxSize?: number
  success?: (file: File) => void
  fail?: (file: File) => void
}
```
