import { fetcher } from '@/lib/fetcher'
import type { SafeUser } from '@/types'

type USER_DETAILS = {
  name: string
  email: string
  password: string
}

export const register = async (userDetails: USER_DETAILS) => {
  const { name, email, password } = userDetails
  return fetcher<{ message: string }>({
    url: '/api/register',
    method: 'POST',
    body: {
      name,
      email,
      password,
    },
  })
}

export const login = async (userDetails: Omit<USER_DETAILS, 'name'>) => {
  const { email, password } = userDetails
  const data = await fetcher<{ token: string }>({
    url: `/api/login`,
    method: 'POST',
    body: {
      email,
      password,
    },
  })
  localStorage.setItem('token', data?.token)
  return data
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  return fetcher<{ user: SafeUser }>({
    url: `/api/profile`,
    method: 'POST',
    token,
  })
}

export const logout = async () => {
  const token = localStorage.getItem('token')
  return fetcher<{ message: string }>({
    url: '/api/logout',
    method: 'POST',
    token,
  })
}
