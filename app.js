const http = require('http');
const PORT = 3000;

http.createServer((req, res)=>{
    res.end("Hello!");
}).listen(PORT, ()=>console.log(`Server started at port${PORT}`));