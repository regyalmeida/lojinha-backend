var Faq = require('../models/faq')

/* -------------------- listProducts ----------------------- 
Retrieves all existing products documents from the 
database
------------------------------------------------------- */
let listFaq = function () {
    return new Promise(async function (resolve, reject) {
        try {
            let faq = await Faq.find({}, {
                __v: 0
            })

            resolve(faq)

        } catch (err) {
            throw(err)
        }
    })
}

/* --------------- registerProduct ----------------------- 
Create a new product document register and on the database
------------------------------------------------------- */
let registerFaq = function (question, answer) {
    return new Promise(async (resolve, reject) => {
        try {
          
            var newQuestion = await new Faq({
                question: question,
                answer: answer,
              
            })
            let savedQuestion = await newQuestion.save()
            return resolve(savedQuestion)
    
        } catch (err) {
            throw (err)
        }
    })
}

module.exports = { 
    listFaq,
    registerFaq
}