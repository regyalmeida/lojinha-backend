const controller = require('../controllers/authController')

let router = require('express').Router()

router.post('/register/user', (async (req, res, next) => {
    try {
        let result = await controller.registerUser(req.body.name, req.body.user, req.body.password, req.body.profile).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário cadastrado com sucesso',
            data: {
                id: result._id,
                name: result.name,
                user: result.user,
                password: result.password,
                profile: result.profile
            }
        })
    } catch (err) {
        res.status(500).send('Não foi possivel cadastrar o usuário!')
    }
}))

router.post('/login', (async (req, res, next) => {
    try {
        let result = await controller.loginUser(req.body.user, req.body.password).catch(err => { throw new Error(err) })
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

