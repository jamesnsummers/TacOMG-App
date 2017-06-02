// Connect to models in db
var db = require('../models');

// Facebook auth functions
function login(request, response){
  var loginStrategy = passport.authenticate('facebook');
  return loginStrategy(request, response)
}

function getCallback(request, response){
  var callback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/'
  });
}

function logout(request, response) {
  request.logout();
  response.redirect('/');
}

// GET retrieve all users in json -- still need to restrict access to this to admins
function getAllUsers(request, response) {
  db.User.find(function(error, allUsers) {
    if(error) response.json({message: 'Could not find any users'});
    response.render('partials/users/users', {users: allUsers});
  });
}

// POST add a new user to db
function createUser(request, response) {
  var user = new db.User();

  user.id = request.body.id;
  user.access_token = request.body.access_token;
  user.firstName = request.body.firstName;
  user.lastName = request.body.lastName;
  user.email = request.body.email;

  user.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate user b/c:' + error});

    response.redirect('/users');
  });
}

// GET retrieve a single user
function getUser(request, response) {
  var id = request.params.id;

  db.User.findById({_id: id}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json({user: user});
  });
}

//DELETE remove a user from the db
function removeUser(request, response) {
  var id = request.params.id;

  db.User.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete user b/c:' + error});

    response.json({message: 'User successfully deleted'});
  });
}

// export all functions for use elsewhere in the project code
module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUser: getUser,
  removeUser: removeUser,
  login: login,
  getCallback: getCallback,
  logout: logout
}
