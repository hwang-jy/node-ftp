const fs = require('fs');
const Client = require('ftp')
const config = {
    "host": "",
    "port": "",
    "user": "",
    "password": ""
}

/**
 * 
 * @param {string} file File to be downloaded from ftp server
 * @param {string} savePath Save path of the downloaded file
 * @param {function} callback
 */
 function download(file, savePath, callback){ 
    var c = new Client();
    c.connect(config);

    c.on('ready', () => {
        console.log('start: ftp download', file);
        c.get(file, (err, stream) => {
            if(err){
                callback(err);
                return;
            }
            
            stream.once('close', function() { c.end(); });
            stream.pipe(fs.createWriteStream(savePath));
            console.log('complete: ftp download');
            callback();
        });
    });
}

/**
 * 
 * @param {string} file File path to upload
 * @param {string} uploadPath path to upload to the ftp server
 * @param {function} callback
 */
function upload(file, uploadPath, callback){
    var c = new Client();
    c.connect(config);

    c.on('ready', () => {
        console.log('start: ftp upload', file);
        c.put(file, uploadPath, (err) => {
            if(err){
                callback(err);
                return;
            }

            c.end();
            console.log('complete: ftp upload');
            callback();
        });
    });
}

module.exports = { download, upload }