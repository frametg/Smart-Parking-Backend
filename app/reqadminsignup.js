var route = require('./routes.js');

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);

var bcrypt = require('bcrypt-nodejs');


const crypto = require('crypto');


connection.query('USE ' + dbconfig.database);

module.exports.main= function(req,res) {

   var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
   var key = 'password';
   var text = 'I love kittens';
   
   var cipher = crypto.createCipher(algorithm, key);  
   var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
   var decipher = crypto.createDecipher(algorithm, key);
   var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  

var reqtext = "rea ok ";
/////////////////////////////////////////////
var signuptoadmin = function(req,res,next){
   var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
   var key = 'password';
   var text = req.body.password;
   
   
   var cipher = crypto.createCipher(algorithm, key);  
   var password = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  
   
   if (req.body.email =="") return res.status(400).json( {status:400,message: "email must not null"});
   if (req.body.password =="") return res.status(400).json( {status:400,message: "password must not null"});
    var insertQuery = "INSERT INTO register_admincheck (email,memberID,name_lastname,password,faculty) VALUES (?,?,?,?,?)";
      connection.query(insertQuery,[req.body.email,req.body.memberid,req.body.name,password,req.body.faculty],
   
      function(err,  results, fields){
      if (err) return res.status(400).json( {status:400,message: err.message});
    
     else res.send(req.body);
     //return 

     
    
   }); 

//next();


}
var admintodb = function(req,res){
    

    var insertQuery = "INSERT INTO register_admincheck (email,memberID,name_lastname,passwordiv,passwordencrypt) VALUES (?,?,?,?)";
      connection.query(insertQuery,[req.body.email,req.body.memberId,req.body.name_lastname],
   
      function(err,  results, fields){
      if (err) res.send(err);
    
      res.send(req.body);

     
    
   }); 




}
var getregisteruser = function(req,res){
    

    
  connection.query("SELECT * FROM register_admincheck",
  function(err1, rows){
   if(!rows.length) {
      res.send("no user to accept")
      

    } else if(rows.length) {
      res.send(rows)
      

   }
   
     
    
   }); 




}



/////////////////////////////////////////////////////


return { signuptoadmin:signuptoadmin,reqtext:reqtext,getregisteruser:getregisteruser};
}