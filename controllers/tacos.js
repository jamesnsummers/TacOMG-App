var db = require('../models');
var passport = require('passport');
require("../config/passport")(passport);

// GET all tacos
function getAllTacos(request, response) {
  db.Taco.find().populate('chef')
  .exec(function(error, allTacos) {
    if(error) response.json({message: 'Could not find any tacos'});

    // require any and all passport junk to be able to pass in req.user into your ejs json object
    console.log (allTacos);
    var chefs = allTacos.map(function (taco){
      taco.getVotes();
      return {firstName: taco.chef.fb.firstName, id: taco.chef._id};
    });

    // // stop user from voting for single taco more than once
    // allTacos.forEach(function(taco, user){
    //   tacoId = taco._id;
    //   userId = user._id
    //   db.Vote.findOne({tacoId, userId}, function(err, succ){
    //     if (succ) {taco.voted === true;}
    //     else {taco.voted === false;}
    //   });
    // });

    // votes = allTacos.map(function(taco){
    //   vote = taco.getVotes();
    //   console.log('\n Vote: '+ vote + '\n');
    //   return vote;
    // });

    // tally the votes for all tacos
    // allTacos = allTacos.map(function(taco){
    //   db.Vote.findOne({taco: request.body.tacoId}, function(err, succ){
    //     taco.voteCount = succ.length;
    //     console.log(succ);
    //
    //   });
    //     return taco;
    // });
    response.render('partials/tacos/tacos', {chefs: chefs, tacos: allTacos, user: request.user});
  });
}

// POST a new taco
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

// GET single taco
function getTaco(request, response) {
  var id = request.params.id;

  db.Taco.findById({_id: id}, function(error, taco) {
    if(error) response.json({message: 'Could not find taco b/c:' + error});

    response.json({taco: taco});
  });
}

//UPDATE taco
function updateTaco(request, response) {
  var id = request.params.id;

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

//DELETE a taco
function removeTaco(request, response) {
  var id = request.params.id;

  db.Taco.findOneAndRemove({_id: id})
    .exec(function(error, deletedTaco) {
    if(error) response.json({message: 'Could not delete taco b/c:' + error});
    response.json({message: 'Taco successfully deleted!'});
  });
}

// // delete book
// app.delete('/api/books/:id', function (req, res) {
//   // get book id from url params (`req.params`)
//   console.log('books deleted: ', req.params);
//   var bookId = req.params.id;
//   // find the index of the book we want to remove
//   db.Book.findOneAndRemove({ _id: bookId })
//     .populate('author')
//     .exec(function (err, deletedBook) {
//       res.json(deletedBook);
//   });
// });

module.exports = {
  getAllTacos: getAllTacos,
  createTaco: createTaco,
  getTaco: getTaco,
  updateTaco: updateTaco,
  removeTaco: removeTaco
}
