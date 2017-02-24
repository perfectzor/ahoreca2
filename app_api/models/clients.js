var mongoose = require('mongoose');

var reportsSchema = new mongoose.Schema({
    reportid: { type: String, required: true },
    vat: { type: Number, required: true }
    
});

var clientsSchema = new mongoose.Schema({
    number: { type: Number },
    name: { type: String, required: true },
    clientvat: { type: Number, required: true },
    cae: { type: Number, required: false },
    address: { type: String, required: true },
    telephone: { type: Number, required: false },
    email: { type: String, required: true },
    subscription: { type: String, required: true },
    reports: [reportsSchema]
});

mongoose.model('Clients', clientsSchema);

