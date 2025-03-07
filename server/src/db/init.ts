import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
})

type QueryFunc = () => Promise<unknown>

export const queryAndDisconnect = (queryFn: QueryFunc) => {
  // shout out to OBI for the hint
  queryFn().catch((e: unknown) => {
    //eslint-disable-next-line
    console.error(e instanceof Error ? e.message : 'unknown error')
    prisma.$disconnect()
  })
}

export default prisma
