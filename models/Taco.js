var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TacoSchema = new Schema({
  tortilla: String,
  eggs: Boolean,
  meat: String,
  salsa: Boolean,
  cheese: Boolean,
  beans: String,
  potato: Boolean
});

module.exports = mongoose.model('Taco', TacoSchema);
