var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageName: String,
    category: String,
    quantity: Number,
    flag: String
})

module.exports = mongoose.model('product', productSchema)