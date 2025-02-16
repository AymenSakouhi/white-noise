import { Router } from 'express'

import { checkSanity, createUser } from '@src/controllers/controllers'

export const routes = Router()

routes.get('/status', checkSanity)
routes.post('/user/create', createUser)
