var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8080;

var passport = require('passport');
var flash = require('connect-flash');

const jwt = require("jwt-simple");

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;




require('./config/passport')(passport);



app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 extended: false
}));


app.set('view engine', 'ejs');

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());





//app.use(csrf({ cookie: true }))
//csrfToken: req.csrfToken()


require('./app/routes.js')(app, passport);

app.listen(port );
console.log("Port: " + port);