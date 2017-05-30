var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');
var Taco = require('./Taco');


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

module.exports = mongoose.model('Vote', VoteSchema);
