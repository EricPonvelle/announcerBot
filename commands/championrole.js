const { MessageEmbed } = require("discord.js")
const MongoGuild = require('../library/MongoGuild')
module.exports = {
    name: 'championrole',
    description: "Sets/gets the champion role",
    run: async function(message, args) {
        const { channel, guild } = message
        const embed = new MessageEmbed().setColor('RED')
        if (!args.length) {
            const role = guild.roles.cache.get(guild.database.roleId)
            if (!role) return channel.send(embed.setDescription(`There currently isn't any champion role at the moment, use \`${message.client.config.prefix}${this.name} <@&role/id>\` to set a champion role`))
            return channel.send(embed.setDescription(`**Champion Role:** ${role}`).setColor('ORANGE'))
        }

        if (args[0].startsWith('<@&') && args[0].endsWith('>')) args[0] = args[0].replace(/\D/g, '')
        const role = guild.roles.cache.find(r => [r.id, r.name].includes(args[0]))
        if (!role) return channel.send(embed.setDescription(`**${args[0]}** is an invalid role`))
    
        guild.database = await new MongoGuild(guild.id).champion.setRole(role.id)
        return channel.send(embed.setDescription(`**New Champion Role**: ${role}`).setColor('GREEN'))
    }
}