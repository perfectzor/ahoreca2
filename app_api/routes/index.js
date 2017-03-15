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
router.get('/users/reports/:userid', ctrlUsers.reportsList);
router.post('/users', ctrlUsers.addUser);
router.delete('/users', ctrlUsers.usersDeleteOne);
router.get('/users/:userid', ctrlUsers.usersReadOne);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);


/* Clients pages */
router.get('/clients', ctrlClients.clientsInfo);
router.post('/clients/', ctrlClients.addClient);
router.post('/clients/reports', ctrlClients.addReport);
router.delete('/clients/', ctrlClients.clientsDeleteOne);
router.get('/clients/detail/:clientid', ctrlClients.clientsReadOne);
router.put('/clients/:clientid', ctrlClients.clientsUpdateOne);

/* Leadss pages */
router.get('/leads', ctrlLeads.leadsInfo);
router.post('/leads', ctrlLeads.addLead);
router.delete('/leads', ctrlLeads.deleteLead);
router.post('/leads/:leadid', ctrlLeads.commentsCreate);
router.get('/leads/:leadid', ctrlLeads.leadsReadOne);
router.put('/leads/:leadid', ctrlLeads.leadsUpdateOne);




/* Reports pages */
router.get('/reports/:reportid', ctrlReports.reportsReadOne);
router.get('/reports/', ctrlReports.reportsList);
router.post('/reports', ctrlReports.addReport);
router.put('/reports/:reportid', ctrlReports.reportsUpdateOne);
router.delete('/reports/:reportid', ctrlReports.reportsDelete);
router.delete('/clients/:clientid/reports/:reportid', ctrlReports.reportsDeleteOne);


module.exports = router;
