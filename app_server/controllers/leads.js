var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://ahoreca.herokuapp.com";
}

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
    path = '/api/leads';
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



module.exports.addLead = function(req, res){
    res.render('new-lead', { path: '/lead', title: 'Add new lead' });
};




var renderLeadsDetailpage = function (req, res, leaDetail) {
    res.render('lead-detail',
        {
            path: '/lead',
            title: 'Lead Detail',
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
}


