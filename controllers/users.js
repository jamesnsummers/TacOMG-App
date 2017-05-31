var db = require('../models');

function login(request, response){
  var loginStrategy = passport.authenticate('facebook');
  return loginStrategy(request, response)
}

function getCallback(request, response){
  var callback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/'
  });

  // var callback(request, response);
}

function logout(request, response) {
  request.logout();
  response.redirect('/');
}

// GET
function getAllUsers(request, response) {
  db.User.find(function(error, allUsers) {
    if(error) response.json({message: 'Could not find any users'});
    response.render('partials/users/users', {users: allUsers});
  });
}

// POST
function createUser(request, response) {
  var user = new db.User();

  user.firstName = request.body.firstName;
  user.email = request.body.email;

  user.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate user b/c:' + error});

    response.redirect('/users');
  });
}

// GET
function getUser(request, response) {
  var id = request.params.id;

  db.User.findById({_id: id}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json({user: user});
  });
}

// //UPDATE
// function voteTaco(request, response) {
//   var id = request.params.id;
//
//   db.Taco.findById({_id: id}, function(error, taco) {
//     if(error) response.json({message: 'Could not find taco b/c:' + error});
//
//     if(request.body.id) taco.id = request.body.id;
//
//     taco.save(function(error) {
//       if(error) response.json({messsage: 'Could not update taco b/c:' + error});
//
//       response.json({message: 'Taco successfully updated'});
//     });
//   });
// }

function removeUser(request, response) {
  var id = request.params.id;

  db.User.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete user b/c:' + error});

    response.json({message: 'User successfully deleted'});
  });
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUser: getUser,
  removeUser: removeUser,
  login: login,
  getCallback: getCallback,
  logout: logout
}
