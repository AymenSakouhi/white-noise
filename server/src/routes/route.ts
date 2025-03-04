import { Router } from 'express'

import {
  checkSanity,
  userRegister,
  userLogin,
  userLogout,
  checkBlacklist,
  userAuthenticate,
  userAuthenticateMiddleWare,
  addTodo,
} from '@src/controllers/controllers'

export const routes = Router()
// sanity check api
routes.get('/status', checkSanity)
routes.post('/register', userRegister)
routes.post('/login', userLogin)
routes.post('/logout', checkBlacklist, userLogout)
// protected profile route
routes.post('/profile', userAuthenticateMiddleWare, userAuthenticate)

// todo routes
routes.post('/todos/add', userAuthenticateMiddleWare, addTodo)
