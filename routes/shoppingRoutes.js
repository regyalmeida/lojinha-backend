const controller = require('../controllers/shoppingController')

let router = require('express').Router()

router.get('/freight', (async (req, res, next) => {
    try {
        let result = await controller.freightCalculator(req.query.cep).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Frete recuperado com sucesso',
            data: {
                freight: result,
            }
        })
    } catch (err) {
        next(err.message)
    }
}))

router.post('/checkout', (async (req, res, next) => {
    try {
        let result = await controller.checkout(req.body).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Compra realizada com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.get('/recover/orders', (async (req, res, next) => {
    try {
        var result
        if(req.query.profile == 'cliente') result = await controller.listOrdersByUser(req.query.user).catch(err => { throw new Error(err) })
        else  result = await controller.listAllOrders().catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Compras recuperadas com sucesso',
            data: result            
        })
    } catch (err) {
        next(err.message)
    }
}))

router.put('/order', (async (req, res, next) => {
    try {
        let result = await controller.updateOrder(req.body).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Pedido atualizado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))


module.exports = router