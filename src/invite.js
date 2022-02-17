import { MessageEmbed } from "discord.js"
import { IMDB_LOGO, BOT_INVITE_LINK } from "../config.js"

export const sendInvite = (msg) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("Invite Link")
        .setURL(BOT_INVITE_LINK)
        .setThumbnail(IMDB_LOGO)
        .setDescription("Invite the IMDB-BOT to other servers by clicking the above link!")
        .setTimestamp()
        .setFooter("Glad to help you!", IMDB_LOGO)

    msg.reply({
        embeds: [newEmbed]
    })
}

export const sendHello = (channel, serverName) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("Hi There!")
        .setURL("https://top.gg/bot/927080106151792730")
        .setDescription(`Hi everyone! Thanks for inviting me to **${serverName}**!\nType in ${"`--imdb help`"} to get started!`)
        .setThumbnail(IMDB_LOGO)
        .setTimestamp()
        .setFooter("Happy to be here!", IMDB_LOGO)

    channel.send({
        embeds: [newEmbed]
    })
}