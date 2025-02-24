import { ChangeEvent, useState } from 'react'
// react-icons below
import { BsSoundwave } from 'react-icons/bs'
import { IconType } from 'react-icons'

import Layout from '@/components/reusable/Layout'
import WhiteNoisePlayer from '@/components/WhiteNoisePlayer'
import { soundsAssets } from '@/helpers/utils'
import { useAuth } from '@/components/AuthContext'
import Pomodoro from '@/components/Pomodoro'
import Tabs from '@/components/reusable/Tabs'
import AddYourNoise from '@/components/AddYourNoise'
import { useDebounce } from '@/components/hooks/useDebounce'
import { Input } from '@/components/ui/input'

import { sanityCheck } from '@/api/general'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

type Noise = {
  title: string
  Icon: IconType
  path: string
}

const whiteNoiseBlobs =
  Object.entries(soundsAssets)?.map(([path]) => {
    return {
      title: path?.split('/')?.pop()?.split('.')?.shift() || '',
      Icon: BsSoundwave,
      path,
    }
  }) || []

const App = () => {
  const { isLoading } = useQuery({
    queryFn: sanityCheck,
    queryKey: ['sanity'],
    staleTime: 24 * 60 * 60 * 1000,
  })

  const navigate = useNavigate()

  // white noises part
  const [searchValue, setSearchValue] = useState<string>('')
  // const [whiteNoiseArr, setWhiteNoiseArr] = useState<Noise[]>(whiteNoiseBlobs)
  const debouncedValue = useDebounce({
    value: searchValue,
    delay: 500,
  })
  // changing to derived value because we can filter directly on blobs
  // shout out to TIM for solution
  const whiteNoiseArr: Noise[] = debouncedValue
    ? whiteNoiseBlobs?.filter((noise: Noise) =>
        noise?.title?.includes(debouncedValue?.toString()),
      )
    : whiteNoiseBlobs

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // User Profile
  const currentUser = useAuth()

  if (isLoading) return <div>Loading</div>

  if (currentUser) {
    return (
      <Layout>
        <Pomodoro />
        <div className="col-span-full text-sky-200 text-2xl text-center">
          Choose your best combination
        </div>
        <div className="col-span-full">
          <Input
            className="text-white"
            type="text"
            value={searchValue}
            placeholder="Search your noises"
            onChange={handleInput}
            onBlur={handleInput}
          />
        </div>
        <div className="col-span-full max-h-[400px] overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-lg">
          {whiteNoiseArr &&
            whiteNoiseArr?.map((_) => (
              <WhiteNoisePlayer key={_.path} title={_.title} path={_.path} />
            ))}
        </div>
        <AddYourNoise />
      </Layout>
    )
  }

  navigate({
    to: '/login',
  })
}

export default App
