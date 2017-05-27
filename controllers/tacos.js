var db = require('../models');

// GET
function getAll(request, response) {
  db.Taco.find(function(error, allTacos) {
    if(error) response.json({message: 'Could not find any tacos'});

    //response.json({message: candies});
    response.json({Taco: allTacos});
  });
}

// POST
function createTaco(request, response) {
  console.log('in POST');
  console.log('body:',request.body);
  var taco = new db.Taco();

  taco.tortilla = request.body.tortilla;
  taco.eggs = request.body.eggs;
  taco.meat = request.body.meat;
  taco.salsa = request.body.salsa;
  taco.cheese = request.body.cheese;
  taco.beans = request.body.beans;
  taco.potato = request.body.potato;

  taco.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate candy b/c:' + error});

    response.redirect('/tacos');
  });
}
//
// // GET
// function getCandy(request, response) {
//   var id = request.params.id;
//
//   Candy.findById({_id: id}, function(error, candy) {
//     if(error) response.json({message: 'Could not find candy b/c:' + error});
//
//     response.json({candy: candy});
//   });
// }
//
// function updateCandy(request, response) {
//   var id = request.params.id;
//
//   Candy.findById({_id: id}, function(error, candy) {
//     if(error) response.json({message: 'Could not find candy b/c:' + error});
//
//     if(request.body.name) candy.name = request.body.name;
//     if(request.body.color) candy.color = request.body.color;
//
//     candy.save(function(error) {
//       if(error) response.json({messsage: 'Could not update candy b/c:' + error});
//
//       response.json({message: 'Candy successfully updated'});
//     });
//   });
// }
//
// function removeCandy(request, response) {
//   var id = request.params.id;
//
//   Candy.remove({_id: id}, function(error) {
//     if(error) response.json({message: 'Could not delete candy b/c:' + error});
//
//     response.json({message: 'Candy successfully deleted'});
//   });
// }

module.exports = {
  getAll: getAll,
  createTaco: createTaco
}
