import { getTodos } from '@/api/todos'
import { useQuery } from '@tanstack/react-query'
import TodoDetail from '@/components/Todo'
import { Todo } from '@/types'

const ListTodos = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  if (isLoading) return <div>Loading ...</div>

  return (
    <ul className="col-span-full mx-12 mt-2 bg-slate-200 shadow-md rounded-lg p-4">
      {data?.todos?.map((todo: Todo) => (
        <TodoDetail todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}

export default ListTodos
