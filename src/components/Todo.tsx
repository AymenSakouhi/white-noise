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
      className="py-2 px-10 border-b border-black last:border-none flex items-center justify-between"
      key={todo.id}
    >
      <div className="flex items-center gap-4">
        <input
          className="cursor-pointer"
          type="checkbox"
          onChange={(e) => {
            const changeTask: EditStatus = {
              id: todo.id,
              status: e.target.checked ? 'COMPLETED' : 'PENDING',
            }
            statusMutation.mutate(changeTask)
          }}
        />
        <div className={`${todo.status === 'COMPLETED' && 'line-through'}`}>
          {isDisabled ? (
            <span>{todo.description}</span>
          ) : (
            <input
              type="text"
              value={todoDescription}
              onChange={(e) => {
                setTodoDescription(e.target.value)
              }}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {isDisabled ? (
          <CiEdit
            className="cursor-pointer"
            onClick={() => {
              setIsDisabled(!isDisabled)
            }}
          />
        ) : (
          <GiConfirmed
            className="cursor-pointer"
            onClick={() => {
              setIsDisabled(!isDisabled)
              const data: EditDescription = {
                id: todo.id,
                description: todoDescription,
              }
              descriptionMutation.mutate(data)
            }}
          />
        )}
        <GiCancel
          className="cursor-pointer"
          onClick={() => {
            deleteMutation.mutate(todo.id)
          }}
        />
      </div>
    </li>
  )
}

export default Todo
