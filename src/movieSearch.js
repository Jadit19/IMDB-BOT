import axios from "axios"
import cheerio from "cheerio"
import { MessageEmbed } from "discord.js"
import { IMDB_LOGO, MOVIE_URL } from "../config.js"

export const returnMoviesData = async (url) => {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const items = $(".findSection")
        var movieNames = []
        items.each((idx, el) => {
            if ($(el).text().startsWith("\nTitles")){
                $(el).children("table").children("tbody").children("tr").each((idx1, el1) => {
                    const listItem = {
                        text: "",
                        link: ""
                    }
                    listItem.text = $(el1).text().trim()
                    listItem.link = $(el1).children("td").children("a").attr("href")
                    movieNames.push(listItem)
                })
            }
        })
        return movieNames
    } catch(error){
        console.log(error)
    }
}

export const sendMoviesData = async (msg, url, goodName) => {
    const extractedData = await returnMoviesData(url)

    if (extractedData.length == 0){
        msg.reply(`Sorry.. I couldn't find any Movies or TV Shows searches related to **"${enteredName}"**`)
        return
    }
    msg.reply(`I found these top results about **"${goodName}"** on the Imdb website:`)

    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle(goodName)
        .setURL(url)
        .setThumbnail(IMDB_LOGO)
        .setDescription(`Here are all the relavant searches related to: **${goodName}**`)
        .setTimestamp()
        .setFooter("Scraped by IMDB-BOT", IMDB_LOGO)

        for (let movie=0; movie<extractedData.length; movie++){
            if (movie == 0){
                newEmbed.addField('\u200B', '\u200B' )
            }
            newEmbed.addField(`${movie+1}: ${extractedData[movie].text}`, `${MOVIE_URL}${extractedData[movie].link}`)
            if (movie == extractedData.length-1){
                newEmbed.addField('\u200B', '\u200B' )
            }
        }

    msg.channel.send({
        embeds: [newEmbed]
    })
}