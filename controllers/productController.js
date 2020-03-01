var Product = require('../models/product')

const cosController = require('../controllers/objectStorageController')
const fileController = require('../controllers/fileController')
const COS_BUCKET = 'lojinha'

/* --------------- registerProduct ----------------------- 
Create a new product document register and on the database
------------------------------------------------------- */
let registerProduct = function (name, description, price, category, quantity) {
    return new Promise(async (resolve, reject) => {
        try {
            let productExists = await Product.findOne({
                name: name
            })
    
            if (productExists) {
                return reject('Produto já cadastrado')
            }

            let fileName = Math.random().toString(36).substring(7);
            let filePath = fileController.getFileFromFolder()
            var itemName = await cosController.createImageFile(COS_BUCKET, fileName, filePath)
    
            var newProduct = await new Product({
                name: name,
                description: description,
                price: price,
                imageName: itemName,
                category: category,
                quantity: quantity,
                flag: 'active'
            })
            let product = await newProduct.save()
            return resolve(product)
    
        } catch (err) {
            throw (err)
        }
    })
}

/* -------------------- recoverProduct ----------------------- 

------------------------------------------------------- */
let recoverProduct = function (id) {
    return new Promise(async function (resolve, reject) {
        try {
            let products = await Product.find({_id: id}, {
                __v: 0
            })

            resolve(products)

        } catch (err) {
            throw(err)
        }
    })
}

/* -------------------- listProducts ----------------------- 
Retrieves all existing products documents from the 
database
------------------------------------------------------- */
let listProducts = function () {
    return new Promise(async function (resolve, reject) {
        try {
            let products = await Product.find({flag:'active'}, {
                __v: 0
            })

            resolve(products)

        } catch (err) {
            throw(err)
        }
    })
}


/* ------------------ updateUser ----------------------
Update a existing iser document on the database, finded 
by its ID
------------------------------------------------------- */
let updateProduct = function (id, name, description, price, category, quantity, imageName, flag) {
    return new Promise(async function (resolve, reject) {
        try {

            var newProduct = {
                name: name,
                description: description,
                price: price,
                imageName: imageName,
                category: category,
                quantity: quantity,
                flag: flag
            }
           
            let produto = await Product.findByIdAndUpdate(id, newProduct, {
                new: true            
            })

            resolve(produto)

        } catch (err) {
            reject('Erro ao atualizar o usuário: ' + err)
        }
    })
}

/* ----------------- deleteProduct ----------------------
Delete a existing user document on the database, finded 
by its ID
------------------------------------------------------- */
let inativeProduct = function (id, name, description, price, category, quantity, imageName) {
    return new Promise(async function (resolve, reject) {
        try {
            var newProduct = {
                name: name,
                description: description,
                price: price,
                imageName: imageName,
                category: category,
                quantity: quantity,
                flag: 'inative'
            }
            let produto = await Product.findByIdAndUpdate(id, newProduct, {
                new: true            
            })

            resolve(produto)

        } catch (err) {
            throw(err)
        }
    })
}


module.exports = {
    registerProduct: registerProduct,
    recoverProduct: recoverProduct, 
    listProducts: listProducts,
    updateProduct: updateProduct,
    inativeProduct: inativeProduct
}
