

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports.main= function(email,done) {

console.log("booking at "+email);
/////////////////////////////////////////////
const statuscarMiddlewareslot1 = (req, res, next) => {

    var newparkingstat = [
      [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
      
    ];
    console.log("input : "+ req.body);
    var db_parkingStatus;
  
    connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo1],
     function(err1, rows){
      if(!rows.length) {
        console.log(rows)
        var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
            connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo1,req.body.parkingStatus1,req.body.carlicenseNo],
     
             function(err,  results, fields){
               if (err) throw err;
      
                                  }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo1,req.body.parkingStatus1],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus1==0)&&!(db_parkingStatus==1 && req.body.parkingStatus1==2)&&!(db_parkingStatus==2 && req.body.parkingStatus1==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus1,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo1];
  
                      // execute the UPDATE statement
                      connection.query(update_sql, data, (error, results, fields) => {
                      if (error){
                      return console.error(error.message);
                      }
                      console.log('Rows affected:', results.affectedRows);
                               
                      });
  
  
                   }else{
                    console.log("not correct")}
                    
                  }
                   else if (rows_status.length)  {
                    console.log("repeat or not correct") 
                    }
  
                 
                    });
         
            
          } 
  
          if(err1) throw err1;
  
  
  
      });
    next();
   
   }
const statuscarMiddlewareslot2 = (req, res, next) => {

    var newparkingstat = [
      [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
      
    ];
    console.log("input : "+ req.body);
    var db_parkingStatus;
  
    connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo2],
     function(err1, rows){
      if(!rows.length) {
        console.log(rows)
        var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
            connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo2,req.body.parkingStatus2,req.body.carlicenseNo],
     
             function(err,  results, fields){
               if (err) throw err;
               }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo2,req.body.parkingStatus2],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus2==0)&&!(db_parkingStatus==1 && req.body.parkingStatus2==2)&&!(db_parkingStatus==2 && req.body.parkingStatus2==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus2,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo2];
  
                      // execute the UPDATE statement
                      connection.query(update_sql, data, (error, results, fields) => {
                      if (error){
                      return console.error(error.message);
                      }
                      console.log('Rows affected:', results.affectedRows);  
                      });
  
  
                   }else{
                    console.log("not correct") 
                    }
                    
                  }
                   else if (rows_status.length)  {
                    console.log("repeat or not correct") }
  
                 
                    });
         
            
          } 
  
          if(err1) throw err1;
  
  
  
      });
    
   next();
   }
const statuscarMiddlewareslot3 = (req, res, next) => {

    var newparkingstat = [
      [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
      
    ];
    console.log("input : "+ req.body);
    var db_parkingStatus;
  
    connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo3],
     function(err1, rows){
      if(!rows.length) {
        console.log(rows)
        var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
            connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo3,req.body.parkingStatus3,req.body.carlicenseNo],
     
             function(err,  results, fields){
               if (err) throw err;
               }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo3,req.body.parkingStatus3],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus3==0)&&!(db_parkingStatus==1 && req.body.parkingStatus3==2)&&!(db_parkingStatus==2 && req.body.parkingStatus3==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus3,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo3];
  
                      // execute the UPDATE statement
                      connection.query(update_sql, data, (error, results, fields) => {
                      if (error){
                      return console.error(error.message);
                      }
                      console.log('Rows affected:', results.affectedRows);
                             
                      });
  
  
                   }else{
                    console.log("not correct") 
                    }
                    
                  }
                   else if (rows_status.length)  {
                    console.log("repeat or not correct") 
                    }
  
                 
                    });
         
            
          } 
  
          if(err1) throw err1;
  
  
  
      });
    
   next();
   }
const statuscarMiddlewareslot4 = (req, res, next) => {

    var newparkingstat = [
      [req.body.parkingName],[req.body.parkingSlotNo],[req.body.parkingStatus]
      
    ];
    console.log("input : "+ req.body);
    var db_parkingStatus;
  
    connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? ", [req.body.parkingName,req.body.parkingSlotNo4],
     function(err1, rows){
      if(!rows.length) {
        console.log(rows)
        var insertQuery = "INSERT INTO parking_status (parkingName,parkingSlotNo,parkingStatus,carlicenseNo) VALUES (?,?,?,?)";
            connection.query(insertQuery,[req.body.parkingName,req.body.parkingSlotNo4,req.body.parkingStatus4,req.body.carlicenseNo],
     
             function(err,  results, fields){
               if (err) throw err;
      
                       }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo4,req.body.parkingStatus4],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus4==0)&&!(db_parkingStatus==1 && req.body.parkingStatus4==2)&&!(db_parkingStatus==2 && req.body.parkingStatus4==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus4,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo4];
  
                      // execute the UPDATE statement
                      connection.query(update_sql, data, (error, results, fields) => {
                      if (error){
                      return console.error(error.message);
                      }
                      console.log('Rows affected:', results.affectedRows);
                      });
  
  
                   }else{
                    console.log("not correct") 
                   } 
                  }
                   else if (rows_status.length)  {
                    console.log("repeat or not correct") 
                }
  
                 
                    });
         
            
          } 
  
          if(err1) throw err1;
  
  
  
      });
    
   next();
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
           }); 
  
          
        
  
          }
          else if (rows.length){
            db_parkingStatus= rows[0].parkingStatus;
  
            connection.query("SELECT * FROM parking_status WHERE parkingName = ? and parkingSlotNo = ? and parkingStatus = ? ", [req.body.parkingName,req.body.parkingSlotNo5,req.body.parkingStatus5],
            function(status_err, rows_status){
              console.log(rows[0])
              if(!rows_status.length) {
               
                if(!(db_parkingStatus==2 && req.body.parkingStatus5==0)&&!(db_parkingStatus==1 && req.body.parkingStatus5==2)&&!(db_parkingStatus==2 && req.body.parkingStatus2==2))   {
                     var update_sql = "UPDATE parking_status SET parkingStatus = ? , carlicenseNo = ? WHERE parkingName = ? and parkingSlotNo = ?";
  
                       var data = [req.body.parkingStatus5,req.body.carlicenseNo,req.body.parkingName,req.body.parkingSlotNo5];
  
                      // execute the UPDATE statement
                      connection.query(update_sql, data, (error, results, fields) => {
                      if (error){
                      return console.error(error.message);
                      }
                      console.log('Rows affected:', results.affectedRows);
                      });
  
  
                   }else{
                    console.log("not correct") 
                   }
                  }
                   else if (rows_status.length)  {
                    console.log("repeat or not correct") 
                }
  
                 
                    });
         
            
          } 
  
          if(err1) throw err1;
  
  
  
      });
    next();
   
   }








/////////////////////////////////////////////////////


return { statuscarMiddlewareslot1:statuscarMiddlewareslot1,
    statuscarMiddlewareslot2:statuscarMiddlewareslot2,
    statuscarMiddlewareslot3:statuscarMiddlewareslot3,
    statuscarMiddlewareslot4:statuscarMiddlewareslot4,
    statuscarMiddlewareslot5:statuscarMiddlewareslot5};
}