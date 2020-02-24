var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    user: String,
    password: String,
    profile: String
})

module.exports = mongoose.model('user', userSchema)