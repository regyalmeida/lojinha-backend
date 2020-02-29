// const cosConnector = require('../connectors/objectStorageConnector')
const myCOS = require('ibm-cos-sdk');
const fileController = require('../controllers/fileController')

var config = {
    endpoint: 'https://s3.us-south.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'AHQcqmfRnSOIHS-23Dd1MBe5bpJRajOLwwmnNd3eVDF7',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/d198d9bf4c8149548974668576f9bbf4:50542339-5600-4a99-bf31-c1ba73063fa0::',
};

var cosClient = new myCOS.S3(config)


async function getBucketContents(bucketName) {
    console.log(`Retrieving bucket contents from: ${bucketName}`);
    return cosClient.listObjects(
        {Bucket: bucketName},
    ).promise()
    .then((data) => {
        if (data != null && data.Contents != null) {
            for (var i = 0; i < data.Contents.length; i++) {
                var itemKey = data.Contents[i].Key;
                var itemSize = data.Contents[i].Size;
                console.log(`Item: ${itemKey} (${itemSize} bytes).`)
            }
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

async function getItem(bucketName, itemName) {
    console.log(`Retrieving item from bucket: ${bucketName}, key: ${itemName}`);
    return cosClient.getObject({
        Bucket: bucketName, 
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
            console.log('File Contents: ' + Buffer.from(data.Body).toString());
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function createBucket(bucketName) {
    try {
        // var cos = cosConnector.cosConnect()
        console.log(`Creating new bucket: ${bucketName}`)
    
        return new Promise((resolve, reject) => {
            cosClient.createBucket({
                Bucket: bucketName, 
                CreateBucketConfiguration: {
                    LocationConstraint: 'us-standard'
                } 
            }, function(err, data) {
                if(err) reject(err)
                else resolve(data)
            })
        })
    } catch (error) {
        throw(error)
    }
   
}

async function createImageFile(bucketName, itemName, fileText) {
    try {
        console.log(`Creating new item: ${itemName}`);
    
        return new Promise(async (resolve, reject) => {
            cosClient.putObject({
                Bucket: bucketName, 
                Key: itemName+".jpg", 
                Body: fileText
            }, async function(err, data) {
                if(err) reject(err)
                else {
                    await fileController.unlinkFileFromFolder()
                    return resolve(itemName)
                }
            })
        })
    } catch (error) {
        throw(error)
    }
   
}



module.exports = {
    getBucketContents: getBucketContents,
    createImageFile: createImageFile, 
    createBucket:createBucket,
    getItem: getItem
}