import { Request, Response } from 'express'
import prisma from '@src/db/init'

export const addTodo = async (req: Request, res: Response) => {
  const { description } = req.body
  const user = req.user as { id: string; [key: string]: string }
  try {
    await prisma.todo.create({
      data: {
        description,
        userId: user?.id,
      },
    })
    res.status(200).json({
      message: 'todo created',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Issue with) creating todo',
      error,
    })
  }
}

export const getTodos = async (req: Request, res: Response) => {
  const user = req.user as { id: string; [key: string]: string }
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
    })
    res.status(200).json({
      todos,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Issue with finding todos',
      error,
    })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  const user = req.user as { id: string; [key: string]: string }
  const todoId = req.body
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        userId: user.id,
        id: todoId,
      },
    })
    if (todo) {
      await prisma.todo.delete({
        where: {
          id: todo.id,
        },
      })
      res.status(200).json({
        todo,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Issue with deleting todos',
      error,
    })
  }
}

