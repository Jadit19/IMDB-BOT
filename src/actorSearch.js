import axios from "axios"
import cheerio from "cheerio"
import { MessageEmbed } from "discord.js"
import { MOVIE_URL, IMDB_LOGO } from "../config.js"

export const returnActorsData = async (url) => {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const items = $(".findSection")
        var actorNames = []
        items.each((idx, el) => {
            if ($(el).text().startsWith("\nNames")){
                $(el).children("table").children("tbody").children("tr").each((idx1, el1) => {
                    const listItem = {
                        text: "",
                        link: ""
                    }
                    listItem.text = $(el1).children("td").children("a").text().trim()
                    listItem.link = $(el1).children("td").children("a").attr("href")
                    actorNames.push(listItem)
                })
            }
        })
        return actorNames
    } catch (error){
        console.log(error)
    }
}

export const sendPersonsData = async (msg, url, goodName) => {
    const actorsData = await returnActorsData(url)

    if (actorsData.length == 0){
        msg.reply(`Sorry.. I couldn't find any actors in search related to **${goodName}**`)
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

        for (let actor=0; actor<actorsData.length; actor++){
            if (actor == 0){
                newEmbed.addField('\u200B', '\u200B' )
            }
            newEmbed.addField(`${actor+1}: ${actorsData[actor].text}`, `${MOVIE_URL}${actorsData[actor].link}`)
            if (actor == actorsData.length-1){
                newEmbed.addField('\u200B', '\u200B' )
            }
        }

    msg.channel.send({
        embeds: [newEmbed]
    })
}