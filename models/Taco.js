var mongoose = require('mongoose');

// var Vote = require('./vote');

// var VoteSchema = mongoose.Schema({
//   vote: Number
// });

var TacoSchema = mongoose.Schema({
  tortilla: String,
  eggs: Boolean,
  meat: String,
  salsa: Boolean,
  cheese: Boolean,
  beans: String,
  potato: Boolean,
  votes: Number
});

module.exports = mongoose.model('Taco', TacoSchema);
