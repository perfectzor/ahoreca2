/* GET reports page */
module.exports.index = function(req, res){
    res.render('index', { title: 'aHoreca' });
};

module.exports.dashboard = function (req, res) {
    if (req.user.role == "admin")
        res.render('dashboard', { path: req.path, title: 'Dashboard' });
    else if (req.user.role == "collaborator")
        res.render('dashboard-collaborator', { path: req.path, title: 'Dashboard' });
    else if (req.user.role == "client")
        res.render('dashboard-client', { path: req.path, title: 'Dashboard' });
};

module.exports.profile = function (req, res) {
    if (req.user.role == "admin")
        res.render('profile', { path: req.path, title: 'Perfil' });
    else if (req.user.role == "collaborator")
        res.render('profile-collaborator', { path: req.path, title: 'Perfil' });
    else if (req.user.role == "client")
        res.render('profile-client', { path: req.path, title: 'Perfil' });
};

module.exports.about = function (req, res) {
    
    if (req.user.role == "admin")
        res.render('about', { path: req.path , title: 'About us' });
    else if (req.user.role == "collaborator")
        res.render('about-collaborator', { path: req.path , title: 'About us' });
    else if (req.user.role == "client")
        res.render('about-client', { path: req.path , title: 'About us' });
};



