// A BASIC Node server
// Working with the HTTP Request Object

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const formidable = require("formidable");

const server = http.createServer(function(req, res) {
    // req.method //GET, POST
    // console.log(http.METHODS);//http.methods
    // console.log(http.STATUS_CODES);//http.status
    // console.log(req.headers);
    let path=url.parse(req.url, true);
    //path.pathname...path.search..path.port..path.origin

    if (req.method.toLowerCase()=='post'){
        let form =new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(err){
                console.error(err.message);
                return;
            }
            res.writeHead(200, "OK", {'Content-Type':'text/plain'});
            res.write("The POST output response\n\n");
            res.end(util.inspect({fields:fields, files:files }));
        });

    }else if(req.method.toLowerCase()=='get'){
        res.writeHead(200, "OK", {'Content-Type':'text/plain'});
        res.write("The response \n\n");
        res.write(util.inspect(path.query) + "\n\n");
        res.end("End of Message to Browser");

    }else{
        //deal with other method
    }

    // let decoder=new StringDecoder('utf-8');
    // let buffer = '';
    // req.on('data', function(chunk){
    //     buffer=decoder.write(chunk);
    // })

    // req.on('end', function(chunk){
    //     buffer +=decoder.end();
    //     res.writeHead(200, "OK", {'Content-Type':'text/plain'});
    //     res.write("The response \n\n");
    //     res.write(util.inspect(path.query) + "\n\n");
    //     res.write(buffer + "\n\n");
    //     res.end("End of Message to Browser");
    // })
  


    
});

server.listen(1234, function() {
  console.log("Listening on port 1234");
});