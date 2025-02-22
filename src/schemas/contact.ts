import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'This field has to be filled.' }),
  secondName: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  message: z.string().min(1, { message: 'has to be filled' }),
})
