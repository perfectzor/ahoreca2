var mongoose = require('mongoose');
var Rep = mongoose.model('Reports');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.addReport = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.reportsReadOne = function (req, res) {

    if (req.params && req.params.reportid) {
        Rep
            .findOne({ reportvat: req.params.reportid })
            .exec(function (err, report) {
                console.log(report);
                if (!report) {
                    sendJsonResponse(res, 404, { "message": "reportid not found ffs" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, report);
            });
    } else {
        sendJsonResponse(res, 404, { "message": "No reportid in request" });
    }
};

module.exports.reportsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.reportsDelete = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.reportsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};


