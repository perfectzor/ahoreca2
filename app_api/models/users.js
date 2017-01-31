var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');




var usersSchema = new mongoose.Schema({
    
    username: String,
    email: String, 
    password: String,
    vat: String
   
});

mongoose.model('Users', usersSchema);

