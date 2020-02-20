const photos = []
photos.push({
    name:'Node.js Logo',
    path:'https://nodejs.org/static/images/logos/nodejs-green.png'
})
photos.push({
    name:'Ryan Speaking',
    path:'https://nodejs.org/static/images/logos/nodejs-green.png'
})

exports.list = function(req,res){
    res.render('photos',{
        title:'Photos',
        photos:photos
    })
}