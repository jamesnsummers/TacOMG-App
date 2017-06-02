// connect to mongoose db
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tacohmygod");

// allows access to all models
module.exports.Taco = require("./Taco.js");
module.exports.User = require("./User.js");
module.exports.Vote = require("./Vote.js");
