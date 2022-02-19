import { MessageEmbed, Permissions } from "discord.js"
import { IMDB_LOGO, BOT_INVITE_LINK } from "../config.js"

export const exitServer = (msg) => {
    if (msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)){
        const newEmbed = new MessageEmbed()
            .setColor("#f5c518")
            .setTitle("See you soon!")
            .setURL(BOT_INVITE_LINK)
            .setThumbnail(IMDB_LOGO)
            .setDescription(`I had a great time with you guys! :heart:\nHope to be invited back in **${msg.guild.name}** using the above link..`)
            .setTimestamp()
            .setFooter("I'll miss your company!", IMDB_LOGO)

        msg.reply({
            embeds: [newEmbed]
        })

        try {
            msg.guild.leave()
        } catch (error){
            msg.reply(`Uh oh! There was an error leaving **${msg.guild.name}**! (Totally non-intentional) Please try again :person_bowing:`)
            console.log(error)
        }
    } else {
        msg.reply("Sorry! You don't have permission to kick members!")
    }
}