type ImageOptions = {
  width?: number
  height?: number
}

type ImageDimensions = {
  width: number
  height: number
}

type ResolvedImage = {
  url: string
  dimensions: ImageDimensions
}

export const imageResolver = (
  filename: string,
  {width = 0, height = 0}: ImageOptions = {},
): ResolvedImage => {
  const dimensions = imageDimensions(filename)
  const url = filename + '/m'
  if (!width && !height) {
    return {url, dimensions}
  }

  const targetUrl = url + `/${width}x${height}`

  const aspectRatio = dimensions.width / dimensions.height
  const targetDimension = {
    width: width || Math.floor(height * aspectRatio),
    height: height || Math.floor(width / aspectRatio),
  }

  return {url: targetUrl, dimensions: targetDimension}
}

const imageDimensions = (filename: string): ImageDimensions => {
  const [w, h] = filename.split('/')[5].split('x')
  const width = parseInt(w) || 0
  const height = parseInt(h) || 0
  return {width, height}
}

export const imageSrcSet = (filename: string, sizeList: number[]) => {
  return sizeList
    .map(size => `${imageResolver(filename, {width: size}).url} ${size}w`)
    .join(', ')
}
