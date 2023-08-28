type ImageOptions = {
  width?: number
  height?: number
}

export const imageResolver = (
  filename: string,
  {width = 0, height = 0}: ImageOptions = {},
) => {
  let result = filename + '/m'
  if (!width && !height) {
    return result
  }

  return result + `/${width}x${height}`
}

export const imageSrcSet = (filename: string, sizeList: number[]) => {
  return sizeList
    .map(size => `${imageResolver(filename, {width: size})} ${size}w`)
    .join(', ')
}
