import { MessageEmbed } from "discord.js"
import { IMDB_LOGO } from "../config.js"

export const sendInvite = (msg) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("Invite Link")
        .setURL("https://discord.com/oauth2/authorize?client_id=927080106151792730&scope=bot")
        .setThumbnail(IMDB_LOGO)
        .setDescription("Invite the IMDB-BOT to other servers by clicking the above link!")
        .setTimestamp()
        .setFooter("Glad to help you!", IMDB_LOGO)

    msg.reply({
        embeds: [newEmbed]
    })
}