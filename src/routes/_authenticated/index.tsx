import { createFileRoute } from '@tanstack/react-router'

import { ChangeEvent, useState } from 'react'
// react-icons below
import { BsSoundwave } from 'react-icons/bs'
import { IconType } from 'react-icons'

import Layout from '@/components/reusable/Layout'
import WhiteNoisePlayer from '@/components/WhiteNoisePlayer'
import { soundsAssets } from '@/helpers/utils'
import Pomodoro from '@/components/Pomodoro'
import AddYourNoise from '@/components/AddYourNoise'
import { useDebounce } from '@/components/hooks/useDebounce'
import { Input } from '@/components/ui/input'

import { searchSchema } from '@/schemas/searchWhiteNoise'
import { SearchSchemaType } from '@/types'

import { sanityCheck } from '@/api/general'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AddTodo from '@/components/AddTodo'
import ListTodo from '@/components/ListTodos'

type Noise = {
  title: string
  Icon: IconType
  path: string
  isPlaying?: boolean
  isVisible?: boolean
}

//TODO change the readability of whitenoises to be coming from backend
const whiteNoiseBlobs =
  Object.entries(soundsAssets)?.map(([path]) => {
    return {
      title: path?.split('/')?.pop()?.split('.')?.shift() || '',
      Icon: BsSoundwave,
      path,
      isVisible: true,
      isPlaying: false,
    }
  }) || []

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 300 })

  const { isLoading } = useQuery({
    queryFn: sanityCheck,
    queryKey: ['sanity'],
    staleTime: 24 * 60 * 60 * 1000,
  })

  const {
    register,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    mode: 'onTouched',
  })

  const whiteNoiseArray: Noise[] = debouncedSearchTerm
    ? whiteNoiseBlobs.map((noise: Noise) => {
        return {
          ...noise,
          isVisible: !!noise.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toString().toLowerCase()),
        }
      })
    : whiteNoiseBlobs

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (isLoading) return <div>Loading</div>

  return (
    <Layout>
      <Pomodoro />
      <h2 className="col-span-full text-2xl text-white text-center hover:bg-gray-800 mb-4">
        Add your Todo's here
      </h2>
      <AddTodo />
      <ListTodo />
      <h2 className="col-span-full text-sky-200 text-2xl text-center mt-4">
        Choose your best combination
      </h2>
      <form className="col-span-full">
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <Input
            className="text-gray-200 w-1/2 bg-slate-700/80"
            type="text"
            id="searchWhiteNoise"
            {...register('searchWhiteNoise')}
            placeholder="Search your noises"
            onChange={handleInput}
          />
          {errors?.searchWhiteNoise?.message && (
            <p className="text-red-700 mb-4">
              {errors.searchWhiteNoise?.message}
            </p>
          )}
        </div>
      </form>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 w-screen p-4 rounded-lg shadow-lg">
        {whiteNoiseArray?.map((_) => (
          <WhiteNoisePlayer
            key={_.path}
            title={_.title}
            path={_.path}
            className={_.isVisible ? 'block' : 'hidden'}
          />
        ))}
      </div>
      <AddYourNoise />
    </Layout>
  )
}
