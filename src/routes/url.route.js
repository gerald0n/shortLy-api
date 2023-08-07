import { Router } from 'express'
import { newUrlSchema } from '../schemas/url.schema.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import {
   newURLshortened,
   getShortenedURLWhyID,
   openShortenedURL,
   deleteShortenedURL,
   getDataUser,
   getRanking
} from '../controllers/urls.controller.js'

export const urlRouter = Router()

urlRouter.post('/urls/shorten', validateSchema(newUrlSchema), newURLshortened)

urlRouter.get('/urls/:id', getShortenedURLWhyID)

urlRouter.get('/urls/open/:shortUrl', openShortenedURL)

urlRouter.delete('/urls/:id', deleteShortenedURL)

urlRouter.get('/users/me', getDataUser)

urlRouter.get('/ranking', getRanking)
