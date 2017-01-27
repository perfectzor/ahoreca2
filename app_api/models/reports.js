var mongoose = require('mongoose');

var reportSalesSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    value: { type: Number, required: true }
});


var reportsDetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vat: { type: Number, required: true },
    cae: { type: String, required: false },
    address: { type: String, required: true },
    phone: { type: Number, required: false },
    fax: { type: Number, required: false },
    email: { type: String, required: true },
    web: { type: String, required: true },
    sales: [reportSalesSchema] 
    
});

mongoose.model('Reports', reportsDetailSchema);

