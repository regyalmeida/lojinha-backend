var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageName: String,
    category: String,
    quantity: Number
})

module.exports = mongoose.model('product', productSchema)