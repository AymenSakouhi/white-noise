import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// type QueryFunc = Promise<void>

export const queryAndDisconnet = (queryFn: any) => {
  queryFn.catch((e: unknown) => {
    //eslint-disable-next-line
    console.error(e instanceof Error ? e.message : 'unknown error')
    prisma.$disconnect()
  })
}

export default prisma
