require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var Quagga = require('quagga').default;

var path = require('path')

var path = require('path');

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

app.use('/template', express.static(path.join(__dirname, 'template')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/record', express.static(path.join(__dirname, 'record')));
app.use('/food', express.static(path.join(__dirname, 'food')));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller')); // localhost:3000/api/users/ => ./controllers/api/users.controller
app.use('/record', require('./controllers/record.controller'));
app.use('/food', require('./controllers/food.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "diabetecares@gmail.com",
        pass: "admin-care"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});