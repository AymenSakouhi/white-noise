import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: 'Length longer than 4',
  }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(8, { message: 'Minimum Length is 8 characters' }),
})
