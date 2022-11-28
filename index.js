const i = require('./appInit')

i.app.get('/dt_tickets',(req,res)=>{
    query = 'select id, kdticket,clientname,ticketstart from tickets '
    query+= 'limit 1,10 '
    i.con.doQuery(query,result=>{
        console.log('Res',result)
        res.send({"data":result.map(obj=>{
            return [
                obj.kdticket,
                obj.clientname,
                obj.ticketstart
                ,'1'
            ]
        })})
    })
})
i.app.get('/showtickets',(req,res)=>{
    res.render('tickets/index',{
        title:'Show Tickets'
    })
})
i.app.get('/login',(req,res)=>{
    res.render('login')
})
i.app.post('/seriouslogin',(req,res)=>{
    params = req.body
      params = req.body
  i.auth.doLogin({
    i:i,params:params,res:res,req,req,redirpath:'/showclients'
  },result=>{
    if(result.authenticated){
      i.logging.writeLog({
        createuser:result.username,subject:'Login '+result.email,description:'Login '+result.email,i:i
      },logresult=>{
        res.redirect('/showclients')
      })
    }else{
      res.redirect('/login')
    }
  })

})
i.app.post('/handlelogin',(req,res)=>{
    i.odoo.login({},auth=>{
        console.log('AUTH',auth)
        let myfind = auth.search('session_id')
        console.log('MyFind',myfind)
        let mystr = auth.substring(myfind,auth.length)
        console.log('my substring',mystr)
        myfind2 = mystr.search(';')
        mysubstr = mystr.substring(11,myfind2)
        console.log('FInal subString',mysubstr)
        res.cookie('session_id',mysubstr)
        res.render('logged',{
            session_id:mysubstr
        })

    })
})
i.app.get('/getcookies',(req,res)=>{
    console.log(req.cookies)
    res.send({'cookie':req.cookies})
})
i.app.get('/getsubscriptions',(req,res)=>{
    i.odoo.gets({session_id:req.cookies.session_id},objs=>{
        console.log(objs)
        /*res.send({'results':objs.result.map(obj=>{
            return {id:obj.id,text:obj.display_name}
        })})*/
    })
})
i.app.get('/getcauses',(req,res)=>{
    i.padi.gets({
        columns:['id,name'],
        tableName:'ticketcauses',
        conditions:[{key:"1","val":"1"}],
        con:i.con
    },objs=>{
        console.log("result",objs)
        res.send({"results":objs.map(obj=>{
            return {id:obj.id,text:obj.name}
        })})
    })
})
i.app.get('/getclients',(req,res)=>{
    i.padi.padihelper({con:i.con},objs=>{
        console.log("result",objs)
        res.send({"data":objs.map(obj=>{
            return [obj.id,obj.name,obj.site_id,obj.address,obj.city,obj.state_id,obj.kota_id,obj.kecamatan_id,obj.kelurahan_id]
        })})
    })
})
i.app.get('/showclients',(req,res)=>{
    res.render("padihelper/index",{
        title:'Clients',
        loggeduser:req.cookies.email
    })
})
i.app.get('/getkota/:state_id',(req,res)=>{
    params = req.params
    console.log('Params Kota',params)
    mykot = i.odoo.kota.kota().results.filter(kot=>{
        return kot.state_id === parseInt(params.state_id)
    }).map(kot=>{
        return {id:kot.id,text:kot.display_name}
    })
    console.log("Kec",mykot)
    res.send({"results":mykot})
})
i.app.get('/getkecamatan/:kota_id',(req,res)=>{
    params = req.params
    console.log('Param Kecamatan',params)
    mykec = i.odoo.kecamatan.kecamatan().results.filter(kec=>{
        return kec.kota_id === parseInt(params.kota_id)
    }).map(kec=>{
        return {id:kec.id,text:kec.display_name}
    })
    console.log("Kec",mykec)
    res.send({"results":mykec})
})
i.app.get('/getkelurahan/:kecamatan_id',(req,res)=>{
    params = req.params
    mykel = i.odoo.kelurahan.kel().results.filter(kel=>{
        return kel.kecamatan_id===parseInt(params.kecamatan_id)
    })
    .map(kel=>{
        return {id:kel.id,text:kel.display_name}
    })
    console.log("Kelurahan",mykel)
    res.send({"results":mykel})
})
i.app.post('/updatepoint',(req,res)=>{
    params = req.body
    console.log('params got',params)
    i.con.doQuery('update oclient_sites '
    +'set state_id="'+params.state_id+'",'
    +'kota_id="'+params.kota_id+'",'
    +'kecamatan_id="'+params.kecamatan_id+'",'
    +'kelurahan_id="'+params.kelurahan_id+'",'
    +'modifier="'+params.modifier+'" '
    +'where id='+params.id+' ' ,result=>{
        i.logging.writeLog({
            createuser:req.cookies.email,
            subject:'update point '+params.id,
            description:'Update '+params.id+'-'+params.state_id+'-'+params.kota_id+'-'+params.kecamatan_id+'-'+params.kelurahan_id+'-',i:i
          },logresult=>{
            console.log('Logresult',logresult)
            res.send({result:result})
        })
    })
})
i.app.get('/search/:term',(req,res)=>{
    params = req.params
    res.render('search',{
        term:params.term
    })
})
i.app.listen('20226',_ =>{
    console.log('App running on 20226')
})