import 'react-h5-audio-player/lib/styles.css'

import AudioPLayer from 'react-h5-audio-player'
import { IconType } from 'react-icons'

type WhiteNoiseProps = {
  path: string
  title: string
  Icon?: IconType
}
const WhiteNoisePlayer: React.FC<WhiteNoiseProps> = ({ path, title }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-md">
      <img
        src="https://placebear.com/300/300"
        alt="bear placeholder image"
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
      </div>
      <AudioPLayer
        className="w-full mt-2"
        layout="stacked"
        showJumpControls={true}
        autoPlay={false}
        src={path}
        onPlay={() => {
          // shout out to Fira for the props lesson
          //eslint-disable-next-line
          console.log('wassup player')
        }}
      />
    </div>
  )
}

export default WhiteNoisePlayer
