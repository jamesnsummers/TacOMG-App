// connect to mongoose db
var mongoose = require('mongoose');

//set up User model
var UserSchema = mongoose.Schema({
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});

// export model for use elsewhere in the project code
module.exports = mongoose.model('User', UserSchema);
