import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/user', require('./user'));
router.use('/subs', require('./subs'));

module.exports = router;