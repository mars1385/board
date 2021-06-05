//------------------import----------------
const express = require('express');
// import controllers
const { inviteUser, getMember } = require('../controllers/invitationController');
const { protectedRoute } = require('../middlewares/auth');
//------------------end-------------------

// router
const router = express.Router({ mergeParams: true });

// for '/projects/:projectId/invitation
router.route('/').post(protectedRoute, inviteUser).get(protectedRoute, getMember);

// export router
module.exports = router;
