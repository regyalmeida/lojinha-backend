const controller = require('../controllers/faqController')

let router = require('express').Router()

router.post('/register', (async (req, res, next) => {
    try {
        let result = await controller.registerFaq(req.body.question, req.body.answer).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Pergunta cadastrado com sucesso',
            data: {
                question: result.question,
                answer: result.answer
            }
        })
    } catch (err) {
        next(err.message)
    }
}))

router.get('/recover', (async (req, res, next) => {
    try {
        var result = await controller.listFaq().catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'FAQ recuperada com sucesso',
            data: result
        })
    } catch (err) {
        next(err.message)
    }
}))

module.exports = router