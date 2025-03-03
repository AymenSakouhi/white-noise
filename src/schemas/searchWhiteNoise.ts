import { z } from 'zod'

export const searchSchema = z.object({
  searchWhiteNoise: z
    .string()
    .max(16, { message: 'Make sure you dont query a planet' }),
})
