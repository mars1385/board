//------------------import----------------
const express = require('express');
// import controllers
const { register, login } = require('../controllers/authController');
//------------------end-------------------

// router
const router = express.Router();

// for '/api/auth/register'
router.route('/register').post(register);

// for '/api/auth/login'
router.route('/login').post(login);

// export router
module.exports = router;
