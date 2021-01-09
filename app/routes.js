
var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);

//////////////////app
var booking = require('./booking.js');
var reqadminsignup = require('./reqadminsignup.js');
var forgotpassword = require('./forgotpassword.js');
/////////////hardware
var raspberrypi = require('../hardware/raspberrypi');
var nodemcu = require('../hardware/nodemcu');
var FileReader = require('filereader')

var assert = require('assert');


connection.query('USE ' + dbconfig.database);

const jwt = require("jwt-simple");

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;

const bodyParser = require('body-parser');

const crypto = require('crypto');

var email = "e"
var memberid

module.exports = function(app, passport) {
  
  app.get('/', function(req, res){
  res.send("index")
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
  //res.send(req.csrfToken());
 });
/////////////////////////////////////////////////////////
//encryt

const algorithm = 'aes-256-cbc';
const password = 'Password used to generate key';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 32);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.




/////
app.post('/encrypt2', function(req, res){
  var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
  var key = 'password';
  var text = 'admin';
  
  var cipher = crypto.createCipher(algorithm, key);  
  var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
 var test = "d3c2a0dcee87160a27fdcfa0b55af010"
  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(test, 'hex', 'utf8') + decipher.final('utf8');
  
  
  res.send(encrypted)
  
});
 /////////////////////////////////////////////////////
///JWT

const SECRET = "smartparkingkey_1345_sope";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET
};




const jwtAuth = new JwtStrategy(jwtOptions,async  (payload,done) => {
  

  connection.query("SELECT * FROM members WHERE email = ? ", [payload.sub],
  function(err, rows){
   if(err)
    return done(null, false);
   if(rows[0]){
    email  = rows[0].email;
    memberid = rows[0].memberId;
    return done(null, rows[0]);
   }

   if(payload.car){
     console.log(0);
   }
  });

});
//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);
//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt",{session:false});

const fs = require('fs');
app.get('/getimage2', function(request, response) {
  
var imgpath = ("../nodeloginregister/img/");
var img = imgpath+"ecc.jpg"
const base64 = fs.readFileSync(img,"base64")
  response.send(base64);
  
});

app.get('/authen/favparking',requireJWTAuth, function(request, response) {
  
  
  var imgpath = ("../nodeloginregister/img/");
  var imgpre = imgpath+"president.jpg"
  var img12f = imgpath+"floor12.jpg"
  var ecctext = "Lamprathew, Ladkrabang  Bangkok 10520"
  var pretext = "Lamprathew, Ladkrabang  Bangkok 10520"
  var f12text = "1 soi chalongkrung Road, Ladkrabang district, Bangkok 10520"
  var imgecc = imgpath+"ecc.jpg"
  var eccname = "ECC Building"
  var prename ="President Building"
  var f12name = "12th Floor Building"

  //const base64 = fs.readFileSync(img,"base64");
  connection.query('SELECT * FROM fav_parking where memberid =? and title =?',[memberid,eccname], function(err, result) {
  if (err) 
  return res.status(400).json( {status:400,message: err.message});
    console.log(result[0].Like_fav)
  var fav1 = {
      
      title:eccname,
      like: result[0].Like_fav,
      text:ecctext,
      id:"1",
      image:fs.readFileSync(imgecc,"base64")

      
     };
     connection.query('SELECT * FROM fav_parking where memberid =? and title =?',[memberid,prename], function(err1, result1) {
      if (err1) 
      return res.status(400).json( {status:400,message: err1.message});
     var fav2 = {
          
          title:prename,
          like: result1[0].Like_fav,
          text:pretext,
          id:"2",
          image:fs.readFileSync(imgpre,"base64")
    
          
         };
  
         connection.query('SELECT * FROM fav_parking where memberid =? and title =?',[memberid,f12name], function(err2, result2) {
          if (err2) 
          return res.status(400).json( {status:400,message: err2.message});
         var fav3 = {
              
              title:f12name,
              like: result2[0].Like_fav,
              text:f12text,
              id:"2",
              image:fs.readFileSync(img12f,"base64")
        
              
             };
             response.send({fav1,fav2,fav3})       
      
      });
        
        });
   
   
  
  });

    
    



});
app.get('/getnumber', function(req, res) {
  
  var eccname = "ECC Building"
  var prename ="President Building"
  var f12name = "12th Floor Building"
  var selsql = "SELECT * FROM parking_status where parkingStatus =1 or parkingStatus =2";
    
  connection.query( selsql,

     function(err2,  results2, fields){
      
       if (err2) return res.status(400).json(err2.message); 
       connection.query( "SELECT * FROM parking_status where parkingName =? and parkingStatus >0",eccname,function(err,  results){
        if (err) return res.status(400).json(err.message); 
       
       numberecc=results.length;
       connection.query( "SELECT * FROM parking_status where parkingName =?",prename,function(err3,  results3){
        if (err3) return res.status(400).json(err3.message);
        numberpre=results3.length;
        connection.query( "SELECT * FROM parking_status where parkingName =?",f12name,function(err4,  results4){
          if (err4) return res.status(400).json(err4.message);
          number12f=results4.length;

      res.send({"numecc":numberecc,"numpre":numberpre,"num12f":number12f}); 
    });
  });
       }); 
    
    }); 
});
app.post('/authen/addfavparking',requireJWTAuth, function(req, res) {
  
  var updatesql = "UPDATE  fav_parking SET Like_fav = ? where memberid = ? and title = ? ";
  var data = [req.body.Like_fav, memberid ,req.body.title];  
  connection.query( updatesql,data,

     function(err2,  results2, fields){
      
       if (err2) return res.status(400).json(err2.message); ;
       res.send("ok")

                         }); 
});

