var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync('./images/37-5.jpg');
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


function getFileFromFolder(file) {
    // read binary data
    var data = fs.readFileSync('./images/37-5.jpg');
    
    return data
}

function unlinkFileFromFolder(filePath) {
    var unliked = fs.unlink(filePath)

    return unliked
}




module.exports = {
    base64_encode: base64_encode,
    getFileFromFolder: getFileFromFolder,
    unlinkFileFromFolder: unlinkFileFromFolder

}