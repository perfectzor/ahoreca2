var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://ahoreca.herokuapp.com";
}

var renderUserspage = function(req, res, responseBody) {
    res.render('users-list', 
        {
        path: '/user',
        user: req.user,
        role: req.user.role,
        title: 'Utilizadores',
        users: responseBody
       
    });
    console.log(req.user.role);


};

module.exports.userInfo = function (req, res) {
    var requestOptions, path;
    path = '/api/users';
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
            renderUserspage(req, res, body);
        }
    );
}




var renderUsersDetailpage = function (req, res, useDetail) {
    res.render('user-detail',
        {
            path: '/user',
            title: 'User Detail',
            user: useDetail
            //console.log(clients);
        });


};

module.exports.userDetail = function(req, res) {
    var requestOptions, path;
    path = '/api/users/'+ req.params.userid;
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
                username: body.username,
                email: body.email
            };
            renderUsersDetailpage(req, res, data);
            
            
            
        }
    );
}


