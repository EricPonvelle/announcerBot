const { MessageEmbed } = require('discord.js')
const MongoGuild = require('../library/MongoGuild')
const MongoUser = require('../library/MongoUser')
module.exports = {
    name: 'andnew',
    description: "Sets the new champion",
    minArgs: 1,
    expectedArgs: '<@member/id>',
    run: async function(message, args) {
        const { guild, channel } = message
        const embed = new MessageEmbed().setColor('RED')

        const role = guild.roles.cache.get(guild.database.roleId)
        if (!role) return channel.send(embed.setDescription(`There currently isn't any champion role at the moment, use \`${message.client.config.prefix}championrole <@&role/id>\` to set a champion role`))

        if (args[0].startsWith('<@') && args[0].endsWith('>')) args[0] = args[0].replace(/\D/g, '')
        const member = await guild.members.fetch(args[0]).catch(()=>{return})
        if (!member) return channel.send(embed.setDescription(`**${args[0]}** is an invalid guildmember`))
        if (member.id == guild.database.championId) return channel.send(embed.setDescription(`${member} is already the current champion`))

        if (guild.database.championId.length) {
            const previousChampion = await guild.members.fetch(guild.database.championId).catch(()=>{return})
            if (previousChampion && previousChampion.roles.cache.has(role.id)) previousChampion.roles.remove(role.id)
        }

        if (!member.roles.cache.has(role.id)) member.roles.add(role.id)
        guild.database = await new MongoGuild(guild.id).champion.setChampion(member.id)
        await new MongoUser(guild.id, member.id).add()
        return channel.send(embed.setDescription(`${member} is now the new champion`).setColor('GREEN'))
    }
}