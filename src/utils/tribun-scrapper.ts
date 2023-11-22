import * as cheerio from "cheerio"

export function TribunNews(text: string) {
    const $ = cheerio.load(text)
    const title = $("head title").text()

    const content = $(".side-article")
        .map((_, el) => $(el).text())
        .get()
        .at(0)

    return { title, content }
}