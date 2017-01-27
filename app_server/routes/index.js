var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlClients = require('../controllers/clients');
var ctrlReports = require('../controllers/reports');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

/* home pages */
router.get('/', ctrlHome.index);
router.get('/dashboard', isAuthenticated, ctrlHome.dashboard);
router.get('/about', isAuthenticated, ctrlHome.about);

//router.get('/signup', ctrlHome.signup);


/* profiles pages */
router.get('/profile', isAuthenticated, ctrlHome.profile);


/* Clients pages */
router.get('/client', isAuthenticated, ctrlClients.clientInfo);
router.get('/client/new', isAuthenticated, ctrlClients.addClient);
router.get('/client/detail/:clientvat', isAuthenticated, ctrlClients.clientDetail);


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
