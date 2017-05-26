var db = require('./models');

var userList = [
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
  }
];

var tacoList = [
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

db.Taco.remove({}, function(err, removedEverything){
  if(err){return console.log("ERR: ", err);}

 db.Taco.create(tacoList, function(err, allTacos){
    if(err){return console.log("ERR: ", err);}
    console.log(allTacos);

    db.User.remove({}, function(err, removedEverything){
      if(err){return console.log("ERR: ", err);}

     db.User.create(userList, function(err, allUsers){
        if(err){return console.log("ERR: ", err);}
        console.log(allUsers);
        process.exit(1);
      });
    });
  });
});
