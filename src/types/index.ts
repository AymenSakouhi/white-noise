import { z } from 'zod'
import { contactSchema } from '@/schemas'

export type ContactSchemaType = z.infer<typeof contactSchema>
