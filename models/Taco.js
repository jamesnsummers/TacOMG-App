var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var TacoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tortilla: String,
  eggs: Boolean,
  meat: String,
  salsa: Boolean,
  cheese: Boolean,
  beans: String,
  potato: Boolean
});

module.exports = mongoose.model('Taco', TacoSchema);
