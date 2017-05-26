var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tacohmygod");

module.exports.Taco = require("./taco.js");
module.exports.User = require("./user.js");
