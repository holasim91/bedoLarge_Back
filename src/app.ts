
import express, { Request, Response, NextFunction } from 'express';
import apiRoute from './router/index';
import axios from 'axios';
const schedule = require('node-schedule');



const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', apiRoute);

schedule.scheduleJob('5 * * * * *',async function(){
   console.log('TIME TO GET SUBSCRIBER INFO OF BEDORAZI')
    const targetURL = 'http://localhost:3001/api/user'
   
  
   try{
    const response =  await axios.get(targetURL)
    console.log(response.data, '??')
    const channelIds = response.data.map((r: { id: string; }) => r.id)
    console.log(channelIds)
    // 
   }catch(e){
    console.error(e)
   }

  });

app.set("port", process.env.PORT || 5001);

app.listen(app.get("port"), () => {
    console.log(`Server listening on port: ${app.get("port")}`);
})