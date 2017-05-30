var db = require('../models');

// GET
function getAllUsers(request, response) {
  db.User.find(function(error, allUsers) {
    if(error) response.json({message: 'Could not find any users'});
    response.json({users: allUsers});
  });
}

// POST
function createUser(request, response) {
  console.log('in POST');
  console.log('body:',request.body);
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
  removeUser: removeUser
}
