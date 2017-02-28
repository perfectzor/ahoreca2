var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://ahoreca.herokuapp.com";
}

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

var renderLeadspage = function(req, res, responseBody) {
    res.render('leads-list', 
        {
        path: '/lead',
        user: req.user,
        title: 'Leads',
       leads: responseBody
        //console.log(clients);
    });
    

};

module.exports.leadInfo = function (req, res) {
    var requestOptions, path;
    path = '/api/leads/';
    requestOptions = {
        url: apiOptions.server + path,
        method : "GET",
        json: true,
        qs: {
        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderLeadspage(req, res, body);
        }
    );
}



module.exports.addLead = function (req, res) {
    var requestOptions, path, postdata;
    path = '/api/leads/';
    postdata = {
        name: req.body.name,
        clientvat: req.body.clientvat,
        cae: req.body.cae,
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.name || !postdata.clientvat) {
        res.redirect('/lead/');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 404) {
                    res.redirect('/lead');
                } else if (response.statusCode === 400 && body.name && body.clientvat === "ValidationError") {
                    res.redirect('/lead');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};




var renderLeadsDetailpage = function (req, res, leaDetail) {
    res.render('lead-detail',
        {
            path: '/lead',
            user: req.user,
            title: leaDetail.name,
            lead: leaDetail
            //console.log(clients);
        });


};

module.exports.leadDetail = function(req, res) {
    var requestOptions, path;
    path = '/api/leads/'+ req.params._id;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json:{}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            data.details = {
                number: body.number,
                name: body.name,
                clientvat: body.clientvat,
                cae: body.cae,
                address: body.address,
                telephone: body.telephone,
                email: body.email,
                comments: [body.comments]
            };
            renderLeadsDetailpage(req, res, data);
            
            
            
        }
    );
};



module.exports.AddComment = function(req, res){
    var requestOptions, path, leadid, postdata;
    leadid = req.params.leadid;
    path = "/api/leads/" + leadid;
    postdata = {
        author: req.body.author,
        text: req.body.text
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    if (!postdata.author || !postdata.text) {
        res.redirect('/lead/detail/' + leadid );
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/lead/detail/' + leadid);
                } else if (response.statusCode === 400 && body.author && body.author === "ValidationError") {
                    res.redirect('/lead/detail/' + leadid );
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};

module.exports.deleteLead = function (req, res) {
    var requestOptions, path, postdata;
    path = '/api/leads/';
    postdata = {
        clientvat: req.body.clientvat
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: postdata
    };
    if (!postdata.clientvat) {
        res.redirect('/lead/');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 200) {
                    res.redirect('/lead');
                } else if (response.statusCode === 400 && body.clientvat === "ValidationError") {
                    res.redirect('/lead');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};


