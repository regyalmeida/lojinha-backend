const myCOS = require('ibm-cos-sdk');

/* -------------------cosConnect----------------------
Responsible for create a cloud object storage connection 
based on its credentials
------------------------------------------------------*/
async function cosConnect() {
    try {
        var config = {
            endpoint: 'https://s3.dal.us.cloud-object-storage.appdomain.cloud',
            apiKeyId: 'AHQcqmfRnSOIHS-23Dd1MBe5bpJRajOLwwmnNd3eVDF7',
            serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/d198d9bf4c8149548974668576f9bbf4:50542339-5600-4a99-bf31-c1ba73063fa0::',
        };
        
        var cosClient = new myCOS.S3(config)
        console.log(cosClient)
        return cosClient

    } catch (error) {
        throw (error)
    }
}

module.exports = {
    cosConnect: cosConnect
}



// {
//     "apikey": "AHQcqmfRnSOIHS-23Dd1MBe5bpJRajOLwwmnNd3eVDF7",
//     "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
//     "iam_apikey_description": "Auto-generated for key ce673953-2b59-4275-8a13-457aba283fc2",
//     "iam_apikey_name": "Service credentials-1",
//     "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
//     "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/d198d9bf4c8149548974668576f9bbf4::serviceid:ServiceId-9fd1263a-e2c8-498c-a125-1d1a9187b9af",
//     "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/d198d9bf4c8149548974668576f9bbf4:50542339-5600-4a99-bf31-c1ba73063fa0::"
//   }