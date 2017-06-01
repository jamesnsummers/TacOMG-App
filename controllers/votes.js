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



// how to look for duplicates:

/*
  1. Find if a vote exists with current user and taco id
    if it does, deny the user the ability to vote.
    maybe send a json response of {hasVoted: true}

    if they haven't voted, send a json response of {hasVoted: false}
*/

module.exports = {
  createVote : createVote
}
