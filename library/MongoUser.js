const schema = require('@mongodb/user')
const mongo = require('@root/mongo')
module.exports = class MongoUser {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
    }
    async get(all = false) {
        await mongo()
        if (all) return await schema.find({ guildId: this.guildId })
        let data = await schema.findOne({ guildId: this.guildId, userId: this.userId })
        if (!data) data = await new schema({ guildId: this.guildId, userId: this.userId })
        return data
    }
    async delete() {
        await mongo()
        return await schema.findOneAndDelete({ guildId: this.guildId, userId: this.userId })
    }
    async add() {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $inc: { champion: 1 }}, { upsert: true, new: true })
    }
}