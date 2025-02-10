import { Router } from 'express'

import { checkSanity } from '@src/controllers/controllers'

export const routes = Router()

routes.get('/status', checkSanity)
