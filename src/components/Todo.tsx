import { useState } from 'react'
import { GiCancel, GiConfirmed } from 'react-icons/gi'
import { CiEdit } from 'react-icons/ci'

import {
  deleteTodo,
  updateTodoDescription,
  updateTodoStatus,
} from '@/api/todos'
import { Todo as TodoType } from '@/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
type TodoProps = {
  todo: TodoType
}
const Todo = ({ todo }: TodoProps) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [todoDescription, setTodoDescription] = useState(todo.description)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  type EditStatus = Pick<TodoType, 'status' | 'id'>

  const statusMutation = useMutation({
    mutationFn: (data: EditStatus) => {
      const { id, status } = data
      return updateTodoStatus(id, status)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  type EditDescription = Pick<TodoType, 'description' | 'id'>
  const descriptionMutation = useMutation({
    mutationFn: (data: EditDescription) => {
      const { id, description } = data
      return updateTodoDescription(id, description)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
  return (
    <li
      className="py-3 px-6 border-b last:border-none flex items-center justify-between bg-gray-100 rounded-md shadow-md transition-all hover:bg-gray-200 box-border w-full"
      key={todo.id}
    >
      <div className="flex items-center gap-4 w-full">
        <input
          className="cursor-pointer size-5 accent-blue-500"
          type="checkbox"
          onChange={(e) => {
            const changeTask: EditStatus = {
              id: todo.id,
              status: e.target.checked ? 'COMPLETED' : 'PENDING',
            }
            statusMutation.mutate(changeTask)
          }}
        />
        {isDisabled ? (
          <span
            className={`text-lg ${todo.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-black'} text-wrap truncate max-w-[300px]`}
          >
            {todo.description}
          </span>
        ) : (
          <input
            className="bg-slate-300 boder border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            type="text"
            value={todoDescription}
            onChange={(e) => {
              setTodoDescription(e.target.value)
            }}
          />
        )}
      </div>
      <div className="flex gap-2">
        {isDisabled ? (
          <CiEdit
            className="cursor-pointer text-green-500 text-xl hover:text-green-600"
            onClick={() => {
              setIsDisabled((prev) => !prev)
            }}
          />
        ) : (
          <GiConfirmed
            className="cursor-pointer text-blue-500 text-xl hover:text-blue-600"
            onClick={() => {
              setIsDisabled((prev) => !prev)
              const data: EditDescription = {
                id: todo.id,
                description: todoDescription,
              }
              descriptionMutation.mutate(data)
            }}
          />
        )}
        <GiCancel
          className="cursor-pointer text-red-500 text-xl hover:text-red-600"
          onClick={() => {
            deleteMutation.mutate(todo.id)
          }}
        />
      </div>
    </li>
  )
}

export default Todo
