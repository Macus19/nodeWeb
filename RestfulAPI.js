const http = require('http')
const url = require('url')
let items = []

const server = http.createServer(function(req,res){
    switch (req.method){ // 判断请求用的http方法
        case 'POST':
            let item = ''
            req.setEncoding('utf-8')
            req.on('data',function(chunk){
                item += chunk // 数据块拼接到缓存上
            })
            req.on('end',function(){
                items.push = item // 完整的事项压入事项数组中
                res.end(item)
            })
            break
        case 'GET':
            items.forEach(function(item,i){
                res.write(`${i}) ${item}\n`)
            })
            res.end()
            break
        case 'DELETE':
            const path = url.parse(req.url).pathname
            const i = parseInt(path.slice(1),10)
            if (isNaN(i)){
                res.statusCode = 400
                res.end('Invalid item id.')
            }else if(!items[i]){
                res.statusCode = 404
                res.end('Item not exist.')
            }else{
                items.splice(i,1)
                res.end('OK\n')
            }
            break
    }
})

server.listen(3000)