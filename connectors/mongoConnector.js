const mongoose = require('mongoose')

/* -------------------mongoConnect----------------------
Responsible for create a mongo connection based on its
credentials
------------------------------------------------------*/
async function mongoConnect() {
    try {
        mongoose.connect('mongodb://admin:senha4x@ds131900.mlab.com:31900/lojinha', {
            ssl: false,                        
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }).catch(err => {
            throw new Error(err)
        })

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', console.log.bind(console, 'Mongo ready'))

    } catch (error) {
        throw (error)
    }
}

module.exports = {
    mongoConnect: mongoConnect
}