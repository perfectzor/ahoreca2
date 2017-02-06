var mongoose = require('mongoose');
var Lea = mongoose.model('Leads');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.leadsInfo = function (req, res) {
    
        Lea
            .find({ })
            .exec(function (err, lead) {
                if (!lead) {
                    sendJsonResponse(res, 404, { "message": "leadid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, lead);
            });
  };

module.exports.addLead = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.leadsReadOne = function (req, res) {

    if (req.params && req.params.leadid) {
        Lea
            .findOne({ _id: req.params.leadid })
            .exec(function (err, lead) {
                console.log(lead);
                if (!lead) {
                    sendJsonResponse(res, 404, { "message": "leadid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, lead);
            });
   } else {
       sendJsonResponse(res, 404, { "message": "No leadid in request"});
    }
};
    

module.exports.leadsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.leadsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

