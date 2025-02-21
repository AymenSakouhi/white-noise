import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import YouTubeEmbed from '@/components/reusable/YoutubeEmbed'
import { stripVideoId } from '@/helpers/utils'
import { useDebounce } from '@/components/hooks/useDebounce'
export type videoIdStripped = {
  value?: string | null
  error?: string
}

export type nullableString = null | undefined | string

const AddYourNoise = () => {
  const [yourNoise, setYourNoise] = useState<string>(
    'https://www.youtube.com/watch?v=UgHKb_7884o',
    // example of a youtube whitenoise video, please don't sue me
    // takeh from Cat Trumpet channel, subscribe to them if your read this
  )
  const [videoId, setvideoId] = useState<nullableString>('')
  const debouncedValue = useDebounce({ value: yourNoise, delay: 500 })
  const [error, setError] = useState<nullableString>('')

  const handleChange = () => {
    const { value: videoId, error }: videoIdStripped = stripVideoId(yourNoise)
    setError(error)
    setvideoId(videoId)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setYourNoise(value)
  }

  useEffect(() => {
    handleChange()
    // eslint-disable-next-line
  }, [debouncedValue])

  return (
    <div className="col-span-full w-full">
      <Input
        type="text"
        className="w-full text-white"
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
      <YouTubeEmbed videoId={videoId} />
    </div>
  )
}

export default AddYourNoise
