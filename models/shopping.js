var mongoose = require('mongoose')

var shoppingSchema = new mongoose.Schema({    
    user: String,
    itens: Array,
    checkoutCode: String,
    status: String,
    date: Number,
    freight: Number,
    totalPrice: Number,
    shippingAddress: Object,
    paymentMethod: String
})

module.exports = mongoose.model('shopping', shoppingSchema)