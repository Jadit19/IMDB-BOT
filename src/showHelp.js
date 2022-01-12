import { MessageEmbed } from "discord.js"
import { IMDB_LOGO } from "../config.js"

export const showHelp = (msg) => {
    const newEmbed = new MessageEmbed()
        .setColor("#f5c518")
        .setTitle("HELP")
        .setURL("https://github.com/Jadit19/IMDB-BOT")
        .setDescription("Here are the list of commands about the tasks I can perform.. I'm learning fast so there will soon be many additions to this list :grin:")
        .setThumbnail(IMDB_LOGO)
        
        .addFields(
            { name: "\u200B", value: "\u200B" },
            { name: "`--imdb HELP`", value: "Yup, the command that you just used. This is for displaying all the jobs I can do" },
            { name: "`--imdb ST <title-name>`", value: "Search for movies, TV shows, etc. with the given title" },
            { name: "`--imdb TI <title-name>`", value: "Returns information about Movies, TV shows, etc. with the given title" },
            { name: "`--imdb SP <person-name>`", value: "Search for people with the given name" },
            { name: "`--imdb PI <person-name>`", value: "Returns information about the person with the given name" },
            { name: "`--imdb INVITE`", value: "Invite the IMDB-BOT to other servers!" },
            { name: "`--imdb CONTACT`", value: "Meet my creator!" },
            { name: "\u200B", value: "And no, I'm not case sensitive so you can type in any case you want! Just make sure you type `--imdb` in front of your message" }
        )
            
        .setTimestamp()
        .setFooter("Glad to help you!", IMDB_LOGO)

    msg.reply({
        embeds: [newEmbed]
    })
}