const frete = require('frete')

/* -------------------- cepValidator ----------------------- 
------------------------------------------------------- */
let freightCalculator = async function (cep) {
  try {
    let destinyCep = JSON.stringify(cep)
    destinyCep = (destinyCep).split("")

    let found0 = destinyCep.indexOf(0,0)
    let found1 = destinyCep.indexOf(1,0)

    let freight
    if(found0 == -1) {
      freight = 10
    }else if(found1 == -1) {
      freight = 20
    }else {
      freight = 30
    }

    return freight

  } catch (error) {
    throw (error)
  }
}

module.exports = {
  freightCalculator
}