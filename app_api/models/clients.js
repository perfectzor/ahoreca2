var mongoose = require('mongoose');

var reportsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reportvat: { type: Number, required: true }
    
});

var clientsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vat: { type: Number, required: true },
    reports: [reportsSchema]
});

mongoose.model('Clients', clientsSchema);

