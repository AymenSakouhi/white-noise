import { Router } from 'express'
import multer from 'multer'

import {
  userRegister,
  userLogin,
  userLogout,
  checkBlacklist,
  userAuthenticate,
  userAuthenticateMiddleWare,
} from '@src/controllers/users'
import { addTodo, getTodos } from '@src/controllers/todos'

import { checkSanity } from '@src/controllers/status'
import { validateData } from '@src/middlewares/middlewares'
import { userLoginSchema, userRegisterSchema } from '@src/schemas/schemas'
import { addNoise, getNoises, deleteNoise } from '@src/controllers/noises'

const upload = multer({ storage: multer.memoryStorage() })

export const routes = Router()
// sanity check api
routes.get('/status', checkSanity)
routes.post('/register', validateData(userRegisterSchema), userRegister)
routes.post('/login', validateData(userLoginSchema), userLogin)
routes.post('/logout', userLogout)
// protected profile route
routes.post('/profile', userAuthenticateMiddleWare, userAuthenticate)

// todo routes
routes.post('/todos/add', userAuthenticateMiddleWare, addTodo)
routes.get('/todos/', userAuthenticateMiddleWare, getTodos)

// noise routes
routes.post(
  '/noise',
  upload.single('audio'),
  userAuthenticateMiddleWare,
  addNoise,
)
routes.get('/noise', userAuthenticateMiddleWare, getNoises)
routes.delete('/noise/:noiseKey', userAuthenticateMiddleWare, deleteNoise)

