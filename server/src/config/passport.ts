import {
  Strategy as JwtStrategy,
  StrategyOptionsWithRequest,
  VerifiedCallback,
} from 'passport-jwt'
import { Request } from 'express'

import passport from 'passport'
import prisma from '@src/db/init'
import { tokenBlacklist } from '@src/controllers/users'

import 'dotenv/config'

const extractJwt = (req: Request & { rawToken: string }) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization!.split(' ')[1]
    if (token) {
      req.rawToken = token
    }
    return token
  }
  return null
}

type JwtPayload = { id: string; exp: number; iat: number; jti?: string }
const options: StrategyOptionsWithRequest = {
  jwtFromRequest: extractJwt,
  secretOrKey: process.env.JWT_TOKEN as string,
  passReqToCallback: true,
}

passport.use(
  new JwtStrategy(
    options,
    async (
      req: Request & { rawToken: string },
      jwtPayload: JwtPayload,
      done: VerifiedCallback,
    ) => {
      try {
        // Extract the token manually
        if (tokenBlacklist.has(req.rawToken)) {
          return done(null, false, {
            message: 'token blacklisted',
          })
        }
        if (jwtPayload.exp && Date.now() >= jwtPayload.exp * 1000) {
          return done(null, false, {
            message: 'token expired',
          })
        }
        // already a valid token
        const user = await prisma.user.findUnique({
          where: { id: jwtPayload.id },
        })
        if (user) return done(null, user)
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    },
  ),
)
