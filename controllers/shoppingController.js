var Shopping = require('../models/shopping')
const uniqid = require('uniqid');

var moment = require('moment-timezone');
moment().tz("America/Sao_Paulo").format();

/* -------------------- cepValidator ----------------------- 
------------------------------------------------------- */
let freightCalculator = async function (cep) {
  try {
    let destinyCep = cep
    destinyCep = destinyCep.trimLeft()
    destinyCep = (destinyCep).split("")

    let found0 = destinyCep.indexOf("0", 0)
    let found1 = destinyCep.indexOf("1", 0)

    let freight
    if (found0 == 0) {
      freight = 10
    } else if (found1 == 0) {
      freight = 20
    } else {
      freight = 30
    }

    return freight

  } catch (error) {
    throw (error)
  }
}


let checkout = async function (purchaseOrder) {
  try {

    var newOrder = new Shopping({
      user: purchaseOrder.user,
      itens: purchaseOrder.itens,
      checkoutCode: uniqid(),
      status: "Aguargando Pagamento",
      date: moment.now(),
      freight: purchaseOrder.freight,
      totalPrice: purchaseOrder.totalPrice,
      shippingAddress: purchaseOrder.shippingAddress,
      paymentMethod: purchaseOrder.paymentMethod
    })
    return (newOrder.save())

  } catch (error) {
    throw (error)
  }
}

/* -------------------- listOrders ----------------------- 

------------------------------------------------------- */
let listOrdersByUser = async function (user) {
  return new Promise(async function (resolve, reject) {
      try {
          let orders = await Shopping.find({user: user}, {
              __v: 0
          })

          let ordersTreated = await orders.map( (currentOrder,index) =>{
            let newDateFormat = moment(currentOrder.date).tz("America/Sao_Paulo").format("DD/MM/YYYY, HH:mm")
            newDateFormat = newDateFormat.split(",")

            let newOrder = {
              "_id": currentOrder._id,
              "itens": currentOrder.itens,
              "user": currentOrder.user,
              "checkoutCode": currentOrder.checkoutCode,
              "status": currentOrder.status,
              "dateTime": {date: newDateFormat[0], time:newDateFormat[1]},
              "freight": currentOrder.freight,
              "totalPrice": currentOrder.totalPrice,
              "shippingAddress": currentOrder.shippingAddress
          }

            return newOrder
          })

          await Promise.all(ordersTreated)
          
          resolve(ordersTreated.reverse())

      } catch (err) {
          reject('Erro ao listar os usuários: ' + err)
      }
  })
}

let listAllOrders = async function (user) {
  return new Promise(async function (resolve, reject) {
      try {
          let orders = await Shopping.find({}, {
              __v: 0
          })

          let ordersTreated = await orders.map( (currentOrder,index) =>{
            let newDateFormat = moment(currentOrder.date).tz("America/Sao_Paulo").format("DD/MM/YYYY, HH:mm")
            newDateFormat = newDateFormat.split(",")

            let newOrder = {
              "_id": currentOrder._id,
              "itens": currentOrder.itens,
              "user": currentOrder.user,
              "checkoutCode": currentOrder.checkoutCode,
              "status": currentOrder.status,
              "dateTime": {date: newDateFormat[0], time:newDateFormat[1]},
              "freight": currentOrder.freight,
              "totalPrice": currentOrder.totalPrice,
              "shippingAddress": currentOrder.shippingAddress
          }

            return newOrder
          })

          await Promise.all(ordersTreated)
          
          resolve(ordersTreated.reverse())

      } catch (err) {
          reject('Erro ao listar os usuários: ' + err)
      }
  })
}

let updateOrder = function (payload) {
  return new Promise(async function (resolve, reject) {
      try {

        let order = { status: payload.status}
        
          let orderDocument = await Shopping.findOneAndUpdate(payload.checkoutCode, order , {
              new: true,              
          })

          resolve(orderDocument)

      } catch (err) {
          reject('Erro ao atualizar o pedido: ' + err)
      }
  })
}


module.exports = {
  freightCalculator,
  checkout,
  listOrdersByUser,
  listAllOrders,
  updateOrder
}