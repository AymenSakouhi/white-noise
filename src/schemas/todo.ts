import { z } from 'zod'

export const TodoSchema = z.object({
  description: z.string().max(200, { message: 'This field has to be filled.' }),
})
