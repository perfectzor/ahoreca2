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

module.exports = mongoose.model('users', usersSchema);

