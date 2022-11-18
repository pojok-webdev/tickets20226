gets = (obj,callback) => {
    sql = 'select '+obj.columns.join(',')+' '
    sql+= 'from '+obj.tableName+' '
    sql+= 'where '+obj.conditions.map(cond=>{
        return cond.key+'="'+cond.val+'"'
    }).join(',')+' '
    console.log('SQL',sql)
    obj.con.doQuery(sql,result=>{
        callback(result)
    })
}
padihelper = (obj,callback) => {
    sql = 'select a.id,a.name,b.id site_id,b.address,b.city,state_id,kota_id,kecamatan_id,kelurahan_id from oclientcleansing2 a '
    sql+= 'left outer join oclient_sites b on b.client_id=a.id '
    obj.con.doQuery(sql, result=>{
        callback(result)
    })
}
module.exports = {
    gets:gets,padihelper:padihelper
}