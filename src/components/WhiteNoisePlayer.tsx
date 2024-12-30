import { useState, useRef } from 'react'
import { IconType } from 'react-icons'

type WhiteNoiseProps = {
  path: string
  title: string
  Icon: IconType
}
const WhiteNoisePlayer: React.FC<WhiteNoiseProps> = ({ path, title, Icon }) => {
  const [isPlaying, setisPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef?.current?.play()
    }
    setisPlaying(!isPlaying)
  }

  return (
    <div>
      <div className="my-2 flex flex-col items-center justify-center gap-1">
        <div className="text-zinc-200 text-2xl text-ellipsis">{title}</div>
        <Icon color={'gold'} size={40} />
        <div>
          <button
            className="bg-gray-300 hover:text-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={togglePlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <audio ref={audioRef} loop>
            <source src={path} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  )
}

export default WhiteNoisePlayer
