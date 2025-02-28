import { getProfile } from '@/api/user'
import { queryOptions } from '@tanstack/react-query'

/**
 * This is so you can call all the query options in one place and not have to repeat yourself or forget to update shared options
 */
export const queryOpts = {
  userData: () =>
    queryOptions({
      queryFn: getProfile,
      queryKey: ['user'],
      staleTime: 24 * 60 * 60 * 1000,
    }),
}

