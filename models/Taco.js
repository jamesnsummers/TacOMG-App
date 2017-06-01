var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');
var Vote = require('./Vote');

var TacoSchema = new Schema({
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tortilla: String,
  eggs: Boolean,
  meat: String,
  salsa: Boolean,
  cheese: Boolean,
  beans: String,
  potato: Boolean,
  votes: Number
});

TacoSchema.methods.getVotes = function(){
  var total;
  var taco = this;
  Vote.find({_taco: this._id}, function(err, succ){
    if(err){return console.log(err);}
    taco.votes = succ.length;
    taco.save(function(err, succ){
      console.log(succ);
      return succ;
    });
  });
}

module.exports = mongoose.model('Taco', TacoSchema);
