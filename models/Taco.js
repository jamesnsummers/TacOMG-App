// connect to mongoose db
var mongoose = require('mongoose');
// set up variables for schema
var Schema = mongoose.Schema;
// connecting to user and vote models
var User = require('./User');
// TODO: We won't need to require this in it's current form.
var Vote = require('./Vote');

//set up Taco model
var TacoSchema = new Schema({
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tortilla: String,
  eggs: Boolean,
  meat: String,
  salsa: Boolean,
  cheese: Boolean,
  beans: String,
  potato: Boolean,
  votes: {type:Number, default: 0}
});
// export model for use elsewhere in the project code
module.exports = mongoose.model('Taco', TacoSchema);
