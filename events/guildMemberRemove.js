const MongoGuild = require("../library/MongoGuild")
const MongoUser = require('../library/MongoUser')
module.exports = async function(client, member) {
    const { guild } = member
    if (!guild.database) guild.database = await new MongoGuild(guild.id).get()
    if (member.id == guild.database.championId) guild.database = await new MongoGuild(guild.id).champion.setChampion('')
    await new MongoUser(guild.id, member.id).delete()
}