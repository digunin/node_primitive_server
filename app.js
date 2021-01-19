const http = require('http');
const fs = require('fs');

const PORT = 3000;

http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    switch(req.url){
        case "/":
            res.end("<h1>Home page</h1>");
            break;
        case "/hello":
            res.end("<h1>Hello!</h1>");
            break;
        case "/file":
            let str = fs.readFileSync("1");
            res.end(str);
            break;
    }
    res.end("Hello!");
}).listen(PORT, ()=>console.log(`Server started at port${PORT}`));