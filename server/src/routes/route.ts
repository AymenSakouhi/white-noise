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
import { checkSanity } from '@src/controllers/status'
import { addNoise, getNoises, deleteNoise } from '@src/controllers/noises'

// used for handling multi-part form uploads
const upload = multer({storage: multer.memoryStorage()})

export const routes = Router()
// sanity check api
routes.get('/status', checkSanity)
routes.post('/register', userRegister)
routes.post('/login', userLogin)
routes.post('/logout', checkBlacklist, userLogout)
// protected profile route
routes.post('/profile', userAuthenticateMiddleWare, userAuthenticate)

// noise routes
routes.post('/noise', upload.single("audio"), userAuthenticateMiddleWare, addNoise)
routes.get("/noise", userAuthenticateMiddleWare, getNoises)
routes.delete("/noise/:noiseKey", userAuthenticateMiddleWare, deleteNoise)