// -----------------imports-----------------
const express = require('express');

// controllers
const { addTasks } = require('../controllers/projectTasksController');
// auth
const { protectedRoute } = require('../middlewares/auth');
// -----------------end---------------------

const router = express.Router();

// "/projects/:id/tasks"
router.route('/').post(protectedRoute, addTasks);

// exports endPoint

module.exports = router;
