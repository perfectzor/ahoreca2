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


module.exports.addLead = function (req, clientvat, done) {

    Lea.findOne({ clientvat: req.body.clientvat },
        function(err, lead) {
            // In case of any error, return using the done method
            if (err) {
                console.log('Error ' + err);
                return done(err);
            }
            // already exists
            if (lead) {
                console.log('Lead already exists with client vat: ' + clientvat);
                return done(null, false);
            } else {
                // if there is no user with that email
                // create the user
                var newLead = new Lea();

                // set the user's local credentials
                newLead.name = req.body.name;
                newLead.clientvat = req.body.clientvat;
                newLead.email = req.body.email;
                newLead.cae = req.body.cae;
                newLead.address = req.body.address;
                newLead.telephone = req.body.telephone;

                // save the user
                newLead.save(function(err) {
                    if (err) {
                        console.log('Error in Saving Lead: ' + err);
                        throw err;
                    }
                    console.log('Lead Registration succesful');
                    return done(null, newLead);
                });
            }
        })
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



var AddComment = function(req, res, lead) {
    if (!lead) {
        sendJsonResponse(res, 404, {
            "message": "leadid not found"
        });
    } else {
        lead.comments.push({
            author: req.body.author,
            text: req.body.text
        });
        lead.save(function(err, lead) {
            var thisComment;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisComment = lead.comments[lead.comments.length - 1];
                sendJsonResponse(res, 201, thisComment);
            }
        });
    }
};

module.exports.commentsCreate = function(req, res) {
    var leadid = req.params.leadid;
    if (leadid) {
        Lea
            .findById(leadid)
            .select('comments')
            .exec(
                function(err, lead) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        AddComment(req, res, lead);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, leadid required"
        });
    }
};
module.exports.deleteLead = function (req, res) {


    Lea
        .findOneAndRemove({ clientvat: req.body.clientvat },
        function (err, lead) {
            if (!lead) {
                sendJsonResponse(res, 404, { "message": "Lead not found" });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, { "message": "Lead deleted" });

        });


};

