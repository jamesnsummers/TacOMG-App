var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

// connect to controllers
var tacosController = require('../controllers/tacos');
var usersController = require('../controllers/users');
var votesController = require('../controllers/votes');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

// ROUTES //

// Multiple Tacos route
router.route('/tacos')
  //GET all tacos
  .get(tacosController.getAllTacos)
  //POST a new blob
  .post(tacosController.createTaco)

// Single Taco route
router.route('/tacos/:id')
  // GET return specific taco
  .get(tacosController.getTaco)
  // PATCH update existing taco -- still working on getting this working on the front end
  .patch(tacosController.updateTaco)
  // DELETE remove specific taco from DB
  .delete(tacosController.removeTaco);

// Multiple Users route
router.route('/users')
  //GET all users
  .get(usersController.getAllUsers)
  //POST a new user
  .post(usersController.createUser);

// Single User route
router.route('/users/:id')
  // GET return specific user
  .get(usersController.getUser)
  // DELETE remove specific user from DB
  .delete(usersController.removeUser);

// Votes route
router.route('/votes/:tacoId')
  //GET retrieves a vote after its made
  .get(votesController.createVote);

//Facebook Auth routes
router.route('/auth/facebook').get(usersController.login);
router.route('/auth/facebook/callback').get(usersController.getCallback);
router.route('/logout').get(usersController.logout);

//Export router to allow use in other files within project
module.exports = router;
