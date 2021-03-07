const { MessageEmbed } = require("discord.js")
const MongoGuild = require('../library/MongoGuild')
const MongoUser = require('../library/MongoUser')
module.exports = {
    name: 'start',
    description: "Starts the leaderboard",
    run: async function(message) {
        const { guild, channel } = message
        const embed = new MessageEmbed().setColor('ORANGE').setTitle("Leaderboard")

        let datas = await new MongoUser(guild.id).get(true)
        const index = datas.map(u => u.userId).indexOf(guild.database.championId)
        if (index > -1) {
            const data = datas[index]
            data.champion = data.champion + 1000 - 1
            datas.splice(index, 1, data)
        }
        datas.sort((a, b) => b.champion - a.champion)
        
        datas = datas.slice(0, 10)
        for (i = 0; i < datas.length; i++) datas.splice(i, 1, `**${i + 1}.** <@${datas[i].userId}> • ${datas[i].champion} XP`)
        
        const msg = await channel.send(embed.setDescription(datas.join('\n\n')))
        return guild.database = await new MongoGuild(guild.id).leaderboard.start(channel.id, msg.id)
    }
}