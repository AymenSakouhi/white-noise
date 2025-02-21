export const sanityCheck = async () => {
  const response = await fetch('/api/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = (await response.json()) || {
    status: 'backend not working',
  }
  return result
}
