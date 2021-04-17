const express = require('express');
const router = express.Router();

const DashboardController = require('./controllers/DashboardController');
const JobController = require('./controllers/JobController');
const JobStatusController = require('./controllers/JobStatusController');
const ProfileController = require('./controllers/ProfileController');

router.get('/', DashboardController.index);
router.get('/job', JobController.create);
router.post('/job', JobController.save);
router.get('/job/:id', JobController.show);
router.post('/job/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete);
router.get('/profile', ProfileController.index);
router.post('/profile', ProfileController.update);
router.post('/job/:id/status_update', JobStatusController.update);

module.exports = router;
