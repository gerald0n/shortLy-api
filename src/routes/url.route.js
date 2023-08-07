import { Router } from "express"
import { newUrlSchema } from "../schemas/url.schema.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { newURLshortened } from "../controllers/urls.controller.js"

export const urlRouter = Router()

urlRouter.post('/urls/shorten', validateSchema(newUrlSchema), newURLshortened)



