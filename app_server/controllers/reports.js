var request = require('request');
var xlsx2json = require('xlsx2json');

var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://ahoreca.herokuapp.com";
}





module.exports.reportInfo = function(req, res){
    res.render('reports-list', { path: '/report',title: 'Relatórios' });
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
    path = '/api/reports/' +req.params.reportvat;
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
                data: [body.data]
                
        };
            renderReportsDetailpage(req, res, data);



        }
    );
}


