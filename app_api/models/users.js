var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');




var usersSchema = new mongoose.Schema({
    
    username: String,
    email: String, 
    password: String,
    role: String
   
});

mongoose.model('Users', usersSchema);

