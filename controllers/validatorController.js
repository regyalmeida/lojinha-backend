var validatorConnector = require('../connectors/validatorConnector')

/* -------------------- cepValidator ----------------------- 
------------------------------------------------------- */
let cepValidator = async function (cep) {
  try {
      let validationResponse = await validatorConnector.sendToApproval(cep)
      if(!validationResponse.data.erro) return {isValid:true}
      else return {isValid:false}

  } catch (error) {
      throw (error)
  }
}

module.exports = { 
    cepValidator
}