// connect to mongoose db
var mongoose = require("mongoose");
mongoose.connect("mongodb://jamesnsummers:password37@ds049171.mlab.com:49171/tacomg");

// allows access to all models
module.exports.Taco = require("./Taco.js");
module.exports.User = require("./User.js");
module.exports.Vote = require("./Vote.js");
