import { Router } from 'express'
import multer from 'multer'

import {
  userRegister,
  userLogin,
  userLogout,
  checkBlacklist,
  userAuthenticate,
  userAuthenticateMiddleWare,
  addTodo,
  getTodos,
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
routes.get('/todos/', userAuthenticateMiddleWare, getTodos)

// noise routes
routes.post('/noise', upload.single("audio"), userAuthenticateMiddleWare, addNoise)
routes.get("/noise", userAuthenticateMiddleWare, getNoises)
routes.delete("/noise/:noiseKey", userAuthenticateMiddleWare, deleteNoise)