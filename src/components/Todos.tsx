import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addTodo } from '@/api/todos'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type TodoSchemaType = {
  description: string
}

const TodoSchema = z.object({
  description: z.string().max(200, { message: 'This field has to be filled.' }),
})

const Todos = () => {
  // const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: TodoSchemaType) => {
      const { description } = data
      return addTodo({ description })
    },
    onSuccess: () => {
      console.log('done adding todo')
      // should probably limit to query key 'user'
      // queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleTodo = (data: TodoSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleTodo)}>
      <Input
        id="description"
        {...register('description')}
        type="description"
        placeholder="m@example.com"
        required
      />
      {errors?.description?.message && (
        <p className="text-red-700 mb-4">{errors.description?.message}</p>
      )}
      <Button type="submit">ADD TO DO</Button>
    </form>
  )
}

export default Todos
