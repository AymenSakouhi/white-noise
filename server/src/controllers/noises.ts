import {Request, Response} from 'express'

import prisma, { queryAndDisconnect} from '@src/db/init'
import { LocalFileStoreClient } from '@src/FileStoreClient'
const fileStoreClient = new LocalFileStoreClient("assets")

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