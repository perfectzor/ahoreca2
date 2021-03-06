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
        title: title,
        content: content
    });
};

var renderClientspage = function(req, res, responseBody) {
    res.render('clients-list', 
        {
        path: '/client',
        user: req.user,
        title: 'Clientes',
        clients: responseBody
        //console.log(clients);
    });
    

};

module.exports.clientInfo = function (req, res) {
    var requestOptions, path;
    path = '/api/clients';
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
            renderClientspage(req, res, body);
        }
    );
}

var renderLeadspage = function (req, res, responseBody) {
    res.render('leads-list',
        {
            path: '/leads',
            user: req.user,
            title: 'Leads',
            clients: responseBody
            //console.log(clients);
        });


};
module.exports.leadsInfo = function (req, res) {
    var requestOptions, path;
    path = '/api/clients';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
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





var renderClientsDetailpage = function (req, res, cliDetail) {
    res.render('client-detail',
        {
            path: '/client',
            client: cliDetail,
            title: cliDetail.name
           
            //console.log(clients);
        });


};

module.exports.clientDetail = function(req, res) {
    var requestOptions, path;
    path = '/api/clients/detail/'+ req.params._id;
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
                name: body.name,
                clientvat: body.clientvat,
                cae: body.cae,
                address: body.address,
                telephone: body.telephone,
                email: body.email,
                subscription: body.subscription,
                reports: [body.reports]
            };
            renderClientsDetailpage(req, res, data);
            
            
            
        }
    );
}
module.exports.addClient = function (req, res) {
    var requestOptions, path, postdata;
    path = '/api/clients/' ;
    postdata = {
        name: req.body.name,
        clientvat: req.body.clientvat,
        cae: req.body.cae,
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email,
        subscription: req.body.subscription
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.name || !postdata.clientvat) {
        res.redirect('/client/');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 404) {
                    res.redirect('/client');
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/client');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};

module.exports.deleteClient = function (req, res) {
    var requestOptions, path, postdata;
    path = '/api/clients/';
    postdata = {
        clientvat: req.body.clientvat
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: postdata
    };
    if (!postdata.clientvat) {
        res.redirect('/client/');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 200) {
                    res.redirect('/client');
                } else if (response.statusCode === 400 && body.clientvat === "ValidationError") {
                    res.redirect('/client');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};


