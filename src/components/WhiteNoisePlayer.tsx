import 'react-h5-audio-player/lib/styles.css'

import AudioPLayer from 'react-h5-audio-player'
import { IconType } from 'react-icons'
import { useState } from 'react'

type WhiteNoiseProps = {
  path: string
  title: string
  Icon?: IconType
  className?: string
}
const WhiteNoisePlayer: React.FC<WhiteNoiseProps> = ({
  path,
  title,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className={`${className} gap-4 p-4`}>
      <div
        className={`w-full max-w-md mx-auto p-4 ${isPlaying ? 'bg-emerald-700' : 'bg-slate-700'} rounded-2xl shadow-lg`}
      >
        <h2 className="text-white text-center text-lg font-semibold mb-2">
          {title}
        </h2>
        <AudioPLayer
          className="w-full border border-gray-700 rounded-lg"
          layout="stacked"
          showJumpControls={true}
          autoPlay={false}
          src={path}
          onPlay={() => {
            setIsPlaying(!isPlaying)
          }}
          onPause={() => {
            setIsPlaying(!isPlaying)
          }}
        />
      </div>
    </div>
  )
}

export default WhiteNoisePlayer
