// -----------------imports-----------------
const express = require('express');

// controllers
const { createProject, getProject } = require('../controllers/projectsController');

// -----------------end---------------------

const router = express.Router();

// "/projects"
router.route('/').post(createProject);
// "/projects/:id"
router.route('/:id').get(getProject);
// exports endPoint

module.exports = router;
