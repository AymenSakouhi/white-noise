export const soundsAssets = import.meta.glob('@/assets/downloads/*', {
  eager: true,
})

export const converTime = (t: number) => {
  const timestamp = new Date(t)
  const minutes = timestamp.getMinutes()
  const seconds = timestamp.getSeconds()

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return formattedTime
}

export const stripVideoId = (videoString: string) => {
  const ytLinkRegex = new RegExp(
    '^(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/(?:[^\\/\\n\\s]+\\/\\S+\\/|(?:v|e(?:mbed)?)\\/|\\S*?[?&]v=)|youtu\\.be\\/)([A-Za-z0-9_-]{11})',
  )
  const isItYtURL = ytLinkRegex.test(videoString)

  if (!isItYtURL) return

  const parsedUrl = new URL(videoString)
  if (parsedUrl.hostname === 'youtu.be') {
    // For shortened links, the video ID is the pathname
    return parsedUrl.pathname.slice(1)
  } else if (
    parsedUrl.hostname === 'www.youtube.com' ||
    parsedUrl.hostname === 'youtube.com'
  ) {
    // For standard links, get the `v` parameter
    return parsedUrl.searchParams.get('v')
  }
}
