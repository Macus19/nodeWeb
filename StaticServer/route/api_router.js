const express = require('express')
const ALLOWED_IPS = [
    "127.0.0.1",
    "123.456.7.89"
]

const api = express.Router()
api.use(function(req,res,next){
    const userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1
    if(!userIsAllowed){
        res.status(401).send("Not Authorized!")
    }else{
        next()
    }
})

api.get("/users",function(req,res){/*····*/})
api.post("/users",function(req,res){/*····*/})
api.get("/messages",function(req,res){/*····*/})
api.post("/messages",function(req,res){/*····*/})

module.exports = api