var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

const crypto = require('crypto');


module.exports = function(passport) {
 ///////////

 
 //////////
  passport.serializeUser(function(members, done){
  done(null, members.keyId);
 });

 passport.deserializeUser(function(keyId, done){
  connection.query("SELECT * FROM members WHERE keyId = ? ", [keyId],
   function(err, rows){
    done(err, rows[0]);
   });
 });



 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, email, password, done,err){
   connection.query("SELECT * FROM members WHERE email = ? or memberId = ? ", 
   [email,req.body.memberId], function(err, rows){
    if(err)
     return res.status(400).json( {status:400,message: err.message});
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: email,
      password: password,
      memberId: req.body.memberid,
      name_lastname: req.body.name,
      
      faculty:req.body.faculty
     };
     console.log(newUserMysql.name_lastname);
     
     var insertQuery = "INSERT INTO members (memberId,email, password,faculty,name_lastname) values (? ,?, ?, ?, ?)";

     connection.query(insertQuery, [newUserMysql.memberId,newUserMysql.username, newUserMysql.password, newUserMysql.faculty, newUserMysql.name_lastname],
      function(err, rows){
       if (err)  
        return done(err);

        var insertQuery2 = "INSERT INTO fav_parking (memberid,title,Like_fav) VALUES (?,?,?)";
        var values = [
          [memberId, 'ECC Building',"false"],
              [memberId,"President Building","false" ],
              [memberId,"12th Floor Building","false"]
            ];  
        connection.query(insertQuery2,[values],
   
           function(err2,  results2, fields){
             if (err2) return done(err2);
    
                               }); 
        
       
       
       newUserMysql.keyId = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );


 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, email, password, done,err){
   if (err) return res.status(400).json( {status:400,message: error.message});
    var memberid = req.body.memberid;
    console.log(memberid);
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
     var key = 'password';
    
    

  
   connection.query("SELECT * FROM members WHERE email = ? ", [email],
   function(err, rows){
    if(err)
     return done(err);

   if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    var encrypted = rows[0].password;
          
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
   
    if(password!=decrypted)
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

     console.log(rows[0].memberId);
     var memberid = rows[0].memberId;
     
     return done(null, rows[0], req.flash('loginMessage',memberid ));

   });
  })
 );


 
};


