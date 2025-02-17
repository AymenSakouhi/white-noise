import { Request, Response } from 'express'
import prisma, { queryAndDisconnet } from '@src/db/init'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export const checkSanity = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'on',
  })
}

export const userRegister = (req: Request, res: Response) => {
  queryAndDisconnet(async () => {
    const { name, email, password } = req.body
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
        select: { id: true, email: true, password: true },
      })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists!!' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          password: hashedPassword,
          email,
        },
      })
      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      res.status(500).json({
        message: 'USERREGISTER: Server error',
        error,
      })
    }
  })
}

export const userLogin = (req: Request, res: Response) => {
  queryAndDisconnet(async () => {
    const { email, password } = req.body
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: { id: true, email: true, password: true },
      })
      if (!user)
        return res.status(400).json({ message: 'User not found, you dummy!!' })
      const isMatch = bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
      const payload = { id: user.id, email: user.email }
      const token = jwt.sign(payload, process.env.JWT_TOKEN as string, {
        expiresIn: '1h',
      })
      res.status(201).json({ token })
    } catch (error) {
      res.status(500).json({
        message: 'USERLOGIN: Server error',
        error,
      })
    }
  })
}

export const userAuthenticate = () => {
  return passport.authenticate(
    'jwt',
    { session: false },
    async (req: Request, res: Response) => {
      res.status(201).json({
        user: req.user,
      })
    },
  )
}
