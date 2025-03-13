import { Request, Response, NextFunction } from 'express'
import prisma from '@src/db/init'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export const userRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { id: true, email: true, password: true },
    })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists!!' })
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
}

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { id: true, email: true, password: true },
    })
    if (!user) {
      res.status(400).json({ message: 'User not found, you dummy!!' })
      return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
    }
    const payload = { id: user.id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_TOKEN as string, {
      expiresIn: '4h',
    })
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({
      message: 'USERLOGIN: Server error',
      error,
    })
  }
}
// black list to store tokens
export const tokenBlacklist = new Set<string>()

// Middleware for authentication
export const userAuthenticateMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: Record<string, string>) => {
      if (err) return next(err)
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      // check if user is allowed to do stuff otherwise Unauthorize.
      req.user = user // Attach user to request
      next() // Proceed to the next middleware or controller
    },
  )(req, res, next) // Call the function with req, res, next
}

export const userAuthenticate = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user })
}

export const userLogout = (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1]
  if (!token) {
    res.status(400).json({
      message: 'No token, what is happening dude',
    })
    return
  }
  // unique values only
  tokenBlacklist.add(token)
  // 100% we have a token
  res.status(200).json({ message: 'user logged off correctly!' })
}
