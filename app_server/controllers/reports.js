var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};




module.exports.reportInfo = function(req, res){
    res.render('reports-list', { path: '/report',title: 'Relatórios' });
};
module.exports.addReport = function(req, res){
    res.render('new-report', { path: '/report',title: 'Criar um novo relatório' });
};
module.exports.reportDetail = function(req, res){
    res.render('report-detail', { path: '/report',title: 'Detalhes' });
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
    path = '/api/reports/' + req.params.reportvat;
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


