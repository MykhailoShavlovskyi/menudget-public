/**
 * Create image download from href
 * @param href - image href
 * @param fileName - downloaded file name
 */
export function downloadImage(href: string, fileName: string) {
  const link = document.createElement("a")
  link.download = `${fileName}.jpg`
  link.href = href
  link.click()
}

/**
 * Create image download with canvas render
 * @param canvas - target canvas element
 * @param fileName - downloaded file name
 */
export function downloadCanvasImage(canvas: HTMLCanvasElement, fileName: string) {
  const img = canvas.toDataURL("image/jpeg")
  downloadImage(img, fileName)
}
