import dotenv from 'dotenv'
import { getCurrentDateTime } from '../util';
const { google } = require('googleapis');

dotenv.config()

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

export const getSubsInfo = async (ids: Array<string>) => {
    try {
        const response = await youtube.channels.list({ part: "snippet,statistics", id: ids })
        const data = response.data.items.map((i: { id: string; statistics: { subscriberCount: number; }; snippet: { title: string; }; }) => {
            return ({
                id: i.id,
                subs_num: Number(i.statistics.subscriberCount),
                created_at: getCurrentDateTime(),
                title: i.snippet.title,
            })
        })
        return data
    } catch (e) {
        console.error('youtube API error')
        return
    }

}


