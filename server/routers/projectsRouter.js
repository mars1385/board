// -----------------imports-----------------
const express = require('express');

// controllers
const { createProject, getProject } = require('../controllers/projectsController');
// auth
const { protectedRoute } = require('../middlewares/auth');
// -----------------end---------------------

const router = express.Router();

// "/projects"
router.route('/').post(protectedRoute, createProject);
// "/projects/:id"
router.route('/:id').get(getProject);
// exports endPoint

module.exports = router;
