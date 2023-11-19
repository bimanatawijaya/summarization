"use server"

import { RadarBogorScrapper } from "./utils/radar-bogor-scrapper"
import OpenAI from "openai";

type Result = {
    title: string | null
    content: string | null
}

const openai = new OpenAI({
    apiKey: "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"
});

export default async function summerazeNews(prevState: any, formData: FormData): Promise<Result> {
    const url = formData.get("url") as string
    const response = await fetch(url);
    const responseText = await response.text()

    if (url.includes("radarbogor.id")) {
        const data = RadarBogorScrapper(responseText)
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                {
                    role: "system",
                    content: "You're a helpful assitant that expert in summarizing news.",
                },
                {
                    role: "user",
                    content: `Please summarize this news: TITLE: ${data.title}\n\nCONTENT:${data.content}\n\nReply with Indonesian language.`,
                },
            ],
        })

        const content = result.choices.at(0)?.message.content ?? null;
        return { title: data.title, content }
    }


    return { title: null, content: null }
}   