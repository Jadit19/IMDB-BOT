import Discord from "discord.js"
const { Client, Intents } = Discord

import { PREFIX, BOT_TOKEN, MOVIE_URL } from "./config.js"

import { showHelp } from "./src/showHelp.js"
import { contactInfo } from "./src/contact.js"
import { sendInvite } from "./src/invite.js"
import { sendMoviesData } from "./src/movieSearch.js"
import { sendMovieInfo } from "./src/movieInfo.js"
import { sendPersonsData } from "./src/actorSearch.js"
import { sendPersonInfo } from "./src/actorInfo.js"

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: '--imdb HELP',
            type: 'PLAYING',
            url: "https://github.com/Jadit19/IMDB-BOT"
        }]
    })
})

client.on("message", async (msg) => {
    if (msg.author.bot){
        return
    }

    if (msg.content.startsWith(PREFIX)){
        const[P, CMD, ...args] = msg.content
            .trim() 
            .substring(PREFIX.length)
            .split(/\s+/)
        
        if (!CMD){
            msg.reply(`Please write a command name and a name after **${PREFIX}**`)
        } else {
            const CMD_NAME = CMD.toUpperCase()
            const goodName = args.join(" ")
            const enteredName = args.join("+")
            const searchURL = MOVIE_URL + "/find?q=" + enteredName
            
            if (CMD_NAME == "HELP"){
                showHelp(msg)
            } else if (CMD_NAME == "CONTACT"){
                contactInfo(msg)
            } else if (CMD_NAME == "INVITE"){
                sendInvite(msg)
            } else if (CMD_NAME == "ST"){
                if (args.length == 0){
                    msg.reply(`Please write a name after **${PREFIX} ${CMD_NAME}**`)
                    return
                }
                sendMoviesData(msg, searchURL, goodName)
            } else if (CMD_NAME == "TI"){
                if (args.length == 0){
                    msg.reply(`Please write a name after **${PREFIX} ${CMD_NAME}**`)
                    return
                }
                sendMovieInfo(msg, searchURL, goodName)
            } else if (CMD_NAME == "SP"){
                if (args.length == 0){
                    msg.reply(`Please write a name after **${PREFIX} ${CMD_NAME}**`)
                    return
                }
                sendPersonsData(msg, searchURL, goodName)
            } else if (CMD_NAME == "PI"){
                if (args.length == 0){
                    msg.reply(`Please write a name after **${PREFIX} ${CMD_NAME}**`)
                    return
                }
                sendPersonInfo(msg, searchURL, goodName)
            } else {
                msg.reply("Sorry! I didn't recognize that command..\nYou can write `--imdb HELP` for the list of available commands :upside_down:")
            }
        }
    }
})

client.login(BOT_TOKEN)