'use strict'

require('dotenv').config();

const express = require('express')
const cfenv = require('cfenv')
const cors = require('cors')

const app = express()
const appEnv = cfenv.getAppEnv()

//Import route files
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const faqRoutes = require('./routes/faqRoutes')
const validatorRoutes = require('./routes/validatorRoutes')

//Import connector files
const mongoConnector = require('./connectors/mongoConnector')

//Data parsers for the request body
app.use(express.json())

//Allowing CORS to FRONTEND reqs in another domain
app.use(cors())

//DB connection
mongoConnector.mongoConnect()
// cosConnector.cosConnect()

//Define the route files here
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/faq', faqRoutes)
app.use('/api/validator', validatorRoutes)

//Error middleware
app.use((error, req, res, next) => {
    return res.status(500).send({ error })
})

//Starts the application server 
app.listen(appEnv.port, function () {
    console.log('Server running on port: ' + appEnv.port);
});

module.exports = app;