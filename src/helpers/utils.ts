export const soundsAssets = import.meta.glob('@/assets/downloads/*', {
  eager: true,
})

export const converTime = (t) => {
  const timestamp = new Date(t)
  const minutes = timestamp.getMinutes()
  const seconds = timestamp.getSeconds()

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return formattedTime
}