app.get('/getimage', function(request, response) {
  connection.query('SELECT imgpic FROM fav_parking where title =?',["floor12"], function(err, result) {
    console.log(result)
   
    var bufferBase64 = new Buffer( result, 'hex' ).toString('base64');
   // var reader = new FileReader();
   // reader.readAsDataURL(blob); 
    //reader.onloadend = function() {
       // var base64data = reader.result;                
        
    //}
      response.send( bufferBase64); // Send the image to the browser.
  });
});

app.post("/authen", requireJWTAuth, (req, res) => {
  res.send(email+" "+memberid);
  //res.send("email is "+req.flash('success')+" member id is "+req.flash('memberid'));
});



app.post("/authencar", requireJWTAuth, (req, res) => {
  res.send(email+" "+memberid);
  //res.send("email is "+req.flash('success')+" member id is "+req.flash('memberid'));
});


////////////////////////////////////////////////////////////
///admin page

reqad = reqadminsignup.main();
console.log(reqad.reqtext);
//reqadminsignup.signuptoadmin,
//request ให้admin ว่าจะสมัคร
 app.post('/reqadminsignup',reqad.signuptoadmin, function(req, res, err){
   if (err) res.send(err);
   res.send("wait admin for accept")
   
  });
/// admin เปิดดดูมีใคร request มาบ้าง

app.post("/admin", requireJWTAuth, (req, res,next) => {
  req.email = email;
  if (req.email=="admin") 
  next();

  else res.send(req.email);


}, reqad.getregisteruser);







////////////////////////



