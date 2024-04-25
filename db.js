var mysql = require('mysql2');
var utils = require('./utils');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedb'
})
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

exports.login = function(username, password,callback) {
  try {
      var sql = 'select id,password,salt from user where username=? '
      var values = [
          username          
      ]
  
      con.query(sql, values, function (err, result) {
          if (err) {
              console.log(err);
              return callback(err);
          }
          console.log(result);
          if(result.length>0){
              utils.getHash(password,result[0].salt,function(err,hash){
                  if (err) {
                      console.log(err);
                      return callback(err);
                  }
                  console.log(result[0].password);
                  console.log(hash);
                  if(result[0].password!=hash) {
                      console.log('invalid username or password');
                      return callback('invalid username or password');
                  }
                  console.log('login is succeed');
                  callback(null,result[0]);
              });

          }else{
              return callback('invalid username or password');
          }                       
          
      });
    } catch(e) {            
      callback(e);
    }
}

exports.register = function(username,password,salt,fullname,email,callback) {
    try {
        var sql = 'insert into user(username,password,salt,fullname,email) values(?,?,?,?,?)'
        var values = [
            username,
            password,
            salt,
            fullname,
            email
        ]
        con.query(sql, values, function (err, result) {
            if (err) return callback(err);
            console.log("Result: " + result);
            
            callback(null,result);
            
        });
      } catch(e) {            
        callback(e);
      }
}

exports.getprofile = function(id,callback) {
    try {
        var sql = 'select username,fullname,email from user where id=?'
        var values = [
            id,
        ]
        con.query(sql, values, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            console.log(result)
            //console.log("Result: " + result);
            
            callback(null,result);
            
        });
      } catch(e) {            
        callback(e);
      }
}