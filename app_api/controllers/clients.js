var mongoose = require('mongoose');
var Cli = mongoose.model('Clients');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.clientsInfo = function (req, res) {
    
        Cli
            .find({ })
            .exec(function (err, client) {
                console.log(client);
                if (!client) {
                    sendJsonResponse(res, 404, { "message": "clientid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, client);
            });
  };

module.exports.addClient = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.clientsReadOne = function (req, res) {

    if (req.params && req.params.clientid) {
        Cli
            .findOne({ clientvat: req.params.clientid })
            .exec(function (err, client) {
                console.log(client);
                if (!client) {
                    sendJsonResponse(res, 404, { "message": "clientid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, client);
            });
   } else {
       sendJsonResponse(res, 404, { "message": "No clientid in request"});
    }
};
    

module.exports.clientsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.clientsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

