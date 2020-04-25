const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const { RegisterController } = require('../controllers/usersControllers');

// @ROUTE         POST api/users
// @DESCRIPTION   Register user
// @ACCESS        Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with at least 5 characters').isLength({ min: 5 })
], RegisterController);


module.exports = router;