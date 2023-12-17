import express, { Router } from "express";

import userRouter from "./userRouter";
import subsRouter from "./subsRouter"

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/subs', subsRouter)

export default router;