import { fetcher } from '@/lib/fetcher'

export const sanityCheck = () =>
  fetcher({
    url: '/api/status',
    headers: {
      'Content-Type': 'application/json',
    },
  })
