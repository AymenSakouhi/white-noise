import { FC, useEffect, useState, useRef } from 'react'

type useDebounceProps = {
  value: string
  delay: number
}

export const useDebounce: FC<useDebounceProps> = ({ value, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}
