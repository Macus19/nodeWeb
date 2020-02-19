var connect = require('connect')
connect()
    .use(function hello(req,res){
        foo() // foo函数没有定义，所以会抛出错误ReferenceError
        res.setHeader('Content-Type','text/plain')
        res.end('hello world')
    })
    .listen(3000)

// 常规的错误处理中间件
function errorHandler(){
    var env = process.env.NODE_ENV||'development'
    return function(err,req,res,next){ // 错误处理中间件定义四个参数
        res.statusCode = 500
        switch(env){ // 根据NODE_ENV的值来进行不同的操作
            case 'development':
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify(err))
                break
            default:
                res.end('Sever error')
        }
    }
}