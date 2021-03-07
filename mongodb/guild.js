const mongoose = require('mongoose')
const str = { type: String, default: '' }
const schema = mongoose.Schema({
    guildId: str,
    roleId: str,
    championId: str,
    channelId: str,
    messageId: str
})
module.exports = mongoose.model('guild', schema)