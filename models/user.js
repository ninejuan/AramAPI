const mongo = require("mongoose")

const userdata = new mongo.Schema({
    Id: { type: String },
    provider: { type: String },
    ApiKey: { type: String },
    ApiUUID: { type: String }
})

module.exports = mongo.model("유저DB", userdata)
