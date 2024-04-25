var express = require('express');
var router = express.Router();
// var db = require('../db');
// var utils = require('../utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  var usr = req.body.hasOwnProperty('username') ? req.body.username : '';
  var pwd = req.body.hasOwnProperty('password') ? req.body.password : '';
  var fullname = req.body.hasOwnProperty('fullname') ? req.body.fullname : '';
  var email = req.body.hasOwnProperty('email') ? req.body.email : '';

  if(usr!='' && pwd!='' && fullname!='' && email!='') {

    utils.hash(pwd,function(err,result){
      if(err) {
        console.log(err);
        return res.json({
          'error': 'there is error in registration'
        });
      }
      console.log(result);
      db.register(usr,result.hash,result.salt,fullname,email,function(err,result){
        if(err) {
          console.log(err);
          return res.json({
            'error': 'there is error in registration'
          });
        }
    
        res.json({
          'status': 'created'
        });
    
      }); 
    });

  }else{
    res.json({
      'error': 'all fields are required'
    });
  }

});

module.exports = router;
