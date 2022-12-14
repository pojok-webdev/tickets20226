const kecamatan = require('./kecamatan');
const kota = require('./kota')
const kelurahan = require('./kelurahan')
var setting = require('./appSetting')
gets = (obj,callback) => {
    var axios = require('axios');
    console.log("session got",obj.session_id)
    var config = {
    method: 'get',
    url: setting.server.url+'/api/sale.subscription/?query={id,name,display_name,site_location_id}',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        //callback(JSON.stringify(response.data))
        callback(response.data)
    })
    .catch(function (error) {
        console.log(error);
        callback(error)
    });

}
login = (obj,callback) => {
    var axios = require('axios');    
    var data = JSON.stringify({
    "params": {
        "login": setting.server.login,
        "password": setting.server.password,
        "db": setting.server.db
    }
    });

    var config = {
    method: 'post',
    url: setting.server.url + '/auth',
    headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'padi internet'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.headers));
        callback(JSON.stringify(response.headers))
    })
    .catch(function (error) {
        console.log(error);
        callback(error)
    });

}
module.exports = {
    login:login,gets:gets,kecamatan:kecamatan,kota:kota,kelurahan:kelurahan
}