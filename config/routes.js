var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var tacosController = require('../controllers/tacos');
var usersController = require('../controllers/users');


// var isAuthenticated = function (req, res, next) {
//   // if user is authenticated in the session, call the next() to call the next request handler
//   // Passport adds this method to request object. A middleware is allowed to add properties to
//   // request and response objects
//   if (req.isAuthenticated())
//     return next();
//   // if the user is not authenticated then redirect him to the login page
//   res.redirect('/');
// }

router.route('/tacos')

  //GET all candies
  .get(tacosController.getAll)
  
  //POST a new blob
  .post(tacosController.createTaco);


// router.route('/tacos/:id')
//
//   // GET return specific candy
//   .get(tacosController.getTaco)
//
//   // PATCH update existing candy
//   .patch(tacosController.voteTaco)
//
//   // DELETE remove specific candy from DB
//   .delete(isAuthenticated, tacosController.removeTaco);

  // router.route('/auth/facebook').get( usersController.login);
  //
  //
  // router.route('/auth/facebook/callback').get(usersController.getCallback);
  //
  // router.route('/logout').get(usersController.logout);

module.exports = router;
