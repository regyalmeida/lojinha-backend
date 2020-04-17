const axios = require('axios');


const URL_API = 'http://viacep.com.br/ws/'

const HEADERS = {
    'Accept': 'application/json'
}


async function sendToApproval(cep) {
    try {

        var options = {
            method: 'get',
            url: URL_API + "/" + cep + '/json/',
            headers: HEADERS            
        }

        var cepApproval = await axios(options);

        return cepApproval
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

module.exports = {
    sendToApproval
}