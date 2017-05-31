var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});

module.exports = mongoose.model('User', UserSchema);
