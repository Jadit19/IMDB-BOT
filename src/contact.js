import { MessageEmbed } from "discord.js"
import { IMDB_LOGO } from "../config.js"

export const contactInfo = async (msg) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("Jadit19")
        .setURL("https://github.com/Jadit19")
        .setThumbnail(IMDB_LOGO)
        .setDescription("Here's the person who is responsible for my creation. Go check out his GitHub ID!")
        .addField("Adit Jain", "https://github.com/Jadit19")
        .setImage("https://avatars.githubusercontent.com/u/77121346?v=4")
        .setTimestamp()
        .setFooter("Glad to help you!", IMDB_LOGO)

    msg.reply({
        embeds: [newEmbed]
    })
}