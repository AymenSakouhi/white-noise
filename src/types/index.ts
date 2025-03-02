import { z } from 'zod'
import { contactSchema } from '@/schemas/contact'
import { loginSchema } from '@/schemas/login'
import { registerSchema } from '@/schemas/register'

export type User = {
  user: {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
    updatedAt: string
  }
}

export type SafeUser = Omit<User, 'password'>

export type ContactSchemaType = z.infer<typeof contactSchema>

export type loginSchemaType = z.infer<typeof loginSchema>

export type registerSchemaType = z.infer<typeof registerSchema>
