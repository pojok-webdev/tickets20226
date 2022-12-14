var bodyParser = require('body-parser'),
express = require('express'),
odoo = require('./js/odooprovider'),
padi = require('./js/padiprovider'),
auth = require('./js/auth'),
sha1 = require('sha1'),
crud = require('./js/crud'),
logging = require('./js/logging'),
con = require('./js/connection')
const cookieParser = require('cookie-parser')
app = new express()
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(__dirname+'/'))
app.use(bodyParser.json({'limit':'10mb',extended:true}))


app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))

app.use(cookieParser())
console.log("DIRNAME",__dirname)
module.exports = {
    app:app,
    con:con,odoo:odoo,padi:padi,auth:auth,logging:logging,sha1:sha1,crud:crud
}