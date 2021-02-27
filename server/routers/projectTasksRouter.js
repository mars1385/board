// -----------------imports-----------------
const express = require('express');

// controllers
const { addTasks, getTasks, updateTask } = require('../controllers/projectTasksController');
// auth
const { protectedRoute } = require('../middlewares/auth');
// -----------------end---------------------

const router = express.Router({ mergeParams: true });

// "/projects/:id/tasks"
router.route('/').post(protectedRoute, addTasks).get(protectedRoute, getTasks);

// "/project/:id/tasks/:taskId"
router.route('/:taskId').patch(protectedRoute, updateTask);

// exports endPoint

module.exports = router;
