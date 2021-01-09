

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports.main= function(email,done) {

console.log("booking at "+email);
/////////////////////////////////////////////
var showregister = function(req,res){

}

const piMiddlewareIn = (req, res, next) => {

    var newparkingstat = [
      [req.body.licienseAlp],[req.body.licienseNo],[req.body.licienseCity]
      
    ];
    console.log(req.body);
  
    connection.query("SELECT * FROM car WHERE licienseAlp = ? and licienseNo = ? and licienseCity = ?", [req.body.licienseAlp,req.body.licienseNo,req.body.licienseCity],
     function(err1, rows){ 
      if (err1) return res.status(400).json( {status:400,message: err1.message});
  ///////////////////////////////in select car
  var carlicenseNovar = ""+req.body.licienseAlp+req.body.licienseNo+req.body.licienseCity
  
 
  var date = new Date();
  var insertQuery = "INSERT INTO time_stamp (parking_name,time_in,carlicenseNo) VALUES (?,?,?)";
  connection.query(insertQuery,[req.body.parkingName,date,carlicenseNovar],
  
   function(err,  results, fields){
     if (err) throw err;
  
                       }); 
  
  
  
  
  
  
  
  
  /////////////////////////////////////
      console.log(rows);

      if(rows[0]){if(rows[0].Liciense_plate_NO == carlicenseNovar) 
        res.send("you are member")
      
      }else{
        res.send("you are not member")
      }
      
  
     });
    
    
   
   }

const piMiddlewareOut = (req, res, next) => {

    var newparkingstat = [
      [req.body.licienseAlp],[req.body.licienseNo],[req.body.licienseCity]
      
    ];
    console.log(req.body);
  
    connection.query("SELECT * FROM car WHERE licienseAlp = ? and licienseNo = ? and licienseCity = ?", [req.body.licienseAlp,req.body.licienseNo,req.body.licienseCity],
     function(err1, rows){ 
      if (err1) return res.status(400).json( {status:400,message: err1.message});
  ///////////////////////////////in select car
  var carlicenseNovar = ""+req.body.licienseAlp+req.body.licienseNo+req.body.licienseCity
  if(rows[0].carlicenseNo == carlicenseNovar){
    connection.query("SELECT memberId FROM car WHERE  carlicenseNo =?", [carlicenseNovar],
    function(err1, rows){ 
     if (err1) return res.status(400).json( {status:400,message: err1.message});
     var memberid = "notright"
     if(rows.length)memberid = rows[0].memberId;
  
     var date = new Date();
    var insertQuery = "INSERT INTO time_stamp (time_in,type,carlicenseNo,memberid,parking_name) VALUES (?,?,?,?,?)";
            connection.query(insertQuery,[date,'out',carlicenseNovar,memberid,req.body.parkingName],
     
             function(err,  results, fields){
               if (err) return res.status(400).json( {status:400,message: err.message});
    
      
                                 }); 
  
      });
      res.send("1")
   
        
  
 }else if(!rows.length){return res.send("0")
console.log("0")
}
      
  
     });
    
    
   }
const piCheckcar = (req, res, next) => {

   
    
  
    connection.query("SELECT parkingSlotNo FROM parking_status WHERE parkingName = ? and parkingStatus != 1 ", [req.body.parkingName],
     function(err1, rows){ 
      if (err1) return res.status(400).json( {status:400,message: err1.message});
      res.send(rows)
      return next();
  
     });
    
    
   
   }
const piInbooked = (req, res, next) => {
  var carlicenseNovar = ""+req.body.licienseAlp+req.body.licienseNo+req.body.licienseCity
  
  console.log(carlicenseNovar)
    connection.query("SELECT carlicenseNo FROM parking_status WHERE parkingName = ? and carlicenseNo =?", [req.body.parkingName,carlicenseNovar],
     function(err1, rows){ 
      if (err1) return res.status(400).json( {status:400,message: err1.message});
      
      if(rows.length){ 
        connection.query("SELECT memberId FROM car WHERE  carlicenseNo =?", [carlicenseNovar],
        function(err1, rows){ 
         if (err1) return res.status(400).json( {status:400,message: err1.message});
         var memberid = "notright"
         if(rows.length)memberid = rows[0].memberId;
      
         var date = new Date();
        var insertQuery = "INSERT INTO time_stamp (time_in,type,carlicenseNo,memberid,parking_name) VALUES (?,?,?,?,?)";
                connection.query(insertQuery,[date,'in',carlicenseNovar,memberid,req.body.parkingName],
         
                 function(err,  results, fields){
                   if (err) return res.status(400).json( {status:400,message: err.message});
        
          
                                     }); 
      
          });
       
        res.send('1');   //ถ้าเจอว่าจอง ให้เข้ามาได้
   
     
      }
       if(!rows.length)return res.send('0');  //ถ้าไม่เจอส่ง0 ห้ามเข้า
      
  
     });
    
    
   
   }

const piWalkin = (req, res, next) => {

  var carlicenseNovar = ""+req.body.licienseAlp+req.body.licienseNo+req.body.licienseCity

  
    connection.query("SELECT parkingSlotNo FROM parking_status WHERE parkingName = ? and parkingStatus = 0 ", [req.body.parkingName],
     function(err1, rows){ 
      if (err1) return res.status(400).json( {status:400,message: err1.message});
      
      
      if(rows.length){ console.log("can walkin")   //มีที่ว่างสำหรับ walkin
      connection.query("SELECT * FROM car WHERE licienseAlp = ? and licienseNo = ? and licienseCity = ?", [req.body.licienseAlp,req.body.licienseNo,req.body.licienseCity],
     function(err2, rows2){ 
      if (err2) return res.status(400).json( {status:400,message: err2.message}); //
      console.log(rows2)
      if(rows2.length){if(rows2[0].carlicenseNo == carlicenseNovar) 
        
        connection.query("SELECT memberId FROM car WHERE  carlicenseNo =?", [carlicenseNovar],
        function(err1, rows){ 
         if (err1) return res.status(400).json( {status:400,message: err1.message});
         var memberid = "notright"
         if(rows.length)memberid = rows[0].memberId;
      
         var date = new Date();
        var insertQuery = "INSERT INTO time_stamp (time_in,type,carlicenseNo,memberid,parking_name) VALUES (?,?,?,?)";
                connection.query(insertQuery,[date,'in',carlicenseNovar,memberid,req.body.parkingName],
         
                 function(err,  results, fields){
                   if (err) return res.status(400).json( {status:400,message: err.message});
        
          
                                      }); 
      
          });
        
        res.send("1")
      
      }else{
        console.log("notin")
        res.send("0")
      }
      
  
     });
     }
      if(!rows.length)return res.send('0');  //ที่จอดเต็ม


      
      
      
      
      
      



     });

     


    
      
   
   }




/////////////////////////////////////////////////////


return { piMiddlewareIn:piMiddlewareIn,
  piMiddlewareOut:piMiddlewareOut,
  piCheckcar:piCheckcar,
  piInbooked:piInbooked,
  piWalkin:piWalkin
};
}