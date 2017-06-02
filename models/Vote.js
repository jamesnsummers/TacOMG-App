// connect to mongoose db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// connecting to user and taco models
var User = require('./User');
var Taco = require('./Taco');

//set up Vote model -- requires userId and tacoId
var VoteSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _taco: {
    type: Schema.Types.ObjectId,
    ref: 'Taco'
  }
});

// export model for use elsewhere in the project code
module.exports = mongoose.model('Vote', VoteSchema);
