import { MessageEmbed } from "discord.js"
import { IMDB_LOGO } from "../config.js"

export const errorDM = (msg) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("Report Here!")
        .setURL("https://github.com/Jadit19/IMDB-BOT/issues")
        .setThumbnail(IMDB_LOGO)
        .setDescription(`I don't have the permission to send a message in the channel **${msg.channel}** of **${msg.guild}**. If you think it's an error or bug, please report at the above link.`)
        .setImage("https://opengraph.githubassets.com/355bb8a45f3788ddf064488b094a4150971991d985fb4bf938ed0693f707f419/Jadit19/IMDB-BOT")
        .setTimestamp()
        .setFooter("Extremely Sorry!", IMDB_LOGO)

    msg.author.send({
        embeds: [newEmbed]
    })
}