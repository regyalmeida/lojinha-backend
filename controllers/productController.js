var Product = require('../models/product')

const cosController = require('../controllers/objectStorageController')
const fileController = require('../controllers/fileController')
const COS_BUCKET = 'lojinha'

/* --------------- registerProduct ----------------------- 
Create a new product document register and on the database
------------------------------------------------------- */
let registerProduct = function (name, description, price) {
    return new Promise(async (resolve, reject) => {
        try {
            let productExists = await Product.findOne({
                name: name
            })
    
            if (productExists) {
                return reject('Produto já cadastrado')
            }

            // TODO: chamar controller do COS para armazenar a imagem lá
            // let x = await cosController.getItem(COS_BUCKET, 'zy12a.jpg')
            let fileName = Math.random().toString(36).substring(7);
            let filePath = fileController.getFileFromFolder()
            var itemName = await cosController.createImageFile(COS_BUCKET, fileName, filePath)
    
            var newProduct = await new Product({
                name: name,
                description: description,
                price: price,
                imageName: itemName,
                category: category,
                quantity: quantity
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
            reject('Erro ao listar os produtos: ' + err)
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
            let products = await Product.find({}, {
                __v: 0
            })

            resolve(products)

        } catch (err) {
            reject('Erro ao listar os produtos: ' + err)
        }
    })
}

/* ------------------ updateUser ----------------------
Update a existing iser document on the database, finded 
by its ID
------------------------------------------------------- */
let updateUser = function (id, name, user, password, profile) {
    return new Promise(async function (resolve, reject) {
        try {

            var usuario = {
                name: name,
                user: user,
                profile: profile
            }
            if (password) {
                usuario.password = createHash(password)
            }

            let userDocument = await User.findByIdAndUpdate(id, usuario, {
                new: true,
                fields: {
                    password: 0,
                    __v: 0
                }
            })

            resolve(userDocument)

        } catch (err) {
            reject('Erro ao atualizar o usuário: ' + err)
        }
    })
}

/* ----------------- deleteUser ----------------------
Delete a existing user document on the database, finded 
by its ID
------------------------------------------------------- */
let deleteUser = function (id, profile) {
    return new Promise(async function (resolve, reject) {
        try {
            let usuario = await User.findByIdAndRemove(id)

            resolve(usuario)

        } catch (err) {
            reject('Erro ao atualizar o usuário: ' + err)
        }
    })
}


module.exports = {
    registerProduct: registerProduct,
    recoverProduct: recoverProduct, 
    listProducts: listProducts
    // updateUser: updateUser,
    // deleteUser: deleteUser
}
