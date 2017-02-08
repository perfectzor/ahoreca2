﻿var mongoose = require('mongoose');

var reportsSchema = new mongoose.Schema({
    vat: { type: Number}
    
});

var clientsSchema = new mongoose.Schema({
    number: { type: Number, required: true},
    name: { type: String, required: true },
    clientvat: { type: Number, required: true },
    cae: { type: Number, required: false },
    address: { type: String, required: true },
    telephone: { type: Number, required: false },
    email: { type: String, required: true },
    subscription: { type: String, required: true},
    reports: [reportsSchema]
});

