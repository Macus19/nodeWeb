var connect = require('connect')
connect()
    // .use(logger)
    .use('/admin',restrict) // 当.use的第一个参数是一个字符串时，只有url前缀与之匹配时，Connect才会调用后面的中间件
    .use('/admin',admin)
    .use(hello)
    .listen(3000)

function restrict(req,res,next){
    var authorization = req.headers.authorization
    if(!authorization) return next(new Error('Unauthorized!'))

    var parts = authorization.split(' ')
    var scheme = parts[0]
    var auth = new Buffer(parts[1],'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    authenticateWithDatabase(user, pass, function(err){ // 根据数据库中的记录检查认证信息的函数
        if(err) return next(err) // 告诉分派器出错了
        next() // 如果认证信息有效,不带参数调用next
    })
}

function hello(req,res){ // 不会调用next()，因为响应了请求
    res.setHeader('Content-type','text/plain') 
    res.end('Hello World')
}

// 书上少了这个
function authenticateWithDatabase(user, pass, callback) {
    var err;
    if (user != 'tobi' || pass != 'ferret') {
      err = new Error('Unauthorized');
    }
    callback(err);
  }

function admin(req,res,next){
    switch(req.url){
        case '/':
            res.end('try /users')
            break
        case '/users':
            res.setHeader('Content-Type','text/plain')
            res.end(JSON.stringify(['tobi','loki','jane']))
            break
    }
}

