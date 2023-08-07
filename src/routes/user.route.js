import { Router } from 'express'
import { userSignInSchema, userSignUpSchema } from '../schemas/user.schema.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { signUp, signIn } from '../controllers/signUser.controller.js'

export const signRouters = Router()

signRouters.post('/signup', validateSchema(userSignUpSchema), signUp)

signRouters.post('/signin', validateSchema(userSignInSchema), signIn)