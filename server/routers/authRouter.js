//------------------import----------------
const express = require('express');
// import controllers
const { register, login, getUserInfo } = require('../controllers/authController');
const { protectedRoute } = require('../middlewares/auth');
//------------------end-------------------

// router
const router = express.Router();

// for '/auth/register'
router.route('/register').post(register);

// for '/auth/login'
router.route('/login').post(login);

// for '/auth/userInfo'
router.route('/userInfo').get(protectedRoute, getUserInfo);

// export router
module.exports = router;
