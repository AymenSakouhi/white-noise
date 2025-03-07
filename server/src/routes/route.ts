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

import { validateData } from '@src/middlewares/middlewares'
import { userLoginSchema, userRegisterSchema } from '@src/schemas/schemas'

export const routes = Router()
// sanity check api
routes.get('/status', checkSanity)
routes.post('/register', validateData(userRegisterSchema), userRegister)
routes.post('/login', validateData(userLoginSchema), userLogin)
routes.post('/logout', checkBlacklist, userLogout)
// protected profile route
routes.post('/profile', userAuthenticateMiddleWare, userAuthenticate)

// todo routes
routes.post('/todos/add', userAuthenticateMiddleWare, addTodo)
