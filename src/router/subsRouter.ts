import express, { Router } from "express";
import {addSubs, getSub} from "../api/subs";


const router: Router = express.Router();

router.get('/', getSub);
router.post('/add_sub_info', addSubs);


export default router;