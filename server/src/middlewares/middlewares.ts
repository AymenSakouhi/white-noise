import { z, ZodError } from 'zod'

import { Request, Response, NextFunction } from 'express'

export const validateData =
  (schema: z.ZodObject<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(400).json({ error, details: errorMessages })
      } else {
        res.status(500).json({ error: 'Internal Error happened' })
      }
    }
  }
