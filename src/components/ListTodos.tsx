import { getTodos } from '@/api/todos'
import { useQuery } from '@tanstack/react-query'

const ListTodos = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  if (isLoading) return <div>Loading ...</div>

  return (
    <ul className="col-span-full mx-12 mt-2 bg-slate-200 shadow-md rounded-lg p-4">
      {data?.todos.map((todo) => (
        <li
          className="p-2 border-b border-black last:border-none"
          key={todo.id}
        >
          {todo.description}
        </li>
      ))}
    </ul>
  )
}

export default ListTodos
