var route = require('./routes.js');

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports.main= function(email,done) {
var gg= 'gg';
console.log("booking at "+email);
/////////////////////////////////////////////
var carbooking = function(req,res,next){
//res.write("book");
//res.end();

var obj_car=[];
var date = new Date();
console.log(date)

connection.query("SELECT carlicenseNo FROM booking WHERE bookingTime < (NOW() - INTERVAL 30 MINUTE) ",
   function(err1, rows){
if(err1)  return res.status(400).json( {status:400,message: err1.message});;
console.log(rows)
var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE carlicenseNo = ?";

  //connection.query(update_sql,[req.body.parkingStatus,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo],

 // function(err,  results, fields){
  //if (err) throw err;});    




    });

connection.query("DELETE FROM booking WHERE bookingTime < (NOW() - INTERVAL 30 MINUTE)",
   function(err1, rows){
  if(err1) throw err1;
  
  


});

connection.query("SELECT parkingSlotNo,parkingStatus FROM parking_status WHERE parkingName = ? ", [req.body.parkingName],
   function(err1, rows){
    if(err1) throw err1;
    res.send(rows)
    
    

    });
//res.json( {cardel:req.cardel,status:req.status});



}

var postcarbooking = async  function(req,res){
  var parkingslot
 
  connection.query("SELECT parkingSlotNo FROM parking_status WHERE parkingName = ? and parkingStatus = 0", [req.body.parkingName],
  function(err1, row_book){
   if(err1) throw err1;
   if(!row_book.length){return res.send("full of booking")}
   connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingStatus = 2 and carlicenseNo = ?", [req.body.parkingName,req.body.carlicenseNo],
  function(err2, row_same){
    if(row_same.length){return res.send("you are now booking")}
   console.log(row_book)
   parkingslot = row_book[0].parkingSlotNo;

    var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";

      connection.query(update_sql,['2',req.body.carlicenseNo,req.body.parkingName,parkingslot],
   
      function(err,  results, fields){
      if (err) throw err;

      var date = new Date();
      var datenow = new Date(date.getTime());
      var date30 = date.setMinutes(date.getMinutes() + 30);
      console.log(datenow);
      console.log(date);
      
      var insertQuerybook =  "INSERT INTO booking (bookingTime,bookingTimeout,carlicenseNo) VALUES (?,?,?)";
      connection.query(insertQuerybook,[datenow,date,req.body.carlicenseNo],
   
      function(err1,  results, fields){
      if (err1) throw err1;}); 
       
      res.send("booking success")
    
    console.log(parkingslot)
    });
   
  });
  });

   console.log(parkingslot);



  //////////////////////////////////////////////////




  
    

      

 
    }




/////////////////////////////////////////////////////


return {gg:gg, carbooking:carbooking , postcarbooking:postcarbooking};
}

console.log(route.email);