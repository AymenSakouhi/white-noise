// import useFetch from '@/components/hooks/useFetch'

type USER_DETAILS = {
  name: string | null
  email: string | null
  password: string | null
}

export const register = async (userDetails: USER_DETAILS) => {
  const { name, email, password } = userDetails
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  const result = (await response.json()) || []

  return result
}

export const login = async (userDetails: Omit<USER_DETAILS, 'name'>) => {
  const { email, password } = userDetails
  // eslint-disable-next-line
  const res: any = await fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  const json = await res.json()
  localStorage.setItem('token', json.token)
  return json
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')

  const res = await fetch(`/api/profile`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })

  const json = await res.json()
  return json
}

export const logout = async () => {
  const token = localStorage.getItem('token')
  const result = await fetch('/api/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  await result.json()
  localStorage.removeItem('token')
  // redirection
  window.location.href = '/login'
}
