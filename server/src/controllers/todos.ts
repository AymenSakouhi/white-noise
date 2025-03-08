import { Request, Response, NextFunction } from 'express'
import prisma from '@src/db/init'
import { tokenBlacklist } from '@src/controllers/users'

export const addTodo = async (req: Request, res: Response) => {
    const { description } = req.body
    const token = req.headers?.authorization?.split(' ')[1] as string
    const user = req.user as { id: string;[key: string]: string }
    if (token && tokenBlacklist.has(token)) {
        res.status(403).json({
            message: 'Token expired, relogin to be able to do todos',
        })
    }
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
    const token = req.headers?.authorization?.split(' ')[1] as string
    const user = req.user as { id: string;[key: string]: string }
    if (token && tokenBlacklist.has(token)) {
        res.status(403).json({
            message: 'Token expired, relogin to be able to do todos',
        })
    }
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