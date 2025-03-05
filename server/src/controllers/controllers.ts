import { Request, Response, NextFunction } from 'express'
import prisma, { queryAndDisconnect } from '@src/db/init'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { LocalFileStoreClient } from '@src/FileStoreClient'
const fileStoreClient = new LocalFileStoreClient("assets")

export const checkSanity = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'on',
  })
}

export const userRegister = (req: Request, res: Response) => {
  queryAndDisconnect(async () => {
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
  queryAndDisconnect(async () => {
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
        expiresIn: '4h',
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
// black list to store tokens
const tokenBlacklist = new Set<string>()

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

      req.user = user // Attach user to request
      next() // Proceed to the next middleware or controller
    },
  )(req, res, next) // Call the function with req, res, next
}

export const userAuthenticate = (req: Request, res: Response) => {
  const token = req.headers?.authorization?.split(' ')[1] as string
  if (token && tokenBlacklist.has(token)) {
    res.status(401).json({
      message: 'Token expired, please login again',
    })
  }
  if (!req.user) {
    res.status(400).json({
      message: "No user"
    })
    return
  }

  res.status(200).json({ user: req.user })
}

export const checkBlacklist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization!.split(' ')[1]
  if (token && tokenBlacklist.has(token)) {
    res.status(401).json({
      message: 'Token expired, please login again',
    })
  }
  next()
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


interface AddSoundRequest extends Request {
  body: {
    title: string
    fileType: string
  }
  file?: Express.Multer.File
}


export const addNoise = async (req: AddSoundRequest, res: Response) => {
  try {
    const { title, fileType } = req.body
    const audioFile = req.file

    if (!title || !audioFile || !fileType) {
      res
        .status(400)
        .json({ error: 'Missing title, audio file, or file type.' });
      return
    }

    const existingNoise = await prisma.noise.findFirst({
      where: {
        title: title 
      }
    })

    if (existingNoise !== null) {
      res.status(400).json({
        message: `noise already exists with ${title}`
      })
      return
    }

    const audioData = audioFile.buffer
    const result = await fileStoreClient.upload("noises", title, audioData, fileType)
    if (!result) {
      res.status(500).json({message: "failed to upload file"})
      return
    }

    const noise = await prisma.noise.create({
      data: {
        title: title,
        fileType: fileType,
        path: result.uri
      }
    })
    res.status(201).json({ noise, message: "uploaded noise file successfully" })

  } catch (error) {
    console.error('Error adding noise:', error);
    res.status(500).json({ error: 'Failed to add noise.' });
  }
}

export const getNoises = async (req: Request, res: Response) => {
  try {
    queryAndDisconnect(async () => {
      const noises = await prisma.noise.findMany()
      res.status(200).json({data: { noises }})
    })
  } catch (error) {
    console.error('Error getting noises:', error);
    res.status(500).json({ error: 'Failed to get noises.' });
  }
}

export const deleteNoise = async (req: Request, res: Response) => {
  const { noiseKey } = req.params
  try {
    const noise = await prisma.noise.findFirst({
      where: {
        title: noiseKey
      }
    })

    if (!noise) {
      console.log(`Noise with key ${noiseKey} not found`)
      res.send(404).json({
        message: `Noise with key ${noiseKey} not found`
      })
      return
    }

    queryAndDisconnect(async () => {
      const result = await prisma.noise.delete({
        where: {
          id: noise.id
        }
      })
    })

    fileStoreClient.delete("noises", noiseKey)
    res.status(200).json({
      message: `Deleted noise with key ${noiseKey}`
    })
  } catch(error) {
    console.error(`Error deleting noise with id: ${noiseKey}`)
  }
}