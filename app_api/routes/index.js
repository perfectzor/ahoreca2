var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controllers/dashboard');
var ctrlUsers = require('../controllers/users');
var ctrlClients = require('../controllers/clients');
var ctrlReports = require('../controllers/reports');

/* Dashboard pages */
//router.get('/', ctrlDashboard.index);

/*  Users pages */
router.get('/users', ctrlUsers.usersInfo);
router.post('/users', ctrlUsers.addUser);
router.get('/users/:userid', ctrlUsers.usersReadOne);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/:userid', ctrlUsers.usersDeleteOne);


/* Clients pages */
router.get('/clients', ctrlClients.clientsInfo);
router.post('/clients', ctrlClients.addClient);
router.get('/clients/:clientid', ctrlClients.clientsReadOne);
router.put('/clients/:clientid', ctrlClients.clientsUpdateOne);
router.delete('/clients/:clientid', ctrlClients.clientsDeleteOne);



/* Reports pages */
router.get('/reports/:reportid', ctrlReports.reportsReadOne);
router.post('/reports', ctrlReports.addReport);
router.put('/reports/:reportid', ctrlReports.reportsUpdateOne);
router.delete('/reports/:reportid', ctrlReports.reportsDelete);
router.delete('/clients/:clientid/reports/:reportid', ctrlReports.reportsDeleteOne);


module.exports = router;
