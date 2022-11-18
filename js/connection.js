var mysql = require('promise-mysql'),
    doQuery = (sql,callback) => {
        var con = mysql.createConnection({
            host:'localhost',user:'root',password:'',database:'teknis'
        })
        .then(cn=>{
            var result = cn.query(sql)
            cn.end()
            return result
        })
        .then(rows=>{
            callback(rows)
        })
    }
module.exports = {
    doQuery:doQuery
}