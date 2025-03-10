import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addTodo } from '@/api/todos'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TodoSchemaType } from '@/types'
import { TodoSchema } from '@/schemas/todo'

const AddTodo = () => {
  const QueryClient = useQueryClient()
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
      QueryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleTodo = (data: TodoSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleTodo)}
      className="col-span-full flex flex-col gap-4 p-4 mx-12 bg-slate-200 rounded-lg shadow-md"
    >
      <Input
        id="description"
        {...register('description')}
        type="description"
        placeholder="Add whatever to do...."
        required
        className="border-2 border-black"
      />
      {errors?.description?.message && (
        <p className="text-red-700 mb-4">{errors.description?.message}</p>
      )}
      <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white">
        ADD TO DO
      </Button>
    </form>
  )
}

export default AddTodo
