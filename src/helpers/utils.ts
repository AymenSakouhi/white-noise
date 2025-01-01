import { videoIdStripped } from '@/components/AddYourNoise'

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

export const stripVideoId = (videoString: string): videoIdStripped => {
  const ytLinkRegex = new RegExp(
    '^(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/(?:[^\\/\\n\\s]+\\/\\S+\\/|(?:v|e(?:mbed)?)\\/|\\S*?[?&]v=)|youtu\\.be\\/)([A-Za-z0-9_-]{11})',
  )

  try {
    const isItYtURL = ytLinkRegex.test(videoString)
    const parsedUrl = new URL(videoString)
    if (parsedUrl.hostname === 'youtu.be') {
      const v = parsedUrl.pathname.slice(1)
      // For shortened links, the video ID is the pathname
      if (isItYtURL && v?.length !== 11) {
        throw new Error('issue with Youtube URL length')
      }
      return { value: parsedUrl.pathname.slice(1), error: '' }
    } else if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com'
    ) {
      const v = parsedUrl.searchParams.get('v')
      if (isItYtURL && v?.length !== 11) {
        throw new Error('issue with Youtube URL length')
      }
      return { value: parsedUrl.searchParams.get('v'), error: '' }
    }
  } catch (error) {
    return { error: `issue : ${error}`, value: '' }
  }

  return { value: '', error: '' }
}
