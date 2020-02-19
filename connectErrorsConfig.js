var api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler)

var app = connect()
    .use(hello)
    .use('/api',api)
    .use(errorPage)
    .listen(3000)

function hello(req,res,next){
    if(req.url.match(/^\/hello/)){
        res.end('Hello World')
    }else{
        next()
    }
}

var db = {
    users:[
        {name:'tobi'},
        {name:'loki'},
        {name:'jane'}
    ]
}

// 在数据库中搜索用户的组件
function users(req,res,next){
    var match = req.url.match(/^\/user\/(.+)/)
    if(match){
        var users = db.users[match[1]]
        if(user){
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify(user))
        }else{
            var err = new Error('User not found')
            err.notFound = true
            next(err)
        }
    }else{
        next()
    }
}

function pets(req,res,next){
    if(req.url.match(/^\/pet\/(.+)/)){
        foo()
    }else{
        next()
    }
}

function errorHandler(err,req,res,next){
    console.error(err.stack)
    res.setHeader('Content-Type','application/json')
    if(err.notFound){
        res.statusCode = 404
        res.end(JSON.stringify({error:err.message}))
    }else{
        res.statusCode = 500
        res.end(JSON.stringify({error:'Internet Server Error'}))
    }
}