2
 app.post('/signup', passport.authenticate('local-signup', {
  
  failureRedirect : '/failuresignup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}), (req, res,err) => { 
 
   if (err) return res.status(400).json(err.message); ;
   
   res.send("success to approve")

  
  
});
app.get('/failuresignup', function(req, res) {
  res.json({ message: req.flash('signupMessage') });
});

 app.get('/profile', isLoggedIn, function(req, res){
    
    res.send(JSON.stringify(req.user.email, null, 4));
    

    //res.render('profile.ejs', {
      //user:req.members
     //});
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })

 app.get('/session', function(req, res, next) { 
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.post("/login", passport.authenticate('local-login', {
  
  failureRedirect : '/failurejson', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}), (req, res,next) => { 
 
  try{
    const payload = {
      id: req.flash('loginMessage')[0],
      sub: req.body.email,
      iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
   };
   res.send(jwt.encode(payload, SECRET));


    

   } catch(error) {return res.status(400).json("jwt error");}



});

const forgot = forgotpassword.main();
app.post('/forgotpassword', function(req, res) {
  try{ 
    

    forgot.sendemail(req,res).catch(console.error);


  }catch(error){return res.status(400).json(error.message);}
});

const plus = function(a,callback){
a = a+1;
return callback(a)

}

app.post('/hello', (req, res, next) => {
  try {
    email = req.body.email
    res.send(email)
    
    
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
/////////////
app.get('/authen/gethistory',requireJWTAuth, (req, res, next) => {
  connection.query("SELECT * FROM time_stamp WHERE memberid = ? ", [memberid],
  function(err, rows){
  if (err) 
   return res.status(400).json( {status:400,message: err.message});
  res.send(rows)

   
  });
});


app.use('/authen/myaccount',requireJWTAuth, (req, res, next) => {
 
  connection.query("SELECT * FROM members WHERE memberId = ? ", [memberid],
  function(err, rows){
    console.log(memberid)
  if (err) 
   return res.status(400).json( {status:400,message: err.message});
  if(rows.length)res.send(rows)
  if(!rows.length)res.send("not found")

   
  });
});


//////////



app.post('/login3', passport.authenticate('local-login', {
  successRedirect : '/successjson', // redirect to the secure profile section
  failureRedirect : '/failurejson', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

app.get('/successjson', function(req, res) {
  res.send("success");
});

app.get('/failurejson', function(req, res) {
  res.json({ message: req.flash('loginMessage') });
});

const delquerie = function(req,res){
  
var sql = "DELETE FROM parking_status WHERE parkingName = ? and parkingSlotNo = ?";
connection.query(sql,[req.body.parkingName,req.body.parkingSlotNo], function (err2,del_result) {
if (err2) throw err2;

});}

const pi = raspberrypi.main();


app.post("/piCheckcar",pi.piCheckcar, function(req, res ,err){
 
  console.log(req.body)
  
	
  
 });
 app.post("/piInbooked",pi.piInbooked, function(req, res ,err){
 
  console.log(req.body)
  res.send('ok')

	
  
 });

app.post("/piWalkin",pi.piWalkin, function(req, res ,err){
  if (err) return res.status(400).json( {status:400,message: err.message}); 
  
	
  
 });

 app.post("/raspberrypicarout",pi.piMiddlewareOut, function(req, res ,err){
 
  
  
	
  
 });


 const test1 = (req, res, next) => {
   console.log(req.body.one);

   next();
 }
 const test2 = (req, res, next) => {
  console.log(req.body.two)
next();
 }

 
app.post("/test2",test1,test2, function(req, res ,err){
 
  res.send(req.body);
	
  
 });

 const statuscarMiddleware = (req, res, next) => {

  var newparkingstat = [
    [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
    
  ];
  console.log("input : "+ req.body);
  var db_parkingStatus;

  connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo],
   function(err1, rows){
    if(!rows.length) {
      console.log(rows)
      var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
          connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo,req.body.parkingStatus,req.body.carlicenseNo],
   
           function(err,  results, fields){
             if (err) throw err;
    
                     res.send(req.body);           }); 

        
      

        }
        else if (rows.length){
          db_parkingStatus= rows[0].parkingStatus;

          connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo,req.body.parkingStatus],
          function(status_err, rows_status){
            console.log(rows[0])
            if(!rows_status.length) {
             
              if(!(db_parkingStatus==2 && req.body.parkingStatus==0)&&!(db_parkingStatus==1 && req.body.parkingStatus==2))   {
                   var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";

                     var data = [req.body.parkingStatus,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo];

                    // execute the UPDATE statement
                    connection.query(update_sql, data, (error, results, fields) => {
                    if (error){
                    return console.error(error.message);
                    }
                    console.log('Rows affected:', results.affectedRows);
                    res.send(req.body);         
                    });


                 }else{
                  console.log("not correct") 
                  res.send("not correct")}
                  
                }
                 else if (rows_status.length)  {
                  console.log("repeat or not correct") 
                  res.send("repeat not correct");}

               
                  });
       
          
        } 

        if(err1) throw err1;



    });
  
 
 }


var node = nodemcu.main()
 
app.post("/nodemcu",node.statuscarMiddlewareslot1,
node.statuscarMiddlewareslot2,
node.statuscarMiddlewareslot3,
node.statuscarMiddlewareslot4,
node.statuscarMiddlewareslot5, function(req, res ,err){
 
  res.send("ok")
	
  
 });

 app.get("/nodemcuget", function(req, res ,err){
 
  
  res.send("success")
	
  
 });


 
 const addcar = async(req, res, next) => {

  var newparkingstat = [
    [req.body.licienseAlp],[req.body.licienseNo],[req.body.licienseCity],[req.body.carlicenseNo],[req.body.MemberID]
    
  ];
  console.log(req.body);

  var licienseAlpNo = req.body.licienseAlp + req.body.licienseNo

  connection.query("INSERT INTO car (licienseAlp, licienseNo,licienseCity,carlicenseNo,MemberID,carbrand,colorfav,licienseAlpNo) VALUES(?,?,?,?,?,?,?,?) ", [req.body.licienseAlp,req.body.licienseNo,req.body.licienseCity,req.body.carlicenseNo,memberid,req.body.carbrand,req.body.colorfav,licienseAlpNo],
   function(err1, rows){
    if (err1) return res.status(400).json( {status:400,message: err1.message});
    console.log(rows);

    return next()

    });
  
  
 
 }

 
app.post("/authen/addcar",requireJWTAuth , addcar, function(req, res ,err){
 
  console.log(req.body);
	res.send(req.body.carlicenseNo);
  
 });




 const mycar = (req, res, next) => {

  var newparkingstat = [
    [req.body.licienseAlp],[req.body.licienseNo],[req.body.licienseCity],[req.body.carlicenseNo],[req.body.MemberID]
    
  ];
  console.log(req.body);
  

  connection.query("SELECT licienseAlpNo,licienseCity,colorfav,carbrand FROM car WHERE MemberID = ?", [memberid],
  function(err1, rows){
    if (err1) return res.status(400).json( {status:400,message: err1.message});
    //rows[0]['id']=1
    
    var i;
    for (i = 0; i < rows.length; i++) {
    rows[i]["id"]=i+1
      }
    console.log(rows.length)
   res.send(rows)
   
   

   });
  
  
 
 }

 const selectmycar = (req, res, next) => {

  var newparkingstat = [
    [req.body.licienseAlp],[req.body.licienseNo],[req.body.licienseCity],[req.body.carlicenseNo],[req.body.MemberID]
    
  ];
  console.log(req.body);
  

  connection.query("SELECT carlicenseNo FROM car WHERE MemberID = ? and carlicenseNo = ?", [memberid,req.body.carlicenseNo],
  function(err1, rows){
    if (err1) return res.status(400).json( {status:400,message: err1.message});
   res.send(req.body.carlicenseNo)
   
   

   });
 }
 app.use("/authen/selectmycar",requireJWTAuth , selectmycar, function(req, res ,err){
 
  console.log(req.body);

  
 });
 app.use("/authen/mycar",requireJWTAuth , mycar, function(req, res ,err){
 
  console.log(req.body);

  
 });

 





 const delcar = function(req,res){
  
  var sql = "DELETE FROM car WHERE carlicenseNo = ?";
  connection.query(sql,[req.body.carlicenseNo], function (err2,del_result) {
  if (err2) throw err2;
  res.send(del_result);
  
  });
} 


 app.post("/delcar",delcar, function(req, res ,err){
 
  console.log(req.body);
	//res.send(req.body);
  
 });
 


 book = booking.main("email");
 console.log(book.gg);

  

 app.post("/authen/booking",book.postcarbooking, function(req, res ,err){
  if (err) throw err;

  
});

app.get("/authen/booking",requireJWTAuth,book.carbooking, function(req, res ,err){
  if (err) throw err;
  res.send(req.carlicenseNo_del);
 
  
});

app.use((req, res, next) => {
  res.status(404).send({
  status: 404,
  error: "not found"
  })
 })


};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}

module.exports.email = email;

