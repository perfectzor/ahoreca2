var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    createdOn: { type: Date, "default": Date.now }
    
});

var leadsSchema = new mongoose.Schema({
    number: { type: Number},
    name: { type: String, required: true },
    clientvat: { type: Number, required: true },
    cae: { type: String, required: false },
    address: { type: String, required: true },
    telephone: { type: Number, required: false },
    email: { type: String, required: true },
    comments: [commentsSchema]
    
});

mongoose.model('Leads', leadsSchema);

