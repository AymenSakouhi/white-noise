import { FC } from 'react'

type YouTubeEmbedProps = {
  videoId: string
}

const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed
