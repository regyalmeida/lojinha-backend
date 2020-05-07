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

module.exports = router