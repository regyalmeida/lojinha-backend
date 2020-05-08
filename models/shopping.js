var mongoose = require('mongoose')

var shoppingSchema = new mongoose.Schema({    
    email: String,
    itens: Array
})

module.exports = mongoose.model('shopping', shoppingSchema)