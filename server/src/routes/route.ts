import { Router } from 'express'
import multer from 'multer'

import {
  userRegister,
  userLogin,
  userLogout,
  userAuthenticate,
  userAuthenticateMiddleWare,
} from '@src/controllers/users'
import {
  addTodo,
  deleteTodo,
  getTodos,
  editStatus,
  editDescription,
} from '@src/controllers/todos'

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
routes.get('/todos/', userAuthenticateMiddleWare, getTodos)
routes.post('/todos/add', userAuthenticateMiddleWare, addTodo)
routes.delete('/todos/delete/:id', userAuthenticateMiddleWare, deleteTodo)
routes.patch('/todos/status/:id', userAuthenticateMiddleWare, editStatus)
routes.patch(
  '/todos/description/:id',
  userAuthenticateMiddleWare,
  editDescription,
)

// noise routes
routes.post(
  '/noises/add',
  upload.single('file'),
  userAuthenticateMiddleWare,
  addNoise,
)
routes.get('/noise', userAuthenticateMiddleWare, getNoises)
routes.delete('/noise/:noiseKey', userAuthenticateMiddleWare, deleteNoise)
