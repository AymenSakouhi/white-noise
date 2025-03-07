import { fetcher } from '@/lib/fetcher'

type USER_DETAILS = {
  name: string
  email: string
  password: string
}

export const register = async (userDetails: USER_DETAILS) => {
  const { name, email, password } = userDetails
  const data = await fetcher({
    url: '/api/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      name,
      email,
      password,
    },
  })
  return data
}

export const login = async (userDetails: Omit<USER_DETAILS, 'name'>) => {
  const { email, password } = userDetails
  const data = (await fetcher({
    url: `/api/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })) as { token: string }
  localStorage.setItem('token', data?.token)
  return data
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  return await fetcher({
    url: `/api/profile`,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const logout = async () => {
  const token = localStorage.getItem('token')
  return await fetcher({
    url: '/api/logout',
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}
