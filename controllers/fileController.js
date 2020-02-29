var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync('./images/file.jpg');
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


function getFileFromFolder() {
    // read binary data
    var data = fs.readFileSync('./images/file.jpg');
    
    return data
}

async function unlinkFileFromFolder() {
    var unliked = await fs.unlink('./images/file.jpg' , function(){console.log('Deleted avatar')})

    return unliked
}




module.exports = {
    base64_encode: base64_encode,
    getFileFromFolder: getFileFromFolder,
    unlinkFileFromFolder: unlinkFileFromFolder

}