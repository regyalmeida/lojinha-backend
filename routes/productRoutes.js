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


router.get('/recover/users', (async (req, res, next) => {
    try {

        let result = await controller.listUsers(req.query.profile).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuários recebidos com sucesso',
            data: result
        })
    } catch (err) {
        res.status(500).send('Não foi possivel listar os usuários!');
    }
}))

router.put('/update/user', (async (req, res, next) => {
    try {
        let result = await controller.updateUser(req.body.id, req.body.name, req.body.user, req.body.password, req.body.profile).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário atualizado com sucesso',
            data: result
        })
    } catch (err) {
        res.status(500).send('Não foi possivel atualizado o usuário!');
    }
}))

router.delete('/delete/user', (async (req, res, next) => {
    try {
        let result = await controller.deleteUser(req.body.id).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário deletado com sucesso',
            data: result
        })
    } catch (err) {
        res.status(500).send('Não foi possivel deletar o usuário!');
    }
}))

module.exports = router

