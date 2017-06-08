// Connect to models in db
var db = require('../models');
// Use passport for auth
var passport = require('passport');
require("../config/passport")(passport);

// GET retrieve all tacos
function getAllTacos(request, response) {
  db.Taco.find().populate('chef')
  .exec(function(error, allTacos) {
    if(error) response.json({message: 'Could not find any tacos'});

    // require any and all passport junk to be able to pass in req.user into your ejs json object
    var chefs = allTacos.map(function (taco){
      return {firstName: taco.chef.fb.firstName, id: taco.chef._id};
    });
    response.render('partials/tacos/tacos', {chefs: chefs, tacos: allTacos, user: request.user});
  });
}

// POST create a new taco
function createTaco(request, response) {
  var taco = new db.Taco();

  taco.chef = request.user;
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

// GET retrieve a single taco
function getTaco(request, response) {
  var id = request.params.id;

  db.Taco.findById({_id: id}, function(error, taco) {
    if(error) response.json({message: 'Could not find taco b/c:' + error});

    response.json({taco: taco});
  });
}

//UPDATE a single taco -- still working on getting this working on front end
function updateTaco(request, response) {
  var id = request.params.id;
  // TODO: Look up the findOneAndUpdate DB method, it will make this much smaller
  db.Taco.findById({_id: id}, function(error, taco) {
    if(error) response.json({message: 'Could not find taco b/c:' + error});

    if(request.body.id) taco.id = request.body.id;
    if(request.body.tortilla) taco.tortilla = request.body.tortilla;
    if(request.body.eggs) taco.eggs = request.body.eggs;
    if(request.body.meat) taco.meat = request.body.meat;
    if(request.body.potato) taco.potato = request.body.potato;
    if(request.body.beans) taco.beans = request.body.beans;
    if(request.body.salsa) taco.salsa = request.body.salsa;
    if(request.body.cheese) taco.cheese = request.body.cheese;

    taco.save(function(error) {
      if(error) response.json({messsage: 'Could not update taco b/c:' + error});

      response.json({message: 'Taco successfully updated'});
    });
  });
}

//DELETE a taco -- still working on getting this working on front end
function removeTaco(request, response) {
  var id = request.params.id;

  db.Taco.findOneAndRemove({_id: id})
    .exec(function(error, deletedTaco) {
    if(error) response.json({message: 'Could not delete taco b/c:' + error});
    response.json({message: 'Taco successfully deleted!'});
  });
}

// export all functions for use elsewhere in the project code
module.exports = {
  getAllTacos: getAllTacos,
  createTaco: createTaco,
  getTaco: getTaco,
  updateTaco: updateTaco,
  removeTaco: removeTaco
}
