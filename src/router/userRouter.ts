import express, { Router } from "express";
import selectUser from "../api/user";

const router: Router = express.Router();

router.get('/', selectUser);
// router.get('/:userId', selectUser);

export default router;