import { Request, Response } from 'express'
import prisma from '@src/db/init'
import { User } from '@prisma/client'

export const getTodos = async (req: Request, res: Response) => {
  const user = req.user as User
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
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

export const addTodo = async (req: Request, res: Response) => {
  const { description } = req.body
  const user = req.user as User
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
      message: 'Issue with creating todo',
      error,
    })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    })
    res.status(200).json({
      message: `todo of id: ${id} been deleted`,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Issue with deleting todos',
      error,
    })
  }
}

export const editStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
    res.status(200).json({
      message: `todo of id: ${id} been updated`,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Issue with updating todos',
      error,
    })
  }
}

export const editDescription = async (req: Request, res: Response) => {
  const { id } = req.params
  const { description } = req.body
  console.log(id, description)
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        description,
      },
    })
    res.status(200).json({
      message: `todo of id: ${id} been updated`,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Issue with updating description of todo',
      error,
    })
  }
}
