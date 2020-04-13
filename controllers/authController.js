var User = require('../models/user')
var bCrypt = require('bcrypt-nodejs')


/* ------------------ loginUser ----------------------- 
Verify if a given user and pass are valid and return 
the result, allowing or not the successfully login
------------------------------------------------------- */
let loginUser = function (user, password) {
    return new Promise(async function (resolve, reject) {
        try {
            let usuario = await User.findOne({
                user: user
            })

            if (!usuario) return resolve(['Usuário não cadastrado', false, null])

            if (!isValidPassword(usuario, password)) {
                return resolve(['Senha incorreta', false, null])
            }

            resolve(['Senha correta', true, {
                _id: usuario._id,
                name: usuario.name,
                user: usuario.user,
                profile: usuario.profile
            }])

        } catch (err) {
            reject('Erro no login do usuário: ' + err)
        }
    })
}

/* --------------- registerUser ----------------------- 
Create a new user document register and on the database
------------------------------------------------------- */
let registerUser = function (name, user, password, profile, maillingAddress, billingAddress, email, cpf) {
    return new Promise(async function (resolve, reject) {
        try {
            //Verifica se o usuário já existe
            let usuario = await User.findOne({
                user: user
            })

            let usuarioCpf = await User.findOne({
                cpf: cpf
            })

            let usuarioEmail = await User.findOne({
                email: email
            })

            if (usuario || usuarioCpf || usuarioEmail) {
                return reject('Usuário já cadastrado')
            }

            //Cria e salva um novo usuário
            var newUser = new User({
                name: name,
                user: user,
                password: createHash(password),
                profile: profile,
                maillingAddress: maillingAddress,
                billingAddress: billingAddress,
                email: email,
                cpf: cpf
            })
            return resolve(newUser.save())

        } catch (err) {
            return reject('Erro ao registrar usuário: ' + err)
        }
    })
}


/* -------------------- listUsers ----------------------- 
Retrieves all existing users documents from the 
database
------------------------------------------------------- */
let listUsers = function (profile) {
    return new Promise(async function (resolve, reject) {
        try {
            let usuarios = await User.find({profile: profile}, {
                __v: 0
            })

            resolve(usuarios)

        } catch (err) {
            reject('Erro ao listar os usuários: ' + err)
        }
    })
}

/* ------------------ updateUser ----------------------
Update a existing iser document on the database, finded 
by its ID
------------------------------------------------------- */
let updateUser = function (id, name, user, password, profile, maillingAddress, billingAddress) {
    return new Promise(async function (resolve, reject) {
        try {

            var usuario = {
                name: name,
                user: user,
                profile: profile,
                maillingAddress: maillingAddress,
                billingAddress: billingAddress
            }
            if(password) {
                usuario.password =  createHash(password)
            }

            let userDocument = await User.findByIdAndUpdate(id, usuario , {
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

/* ----------------- createHash ----------------------
Generates a password hash, using bCrypt
------------------------------------------------------- */
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

/* -------------- isValidPassword ----------------------
Validates a given password, using bCrypt
------------------------------------------------------- */
var isValidPassword = function (usuario, password) {
    return bCrypt.compareSync(password, usuario.password);
}

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    listUsers: listUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
}
