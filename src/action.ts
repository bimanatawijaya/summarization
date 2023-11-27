"use server"

import { RadarBogorScrapper } from "./utils/radar-bogor-scrapper"
import OpenAI from "openai";
import { TribunNews } from "./utils/tribun-scrapper";
import { DetikScrapper } from "./utils/detik-scrapper";

type Result = {
    title: string | null
    content: string | null
    error: boolean | null
}

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_APIKEY
});

export default async function summerazeNews(prevState: any, formData: FormData): Promise<Result> {
    const url = formData.get("url") as string

    if (url.includes("radarbogor.id")) {
        const fetchUrlRadar = await fetch(url);
        const responseRadarBogor = await fetchUrlRadar.text()
        const radar = RadarBogorScrapper(responseRadarBogor)
        var result = await fetchOpenAi({
            title: radar.title,
            content: radar.content
        })

        return { title: result.title, content: result.content, error: false }
    } else if (url.includes("tribunnews.com")) {
        const fetchUrlTribun = await fetch(url);
        const responseTribun = await fetchUrlTribun.text()
        const tribun = TribunNews(responseTribun)
        var result = await fetchOpenAi({
            title: tribun.title,
            content: tribun.content
        })

        return { title: result.title, content: result.content, error: false }
    } else if (url.includes("detik.com")) {
        const fetchUrlDetik = await fetch(url);
        const responseDetik = await fetchUrlDetik.text()
        const detik = DetikScrapper(responseDetik)
        var result = await fetchOpenAi({
            title: detik.title,
            content: detik.content
        })

        return { title: result.title, content: result.content, error: false }
    }

    return { title: null, content: null, error: true }
}


interface Params {
    title: string,
    content: any
}

async function fetchOpenAi(params: Params) {
    const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            {
                role: "system",
                content: "You're a helpful assitant that expert in summarizing news.",
            },
            {
                role: "user",
                content: `Please summarize this news: TITLE: ${params.title}\n\nCONTENT:${params.content}\n\nReply with Indonesian language.`,
            },
        ],
    })

    const content = result.choices.at(0)?.message.content ?? null;
    return { title: params.title, content }
}