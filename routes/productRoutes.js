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
            var result = await controller.listProducts().catch(err => { throw new Error(err) })
        }
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
        let result = await controller.updateProduct(req.body.id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.quantity, req.body.imageName, req.body.flag).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

router.put('/delete', (async (req, res, next) => {
    try {
        let result = await controller.inativeProduct(req.body._id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.quantity, req.body.imageName).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Produto deletado com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

module.exports = router

