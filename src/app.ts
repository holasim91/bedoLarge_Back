
import express from 'express';
import apiRoute from './router/index';
import axios from 'axios';
const schedule = require('node-schedule');
import dotenv from 'dotenv'

import { getSubsInfoFromYoutube } from './api/external';

dotenv.config()

const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/api', apiRoute);

const testBatchTime = '10 * * * * *'
const batchTime = "0 55 23 * * *"
schedule.scheduleJob(batchTime, async () => { // sec(option) min hour day month 요일
    console.log('TIME TO GET SUBSCRIBER INFO OF BEDORAZI')
    const targetURL = 'http://localhost:3001/api/user'
    const postURL = 'http://localhost:3001/api/subs/add_sub_info'
    try {
        const response = await axios.get(targetURL)
        const channelIds = response.data.map((r: { id: string; }) => r.id)
        console.log(channelIds)
        if (channelIds.length > 0) {
            const aaa = await getSubsInfoFromYoutube(channelIds)
            if (aaa) {
                axios.post(postURL, aaa)
            }else{
                throw Error
            }
        }
    } catch (e) {
        console.error(e)
    }

});


app.set("port", process.env.PORT || 5001);
app.listen(app.get("port"), () => {
    console.log(`Server listening on port: ${app.get("port")}`);
})