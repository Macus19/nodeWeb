const express = require('express')
const http = require('http')
const app = express()

const EVIL_IP = "123.45.67.89"

app.use(function(req,res){
    if(req.ip === EVIL_IP){
        res.status(401).send("Not Allowed!")
    }else{
        next()
    }
})