type TodoDetailsType = {
  description: string
}
import { fetcher } from '@/lib/fetcher'
import { Todo } from '@/types'

export const getTodos = async () => {
  const token = localStorage.getItem('token')
  return fetcher<{ todos: Todo[] }>({
    url: '/api/todos/',
    method: 'GET',
    token,
  })
}

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

export const deleteTodo = async (todoId: string) => {
  const token = localStorage.getItem('token')
  return fetcher<{ message: string }>({
    url: `/api/todos/delete/${todoId}`,
    method: 'DELETE',
    token,
  })
}

type Status = Todo['status']
export const updateTodoStatus = async (todoId: string, status: Status) => {
  const token = localStorage.getItem('token')
  return fetcher<{ message: string }>({
    url: `/api/todos/status/${todoId}`,
    method: 'PATCH',
    token,
    body: {
      status,
    },
  })
}

type Description = Todo['description']
export const updateTodoDescription = async (
  todoId: string,
  description: Description,
) => {
  const token = localStorage.getItem('token')
  return fetcher<{ message: string }>({
    url: `/api/todos/description/${todoId}`,
    method: 'PATCH',
    token,
    body: {
      description,
    },
  })
}
