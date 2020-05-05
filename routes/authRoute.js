const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const auth = require('../middleware/auth');
const { CheckAuthController, LogOutController, LoginController } = require('../controllers/authControllers');

// @ROUTE         GET api/auth
// @DESCRIPTION   check authentication
// @ACCESS        Private
router.get('/', auth, CheckAuthController);

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   logout
// @ACCESS        Private
router.get('/logout', auth, LogOutController);

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], LoginController);


module.exports = router;