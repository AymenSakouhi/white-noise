import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export default prisma

// type QueryFunc = () => Promise<unknown>

/* export const queryAndDisconnect = (queryFn: QueryFunc) => {
  // shout out to OBI for the hint
  queryFn().catch((e: unknown) => {
    //eslint-disable-next-line
    console.error(e instanceof Error ? e.message : 'unknown error')
    prisma.$disconnect()
  })
} */
