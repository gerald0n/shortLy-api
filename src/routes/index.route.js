import { Router } from "express";
import { signRouters } from "./user.route.js";
import { urlRouter } from "./url.route.js";

export const router = Router()

router.use(signRouters)
router.use(urlRouter)



