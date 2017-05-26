var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
var cookieParser   = require("cookie-parser");


mongoose.connect('mongodb://localhost/tacohmygod');

// connect to db models
var db = require('./models');
var routes = require('./config/routes');

// Middleware
app.use( cookieParser() );
var passport       = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.get('/api/users', function(req, res) {
// find all users in db
    db.User.find({}, function(err, allUsers) {
        res.json({ User: allUsers });
    });
});

app.get('/api/tacos', function(req, res) {
// find all tacos in db
    db.Taco.find({}, function(err, allTacos) {
        res.json({ Taco: allTacos });
    });
});

app.post('')

// app.get('/', function(req, res){
//   res.render('layout', {candies: req.body, user: req.user});
// });
//
// // Setting up the Passport Strategies
// require("./config/passport")(passport)
//
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   })
// );
//
// app.get("/logout", function(req, res){
//   req.logout();
//   res.redirect("/")
// });
//
// // Add static middleware
app.use(express.static(__dirname + '/public'));
//
//
app.use(routes);

app.listen(3000);
