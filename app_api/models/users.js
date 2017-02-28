var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');




var usersSchema = new mongoose.Schema({
    
    username: String,
    email: String, 
    password: String,
    role: String,
    name: String,
    company: String
   
});

mongoose.model('Users', usersSchema);

