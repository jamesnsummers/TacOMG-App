//TODO: put in vote controller
var db = require('../models');
var passport = require('passport');
require("../config/passport")(passport)

function createVote(request, response) {
  //response.json({message: 'TACO: ' + request.body.tacoId + ' USER:' + request.user._id});

  var newVote = {
    _user: request.user._id,
    _taco: request.body.tacoId
  };

  db.Vote.create(newVote, function(error, newVote) {
    if(error) response.json({messsage: 'Could not ceate vote b/c:' + error});
    console.log("\nCreated New Vote\n");
    response.json(newVote);
  });

}

function findVote(request, response){
  db.Vote.findOne({_user: request.user._id, _taco: request.body.tacoId})
    .detach('.buttonPlus btn btn-info');
}
// how to look for duplicates:

/*
  1. Find if a vote exists with current user and taco id
    if it does, deny the user the ability to vote.
    maybe send a json response of {hasVoted: true}

    if they haven't voted, send a json response of {hasVoted: false}
*/
// find the author from req.body





function createBookWithAuthorAndRespondTo(book, author, res) {
// add this author to the book
book.author = author;
// save newBook to database
book.save(function(err, book){
  if (err) {
    return console.log("save error: " + err);
  }
  console.log("saved ", book.title);
  // send back the book!
  res.json(book);
});
}

module.exports = {
  createVote : createVote
}
