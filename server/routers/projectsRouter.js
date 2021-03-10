// -----------------imports-----------------
const express = require('express');

// controllers
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
  removeProject,
} = require('../controllers/projectsController');
const projectTasksRouter = require('./projectTasksRouter');
// auth
const { protectedRoute } = require('../middlewares/auth');
// -----------------end---------------------

const router = express.Router();

//  "/projects/:projectId/tasks"
router.use('/:projectId/tasks', projectTasksRouter);

// "/projects"
router.route('/').get(protectedRoute, getProjects).post(protectedRoute, createProject);
// "/projects/:id"
router
  .route('/:id')
  .get(protectedRoute, getProject)
  .patch(protectedRoute, updateProject)
  .delete(protectedRoute, removeProject);
// exports endPoint

module.exports = router;
