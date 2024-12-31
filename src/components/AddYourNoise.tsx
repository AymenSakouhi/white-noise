import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  MouseEventHandler,
} from 'react'
import YouTubeEmbed from './reusable/YoutubeEmbed'

const AddYourNoise = () => {
  const [yourNoise, setYourNoise] = useState<string>('')
  const [debouncedValue, setDebouncedValue] = useState('')
  // const youtube = useRef<HTMLIFrameElement | null>(null)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setYourNoise(value)
  }

  /* const handleCustomPlay = (e: MouseEventHandler<HTMLButtonElement>) => {
    if (debouncedValue) {
      console.log('there is a vid to play')
      youtube.current?.click()
    }
  } */

  useEffect(() => {
    const handler = setTimeout(() => {
      const videoId: string = yourNoise.split('=').pop()!
      console.log(videoId)
      setDebouncedValue(videoId)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [yourNoise])

  return (
    <div className="col-span-full w-full">
      <input
        type="text"
        className="w-full"
        placeholder="Place here your favorite whitenoise track from youtube"
        value={yourNoise}
        onBlur={handleInput}
        onChange={handleInput}
      />
      <YouTubeEmbed videoId={debouncedValue} />
    </div>
  )
}

export default AddYourNoise
