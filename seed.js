var db = require('./models');

var User = [
  {
    firstName: 'James',
    email: 'jamesnsummers@gmail.com'
  },
  {
    firstName: 'Jared',
    email: 'jjaredwatson@gmail.com'
  },
  {
    firstName: 'Benjamin',
    email: 'benjamin.tovar510@gmail.com'
  },
];

var Taco = [
  {
    tortilla: 'Flour',
    eggs: true,
    meat: 'Chorizo',
    salsa: true,
    cheese: true,
    beans: 'Black',
    potato: false
  },
  {
    tortilla: 'Corn',
    eggs: true,
    meat: 'Bacon',
    salsa: true,
    cheese: true,
    beans: '',
    potato: false
  },
  {
    tortilla: 'Flour',
    eggs: true,
    meat: 'Bacon',
    salsa: true,
    cheese: true,
    beans: 'Black',
    potato: true
  },
  {
    tortilla: 'Wheat',
    eggs: false,
    meat: 'Soyrizo',
    salsa: true,
    cheese: false,
    beans: 'Refried',
    potato: true
  }
];

db.Drone.remove({}, function(err, removedEverything){
  if(err){return console.log("ERR: ", err);}

 db.Drone.create(droneList, function(err, lottaDrones){
    if(err){return console.log("ERR: ", err);}
    console.log(lottaDrones);
    process.exit(1);
  });

});
