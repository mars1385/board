// -----------------imports-----------------
const express = require('express');

// controllers
const { createProject } = require('../controllers/projectsController');

// -----------------end---------------------

const router = express.Router();

// "/projects"
router.route('/').post(createProject);

// exports endPoint

module.exports = router;
