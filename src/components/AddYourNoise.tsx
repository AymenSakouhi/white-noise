import { useState, useEffect, ChangeEvent } from 'react'
import YouTubeEmbed from '@/components/reusable/YoutubeEmbed'
import { stripVideoId } from '@/helpers/utils'
export type videoIdStripped = {
  value?: string | null
  error?: string
}

const AddYourNoise = () => {
  const [yourNoise, setYourNoise] = useState<string>(
    'https://www.youtube.com/watch?v=UgHKb_7884o',
    // example of a youtube whitenoise video, please don't sue me
    // takeh from Cat Trumpet channel, subscribe to them if your read this
  )
  const [debouncedValue, setDebouncedValue] = useState<
    string | undefined | null
  >('')
  const [error, setError] = useState<string>('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setYourNoise(value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      const { value: videoId, error }: videoIdStripped = stripVideoId(yourNoise)
      if (!videoId && error) setError(error)
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
      <div>
        <span id="errorMessage" className="text-red-300">
          {error}
        </span>
      </div>
      <YouTubeEmbed videoId={debouncedValue} />
    </div>
  )
}

export default AddYourNoise
