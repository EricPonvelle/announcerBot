require('module-alias/register')
const mongo = require('./mongo')

const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
client.config = require('./config')
client.commands = new Discord.Collection()

const { registerEvents, registerCommands } = require('./utils/registry')
client.once('ready', async function() {
    console.log("Connected to Discord")
    await mongo().then(async () => console.log('Connected to Mongo'))
    await registerEvents(client, '../events')
    await registerCommands(client, '../commands')
    await require('./features/leaderboard')(client)
})
client.login(client.config.token)