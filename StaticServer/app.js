const express = require("express")
const path = require("path")
const http =  require("http")
const app = express()

app.use('/public',express.static(publicPath))
app.use('/uploads',express.static(userUploadsPath))
,
app.get("/users/:userid/profile_photo",function(req,res){
    res.sendFile(getProfilePhotoPath(req.params.userid))
})

http.createServer(app).listen(3000)