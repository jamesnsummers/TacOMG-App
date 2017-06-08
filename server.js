// dependecies
var express        = require('express');
var expressSession = require('express-session');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
var cookieParser   = require("cookie-parser");
var passport       = require('passport');

// TODO: eventually, you will not need to require this db as you won't call the db at all in your server.js
// connect to db models
var db = require('./models');
// connect to routes
var routes = require('./config/routes');

// Middleware
app.use(cookieParser());
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

// TODO: Do we need to see a list of all users? We shouldn't expose this data to users
//GET all users in json -- need to restrict access
app.get('/api/users', function(req, res) {
// find all users in db
    db.User.find({}, function(err, allUsers) {
        res.json({ User: allUsers });
    });
});

// TODO: Consider moving this endpoint to the taco controller
//GET all tacos in json
app.get('/api/tacos', function(req, res) {
// find all tacos in db
    db.Taco.find({}, function(err, allTacos) {
        res.json({ Taco: allTacos });
    });
});

//GET landing page/layout
app.get('/', function(req, res){
  res.render('layout', {user: req.user});
});

// TODO: Move this statement higher up the file but below the passport requirement.
// Setting up the Passport Strategies
require("./config/passport")(passport)

// TODO: These are in routes.js, remove them.
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));


// TODO: Consider adding flash messaging to tell the user whey they failed at logging in.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

// TODO: Consider adding flash messaging to say goodbye to the user.
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
});

// Add static middleware
app.use(express.static(__dirname + '/public'));

app.use(routes);

// Listening at local host and heroku
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running!');
});
