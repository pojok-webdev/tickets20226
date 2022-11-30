setting = require('./appSetting')
writeLog = (obj,callback) => {
    console.log('Login Query', obj.i.crud.create({
        tableName:setting.db+'.logging',
        cols:[
            {key:'createuser',val:obj.createuser},
            {key:'subject',val:obj.subject},
            {key:'description',val:obj.description},
        ]
    }))
    obj.i.con.doQuery(
        obj.i.crud.create({
            tableName:setting.db+'.logging',
            cols:[
                {key:'createuser',val:obj.createuser},
                {key:'subject',val:obj.subject},
                {key:'description',val:obj.description},
            ]
        }),
        result=>{
            console.log('result')
            callback(result)
        }
    )
}
readLogs = obj => {
    console.log("loggin qquery",obj.i.crud.gets({
        tableName:setting.db+'.logging',
        cols:['id','subject','description','createuser','createdate'],
        conditions:[{key:'1',val:'1'}]
    }))
    obj.i.con.doQuery(
        obj.i.crud.gets({
            tableName:setting.db+'.logging',
            cols:['id','subject','description','createuser','createdate'],
            conditions:[{key:'1',val:'1'}]
        }),
        result=>{
            obj.res.send(result)
        }
    )
}
readLog = obj => {
    obj.i.con.doQuery(
        obj.i.crud.gets({
            tableName:setting.db+'.logging',
            cols:['id','subject','description','createuser'],
            conditions:[{key:'1',val:'1'}]
        }),
        result={}
    )
}
logout = (obj,callback) => {
    obj.req.session.destroy()
    callback({username:obj.username,email:obj.email})
}
module.exports = {
    writeLog:writeLog,readLog:readLog,readLogs:readLogs,logout:logout
}