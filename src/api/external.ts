import dotenv from 'dotenv'
import { getCurrentDateTime } from '../util';
const { google } = require('googleapis');

dotenv.config()

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

type Item = {
    id: string,
    statistics: { subscriberCount: number; },
    snippet: { title: string; };
}

export const getSubsInfoFromYoutube = async (ids: Array<string>) => {
    try {
        const response = await youtube.channels.list({ part: "snippet,statistics", id: ids })
        const data = response.data.items.map((item: Item) => {
            return ({
                id: item.id,
                subs_num: Number(item.statistics.subscriberCount),
                created_at: getCurrentDateTime(),
                title: item.snippet.title,
            })
        })
        return data
    } catch (e) {
        console.error('youtube API error', e)
        return
    }

}


