var connect = require('connect')
var app = connect()
app.use(logger)
app.use(hello)
app.listen(3000)

// 输出http请求的方法和url并调用next()
function logger(req,res,next){
    console.log('%s %s',req.method,req.url)
    next()
}

// 用hello world响应http请求
function hello(req,res){
    res.setHeader('Content-Type','text/plain')
    res.end('Hello World')
}