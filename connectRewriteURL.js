var connect = require('connect')
var url = require('url')
var app = connect()
    .use(rewrite)
    .use(showPost)
    .listen(3000)

var path = url.parse(req.url).pathname
function rewrite(req,res,next){
    var match = path.match(/^\/blog\/posts\/(.+)/)
    if(match){ // 只针对/blog/posts请求进行查找
        findPostIdByBlog(match[1],function(err,id){
            if(err) return next(err) // 如果查找出错，则通知错误处理器并停止处理
            if(!id) return next(new Error('User not found!')) // 如果没找到跟缩略名相对应的id，则带着错误调用next
            req.url = '/blog/posts/'+id // 重写req.url属性，以便后续中间件可以使用真实的id
            next()
        })
    }else{
        next()
    }
}