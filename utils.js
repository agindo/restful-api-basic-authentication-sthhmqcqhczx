var bcrypt = require('bcryptjs');

exports.hash = function(message,callback) {
    try {        
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(message, salt);
        var result = {
            'salt': salt,
            'hash': hash
        }
        callback(null,result);
    } catch(e) {            
        callback(e);        
    }
}

exports.getHash = function(message,salt,callback) {
    try {                
        var hash = bcrypt.hashSync(message, salt);
        callback(null,hash);    
    } catch(e) {            
        callback(e);        
    }
}
