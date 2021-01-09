var route = require('./routes.js');

var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);

var bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
connection.query('USE ' + dbconfig.database);

module.exports.main= function(email,done) {

console.log("booking at "+email);
/////////////////////////////////////////////
var sendemail = async function (req,res) {
  console.log(req.body.email)
  var ok ="okpw"
  var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
  var key = 'password';
  var text = 'admin';
  
  var decipher = crypto.createDecipher(algorithm, key);
  

  connection.query("SELECT * FROM members WHERE email = ? ", [req.body.email],
  async function(err, rows){
    
    if(!rows.length){
      console.log(rows.lenght)
      return res.send("email not found")}
    if(rows.length){
      var decrypted = decipher.update(rows[0].password, 'hex', 'utf8') + decipher.final('utf8');
       // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: { // ข้อมูลการเข้าสู่ระบบ
        user: 'smartparking.app.kmitl', // email user ของเรา
        pass: 'smpk1345kmitlok' // email password
      }
     });
     // เริ่มทำการส่งอีเมล
     let info = await transporter.sendMail({
     from: '"smartparking kmitl" <smartparking.app.kmitl@gmail.com>', // อีเมลผู้ส่ง
     to: req.body.email, // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
     subject: 'This is your password ✔', // หัวข้ออีเมล
     text: 'text', // plain text body
     html: 'This is your password :  ' + decrypted// html body
     });
     // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
     console.log('Message sent: %s', info.messageId);
     res.send("send email at :"+req.body.email)
    
    }
   });

    
}







/////////////////////////////////////////////////////


return { sendemail:sendemail };
}