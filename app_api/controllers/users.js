var mongoose = require('mongoose');
var Use = mongoose.model('Users');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.usersInfo = function (req, res) {
    
        Use
            .find({ })
            .exec(function (err, user) {
                //console.log(user);
                if (!user) {
                    sendJsonResponse(res, 404, { "message": "userid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);
            });
  };

module.exports.addUser = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.usersReadOne = function (req, res) {
    
    if (req.params && req.params.userid) {
        Use
            .findOne({ _id: req.params.userid })
            .exec(function (err, user) {
                console.log(user);
                if (!user) {
                    sendJsonResponse(res, 404, { "message": "userid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);
            });
   } else {
       sendJsonResponse(res, 404, { "message": "No userid in request"});
    }
};
    

module.exports.usersUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.usersDeleteOne = function (req, res) {
    
    
    Use
        .findOneAndRemove({ username: req.body.username },
         function (err, user) {
        if (!user) {
            sendJsonResponse(res, 404, { "message": "User not found" });
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, { "message": "User deleted" });
                
    });
        
    
};
module.exports.reportsList = function (req, res) {
    
    Use.findOne({ _id: req.params.userid }, 'reports',
        function (err, user) {
        if (err) {
            sendJsonResponse(res, 500, { "message": "error" });
            return;
        }
        else if (user) {
            sendJsonResponse(res, 200, user );
            return;
        }
        else if (!user) {
            sendJsonResponse(res, 500, { "message": "no user" });
            return;
        }
    })


};

