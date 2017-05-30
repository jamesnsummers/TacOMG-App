var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tacohmygod");

module.exports.Taco = require("./taco.js");
module.exports.User = require("./user.js");
