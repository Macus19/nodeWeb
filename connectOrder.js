// 中间件顺序的重要性：中间件什么时候不调用next
// 这里因为先调用了hello()，hello中没有next()，所以不会调用下一个中间件组件
var connect = require('connect')

function logger(req,res){  // 总是调用next()，所以后续中间件会被调用
    console.log('%s %s',req.method,req.url)
    next()
}

function hello(req,res){ // 不会调用next()，因为响应了请求
    res.setHeader('Content-type','text/plain') 
    res.end('Hello World')
}

var app = connect()
    .use(hello)
    .use(logger)
    .listen(3000)


// 利用中间件的顺序执行认证
// restrictFileAccess只允许有效的用户访问文件
// 有效用户可以到下一个组件，如果用户无效，则不调用next()
// var connect = require('connect')
// var app = connect()
//     .use(logger)
//     .use(restrictFileAccess)
//     .use(serveStaticFiles) // 只有用户有效时才会调用next
//     .use(hello)