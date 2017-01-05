var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controllers/dashboard');
var ctrlClients = require('../controllers/clients');
var ctrlReports = require('../controllers/reports');

/* Dashboard pages */
router.get('/', ctrlDashboard.index);
/* Clients pages */
router.get('/client', ctrlClients.clientInfo);
router.get('/client/new', ctrlClients.addClient);


/* Reports pages */
router.get('/report', ctrlReports.reportInfo);
router.get('/report/new', ctrlReports.addReport);

module.exports = router;
