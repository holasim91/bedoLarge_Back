import express, { Router } from "express";
import {addSubs, getSubs, getSub} from "../api/subs";


const router: Router = express.Router();

router.get('/', getSubs);
router.get('/:id', getSub);
router.post('/add_sub_info', addSubs);


export default router;