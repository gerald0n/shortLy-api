import { Router } from "express";
import { signRouters } from "./user.route.js";

export const router = Router()

router.use(signRouters)



