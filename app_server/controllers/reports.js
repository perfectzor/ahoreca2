/* GET reports page */
module.exports.reportInfo = function(req, res){
    res.render('index', { title: 'Report' });
};
module.exports.addReport = function(req, res){
    res.render('index', { title: 'Add New Report' });
};


