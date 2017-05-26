var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  firstName: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
