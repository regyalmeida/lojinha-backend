const controller = require('../controllers/productController')

let router = require('express').Router()

const upload = require('../connectors/localStorageConnector').upload

router.post('/register',  upload.single('file'), (async (req, res, next) => {
    try {
        let result = await controller.registerProduct(req.body.name, req.body.description, req.body.price, req.body.category, req.body.quantity).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto cadastrado com sucesso',
            data: {
                id: result._id,
                name: result.name,
                desciption: result.desciption,
                price: result.price,
                image: result.imageName,
                category: result.category,
                quantity: result. quantity
            }
        })
    } catch (err) {
        next(err.message)
    }
}))

router.get('/recover/', (async (req, res, next) => {
    try {
        if(req.query.id) {
            var result = await controller.recoverProduct(req.query.id).catch(err => { throw new Error(err) })
        }
        else {
            var result = await controller.listActiveProducts().catch(err => { throw new Error(err) })
        }
        res.status(200).send({
            message: 'Produto(s) recuperado(s) com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.get('/recover/active', (async (req, res, next) => {
    try {
        var result = await controller.listProducts().catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto(s) recuperado(s) com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.put('/update', (async (req, res, next) => {
    try {
        let result = await controller.updateProduct(req.body).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.put('/inactive', (async (req, res, next) => {
    try {
        let result = await controller.inactiveProduct(req.body._id).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto inativado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.put('/active', (async (req, res, next) => {
    try {
        let result = await controller.activeProduct(req.body._id).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto ativado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

module.exports = router

