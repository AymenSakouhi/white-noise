import { deleteTodo, getTodos, updateTodoStatus } from '@/api/todos'
import { Todo } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GiCancel } from 'react-icons/gi'

const ListTodos = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  type EditStatus = Pick<Todo, 'status' | 'id'>

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

  if (isLoading) return <div>Loading ...</div>

  return (
    <ul className="col-span-full mx-12 mt-2 bg-slate-200 shadow-md rounded-lg p-4">
      {data?.todos.map((todo: Todo) => (
        <li
          className="py-2 px-10 border-b border-black last:border-none flex items-center justify-between"
          key={todo.id}
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              onChange={(e) => {
                const changeTask: EditStatus = {
                  id: todo.id,
                  status: e.target.checked ? 'COMPLETED' : 'PENDING',
                }
                statusMutation.mutate(changeTask)
              }}
            />
            <span
              className={`${todo.status === 'COMPLETED' && 'line-through'}`}
            >
              {todo.description}
            </span>
          </div>
          <GiCancel
            onClick={() => {
              deleteMutation.mutate(todo.id)
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export default ListTodos
