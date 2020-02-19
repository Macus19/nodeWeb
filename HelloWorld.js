const http = require('http')
const server = http.createServer(function(req,res){
    const body = 'Hello World.'
    res.setHeader('Content-Type','text/plain')
    res.setHeader('Content-Length',body.length)
    res.statusCode = 200
    res.write(body)
    res.end()
})
server.listen(3000)