import { FC, useState } from 'react'

type YouTubeEmbedProps = {
  videoId: string | undefined | null
}

const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId }) => {
  const [autoPLay, setAutoPLay] = useState(false)

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPLay}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button
        onClick={() => {
          setAutoPLay(!autoPLay)
        }}
      >
        Play
      </button>
    </div>
  )
}

export default YouTubeEmbed
