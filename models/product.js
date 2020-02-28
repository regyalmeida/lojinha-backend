var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageName: String
})

module.exports = mongoose.model('product', productSchema)