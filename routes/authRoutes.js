const controller = require('../controllers/authController')

let router = require('express').Router()

router.post('/register/user', (async (req, res, next) => {
    try {
        let result = await controller.registerUser(req.body.name, req.body.user, req.body.password, req.body.profile, req.body.maillingAddress, req.body.billingAddress, req.body.email, req.body.cpf).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário cadastrado com sucesso',
            data: {
                id: result._id,
                name: result.name,
                user: result.user,
                password: result.password,
                profile: result.profile,
                attributes: result.attributes
            }
        })
    } catch (err) {
        res.status(500).send('Não foi possivel cadastrar o usuário!')
    }
}))

router.post('/login', (async (req, res, next) => {
    try {
        let result = await controller.loginUser(req.body.email, req.body.password).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: result[0],
            autenticado: result[1],
            data: result[2]
        })
    } catch (err) {
        res.status(500).send('Não foi possivel logar o usuário!');
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

router.get('/recover/user', (async (req, res, next) => {
    try {

        let result = await controller.getUser(req.query.username).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário recebido com sucesso',
            data: result
        })
    } catch (err) {
        res.status(500).send('Não foi possivel listar o usuário!');
    }
}))

router.put('/update/user', (async (req, res, next) => {
    try {
        let result = await controller.updateUser(req.body.id, req.body.name, req.body.user, req.body.password, req.body.profile, req.body.maillingAddress, req.body.billingAddress).catch(err => { throw new Error(err) })
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

