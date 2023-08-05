import { Router } from 'express'
import { userSignInSchema, userSignUpSchema } from '../schemas/userSchema.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { signUp, signIn } from '../controllers/signUser.controller.js'

export const signRouters = Router()

signRouters.post('/signUp', validateSchema(userSignUpSchema), signUp)

signRouters.post('/signIn', validateSchema(userSignInSchema, signIn))