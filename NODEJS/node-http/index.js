const http = require('http');//import http
const fs = require('fs'); //import file system core module:allow you to read and write the file
const path = require('path');//import path core modules: allow you to specify the path of your file system 

const hostname = 'localhost';
const port = 3001;

// seting up server:
const server = http.createServer((req,res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
    
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
          fs.exists(filePath, (exists) => {
            if (!exists) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/html');
              res.end('<html><body><h1>Error 404: ' + fileUrl + 
                          ' not1 found</h1></body></html>');
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
          });
        }
        else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                  ' not2 a HTML file</h1></body></html>');
        }
      }
      else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + req.method + 
                  ' not3 supported</h1></body></html>');
      }
    })

//starting up server:
server.listen(port, hostname,() => {
    console.log(`server running a http://${hostname}:${port}`)
})
