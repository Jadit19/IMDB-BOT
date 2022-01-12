import axios from "axios"
import cheerio from "cheerio"
import { MessageEmbed } from "discord.js"
import { MOVIE_URL, IMDB_LOGO } from "../config.js"
import { returnActorsData } from "./actorSearch.js"

const returnActorInfo = async (url) => {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const extractedData = {
            name: "NA",
            works: "NA",
            born: "NA",
            movies: "NA",
            awards: "NA",
            bio: "NA",
            photoLink: "NA"
        }
        var movies = []
        var works = []

        $("span.itemprop").each((idx, el) => {
            if (idx == 0){
                extractedData.name = $(el).text()
            } else {
                var s = $(el).text()
                works.push(s.substring(1, s.length))
            }
        })
        if (works.length != 0)
          extractedData.works = works.join(", ")
        var x = ""
        $("div#name-born-info").each((idx, el) => {
            x = $(el).text().trim().split("\n")
            var x1 = []
            for (let i=0; i<x.length; i++){
              if (x[i].trim().length != 0){
                x1.push(x[i].trim())
              }
            }
            if (x1.length > 1){
              extractedData.born = ""
            }
            for (let i=1; i<x1.length; i++){
                extractedData.born += x1[i] + " "
            }
        })
        $("#knownfor").children("div").each((idx, el) => {
            const movieData = {
                year: "",
                name: ""
            }
            movieData.name = $(el).children(".knownfor-title-role").children("a").text()
            movieData.year = $(el).children(".knownfor-year").text()
            const movieData1 = movieData.name + " " + movieData.year
            movies.push(movieData1)
        })
        if (movies.length != 0)
            extractedData.movies = movies.join(", ")
        $("span.awards-blurb").each((idx, el) => {
            var s = $(el).text().trim().split("\n")
            if (s.length != 0){
              extractedData.awards = ""
            }
            s.forEach((s1) => {
                extractedData.awards += s1.trim() + " "
            })
        })
        extractedData.awards = extractedData.awards.trim()
        extractedData.photoLink = $("img#name-poster").attr("src")

        x = []
        $("div.name-trivia-bio-text").children("div.inline").each((idx, el) => {
            x.push($(el).text().trim())
        })
        if (x.length != 0)
            extractedData.bio = x[0].substring(0, x[0].length-52) + "..."

        return extractedData
    } catch (error){
        console.log(error)
    }
}

export const sendPersonInfo = async (msg, url, goodName) => {
    const actorsData = await returnActorsData(url)

    if (actorsData.length == 0){
        msg.reply(`Sorry.. I couldn't find any people in search related to **${goodName}**`)
        return
    }
    const actorLink = MOVIE_URL + actorsData[0].link
    const extractedData = await returnActorInfo(actorLink)
    msg.reply(`Here's what I found about **${extractedData.name}** on the Imdb website:`)

    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle(extractedData.name)
        .setURL(actorLink)
        .setThumbnail(IMDB_LOGO)
        .setDescription(`The details about **${extractedData.name}** are as follows:`)

        .addField('\u200B', '\u200B')
        .addFields(
            { name: "Birth", value: extractedData.born, inline: true },
            { name: "Works as", value: extractedData.works, inline: true },
            { name: "\u200B", value: "\u200B", inline: true },
            { name: "Movies", value: extractedData.movies },
            { name: "Awards", value: extractedData.awards }
        )

        .setImage(extractedData.photoLink)
        .setTimestamp()
        .setFooter("Scraped by IMDB-BOT", IMDB_LOGO)

    msg.channel.send({
        embeds: [
            newEmbed
        ]
    })
}