var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlUsers = require('../controllers/users');
var ctrlClients = require('../controllers/clients');
var ctrlLeads = require('../controllers/leads');
var ctrlReports = require('../controllers/reports');
var connectRoles = require('connect-roles');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

//Connect roles

var user = new connectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when 
        // user fails authorisation 
        var accept = req.headers.accept || '';
        res.status(403);
        if (~accept.indexOf('html')) {
            res.render('access-denied', { action: action });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});



//anonymous users can only access the home page 
//returning false stops any more rules from being 
//considered 
user.use(function (req, action) {
    if (!req.isAuthenticated()) return action === 'access home area';
})

user.use('access client area', function (req) {
    if (req.user.role === 'client') {
        return true;
    }
})

//moderator users can access private page, but 
//they might not be the only ones so we don't return 
//false if the user isn't a moderator 
user.use('access collaborator area', function (req) {
    if (req.user.role === 'collaborator') {
        return true;
    }
})

//admin users can access all pages 
user.use(function (req) {
    if (req.user.role === 'admin') {
        return true;
    }
});

/* home pages */
router.get('/', ctrlHome.index);
router.get('/dashboard', isAuthenticated, ctrlHome.dashboard);
router.get('/about', isAuthenticated, ctrlHome.about);

//router.get('/signup', ctrlHome.signup);


/* profiles pages */
router.get('/profile', isAuthenticated,ctrlHome.profile);


/* Users pages */
router.get('/user', isAuthenticated, user.can('access admin page'), ctrlUsers.userInfo);
router.get('/user/new', isAuthenticated, user.can('access admin page'), ctrlUsers.addUser);
router.get('/user/detail/:userid', isAuthenticated, user.can('access admin page'), ctrlUsers.userDetail);

/* Clients pages */
router.get('/client', isAuthenticated, user.can('access collaborator area'), ctrlClients.clientInfo);
router.get('/client/new', isAuthenticated, user.can('access collaborator area'), ctrlClients.addClient);
router.get('/client/detail/:clientvat', user.can('access collaborator area'), isAuthenticated, ctrlClients.clientDetail);


/* Leads pages */
router.get('/lead', isAuthenticated, user.can('access collaborator area'), ctrlLeads.leadInfo);
router.get('/lead/detail/:_id', user.can('access collaborator area'), isAuthenticated, ctrlLeads.leadDetail);


/* Reports pages */
router.get('/report', isAuthenticated, ctrlReports.reportInfo);
router.get('/report/detail/:reportvat', isAuthenticated, ctrlReports.reportDetail);
router.get('/report/new', isAuthenticated, ctrlReports.addReport);


//passport




module.exports = function (passport) {

    /* GET login page. */
    //router.get('/', function (req, res) {
    //    // Display the Login page with any flash message, if any
    //    res.render('index', { message: req.flash('message') });
    //});

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    //router.get('/signup', function (req, res) {
    //    res.render('signup', { message: req.flash('message') });
    //});

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/client',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Home Page */
    //router.get('/client', isAuthenticated, function (req, res) {
    //    res.render('client-list', { user: req.user });
    //});

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}


//module.exports = router;
