var db = require('../models');

// GET
function getAllTacos(request, response) {
  db.Taco.find(function(error, allTacos) {
    if(error) response.json({message: 'Could not find any tacos'});
    response.json({Taco: allTacos});
    // response.render('layout', {tacos: allTacos});
  });
}

// POST
function createTaco(request, response) {
  var taco = new db.Taco();

  taco.tortilla = request.body.tortilla;
  taco.eggs = request.body.eggs;
  taco.meat = request.body.meat;
  taco.salsa = request.body.salsa;
  taco.cheese = request.body.cheese;
  taco.beans = request.body.beans;
  taco.potato = request.body.potato;

  taco.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate taco b/c:' + error});

    response.redirect('/tacos');
  });
}

// GET
function getTaco(request, response) {
  var id = request.params.id;

  db.Taco.findById({_id: id}, function(error, taco) {
    if(error) response.json({message: 'Could not find taco b/c:' + error});

    response.json({taco: taco});
  });
}

// //UPDATE
// function voteTaco(request, response) {
//   var id = request.params.id;
//
//   db.Taco.findById({_id: id}, function(error, taco) {
//     if(error) response.json({message: 'Could not find taco b/c:' + error});
//
//     if(request.body.voteCount) taco.voteCount = request.body.voteCount;
//
//     taco.save(function(error) {
//       if(error) response.json({messsage: 'Could not update taco b/c:' + error});
//
//       response.json({message: 'Taco successfully updated'});
//     });
//   });
// }

function removeTaco(request, response) {
  var id = request.params.id;

  db.Taco.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete taco b/c:' + error});

    response.json({message: 'Taco successfully deleted'});
  });
}

module.exports = {
  getAllTacos: getAllTacos,
  createTaco: createTaco,
  getTaco: getTaco,
  // voteTaco: voteTaco,
  removeTaco: removeTaco
}
