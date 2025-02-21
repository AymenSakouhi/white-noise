import { Router } from 'express'

import {
  checkSanity,
  userRegister,
  userLogin,
  userAuthenticate,
} from '@src/controllers/controllers'

export const routes = Router()
// sanity check api
routes.get('/status', checkSanity)
routes.post('/register', userRegister)
routes.post('/login', userLogin)
// protected profile route
routes.post('/profile', userAuthenticate)
