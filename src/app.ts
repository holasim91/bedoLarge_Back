
import express, { Request, Response, NextFunction } from 'express';
import apiRoute from './router/index';

const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', apiRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! This is my first express server');
});

app.set("port", process.env.PORT || 5001);

app.listen(app.get("port"), () => {
    console.log(`Server listening on port: ${app.get("port")}`);
})