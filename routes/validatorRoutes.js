const controller = require('../controllers/validatorController')

let router = require('express').Router()

router.get('/cep', (async (req, res, next) => {
    try {
        var result = await controller.cepValidator(req.query.cep).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Validação realizada com sucesso!',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

module.exports = router