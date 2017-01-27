var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
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
module.exports.addClient = function(req, res){
    res.render('new-client', { path: '/client', title: 'Add new client' });
};




var renderClientsDetailpage = function (req, res, cliDetail) {
    res.render('client-detail',
        {
            path: '/client',
            title: 'Client Detail',
            client: cliDetail
            //console.log(clients);
        });


};

module.exports.clientDetail = function(req, res) {
    var requestOptions, path;
    path = '/api/clients/'+ req.params.clientvat;
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


