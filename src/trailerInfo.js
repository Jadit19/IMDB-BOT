import axios from "axios"
import cheerio from "cheerio"

export const returnVideoLink = async (url) => {
    try {
        const { data } = await axios.get("https://www.keepflick.com/imdb/?url=" + url)
        const $ = cheerio.load(data)

        const videoLink = $("table").find("a").attr("href")
        return videoLink
    } catch (error){
        console.log(error)
    }
}