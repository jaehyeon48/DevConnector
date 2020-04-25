const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const auth = require('../middleware/auth');
const { TestAuthController, LoginController } = require('../controllers/authControllers');

// @ROUTE         GET api/auth
// @DESCRIPTION   Testing authentication
// @ACCESS        Private
router.get('/', auth, TestAuthController);


// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], LoginController);


module.exports = router;