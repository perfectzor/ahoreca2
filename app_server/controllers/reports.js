var request = require('request');
var xlsx2json = require('xlsx2json');

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

var renderReportspage = function (req, res, responseBody) {
    res.render('reports-list',
        {
            path: '/report',
            user: req.user,
            title: 'Relatórios',
            reports: responseBody
            //console.log(reports);
        });


};


module.exports.reportInfo = function(req, res){
    var requestOptions, path;
    path = '/api/reports';
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
            renderReportspage(req, res, body);
        }
    );
};

var renderReportsConfirmpage = function (req, res, jsonArray) {
    res.render('report-confirm',
        {
            path: '/report/confirm',
            title: 'Report Detail',
            report: jsonArray

        });


};
module.exports.confirmReport = function (req, res) {
    xlsx2json('./public/upload/tmpreport.xlsx',
        {
            dataStartingRow: 2,
            mapping: {
                'col_1': 'A',
                'col_2': 'B'
            }
        }
    ).then(jsonArray => {
        [
            [
                { "col_1": "value 1-A", "col_2": "value 1-B" },
                { "col_1": "value 2-A", "col_2": "value 2-B" }
            ]
        ]
        renderReportsConfirmpage(req, res, jsonArray);
    });
    
    
};
module.exports.addReport = function (req, res) {
    res.render('new-report', { path: '/report', title: 'Relatórios' });
};
module.exports.test = function (req, res,next) {
    // if you're here, the file should have already been uploaded

    console.log(req.file.buffer)
    console.log(req.file.originalname);// {"someParam": "someValue"}
    res.send(req.files);
};

module.exports.addReportClient = function (req, res) {
    var requestOptions, path, postdata;
    path = '/api/clients/reports/';
    postdata = {
        vat: req.body.vat,
        reportid: req.body.reportid,
        clientid: req.body.clientid
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.vat || !postdata.reportid) {
        res.redirect('/client/');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/client');
                } else if (response.statusCode === 400 && body.vat && body.reportid === "ValidationError") {
                    res.redirect('/client');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};

var renderReportsDetailpage = function (req, res, repDetail) {
    res.render('report-detail',
        {
            path: '/report',
            title: 'Report Detail',
            report: repDetail
           
        });


};

module.exports.reportDetail = function (req, res) {
    var requestOptions, path;
    path = '/api/reports/'+req.params.reportid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            data.details = {
                name: body.name,
                reportvat: body.reportvat,
                cae: body.cae,
                address: body.address,
                phone: body.phone,
                fax: body.fax,
                email: body.email,
                web: body.web,
                createdon: body.createdon,
                data: [body.data]
                
        };
            renderReportsDetailpage(req, res, data);



        }
    );
}


