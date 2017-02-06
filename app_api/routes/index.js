var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controllers/dashboard');
var ctrlUsers = require('../controllers/users');
var ctrlClients = require('../controllers/clients');
var ctrlLeads = require('../controllers/leads');
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

/* Leadss pages */
router.get('/leads', ctrlLeads.leadsInfo);
router.post('/leads', ctrlLeads.addLead);
router.get('/leads/:leadid', ctrlLeads.leadsReadOne);
router.put('/leads/:leadid', ctrlLeads.leadsUpdateOne);
router.delete('/leads/:leadid', ctrlLeads.leadsDeleteOne);




/* Reports pages */
router.get('/reports/:reportid', ctrlReports.reportsReadOne);
router.post('/reports', ctrlReports.addReport);
router.put('/reports/:reportid', ctrlReports.reportsUpdateOne);
router.delete('/reports/:reportid', ctrlReports.reportsDelete);
router.delete('/clients/:clientid/reports/:reportid', ctrlReports.reportsDeleteOne);


module.exports = router;
