import { Request, Response } from 'express'

export const checkSanity = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'on',
  })
}