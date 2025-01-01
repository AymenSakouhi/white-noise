import { useState, useEffect, ChangeEvent } from 'react'
import YouTubeEmbed from '@/components/reusable/YoutubeEmbed'
import { stripVideoId } from '@/helpers/utils'

const AddYourNoise = () => {
  const [yourNoise, setYourNoise] = useState<string>('')
  const [debouncedValue, setDebouncedValue] = useState<
    string | undefined | null
  >('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setYourNoise(value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      const videoId: string | undefined | null = stripVideoId(yourNoise)
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
