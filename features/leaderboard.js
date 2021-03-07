const { MessageEmbed } = require('discord.js')
const MongoGuild = require('../library/MongoGuild')
const MongoUser = require('../library/MongoUser')
async function leaderboard(client) {
    const databases = await new MongoGuild().get(true)
    for (const database of databases) {
        const { channelId, messageId, guildId } = database
        const channel = client.channels.cache.get(channelId)
        if (channel) {
            const guild = client.guilds.cache.get(guildId)
            if (!guild.database) guild.database = database
            const embed = new MessageEmbed().setColor('ORANGE').setTitle('Leaderboard')
            
            let userDatas = await new MongoUser(guild.id).get(true)
            const index = userDatas.map(u => u.userId).indexOf(guild.database.championId)
            if (index > -1) {
                const data = userDatas[index]
                data.champion = data.champion + 1000 - 1
                userDatas.splice(index, 1, data)
            }

            userDatas.sort((a, b) => b.champion - a.champion)
            userDatas = userDatas.slice(0, 10)
            for (i = 0; i < userDatas.length; i++) userDatas.splice(i, 1, `**${i + 1}.** <@${userDatas[i].userId}> • ${userDatas[i].champion} XP`)
            
            let message = await channel.messages.fetch(messageId).catch(()=>{return})
            if (!message) {
                message = await channel.send(embed.setDescription(userDatas.join('\n\n')))
                await new MongoGuild(guild.id).leaderboard.start(channelId, message.id)
            }
            else message.edit(embed.setDescription(userDatas.join('\n\n')))
        }
    }
    setTimeout(() => leaderboard(client), 10000)
}
module.exports = async function(client) {
    leaderboard(client)
}