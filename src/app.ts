
import express, { Request, Response, NextFunction } from 'express';
import apiRoute from './router/index';
import axios from 'axios';
const schedule = require('node-schedule');
const { google } = require('googleapis');
import dotenv from 'dotenv'

import { getSubsInfo } from './api/external';

dotenv.config()

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });


const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', apiRoute);


schedule.scheduleJob('55 23 * * *', async function () { // sec(option) min hour day month 요일
    console.log('TIME TO GET SUBSCRIBER INFO OF BEDORAZI')
    const targetURL = 'http://localhost:3001/api/user'
    const postURL = 'http://localhost:3001/api/subs/add_sub_info'
    try {
        const response = await axios.get(targetURL)
        const channelIds = response.data.map((r: { id: string; }) => r.id)
        console.log(channelIds)
        if (channelIds.length > 0) {
            const aaa = await getSubsInfo(channelIds)
            console.log(aaa, '?')
            if (aaa) {
                axios.post(postURL, aaa)
            }

        }


        // 
    } catch (e) {
        console.error(e)
    }

});

app.set("port", process.env.PORT || 5001);

app.listen(app.get("port"), () => {
    console.log(`Server listening on port: ${app.get("port")}`);
})