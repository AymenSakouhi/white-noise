type TodoDetailsType = {
  description: string
}
import { fetcher } from '@/lib/fetcher'

export const addTodo = async (TodoDetails: TodoDetailsType) => {
  const token = localStorage.getItem('token')
  const { description } = TodoDetails
  return fetcher<{ message: string }>({
    url: '/api/todos/add',
    method: 'POST',
    token,
    body: {
      description,
    },
  })
}

export const getTodos = async () => {
  const token = localStorage.getItem('token')
  return fetcher<{ todos: { description: string; id: string }[] }[]>({
    url: '/api/todos/',
    method: 'GET',
    token,
  })
}
