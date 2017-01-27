/* GET reports page */
module.exports.index = function(req, res){
    res.render('index', { title: 'aHoreca' });
};

module.exports.dashboard = function(req, res){
    res.render('dashboard', { path: req.path, title: 'aHoreca - Dashboard' });
};

module.exports.profile = function (req, res) {
    res.render('profile', { path: req.path, title: 'Perfil' });
};

module.exports.about = function (req, res) {
    res.render('about', { path: req.path ,title: 'About us' });
};



