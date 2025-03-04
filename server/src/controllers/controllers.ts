import { Request, Response, NextFunction } from 'express'
import prisma, { queryAndDisconnect } from '@src/db/init'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Status } from '@prisma/client'
import { Readable } from 'stream'

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


export const addSound = async (req: AddSoundRequest, res: Response) => {
  try {
    const { title, fileType } = req.body  
    const audioFile = req.file

    if (!title || !audioFile || !fileType) {
      res
        .status(400)
        .json({ error: 'Missing title, audio file, or file type.' });
      return 
    }

 
    const audioData = audioFile.buffer

    queryAndDisconnect(async () => {
      const newSound = await prisma.sound.create({
        data: {
          title: title,
          fileType: fileType,
          data: audioData
        }
      })

      res.status(201).json({ 
        id: newSound.id,
        title: newSound.title,
        fileType: newSound.fileType
      })
    })
  } catch (error) {
    console.error('Error adding sound:', error);
    res.status(500).json({ error: 'Failed to add sound.' });
  }
}

interface StreamSoundRequest extends Request {
  body: {
    id: string
  }
}

export const streamSound = async (req: StreamSoundRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res
        .status(400)
        .json({ error: 'Missing id of the audio file'})
      return 
    }
 
    queryAndDisconnect(async () => {
      const sound = await prisma.sound.findUnique({where: {
        id
      }})

      if (!sound || !sound.data) {
        res.status(404).json({
          message: "Audio file not found with the ID"
        })
        return
      }

      const audioBuffer = sound.data
      const fileSize = audioBuffer.length
      const range = req.headers.range
      if (!range) {

        res.setHeader('Content-Type', sound.fileType)
        res.setHeader('Content-Length', sound.data.length)
        res.setHeader('Accept-Ranges', 'bytes')

        const readable = new Readable()
        readable.push(sound.data)
        readable.push(null)

        readable.pipe(res)
        return
      }

      // Parse byte range header
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.status(416).send('Requested Range Not Satisfiable');
        return;
      }

      const chunkSize = end - start + 1;
      const audioChunk = audioBuffer.slice(start, end + 1);

      res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', chunkSize);
      res.setHeader('Content-Type', sound.fileType);
      res.status(206); // Partial Content

      const readable = new Readable();
      readable.push(audioChunk);
      readable.push(null);
      readable.pipe(res);
    })
  } catch (error) {
    console.error('Error adding sound:', error);
    res.status(500).json({ error: 'Failed to add sound.' });
  }
}