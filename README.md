# node-ftp
using ftp on node

    npm install ftp

usage

    // write config
    var config = {
      "host": "",
      "port": "",
      "user": "",
      "password": ""
    }

    // example
    app.post('/download', (req, res) => {
      var reqPath = req.body.reqFilePath; // "ftp.txt"
      var resPath = req.body.resFilePath; // "local.txt"
      
      download(reqPath, resPath, (err) => {
        if(err) throw err;
      });
    });
    
    
    upload('local.txt', 'ftp.txt', (err) => {
      if(err) throw err;
    });
