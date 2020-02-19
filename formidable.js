var http = require('http')
var formidable = require('formidable')
var server = http.createServer(function(req,res){
    switch(req.method){
        case 'GET':
            show(req,res)
            break
        case 'POST':
            upload(req,res)
            break
    }
})

server.listen(3000)
function show(req,res){
    var html = ''
            + '<form method="post" action="/" enctype="multipart/form-data">'
            + '<p><input type="text" name="name" /></p>'
            + '<p><input type="file" name="file" /></p>'
            + '<p><input type="submit" value="Upload" /></p>'
            + '</form>'
    res.setHeader('Content-Type','text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

function upload(req,res){
    if(isFormData(req)){ // 请求类型不对时返回400响应
        res.statusCode = 400
        res.end('Bad Request:expecting multipart/form-data')
        return
    }

    // 初始化一个表单
    var form = new formidable.IncomingForm()
    // 使用formidable的API
    form.on('field',function(field,value){
        console.log(field)
        console.log(value)
    })
    form.on('file',function(name,file){
        console.log(file)
        console.log(name)
    })
    form.on('end',function(){
        res.end('Upload complete!')
    })
    // 利用progress事件计算上传进度
    form.on('progress',function(bytesReceived,bytesExpected){
        var percent = Math.floor(bytesReceived/bytesExpected*100)
        console.log(percent)
    })
    // 对data进行解析
    form.parse(req)
}

// 辅助函数，用来检查请求头中的Content-Type字段是否为multipart/form-data
function isFormData(req){
    var type = req.headers['Content-Type']||''
    return 0 == type.indexOf('multipart/form-data')
}