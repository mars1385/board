// -----------------imports-----------------
const express = require('express');

// controllers
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
  removeProject,
  getActivities,
} = require('../controllers/projectsController');
const projectTasksRouter = require('./projectTasksRouter');
const invitationRoute = require('./invitationRoute');
// auth
const { protectedRoute } = require('../middlewares/auth');
// -----------------end---------------------

const router = express.Router();

//  "/projects/:projectId/tasks"
router.use('/:projectId/tasks', projectTasksRouter);
//  "/projects/:projectId/invitation"
router.use('/:projectId/invitation', invitationRoute);

// "/projects"
router.route('/').get(protectedRoute, getProjects).post(protectedRoute, createProject);
// "/projects/:id"
router
  .route('/:id')
  .get(protectedRoute, getProject)
  .patch(protectedRoute, updateProject)
  .delete(protectedRoute, removeProject);

router.route('/:projectId/activities').get(protectedRoute, getActivities);
// exports endPoint

module.exports = router;
