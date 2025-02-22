import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(8, {
    message: 'This field has to be filled',
  }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(8, { message: 'has to be filled' }),
})
