import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import prisma from '@src/db/init'

import 'dotenv/config'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN as string,
}

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      })
      if (user) return done(null, user)
      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  }),
)
