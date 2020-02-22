// 引用express代码
const express = require("express")
// 创建express实例
const app = express()

// 创建路由中间件用于处理random请求
app.get("/random/:min/:max",function(req,res){
    // 使用parseInt解析参数
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)

    if(isNaN(min)||isNaN(max)){
        res.status(400)
        res.json({error:"Bad request."})
        return
    }

    const result = Math.round(Math.random()*(max-min)+min)
    res.json({result:result})
})
app.listen(3000,function(){
    console.log("App started on port 3000.")
})