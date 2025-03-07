type TodoDetailsType = {
  description: string
}

export const addTodo = async (TodoDetails: TodoDetailsType) => {
  const token = localStorage.getItem('token')
  const { description } = TodoDetails
  // eslint-disable-next-line
  const res: any = await fetch(`/api/todos/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description,
    }),
  })
  const json = await res.json()
  return json
}
