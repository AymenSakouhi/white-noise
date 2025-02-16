// import useFetch from '@/components/hooks/useFetch'

type USER_DETAILS = {
  name: string | null
  email: string | null
}
/* export const createUser = (userDetails: USER_DETAILS) => {
  const { name, email } = userDetails
  const { data } = useFetch('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })

  return data
} */

export const createUserAsync = async (userDetails: USER_DETAILS) => {
  const { name, email } = userDetails
  const response = await fetch('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })
  const result = await response.json()

  return result
}
