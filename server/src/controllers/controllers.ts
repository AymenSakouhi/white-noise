// eslint-disable-next-line
import { Request, Response } from 'express'
import prisma, { queryAndDisconnet } from '@src/db/init'

export const checkSanity = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'on',
  })
}

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body
  //eslint-disable-next-line
  console.log('backend prisma part', name, email)
  queryAndDisconnet(async () => {
    const user = prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.status(200).json({ user })
  })
}

// export const postTodo = () => {}

// export const getTodos = () => {}
