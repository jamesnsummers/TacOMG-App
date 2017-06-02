// Connect to models in db
var db = require('../models');
// Use passport for auth
var passport = require('passport');
require("../config/passport")(passport)

// Create a new vote
function createVote(request, response) {
  // establish that a vote has a userId and tacoId
  var newVote = {
    _user: request.user,
    _taco: request.params.tacoId
  };
  // create a new vote in the db
  db.Vote.create(newVote, function(error, newVote) {
    if(error) response.json({messsage: 'Could not ceate vote b/c:' + error});
    console.log("\nCreated New Vote\n");
    //find taco via params
    db.Taco.findOne({_id: newVote._taco}, function(err, votedTaco){
      if(err){return console.log(err);}
      //add vote to the db
      votedTaco.votes++;
      //save the vote
      votedTaco.save(function(err, updatedTaco){

        if(err){return console.log(err);}
        //find all tacos with votes
        db.Taco.find(function(err, allTacos){

          if(err){return console.log(err);}
          //redirect to the taco gallery with updated votes
          response.redirect('/tacos');
        });
      });
    });
  });
}

// export function for use elsewhere in the project code
module.exports = {
  createVote : createVote
}
