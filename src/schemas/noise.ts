import { z } from 'zod'

export const uploadNoiseSchema = z.object({
  whiteNoiseFile: z
    .any()
    .refine((file) => file instanceof File || (file && file.length > 0), {
      message: 'Please upload a file',
    }),
})

export type uploadNoiseSchemaType = z.infer<typeof uploadNoiseSchema>
