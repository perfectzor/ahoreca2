/* GET reports page */
module.exports.clientInfo = function(req, res){
    res.render('index', { title: 'Client' });
};
module.exports.addClient = function(req, res){
    res.render('index', { title: 'Add new client' });
};


