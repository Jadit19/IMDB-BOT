import dotenv from "dotenv"
dotenv.config()

export const BOT_INVITE_LINK = "https://discord.com/oauth2/authorize?client_id=927080106151792730&scope=bot-"
export const PREFIX = process.env.PREFIX || "--imdb"
export const BOT_TOKEN = process.env.BOT_TOKEN
export const MOVIE_URL = "https://www.imdb.com"
export const IMDB_LOGO = "https://m.media-amazon.com/images/G/01/imdb/images/social/imdb_logo.png"