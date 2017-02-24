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


module.exports.clientsReadOne = function (req, res) {

    if (req.params && req.params.clientid) {
        Cli
            .findOne({ _id: req.params.clientid })
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
        
    
        Cli
            .findOneAndRemove({ clientvat: req.body.clientvat },
            function(err, client)
            {
                if (!client) {
                    sendJsonResponse(res, 404, { "message": "client not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, { "message": "Cliente deleted" });
                
            });
        
    
};



module.exports.addClient = function(req, clientvat, done) {

    Cli.findOne({ clientvat: req.body.clientvat },
        function(err, client) {
            // In case of any error, return using the done method
            if (err) {
                console.log('Error ' + err);
                return done(err);
            }
            // already exists
            if (client) {
                console.log('Client already exists with client vat: ' + clientvat);
                return done(null, false);
            } else {
                // if there is no user with that email
                // create the user
                var newClient = new Cli();

                // set the user's local credentials
                newClient.name = req.body.name;
                newClient.clientvat = req.body.clientvat;
                newClient.email = req.body.email;
                newClient.cae = req.body.cae;
                newClient.address = req.body.address;
                newClient.telephone = req.body.telephone;
                newClient.subscription = req.body.subscription;

                // save the user
                newClient.save(function(err) {
                    if (err) {
                        console.log('Error in Saving client: ' + err);
                        throw err;
                    }
                    console.log('client Registration succesful');
                    return done(null, newClient);
                });
            }
        })
};


       
module.exports.addReport = function (req, res) {

    Cli.findOne({ _id: req.body.clientid, "reports.reportid" : req.body.reportid },
        function (err, client) {
            if (err) {
                sendJsonResponse(res, 500, { "message": "error" });
                return;
            }
            else if (client) {
                console.log(client);
                sendJsonResponse(res, 500, { "message": "found client with that report, report not added" });
                return;
            }
            else if (!client) {
                Cli.findOneAndUpdate(
                    { _id: req.body.clientid },
                    { $addToSet: { "reports" : { "reportid": req.body.reportid, "vat": req.body.vat } } },
                    { "upsert": true, "new": true },
                    function (err, client) {
                        // handle here
                    }
                );
                console.log(req.body.reportid);
                sendJsonResponse(res, 201, { "message": "report added" });
                return;
            }
        })      


};
       