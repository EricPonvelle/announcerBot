const schema = require('../mongodb/guild')
const mongo = require('../mongo')
module.exports = class MongoGuild {
    constructor(guildId) {
        this.guildId = guildId
        this.champion = new Champion(this.guildId)
        this.leaderboard = new Leaderboard(this.guildId)
    }
    /**
     * @param {Boolean} all Whether or not to retrieve anything from the database, default set to false
     */
    async get(all = false) {
        await mongo()
        if (all) return await schema.find()

        let data = await schema.findOne({ guildId: this.guildId })
        if (!data) data = await new schema({ guildId: this.guildId }).save()
        return data
    }
    async delete() {
        await mongo()
        return await schema.findOneAndDelete({ guildId: this.guildId })
    }
}
class Champion {
    constructor(guildId) {
        this.guildId = guildId
    }
    async setRole(roleId) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { roleId }}, { upsert: true, new: true })
    }
    async setChampion(userId) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { championId: userId } }, { upsert: true, new: true })
    }
}
class Leaderboard {
    constructor(guildId) {
        this.guildId = guildId
    }
    async start(channelId, messageId) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { channelId, messageId } })
    }
    async stop() {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { channelId: '', messageId: '' } })
    }
}