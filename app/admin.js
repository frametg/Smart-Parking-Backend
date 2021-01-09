var route = require('./routes.js');

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports.main= function(email,done) {

console.log("booking at "+email);
/////////////////////////////////////////////
var showregister = function(req,res){

    



}


const statuscarMiddlewareslot5 = (req, res, next) => {

    var newparkingstat = [
      [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
      
    ];
    console.log("input : "+ req.body);
    var db_parkingStatus;
  
    connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo5],
     function(err1, rows){
      if(!rows.length) {
        console.log(rows)
        var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
            connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo5,req.body.parkingStatus5,req.body.carlicenseNo],
     
             function(err,  results, fields){
               if (err) throw err;
      
                       res.send(req.body);           }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo5,req.body.parkingStatus5],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus1==0)&&!(db_parkingStatus==1 && req.body.parkingStatus1==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus5,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo5];
  
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




/////////////////////////////////////////////////////


return { carbooking:carbooking , postcarbooking:postcarbooking};
}