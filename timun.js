k = require('./kentang')

k.app.get('/test',(req,res)=>{
    res.send({'test':'yes'})
})
k.app.get('/kotas/:state_id',(req,res)=>{
    res.render('tomat/kotas',{
        title:'kunti',loggeduser:'batman'
    })
})
k.app.listen('10000',_=>{
    console.log('app run on port 10000')
})