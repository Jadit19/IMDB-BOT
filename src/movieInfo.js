import axios from "axios"
import cheerio from "cheerio"
import { MessageEmbed } from "discord.js"
import { MOVIE_URL, IMDB_LOGO } from "../config.js"
import { returnMoviesData } from "./movieSearch.js"
import { returnVideoLink } from "./trailerInfo.js"

const returnMovieInfo = async (url) => {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const extractedData = {
            title: "NA",
            genres: "NA",
            director: "NA",
            writers: "NA",
            cast: "NA",
            rating: "NA",
            releaseYear: "NA",
            censor: "NA",
            runtime: "NA",
            brief: "NA",
            photoLink: "NA",
            trailerLink: "NA"
        }
        
        extractedData.title = $(".TitleHeader__TitleText-sc-1wu6n3d-0").text()
        const brief = $(".GenresAndPlot__TextContainerBreakpointXS_TO_M-sc-cum89p-0").text()
        if (brief.length != 0){
            extractedData.brief = brief
        }
        var infoAbout = $(".TitleBlockMetaData__MetaDataList-sc-12ein40-0").children("li")
        var x=0
        if (infoAbout.length == 4)
            x += 1
        infoAbout.each((idx, el) => {
            var str1 = $(el).text()
            if (str1.startsWith("19") || str1.startsWith("20")){
                extractedData.releaseYear = str1.substring(0, str1.length/2)
            } else if (str1=="RR" || str1=="AA"){
                extractedData.censor = str1.substring(0, 1)
            } else if (str1.includes("h") || str1.includes("m")){
                extractedData.runtime = str1
            }
        })
        $(".ipc-metadata-list--baseAlt").each((idx, el) => {
            if (idx == 0){
                $(el).children("li").each((idx1, el1) => {
                    var temp = $(el1).text()
                    if (temp.startsWith("Director")){
                        const directors = []
                        $(el1).children("div").children("ul").children("li").each((idx2, el2) => {
                            directors.push($(el2).text())
                        })
                        extractedData.director = directors.join(", ")
                    } else if (temp.startsWith("Creator")){
                        const creators = []
                        $(el1).children("div").children("ul").children("li").each((idx2, el2) => {
                            creators.push($(el2).text())
                        })
                        extractedData.writers = creators.join(", ")
                    } else if (temp.startsWith("Writer")){
                        var writers = []
                        $(el1).children("div").children("ul").children("li").each((idx2, el2) => {
                            writers.push($(el2).children("a").text())
                        })
                        extractedData.writers = writers.join(", ")
                    } else if (temp.startsWith("Star")){
                        let cast = []
                        $(el1).children("div").children("ul").children("li").each((idx2, el2) => {
                            cast.push($(el2).children("a").text())
                        })
                        extractedData.cast = cast.join(", ")
                    }
                })
            }
        })
        let genres = []
        $("a.GenresAndPlot__GenreChip-cum89p-3").each((idx, el) => {
            genres.push($(el).children("span").text())
        })
        $("a.GenresAndPlot__GenreChip-sc-cum89p-3").each((idx, el) => {
            genres.push($(el).children("span").text())
        })
        const newGenres = [...new Set(genres)]
        if (newGenres.length != 0)
            extractedData.genres = newGenres.join(", ")
        $(".AggregateRatingButton__RatingScore-sc-1ll29m0-1").each((idx, el) => {
            if (idx == 0){
                extractedData.rating = $(el).text()
            }
        })
        extractedData.photoLink = $(".ipc-media--poster-l").children("img").attr("src")
        extractedData.trailerLink = $("a.hero-media__slate-overlay").attr("href")

        return extractedData
    } catch(error){
        console.log(error)
    }
}

export const sendMovieInfo = async (msg, url, goodName) => {
    const moviesData = await returnMoviesData(url, goodName)

    if (moviesData.length == 0){
        msg.reply(`Sorry.. I couldn't find any Movie or TV Show search related to **"${goodName}"**`)
        return
    }
    const movieLink = MOVIE_URL + moviesData[0].link
    const extractedData = await returnMovieInfo(movieLink)
    msg.reply(`Here's what I found about **${extractedData.title}** on the Imdb website:`)

    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle(extractedData.title)
        .setURL(movieLink)
        .setThumbnail(IMDB_LOGO)
        .setDescription(`The details of the title: **${extractedData.title}** are as follows:`)
        
        .addField('\u200B', '\u200B')
        .addFields(
            { name: "Cast", value: extractedData.cast },
            { name: "Director(s)", value: extractedData.director, inline: true },
            { name: "Writer(s)", value: extractedData.writers, inline: true },
            { name: "Genres", value: extractedData.genres, inline: true },
            { name: "Rating", value: extractedData.rating, inline: true },
            { name: "Year", value: extractedData.releaseYear, inline: true },
            { name: "Runtime", value: extractedData.runtime, inline: true },
            { name: "About", value: extractedData.brief },
        )

        .setTimestamp()
        .setFooter("Scraped by IMDB-BOT", IMDB_LOGO)

    if (extractedData.photoLink != void 0)
        newEmbed.setImage(extractedData.photoLink)
        
    msg.channel.send({
        embeds: [
            newEmbed
        ]
    })

    if (extractedData.trailerLink != void 0){
        const trailerURL = await returnVideoLink(`${MOVIE_URL}${extractedData.trailerLink}`)
        if (trailerURL.startsWith("http")){
            const videoEmbed = new MessageEmbed()
                .setColor("#f5c518")
                .setTitle(`${extractedData.title} Trailer`)
                .setURL(trailerURL)
                .setThumbnail(IMDB_LOGO)
                .setDescription(`Click the above link to view the trailer of **${extractedData.title}** available on the Imdb webpage`)
                .setTimestamp()
                .setFooter("Scraped by IMDB-BOT", IMDB_LOGO)

            msg.channel.send({
                embeds: [
                    videoEmbed
                ]
            })
        }
    }
}