export function imgToBase64(imageUrl: string) {
  return new Promise<string>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imageUrl
    img.onload = function () {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.height = img.height
        canvas.width = img.width
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png', 1)
        resolve(dataURL)
      }
    }
    img.onerror = function () {
      reject(new Error(`Could not load image at ${imageUrl}`))
    }
  })
}
