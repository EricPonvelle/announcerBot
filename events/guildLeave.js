const MongoGuild = require('../library/MongoGuild')
module.exports = async function(client, guild) {
    await new MongoGuild(guild.id).delete()
}