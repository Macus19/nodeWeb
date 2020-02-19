const http = require('http')
const parse = require('url').parse
const join = require('path').join
const fs = require('fs')

const root = __dirname

const server = http.createServer(function(req,res){
    const url = parse(req.url)
    const path = join(root,url.pathname) // 构造绝对路径
    fs.stat(path,function(err,stat){ // 检查文件是否存在
        if(err){
            if('ENOENT' == err.code){ // 不存在
                res.statusCode = 404
                res.end('Not Found.')
            }else{  // 其他错误
                res.statusCode = 500
                res.end('Internet Server Error.')
            }
        }else{
            res.setHeader('Content-Length',stat.size)
            let stream = fs.createReadStream(path) // 读取文件
            stream.pipe(res) // 写入到响应
            stream.on('error',function(err){
                res.statusCode = 500
                res.end('Internal Server Error.')
            })
        }
    })
})

server.listen(3000)