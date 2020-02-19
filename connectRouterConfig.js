var connect = require('connect')
var router = require('./middleware/router')
var routes = {
    GET:{
        '/users':function(req, res){
            res.end('tobi, loki, ferret')
        },
        '/user/:id':function(req, res, id){
            res.end('user '+id)
        }
    },
    DELETE:{
        '/user/:id':function(req, res, id){
            res.end('deleted user '+id)
        }
    }
}

var parse = require('url').parse
module.exports = function route(obj){
    return function(req, res, next){
        if(!obj[req.method]){ // 检查以确保req.method定义了
            next() // 如果没定义，调用next()并停止一切后续操作
            return
        }
        var routes = obj[req.method] // 查找req.method对应路径
        var url = parse(req.url) // 解析url，以便于跟pathname匹配
        var paths = Object.keys(routes) // 将req.method对应的路径存放到数组中

        for(var i = 0;i<paths.length;i++){ // 遍历路径
            var path = paths[i]
            var fn = routes[path]
            path = path
                .replace(/\//g,'\\/')
                .replace(/:(\w+)/g,'([^\\/]+)')
            var re = new RegExp('^'+path+'$') // 构造正则表达式
            var captures = url.pathname.match(re)
            if(captures){ // 尝试和路径匹配 
                var args = [req,res].concat(captures.slice(1)) // 传递被捕获的分组
                fn.apply(null,args)
                return // 当有相匹配的函数时，返回以防止后续的next()调用
            }
        }
        next()
    }
}

connect()
    .use(router(routes))
    .listen(3000)