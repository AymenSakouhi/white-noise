import { z } from 'zod'

export const userRegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(8),
  password: z.string().min(8),
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
