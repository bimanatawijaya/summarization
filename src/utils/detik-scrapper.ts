import * as cheerio from "cheerio"

export function DetikScrapper(text: string) {
    const $ = cheerio.load(text)
    const title = $("head title").text()

    const content = $(".itp_bodycontent_wrapper > .itp_bodycontent")
        .map((_, el) => $(el).text())
        .get()
        .at(0)

    return { title, content }
}
