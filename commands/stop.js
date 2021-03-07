const { MessageEmbed } = require("discord.js")
const MongoGuild = require("../library/MongoGuild")

module.exports = {
    name: 'stop',
    description: "Stops the leaderboard",
    run: async function(message) {
        const embed = new MessageEmbed().setColor('RED')
        const { channel, guild } = message
        if (!guild.database.channelId.length) return channel.send(embed.setDescription("There isn't any leaderboard to stop"))

        const ch = guild.channels.cache.get(guild.database.channelId)
        if (ch) {
            const msg = await ch.messages.fetch(guild.database.messageId).catch(()=>{return})
            if (msg) msg.delete() 
        }

        guild.database = await new MongoGuild(guild.id).leaderboard.stop()
        return channel.send(embed.setDescription("The leaderboards has stopped"))
    }
}