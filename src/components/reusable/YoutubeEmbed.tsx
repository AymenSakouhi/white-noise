import { FC, useRef, useState, useEffect, useMemo } from 'react'

type YouTubeEmbedProps = {
  videoId: string | undefined | null
}

const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const videoPLayTime = useRef(0)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const timevideoPassed: number = useMemo(
    () => videoPLayTime.current,
    // eslint-disable-next-line
    [videoPLayTime, timerRef.current],
  )

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        videoPLayTime.current += 1
      }, 1000)
    } else {
      clearTimeout(timerRef.current)
    }

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isPlaying])

  return (
    <div>
      <iframe
        // className="hidden"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying}&start=${timevideoPassed ?? 0}`}
        // src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={togglePlayPause}>{isPlaying ? `Pause` : `Play`}</button>
    </div>
  )
}

export default YouTubeEmbed
