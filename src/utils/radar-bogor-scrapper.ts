import * as cheerio from "cheerio"

export function RadarBogorScrapper(text: string) {
    const $ = cheerio.load(text)
    const title = $("head title").text()

    const content = $(".elementor-widget-theme-post-content > .elementor-widget-container")
        .map((_, el) => $(el).text())
        .get()
        .at(0)

    return { title, content }
}