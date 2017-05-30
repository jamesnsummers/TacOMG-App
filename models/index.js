var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tacohmygod");

module.exports.Taco = require("./Taco.js");
module.exports.User = require("./User.js");
